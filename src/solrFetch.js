const SUGG_URL_PREFIX = 'http://localhost:8080/suggest/';
const SELE_URL_PREFIX = 'http://localhost:8080/select/';
const SNIP_URL_PREFIX = 'http://localhost:8080/snippet/';
const SUGG_URL_MID = '/suggest?q=';
const SUGG_URL_SUFFIX = '&wt=json';
export default class SolrFetch{
    static fetchSnippet(example, doc){
        let url = 'http://www.latimes.com/opinion/endorsements/la-ed-galperin-endorsement-20170203-story.html';
        return new Promise((resolve, reject)=> {
            fetch(url, {
                method:'Get',
                headers:{
                    'Access-Control-Allow-Origin':'http://localhost:8080'
                }
            })
            .then(response=>{
                resolve(response.text());
            })
            .catch(err=>reject(err));
        })
    }
    static fetchResult(query, example){
        let url = SELE_URL_PREFIX + example + '/' + query;
        return new Promise((resolve, reject) => {
            fetch(url, {
                method:'Get',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                }
            })
            .then(response=>{
                if(response) console.log(response);
                else console.log('no data');
                resolve(response.json())
            })
            .catch(err=>{
                reject(err);
            })
        });
    }
    static fetchSuggestions(query, example){
        let url = SUGG_URL_PREFIX + example + '/' + query;
        return new Promise((resolve, reject) => {
            fetch(url, {
                method:'Get',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                }
            })
            .then(response=> {
                if(response) console.log(response);
                else console.log('no data');
                resolve(response.json())
            })
            .catch(err=>{
                reject(err);
            })
        })
    }
}
