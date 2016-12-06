'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _simpleAjax = require('simple-ajax');

var _simpleAjax2 = _interopRequireDefault(_simpleAjax);

var _ItemBox = require('./ItemBox');

var _ItemBox2 = _interopRequireDefault(_ItemBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ItemScreen = function (_React$Component) {
  _inherits(ItemScreen, _React$Component);

  function ItemScreen(...args) {
    var _temp, _this, _ret;

    _classCallCheck(this, ItemScreen);

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (ItemScreen.__proto__ || Object.getPrototypeOf(ItemScreen)).call(this, ...args)), _this), _this.state = {
      posts: []
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ItemScreen, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var ajax = new _simpleAjax2.default({
        url: '/api/feed/',
        method: 'GET',
        contentType: 'application/json'
      });

      ajax.on('success', function (e) {
        console.log(e.target.response);

        var res = JSON.parse(e.target.response);

        if (res.success) {
          _this2.setState({
            posts: res.posts
          });
        } else {
          _this2.setState({
            error: res.err
          });
        }
      });

      ajax.on('error', function () {
        _this2.setState({
          error: "Ajax Error",
          loading: false
        });
      });

      ajax.send();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          this.state.posts.map(function (post) {
            return _react2.default.createElement(
              'div',
              { key: post._id, className: 'col-xs-12 col-sm-6' },
              _react2.default.createElement(_ItemBox2.default, { post: post })
            );
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'btn btn-primary', style: { width: "100%" } },
          'Load More'
        )
      );
    }
  }]);

  return ItemScreen;
}(_react2.default.Component);

exports.default = ItemScreen;
//# sourceMappingURL=MainScreen.js.map
