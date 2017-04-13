/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 61);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(49);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(50);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(48);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var id = _step.value;

      if (--inserted[id] <= 0) {
        var elem = document.getElementById(prefix + id);
        if (elem) {
          elem.parentNode.removeChild(elem);
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && btoa) {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var toggleDrawer = exports.toggleDrawer = function toggleDrawer(bool) {
	return {
		type: "TOGGLE_DRAWER",
		payload: bool
	};
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var pageFetchError = exports.pageFetchError = function pageFetchError(bool) {
	return {
		type: "PAGE_ERROR",
		payload: bool
	};
};

var pageIsLoading = exports.pageIsLoading = function pageIsLoading(bool) {
	return {
		type: "PAGE_LOADING",
		payload: bool
	};
};

var pageFetchSuccess = exports.pageFetchSuccess = function pageFetchSuccess(page) {
	return {
		type: "PAGE_FETCH_SUCCESS",
		payload: page
	};
};

var setActiveRoute = exports.setActiveRoute = function setActiveRoute(page) {
	return {
		type: "ACTIVE_ROUTE",
		payload: page
	};
};

var setActivePage = exports.setActivePage = function setActivePage(page) {
	return {
		type: "ACTIVE_PAGE",
		payload: page
	};
};

var fetchPage = exports.fetchPage = function fetchPage(route) {
	return function (dispatch) {
		dispatch(pageIsLoading(true));
		dispatch(pageFetchError(false));
		setTimeout(function () {
			fetch("/api/articles" + route).then(function (response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				dispatch(pageIsLoading(false));
				return response;
			}).then(function (response) {
				return response.json();
			}).then(function (response) {
				dispatch(pageFetchSuccess(response));
				dispatch(setActiveRoute(route));
				document.title = "ECMASyntax - " + response.fields.name;
			}).catch(function (err) {
				console.log('ERROR', err);
				dispatch(pageFetchError(true));
				document.title = 'nope fail';
			});
		}, 100);
	};
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var pageListQuery = exports.pageListQuery = function pageListQuery(query) {
	return {
		type: "PAGELIST_QUERY",
		payload: query
	};
};

var addFilter = exports.addFilter = function addFilter(filter) {
	return {
		type: "ADD_FILTER",
		payload: filter
	};
};

var removeFilter = exports.removeFilter = function removeFilter(filter) {
	return {
		type: "REMOVE_FILTER",
		payload: filter
	};
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = __webpack_require__(58);

var _path2 = _interopRequireDefault(_path);

var _walk = __webpack_require__(60);

var _walk2 = _interopRequireDefault(_walk);

var _express = __webpack_require__(54);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(51);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(8);

var _server = __webpack_require__(59);

var _reactRedux = __webpack_require__(4);

var _marked = __webpack_require__(57);

var _marked2 = _interopRequireDefault(_marked);

var _dompurify = __webpack_require__(53);

var _dompurify2 = _interopRequireDefault(_dompurify);

var _jsdom = __webpack_require__(56);

var _jsdom2 = _interopRequireDefault(_jsdom);

var _reducers = __webpack_require__(23);

var _reducers2 = _interopRequireDefault(_reducers);

var _app = __webpack_require__(10);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var contentful = __webpack_require__(52);
var highlightjs = __webpack_require__(55);

var Server = function () {
  function Server() {
    _classCallCheck(this, Server);

    this.app = (0, _express2.default)();
    this.port = 5000;
    this.router = _express2.default.Router();
    this.APIRouter = _express2.default.Router();

    this.__api = 'articles';
    this.__dirname = 'public';

    this.client = contentful.createClient({
      space: 'ygp49j9ncoqn',
      accessToken: '3ff5816ecb76807c88a570e0e7ab89b77ddde9697d29945ca82d60399d6182e8'
    });

    _marked2.default.setOptions({
      highlight: function highlight(code) {
        return highlightjs.highlightAuto(code).value;
      }
    });
    var window = _jsdom2.default.jsdom('', {
      features: {
        FetchExternalResources: false,
        ProcessExternalResources: false
      }
    }).defaultView;
    this.DOMPurify = (0, _dompurify2.default)(window);

    this.preloadedState = {
      activePage: {
        page: null,
        route: null,
        pageIsLoading: false,
        pageHasErrored: false
      },
      utils: {
        drawerOpen: false
      },
      pageList: {
        entries: [],
        activePages: [],
        filters: [],
        query: ''
      }
    };

    this.app.set('port', undefined || 5000);
    this.app.use(_bodyParser2.default.urlencoded({ extended: true }));
    this.app.use(_bodyParser2.default.json());
  }

  _createClass(Server, [{
    key: '_fetchPage',
    value: function _fetchPage(req) {
      var _this = this;

      var spec = decodeURI(req.params.specId);
      var cat = decodeURI(req.params.catId);
      var pageName = decodeURI(req.params.pageId);

      return new Promise(function (resolve, reject) {
        var index = _this.preloadedState.pageList.entries.findIndex(function (page) {
          var category = page.fields.category;
          var specification = category.fields.specification[0];

          return page.fields.name === pageName && category.fields.name === cat && specification.fields.name === spec;
        });
        if (index > -1) {
          resolve(_this.preloadedState.pageList.entries[index]);
        } else {
          reject();
        }
      });
    }
  }, {
    key: '_handleRender',
    value: function _handleRender(req, res) {
      var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.preloadedState;

      var store = (0, _redux.createStore)(_reducers2.default, state);

      var css = new Set(); // CSS for all rendered React components
      var context = { insertCss: function insertCss() {
          for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
            styles[_key] = arguments[_key];
          }

          styles.forEach(function (style) {
            css.add(style._getCss());
          });
        } };
      var html = (0, _server.renderToString)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_app2.default, { context: context })
      ));
      var title = state.activePage.page ? 'ECMASyntax - ' + state.activePage.page.fields.name : 'ECMASyntax';
      var response = '\n      <!doctype html>\n      <html>\n        <head>\n          <meta charset="utf-8">\n          <meta http-equiv="x-ua-compatible" content="ie=edge">\n          <meta name="viewport" content="width=device-width, initial-scale=1">\n          <title>' + title + '</title>\n          <style>\n            ' + [].concat(_toConsumableArray(css)).join('') + '\n          </style>\n        </head>\n        <body>\n          <div id="root">' + html + '</div>\n          <script>\n            window.__PRELOADED_STATE__ = ' + JSON.stringify(state).replace(/</g, '\\u003c') + '\n          </script>\n          <script src="/static/app.js" async></script>\n        </body>\n      </html>\n      ';
      res.send(response);
    }
  }, {
    key: '_setupRoutes',
    value: function _setupRoutes() {
      var _this2 = this;

      this.router.use(function (req, res, next) {
        next();
      });

      this.router.route('/:specId/:catId/:pageId').get(function (req, res) {
        _this2._fetchPage(req).then(function (entry) {
          var newPreloadedState = {
            activePage: {
              page: entry,
              route: req.url,
              pageIsLoading: false,
              pageHasErrored: false
            }
          };
          var state = Object.assign({}, _this2.preloadedState, newPreloadedState);
          _this2._handleRender(req, res, state);
        }).catch(function () {
          Server.handle404(req, res);
        });
      });

      this.router.get('/', function (req, res) {
        _this2._handleRender(req, res);
      });

      this.router.get('*', function (req, res) {
        return Server.handle404(req, res);
      });
    }
  }, {
    key: '_setupAPIRoutes',
    value: function _setupAPIRoutes() {
      var _this3 = this;

      this.APIRouter.use(function (req, res, next) {
        next();
      });

      this.APIRouter.get('/', function (req, res) {
        res.json({
          message: 'Welcome to my api'
        });
      });

      this.APIRouter.route('/articles').get(function (req, res) {
        var files = [];
        var walker = _walk2.default.walk(_path2.default.join(_this3.__dirname, _this3.__api));
        walker.on('file', function (root, file, next) {
          if (file.type === 'file') {
            var fileObj = {
              category: root.replace(this.__dirname, '').replace(this.__api, '').replace(/\//g, ''),
              name: file.name,
              route: _path2.default.join(root, file.name).replace(this.__dirname, '')
            };
            files.push(fileObj);
          }
          next();
        });
        walker.on('end', function () {
          res.json(files);
        });
      });

      this.APIRouter.route('/articles/:specId/:catId/:pageId').get(function (req, res) {
        _this3._fetchPage(req, res).then(function (entry) {
          res.status(200).json(entry);
        }).catch(function () {
          Server.handle404(req, res);
        });
      });
    }
  }, {
    key: '_initCompression',
    value: function _initCompression() {
      if (false) {
        this.app.get('*.js', function (req, res, next) {
          req.url += '.gz';
          res.set('Content-Encoding', 'gzip');
          next();
        });
      }
    }
  }, {
    key: '_setupRouters',
    value: function _setupRouters() {
      this._setupRoutes();
      this._setupAPIRoutes();

      this.app.use('/static', _express2.default.static(_path2.default.join(this.__dirname, 'static')));

      this.app.use('/api', this.APIRouter);

      this.app.use('/', this.router);

      this.app.use('*', function (req, res) {
        return Server.handle404(req, res);
      });
    }
  }, {
    key: '_buildArticles',
    value: function _buildArticles() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.client.getEntries({
          content_type: 'syntaxEntry',
          include: 2
        }).then(function (entries) {
          var markedEntries = entries;
          entries.items.forEach(function (item, index) {
            if (item.fields.blob) {
              var html = (0, _marked2.default)(item.fields.blob);
              markedEntries.items[index].fields.blob = html;
            } else {
              markedEntries.items[index].fields.blob = '';
            }
          });
          resolve(markedEntries);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var _this5 = this;

      this._initCompression();
      this._setupRouters();

      this._buildArticles().then(function (articles) {
        var initialLoadedState = {
          pageList: {
            entries: articles.items,
            filters: [],
            query: '',
            activePages: articles.items
          }
        };
        _this5.preloadedState = Object.assign({}, _this5.preloadedState, initialLoadedState);
        _this5.app.listen(_this5.app.get('port'));
        console.log('server listening on port ' + _this5.app.get('port') + ' in ' + 'development' + ' mode');
      }).catch(function (err) {
        throw err;
      });
    }
  }], [{
    key: 'handle404',
    value: function handle404(req, res) {
      res.status(404).send('404 Page');
    }
  }]);

  return Server;
}();

var server = new Server();
server.start();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _appRouter = __webpack_require__(17);

var _appRouter2 = _interopRequireDefault(_appRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContextType = {
	// Enables critical path CSS rendering
	insertCss: _react.PropTypes.func.isRequired
};

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
	}

	_createClass(App, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return this.props.context;
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_appRouter2.default, null);
		}
	}]);

	return App;
}(_react2.default.Component);

