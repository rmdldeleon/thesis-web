const express = require('express');
const router = express.Router();

//let { genres } = require('../database/database')

router.get('/genres', (req, res) => {
    console.log("asdasdasdasd")
    res.send(genres)
})

router.post('/genres', (req, res) => {
    let result = genres.find( e => e.Genre === req.query.Genre )

    if(result){
        res.send("Genre does not exist ")
        return; 
    }

    let newGenre = {
        "Genre" : req.query.Genre,
        "MoviesCount" : 25
    }

    genres.push(newGenre)

    res.send(newGenre)
})

router.put('/genres/:Genre', (req, res) => {
    let genre = req.params.Genre
    let moviesCount = req.query.MoviesCount

    let result = genres.find( e => e.Genre === genre )

    if(!result){
        res.send("This genre does not exist")
        return;
    }

    result.MoviesCount += parseInt(moviesCount)

    res.send(result)
})

router.delete('/genres/:Genre', (req, res) => {
    let genre = req.params.Genre
    let indexDel = genres.findIndex( e => e.Genre === genre )

    if(indexDel === -1){
        res.send("This genre does not exist")
        return;
    }

    let deletedGenre = genres.splice(indexDel, 1)

    res.send(deletedGenre[0])
})

module.exports = { genresRoutes: router };