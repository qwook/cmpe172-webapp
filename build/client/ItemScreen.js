'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _simpleAjax = require('simple-ajax');

var _simpleAjax2 = _interopRequireDefault(_simpleAjax);

var _SmartImage = require('./SmartImage');

var _SmartImage2 = _interopRequireDefault(_SmartImage);

var _Comments = require('./Comments');

var _Comments2 = _interopRequireDefault(_Comments);

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
      commentHidden: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ItemScreen, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var ajax = new _simpleAjax2.default({
        url: '/api/item/' + this.props.params.itemId,
        method: 'GET',
        contentType: 'application/json'
      });

      ajax.on('success', function (e) {
        console.log(e.target.response);

        var res = JSON.parse(e.target.response);

        if (res.success) {
          _this2.setState({
            title: res.title,
            description: res.description,
            user: res.user,
            price: res.price,
            comments: res.comments
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
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this.refs.commentInput.focus();
      $(this.refs.hideCommentButton).tooltip({ selector: true, title: function () {
          return _this3.state.commentHidden ? "Only " + (_this3.state.user ? _this3.state.user.username : "ERR") + " can see this comment." : "Everyone can see this comment.";
        } });
    }
  }, {
    key: 'toggleCommentHide',
    value: function toggleCommentHide() {
      var _this4 = this;

      this.setState({
        commentHidden: !this.state.commentHidden
      });
      // $(this.refs.hideCommentButton).tooltip('hide');
      setTimeout(function () {
        return $(_this4.refs.hideCommentButton).tooltip('show');
      }, 0);
    }
  }, {
    key: 'render',
    value: function render() {
      console.log(this.props.params.itemId);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-12' },
            _react2.default.createElement(
              'p',
              { style: { fontWeight: "bold" } },
              this.state.user ? this.state.user.username : null
            )
          )
        ),
        _react2.default.createElement(_SmartImage2.default, { src: "/image/" + this.props.params.itemId }),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-8' },
            _react2.default.createElement(
              'h4',
              null,
              this.state.title
            ),
            _react2.default.createElement(
              'p',
              null,
              this.state.description
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-4' },
            _react2.default.createElement(
              'p',
              { style: { fontWeight: "bold", color: "green", fontSize: "18pt" } },
              '$',
              this.state.price
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
            _react2.default.createElement(_Comments2.default, null),
            _react2.default.createElement(
              'form',
              { className: 'input-group' },
              _react2.default.createElement('input', { className: 'form-control', type: 'text', ref: 'commentInput' }),
              _react2.default.createElement(
                'span',
                { className: 'input-group-btn', ref: 'hideCommentButton', 'data-toggle': 'tooltip', 'data-placement': 'left' },
                _react2.default.createElement(
                  'div',
                  { className: 'btn btn-default', onClick: this.toggleCommentHide.bind(this) },
                  _react2.default.createElement('span', { className: "glyphicon " + (this.state.commentHidden ? "glyphicon-eye-close" : "glyphicon-eye-open") })
                )
              ),
              _react2.default.createElement(
                'span',
                { className: 'input-group-btn' },
                _react2.default.createElement('input', { type: 'submit', className: 'btn btn-primary', value: 'Send' })
              )
            )
          )
        )
      );
    }
  }]);

  return ItemScreen;
}(_react2.default.Component);

exports.default = ItemScreen;
//# sourceMappingURL=ItemScreen.js.map
