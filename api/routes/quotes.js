const express = require('express');

const router = express.Router();

const Quote = require('../models/Quote');

const getQuote = async (req, res, next) => {
    let quote
    try {
        quote = await Quote.findById(req.params.id)
        if(quote === null){
            return res.status(404).json({ message: " I hate to say it, but it looks like the quote you're searching for doesn't exist."})
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.quote = quote
    next();
}

//GET all quotes
router.get('/', async (req, res) => {
    try {
        const quotes = await Quote.find()
        res.json(quotes)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//GET one quote
router.get('/:id', getQuote, (req, res) => {
    res.json(res.quote)
})


//POST quote
router.post('/', async (req, res) => {
    const quotes = await Quote.find()
    let search = quotes.filter((entry) => entry.quote === req.body.quote.toLowerCase());
    if(search.length > 0){
        res.status(409).json({ message: "Duplicate entry. This quote already exists."})
    } else {
        const quote = new Quote({
            author: req.body.author,
            speaker: req.body.speaker,
            quote: req.body.quote,
            tags: req.body.tags,
            gen_src: req.body.gen_src,
            exact_src: req.body.exact_src,
            era: req.body.era,
        })
        try {
            const newQuote = await quote.save();
            res.status(201).json(newQuote);
    
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    
})

//PATCH quote
router.patch('/:id', getQuote, async (req, res) => {
    if(req.body.author != null){
        res.quote.author = req.body.author
    }
    if(req.body.speaker != null){
        res.quote.speaker = req.body.speaker
    }
    if(req.body.quote != null){
        res.quote.quote = req.body.quote
    }
    if(req.body.tags != null){
        res.quote.tags = req.body.tags
    }
    if(req.body.gen_src != null){
        res.quote.gen_src = req.body.gen_src
    }
    if(req.body.exact_src != null){
        res.quote.exact_src = req.body.exact_src
    }
    if(req.body.era != null){
        res.quote.era = req.body.era
    }
    try{
        const updatedQuote = await res.quote.save()
        res.json(updatedQuote)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//DELETE quote
router.delete('/:id', getQuote, async (req, res) => {
    let quote = res.quote;
    let id = quote._id;
    try {
        const deletedQuote = await Quote.deleteOne({
            _id: id
        });
        res.json({ message: "Quote deleted", deletedQuote})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;

