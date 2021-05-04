"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = normalizeFallback;

require("core-js/modules/es.array.index-of.js");

require("core-js/modules/es.object.assign.js");

var _loaderUtils = _interopRequireDefault(require("loader-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function normalizeFallback(fallback, originalOptions) {
  var loader = 'file-loader';
  var options = {};

  if (typeof fallback === 'string') {
    loader = fallback;
    var index = fallback.indexOf('?');

    if (index >= 0) {
      loader = fallback.substr(0, index);
      options = _loaderUtils["default"].parseQuery(fallback.substr(index));
    }
  }

  if (fallback !== null && _typeof(fallback) === 'object') {
    ;
    loader = fallback.loader;
    options = fallback.options;
  }

  options = Object.assign({}, originalOptions, options);
  delete options.fallback;
  return {
    loader: loader,
    options: options
  };
}