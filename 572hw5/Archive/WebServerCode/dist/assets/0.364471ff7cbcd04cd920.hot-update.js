webpackHotUpdate(0,{

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactAutocomplete = __webpack_require__(108);

var _reactAutocomplete2 = _interopRequireDefault(_reactAutocomplete);

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

    function SearchBar(props) {
        _classCallCheck(this, SearchBar);

        var _this = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

        _this.state = {
            isLoading: false,
            suggestItems: [],
            inputValue: '',
            lastToken: ''
        };
        return _this;
    }

    _createClass(SearchBar, [{
        key: 'onSelectItem',
        value: function onSelectItem(value, item) {
            console.log(value);
            var sup = item.term.substring(this.state.lastToken.length);
            var inputValue = this.state.inputValue + sup;
            this.setState({
                inputValue: inputValue
            });
        }
    }, {
        key: 'onChangeInputValue',
        value: function onChangeInputValue(value) {
            var _this2 = this;

            this.setState({
                isLoading: true,
                inputValue: value
            });
            var tokens = value.split(/\s+/);
            if (tokens.length === 0) return;
            var token = tokens[tokens.length - 1];
            if (token.length === 0 || token[0] === '') return;
            this.setState({ lastToken: token });
            _solrFetch2.default.fetchSuggestions(token.toLowerCase(), example).then(function (result) {
                _this2.setState({
                    suggestItems: result,
                    isLoading: false
                });
            }).catch(function (err) {});
        }
    }, {
        key: 'sortItems',
        value: function sortItems(itemA, itemB, value) {
            return itemA.weight < itemB.weight;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var inputProps = {
                style: {
                    width: 500,
                    height: 100
                }
            };
            return _react2.default.createElement(_reactAutocomplete2.default, {
                value: this.state.inputValue,
                inputProps: inputProps,
                items: this.state.suggestItems,
                getItemValue: function getItemValue(item) {
                    return item.term;
                },
                onSelect: function onSelect(value, item) {
                    return _this3.onSelectItem(value, item);
                },
                onChange: function onChange(event, value) {
                    return _this3.onChangeInputValue(value);
                },
                sortItems: function sortItems(itemA, itemB, value) {
                    return _this3.sortItems(itemA, itemB, value);
                },
                renderItem: function renderItem(item, isHighlighted) {
                    return _react2.default.createElement(
                        'div',
                        {
                            style: isHighlighted ? _style.styles.highlightedItem : _style.styles.item,
                            key: item.term,
                            id: item.term
                        },
                        item.term
                    );
                }
            });
        }
    }]);

    return SearchBar;
}(_react2.default.Component);

exports.default = SearchBar;

/***/ })

})