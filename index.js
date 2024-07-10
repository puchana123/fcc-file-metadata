var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');

const upload = multer({ dest: 'uploads' }); // destination as "uploads" folder
var app = express();

app.use(cors());
app.use(express.json()); // like body-parser
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// handle post file
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // multer is a middleware to handle file upload as req.file
  const upload_data = req.file;
  res.json({
    name: upload_data.originalname,
    type: upload_data.mimetype,
    size: upload_data.size
  })
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
