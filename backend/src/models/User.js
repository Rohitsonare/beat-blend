const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  profilePicture: {
    type: String,
    default: ''
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Track'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save hook to hash password (would add bcrypt in a real application)
userSchema.pre('save', function(next) {
  // Here you would typically hash the password with bcrypt
  // For now, we'll just log that the user is being saved
  console.log('User being saved:', this.username);
  next();
});

// Method to compare password (would use bcrypt in a real application)
userSchema.methods.comparePassword = function(candidatePassword) {
  // Here you would typically compare with bcrypt
  // For now, just return a placeholder
  return Promise.resolve(candidatePassword === this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;