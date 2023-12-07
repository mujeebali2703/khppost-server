const express = require('express');
const app = express();
const port = 3180;
var cors = require('cors');

app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '200MB' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '200MB', parameterLimit: 20000 }));
app.use(bodyParser.raw()); // Change '5mb' to your desired limit

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
  // Write logic to find and update post fom array
  // if (post !== undefined) {
  //   postData.push(post);
  //   res.send(post);
  // } else {
  //   res.status(400).send("Invalid request. 'id' is missing in the request body.");
  // }
});



app.get('/', (req, res) => {
  res.send('Hello Wajahat!!');
})

app.listen(port, () => {
  console.log('Express App Running!!');
})

