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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PostScreen = function (_React$Component) {
  _inherits(PostScreen, _React$Component);

  function PostScreen(...args) {
    var _temp, _this, _ret;

    _classCallCheck(this, PostScreen);

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (PostScreen.__proto__ || Object.getPrototypeOf(PostScreen)).call(this, ...args)), _this), _this.state = {
      image: null,
      posting: false
    }, _this.price = 0, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PostScreen, [{
    key: 'onFileUpload',
    value: function onFileUpload() {
      var file = this.refs.fileUpload.files[0];

      var fr = new FileReader();
      fr.onload = this.onFileLoaded.bind(this); // onload fires after reading is complete
      fr.readAsDataURL(file); // begin reading
    }
  }, {
    key: 'onFileLoaded',
    value: function onFileLoaded(data) {
      this.setState({
        image: data.target.result
      });
    }
  }, {
    key: 'checkPrice',
    value: function checkPrice(e) {

      if (e.target.value.match(PostScreen.priceMatch)) {
        var stripped = e.target.value.replace(PostScreen.zeroStrip, "");
        if (e.target.value != stripped) {
          e.target.value = stripped;
        }
        this.price = e.target.value;
      } else {
        if (e.target.value != "") {
          e.target.value = this.price;
        }
      }

      if (e.target.value == "") {
        this.price = "0";
      }

      // e.target.value = 100;
    }
  }, {
    key: 'submitForm',
    value: function submitForm(e) {
      var _this2 = this;

      e.preventDefault();

      if (this.state.posting) {
        return;
      }

      this.setState({
        posting: true
      });

      var ajax = new _simpleAjax2.default({
        url: '/api/create',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          title: this.refs.form.inputTitle.value,
          description: this.refs.form.inputDescription.value,
          price: this.refs.form.inputPrice.value,
          image: this.state.image
        })
      });

      ajax.on('success', function (e) {
        var res = JSON.parse(e.target.response);

        if (res.success) {
          _this2.context.router.push('/item/' + res.id);
        } else {
          _this2.setState({
            posting: false
          });
        }
      });

      ajax.on('error', function () {
        _this2.setState({
          posting: false
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
          'form',
          { className: 'form-horizontal', ref: 'form', onSubmit: this.submitForm.bind(this) },
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'inputTitle', className: 'col-sm-2 control-label' },
              'Title'
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-sm-10' },
              _react2.default.createElement('input', { type: 'text', className: 'form-control', id: 'inputTitle', placeholder: 'Title' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'inputDescription', className: 'col-sm-2 control-label' },
              'Description'
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-sm-10' },
              _react2.default.createElement('textarea', { className: 'form-control', id: 'inputDescription', placeholder: 'Description' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'inputPrice', className: 'col-sm-2 control-label' },
              'Price $'
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-sm-10' },
              _react2.default.createElement('input', { type: 'text', className: 'form-control', id: 'inputPrice', placeholder: 'Price', onChange: this.checkPrice.bind(this) })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'inputFile', className: 'col-sm-2 control-label' },
              'Image'
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-sm-10' },
              _react2.default.createElement('input', { type: 'file', id: 'inputFile', ref: 'fileUpload', accept: 'image/*', onChange: this.onFileUpload.bind(this) }),
              _react2.default.createElement('br', null),
              this.state.image ? _react2.default.createElement(_SmartImage2.default, { src: this.state.image }) : null
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
                this.state.posting ? "Posting..." : "Post"
              )
            )
          )
        )
      );
    }
  }]);

  return PostScreen;
}(_react2.default.Component);

PostScreen.contextTypes = {
  router: _react2.default.PropTypes.object
};
PostScreen.priceMatch = /^[0-9]+(\.[0-9]?[0-9]?)?$/;
PostScreen.zeroStrip = /^(0+)/;
exports.default = PostScreen;
//# sourceMappingURL=PostScreen.js.map
