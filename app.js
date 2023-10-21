const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Student = require('./models/studentSchema');

const app = express()
const port = 3000
const DBURL = 'mongodb+srv://ntphat21:nguyenthuanphat@cluster0.psf5mkd.mongodb.net/students?retryWrites=true&w=majority'

app.use(express.json());
app.use(bodyParser.json());

//connect to database
mongoose.connect(DBURL)
.then(() => {console.log('Database conected successfully')})
.catch((error) => {
  console.log(error);
})

//home page
app.get('/', (req, res) => {
  res.send('Home page')
})

//C - Create new student
app.post('/students', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(200).json({message: 'success'});
  } catch (err) {
    console.log(err.message);
    let msg = err.message;
    if (err.code == 11000) {
      msg = 'duplicate field';
    }
    res.status(500).json({error: msg});
  }
})

//R - Read all data in collection students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (err) {
    console.log(err.message);
    let msg = err.message;
    res.status(500).json({error: msg});
  }
})

//R - Read student's data by Mssv
app.get('/students/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const students = await Student.findOne({Mssv: id});
    if (!students) {
      res.status(404).json({error: 'Student not found'});
    } else{
      res.status(200).json(students);
    }
  } catch (err) {
    console.log(err.message);
    let msg = err.message;
    res.status(500).json({error: msg});
  }
})

//U - Update student by Mssv
app.put('/students/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const students = await Student.updateOne({Mssv: id}, req.body);
    if (!students) {
      res.status(404).json({error: 'Student not found'});
    } else {
      res.status(200).json({message: 'success'});
    }
  } catch (err) {
    console.log(err.message);
    let msg = err.message;
    res.status(500).json({error: msg});
  }
})

//D - Delete student by Mssv
app.delete('/students/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const students = await Student.deleteOne({Mssv: id}, req.body);
    if (!students) {
      res.status(404).json({error: 'Student not found'});
    } else {
      res.status(200).json({message: 'success'});
    }
  } catch (err) {
    console.log(err.message);
    let msg = err.message;
    res.status(500).json({error: msg});
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})