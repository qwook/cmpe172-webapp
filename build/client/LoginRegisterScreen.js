'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _simpleAjax = require('simple-ajax');

var _simpleAjax2 = _interopRequireDefault(_simpleAjax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginRegisterScreen = function (_React$Component) {
  _inherits(LoginRegisterScreen, _React$Component);

  function LoginRegisterScreen(...args) {
    var _temp, _this, _ret;

    _classCallCheck(this, LoginRegisterScreen);

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (LoginRegisterScreen.__proto__ || Object.getPrototypeOf(LoginRegisterScreen)).call(this, ...args)), _this), _this.state = {
      logging: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LoginRegisterScreen, [{
    key: 'loginRegister',
    value: function loginRegister(event) {
      var _this2 = this;

      console.log(this.refs.form.inputName.value);
      console.log(this.refs.form.inputPassword.value);

      this.setState({
        logging: true
      });

      var ajax = new _simpleAjax2.default({
        url: '/api/login_register',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          user: this.refs.form.inputName.value,
          password: this.refs.form.inputPassword.value
        })
      });

      ajax.on('success', function (e) {
        var res = JSON.parse(e.target.response);
        window.location = '/';
      });

      ajax.on('error', function () {
        _this2.setState({
          logging: false
        });
      });

      ajax.send();

      event.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'form',
          { className: 'form-horizontal', ref: 'form', onSubmit: this.loginRegister.bind(this) },
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'inputName', className: 'col-sm-2 control-label' },
              'Name'
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-sm-10' },
              _react2.default.createElement('input', { type: 'text', className: 'form-control', id: 'inputName', placeholder: 'Name' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'inputPassword', className: 'col-sm-2 control-label' },
              'Password'
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-sm-10' },
              _react2.default.createElement('input', { type: 'password', className: 'form-control', id: 'inputPassword', placeholder: 'Password' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'div',
              { className: 'col-sm-offset-2 col-sm-10' },
              _react2.default.createElement(
                'button',
                { type: 'submit', className: 'btn btn-default' },
                this.state.logging ? "Please Wait..." : "Sign in / Register"
              )
            )
          )
        )
      );
    }
  }]);

  return LoginRegisterScreen;
}(_react2.default.Component);

exports.default = LoginRegisterScreen;
//# sourceMappingURL=LoginRegisterScreen.js.map
