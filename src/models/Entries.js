const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true},
  date: {
    type: String,
    trim: true},
  lastEdited: {
    type: String,
    trim: true},
  emotion: {
    type: Number,
    trim: true}
})

const EntryModel = mongoose.model('Entry', entrySchema)

module.exports = EntryModel;
