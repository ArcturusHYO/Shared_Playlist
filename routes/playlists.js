const express = require('express')
const router = express.Router()
const Playlist = require('../models/playlist')

router.get('/', async (req, res) => {
    try {
        const playlist = await Playlist.find()
        res.json(playlist)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


router.post('/', async (req, res) => {
    try {
        const playlist = new Playlist({
            song: req.body.song,
            artist: req.body.artist
        })
        const newPlaylist = await playlist.save()
        res.status(201).json(newPlaylist)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})




module.exports = router