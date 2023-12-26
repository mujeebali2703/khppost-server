const express = require('express');
const app = express();
const port = 3180;
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '200MB' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '200MB', parameterLimit: 20000 }));
app.use(bodyParser.raw());
const http = require('http');
const socketIO = require('socket.io');

const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/khppost'

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
  // Perform additional setup or start your application here
});

// User Schema
const userSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  nickName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  profile: { type: Buffer }
});

// Post Schema
const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  photo: [{ type: Buffer, required: true }],
  tags: [{ type: String }],
  status: { type: String, enum: ['PUBLISHED', 'UNPUBLISHED'], required: true, default: 'PUBLISHED' }
});

// Comment Schema
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }
});


// Reaction Schema
const reactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  type: { type: String, enum: ['like', 'dislike'], required: true },
  createdAt: { type: Date, default: Date.now }
});

// Conversation Schema
const conversationSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startedOn: { type: Date, default: Date.now }
});

// Message Schema
const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  sentOn: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Reaction = mongoose.model('Reaction', reactionSchema);
const Conversation = mongoose.model('Conversation', conversationSchema);
const Message = mongoose.model('Message', messageSchema);


app.post('/getpostdata', async (req, res) => {
  const { value, user } = req.body;
  let pipeline = [
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $match: {
        status: 'PUBLISHED',
      },
    },
    {
      $lookup: {
        from: 'reactions',
        localField: '_id',
        foreignField: 'post',
        as: 'reactions',
      },
    },
    {
      $addFields: {
        likeCount: {
          $size: {
            $filter: {
              input: '$reactions',
              cond: { $eq: ['$$this.type', 'like'] },
            },
          },
        },
        dislikeCount: {
          $size: {
            $filter: {
              input: '$reactions',
              cond: { $eq: ['$$this.type', 'dislike'] },
            },
          },
        },
      },
    },
    {
      $lookup: {
        from: 'reactions',
        let: { postId: '$_id', userId: { $toObjectId: user } },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$post', '$$postId'] },
                  { $eq: ['$user', '$$userId'] },
                ],
              },
            },
          },
        ],
        as: 'userReactions',
      },
    },
    {
      $addFields: {
        hasLiked: { $gt: [{ $size: '$userReactions' }, 0] },
        hasDisliked: { $eq: [{ $size: '$userReactions' }, 0] },
      },
    },
    {
      $project: {
        'user.password': 0,
        reactions: 0,
      },
    },
  ];
  // If search query is provided, add a $match stage to filter by search
  if (value) {
    pipeline = [
      ...pipeline,
      {
        $match: {
          content: { $regex: new RegExp(value, 'i') }, // Case-insensitive search using regex
        },
      },
    ];
  }

  // Execute the aggregation pipeline
  const posts = await Post.aggregate(pipeline).exec();

  res.send(posts);
});

app.delete('/deletepost', async (req, res) => {
  const { id } = req.body;
  if (id !== undefined) {
    const posts = await Post.findByIdAndUpdate(id, { status: 'UNPUBLISHED' }).exec();
    res.send(posts);
  } else {
    res.status(400).send("Invalid request. 'id' is missing in the request body.");
  }
});

