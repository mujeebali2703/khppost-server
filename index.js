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

var postData = [];

app.get('/getpostdata', (req, res) => {
  res.send(JSON.parse(JSON.stringify(postData)))
})

app.delete('/deletepost', (req, res) => {
  const { id } = req.body;
  if (id !== undefined) {
    postData = postData.filter((post) => post.id !== id);
    res.send(postData);
  } else {
    res.status(400).send("Invalid request. 'id' is missing in the request body.");
  }
});

app.post('/createpost', (req, res) => {
  const { post } = req.body;
  if (post !== undefined) {
    postData.push(post);
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

