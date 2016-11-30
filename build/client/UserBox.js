"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserBox = function (_React$Component) {
  _inherits(UserBox, _React$Component);

  function UserBox() {
    _classCallCheck(this, UserBox);

    return _possibleConstructorReturn(this, (UserBox.__proto__ || Object.getPrototypeOf(UserBox)).apply(this, arguments));
  }

  _createClass(UserBox, [{
    key: "render",
    value: function render() {
      console.log(this.props);
      return _react2.default.createElement(
        "div",
        null,
        this.props.loggedIn,
        _react2.default.createElement("br", null),
        this.props.loggedIn ? _react2.default.createElement(
          "div",
          { className: "pull-right", style: { textAlign: "right" } },
          "Welcome, ",
          _react2.default.createElement(
            "strong",
            null,
            "User"
          ),
          _react2.default.createElement(
            "p",
            null,
            _react2.default.createElement(
              "a",
              { href: "#" },
              "1000 Notifications"
            )
          )
        ) : _react2.default.createElement(
          "div",
          { className: "pull-right" },
          " ",
          _react2.default.createElement(
            "a",
            { href: "#" },
            "Login"
          ),
          " / ",
          _react2.default.createElement(
            "a",
            null,
            "Register"
          ),
          " "
        )
      );
    }
  }]);

  return UserBox;
}(_react2.default.Component);

exports.default = UserBox;
//# sourceMappingURL=UserBox.js.map