app.post('/createpost', async (req, res) => {
  const { post } = req.body;
  if (post !== undefined) {

    const latestPost = {
      ...post,
      photo: [
        Buffer.from(post.photo, 'base64')
      ]
    }

    // Create a new post document
    const newPost = new Post(latestPost);

    // Save the post to the database
    await newPost.save()
      .then(savedPost => {
        console.log('Post created successfully:', savedPost);
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
    res.send(post);
  } else {
    res.status(400).send("Invalid request. 'id' is missing in the request body.");
  }
});

app.put('/updatepost', async (req, res) => {
  const { id, post } = req.body;

  try {
    const result = await Post.findByIdAndUpdate(id, post).exec();
    res.send(result);
  } catch (err) {
    res.send(err)
  }
});

// ----------------------------------------------------------------------

app.post('/register', (req, res) => {
  const { user } = req.body;

  const newUser = {
    ...user,
    profile: Buffer.from(user.profile, 'base64')
  }

  const regUser = new User(newUser);
  // Obj with Data

  regUser.save().then((res) => {
    console.log('User Registered Successfully')
  }).catch((err) => {
    console.log(err)
  })

  res.send(user)
});

app.get('/getusers', (req, res) => {
  const data = fs.readFileSync('users.json', 'utf-8', (error) => {
    res.send(error)
  });
  res.send(JSON.parse(JSON.stringify(data)))
})

app.post('/login', async (req, res) => {
  const { user: { email, password } } = req.body;
  const auth = await User.findOne({ email, password });
  res.send(auth);
})

app.post('/searchuser', async (req, res) => {
  const { text } = req.body;
  const users = await User.find({ displayName: new RegExp(text, 'i') });
  res.send(users);
})

app.get('/', (req, res) => {
  res.send('Hello Wajahat!!');
})
// -----------------------------------------------------------------------------

app.post('/getConversationMessages', async (req, res) => {
  const { id } = req.body;

  const messages = await Message.find({ conversation: id }).exec();
  console.log(id)
  res.send(messages);
})

app.post('/getConversation', async (req, res) => {
  const { id } = req.body;
  const conversation = await Conversation.findOne({
    $or: [
      { sender: new mongoose.Types.ObjectId(id) },
      { receiver: new mongoose.Types.ObjectId(id) }
    ]
  })
    .populate({
      path: 'sender',
      select: '-profile -email -password' // Exclude 'profile' field from sender
    })
    .populate({
      path: 'receiver',
      select: '-profile -email -password' // Exclude 'profile' field from receiver
    })
    .exec();
  res.send(conversation);
})




const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",  // Replace with the origin of your client app
    methods: ["GET", "POST", 'PUT', 'DELETE']
  }
});  // Create a Socket.IO server instance

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('sendMessage', (data) => {

    var conversation = null;

    if (data?.newConversation === 0) {// create conversation if new

      conversation = new Conversation({
        sender: data?.sender,
        receiver: data?.receiver,
        startedOn: new Date()
      })

      conversation.save().then(async (savedConversation) => {
        io.emit('newConversation', savedConversation);
      }).catch(err => {
        console.log(err)
      });
    }

    const newMessageObject = {
      message: data?.content,
      sender: data?.sender,
      receiver: data?.receiver,
      conversation: conversation ? conversation?._id : data?.newConversation,
      sentOn: new Date()
    }


    const newMessage = new Message(newMessageObject);
    newMessage.save().then(async (savedMessage) => {
      io.emit('newMessage', savedMessage);
    }).catch(err => {
      console.log(err)
    });

  });

  socket.on('likePost', async (data) => {
    const { post } = data;
    const reaction = new Reaction(data);
    reaction.save()
    // Use async/await to wait for the update to complete
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: post?._id },
      { $push: { reactions: reaction } },
      { new: true } // Returns the updated document
    ).exec();

    io.emit('likedPost', { post: updatedPost });
  });

  socket.on('unlikePost', async ({ post, user, type }) => {
    // Find the reaction by ID and retrieve its post field
    const currentReaction = await Reaction.findOne({
      post, // Replace postId with the actual post ID you are searching for
      user, // Replace userId with the actual user ID you are searching for
      type // Replace reactionType with the actual reaction type you are searching for
    }).exec();

    const reaction = await Reaction.findById(currentReaction?._id).select('post').exec();

    if (reaction) {
      const postId = reaction.post;
      // Delete the reaction by ID
      await Reaction.findByIdAndDelete(currentReaction?._id).exec();

      // Update the post's reactions field
      await Post.findByIdAndUpdate(postId, {
        $pull: { reactions: currentReaction?._id } // Remove the reaction ID from the reactions array
      }).exec();
    }
    io.emit('unlikedPost')
  });

  socket.on('dislikePost', async (data) => {
    const { post } = data;
    const reaction = new Reaction(data);
    reaction.save()
    // Use async/await to wait for the update to complete
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: post?._id },
      { $push: { reactions: reaction } },
      { new: true } // Returns the updated document
    ).exec();

    io.emit('dislikedPost', { post: updatedPost });
  });

  socket.on('undislikePost', async ({ post, user, type }) => {
    // Find the reaction by ID and retrieve its post field
    const currentReaction = await Reaction.findOne({
      post, // Replace postId with the actual post ID you are searching for
      user, // Replace userId with the actual user ID you are searching for
      type // Replace reactionType with the actual reaction type you are searching for
    }).exec();

    const reaction = await Reaction.findById(currentReaction?._id).select('post').exec();

    if (reaction) {
      const postId = reaction.post;

      // Delete the reaction by ID
      await Reaction.findByIdAndDelete(currentReaction?._id).exec();

      // Update the post's reactions field
      await Post.findByIdAndUpdate(postId, {
        $pull: { reactions: currentReaction?._id } // Remove the reaction ID from the reactions array
      }).exec();
    }
    io.emit('undislikedPost')
  });


  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(port, () => {
  console.log('Express server Running!!');
});