App.propTypes = {
	context: _react.PropTypes.shape(ContextType).isRequired
};
App.childContextTypes = ContextType;
exports.default = App;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _routeLink = __webpack_require__(12);

var _routeLink2 = _interopRequireDefault(_routeLink);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _categorySection = __webpack_require__(38);

var _categorySection2 = _interopRequireDefault(_categorySection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CategorySection = function (_React$Component) {
  _inherits(CategorySection, _React$Component);

  function CategorySection(props) {
    _classCallCheck(this, CategorySection);

    var _this = _possibleConstructorReturn(this, (CategorySection.__proto__ || Object.getPrototypeOf(CategorySection)).call(this, props));

    _this.handleClick = function (e) {
      e.preventDefault();

      _this.container.classList.toggle(_categorySection2.default['hidden']);
    };

    return _this;
  }

  _createClass(CategorySection, [{
    key: 'mapLinks',
    value: function mapLinks() {
      var _this2 = this;

      // active={(this.props.activeRoute ? this.props.activeRoute : null) === page.route}
      return this.props.category.entries.map(function (entry, index) {
        return _react2.default.createElement(
          _routeLink2.default,
          {
            page: entry,
            key: index,
            activePage: _this2.props.activePage,
            selectRoute: _this2.props.selectRoute },
          entry.fields.name
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: _categorySection2.default['categorySection'], ref: function ref(div) {
            _this3.container = div;
          } },
        _react2.default.createElement(
          'a',
          { className: _categorySection2.default['categorySection-header'], href: '#', onClick: this.handleClick },
          this.props.category.fields.name,
          _react2.default.createElement(
            'i',
            { className: 'material-icons ' + _categorySection2.default['chevron'], ref: function ref(i) {
                _this3.icon = i;
              } },
            'keyboard_arrow_down'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _categorySection2.default['categorySection-body'], ref: function ref(div) {
              _this3.linksContainer = div;
            } },
          this.mapLinks()
        )
      );
    }
  }]);

  return CategorySection;
}(_react2.default.Component);

exports.default = (0, _withStyles2.default)(_categorySection2.default)(CategorySection);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _routeLink = __webpack_require__(39);

var _routeLink2 = _interopRequireDefault(_routeLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouteLink = function (_React$Component) {
  _inherits(RouteLink, _React$Component);

  function RouteLink(props) {
    _classCallCheck(this, RouteLink);

    var _this = _possibleConstructorReturn(this, (RouteLink.__proto__ || Object.getPrototypeOf(RouteLink)).call(this, props));

    _this.clickHandler = function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.props.selectRoute(_this.props.page);
    };

    return _this;
  }

  _createClass(RouteLink, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'a',
        {
          className: this.props.activePage && this.props.activePage.sys.id === this.props.page.sys.id ? _routeLink2.default['pageList-item'] + ' ' + _routeLink2.default['active'] : _routeLink2.default['pageList-item'],
          href: this.props.route,
          onClick: this.clickHandler },
        this.props.children
      );
    }
  }]);

  return RouteLink;
}(_react2.default.Component);

exports.default = (0, _withStyles2.default)(_routeLink2.default)(RouteLink);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _utils = __webpack_require__(5);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _drawerToggle = __webpack_require__(40);

var _drawerToggle2 = _interopRequireDefault(_drawerToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DrawerToggle = function (_React$Component) {
  _inherits(DrawerToggle, _React$Component);

  function DrawerToggle(props) {
    _classCallCheck(this, DrawerToggle);

    var _this = _possibleConstructorReturn(this, (DrawerToggle.__proto__ || Object.getPrototypeOf(DrawerToggle)).call(this, props));

    _this.openDrawer = function () {
      _this.props.toggleDrawer(true);
    };

    return _this;
  }

  _createClass(DrawerToggle, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _drawerToggle2.default['drawer-toggle'], onClick: this.openDrawer },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'menu'
        )
      );
    }
  }]);

  return DrawerToggle;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    drawerOpen: state.utils.drawerOpen
  };
}

function matchDispatchToProps(dispatch) {
  return {
    toggleDrawer: function toggleDrawer(open) {
      return dispatch((0, _utils.toggleDrawer)(open));
    }
  };
}

