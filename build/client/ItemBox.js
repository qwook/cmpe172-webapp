'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SmartImage = require('./SmartImage');

var _SmartImage2 = _interopRequireDefault(_SmartImage);

var _Comments = require('./Comments');

var _Comments2 = _interopRequireDefault(_Comments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ItemBox = function (_React$Component) {
  _inherits(ItemBox, _React$Component);

  function ItemBox() {
    _classCallCheck(this, ItemBox);

    return _possibleConstructorReturn(this, (ItemBox.__proto__ || Object.getPrototypeOf(ItemBox)).apply(this, arguments));
  }

  _createClass(ItemBox, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'panel panel-default' },
        _react2.default.createElement(_SmartImage2.default, { src: 'http://placehold.it/500x500' }),
        _react2.default.createElement(
          'div',
          { className: 'panel-body' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-xs-8' },
              _react2.default.createElement(
                'h4',
                null,
                'Tickets to Some Show'
              ),
              _react2.default.createElement(
                'p',
                null,
                'Yeah yeah yeah!'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-xs-4' },
              _react2.default.createElement(
                'p',
                { style: { fontWeight: "bold", color: "green", fontSize: "18pt" } },
                '$100'
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'div',
                  { className: 'btn btn-success' },
                  'Contact'
                )
              )
            )
          ),
          _react2.default.createElement('hr', null),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-xs-12' },
              _react2.default.createElement(_Comments2.default, null)
            )
          )
        )
      );
    }
  }]);

  return ItemBox;
}(_react2.default.Component);

exports.default = ItemBox;
//# sourceMappingURL=ItemBox.js.map