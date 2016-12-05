'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleAjax = require('simple-ajax');

var _simpleAjax2 = _interopRequireDefault(_simpleAjax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = new (function () {
  function User() {
    _classCallCheck(this, User);

    this.listeners = [];

    this.reload();
  }

  _createClass(User, [{
    key: 'addListener',
    value: function addListener(fn) {
      if (this.listeners.indexOf(fn) == -1) {
        this.listeners.push(fn);
      }
    }
  }, {
    key: 'removeListener',
    value: function removeListener(fn) {
      if (this.listeners.indexOf(fn) != -1) {
        this.listeners.remove(this.listeners.indexOf(fn), 1);
      }
    }
  }, {
    key: 'dispatch',
    value: function dispatch(arg) {
      for (var listener of this.listeners) {
        listener(arg);
      }
    }
  }, {
    key: 'reload',
    value: function reload() {
      var _this = this;

      var ajax = new _simpleAjax2.default({
        url: '/api/current_user',
        method: 'GET',
        contentType: 'application/json'
      });

      ajax.on('success', function (e) {
        console.log(e.target.response);

        var res = JSON.parse(e.target.response);

        if (res.success) {
          _this.state = res;
          _this.state.loggedIn = true;
        } else {
          _this.state = {};
          _this.state.loggedIn = false;
        }

        _this.dispatch(_this.state);
      });

      ajax.on('error', function () {
        _this.setState({
          error: "Ajax Error",
          loading: false
        });
      });

      ajax.send();
    }
  }]);

  return User;
}())();
//# sourceMappingURL=User.js.map
