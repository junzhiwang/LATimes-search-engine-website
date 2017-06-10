webpackHotUpdate(0,{

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactAutosuggest = __webpack_require__(28);

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Imagine you have a list of languages that you'd like to autosuggest.
var languages = [{
  name: 'Cat',
  year: 1972
}, {
  name: 'Edward',
  year: 2012
}, {
  name: 'Alan',
  year: 2012
}, {
  name: 'Bob',
  year: 2012
}, {
  name: 'David',
  year: 2012
}];

// Teach Autosuggest how to calculate suggestions for any given input value.
var getSuggestions = function getSuggestions(value) {
  var inputValue = value.trim().toLowerCase();
  var inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(function (lang) {
    return lang.name.toLowerCase().slice(0, inputLength) === inputValue;
  });
};

// When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
var getSuggestionValue = function getSuggestionValue(suggestion) {
  return suggestion.name;
};

// Use your imagination to render suggestions.
var renderSuggestion = function renderSuggestion(suggestion) {
  return React.createElement(
    'div',
    null,
    suggestion.name
  );
};

var Suggest = function (_React$Component) {
  _inherits(Suggest, _React$Component);

  function Suggest() {
    _classCallCheck(this, Suggest);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    var _this = _possibleConstructorReturn(this, (Suggest.__proto__ || Object.getPrototypeOf(Suggest)).call(this));

    _this.onChange = function (event, _ref) {
      var newValue = _ref.newValue;

      _this.setState({
        value: newValue
      });
    };

    _this.onSuggestionsFetchRequested = function (_ref2) {
      var value = _ref2.value;

      _this.setState({
        suggestions: getSuggestions(value)
      });
    };

    _this.onSuggestionsClearRequested = function () {
      _this.setState({
        suggestions: []
      });
    };

    _this.renderInputComponent = function () {
      return React.createElement(
        'div',
        null,
        React.createElement('input', { type: 'text', style: { width: 180, height: 40 } })
      );
    };

    _this.state = {
      value: '',
      suggestions: []
    };
    return _this;
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.


  // Autosuggest will call this function every time you need to clear suggestions.


  _createClass(Suggest, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          value = _state.value,
          suggestions = _state.suggestions;
      // Autosuggest will pass through all these props to the input element.

      var inputProps = {
        placeholder: 'Type',
        value: value,
        onChange: this.onChange,
        style: { backgroundColor: 'white', width: 180, height: 40, fontSize: 30 }
      };

      // Finally, render it!
      return React.createElement(_reactAutosuggest2.default, {
        suggestions: suggestions,
        onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
        onSuggestionsClearRequested: this.onSuggestionsClearRequested,
        getSuggestionValue: getSuggestionValue,
        renderSuggestion: renderSuggestion,
        inputProps: inputProps
      });
    }
  }]);

  return Suggest;
}(React.Component);

exports.default = Suggest;

/***/ })

})