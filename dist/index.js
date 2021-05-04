"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loader;
exports.raw = void 0;

require("core-js/modules/es.date.to-string.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.object.assign.js");

var _loaderUtils = require("loader-utils");

var _schemaUtils = require("schema-utils");

var _options = _interopRequireDefault(require("./options.json"));

var _normalizeFallback2 = _interopRequireDefault(require("./normalizeFallback"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function loader(content, map, meta) {
  var options = (0, _loaderUtils.getOptions)(this) || {};
  content = content.toString();
  (0, _schemaUtils.validate)(_options["default"], options, {
    name: 'Markdown Comment Loader',
    baseDataPath: 'options'
  });
  var header = '',
      footer = '';

  if (options.header !== undefined) {
    if (typeof options.header === 'function') {
      header += options.header(content);
    } else {
      header += options.header;
    }

    header += '\n\n';
  }

  if (options.footer !== undefined) {
    footer += '\n\n';

    if (typeof options.footer === 'function') {
      footer += options.footer(content);
    } else {
      footer += options.footer;
    }
  }

  var result = header + content + footer; // 直接生成markdown文件

  if (options.generate) {
    var _normalizeFallback = (0, _normalizeFallback2["default"])(options.fallback, options),
        fallbackLoader = _normalizeFallback.loader,
        fallbackOptions = _normalizeFallback.options; // file-loader


    var fallback = require(fallbackLoader);

    var fallbackLoaderContext = Object.assign({}, this, {
      query: fallbackOptions
    });
    return fallback.call(fallbackLoaderContext, result);
  } // 下一步loader处理


  return result;
}

var raw = true;
exports.raw = raw;