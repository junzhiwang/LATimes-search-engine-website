import express from 'express';
import bodyParser from 'body-parser';
var searchRouter = express.Router();
import solrFetcher from '../util/solrFetcher';
import speller from '../util/speller';
import path from 'path';
import ContentHelper from '../util/ContentHelper';

searchRouter.get("/:example/:query", (req, res) => {
    let query = req.params.query;
    let example = req.params.example;
    let tokens = query.split(/\s+/);
    let after = [];
    let isChanged = false;
    for(var i in tokens){
        let t = speller.correct(tokens[i]);
        after.push(t);
        if(t !== tokens[i]) isChanged = true;
    }
    let refinedQuery = isChanged?after.join(' '):query;
    solrFetcher.fetchResult(refinedQuery, example)
    .then(docs=>{
        docs.docs.map((doc, i, arr)=>{
            arr[i].url = ContentHelper.fetchUrl(arr[i].id);
        })
        ContentHelper.docs = docs.docs;
        ContentHelper.numFound = docs.numFound;
        ContentHelper.start = docs.start;
        return docs;
    })
    .then(docs=>ContentHelper.getHTMLSnippet2(refinedQuery, 0))
    .then(docs=>{
        let result = {};
        result.items = ContentHelper.docs;
        result.isChanged = isChanged;
        result.query = refinedQuery;
        result.numFound = ContentHelper.numFound;
        result.start = ContentHelper.start;
        res.send(result);
    })
    .catch(err=>console.log(err));
});

module.exports = searchRouter;
