import fs from 'fs';
import line_reader from 'line-reader';
import path from 'path';
import htmlToText from 'html-to-text';
const cheerio = require('cheerio');
const prefix = '/Users/junzhiwa/Downloads/LATimesData/LATimesDownloadData/';
const resourePrefix = '/Users/junzhiwa/Downloads/webtest/dist/res/data/';
let ContentHelper = {};
ContentHelper.urlMapper = {};
ContentHelper.docs = {};
ContentHelper.loadUrlMapper = () => {
    let list = path.resolve(__dirname, '../res/dict/mapLATimesDataFile.csv');
    line_reader.eachLine(list, (line, last) => {
        let tokens = line.split(',');
        let doc = tokens[0];
        let url;
        if(tokens.length > 2){
            url = tokens.slice(1,tokens.length).join(',');
        } else url = tokens[1];
        ContentHelper.urlMapper[doc] = url;
    })
}
ContentHelper.fetchUrl = (doc) => {
    if(!ContentHelper.urlMapper[doc.slice(prefix.length, doc.length)]) ContentHelper.loadUrlMapper();
    return ContentHelper.urlMapper[doc.slice(prefix.length, doc.length)];
}
ContentHelper.match = (query, sentences, title, pos) => {
    if(pos >= sentences.length) return;
    if((title && title.indexOf(sentences[pos].toLowerCase().trim()) === -1 || !title) && sentences[pos].toLowerCase().match(query)) return sentences[pos];
    return ContentHelper.match(query, sentences, title, pos + 1);
}
ContentHelper.getHTMLSnippet = (query, pos) => {
    if(pos >= ContentHelper.docs.length) return ContentHelper.docs;
    let doc = ContentHelper.docs[pos];
    let file = resourePrefix + doc.id.slice(prefix.length, doc.id.length);
    let content = fs.readFileSync(file, 'utf-8');
    let text = htmlToText.fromString(content);
    let sentences = text.toLowerCase().split(/[\n]{2,}/);
    ContentHelper.docs[pos].snippet = ContentHelper.match(query, sentences, 0);
    return ContentHelper.getHTMLSnippet(query, pos + 1);
}
ContentHelper.getHTMLSnippet2 = (query, pos) => {
    if(pos >= ContentHelper.docs.length) return ContentHelper.docs;
    let doc = ContentHelper.docs[pos];
    let file = resourePrefix + doc.id.slice(prefix.length, doc.id.length - 4) + 'txt';
    let content = fs.readFileSync(file, 'utf-8');
    let sentences = content.split(/[\n]{1,}/);
    /*const $ = cheerio.load(content);
    let sentences = $('p').contents().map(function() {
        if(this.type === 'text') console.log(this.data.trim());
        return (this.type === 'text') ? this.data.trim():'';
    }).get();*/
    ContentHelper.docs[pos].snippet = ContentHelper.match(query, sentences, doc.title?doc.title[0].toLowerCase():null, 0);
    return ContentHelper.getHTMLSnippet2(query, pos + 1);
}
module.exports = ContentHelper;
