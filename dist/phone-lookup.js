'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function match(value, item) {
  var regexp = new RegExp(escapeRegExp(value), 'i');
  return regexp.test(item.name) || regexp.test(item.phone.replace(/ /g, ''));
}

function isNumber(number) {
  return (/^(\+?255\-?|0)[0123456789]{9}$/.test(number.replace(/ /g, ''))
  );
}

var DefaultResults = (function (_React$Component) {
  _inherits(DefaultResults, _React$Component);

  function DefaultResults(props) {
    _classCallCheck(this, DefaultResults);

    _get(Object.getPrototypeOf(DefaultResults.prototype), 'constructor', this).call(this, props);
  }

  _createClass(DefaultResults, [{
    key: 'render',
    value: function render() {
      var _this = this;

      var results = this.props.results;

      return _react2['default'].createElement(
        'ul',
        { style: { position: 'absolute', background: '#fff', border: '1px solid #ddd', width: '200px', listStyle: 'none', margin: 0, padding: 0, zIndex: 4 } },
        results.map(function (result, key) {
          return _react2['default'].createElement(
            'li',
            { key: key },
            _react2['default'].createElement(
              'span',
              { style: { float: 'right' } },
              result.phone
            ),
            _react2['default'].createElement(
              'a',
              { href: '#', onClick: function () {
                  return _this.props.onSelectionChanged(result);
                } },
              result.name
            )
          );
        })
      );
    }
  }]);

  return DefaultResults;
})(_react2['default'].Component);

var PhoneLookup = (function (_React$Component2) {
  _inherits(PhoneLookup, _React$Component2);

  function PhoneLookup(props) {
    _classCallCheck(this, PhoneLookup);

    var entries = {};
    props.entries.forEach(function (item) {
      entries[item.phone] = item;
    });
    _get(Object.getPrototypeOf(PhoneLookup.prototype), 'constructor', this).call(this, _extends({
      entries: entries }, props));
    this.state = {
      value: '',
      results: [],
      entry: null,
      isNumber: false
    };
  }

  _createClass(PhoneLookup, [{
    key: 'handleChange',
    value: function handleChange(event) {
      var entries = this.props.entries;

      var value = event.target.value;
      var results = value ? _lodash2['default'].pick(entries, function (item) {
        return match(value, item);
      }) : {};
      this.setState({
        value: value,
        results: results,
        isNumber: isNumber(value),
        entry: null
      });
    }
  }, {
    key: 'selectEntry',
    value: function selectEntry(entry) {
      this.setState({
        value: entry ? entry.name : '',
        results: [],
        isNumber: false,
        entry: entry
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.selectEntry();
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var value = _state.value;
      var results = _state.results;
      var entry = _state.entry;
      var isNumber = _state.isNumber;
      var _props = this.props;
      var maxResults = _props.maxResults;
      var resultsComponent = _props.resultsComponent;

      var inputStyle = !!entry ? { backgroundColor: '#fff4a8' } : !!isNumber ? { backgroundColor: '#a8f4a8' } : {};
      var keys = _lodash2['default'].keysIn(results);
      var Results = resultsComponent;
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement('input', {
          style: inputStyle,
          type: 'text',
          value: value,
          onChange: this.handleChange.bind(this)
        }),
        (!!entry || isNumber) && _react2['default'].createElement(
          'span',
          null,
          _react2['default'].createElement(
            'button',
            { onClick: this.reset.bind(this) },
            'Reset'
          ),
          _react2['default'].createElement(
            'button',
            null,
            'Call'
          )
        ),
        !!keys.length && _react2['default'].createElement(Results, {
          onSelectionChanged: this.selectEntry.bind(this),
          results: keys.slice(0, maxResults ? maxResults : -1).map(function (key) {
            return results[key];
          }) })
      );
    }
  }]);

  return PhoneLookup;
})(_react2['default'].Component);

PhoneLookup.defaultProps = {
  maxResults: 10,
  entries: [],
  resultsComponent: DefaultResults
};

exports['default'] = PhoneLookup;
module.exports = exports['default'];

//# sourceMappingURL=phone-lookup.js.map