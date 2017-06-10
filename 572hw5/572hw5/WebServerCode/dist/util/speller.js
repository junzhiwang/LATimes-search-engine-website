import fs from 'fs';
import path from 'path';
var speller = {};
speller.nWords = {};
speller.load = function(path){
  var file = 'dictionary.txt';
  var content = fs.readFileSync(path,'utf-8');
  var list = content.split(/\s+/);
  for(var x in list){
      speller.train(list[x]);
  }
  fs.appendFile(file, JSON.stringify(speller.nWords), (err)=>{
      if(err) console.log(err);
  })
}
speller.train = function (text) {
  var m;
  var i = 0;
  if ((m = /[a-z]+/g.exec(text.toLowerCase()))) {
    speller.nWords[m[0]] = speller.nWords.hasOwnProperty(m[0]) ? speller.nWords[m[0]] + 1 : 1;
  }
};
speller.correct = function (word) {
  if (!speller.nWords['science']){
      var file = path.resolve(__dirname, '../res/dict/dictionary.txt');
      let content = fs.readFileSync(file, 'utf-8');
      speller.nWords = JSON.parse(content);
  }
  if (speller.nWords.hasOwnProperty(word)) return word;
  var candidates = {}, list = speller.edits(word);
  list.forEach(function (edit) {
    if (speller.nWords.hasOwnProperty(edit)) candidates[speller.nWords[edit]] = edit;
  });
  if (speller.countKeys(candidates) > 0) return candidates[speller.max(candidates)];
  list.forEach(function (edit) {
    speller.edits(edit).forEach(function (w) {
      if (speller.nWords.hasOwnProperty(w)) candidates[speller.nWords[w]] = w;
    });
  });
  return speller.countKeys(candidates) > 0 ? candidates[speller.max(candidates)] : word;
};
speller.countKeys = function (object) {
  var attr, count = 0;
  for (attr in object)
    if (object.hasOwnProperty(attr))
      count++;
  return count;
};
speller.max = function (candidates) {
  var candidate, arr = [];
  for (candidate in candidates)
    if (candidates.hasOwnProperty(candidate))
      arr.push(candidate);
  return Math.max.apply(null, arr);
};
speller.letters = "abcdefghijklmnopqrstuvwxyz".split("");
speller.edits = function (word) {
  var i, results = [];
  for (i=0; i < word.length; i++)
    results.push(word.slice(0, i) + word.slice(i+1));
  for (i=0; i < word.length-1; i++)
    results.push(word.slice(0, i) + word.slice(i+1, i+2) + word.slice(i, i+1) + word.slice(i+2));
  for (i=0; i < word.length; i++)
    speller.letters.forEach(function (l) {
      results.push(word.slice(0, i) + l + word.slice(i+1));
    });
  for (i=0; i <= word.length; i++)
    speller.letters.forEach(function (l) {
      results.push(word.slice(0, i) + l + word.slice(i));
    });
  return results;
};
module.exports = speller;
