webpackHotUpdate(0,{

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SUGG_URL_PREFIX = 'http://localhost:8080/suggest/';
var SUGG_URL_MID = '/suggest?q=';
var SUGG_URL_SUFFIX = '&wt=json';

var SolrFetch = function () {
    function SolrFetch() {
        _classCallCheck(this, SolrFetch);
    }

    _createClass(SolrFetch, null, [{
        key: 'fetchSuggestions',
        value: function fetchSuggestions(query, example) {
            var url = SUGG_URL_PREFIX;
            console.log(url);
            return new Promise(function (resolve, reject) {
                fetch(url, {
                    method: 'Get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ query: query, example: example })

                }).then(function (response) {
                    resolve(response);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }
    }]);

    return SolrFetch;
}();

exports.default = SolrFetch;

/***/ })

})