const cars = require('express').Router()
const db = require('../models')
const { Car } = db

// GET ALL BOOKS
cars.get('/', async (req, res) => {
    try {
        const foundCars = await cars.findAll()
        res.status(200).json(foundCars)
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

module.exports = cars