const URL_PREFIX = 'http://localhost:8983/solr/';
const SUGG_URL_MID = '/suggest?q=';
const URL_SUFFIX = '&wt=json';
const SELE_URL_MID = '/select?q=';
import request from 'request';
var SolrFetcher = {};
SolrFetcher.genResultFetchUrl = (query, example) => {
    return URL_PREFIX + example + SELE_URL_MID + query + URL_SUFFIX;
}
SolrFetcher.extractResult = (query, result) => {
    return result.response;
}
SolrFetcher.fetchResult = (query, example) => {
    let url = SolrFetcher.genResultFetchUrl(query, example);
    return new Promise((resolve, reject)=>{
      request(url,(err, response, body)=>{
          if(!err) {
            resolve(SolrFetcher.extractResult(query, JSON.parse(body)));
          }
          else {
          //  console.log(err);
            reject(err);
          }
      });
    });
}

SolrFetcher.genSuggestionsFetchUrl = (query, example) => {
    return URL_PREFIX + example + SUGG_URL_MID + query + URL_SUFFIX;
}
SolrFetcher.extractSuggestions = (query, result) => {
    let s = JSON.stringify(result.suggest.suggest);
    let items = JSON.parse(s.substring(s.indexOf(query) + query.length + 2, s.length - 1)).suggestions;
    items = items.filter((item)=>{
        return item.term.match(/^[a-z]+/)[0] === item.term;
    })
    items.sort((a, b)=>{return b.weight - a.weight});
    if(items.length > 5) items = items.slice(0, 5);
    return items;
}
SolrFetcher.fetchSuggestions = (query, example) => {
  let url = SolrFetcher.genSuggestionsFetchUrl(query, example);
  return new Promise((resolve, reject)=>{
    request(url,(err, response, body)=>{
        if(!err) {
          resolve(SolrFetcher.extractSuggestions(query, JSON.parse(body)));
        }
        else {
        //  console.log(err);
          reject(err);
        }
    });
  });
}
module.exports = SolrFetcher;
