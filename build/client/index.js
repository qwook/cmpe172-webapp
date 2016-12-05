'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./ext.js');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _UserBox = require('./UserBox');

var _UserBox2 = _interopRequireDefault(_UserBox);

var _MainScreen = require('./MainScreen');

var _MainScreen2 = _interopRequireDefault(_MainScreen);

var _ItemScreen = require('./ItemScreen');

var _ItemScreen2 = _interopRequireDefault(_ItemScreen);

var _PostScreen = require('./PostScreen');

var _PostScreen2 = _interopRequireDefault(_PostScreen);

var _LoginRegisterScreen = require('./LoginRegisterScreen');

var _LoginRegisterScreen2 = _interopRequireDefault(_LoginRegisterScreen);

var _NotificationScreen = require('./NotificationScreen');

var _NotificationScreen2 = _interopRequireDefault(_NotificationScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-12 col-sm-6' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/', style: { textDecoration: "none" } },
              _react2.default.createElement(
                'h1',
                null,
                'Spartan Market'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-12 col-sm-6' },
            _react2.default.createElement(_UserBox2.default, { loggedIn: true })
          )
        ),
        _react2.default.createElement('hr', null),
        this.props.children ? this.props.children : _react2.default.createElement(_MainScreen2.default, null),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'p',
          null,
          'Copyright Troy/Dustin/Henry \xA9 2016'
        )
      );
    }
  }]);

  return App;
}(_react2.default.Component);

var node = document.getElementById("app");
_reactDom2.default.render(_react2.default.createElement(
  _reactRouter.Router,
  { history: _reactRouter.browserHistory },
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: App },
    _react2.default.createElement(_reactRouter.Route, { path: '/post', component: _PostScreen2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/login', component: _LoginRegisterScreen2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/notif', component: _NotificationScreen2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/item/:itemId', component: _ItemScreen2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '*', component: _MainScreen2.default })
  )
), node);
//# sourceMappingURL=index.js.map
