webpackHotUpdate(0,{

/***/ 108:
false,

/***/ 205:
false,

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _solrFetch = __webpack_require__(87);

var _solrFetch2 = _interopRequireDefault(_solrFetch);

var _style = __webpack_require__(88);

var _react = __webpack_require__(19);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(117);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var example = 'mytest';

var SearchBar = function (_React$Component) {
  _inherits(SearchBar, _React$Component);

  function SearchBar() {
    _classCallCheck(this, SearchBar);

    return _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).apply(this, arguments));
  }

  _createClass(SearchBar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          Row,
          null,
          _react2.default.createElement(
            Col,
            { span: 8 },
            '1'
          ),
          _react2.default.createElement(
            Col,
            { span: 8 },
            '2'
          ),
          _react2.default.createElement(
            Col,
            { span: 8 },
            '3'
          )
        )
      );
    }
  }]);

  return SearchBar;
}(_react2.default.Component);

exports.default = SearchBar;

/***/ }),

/***/ 90:
false,

/***/ 91:
false,

/***/ 92:
false

})