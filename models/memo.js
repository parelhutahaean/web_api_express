const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memoSchema = new Schema({
  memo: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const Memo = mongoose.model('Memo', memoSchema);

module.exports = Memo;
