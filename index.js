const express = require('express');
const app = express();
const port = 3180;
var cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '200MB' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '200MB', parameterLimit: 20000 }));
app.use(bodyParser.raw()); // Change '5mb' to your desired limit
const fs = require('fs');

const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/khppost'

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
  // Perform additional setup or start your application here
});


const postSchema = new mongoose.Schema({
  creator: {
    id: { type: String, required: true },
    displayName: { type: String, required: true },
    nickName: { type: String },
    avatarURL: { type: Buffer },
  },
  status: { type: String, enum: ['PUBLISHED'], required: true },
  to: {
    name: { type: String },
  },
  from: {
    name: { type: String },
  },
  photo: {
    mainSrc: { type: Buffer },
    thumbnailSrc: { type: Buffer },
    alt: { type: String },
  },
  text: { type: String },
  createdOn: { type: String },
  updatedOn: { type: String },
  statistics: {
    id: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    replies: { type: Number, default: 0 },
    repeats: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    flags: { type: Number, default: 0 },
    state: { type: String, enum: ['NEITHER'], default: 'NEITHER' },
    hasReplied: { type: Boolean, default: false },
    hasRepeated: { type: Boolean, default: false },
    hasSaved: { type: Boolean, default: false },
    hasFlagged: { type: Boolean, default: false },
  },
  tags: [
    {
      slug: { type: String },
    },
  ],
  parent: {
    id: { type: String },
  },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

app.get('/getpostdata', async (req, res) => {

  const posts = await Post.find({}, null, { limit: 10 }).exec();
  res.send(JSON.parse(JSON.stringify(posts)))
})

app.delete('/deletepost', async (req, res) => {
  const { id } = req.body;
  if (id !== undefined) {
    const posts = await Post.findByIdAndDelete(id, null, { limit: 10 }).exec();
    res.send(posts);
  } else {
    res.status(400).send("Invalid request. 'id' is missing in the request body.");
  }
});

app.post('/createpost', (req, res) => {
  const { post } = req.body;
  if (post !== undefined) {

    const latestPost = {
      ...post,
      photo: {
        mainSrc: Buffer.from(post.photo.mainSrc, 'base64')
      }
    }

    // Create a new post document
    const newPost = new Post(latestPost);

    // Save the post to the database
    newPost.save()
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

app.put('/updatepost', (req, res) => {
  const { post } = req.body;
  const index = postData.findIndex((value) => {
    return value?.id === post?.id
  });
  postData[index] = post;
  // Write logic to find and update post fom array
  // if (post !== undefined) {
  //   postData.push(post);
  res.send(post);
  // } else {
  //   res.status(400).send("Invalid request. 'id' is missing in the request body.");
  // }
});

// ----------------------------------------------------------------------

app.post('/register', (req, res) => {
  const { user } = req.body;
  const data = fs.readFileSync('users.json', 'utf-8', (error) => {
    res.send(error)
  });



  const parsedData = data.length > 0 ? JSON.parse(data) : [];

  const exist = parsedData.filter((currentUser) => currentUser.email === user.email).length > 0;

  if (exist) {
    res.send('User Already Registered!!')
    return;
  }

  parsedData.push(user)

  fs.writeFileSync('users.json', JSON.stringify(parsedData), (error) => {
    console.log(error)
  })

  res.send(user)
});

app.get('/getusers', (req, res) => {
  const data = fs.readFileSync('users.json', 'utf-8', (error) => {
    res.send(error)
  });
  res.send(JSON.parse(JSON.stringify(data)))
})

app.post('/login', (req, res) => {
  const { user } = req.body;
  const resp = users.filter((regUser) => {
    var result = null;
    if (regUser.email !== user.email)
      result = 'User not Found! Please Register';
    else if (regUser.password !== user.password)
      result = 'Invalid Password';
    else if (regUser.email !== user.email && regUser.password !== user.password)
      result = 'Invalid Data';
    else
      result = user;
    return result;
  })

  console.log(resp)

  res.send(resp[0]);
})


app.get('/', (req, res) => {
  res.send('Hello Wajahat!!');
})

app.listen(port, () => {
  console.log('Express App Running!!');
})