exports.default = (0, _withStyles2.default)(_drawerToggle2.default)((0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(DrawerToggle));

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _utils = __webpack_require__(5);

var _articleList = __webpack_require__(7);

var _articleFilters = __webpack_require__(19);

var _articleFilters2 = _interopRequireDefault(_articleFilters);

var _searchResults = __webpack_require__(62);

var _searchResults2 = _interopRequireDefault(_searchResults);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _drawer = __webpack_require__(41);

var _drawer2 = _interopRequireDefault(_drawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Drawer = function (_React$Component) {
  _inherits(Drawer, _React$Component);

  function Drawer(props) {
    _classCallCheck(this, Drawer);

    var _this = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this, props));

    _this.searchIconClick = function () {
      _this.searchInput.focus();
    };

    _this.searchFocused = function () {
      _this.searchContainer.classList.add(_drawer2.default['focused']);
      _this.searchInput.click();
    };

    _this.searchUnfocused = function () {
      _this.searchContainer.classList.remove(_drawer2.default['focused']);
    };

    _this.handleInput = function (e) {
      if (e.target.value.length > 0) {
        _this.searchContainer.classList.add(_drawer2.default['non-empty']);
      } else {
        _this.searchContainer.classList.remove(_drawer2.default['non-empty']);
      }

      _this.props.pageListQuery(e.target.value);
    };

    _this.clearInput = function (e) {
      _this.searchContainer.click();
      _this.searchContainer.classList.remove(_drawer2.default['non-empty']);

      _this.props.pageListQuery('');
    };

    _this.onTouchStart = function (evt) {
      if (!_this.drawerContainer.classList.contains(_drawer2.default['active'])) return;

      _this.drawer.classList.add(_drawer2.default['draggable']);

      _this.setState({
        startX: evt.touches[0].pageX,
        currentX: _this.startX,
        touchingSideNav: true
      });

      requestAnimationFrame(_this.update);
    };

    _this.onTouchMove = function (evt) {

      if (!_this.state.touchingSideNav) return;

      _this.setState({
        currentX: evt.touches[0].pageX
      });
    };

    _this.onTouchEnd = function (evt) {
      if (!_this.state.touchingSideNav) return;

      _this.setState({
        touchingSideNav: false
      });

      _this.drawer.classList.remove(_drawer2.default['draggable']);

      var translateX = Math.min(0, _this.state.currentX - _this.state.startX);
      _this.drawer.style.transform = '';

      if (translateX < -60) {
        _this.props.toggleDrawer(false);
      }
    };

    _this.update = function () {
      if (!_this.state.touchingSideNav) return;

      requestAnimationFrame(_this.update);

      var translateX = Math.min(0, _this.state.currentX - _this.state.startX);
      _this.drawer.style.transform = 'translateX(' + translateX + 'px)';
    };

    _this.hideSideNav = function (evt) {
      if (evt.target.contains(_this.drawer)) {
        _this.props.toggleDrawer(false);
      }
    };

    _this.state = {
      startX: 0,
      currentX: 0,
      touchingSideNav: false
    };

    return _this;
  }

  _createClass(Drawer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.addEventListeners();
    }
  }, {
    key: 'addEventListeners',
    value: function addEventListeners() {
      this.drawerContainer.addEventListener('click', this.hideSideNav);

      this.drawer.addEventListener('touchstart', this.onTouchStart, this.applyPassive());
      this.drawer.addEventListener('touchmove', this.onTouchMove, this.applyPassive());
      this.drawer.addEventListener('touchend', this.onTouchEnd);
    }
  }, {
    key: 'applyPassive',
    value: function applyPassive() {
      if (this.supportsPassive !== undefined) {
        return this.supportsPassive ? { passive: true } : false;
      }
      var isSupported = false;
      try {
        document.addEventListener('test', null, { get passive() {
            isSupported = true;
          } });
      } catch (e) {}
      this.supportsPassive = isSupported;
      return this.applyPassive();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: _drawer2.default['drawer-container'] + ' ' + (this.props.drawerOpen ? _drawer2.default['active'] : ''),
          ref: function ref(div) {
            _this2.drawerContainer = div;
          } },
        _react2.default.createElement(
          'aside',
          { className: _drawer2.default['drawer'], ref: function ref(aside) {
              _this2.drawer = aside;
            } },
          _react2.default.createElement(
            'a',
            { className: _drawer2.default['drawer-logo'], href: '/' },
            _react2.default.createElement('img', { src: '/static/img/ecmasyntax-logo.png', alt: 'logo' })
          ),
          _react2.default.createElement(
            'div',
            { className: _drawer2.default['search-container'] },
            _react2.default.createElement(
              'label',
              { htmlFor: 'search',
                className: _drawer2.default['search-label'],
                onFocus: this.searchFocused,
                ref: function ref(label) {
                  _this2.searchContainer = label;
                } },
              _react2.default.createElement(
                'button',
                { className: _drawer2.default['icon-container'], onClick: this.searchIconClick },
                _react2.default.createElement(
                  'i',
                  { className: 'material-icons ' + _drawer2.default['search-icon'] },
                  'search'
                )
              ),
              _react2.default.createElement('input', { type: 'text', id: 'search', placeholder: 'Search for syntax',
                value: this.props.searchQuery,
                className: _drawer2.default['search-input'],
                onChange: this.handleInput,
                onBlur: this.searchUnfocused,
                ref: function ref(input) {
                  _this2.searchInput = input;
                } }),
              _react2.default.createElement(
                'button',
                { className: _drawer2.default['icon-container'] + ' ' + _drawer2.default['search-closeIcon'], onClick: this.clearInput },
                _react2.default.createElement(
                  'i',
                  { className: 'material-icons' },
                  'close'
                )
              )
            )
          ),
          this.props.activePages.length > 0 ? _react2.default.createElement(
            'div',
            { className: _drawer2.default['articleFilters-wrapper'] },
            _react2.default.createElement(_articleFilters2.default, null)
          ) : '',
          _react2.default.createElement(
            'div',
            { className: _drawer2.default['pageList-wrapper'] },
            _react2.default.createElement(_searchResults2.default, {
              selectRoute: function selectRoute(page) {
                return _this2.props.selectRoute(page);
              } })
          ),
          _react2.default.createElement('hr', { className: _drawer2.default['drawer-divider'] }),
          _react2.default.createElement('div', { className: _drawer2.default['drawer-footer'] })
        )
      );
    }
  }]);

  return Drawer;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    searchQuery: state.pageList.query,
    drawerOpen: state.utils.drawerOpen,
    activePages: state.pageList.activePages
  };
}

function matchDispatchToProps(dispatch) {
  return {
    toggleDrawer: function toggleDrawer(open) {
      return dispatch((0, _utils.toggleDrawer)(open));
    },
    pageListQuery: function pageListQuery(query) {
      return dispatch((0, _articleList.pageListQuery)(query));
    }
  };
}

exports.default = (0, _withStyles2.default)(_drawer2.default)((0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(Drawer));

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _articleView = __webpack_require__(21);

var _articleView2 = _interopRequireDefault(_articleView);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _main = __webpack_require__(42);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main(props) {
    _classCallCheck(this, Main);

    var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Main, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'main',
        { className: _main2.default['main'], ref: function ref(main) {
            _this2.main = main;
          } },
        _react2.default.createElement('div', { className: _main2.default['mobileHeader'] }),
        _react2.default.createElement('div', { className: _main2.default['progressBar'] }),
        _react2.default.createElement(
          'div',
          { className: _main2.default['content-wrapper'] },
          _react2.default.createElement(_articleView2.default, null),
          _react2.default.createElement(
            'footer',
            { className: _main2.default['footer'] },
            _react2.default.createElement('iframe', { src: 'https://ghbtns.com/github-btn.html?user=alex-saunders&repo=ecmasyntax.io&type=star&count=true', frameBorder: '0', scrolling: '0', width: '160px', height: '30px' })
          )
        )
      );
    }
  }]);

  return Main;
}(_react2.default.Component);

