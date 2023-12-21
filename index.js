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
  const { value } = req.body;
  const pipeline = [
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
              cond: { $eq: ['$reactions.type', 'like'] },
            },
          },
        },
        dislikeCount: {
          $size: {
            $filter: {
              input: '$reactions',
              cond: { $eq: ['$reactions.type', 'dislike'] },
            },
          },
        },
      },
    },
    {
      $project: {
        'user.password': 0,
        reactions: 0, // Optional: Exclude reactions from the final result if needed
      },
    },
  ];


  // If search query is provided, add a $match stage to filter by search
  if (value) {
    pipeline = [
      ...pipeline,
      {
        $match: {
          content: { $regex: new RegExp(value, 'i') } // Case-insensitive search using regex
        }
      }
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
  }).exec();
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


  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(port, () => {
  console.log('Express server Running!!');
});

