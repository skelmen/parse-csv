var express = require('express');
var router = express.Router();
var fs = require('fs');
const csv = require('csvtojson');
const Json2csvParser = require('json2csv').Parser;

var Users = require('../models/users');

/* Main page Route */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Upload CSV' });
});

/* Upload and Parse CSV file */
router.post('/', (req, res) => {
  let uploadedFile = req.files.csvFile;
  uploadedFile.mv('temp/'+ uploadedFile.name, (err) => {
    if (err)
      return res.status(500).send(err);

    res.send('File was uploaded!');

    /**
     * Clear collection
     */ 
    Users.remove({}, (err) => {
        if (err) console.log(err);
      }
    );

    /**
     * Open file and parse to json
     */
    const csvFilePath='temp/'+ uploadedFile.name;
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      for (var i in jsonObj) {
        var singleUser = new Users({
          UserName: jsonObj[i].UserName,
          FirstName: jsonObj[i].FirstName,
          LastName: jsonObj[i].LastName,
          Age: jsonObj[i].Age
        });
  
        singleUser.save(function(err){
          if(err) console.log(err);
        });
      }        
    });
  });
}); 

/* Users to JSON */
router.get('/getUsers', (req, res) => {
  Users.find({}, (err, result) => {
    if(err) throw err;
    res.json(result);
  });
});

/* Download CSV file */
router.post('/download', (req, res) => {
  Users.find({}, (err, result) => {
    var file = 'temp/output.csv';
    var csvFile = fs.createWriteStream(file);

    /* Parse JSON to CSV content format */
    var fields = ['UserName', 'FirstName', 'LastName', 'Age'];
    var json2csvParser = new Json2csvParser({ fields, quote: '' });
    var csvData = json2csvParser.parse(result);

    /* Whrite data to file */
    csvFile.write(csvData);
    csvFile.end();
    csvFile.on('finish', () => {
      res.download(file);
    });
  });
});

module.exports = router;