exports.default = (0, _withStyles2.default)(_main2.default)(Main);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _markdownContainer = __webpack_require__(43);

var _markdownContainer2 = _interopRequireDefault(_markdownContainer);

var _atelierEstuaryLight = __webpack_require__(37);

var _atelierEstuaryLight2 = _interopRequireDefault(_atelierEstuaryLight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MarkdownContainer = function (_React$Component) {
  _inherits(MarkdownContainer, _React$Component);

  function MarkdownContainer(props) {
    _classCallCheck(this, MarkdownContainer);

    return _possibleConstructorReturn(this, (MarkdownContainer.__proto__ || Object.getPrototypeOf(MarkdownContainer)).call(this, props));
  }

  _createClass(MarkdownContainer, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: _markdownContainer2.default['markdown-wrapper'], dangerouslySetInnerHTML: { __html: this.props.content } });
    }
  }]);

  return MarkdownContainer;
}(_react2.default.Component);

exports.default = (0, _withStyles2.default)(_markdownContainer2.default, _atelierEstuaryLight2.default)(MarkdownContainer);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _activePage = __webpack_require__(6);

var _utils = __webpack_require__(5);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _base = __webpack_require__(47);

var _base2 = _interopRequireDefault(_base);

var _drawer = __webpack_require__(14);

var _drawer2 = _interopRequireDefault(_drawer);

var _drawerToggle = __webpack_require__(13);

var _drawerToggle2 = _interopRequireDefault(_drawerToggle);

var _main = __webpack_require__(15);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppRouter = function (_React$Component) {
  _inherits(AppRouter, _React$Component);

  function AppRouter(props) {
    _classCallCheck(this, AppRouter);

    var _this = _possibleConstructorReturn(this, (AppRouter.__proto__ || Object.getPrototypeOf(AppRouter)).call(this, props));

    _this.onPopstate = function () {
      // temp fix
      if (location.pathname === '/') {
        location.reload();
      } else {
        _this.props.fetchPage(location.pathname);
      }
    };

    _this.selectRoute = function (page) {
      var category = page.fields.category;
      var specification = category.fields.specification[0];
      var route = '/' + specification.fields.name + '/' + category.fields.name + '/' + page.fields.name;

      if (_this.props.activeRoute === route) return;

      window.history.pushState(null, null, route);

      console.log('MANUAL SELECT %c' + page, "color: darkblue;");

      _this.props.toggleDrawer(false);

      return _this.onPopstate();
    };

    _this.state = {
      activeRoute: _this.props.activeRoute
    };

    if (_this.props.activeRoute) {
      console.log('DEEP LINKED TO %c' + _this.props.activeRoute, "color: blue");
    }
    return _this;
  }

  _createClass(AppRouter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('popstate', this.onPopstate);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('popstate', this.onPopstate);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.activeRoute !== this.state.activeRoute) {
        return this.onPopstate();
      }
    }

    // route change function

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _base2.default['app-container'] },
        _react2.default.createElement(_drawerToggle2.default, null),
        _react2.default.createElement(_drawer2.default, { selectRoute: this.selectRoute }),
        _react2.default.createElement(_main2.default, null)
      );
    }
  }]);

  return AppRouter;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    activePage: state.activePage.page,
    activeRoute: state.activePage.route,
    hasErrored: state.activePage.pageListError,
    isLoading: state.activePage.pageListLoading
  };
}

function matchDispatchToProps(dispatch) {
  return {
    fetchPage: function fetchPage(url) {
      return dispatch((0, _activePage.fetchPage)(url));
    },
    toggleDrawer: function toggleDrawer(open) {
      return dispatch((0, _utils.toggleDrawer)(open));
    }
  };
}

exports.default = (0, _withStyles2.default)(_base2.default)((0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(AppRouter));

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _articleFilter = __webpack_require__(44);

var _articleFilter2 = _interopRequireDefault(_articleFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArticleFilter = function (_React$Component) {
  _inherits(ArticleFilter, _React$Component);

  function ArticleFilter(props) {
    _classCallCheck(this, ArticleFilter);

    var _this = _possibleConstructorReturn(this, (ArticleFilter.__proto__ || Object.getPrototypeOf(ArticleFilter)).call(this, props));

    _this.handleClick = function (e) {
      if (_this.props.currFilters.indexOf(_this.props.filter) > -1) {
        _this.props.removeFilter(_this.props.filter);
        _this.setState({ active: false });
      } else {
        _this.props.addFilter(_this.props.filter);
        _this.setState({ active: true });
      }
    };

    _this.state = {
      active: _this.props.currFilters.indexOf(_this.props.filter) > -1
    };
    return _this;
  }

  _createClass(ArticleFilter, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: '' + _articleFilter2.default["rkmd-checkbox"] },
        _react2.default.createElement(
          'label',
          { htmlFor: 'filter-' + this.props.filter, className: _articleFilter2.default["label"] },
          this.props.filter
        ),
        _react2.default.createElement(
          'label',
          { className: '' + _articleFilter2.default["input-checkbox"] },
          _react2.default.createElement('input', { type: 'checkbox', id: 'filter-' + this.props.filter, onChange: this.handleClick }),
          _react2.default.createElement('span', { className: _articleFilter2.default["checkbox"] })
        )
      );
    }
  }]);

  return ArticleFilter;
}(_react2.default.Component);

exports.default = (0, _withStyles2.default)(_articleFilter2.default)(ArticleFilter);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _articleFilter = __webpack_require__(18);

var _articleFilter2 = _interopRequireDefault(_articleFilter);

var _articleList = __webpack_require__(7);

var _articleFilters = __webpack_require__(45);

var _articleFilters2 = _interopRequireDefault(_articleFilters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArticleFilters = function (_React$Component) {
  _inherits(ArticleFilters, _React$Component);

  function ArticleFilters(props) {
    _classCallCheck(this, ArticleFilters);

    return _possibleConstructorReturn(this, (ArticleFilters.__proto__ || Object.getPrototypeOf(ArticleFilters)).call(this, props));
  }

  _createClass(ArticleFilters, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'generateFilters',
    value: function generateFilters(pages) {
      var specifications = [];
      pages.forEach(function (page) {
        var specification = page.fields.category.fields.specification[0].fields.name;
        if (specifications.indexOf(specification) < 0) {
          specifications.push(specification);
        }
      });
      return specifications;
    }
  }, {
    key: 'mapFilters',
    value: function mapFilters() {
      var _this2 = this;

      var pages = this.props.entries;
      var filters = this.generateFilters(pages);
      var articleFilters = filters.map(function (filter, index) {
        return _react2.default.createElement(_articleFilter2.default, { filter: filter, key: index, currFilters: _this2.props.currFilters,
          addFilter: _this2.props.addFilter, removeFilter: _this2.props.removeFilter });
      });
      return articleFilters;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _articleFilters2.default["articleFilters"] },
        _react2.default.createElement(
          'h1',
          { className: _articleFilters2.default["articleFilters-header"] },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'filter_list'
          ),
          _react2.default.createElement(
            'span',
            null,
            'Filter By Specification'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _articleFilters2.default["articleFilters-body"] },
          this.mapFilters()
        )
      );
    }
  }]);

  return ArticleFilters;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    entries: state.pageList.entries,
    currFilters: state.pageList.filters
  };
}

function matchDispatchToProps(dispatch) {
  return {
    addFilter: function addFilter(filter) {
      return dispatch((0, _articleList.addFilter)(filter));
    },
    removeFilter: function removeFilter(filter) {
      return dispatch((0, _articleList.removeFilter)(filter));
    }
  };
}

