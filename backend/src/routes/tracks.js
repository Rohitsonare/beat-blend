const express = require('express');
const router = express.Router();
const Track = require('../models/Track');

// Get all tracks
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find().populate('createdBy', 'username');
    res.json(tracks);
  } catch (error) {
    console.error('Error fetching tracks:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get track by ID
router.get('/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id).populate('createdBy', 'username');
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }
    res.json(track);
  } catch (error) {
    console.error('Error fetching track:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new track
router.post('/', async (req, res) => {
  try {
    const { title, artist, album, genre, duration, coverImage, audioFile, createdBy } = req.body;
    
    // Create new track
    const track = new Track({
      title,
      artist,
      album,
      genre,
      duration,
      coverImage,
      audioFile,
      createdBy
    });
    
    await track.save();
    res.status(201).json(track);
  } catch (error) {
    console.error('Error creating track:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update track
router.put('/:id', async (req, res) => {
  try {
    const { title, artist, album, genre, duration, coverImage, audioFile } = req.body;
    
    // Build update object
    const updateFields = {};
    if (title) updateFields.title = title;
    if (artist) updateFields.artist = artist;
    if (album) updateFields.album = album;
    if (genre) updateFields.genre = genre;
    if (duration) updateFields.duration = duration;
    if (coverImage) updateFields.coverImage = coverImage;
    if (audioFile) updateFields.audioFile = audioFile;
    
    // Update track
    const track = await Track.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }
    
    res.json(track);
  } catch (error) {
    console.error('Error updating track:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete track
router.delete('/:id', async (req, res) => {
  try {
    const track = await Track.findByIdAndDelete(req.params.id);
    
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }
    
    res.json({ message: 'Track deleted successfully' });
  } catch (error) {
    console.error('Error deleting track:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Increment play count
router.put('/:id/play', async (req, res) => {
  try {
    const track = await Track.findByIdAndUpdate(
      req.params.id,
      { $inc: { playCount: 1 } },
      { new: true }
    );
    
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }
    
    res.json(track);
  } catch (error) {
    console.error('Error updating play count:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search tracks
router.get('/search/:query', async (req, res) => {
  try {
    const searchQuery = req.params.query;
    const tracks = await Track.find(
      { $text: { $search: searchQuery } },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .populate('createdBy', 'username');
    
    res.json(tracks);
  } catch (error) {
    console.error('Error searching tracks:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;