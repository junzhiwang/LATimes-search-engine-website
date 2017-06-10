import express from 'express';
import bodyParser from 'body-parser';
var suggestRouter = express.Router();
import solrFetcher from '../util/solrFetcher';
import path from 'path';

suggestRouter.get("/:example/:query", (req, res) => {
    let query = req.params.query;
    let example = req.params.example;
    solrFetcher.fetchSuggestions(query, example)
    .then(result=>{
        res.send(result);
    })
    .catch(err=>console.log(err));
});

module.exports = suggestRouter;