exports.default = (0, _withStyles2.default)(_articleFilters2.default)((0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(ArticleFilters));

/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _markdownContainer = __webpack_require__(16);

var _markdownContainer2 = _interopRequireDefault(_markdownContainer);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _articleView = __webpack_require__(46);

var _articleView2 = _interopRequireDefault(_articleView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VISIBLE = { transform: 'translateX(0)', opacity: '1' },
    HIDDEN = { transform: 'translateX(60px)', opacity: '0' };

var OUT_KEYFRAMES = [VISIBLE, HIDDEN];
var IN_KEYFRAMES = [HIDDEN, VISIBLE];
var ANIM_OPTIONS = {
  duration: 350,
  easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  iterations: 1
};

var ArticleView = function (_React$Component) {
  _inherits(ArticleView, _React$Component);

  function ArticleView(props) {
    _classCallCheck(this, ArticleView);

    var _this = _possibleConstructorReturn(this, (ArticleView.__proto__ || Object.getPrototypeOf(ArticleView)).call(this, props));

    _this.ANIMATING_OUT = false;
    _this.outAnim;
    _this.inAnim;

    if (_this.props.activePage) {
      _this.state = {
        content: _react2.default.createElement(_markdownContainer2.default, { content: _this.props.activePage.fields.blob })
      };
    } else {
      _this.state = {
        content: _react2.default.createElement(
          'div',
          null,
          'no page selected'
        )
      };
    }
    return _this;
  }

  _createClass(ArticleView, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isLoading) {
        this._out(nextProps.activePage);
      }
      if (!nextProps.isLoading && !nextProps.hasErrored && nextProps.activePage !== this.props.activePage) {
        this._in(nextProps);
      }
    }
  }, {
    key: '_out',
    value: function _out() {
      var _this2 = this;

      if (this.ANIMATING_OUT) return;

      this.ANIMATING_OUT = true;
      this.outAnim = this.pageContainer.animate(OUT_KEYFRAMES, ANIM_OPTIONS);
      this.outAnim.onfinish = function (_) {
        _this2.pageContainer.style.opacity = 0;
        _this2.ANIMATING_OUT = false;
      };
    }
  }, {
    key: '_in',
    value: function _in(nextProps) {
      var _this3 = this;

      if (this.ANIMATING_OUT) {
        this.outAnim.onfinish = function (_) {
          _this3.ANIMATING_OUT = false;
          _this3._animateIn(nextProps);
        };
      } else {
        this._animateIn(nextProps);
      }
    }
  }, {
    key: '_animateIn',
    value: function _animateIn(nextProps) {
      var _this4 = this;

      this.setState({
        content: _react2.default.createElement(_markdownContainer2.default, { content: nextProps.activePage.fields.blob })
      });

      this.pageContainer.style.opacity = 1;

      this.inAnim = this.pageContainer.animate(IN_KEYFRAMES, ANIM_OPTIONS).onfinish = function (_) {
        _this4.pageContainer.style.transform = 'scale(1)';
        _this4.pageContainer.style.opacity = '1';
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      return _react2.default.createElement(
        'div',
        { className: _articleView2.default['page-view'], ref: function ref(div) {
            _this5.pageContainer = div;
          } },
        this.state.content
      );
    }
  }]);

  return ArticleView;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    activePageInfo: state.activePage,
    activePage: state.activePage.page,
    hasErrored: state.activePage.hasErrored,
    isLoading: state.activePage.isLoading
  };
}

exports.default = (0, _withStyles2.default)(_articleView2.default)((0, _reactRedux.connect)(mapStateToProps)(ArticleView));

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'PAGE_ERROR':
      {
        return Object.assign({}, state, {
          hasErrored: action.payload
        });
      }
    case 'PAGE_LOADING':
      {
        return Object.assign({}, state, {
          isLoading: action.payload
        });
      }
    case 'PAGE_FETCH_SUCCESS':
      {
        return Object.assign({}, state, {
          page: action.payload
        });
      }
    case 'ACTIVE_ROUTE':
      {
        return Object.assign({}, state, {
          route: action.payload
        });
      }
    default:
      {
        return state;
      }
  }
};

var initialState = {
  page: null,
  route: null,
  pageIsLoading: false,
  pageHasErrored: false
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(8);

var _utils = __webpack_require__(25);

var _utils2 = _interopRequireDefault(_utils);

var _pageList = __webpack_require__(24);

var _pageList2 = _interopRequireDefault(_pageList);

var _activePage = __webpack_require__(22);

var _activePage2 = _interopRequireDefault(_activePage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allReducers = (0, _redux.combineReducers)({
  utils: _utils2.default,
  pageList: _pageList2.default,
  activePage: _activePage2.default
});

exports.default = allReducers;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'PAGELIST_ERROR':
      {
        return Object.assign({}, state, {
          pageListError: action.payload
        });
      }
    case 'PAGELIST_LOADING':
      {
        return Object.assign({}, state, {
          pageListLoading: action.payload
        });
      }
    case 'PAGELIST_FETCH_SUCCESS':
      {
        return Object.assign({}, state, {
          pages: action.payload
        });
      }
    case 'PAGELIST_QUERY':
      {
        var activePages = filterPages(state.filters, state.entries);
        return Object.assign({}, state, {
          query: action.payload,
          activePages: queryPages(action.payload, activePages)
        });
      }
    case 'ADD_FILTER':
      {
        var _activePages = queryPages(state.query, state.entries);
        var newFilters = state.filters;
        newFilters.push(action.payload);

        return Object.assign({}, state, {
          activePages: filterPages(newFilters, _activePages),
          filters: newFilters
        });
      }
    case 'REMOVE_FILTER':
      {
        var filter = action.payload;
        var _newFilters = state.filters;
        var _activePages2 = queryPages(state.query, state.entries);
        _newFilters.splice(_newFilters.indexOf(filter), 1);

        return Object.assign({}, state, {
          activePages: filterPages(_newFilters, _activePages2),
          filters: _newFilters
        });
      }
    default:
      {
        return state;
      }
  }
};

var initialState = {
  entries: [],
  activePages: [],
  filters: [],
  query: 'prom'
};

function queryPages(query, pages) {
  var syntaxEntries = pages;
  var matchedEntries = syntaxEntries;
  if (query.length > 0) {
    matchedEntries = syntaxEntries.filter(function (entry) {
      return entry.fields.name.trim().toLowerCase().match(query) || entry.fields.category.fields.name.trim().toLowerCase().match(query);
    });
  }
  return matchedEntries;
}

function filterPages(filters, pages) {
  var filteredPages = pages;
  if (filters.length > 0) {
    filteredPages = pages.filter(function (page) {
      return filters.includes(page.fields.category.fields.specification[0].fields.name);
    });
  }
  return filteredPages;
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'TOGGLE_DRAWER':
      {
        return Object.assign({}, state, {
          drawerOpen: action.payload
        });
      }
    default:
      {
        return state;
      }
  }
};

