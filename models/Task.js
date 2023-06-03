const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['completed', 'pending'], default: 'pending' },
  userId: { type: mongoose.Schema.Types.ObjectId},
});

module.exports = mongoose.model('Task', taskSchema);
