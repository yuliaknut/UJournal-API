const express = require('express')
const app = express()
const port = 3001
const mongoose = require('mongoose')
const EntryModel = require('./models/Entries')
const cors = require('cors')

mongoose.connect('mongodb://127.0.0.1:27017/UJournalDB')
app.use(express.json())
app.use(cors())
// Requests targeting all entries
app.route('/entries')
  .get((req, res) => {

    EntryModel.find({}).then((err, foundEntries) => {
      if (err) {
        res.send(err);
      } else {
        res.send(foundEntries);
      }
    });
  })

  .post((req, res) => {
  
    const newEntry = new EntryModel({
      content: req.body.content,
      date: req.body.date,
      lastEdited: req.body.lastEdited,
      emotion: req.body.emotion
    });

    newEntry.save().then((err) => {
      if (err) {
        res.send(err)
      } else {
        console.log('Successfully added a new entry.')
      }
    });
    
  });

  // Requests targeting specific entry
app.route('/entries/:entryId')
  .get((req, res) => {

    EntryModel.findOne({_id: req.params.entryId}).then((err, foundEntry) => {
      if (foundEntry) {
        res.send(foundEntry);
      } else {
        res.send(err);
      }
    })
  })

  .patch((req, res) => {

    EntryModel.updateOne(
      {_id: req.params.entryId},
      {$set: req.body}).then((err) => {
        if (err) {
          res.send(err);
        } else {
          console.log('Successfully updated entry');
        }

    })
  })

  .delete((req, res) => {

    EntryModel.deleteOne({_id: req.params.entryId}).then((err) => {
      if (err) {
        res.send(err);
      } else {
        console.log('Successfully deleted entry');
      }

    })
  })



  // app.delete((req, res) => {})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})