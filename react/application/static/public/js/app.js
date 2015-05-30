(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _commentboxCommentBoxJsx = require('./commentbox/CommentBox.jsx');

var _commentboxCommentBoxJsx2 = _interopRequireDefault(_commentboxCommentBoxJsx);

$(function () {
  React.render(React.createElement(_commentboxCommentBoxJsx2['default'], { url: '/api/comments.json', pollInterval: 2000 }), document.getElementById('content'));
});

},{"./commentbox/CommentBox.jsx":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Comment = (function (_React$Component) {
  function Comment() {
    _classCallCheck(this, Comment);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Comment, _React$Component);

  _createClass(Comment, [{
    key: "render",
    value: function render() {
      var rawMarkup = marked(this.props.children.toString(), { senitize: true });
      return React.createElement(
        "div",
        { className: "comment" },
        React.createElement(
          "h2",
          { className: "commentAuthor" },
          this.props.author
        ),
        React.createElement("span", { dangerouslySetInnerHTML: { __html: rawMarkup } })
      );
    }
  }]);

  return Comment;
})(React.Component);

exports["default"] = Comment;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _CommentListJsx = require('./CommentList.jsx');

var _CommentListJsx2 = _interopRequireDefault(_CommentListJsx);

var _CommentFormJsx = require('./CommentForm.jsx');

var _CommentFormJsx2 = _interopRequireDefault(_CommentFormJsx);

var CommentBox = (function (_React$Component) {
  function CommentBox(props) {
    _classCallCheck(this, CommentBox);

    _get(Object.getPrototypeOf(CommentBox.prototype), 'constructor', this).call(this, props);
    this.state = { data: this.props.data };
  }

  _inherits(CommentBox, _React$Component);

  _createClass(CommentBox, [{
    key: 'loadCommentsFromServer',
    value: function loadCommentsFromServer() {
      var _this = this;

      $.ajax({
        url: this.props.url,
        dataType: 'json',
        chache: false,
        success: function success(data) {
          _this.setState({ data: data });
        },
        error: function error(xhr, status, err) {
          console.error(_this.props.url, status, err.toString());
        }
      });
    }
  }, {
    key: 'handleCommentSubmit',
    value: function handleCommentSubmit(comment) {
      var _this2 = this;

      var comments = this.state.data;
      var newComments = comments.concat([comment]);
      this.setState({ data: newComments });
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: comment,
        success: function success(data) {
          _this2.setState({ date: date });
        },
        error: function error(xhr, status, err) {
          console.err(_this2.props.url, status.err.toString());
        }
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadCommentsFromServer();
      setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'commentBox' },
        React.createElement(
          'h1',
          null,
          'Comments'
        ),
        React.createElement(_CommentListJsx2['default'], { data: this.state.data }),
        React.createElement(_CommentFormJsx2['default'], { onCommentSubmit: this.handleCommentSubmit.bind(this) })
      );
    }
  }]);

  return CommentBox;
})(React.Component);

exports['default'] = CommentBox;

CommentBox.defaultProps = { data: [] };
module.exports = exports['default'];

},{"./CommentForm.jsx":4,"./CommentList.jsx":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var CommentForm = (function (_React$Component) {
  function CommentForm() {
    _classCallCheck(this, CommentForm);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(CommentForm, _React$Component);

  _createClass(CommentForm, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var author = React.findDOMNode(this.refs.author).value.trim();
      var text = React.findDOMNode(this.refs.text).value.trim();
      if (!text || !author) {
        return;
      }
      this.props.onCommentSubmit({ author: author, text: text });

      React.findDOMNode(this.refs.author).value = "";
      React.findDOMNode(this.refs.text).value = "";
      return;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "form",
        { className: "commentForm", onSubmit: this.handleSubmit.bind(this) },
        React.createElement("input", { type: "text", placeholder: "your name", ref: "author" }),
        React.createElement("input", { type: "text", placeholder: "say something...", ref: "text" }),
        React.createElement("input", { type: "submit", value: "Post" })
      );
    }
  }]);

  return CommentForm;
})(React.Component);

exports["default"] = CommentForm;
module.exports = exports["default"];

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _CommentJsx = require("./Comment.jsx");

var _CommentJsx2 = _interopRequireDefault(_CommentJsx);

var CommentList = (function (_React$Component) {
  function CommentList() {
    _classCallCheck(this, CommentList);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(CommentList, _React$Component);

  _createClass(CommentList, [{
    key: "render",
    value: function render() {
      var commentNodes = this.props.data.map(function (comment) {
        return React.createElement(
          _CommentJsx2["default"],
          { author: comment.author },
          comment.text
        );
      });

      return React.createElement(
        "div",
        { className: "commentList" },
        commentNodes
      );
    }
  }]);

  return CommentList;
})(React.Component);

exports["default"] = CommentList;
module.exports = exports["default"];

},{"./Comment.jsx":2}]},{},[1]);
