'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _simpleAjax = require('simple-ajax');

var _simpleAjax2 = _interopRequireDefault(_simpleAjax);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserBox = function (_React$Component) {
  _inherits(UserBox, _React$Component);

  function UserBox(...args) {
    var _temp, _this, _ret;

    _classCallCheck(this, UserBox);

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (UserBox.__proto__ || Object.getPrototypeOf(UserBox)).call(this, ...args)), _this), _this.state = {
      user: { loggedIn: false }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(UserBox, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.loggedInFn = this.loggedIn.bind(this);
      _User2.default.addListener(this.loggedInFn);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _User2.default.removeListener(this.loggedInFn);
    }
  }, {
    key: 'loggedIn',
    value: function loggedIn(state) {
      console.log(state);
      this.setState({
        user: state
      });
    }
  }, {
    key: 'logOut',
    value: function logOut(e) {

      var ajax = new _simpleAjax2.default({
        url: '/api/logout',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({})
      });

      ajax.on('success', function (e) {
        window.location = '/';
      });

      ajax.on('error', function () {});

      ajax.send();

      e.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      console.log(this.props);
      return _react2.default.createElement(
        'div',
        { className: 'row' },
        this.state.user.loggedIn ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'col-xs-8' },
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'div',
              { className: 'pull-right', style: { textAlign: "right" } },
              'Welcome, ',
              _react2.default.createElement(
                'strong',
                null,
                this.state.user.username
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '#', onClick: this.logOut.bind(this) },
                  'Logout'
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-4' },
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/post', className: 'btn btn-success', style: { width: "100%" } },
              '+ Post'
            )
          )
        ) : _react2.default.createElement(
          'div',
          { className: 'col-xs-12' },
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'div',
            { className: 'pull-right' },
            ' ',
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/login' },
              'Login'
            ),
            ' / ',
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/login' },
              'Register'
            ),
            ' '
          )
        )
      );
    }
  }]);

  return UserBox;
}(_react2.default.Component);

exports.default = UserBox;
//# sourceMappingURL=UserBox.js.map
