const mongoose = require('mongoose');
const { Schema } = mongoose;

const trackSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Track title is required'],
    trim: true
  },
  artist: {
    type: String,
    required: [true, 'Artist name is required'],
    trim: true
  },
  album: {
    type: String,
    trim: true,
    default: ''
  },
  genre: {
    type: String,
    trim: true,
    default: 'Unknown'
  },
  duration: {
    type: Number,  // Duration in seconds
    required: [true, 'Track duration is required']
  },
  coverImage: {
    type: String,
    default: ''
  },
  audioFile: {
    type: String,
    required: [true, 'Audio file path is required']
  },
  releaseDate: {
    type: Date,
    default: Date.now
  },
  playCount: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Virtual for formatted duration
trackSchema.virtual('durationFormatted').get(function() {
  const minutes = Math.floor(this.duration / 60);
  const seconds = this.duration % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});

// Index for search optimization
trackSchema.index({ title: 'text', artist: 'text', album: 'text', genre: 'text' });

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;