var initialState = {
  drawerOpen: false
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".hljs-comment,\n.hljs-quote {\n    color: #6c6b5a\n}\n.hljs-variable,\n.hljs-template-variable,\n.hljs-attribute,\n.hljs-tag,\n.hljs-name,\n.hljs-regexp,\n.hljs-link,\n.hljs-name,\n.hljs-selector-id,\n.hljs-selector-class {\n    color: #ba6236\n}\n.hljs-number,\n.hljs-meta,\n.hljs-built_in,\n.hljs-builtin-name,\n.hljs-literal,\n.hljs-type,\n.hljs-params {\n    color: #ae7313\n}\n.hljs-string,\n.hljs-symbol,\n.hljs-bullet {\n    color: #7d9726\n}\n.hljs-title,\n.hljs-section {\n    color: #36a166\n}\n.hljs-keyword,\n.hljs-selector-tag {\n    color: #5f9182\n}\n.hljs-deletion,\n.hljs-addition {\n    color: #22221b;\n    display: inline-block;\n    width: 100%\n}\n.hljs-deletion {\n    background-color: #ba6236\n}\n.hljs-addition {\n    background-color: #7d9726\n}\n.hljs {\n    display: block;\n    overflow-x: auto;\n    background: #f4f3ec;\n    color: #5f5e4e;\n    padding: 0.5em\n}\n.hljs-emphasis {\n    font-style: italic\n}\n.hljs-strong {\n    font-weight: bold\n}\n", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes category-section_fadeIn_29l {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes category-section_fadeIn_29l {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.category-section_categorySection_21v {\n  padding-bottom: 8px; }\n\n.category-section_categorySection-header_33d {\n  -webkit-animation: category-section_fadeIn_29l 0.6s 1;\n          animation: category-section_fadeIn_29l 0.6s 1;\n  -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  position: relative;\n  display: block;\n  text-decoration: none;\n  padding: 8px 8px 8px 16px;\n  margin: 0;\n  color: rgba(0, 0, 0, 0.4);\n  font-size: 14px;\n  line-height: 24px;\n  text-transform: uppercase;\n  font-weight: bold; }\n  .category-section_categorySection-header_33d .category-section_chevron_izC {\n    float: right;\n    -webkit-transition: -webkit-transform 0.2s linear;\n    transition: -webkit-transform 0.2s linear;\n    transition: transform 0.2s linear;\n    transition: transform 0.2s linear, -webkit-transform 0.2s linear;\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n\n.category-section_categorySection-body_3ZU {\n  -webkit-animation: category-section_fadeIn_29l 0.4s 1;\n          animation: category-section_fadeIn_29l 0.4s 1;\n  -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n\n.category-section_categorySection_21v.category-section_hidden_2po {\n  padding-bottom: 0px; }\n  .category-section_categorySection_21v.category-section_hidden_2po .category-section_chevron_izC {\n    -webkit-transform: rotateX(180deg);\n            transform: rotateX(180deg); }\n  .category-section_categorySection_21v.category-section_hidden_2po .category-section_categorySection-body_3ZU {\n    display: none; }\n", ""]);

// exports
exports.locals = {
	"categorySection": "category-section_categorySection_21v",
	"categorySection-header": "category-section_categorySection-header_33d",
	"fadeIn": "category-section_fadeIn_29l",
	"chevron": "category-section_chevron_izC",
	"categorySection-body": "category-section_categorySection-body_3ZU",
	"hidden": "category-section_hidden_2po"
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes route-link_fadeIn_3MB {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes route-link_fadeIn_3MB {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.route-link_pageList-item_1lY {\n  display: block;\n  position: relative;\n  text-decoration: none;\n  color: #333;\n  padding: 5px 16px 5px 16px;\n  cursor: pointer;\n  -webkit-transition: all .1s linear;\n  transition: all .1s linear; }\n\n.route-link_pageList-item_1lY:hover, .route-link_pageList-item_1lY.route-link_active_gvG {\n  background-color: #fbce13; }\n", ""]);

// exports
exports.locals = {
	"pageList-item": "route-link_pageList-item_1lY",
	"active": "route-link_active_gvG",
	"fadeIn": "route-link_fadeIn_3MB"
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes drawer-toggle_fadeIn_3jD {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes drawer-toggle_fadeIn_3jD {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.drawer-toggle_drawer-toggle_Iqd {\n  display: none;\n  position: fixed;\n  z-index: 98;\n  top: 0;\n  left: 0;\n  padding: 10px; }\n  @media (max-width: 500px) {\n    .drawer-toggle_drawer-toggle_Iqd {\n      display: block; } }\n\n.drawer-toggle_drawer-toggle_Iqd i {\n  font-size: 30px;\n  line-height: 30px;\n  color: #3d3d3d; }\n", ""]);

// exports
exports.locals = {
	"drawer-toggle": "drawer-toggle_drawer-toggle_Iqd",
	"fadeIn": "drawer-toggle_fadeIn_3jD"
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes drawer_fadeIn_2FE {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes drawer_fadeIn_2FE {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.drawer_drawer-container_20C {\n  position: relative;\n  z-index: 99;\n  height: 100vh;\n  width: 40%;\n  max-width: 280px; }\n  @media (max-width: 500px) {\n    .drawer_drawer-container_20C {\n      position: fixed;\n      left: 0;\n      top: 0;\n      width: 100%;\n      max-width: none;\n      height: 100%;\n      overflow: hidden;\n      pointer-events: none; } }\n\n@media (max-width: 500px) {\n  .drawer_drawer-container_20C::after {\n    display: block;\n    content: '';\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.4);\n    opacity: 0;\n    will-change: opacity;\n    -webkit-transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1); } }\n\n@media (max-width: 500px) {\n  .drawer_drawer-container_20C.drawer_active_ES2 {\n    pointer-events: auto; } }\n\n@media (max-width: 500px) {\n  .drawer_drawer-container_20C.drawer_active_ES2::after {\n    opacity: 1; } }\n\n.drawer_drawer_3d3 {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  position: relative;\n  height: 100vh;\n  width: 100%;\n  -webkit-transition: -webkit-transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: -webkit-transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  background-color: #fff;\n  box-shadow: 0px 0 0.2rem rgba(0, 0, 0, 0.2); }\n  @media (max-width: 500px) {\n    .drawer_drawer_3d3 {\n      box-shadow: 2px 0 12px rgba(0, 0, 0, 0.4);\n      left: 0;\n      top: 0;\n      max-width: 400px;\n      width: 80%;\n      -webkit-transform: translateX(-107%);\n              transform: translateX(-107%);\n      will-change: transform; } }\n\n.drawer_drawer_3d3.drawer_draggable_3iq {\n  -webkit-transition: -webkit-transform 0.13s cubic-bezier(0, 0, 0.3, 1);\n  transition: -webkit-transform 0.13s cubic-bezier(0, 0, 0.3, 1);\n  transition: transform 0.13s cubic-bezier(0, 0, 0.3, 1);\n  transition: transform 0.13s cubic-bezier(0, 0, 0.3, 1), -webkit-transform 0.13s cubic-bezier(0, 0, 0.3, 1); }\n\n@media (max-width: 500px) {\n  .drawer_drawer-container_20C.drawer_active_ES2 .drawer_drawer_3d3 {\n    -webkit-transform: translateX(0px);\n            transform: translateX(0px); } }\n\n.drawer_drawer-logo_28M {\n  display: block;\n  background-color: #fbce13; }\n  .drawer_drawer-logo_28M img {\n    width: 100%; }\n\n.drawer_drawer-divider__tl {\n  border: 1px solid #e6e6e6;\n  border-bottom: none;\n  margin: 0; }\n\n.drawer_search-container_T81 {\n  padding: 0px 12px 14px;\n  background-color: #fbce13; }\n\n.drawer_search-label_2Qu {\n  position: relative;\n  background-color: #fff;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  width: 100%;\n  padding: 8px;\n  border-radius: 2px;\n  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);\n  -webkit-transition: box-shadow 0.2s ease-in-out;\n  transition: box-shadow 0.2s ease-in-out; }\n\n.drawer_search-icon_3Kp {\n  height: 24px;\n  width: 24px;\n  color: #454444;\n  opacity: 0.8;\n  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.drawer_search-closeIcon_1XQ {\n  position: absolute;\n  right: 0;\n  top: 0;\n  height: 100%;\n  visibility: hidden;\n  opacity: 0;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .drawer_search-closeIcon_1XQ i {\n    padding: 8px;\n    font-size: 18px; }\n\n.drawer_search-input_1II {\n  position: relative;\n  height: 30px;\n  outline: 0;\n  border: none;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding: 4px 22px 4px 4px;\n  overflow: hidden;\n  font-size: 14px; }\n\n.drawer_search-label_2Qu:after {\n  display: block;\n  content: '';\n  position: absolute;\n  bottom: 0;\n  left: 24px;\n  height: 2px;\n  background-color: #454444;\n  width: 10px;\n  visibility: hidden;\n  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.drawer_search-label_2Qu:hover, .drawer_search-label_2Qu.drawer_focused_Fis {\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4); }\n\n.drawer_search-label_2Qu.drawer_focused_Fis .drawer_search-icon_3Kp, .drawer_search-label_2Qu.drawer_non-empty_35T .drawer_search-icon_3Kp {\n  opacity: 1; }\n\n.drawer_search-label_2Qu.drawer_non-empty_35T .drawer_search-closeIcon_1XQ {\n  visibility: visible;\n  opacity: 1;\n  -webkit-transform: scale(1);\n          transform: scale(1); }\n\n.drawer_icon-container_2BX {\n  background: none;\n  border: none;\n  padding: 0;\n  margin: 0;\n  cursor: pointer; }\n\n.drawer_articleFilters-wrapper_3_h {\n  background-color: #fff; }\n\n.drawer_pageList-wrapper_xWh {\n  background-color: #fff;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding: 0px 0px 18px;\n  overflow: auto; }\n\n.drawer_drawer-footer_2Eb {\n  height: 200px;\n  background-color: #fcfcfc; }\n", ""]);

// exports
exports.locals = {
	"drawer-container": "drawer_drawer-container_20C",
	"active": "drawer_active_ES2",
	"drawer": "drawer_drawer_3d3",
	"draggable": "drawer_draggable_3iq",
	"drawer-logo": "drawer_drawer-logo_28M",
	"drawer-divider": "drawer_drawer-divider__tl",
	"search-container": "drawer_search-container_T81",
	"search-label": "drawer_search-label_2Qu",
	"search-icon": "drawer_search-icon_3Kp",
	"search-closeIcon": "drawer_search-closeIcon_1XQ",
	"search-input": "drawer_search-input_1II",
	"focused": "drawer_focused_Fis",
	"non-empty": "drawer_non-empty_35T",
	"icon-container": "drawer_icon-container_2BX",
	"articleFilters-wrapper": "drawer_articleFilters-wrapper_3_h",
	"pageList-wrapper": "drawer_pageList-wrapper_xWh",
	"drawer-footer": "drawer_drawer-footer_2Eb",
	"fadeIn": "drawer_fadeIn_2FE"
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes main_fadeIn_27_ {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes main_fadeIn_27_ {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.main_main_2sg {\n  position: relative;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  min-height: 100vh;\n  background-color: #fcfcfc;\n  overflow: auto; }\n\n@media (max-width: 500px) {\n  .main_mobileHeader_lU6 {\n    position: fixed;\n    z-index: 97;\n    top: 0;\n    left: 0;\n    width: 100%;\n    background-color: #fff;\n    height: 50px;\n    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2); } }\n\n.main_progressBar_yYZ {\n  position: absolute;\n  z-index: 96;\n  top: 0;\n  left: 0;\n  width: 100%;\n  background-color: #fbce13;\n  height: 5px;\n  -webkit-transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n  @media (max-width: 500px) {\n    .main_progressBar_yYZ {\n      position: fixed;\n      top: 50px; } }\n\n.main_content-wrapper_SPa {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  overflow-x: hidden;\n  padding-top: 5px; }\n  @media (max-width: 500px) {\n    .main_content-wrapper_SPa {\n      padding-top: 50px; } }\n\n.main_footer_Qhq {\n  padding: 16px;\n  width: 100%;\n  background: #fbce13;\n  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2); }\n  .main_footer_Qhq .main_githubButton-container_1SI {\n    float: right; }\n    .main_footer_Qhq .main_githubButton-container_1SI iframe {\n      float: right; }\n", ""]);

// exports
exports.locals = {
	"main": "main_main_2sg",
	"mobileHeader": "main_mobileHeader_lU6",
	"progressBar": "main_progressBar_yYZ",
	"content-wrapper": "main_content-wrapper_SPa",
	"footer": "main_footer_Qhq",
	"githubButton-container": "main_githubButton-container_1SI",
	"fadeIn": "main_fadeIn_27_"
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Inconsolata);", ""]);

// module
exports.push([module.i, "@-webkit-keyframes markdown-container_fadeIn_1dl {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n@keyframes markdown-container_fadeIn_1dl {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.markdown-container_markdown-wrapper_14K {\n  line-height: 1.5;\n  -webkit-animation: markdown-container_fadeIn_1dl 0.6s 1;\n          animation: markdown-container_fadeIn_1dl 0.6s 1;\n  -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n  .markdown-container_markdown-wrapper_14K h1 {\n    padding-bottom: 0.3em;\n    font-size: 2em;\n    border-bottom: 1px solid #eaecef; }\n  .markdown-container_markdown-wrapper_14K h2 {\n    padding-bottom: 0.3em;\n    font-size: 1.5em;\n    border-bottom: 1px solid #eaecef; }\n  .markdown-container_markdown-wrapper_14K pre {\n    background-color: #f6f8fa;\n    padding: 8px 8px 8px 16px;\n    border-left: 5px solid #fbce13;\n    border-radius: 0px 3px 3px 0px;\n    white-space: pre-wrap; }\n    .markdown-container_markdown-wrapper_14K pre code {\n      font-family: 'Inconsolata', monospace;\n      -moz-tab-size: 2;\n        -o-tab-size: 2;\n           tab-size: 2; }\n  .markdown-container_markdown-wrapper_14K table {\n    border-spacing: 0;\n    border-collapse: collapse; }\n    .markdown-container_markdown-wrapper_14K table tr {\n      background-color: #fff; }\n      .markdown-container_markdown-wrapper_14K table tr th, .markdown-container_markdown-wrapper_14K table tr td {\n        padding: 8px 16px;\n        border: 1px solid #dfe2e5; }\n      .markdown-container_markdown-wrapper_14K table tr th {\n        font-weight: 600; }\n  .markdown-container_markdown-wrapper_14K hr {\n    border-width: 3px;\n    border-bottom: none;\n    border-right: none;\n    border-left: none;\n    border-color: rgba(0, 0, 0, 0.1); }\n  .markdown-container_markdown-wrapper_14K a {\n    text-decoration: none;\n    color: #673AB7; }\n  .markdown-container_markdown-wrapper_14K img {\n    max-width: 100%; }\n", ""]);

// exports
exports.locals = {
	"markdown-wrapper": "markdown-container_markdown-wrapper_14K",
	"fadeIn": "markdown-container_fadeIn_1dl"
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes article-filter_fadeIn_37v {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes article-filter_fadeIn_37v {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.article-filter_articleFilter_3xi {\n  display: block;\n  padding: 2px 8px;\n  color: #454444;\n  -webkit-transition: all 0.1s linear;\n  transition: all 0.1s linear;\n  cursor: pointer; }\n\n.article-filter_rkmd-checkbox_2aS {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  width: 100%;\n  height: 32px;\n  color: black;\n  font-size: 14px;\n  padding: 4px; }\n  .article-filter_rkmd-checkbox_2aS .article-filter_input-checkbox_1ZP {\n    position: relative;\n    display: inline-block;\n    width: 18px;\n    height: 18px;\n    text-align: center;\n    vertical-align: -9px; }\n    .article-filter_rkmd-checkbox_2aS .article-filter_input-checkbox_1ZP input[type=\"checkbox\"] {\n      visibility: hidden;\n      margin: 0;\n      padding: 0;\n      outline: none;\n      cursor: pointer;\n      opacity: 0; }\n      .article-filter_rkmd-checkbox_2aS .article-filter_input-checkbox_1ZP input[type=\"checkbox\"] + .article-filter_checkbox_1WA:before {\n        position: absolute;\n        left: 0px;\n        width: 18px;\n        height: 18px;\n        font-family: 'Material Icons';\n        font-weight: normal;\n        font-style: normal;\n        font-size: 24px;\n        line-height: 1;\n        text-transform: none;\n        letter-spacing: normal;\n        word-wrap: normal;\n        white-space: nowrap;\n        direction: ltr;\n        vertical-align: -6px;\n        -webkit-transition: all .2s ease;\n        transition: all .2s ease;\n        z-index: 1; }\n      .article-filter_rkmd-checkbox_2aS .article-filter_input-checkbox_1ZP input[type=\"checkbox\"] + .article-filter_checkbox_1WA:before {\n        content: \"\\E835\";\n        color: #673AB7; }\n      .article-filter_rkmd-checkbox_2aS .article-filter_input-checkbox_1ZP input[type=\"checkbox\"]:checked + .article-filter_checkbox_1WA:before {\n        content: \"\\E834\"; }\n      .article-filter_rkmd-checkbox_2aS .article-filter_input-checkbox_1ZP input[type=\"checkbox\"]:active:not(:disabled) + .article-filter_checkbox_1WA:before {\n        -webkit-transform: scale3d(0.88, 0.88, 1);\n                transform: scale3d(0.88, 0.88, 1); }\n      .article-filter_rkmd-checkbox_2aS .article-filter_input-checkbox_1ZP input[type=\"checkbox\"]:disabled + .article-filter_checkbox_1WA:before {\n        color: rgba(0, 0, 0, 0.157) !important; }\n  .article-filter_rkmd-checkbox_2aS label, .article-filter_rkmd-checkbox_2aS .article-filter_label_3cl {\n    cursor: pointer; }\n  .article-filter_rkmd-checkbox_2aS .article-filter_label_3cl {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    line-height: 24px;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none; }\n", ""]);

// exports
exports.locals = {
	"articleFilter": "article-filter_articleFilter_3xi",
	"rkmd-checkbox": "article-filter_rkmd-checkbox_2aS",
	"input-checkbox": "article-filter_input-checkbox_1ZP",
	"checkbox": "article-filter_checkbox_1WA",
	"label": "article-filter_label_3cl",
	"fadeIn": "article-filter_fadeIn_37v"
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".article-filters_articleFilters_31G {\n  width: 100%;\n  padding: 8px 12px; }\n\n.article-filters_articleFilters-header_2un {\n  position: relative;\n  display: block;\n  text-decoration: none;\n  padding: 4px 8px 4px 4px;\n  margin: 0;\n  color: rgba(0, 0, 0, 0.9);\n  font-size: 14px;\n  line-height: 24px;\n  text-transform: uppercase;\n  font-weight: bold; }\n", ""]);

// exports
exports.locals = {
	"articleFilters": "article-filters_articleFilters_31G",
	"articleFilters-header": "article-filters_articleFilters-header_2un"
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".article-view_page-view_2jS {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding: 16px;\n  overflow-x: hidden; }\n", ""]);

// exports
exports.locals = {
	"page-view": "article-view_page-view_2jS"
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/icon?family=Material+Icons);", ""]);

// module
exports.push([module.i, "html, body {\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  margin: 0;\n  padding: 0;\n  font-family: 'Source Sans Pro', sans-serif;\n  font-size: 16px; }\n\n* {\n  box-sizing: border-box; }\n\n.base_app-container_1op {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  height: 100vh;\n  width: 100vw; }\n", ""]);

// exports
exports.locals = {
	"app-container": "base_app-container_1op"
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(26);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js??ref--2-2!./atelier-estuary-light.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js??ref--2-2!./atelier-estuary-light.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(27);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./category-section.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./category-section.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(28);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./route-link.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./route-link.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(29);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./drawer-toggle.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./drawer-toggle.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(30);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./drawer.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./drawer.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(31);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./main.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./main.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(32);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./markdown-container.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./markdown-container.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(33);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./article-filter.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./article-filter.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(34);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./article-filters.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./article-filters.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(35);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./article-view.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./article-view.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(36);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../node_modules/postcss-loader/index.js??ref--1-2!../../node_modules/sass-loader/lib/loader.js!./base.scss", function() {
        content = require("!!../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../node_modules/postcss-loader/index.js??ref--1-2!../../node_modules/sass-loader/lib/loader.js!./base.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/get-iterator");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("contentful");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("dompurify");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("highlight.js");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("jsdom");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("marked");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = require("walk");

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _activePage = __webpack_require__(6);

var _categorySection = __webpack_require__(11);

var _categorySection2 = _interopRequireDefault(_categorySection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchResults = function (_React$Component) {
  _inherits(SearchResults, _React$Component);

  function SearchResults(props) {
    _classCallCheck(this, SearchResults);

    var _this = _possibleConstructorReturn(this, (SearchResults.__proto__ || Object.getPrototypeOf(SearchResults)).call(this, props));

    _this.mapPages = function () {
      var pages = _this.organisePages(_this.props.activePages);
      var output = pages.map(function (category, index) {
        return _react2.default.createElement(_categorySection2.default, { key: index, category: category, activePage: _this.props.activePage, selectRoute: _this.selectRoute });
      });
      return output;
    };

    _this.selectRoute = function (page) {
      _this.props.selectRoute(page);
    };

    return _this;
  }

  _createClass(SearchResults, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.organisePages(props.activePages);
    }
  }, {
    key: 'organisePages',
    value: function organisePages(entries) {
      var _this2 = this;

      var pages = [];
      entries.forEach(function (entry) {
        var category = entry.fields.category;

        var categoryIndex = _this2.getCategoryIndex(category, pages);

        pages = _this2.addEntryToCategory(category, categoryIndex, entry, pages);
      });
      return pages;
    }
  }, {
    key: 'getCategoryIndex',
    value: function getCategoryIndex(category, pages) {
      var matchedCat = pages.findIndex(function (cat) {
        return cat.sys.id === category.sys.id;
      });
      if (matchedCat < 0) {
        matchedCat = pages.length;
      }
      return matchedCat;
    }
  }, {
    key: 'addEntryToCategory',
    value: function addEntryToCategory(category, categoryIndex, entry, pages) {

      if (!pages[categoryIndex]) {
        pages.push(Object.assign({}, category, { entries: [] }));
      }

      pages[categoryIndex].entries.push(entry);
      return pages;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.hasErrored) {
        return _react2.default.createElement(
          'p',
          null,
          'Sorry! There was an error loading the items'
        );
      }

      if (this.props.isLoading) {
        return _react2.default.createElement('p', null);
      }

      if (this.props.activePages.length > 0) {
        return _react2.default.createElement(
          'div',
          { className: 'pageList' },
          this.props.activePages.length > 0 ? this.mapPages() : _react2.default.createElement(
            'p',
            null,
            'No Results'
          )
        );
      }

      return _react2.default.createElement(
        'p',
        null,
        'No Results'
      );
    }
  }]);

  return SearchResults;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    hasErrored: state.pageList.pageListError,
    isLoading: state.pageList.pageListLoading,
    activePages: state.pageList.activePages,
    activePage: state.activePage.page,
    activeRoute: state.activePage.route
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SearchResults);

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map