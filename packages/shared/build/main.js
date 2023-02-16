/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/property-expr/index.js":
/*!*************************************************!*\
  !*** ../../node_modules/property-expr/index.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
/**
 * Based on Kendo UI Core expression code <https://github.com/telerik/kendo-ui-core#license-information>
 */


function Cache(maxSize) {
  this._maxSize = maxSize
  this.clear()
}
Cache.prototype.clear = function () {
  this._size = 0
  this._values = Object.create(null)
}
Cache.prototype.get = function (key) {
  return this._values[key]
}
Cache.prototype.set = function (key, value) {
  this._size >= this._maxSize && this.clear()
  if (!(key in this._values)) this._size++

  return (this._values[key] = value)
}

var SPLIT_REGEX = /[^.^\]^[]+|(?=\[\]|\.\.)/g,
  DIGIT_REGEX = /^\d+$/,
  LEAD_DIGIT_REGEX = /^\d/,
  SPEC_CHAR_REGEX = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g,
  CLEAN_QUOTES_REGEX = /^\s*(['"]?)(.*?)(\1)\s*$/,
  MAX_CACHE_SIZE = 512

var pathCache = new Cache(MAX_CACHE_SIZE),
  setCache = new Cache(MAX_CACHE_SIZE),
  getCache = new Cache(MAX_CACHE_SIZE)

var config

module.exports = {
  Cache: Cache,

  split: split,

  normalizePath: normalizePath,

  setter: function (path) {
    var parts = normalizePath(path)

    return (
      setCache.get(path) ||
      setCache.set(path, function setter(obj, value) {
        var index = 0
        var len = parts.length
        var data = obj

        while (index < len - 1) {
          var part = parts[index]
          if (
            part === '__proto__' ||
            part === 'constructor' ||
            part === 'prototype'
          ) {
            return obj
          }

          data = data[parts[index++]]
        }
        data[parts[index]] = value
      })
    )
  },

  getter: function (path, safe) {
    var parts = normalizePath(path)
    return (
      getCache.get(path) ||
      getCache.set(path, function getter(data) {
        var index = 0,
          len = parts.length
        while (index < len) {
          if (data != null || !safe) data = data[parts[index++]]
          else return
        }
        return data
      })
    )
  },

  join: function (segments) {
    return segments.reduce(function (path, part) {
      return (
        path +
        (isQuoted(part) || DIGIT_REGEX.test(part)
          ? '[' + part + ']'
          : (path ? '.' : '') + part)
      )
    }, '')
  },

  forEach: function (path, cb, thisArg) {
    forEach(Array.isArray(path) ? path : split(path), cb, thisArg)
  },
}

function normalizePath(path) {
  return (
    pathCache.get(path) ||
    pathCache.set(
      path,
      split(path).map(function (part) {
        return part.replace(CLEAN_QUOTES_REGEX, '$2')
      })
    )
  )
}

function split(path) {
  return path.match(SPLIT_REGEX) || ['']
}

function forEach(parts, iter, thisArg) {
  var len = parts.length,
    part,
    idx,
    isArray,
    isBracket

  for (idx = 0; idx < len; idx++) {
    part = parts[idx]

    if (part) {
      if (shouldBeQuoted(part)) {
        part = '"' + part + '"'
      }

      isBracket = isQuoted(part)
      isArray = !isBracket && /^\d+$/.test(part)

      iter.call(thisArg, part, isBracket, isArray, idx, parts)
    }
  }
}

function isQuoted(str) {
  return (
    typeof str === 'string' && str && ["'", '"'].indexOf(str.charAt(0)) !== -1
  )
}

function hasLeadingNumber(part) {
  return part.match(LEAD_DIGIT_REGEX) && !part.match(DIGIT_REGEX)
}

function hasSpecialChars(part) {
  return SPEC_CHAR_REGEX.test(part)
}

function shouldBeQuoted(part) {
  return !isQuoted(part) && (hasLeadingNumber(part) || hasSpecialChars(part))
}


/***/ }),

/***/ "../../node_modules/tiny-case/index.js":
/*!*********************************************!*\
  !*** ../../node_modules/tiny-case/index.js ***!
  \*********************************************/
/***/ ((module) => {

const reWords = /[A-Z\xc0-\xd6\xd8-\xde]?[a-z\xdf-\xf6\xf8-\xff]+(?:['’](?:d|ll|m|re|s|t|ve))?(?=[\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000]|[A-Z\xc0-\xd6\xd8-\xde]|$)|(?:[A-Z\xc0-\xd6\xd8-\xde]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])+(?:['’](?:D|LL|M|RE|S|T|VE))?(?=[\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000]|[A-Z\xc0-\xd6\xd8-\xde](?:[a-z\xdf-\xf6\xf8-\xff]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])|$)|[A-Z\xc0-\xd6\xd8-\xde]?(?:[a-z\xdf-\xf6\xf8-\xff]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])+(?:['’](?:d|ll|m|re|s|t|ve))?|[A-Z\xc0-\xd6\xd8-\xde]+(?:['’](?:D|LL|M|RE|S|T|VE))?|\d*(?:1ST|2ND|3RD|(?![123])\dTH)(?=\b|[a-z_])|\d*(?:1st|2nd|3rd|(?![123])\dth)(?=\b|[A-Z_])|\d+|(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?)*/g

const words = (str) => str.match(reWords) || []

const upperFirst = (str) => str[0].toUpperCase() + str.slice(1)

const join = (str, d) => words(str).join(d).toLowerCase()

const camelCase = (str) =>
  words(str).reduce(
    (acc, next) =>
      `${acc}${
        !acc
          ? next.toLowerCase()
          : next[0].toUpperCase() + next.slice(1).toLowerCase()
      }`,
    '',
  )

const pascalCase = (str) => upperFirst(camelCase(str))

const snakeCase = (str) => join(str, '_')

const kebabCase = (str) => join(str, '-')

const sentenceCase = (str) => upperFirst(join(str, ' '))

const titleCase = (str) => words(str).map(upperFirst).join(' ')

module.exports = {
  words,
  upperFirst,
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase,
  sentenceCase,
  titleCase,
}


/***/ }),

/***/ "../../node_modules/toposort/index.js":
/*!********************************************!*\
  !*** ../../node_modules/toposort/index.js ***!
  \********************************************/
/***/ ((module) => {


/**
 * Topological sorting function
 *
 * @param {Array} edges
 * @returns {Array}
 */

module.exports = function(edges) {
  return toposort(uniqueNodes(edges), edges)
}

module.exports.array = toposort

function toposort(nodes, edges) {
  var cursor = nodes.length
    , sorted = new Array(cursor)
    , visited = {}
    , i = cursor
    // Better data structures make algorithm much faster.
    , outgoingEdges = makeOutgoingEdges(edges)
    , nodesHash = makeNodesHash(nodes)

  // check for unknown nodes
  edges.forEach(function(edge) {
    if (!nodesHash.has(edge[0]) || !nodesHash.has(edge[1])) {
      throw new Error('Unknown node. There is an unknown node in the supplied edges.')
    }
  })

  while (i--) {
    if (!visited[i]) visit(nodes[i], i, new Set())
  }

  return sorted

  function visit(node, i, predecessors) {
    if(predecessors.has(node)) {
      var nodeRep
      try {
        nodeRep = ", node was:" + JSON.stringify(node)
      } catch(e) {
        nodeRep = ""
      }
      throw new Error('Cyclic dependency' + nodeRep)
    }

    if (!nodesHash.has(node)) {
      throw new Error('Found unknown node. Make sure to provided all involved nodes. Unknown node: '+JSON.stringify(node))
    }

    if (visited[i]) return;
    visited[i] = true

    var outgoing = outgoingEdges.get(node) || new Set()
    outgoing = Array.from(outgoing)

    if (i = outgoing.length) {
      predecessors.add(node)
      do {
        var child = outgoing[--i]
        visit(child, nodesHash.get(child), predecessors)
      } while (i)
      predecessors.delete(node)
    }

    sorted[--cursor] = node
  }
}

function uniqueNodes(arr){
  var res = new Set()
  for (var i = 0, len = arr.length; i < len; i++) {
    var edge = arr[i]
    res.add(edge[0])
    res.add(edge[1])
  }
  return Array.from(res)
}

function makeOutgoingEdges(arr){
  var edges = new Map()
  for (var i = 0, len = arr.length; i < len; i++) {
    var edge = arr[i]
    if (!edges.has(edge[0])) edges.set(edge[0], new Set())
    if (!edges.has(edge[1])) edges.set(edge[1], new Set())
    edges.get(edge[0]).add(edge[1])
  }
  return edges
}

function makeNodesHash(arr){
  var res = new Map()
  for (var i = 0, len = arr.length; i < len; i++) {
    res.set(arr[i], i)
  }
  return res
}


/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validation = void 0;
exports.validation = __importStar(__webpack_require__(/*! ./validation */ "./validation/index.ts"));


/***/ }),

/***/ "./validation/form.ts":
/*!****************************!*\
  !*** ./validation/form.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loginSignUp = void 0;
const yup_1 = __importDefault(__webpack_require__(/*! yup */ "../../node_modules/yup/index.esm.js"));
exports.loginSignUp = yup_1.default.object({
    email: yup_1.default.string().email("email shouldn't be empty").required(),
});


/***/ }),

/***/ "./validation/index.ts":
/*!*****************************!*\
  !*** ./validation/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./form */ "./validation/form.ts"), exports);


/***/ }),

/***/ "../../node_modules/yup/index.esm.js":
/*!*******************************************!*\
  !*** ../../node_modules/yup/index.esm.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArraySchema": () => (/* binding */ ArraySchema),
/* harmony export */   "BooleanSchema": () => (/* binding */ BooleanSchema),
/* harmony export */   "DateSchema": () => (/* binding */ DateSchema),
/* harmony export */   "MixedSchema": () => (/* binding */ MixedSchema),
/* harmony export */   "NumberSchema": () => (/* binding */ NumberSchema),
/* harmony export */   "ObjectSchema": () => (/* binding */ ObjectSchema),
/* harmony export */   "Schema": () => (/* binding */ Schema),
/* harmony export */   "StringSchema": () => (/* binding */ StringSchema),
/* harmony export */   "TupleSchema": () => (/* binding */ TupleSchema),
/* harmony export */   "ValidationError": () => (/* binding */ ValidationError),
/* harmony export */   "addMethod": () => (/* binding */ addMethod),
/* harmony export */   "array": () => (/* binding */ create$2),
/* harmony export */   "bool": () => (/* binding */ create$7),
/* harmony export */   "boolean": () => (/* binding */ create$7),
/* harmony export */   "date": () => (/* binding */ create$4),
/* harmony export */   "getIn": () => (/* binding */ getIn),
/* harmony export */   "isSchema": () => (/* binding */ isSchema),
/* harmony export */   "lazy": () => (/* binding */ create),
/* harmony export */   "mixed": () => (/* binding */ create$8),
/* harmony export */   "number": () => (/* binding */ create$5),
/* harmony export */   "object": () => (/* binding */ create$3),
/* harmony export */   "reach": () => (/* binding */ reach),
/* harmony export */   "ref": () => (/* binding */ create$9),
/* harmony export */   "setLocale": () => (/* binding */ setLocale),
/* harmony export */   "string": () => (/* binding */ create$6),
/* harmony export */   "tuple": () => (/* binding */ create$1)
/* harmony export */ });
/* harmony import */ var property_expr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! property-expr */ "../../node_modules/property-expr/index.js");
/* harmony import */ var property_expr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(property_expr__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tiny_case__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tiny-case */ "../../node_modules/tiny-case/index.js");
/* harmony import */ var tiny_case__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tiny_case__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var toposort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! toposort */ "../../node_modules/toposort/index.js");
/* harmony import */ var toposort__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(toposort__WEBPACK_IMPORTED_MODULE_2__);




const toString = Object.prototype.toString;
const errorToString = Error.prototype.toString;
const regExpToString = RegExp.prototype.toString;
const symbolToString = typeof Symbol !== 'undefined' ? Symbol.prototype.toString : () => '';
const SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
function printNumber(val) {
  if (val != +val) return 'NaN';
  const isNegativeZero = val === 0 && 1 / val < 0;
  return isNegativeZero ? '-0' : '' + val;
}
function printSimpleValue(val, quoteStrings = false) {
  if (val == null || val === true || val === false) return '' + val;
  const typeOf = typeof val;
  if (typeOf === 'number') return printNumber(val);
  if (typeOf === 'string') return quoteStrings ? `"${val}"` : val;
  if (typeOf === 'function') return '[Function ' + (val.name || 'anonymous') + ']';
  if (typeOf === 'symbol') return symbolToString.call(val).replace(SYMBOL_REGEXP, 'Symbol($1)');
  const tag = toString.call(val).slice(8, -1);
  if (tag === 'Date') return isNaN(val.getTime()) ? '' + val : val.toISOString(val);
  if (tag === 'Error' || val instanceof Error) return '[' + errorToString.call(val) + ']';
  if (tag === 'RegExp') return regExpToString.call(val);
  return null;
}
function printValue(value, quoteStrings) {
  let result = printSimpleValue(value, quoteStrings);
  if (result !== null) return result;
  return JSON.stringify(value, function (key, value) {
    let result = printSimpleValue(this[key], quoteStrings);
    if (result !== null) return result;
    return value;
  }, 2);
}

function toArray(value) {
  return value == null ? [] : [].concat(value);
}

let strReg = /\$\{\s*(\w+)\s*\}/g;
class ValidationError extends Error {
  static formatError(message, params) {
    const path = params.label || params.path || 'this';
    if (path !== params.path) params = Object.assign({}, params, {
      path
    });
    if (typeof message === 'string') return message.replace(strReg, (_, key) => printValue(params[key]));
    if (typeof message === 'function') return message(params);
    return message;
  }
  static isError(err) {
    return err && err.name === 'ValidationError';
  }
  constructor(errorOrErrors, value, field, type) {
    super();
    this.value = void 0;
    this.path = void 0;
    this.type = void 0;
    this.errors = void 0;
    this.params = void 0;
    this.inner = void 0;
    this.name = 'ValidationError';
    this.value = value;
    this.path = field;
    this.type = type;
    this.errors = [];
    this.inner = [];
    toArray(errorOrErrors).forEach(err => {
      if (ValidationError.isError(err)) {
        this.errors.push(...err.errors);
        this.inner = this.inner.concat(err.inner.length ? err.inner : err);
      } else {
        this.errors.push(err);
      }
    });
    this.message = this.errors.length > 1 ? `${this.errors.length} errors occurred` : this.errors[0];
    if (Error.captureStackTrace) Error.captureStackTrace(this, ValidationError);
  }
}

let mixed = {
  default: '${path} is invalid',
  required: '${path} is a required field',
  defined: '${path} must be defined',
  notNull: '${path} cannot be null',
  oneOf: '${path} must be one of the following values: ${values}',
  notOneOf: '${path} must not be one of the following values: ${values}',
  notType: ({
    path,
    type,
    value,
    originalValue
  }) => {
    const castMsg = originalValue != null && originalValue !== value ? ` (cast from the value \`${printValue(originalValue, true)}\`).` : '.';
    return type !== 'mixed' ? `${path} must be a \`${type}\` type, ` + `but the final value was: \`${printValue(value, true)}\`` + castMsg : `${path} must match the configured type. ` + `The validated value was: \`${printValue(value, true)}\`` + castMsg;
  }
};
let string = {
  length: '${path} must be exactly ${length} characters',
  min: '${path} must be at least ${min} characters',
  max: '${path} must be at most ${max} characters',
  matches: '${path} must match the following: "${regex}"',
  email: '${path} must be a valid email',
  url: '${path} must be a valid URL',
  uuid: '${path} must be a valid UUID',
  trim: '${path} must be a trimmed string',
  lowercase: '${path} must be a lowercase string',
  uppercase: '${path} must be a upper case string'
};
let number = {
  min: '${path} must be greater than or equal to ${min}',
  max: '${path} must be less than or equal to ${max}',
  lessThan: '${path} must be less than ${less}',
  moreThan: '${path} must be greater than ${more}',
  positive: '${path} must be a positive number',
  negative: '${path} must be a negative number',
  integer: '${path} must be an integer'
};
let date = {
  min: '${path} field must be later than ${min}',
  max: '${path} field must be at earlier than ${max}'
};
let boolean = {
  isValue: '${path} field must be ${value}'
};
let object = {
  noUnknown: '${path} field has unspecified keys: ${unknown}'
};
let array = {
  min: '${path} field must have at least ${min} items',
  max: '${path} field must have less than or equal to ${max} items',
  length: '${path} must have ${length} items'
};
let tuple = {
  notType: params => {
    const {
      path,
      value,
      spec
    } = params;
    const typeLen = spec.types.length;
    if (Array.isArray(value)) {
      if (value.length < typeLen) return `${path} tuple value has too few items, expected a length of ${typeLen} but got ${value.length} for value: \`${printValue(value, true)}\``;
      if (value.length > typeLen) return `${path} tuple value has too many items, expected a length of ${typeLen} but got ${value.length} for value: \`${printValue(value, true)}\``;
    }
    return ValidationError.formatError(mixed.notType, params);
  }
};
var locale = Object.assign(Object.create(null), {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean
});

const isSchema = obj => obj && obj.__isYupSchema__;

class Condition {
  static fromOptions(refs, config) {
    if (!config.then && !config.otherwise) throw new TypeError('either `then:` or `otherwise:` is required for `when()` conditions');
    let {
      is,
      then,
      otherwise
    } = config;
    let check = typeof is === 'function' ? is : (...values) => values.every(value => value === is);
    return new Condition(refs, (values, schema) => {
      var _branch;
      let branch = check(...values) ? then : otherwise;
      return (_branch = branch == null ? void 0 : branch(schema)) != null ? _branch : schema;
    });
  }
  constructor(refs, builder) {
    this.fn = void 0;
    this.refs = refs;
    this.refs = refs;
    this.fn = builder;
  }
  resolve(base, options) {
    let values = this.refs.map(ref =>
    // TODO: ? operator here?
    ref.getValue(options == null ? void 0 : options.value, options == null ? void 0 : options.parent, options == null ? void 0 : options.context));
    let schema = this.fn(values, base, options);
    if (schema === undefined ||
    // @ts-ignore this can be base
    schema === base) {
      return base;
    }
    if (!isSchema(schema)) throw new TypeError('conditions must return a schema object');
    return schema.resolve(options);
  }
}

const prefixes = {
  context: '$',
  value: '.'
};
function create$9(key, options) {
  return new Reference(key, options);
}
class Reference {
  constructor(key, options = {}) {
    this.key = void 0;
    this.isContext = void 0;
    this.isValue = void 0;
    this.isSibling = void 0;
    this.path = void 0;
    this.getter = void 0;
    this.map = void 0;
    if (typeof key !== 'string') throw new TypeError('ref must be a string, got: ' + key);
    this.key = key.trim();
    if (key === '') throw new TypeError('ref must be a non-empty string');
    this.isContext = this.key[0] === prefixes.context;
    this.isValue = this.key[0] === prefixes.value;
    this.isSibling = !this.isContext && !this.isValue;
    let prefix = this.isContext ? prefixes.context : this.isValue ? prefixes.value : '';
    this.path = this.key.slice(prefix.length);
    this.getter = this.path && (0,property_expr__WEBPACK_IMPORTED_MODULE_0__.getter)(this.path, true);
    this.map = options.map;
  }
  getValue(value, parent, context) {
    let result = this.isContext ? context : this.isValue ? value : parent;
    if (this.getter) result = this.getter(result || {});
    if (this.map) result = this.map(result);
    return result;
  }

  /**
   *
   * @param {*} value
   * @param {Object} options
   * @param {Object=} options.context
   * @param {Object=} options.parent
   */
  cast(value, options) {
    return this.getValue(value, options == null ? void 0 : options.parent, options == null ? void 0 : options.context);
  }
  resolve() {
    return this;
  }
  describe() {
    return {
      type: 'ref',
      key: this.key
    };
  }
  toString() {
    return `Ref(${this.key})`;
  }
  static isRef(value) {
    return value && value.__isYupRef;
  }
}

// @ts-ignore
Reference.prototype.__isYupRef = true;

const isAbsent = value => value == null;

function createValidation(config) {
  function validate({
    value,
    path = '',
    options,
    originalValue,
    schema
  }, panic, next) {
    const {
      name,
      test,
      params,
      message,
      skipAbsent
    } = config;
    let {
      parent,
      context,
      abortEarly = schema.spec.abortEarly
    } = options;
    function resolve(item) {
      return Reference.isRef(item) ? item.getValue(value, parent, context) : item;
    }
    function createError(overrides = {}) {
      const nextParams = Object.assign({
        value,
        originalValue,
        label: schema.spec.label,
        path: overrides.path || path,
        spec: schema.spec
      }, params, overrides.params);
      for (const key of Object.keys(nextParams)) nextParams[key] = resolve(nextParams[key]);
      const error = new ValidationError(ValidationError.formatError(overrides.message || message, nextParams), value, nextParams.path, overrides.type || name);
      error.params = nextParams;
      return error;
    }
    const invalid = abortEarly ? panic : next;
    let ctx = {
      path,
      parent,
      type: name,
      from: options.from,
      createError,
      resolve,
      options,
      originalValue,
      schema
    };
    const handleResult = validOrError => {
      if (ValidationError.isError(validOrError)) invalid(validOrError);else if (!validOrError) invalid(createError());else next(null);
    };
    const handleError = err => {
      if (ValidationError.isError(err)) invalid(err);else panic(err);
    };
    const shouldSkip = skipAbsent && isAbsent(value);
    if (!options.sync) {
      try {
        Promise.resolve(!shouldSkip ? test.call(ctx, value, ctx) : true).then(handleResult, handleError);
      } catch (err) {
        handleError(err);
      }
      return;
    }
    let result;
    try {
      var _result;
      result = !shouldSkip ? test.call(ctx, value, ctx) : true;
      if (typeof ((_result = result) == null ? void 0 : _result.then) === 'function') {
        throw new Error(`Validation test of type: "${ctx.type}" returned a Promise during a synchronous validate. ` + `This test will finish after the validate call has returned`);
      }
    } catch (err) {
      handleError(err);
      return;
    }
    handleResult(result);
  }
  validate.OPTIONS = config;
  return validate;
}

function getIn(schema, path, value, context = value) {
  let parent, lastPart, lastPartDebug;

  // root path: ''
  if (!path) return {
    parent,
    parentPath: path,
    schema
  };
  (0,property_expr__WEBPACK_IMPORTED_MODULE_0__.forEach)(path, (_part, isBracket, isArray) => {
    let part = isBracket ? _part.slice(1, _part.length - 1) : _part;
    schema = schema.resolve({
      context,
      parent,
      value
    });
    let isTuple = schema.type === 'tuple';
    let idx = isArray ? parseInt(part, 10) : 0;
    if (schema.innerType || isTuple) {
      if (isTuple && !isArray) throw new Error(`Yup.reach cannot implicitly index into a tuple type. the path part "${lastPartDebug}" must contain an index to the tuple element, e.g. "${lastPartDebug}[0]"`);
      if (value && idx >= value.length) {
        throw new Error(`Yup.reach cannot resolve an array item at index: ${_part}, in the path: ${path}. ` + `because there is no value at that index. `);
      }
      parent = value;
      value = value && value[idx];
      schema = isTuple ? schema.spec.types[idx] : schema.innerType;
    }

    // sometimes the array index part of a path doesn't exist: "nested.arr.child"
    // in these cases the current part is the next schema and should be processed
    // in this iteration. For cases where the index signature is included this
    // check will fail and we'll handle the `child` part on the next iteration like normal
    if (!isArray) {
      if (!schema.fields || !schema.fields[part]) throw new Error(`The schema does not contain the path: ${path}. ` + `(failed at: ${lastPartDebug} which is a type: "${schema.type}")`);
      parent = value;
      value = value && value[part];
      schema = schema.fields[part];
    }
    lastPart = part;
    lastPartDebug = isBracket ? '[' + _part + ']' : '.' + _part;
  });
  return {
    schema,
    parent,
    parentPath: lastPart
  };
}
function reach(obj, path, value, context) {
  return getIn(obj, path, value, context).schema;
}

class ReferenceSet extends Set {
  describe() {
    const description = [];
    for (const item of this.values()) {
      description.push(Reference.isRef(item) ? item.describe() : item);
    }
    return description;
  }
  resolveAll(resolve) {
    let result = [];
    for (const item of this.values()) {
      result.push(resolve(item));
    }
    return result;
  }
  clone() {
    return new ReferenceSet(this.values());
  }
  merge(newItems, removeItems) {
    const next = this.clone();
    newItems.forEach(value => next.add(value));
    removeItems.forEach(value => next.delete(value));
    return next;
  }
}

// tweaked from https://github.com/Kelin2025/nanoclone/blob/0abeb7635bda9b68ef2277093f76dbe3bf3948e1/src/index.js
function clone(src, seen = new Map()) {
  if (isSchema(src) || !src || typeof src !== 'object') return src;
  if (seen.has(src)) return seen.get(src);
  let copy;
  if (src instanceof Date) {
    // Date
    copy = new Date(src.getTime());
    seen.set(src, copy);
  } else if (src instanceof RegExp) {
    // RegExp
    copy = new RegExp(src);
    seen.set(src, copy);
  } else if (Array.isArray(src)) {
    // Array
    copy = new Array(src.length);
    seen.set(src, copy);
    for (let i = 0; i < src.length; i++) copy[i] = clone(src[i], seen);
  } else if (src instanceof Map) {
    // Map
    copy = new Map();
    seen.set(src, copy);
    for (const [k, v] of src.entries()) copy.set(k, clone(v, seen));
  } else if (src instanceof Set) {
    // Set
    copy = new Set();
    seen.set(src, copy);
    for (const v of src) copy.add(clone(v, seen));
  } else if (src instanceof Object) {
    // Object
    copy = {};
    seen.set(src, copy);
    for (const [k, v] of Object.entries(src)) copy[k] = clone(v, seen);
  } else {
    throw Error(`Unable to clone ${src}`);
  }
  return copy;
}

class Schema {
  constructor(options) {
    this.type = void 0;
    this.deps = [];
    this.tests = void 0;
    this.transforms = void 0;
    this.conditions = [];
    this._mutate = void 0;
    this.internalTests = {};
    this._whitelist = new ReferenceSet();
    this._blacklist = new ReferenceSet();
    this.exclusiveTests = Object.create(null);
    this._typeCheck = void 0;
    this.spec = void 0;
    this.tests = [];
    this.transforms = [];
    this.withMutation(() => {
      this.typeError(mixed.notType);
    });
    this.type = options.type;
    this._typeCheck = options.check;
    this.spec = Object.assign({
      strip: false,
      strict: false,
      abortEarly: true,
      recursive: true,
      nullable: false,
      optional: true,
      coerce: true
    }, options == null ? void 0 : options.spec);
    this.withMutation(s => {
      s.nonNullable();
    });
  }

  // TODO: remove
  get _type() {
    return this.type;
  }
  clone(spec) {
    if (this._mutate) {
      if (spec) Object.assign(this.spec, spec);
      return this;
    }

    // if the nested value is a schema we can skip cloning, since
    // they are already immutable
    const next = Object.create(Object.getPrototypeOf(this));

    // @ts-expect-error this is readonly
    next.type = this.type;
    next._typeCheck = this._typeCheck;
    next._whitelist = this._whitelist.clone();
    next._blacklist = this._blacklist.clone();
    next.internalTests = Object.assign({}, this.internalTests);
    next.exclusiveTests = Object.assign({}, this.exclusiveTests);

    // @ts-expect-error this is readonly
    next.deps = [...this.deps];
    next.conditions = [...this.conditions];
    next.tests = [...this.tests];
    next.transforms = [...this.transforms];
    next.spec = clone(Object.assign({}, this.spec, spec));
    return next;
  }
  label(label) {
    let next = this.clone();
    next.spec.label = label;
    return next;
  }
  meta(...args) {
    if (args.length === 0) return this.spec.meta;
    let next = this.clone();
    next.spec.meta = Object.assign(next.spec.meta || {}, args[0]);
    return next;
  }
  withMutation(fn) {
    let before = this._mutate;
    this._mutate = true;
    let result = fn(this);
    this._mutate = before;
    return result;
  }
  concat(schema) {
    if (!schema || schema === this) return this;
    if (schema.type !== this.type && this.type !== 'mixed') throw new TypeError(`You cannot \`concat()\` schema's of different types: ${this.type} and ${schema.type}`);
    let base = this;
    let combined = schema.clone();
    const mergedSpec = Object.assign({}, base.spec, combined.spec);
    combined.spec = mergedSpec;
    combined.internalTests = Object.assign({}, base.internalTests, combined.internalTests);

    // manually merge the blacklist/whitelist (the other `schema` takes
    // precedence in case of conflicts)
    combined._whitelist = base._whitelist.merge(schema._whitelist, schema._blacklist);
    combined._blacklist = base._blacklist.merge(schema._blacklist, schema._whitelist);

    // start with the current tests
    combined.tests = base.tests;
    combined.exclusiveTests = base.exclusiveTests;

    // manually add the new tests to ensure
    // the deduping logic is consistent
    combined.withMutation(next => {
      schema.tests.forEach(fn => {
        next.test(fn.OPTIONS);
      });
    });
    combined.transforms = [...base.transforms, ...combined.transforms];
    return combined;
  }
  isType(v) {
    if (v == null) {
      if (this.spec.nullable && v === null) return true;
      if (this.spec.optional && v === undefined) return true;
      return false;
    }
    return this._typeCheck(v);
  }
  resolve(options) {
    let schema = this;
    if (schema.conditions.length) {
      let conditions = schema.conditions;
      schema = schema.clone();
      schema.conditions = [];
      schema = conditions.reduce((prevSchema, condition) => condition.resolve(prevSchema, options), schema);
      schema = schema.resolve(options);
    }
    return schema;
  }
  resolveOptions(options) {
    var _options$strict, _options$abortEarly, _options$recursive;
    return Object.assign({}, options, {
      from: options.from || [],
      strict: (_options$strict = options.strict) != null ? _options$strict : this.spec.strict,
      abortEarly: (_options$abortEarly = options.abortEarly) != null ? _options$abortEarly : this.spec.abortEarly,
      recursive: (_options$recursive = options.recursive) != null ? _options$recursive : this.spec.recursive
    });
  }

  /**
   * Run the configured transform pipeline over an input value.
   */

  cast(value, options = {}) {
    let resolvedSchema = this.resolve(Object.assign({
      value
    }, options));
    let allowOptionality = options.assert === 'ignore-optionality';
    let result = resolvedSchema._cast(value, options);
    if (options.assert !== false && !resolvedSchema.isType(result)) {
      if (allowOptionality && isAbsent(result)) {
        return result;
      }
      let formattedValue = printValue(value);
      let formattedResult = printValue(result);
      throw new TypeError(`The value of ${options.path || 'field'} could not be cast to a value ` + `that satisfies the schema type: "${resolvedSchema.type}". \n\n` + `attempted value: ${formattedValue} \n` + (formattedResult !== formattedValue ? `result of cast: ${formattedResult}` : ''));
    }
    return result;
  }
  _cast(rawValue, _options) {
    let value = rawValue === undefined ? rawValue : this.transforms.reduce((prevValue, fn) => fn.call(this, prevValue, rawValue, this), rawValue);
    if (value === undefined) {
      value = this.getDefault();
    }
    return value;
  }
  _validate(_value, options = {}, panic, next) {
    let {
      path,
      originalValue = _value,
      strict = this.spec.strict
    } = options;
    let value = _value;
    if (!strict) {
      value = this._cast(value, Object.assign({
        assert: false
      }, options));
    }
    let initialTests = [];
    for (let test of Object.values(this.internalTests)) {
      if (test) initialTests.push(test);
    }
    this.runTests({
      path,
      value,
      originalValue,
      options,
      tests: initialTests
    }, panic, initialErrors => {
      // even if we aren't ending early we can't proceed further if the types aren't correct
      if (initialErrors.length) {
        return next(initialErrors, value);
      }
      this.runTests({
        path,
        value,
        originalValue,
        options,
        tests: this.tests
      }, panic, next);
    });
  }

  /**
   * Executes a set of validations, either schema, produced Tests or a nested
   * schema validate result.
   */
  runTests(runOptions, panic, next) {
    let fired = false;
    let {
      tests,
      value,
      originalValue,
      path,
      options
    } = runOptions;
    let panicOnce = arg => {
      if (fired) return;
      fired = true;
      panic(arg, value);
    };
    let nextOnce = arg => {
      if (fired) return;
      fired = true;
      next(arg, value);
    };
    let count = tests.length;
    let nestedErrors = [];
    if (!count) return nextOnce([]);
    let args = {
      value,
      originalValue,
      path,
      options,
      schema: this
    };
    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      test(args, panicOnce, function finishTestRun(err) {
        if (err) {
          nestedErrors = nestedErrors.concat(err);
        }
        if (--count <= 0) {
          nextOnce(nestedErrors);
        }
      });
    }
  }
  asNestedTest({
    key,
    index,
    parent,
    parentPath,
    originalParent,
    options
  }) {
    const k = key != null ? key : index;
    if (k == null) {
      throw TypeError('Must include `key` or `index` for nested validations');
    }
    const isIndex = typeof k === 'number';
    let value = parent[k];
    const testOptions = Object.assign({}, options, {
      // Nested validations fields are always strict:
      //    1. parent isn't strict so the casting will also have cast inner values
      //    2. parent is strict in which case the nested values weren't cast either
      strict: true,
      parent,
      value,
      originalValue: originalParent[k],
      // FIXME: tests depend on `index` being passed around deeply,
      //   we should not let the options.key/index bleed through
      key: undefined,
      // index: undefined,
      [isIndex ? 'index' : 'key']: k,
      path: isIndex || k.includes('.') ? `${parentPath || ''}[${value ? k : `"${k}"`}]` : (parentPath ? `${parentPath}.` : '') + key
    });
    return (_, panic, next) => this.resolve(testOptions)._validate(value, testOptions, panic, next);
  }
  validate(value, options) {
    let schema = this.resolve(Object.assign({}, options, {
      value
    }));
    return new Promise((resolve, reject) => schema._validate(value, options, (error, parsed) => {
      if (ValidationError.isError(error)) error.value = parsed;
      reject(error);
    }, (errors, validated) => {
      if (errors.length) reject(new ValidationError(errors, validated));else resolve(validated);
    }));
  }
  validateSync(value, options) {
    let schema = this.resolve(Object.assign({}, options, {
      value
    }));
    let result;
    schema._validate(value, Object.assign({}, options, {
      sync: true
    }), (error, parsed) => {
      if (ValidationError.isError(error)) error.value = parsed;
      throw error;
    }, (errors, validated) => {
      if (errors.length) throw new ValidationError(errors, value);
      result = validated;
    });
    return result;
  }
  isValid(value, options) {
    return this.validate(value, options).then(() => true, err => {
      if (ValidationError.isError(err)) return false;
      throw err;
    });
  }
  isValidSync(value, options) {
    try {
      this.validateSync(value, options);
      return true;
    } catch (err) {
      if (ValidationError.isError(err)) return false;
      throw err;
    }
  }
  _getDefault() {
    let defaultValue = this.spec.default;
    if (defaultValue == null) {
      return defaultValue;
    }
    return typeof defaultValue === 'function' ? defaultValue.call(this) : clone(defaultValue);
  }
  getDefault(options
  // If schema is defaulted we know it's at least not undefined
  ) {
    let schema = this.resolve(options || {});
    return schema._getDefault();
  }
  default(def) {
    if (arguments.length === 0) {
      return this._getDefault();
    }
    let next = this.clone({
      default: def
    });
    return next;
  }
  strict(isStrict = true) {
    return this.clone({
      strict: isStrict
    });
  }
  nullability(nullable, message) {
    const next = this.clone({
      nullable
    });
    next.internalTests.nullable = createValidation({
      message,
      name: 'nullable',
      test(value) {
        return value === null ? this.schema.spec.nullable : true;
      }
    });
    return next;
  }
  optionality(optional, message) {
    const next = this.clone({
      optional
    });
    next.internalTests.optionality = createValidation({
      message,
      name: 'optionality',
      test(value) {
        return value === undefined ? this.schema.spec.optional : true;
      }
    });
    return next;
  }
  optional() {
    return this.optionality(true);
  }
  defined(message = mixed.defined) {
    return this.optionality(false, message);
  }
  nullable() {
    return this.nullability(true);
  }
  nonNullable(message = mixed.notNull) {
    return this.nullability(false, message);
  }
  required(message = mixed.required) {
    return this.clone().withMutation(next => next.nonNullable(message).defined(message));
  }
  notRequired() {
    return this.clone().withMutation(next => next.nullable().optional());
  }
  transform(fn) {
    let next = this.clone();
    next.transforms.push(fn);
    return next;
  }

  /**
   * Adds a test function to the schema's queue of tests.
   * tests can be exclusive or non-exclusive.
   *
   * - exclusive tests, will replace any existing tests of the same name.
   * - non-exclusive: can be stacked
   *
   * If a non-exclusive test is added to a schema with an exclusive test of the same name
   * the exclusive test is removed and further tests of the same name will be stacked.
   *
   * If an exclusive test is added to a schema with non-exclusive tests of the same name
   * the previous tests are removed and further tests of the same name will replace each other.
   */

  test(...args) {
    let opts;
    if (args.length === 1) {
      if (typeof args[0] === 'function') {
        opts = {
          test: args[0]
        };
      } else {
        opts = args[0];
      }
    } else if (args.length === 2) {
      opts = {
        name: args[0],
        test: args[1]
      };
    } else {
      opts = {
        name: args[0],
        message: args[1],
        test: args[2]
      };
    }
    if (opts.message === undefined) opts.message = mixed.default;
    if (typeof opts.test !== 'function') throw new TypeError('`test` is a required parameters');
    let next = this.clone();
    let validate = createValidation(opts);
    let isExclusive = opts.exclusive || opts.name && next.exclusiveTests[opts.name] === true;
    if (opts.exclusive) {
      if (!opts.name) throw new TypeError('Exclusive tests must provide a unique `name` identifying the test');
    }
    if (opts.name) next.exclusiveTests[opts.name] = !!opts.exclusive;
    next.tests = next.tests.filter(fn => {
      if (fn.OPTIONS.name === opts.name) {
        if (isExclusive) return false;
        if (fn.OPTIONS.test === validate.OPTIONS.test) return false;
      }
      return true;
    });
    next.tests.push(validate);
    return next;
  }
  when(keys, options) {
    if (!Array.isArray(keys) && typeof keys !== 'string') {
      options = keys;
      keys = '.';
    }
    let next = this.clone();
    let deps = toArray(keys).map(key => new Reference(key));
    deps.forEach(dep => {
      // @ts-ignore readonly array
      if (dep.isSibling) next.deps.push(dep.key);
    });
    next.conditions.push(typeof options === 'function' ? new Condition(deps, options) : Condition.fromOptions(deps, options));
    return next;
  }
  typeError(message) {
    let next = this.clone();
    next.internalTests.typeError = createValidation({
      message,
      name: 'typeError',
      test(value) {
        if (!isAbsent(value) && !this.schema._typeCheck(value)) return this.createError({
          params: {
            type: this.schema.type
          }
        });
        return true;
      }
    });
    return next;
  }
  oneOf(enums, message = mixed.oneOf) {
    let next = this.clone();
    enums.forEach(val => {
      next._whitelist.add(val);
      next._blacklist.delete(val);
    });
    next.internalTests.whiteList = createValidation({
      message,
      name: 'oneOf',
      skipAbsent: true,
      test(value) {
        let valids = this.schema._whitelist;
        let resolved = valids.resolveAll(this.resolve);
        return resolved.includes(value) ? true : this.createError({
          params: {
            values: Array.from(valids).join(', '),
            resolved
          }
        });
      }
    });
    return next;
  }
  notOneOf(enums, message = mixed.notOneOf) {
    let next = this.clone();
    enums.forEach(val => {
      next._blacklist.add(val);
      next._whitelist.delete(val);
    });
    next.internalTests.blacklist = createValidation({
      message,
      name: 'notOneOf',
      test(value) {
        let invalids = this.schema._blacklist;
        let resolved = invalids.resolveAll(this.resolve);
        if (resolved.includes(value)) return this.createError({
          params: {
            values: Array.from(invalids).join(', '),
            resolved
          }
        });
        return true;
      }
    });
    return next;
  }
  strip(strip = true) {
    let next = this.clone();
    next.spec.strip = strip;
    return next;
  }

  /**
   * Return a serialized description of the schema including validations, flags, types etc.
   *
   * @param options Provide any needed context for resolving runtime schema alterations (lazy, when conditions, etc).
   */
  describe(options) {
    const next = (options ? this.resolve(options) : this).clone();
    const {
      label,
      meta,
      optional,
      nullable
    } = next.spec;
    const description = {
      meta,
      label,
      optional,
      nullable,
      default: next.getDefault(options),
      type: next.type,
      oneOf: next._whitelist.describe(),
      notOneOf: next._blacklist.describe(),
      tests: next.tests.map(fn => ({
        name: fn.OPTIONS.name,
        params: fn.OPTIONS.params
      })).filter((n, idx, list) => list.findIndex(c => c.name === n.name) === idx)
    };
    return description;
  }
}
// @ts-expect-error
Schema.prototype.__isYupSchema__ = true;
for (const method of ['validate', 'validateSync']) Schema.prototype[`${method}At`] = function (path, value, options = {}) {
  const {
    parent,
    parentPath,
    schema
  } = getIn(this, path, value, options.context);
  return schema[method](parent && parent[parentPath], Object.assign({}, options, {
    parent,
    path
  }));
};
for (const alias of ['equals', 'is']) Schema.prototype[alias] = Schema.prototype.oneOf;
for (const alias of ['not', 'nope']) Schema.prototype[alias] = Schema.prototype.notOneOf;

const returnsTrue = () => true;
function create$8(spec) {
  return new MixedSchema(spec);
}
class MixedSchema extends Schema {
  constructor(spec) {
    super(typeof spec === 'function' ? {
      type: 'mixed',
      check: spec
    } : Object.assign({
      type: 'mixed',
      check: returnsTrue
    }, spec));
  }
}
create$8.prototype = MixedSchema.prototype;

function create$7() {
  return new BooleanSchema();
}
class BooleanSchema extends Schema {
  constructor() {
    super({
      type: 'boolean',
      check(v) {
        if (v instanceof Boolean) v = v.valueOf();
        return typeof v === 'boolean';
      }
    });
    this.withMutation(() => {
      this.transform((value, _raw, ctx) => {
        if (ctx.spec.coerce && !ctx.isType(value)) {
          if (/^(true|1)$/i.test(String(value))) return true;
          if (/^(false|0)$/i.test(String(value))) return false;
        }
        return value;
      });
    });
  }
  isTrue(message = boolean.isValue) {
    return this.test({
      message,
      name: 'is-value',
      exclusive: true,
      params: {
        value: 'true'
      },
      test(value) {
        return isAbsent(value) || value === true;
      }
    });
  }
  isFalse(message = boolean.isValue) {
    return this.test({
      message,
      name: 'is-value',
      exclusive: true,
      params: {
        value: 'false'
      },
      test(value) {
        return isAbsent(value) || value === false;
      }
    });
  }
  default(def) {
    return super.default(def);
  }
  defined(msg) {
    return super.defined(msg);
  }
  optional() {
    return super.optional();
  }
  required(msg) {
    return super.required(msg);
  }
  notRequired() {
    return super.notRequired();
  }
  nullable() {
    return super.nullable();
  }
  nonNullable(msg) {
    return super.nonNullable(msg);
  }
  strip(v) {
    return super.strip(v);
  }
}
create$7.prototype = BooleanSchema.prototype;

// Taken from HTML spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
let rEmail =
// eslint-disable-next-line
/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
let rUrl =
// eslint-disable-next-line
/^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

// eslint-disable-next-line
let rUUID = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
let isTrimmed = value => isAbsent(value) || value === value.trim();
let objStringTag = {}.toString();
function create$6() {
  return new StringSchema();
}
class StringSchema extends Schema {
  constructor() {
    super({
      type: 'string',
      check(value) {
        if (value instanceof String) value = value.valueOf();
        return typeof value === 'string';
      }
    });
    this.withMutation(() => {
      this.transform((value, _raw, ctx) => {
        if (!ctx.spec.coerce || ctx.isType(value)) return value;

        // don't ever convert arrays
        if (Array.isArray(value)) return value;
        const strValue = value != null && value.toString ? value.toString() : value;

        // no one wants plain objects converted to [Object object]
        if (strValue === objStringTag) return value;
        return strValue;
      });
    });
  }
  required(message) {
    return super.required(message).withMutation(schema => schema.test({
      message: message || mixed.required,
      name: 'required',
      skipAbsent: true,
      test: value => !!value.length
    }));
  }
  notRequired() {
    return super.notRequired().withMutation(schema => {
      schema.tests = schema.tests.filter(t => t.OPTIONS.name !== 'required');
      return schema;
    });
  }
  length(length, message = string.length) {
    return this.test({
      message,
      name: 'length',
      exclusive: true,
      params: {
        length
      },
      skipAbsent: true,
      test(value) {
        return value.length === this.resolve(length);
      }
    });
  }
  min(min, message = string.min) {
    return this.test({
      message,
      name: 'min',
      exclusive: true,
      params: {
        min
      },
      skipAbsent: true,
      test(value) {
        return value.length >= this.resolve(min);
      }
    });
  }
  max(max, message = string.max) {
    return this.test({
      name: 'max',
      exclusive: true,
      message,
      params: {
        max
      },
      skipAbsent: true,
      test(value) {
        return value.length <= this.resolve(max);
      }
    });
  }
  matches(regex, options) {
    let excludeEmptyString = false;
    let message;
    let name;
    if (options) {
      if (typeof options === 'object') {
        ({
          excludeEmptyString = false,
          message,
          name
        } = options);
      } else {
        message = options;
      }
    }
    return this.test({
      name: name || 'matches',
      message: message || string.matches,
      params: {
        regex
      },
      skipAbsent: true,
      test: value => value === '' && excludeEmptyString || value.search(regex) !== -1
    });
  }
  email(message = string.email) {
    return this.matches(rEmail, {
      name: 'email',
      message,
      excludeEmptyString: true
    });
  }
  url(message = string.url) {
    return this.matches(rUrl, {
      name: 'url',
      message,
      excludeEmptyString: true
    });
  }
  uuid(message = string.uuid) {
    return this.matches(rUUID, {
      name: 'uuid',
      message,
      excludeEmptyString: false
    });
  }

  //-- transforms --
  ensure() {
    return this.default('').transform(val => val === null ? '' : val);
  }
  trim(message = string.trim) {
    return this.transform(val => val != null ? val.trim() : val).test({
      message,
      name: 'trim',
      test: isTrimmed
    });
  }
  lowercase(message = string.lowercase) {
    return this.transform(value => !isAbsent(value) ? value.toLowerCase() : value).test({
      message,
      name: 'string_case',
      exclusive: true,
      skipAbsent: true,
      test: value => isAbsent(value) || value === value.toLowerCase()
    });
  }
  uppercase(message = string.uppercase) {
    return this.transform(value => !isAbsent(value) ? value.toUpperCase() : value).test({
      message,
      name: 'string_case',
      exclusive: true,
      skipAbsent: true,
      test: value => isAbsent(value) || value === value.toUpperCase()
    });
  }
}
create$6.prototype = StringSchema.prototype;

//
// String Interfaces
//

let isNaN$1 = value => value != +value;
function create$5() {
  return new NumberSchema();
}
class NumberSchema extends Schema {
  constructor() {
    super({
      type: 'number',
      check(value) {
        if (value instanceof Number) value = value.valueOf();
        return typeof value === 'number' && !isNaN$1(value);
      }
    });
    this.withMutation(() => {
      this.transform((value, _raw, ctx) => {
        if (!ctx.spec.coerce) return value;
        let parsed = value;
        if (typeof parsed === 'string') {
          parsed = parsed.replace(/\s/g, '');
          if (parsed === '') return NaN;
          // don't use parseFloat to avoid positives on alpha-numeric strings
          parsed = +parsed;
        }
        if (ctx.isType(parsed)) return parsed;
        return parseFloat(parsed);
      });
    });
  }
  min(min, message = number.min) {
    return this.test({
      message,
      name: 'min',
      exclusive: true,
      params: {
        min
      },
      skipAbsent: true,
      test(value) {
        return value >= this.resolve(min);
      }
    });
  }
  max(max, message = number.max) {
    return this.test({
      message,
      name: 'max',
      exclusive: true,
      params: {
        max
      },
      skipAbsent: true,
      test(value) {
        return value <= this.resolve(max);
      }
    });
  }
  lessThan(less, message = number.lessThan) {
    return this.test({
      message,
      name: 'max',
      exclusive: true,
      params: {
        less
      },
      skipAbsent: true,
      test(value) {
        return value < this.resolve(less);
      }
    });
  }
  moreThan(more, message = number.moreThan) {
    return this.test({
      message,
      name: 'min',
      exclusive: true,
      params: {
        more
      },
      skipAbsent: true,
      test(value) {
        return value > this.resolve(more);
      }
    });
  }
  positive(msg = number.positive) {
    return this.moreThan(0, msg);
  }
  negative(msg = number.negative) {
    return this.lessThan(0, msg);
  }
  integer(message = number.integer) {
    return this.test({
      name: 'integer',
      message,
      skipAbsent: true,
      test: val => Number.isInteger(val)
    });
  }
  truncate() {
    return this.transform(value => !isAbsent(value) ? value | 0 : value);
  }
  round(method) {
    var _method;
    let avail = ['ceil', 'floor', 'round', 'trunc'];
    method = ((_method = method) == null ? void 0 : _method.toLowerCase()) || 'round';

    // this exists for symemtry with the new Math.trunc
    if (method === 'trunc') return this.truncate();
    if (avail.indexOf(method.toLowerCase()) === -1) throw new TypeError('Only valid options for round() are: ' + avail.join(', '));
    return this.transform(value => !isAbsent(value) ? Math[method](value) : value);
  }
}
create$5.prototype = NumberSchema.prototype;

//
// Number Interfaces
//

/* eslint-disable */
/**
 *
 * Date.parse with progressive enhancement for ISO 8601 <https://github.com/csnover/js-iso8601>
 * NON-CONFORMANT EDITION.
 * © 2011 Colin Snover <http://zetafleet.com>
 * Released under MIT license.
 */

//              1 YYYY                 2 MM        3 DD              4 HH     5 mm        6 ss            7 msec         8 Z 9 ±    10 tzHH    11 tzmm
var isoReg = /^(\d{4}|[+\-]\d{6})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:[ T]?(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;
function parseIsoDate(date) {
  var numericKeys = [1, 4, 5, 6, 7, 10, 11],
    minutesOffset = 0,
    timestamp,
    struct;
  if (struct = isoReg.exec(date)) {
    // avoid NaN timestamps caused by “undefined” values being passed to Date.UTC
    for (var i = 0, k; k = numericKeys[i]; ++i) struct[k] = +struct[k] || 0;

    // allow undefined days and months
    struct[2] = (+struct[2] || 1) - 1;
    struct[3] = +struct[3] || 1;

    // allow arbitrary sub-second precision beyond milliseconds
    struct[7] = struct[7] ? String(struct[7]).substr(0, 3) : 0;

    // timestamps without timezone identifiers should be considered local time
    if ((struct[8] === undefined || struct[8] === '') && (struct[9] === undefined || struct[9] === '')) timestamp = +new Date(struct[1], struct[2], struct[3], struct[4], struct[5], struct[6], struct[7]);else {
      if (struct[8] !== 'Z' && struct[9] !== undefined) {
        minutesOffset = struct[10] * 60 + struct[11];
        if (struct[9] === '+') minutesOffset = 0 - minutesOffset;
      }
      timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
    }
  } else timestamp = Date.parse ? Date.parse(date) : NaN;
  return timestamp;
}

// @ts-ignore
let invalidDate = new Date('');
let isDate = obj => Object.prototype.toString.call(obj) === '[object Date]';
function create$4() {
  return new DateSchema();
}
class DateSchema extends Schema {
  constructor() {
    super({
      type: 'date',
      check(v) {
        return isDate(v) && !isNaN(v.getTime());
      }
    });
    this.withMutation(() => {
      this.transform((value, _raw, ctx) => {
        if (!ctx.spec.coerce || ctx.isType(value)) return value;
        value = parseIsoDate(value);

        // 0 is a valid timestamp equivalent to 1970-01-01T00:00:00Z(unix epoch) or before.
        return !isNaN(value) ? new Date(value) : DateSchema.INVALID_DATE;
      });
    });
  }
  prepareParam(ref, name) {
    let param;
    if (!Reference.isRef(ref)) {
      let cast = this.cast(ref);
      if (!this._typeCheck(cast)) throw new TypeError(`\`${name}\` must be a Date or a value that can be \`cast()\` to a Date`);
      param = cast;
    } else {
      param = ref;
    }
    return param;
  }
  min(min, message = date.min) {
    let limit = this.prepareParam(min, 'min');
    return this.test({
      message,
      name: 'min',
      exclusive: true,
      params: {
        min
      },
      skipAbsent: true,
      test(value) {
        return value >= this.resolve(limit);
      }
    });
  }
  max(max, message = date.max) {
    let limit = this.prepareParam(max, 'max');
    return this.test({
      message,
      name: 'max',
      exclusive: true,
      params: {
        max
      },
      skipAbsent: true,
      test(value) {
        return value <= this.resolve(limit);
      }
    });
  }
}
DateSchema.INVALID_DATE = invalidDate;
create$4.prototype = DateSchema.prototype;
create$4.INVALID_DATE = invalidDate;

// @ts-expect-error
function sortFields(fields, excludedEdges = []) {
  let edges = [];
  let nodes = new Set();
  let excludes = new Set(excludedEdges.map(([a, b]) => `${a}-${b}`));
  function addNode(depPath, key) {
    let node = (0,property_expr__WEBPACK_IMPORTED_MODULE_0__.split)(depPath)[0];
    nodes.add(node);
    if (!excludes.has(`${key}-${node}`)) edges.push([key, node]);
  }
  for (const key of Object.keys(fields)) {
    let value = fields[key];
    nodes.add(key);
    if (Reference.isRef(value) && value.isSibling) addNode(value.path, key);else if (isSchema(value) && 'deps' in value) value.deps.forEach(path => addNode(path, key));
  }
  return toposort__WEBPACK_IMPORTED_MODULE_2___default().array(Array.from(nodes), edges).reverse();
}

function findIndex(arr, err) {
  let idx = Infinity;
  arr.some((key, ii) => {
    var _err$path;
    if ((_err$path = err.path) != null && _err$path.includes(key)) {
      idx = ii;
      return true;
    }
  });
  return idx;
}
function sortByKeyOrder(keys) {
  return (a, b) => {
    return findIndex(keys, a) - findIndex(keys, b);
  };
}

const parseJson = (value, _, ctx) => {
  if (typeof value !== 'string') {
    return value;
  }
  let parsed = value;
  try {
    parsed = JSON.parse(value);
  } catch (err) {
    /* */
  }
  return ctx.isType(parsed) ? parsed : value;
};

// @ts-ignore
function deepPartial(schema) {
  if ('fields' in schema) {
    const partial = {};
    for (const [key, fieldSchema] of Object.entries(schema.fields)) {
      partial[key] = deepPartial(fieldSchema);
    }
    return schema.setFields(partial);
  }
  if (schema.type === 'array') {
    const nextArray = schema.optional();
    if (nextArray.innerType) nextArray.innerType = deepPartial(nextArray.innerType);
    return nextArray;
  }
  if (schema.type === 'tuple') {
    return schema.optional().clone({
      types: schema.spec.types.map(deepPartial)
    });
  }
  if ('optional' in schema) {
    return schema.optional();
  }
  return schema;
}
const deepHas = (obj, p) => {
  const path = [...(0,property_expr__WEBPACK_IMPORTED_MODULE_0__.normalizePath)(p)];
  if (path.length === 1) return path[0] in obj;
  let last = path.pop();
  let parent = (0,property_expr__WEBPACK_IMPORTED_MODULE_0__.getter)((0,property_expr__WEBPACK_IMPORTED_MODULE_0__.join)(path), true)(obj);
  return !!(parent && last in parent);
};
let isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';
function unknown(ctx, value) {
  let known = Object.keys(ctx.fields);
  return Object.keys(value).filter(key => known.indexOf(key) === -1);
}
const defaultSort = sortByKeyOrder([]);
function create$3(spec) {
  return new ObjectSchema(spec);
}
class ObjectSchema extends Schema {
  constructor(spec) {
    super({
      type: 'object',
      check(value) {
        return isObject(value) || typeof value === 'function';
      }
    });
    this.fields = Object.create(null);
    this._sortErrors = defaultSort;
    this._nodes = [];
    this._excludedEdges = [];
    this.withMutation(() => {
      if (spec) {
        this.shape(spec);
      }
    });
  }
  _cast(_value, options = {}) {
    var _options$stripUnknown;
    let value = super._cast(_value, options);

    //should ignore nulls here
    if (value === undefined) return this.getDefault();
    if (!this._typeCheck(value)) return value;
    let fields = this.fields;
    let strip = (_options$stripUnknown = options.stripUnknown) != null ? _options$stripUnknown : this.spec.noUnknown;
    let props = [].concat(this._nodes, Object.keys(value).filter(v => !this._nodes.includes(v)));
    let intermediateValue = {}; // is filled during the transform below
    let innerOptions = Object.assign({}, options, {
      parent: intermediateValue,
      __validating: options.__validating || false
    });
    let isChanged = false;
    for (const prop of props) {
      let field = fields[prop];
      let exists = (prop in value);
      if (field) {
        let fieldValue;
        let inputValue = value[prop];

        // safe to mutate since this is fired in sequence
        innerOptions.path = (options.path ? `${options.path}.` : '') + prop;
        field = field.resolve({
          value: inputValue,
          context: options.context,
          parent: intermediateValue
        });
        let fieldSpec = field instanceof Schema ? field.spec : undefined;
        let strict = fieldSpec == null ? void 0 : fieldSpec.strict;
        if (fieldSpec != null && fieldSpec.strip) {
          isChanged = isChanged || prop in value;
          continue;
        }
        fieldValue = !options.__validating || !strict ?
        // TODO: use _cast, this is double resolving
        field.cast(value[prop], innerOptions) : value[prop];
        if (fieldValue !== undefined) {
          intermediateValue[prop] = fieldValue;
        }
      } else if (exists && !strip) {
        intermediateValue[prop] = value[prop];
      }
      if (exists !== prop in intermediateValue || intermediateValue[prop] !== value[prop]) {
        isChanged = true;
      }
    }
    return isChanged ? intermediateValue : value;
  }
  _validate(_value, options = {}, panic, next) {
    let {
      from = [],
      originalValue = _value,
      recursive = this.spec.recursive
    } = options;
    options.from = [{
      schema: this,
      value: originalValue
    }, ...from];
    // this flag is needed for handling `strict` correctly in the context of
    // validation vs just casting. e.g strict() on a field is only used when validating
    options.__validating = true;
    options.originalValue = originalValue;
    super._validate(_value, options, panic, (objectErrors, value) => {
      if (!recursive || !isObject(value)) {
        next(objectErrors, value);
        return;
      }
      originalValue = originalValue || value;
      let tests = [];
      for (let key of this._nodes) {
        let field = this.fields[key];
        if (!field || Reference.isRef(field)) {
          continue;
        }
        tests.push(field.asNestedTest({
          options,
          key,
          parent: value,
          parentPath: options.path,
          originalParent: originalValue
        }));
      }
      this.runTests({
        tests,
        value,
        originalValue,
        options
      }, panic, fieldErrors => {
        next(fieldErrors.sort(this._sortErrors).concat(objectErrors), value);
      });
    });
  }
  clone(spec) {
    const next = super.clone(spec);
    next.fields = Object.assign({}, this.fields);
    next._nodes = this._nodes;
    next._excludedEdges = this._excludedEdges;
    next._sortErrors = this._sortErrors;
    return next;
  }
  concat(schema) {
    let next = super.concat(schema);
    let nextFields = next.fields;
    for (let [field, schemaOrRef] of Object.entries(this.fields)) {
      const target = nextFields[field];
      nextFields[field] = target === undefined ? schemaOrRef : target;
    }
    return next.withMutation(s => s.setFields(nextFields, this._excludedEdges));
  }
  _getDefault() {
    if ('default' in this.spec) {
      return super._getDefault();
    }

    // if there is no default set invent one
    if (!this._nodes.length) {
      return undefined;
    }
    let dft = {};
    this._nodes.forEach(key => {
      const field = this.fields[key];
      dft[key] = field && 'getDefault' in field ? field.getDefault() : undefined;
    });
    return dft;
  }
  setFields(shape, excludedEdges) {
    let next = this.clone();
    next.fields = shape;
    next._nodes = sortFields(shape, excludedEdges);
    next._sortErrors = sortByKeyOrder(Object.keys(shape));
    // XXX: this carries over edges which may not be what you want
    if (excludedEdges) next._excludedEdges = excludedEdges;
    return next;
  }
  shape(additions, excludes = []) {
    return this.clone().withMutation(next => {
      let edges = next._excludedEdges;
      if (excludes.length) {
        if (!Array.isArray(excludes[0])) excludes = [excludes];
        edges = [...next._excludedEdges, ...excludes];
      }

      // XXX: excludes here is wrong
      return next.setFields(Object.assign(next.fields, additions), edges);
    });
  }
  partial() {
    const partial = {};
    for (const [key, schema] of Object.entries(this.fields)) {
      partial[key] = 'optional' in schema && schema.optional instanceof Function ? schema.optional() : schema;
    }
    return this.setFields(partial);
  }
  deepPartial() {
    const next = deepPartial(this);
    return next;
  }
  pick(keys) {
    const picked = {};
    for (const key of keys) {
      if (this.fields[key]) picked[key] = this.fields[key];
    }
    return this.setFields(picked);
  }
  omit(keys) {
    const fields = Object.assign({}, this.fields);
    for (const key of keys) {
      delete fields[key];
    }
    return this.setFields(fields);
  }
  from(from, to, alias) {
    let fromGetter = (0,property_expr__WEBPACK_IMPORTED_MODULE_0__.getter)(from, true);
    return this.transform(obj => {
      if (!obj) return obj;
      let newObj = obj;
      if (deepHas(obj, from)) {
        newObj = Object.assign({}, obj);
        if (!alias) delete newObj[from];
        newObj[to] = fromGetter(obj);
      }
      return newObj;
    });
  }

  /** Parse an input JSON string to an object */
  json() {
    return this.transform(parseJson);
  }
  noUnknown(noAllow = true, message = object.noUnknown) {
    if (typeof noAllow !== 'boolean') {
      message = noAllow;
      noAllow = true;
    }
    let next = this.test({
      name: 'noUnknown',
      exclusive: true,
      message: message,
      test(value) {
        if (value == null) return true;
        const unknownKeys = unknown(this.schema, value);
        return !noAllow || unknownKeys.length === 0 || this.createError({
          params: {
            unknown: unknownKeys.join(', ')
          }
        });
      }
    });
    next.spec.noUnknown = noAllow;
    return next;
  }
  unknown(allow = true, message = object.noUnknown) {
    return this.noUnknown(!allow, message);
  }
  transformKeys(fn) {
    return this.transform(obj => {
      if (!obj) return obj;
      const result = {};
      for (const key of Object.keys(obj)) result[fn(key)] = obj[key];
      return result;
    });
  }
  camelCase() {
    return this.transformKeys(tiny_case__WEBPACK_IMPORTED_MODULE_1__.camelCase);
  }
  snakeCase() {
    return this.transformKeys(tiny_case__WEBPACK_IMPORTED_MODULE_1__.snakeCase);
  }
  constantCase() {
    return this.transformKeys(key => (0,tiny_case__WEBPACK_IMPORTED_MODULE_1__.snakeCase)(key).toUpperCase());
  }
  describe(options) {
    let base = super.describe(options);
    base.fields = {};
    for (const [key, value] of Object.entries(this.fields)) {
      var _innerOptions;
      let innerOptions = options;
      if ((_innerOptions = innerOptions) != null && _innerOptions.value) {
        innerOptions = Object.assign({}, innerOptions, {
          parent: innerOptions.value,
          value: innerOptions.value[key]
        });
      }
      base.fields[key] = value.describe(innerOptions);
    }
    return base;
  }
}
create$3.prototype = ObjectSchema.prototype;

function create$2(type) {
  return new ArraySchema(type);
}
class ArraySchema extends Schema {
  constructor(type) {
    super({
      type: 'array',
      check(v) {
        return Array.isArray(v);
      }
    });

    // `undefined` specifically means uninitialized, as opposed to "no subtype"
    this.innerType = void 0;
    this.innerType = type;
  }
  _cast(_value, _opts) {
    const value = super._cast(_value, _opts);

    // should ignore nulls here
    if (!this._typeCheck(value) || !this.innerType) {
      return value;
    }
    let isChanged = false;
    const castArray = value.map((v, idx) => {
      const castElement = this.innerType.cast(v, Object.assign({}, _opts, {
        path: `${_opts.path || ''}[${idx}]`
      }));
      if (castElement !== v) {
        isChanged = true;
      }
      return castElement;
    });
    return isChanged ? castArray : value;
  }
  _validate(_value, options = {}, panic, next) {
    var _options$recursive;
    // let sync = options.sync;
    // let path = options.path;
    let innerType = this.innerType;
    // let endEarly = options.abortEarly ?? this.spec.abortEarly;
    let recursive = (_options$recursive = options.recursive) != null ? _options$recursive : this.spec.recursive;
    options.originalValue != null ? options.originalValue : _value;
    super._validate(_value, options, panic, (arrayErrors, value) => {
      var _options$originalValu2;
      if (!recursive || !innerType || !this._typeCheck(value)) {
        next(arrayErrors, value);
        return;
      }

      // #950 Ensure that sparse array empty slots are validated
      let tests = new Array(value.length);
      for (let index = 0; index < value.length; index++) {
        var _options$originalValu;
        tests[index] = innerType.asNestedTest({
          options,
          index,
          parent: value,
          parentPath: options.path,
          originalParent: (_options$originalValu = options.originalValue) != null ? _options$originalValu : _value
        });
      }
      this.runTests({
        value,
        tests,
        originalValue: (_options$originalValu2 = options.originalValue) != null ? _options$originalValu2 : _value,
        options
      }, panic, innerTypeErrors => next(innerTypeErrors.concat(arrayErrors), value));
    });
  }
  clone(spec) {
    const next = super.clone(spec);
    // @ts-expect-error readonly
    next.innerType = this.innerType;
    return next;
  }

  /** Parse an input JSON string to an object */
  json() {
    return this.transform(parseJson);
  }
  concat(schema) {
    let next = super.concat(schema);

    // @ts-expect-error readonly
    next.innerType = this.innerType;
    if (schema.innerType)
      // @ts-expect-error readonly
      next.innerType = next.innerType ?
      // @ts-expect-error Lazy doesn't have concat and will break
      next.innerType.concat(schema.innerType) : schema.innerType;
    return next;
  }
  of(schema) {
    // FIXME: this should return a new instance of array without the default to be
    let next = this.clone();
    if (!isSchema(schema)) throw new TypeError('`array.of()` sub-schema must be a valid yup schema not: ' + printValue(schema));

    // @ts-expect-error readonly
    next.innerType = schema;
    return next;
  }
  length(length, message = array.length) {
    return this.test({
      message,
      name: 'length',
      exclusive: true,
      params: {
        length
      },
      skipAbsent: true,
      test(value) {
        return value.length === this.resolve(length);
      }
    });
  }
  min(min, message) {
    message = message || array.min;
    return this.test({
      message,
      name: 'min',
      exclusive: true,
      params: {
        min
      },
      skipAbsent: true,
      // FIXME(ts): Array<typeof T>
      test(value) {
        return value.length >= this.resolve(min);
      }
    });
  }
  max(max, message) {
    message = message || array.max;
    return this.test({
      message,
      name: 'max',
      exclusive: true,
      params: {
        max
      },
      skipAbsent: true,
      test(value) {
        return value.length <= this.resolve(max);
      }
    });
  }
  ensure() {
    return this.default(() => []).transform((val, original) => {
      // We don't want to return `null` for nullable schema
      if (this._typeCheck(val)) return val;
      return original == null ? [] : [].concat(original);
    });
  }
  compact(rejector) {
    let reject = !rejector ? v => !!v : (v, i, a) => !rejector(v, i, a);
    return this.transform(values => values != null ? values.filter(reject) : values);
  }
  describe(options) {
    let base = super.describe();
    if (this.innerType) {
      var _innerOptions;
      let innerOptions = options;
      if ((_innerOptions = innerOptions) != null && _innerOptions.value) {
        innerOptions = Object.assign({}, innerOptions, {
          parent: innerOptions.value,
          value: innerOptions.value[0]
        });
      }
      base.innerType = this.innerType.describe(options);
    }
    return base;
  }
}
create$2.prototype = ArraySchema.prototype;

// @ts-ignore
function create$1(schemas) {
  return new TupleSchema(schemas);
}
class TupleSchema extends Schema {
  constructor(schemas) {
    super({
      type: 'tuple',
      spec: {
        types: schemas
      },
      check(v) {
        const types = this.spec.types;
        return Array.isArray(v) && v.length === types.length;
      }
    });
    this.withMutation(() => {
      this.typeError(tuple.notType);
    });
  }
  _cast(inputValue, options) {
    const {
      types
    } = this.spec;
    const value = super._cast(inputValue, options);
    if (!this._typeCheck(value)) {
      return value;
    }
    let isChanged = false;
    const castArray = types.map((type, idx) => {
      const castElement = type.cast(value[idx], Object.assign({}, options, {
        path: `${options.path || ''}[${idx}]`
      }));
      if (castElement !== value[idx]) isChanged = true;
      return castElement;
    });
    return isChanged ? castArray : value;
  }
  _validate(_value, options = {}, panic, next) {
    let itemTypes = this.spec.types;
    super._validate(_value, options, panic, (tupleErrors, value) => {
      var _options$originalValu2;
      // intentionally not respecting recursive
      if (!this._typeCheck(value)) {
        next(tupleErrors, value);
        return;
      }
      let tests = [];
      for (let [index, itemSchema] of itemTypes.entries()) {
        var _options$originalValu;
        tests[index] = itemSchema.asNestedTest({
          options,
          index,
          parent: value,
          parentPath: options.path,
          originalParent: (_options$originalValu = options.originalValue) != null ? _options$originalValu : _value
        });
      }
      this.runTests({
        value,
        tests,
        originalValue: (_options$originalValu2 = options.originalValue) != null ? _options$originalValu2 : _value,
        options
      }, panic, innerTypeErrors => next(innerTypeErrors.concat(tupleErrors), value));
    });
  }
}
create$1.prototype = TupleSchema.prototype;

function create(builder) {
  return new Lazy(builder);
}
class Lazy {
  constructor(builder) {
    this.type = 'lazy';
    this.__isYupSchema__ = true;
    this.spec = void 0;
    this._resolve = (value, options = {}) => {
      let schema = this.builder(value, options);
      if (!isSchema(schema)) throw new TypeError('lazy() functions must return a valid schema');
      if (this.spec.optional) schema = schema.optional();
      return schema.resolve(options);
    };
    this.builder = builder;
    this.spec = {
      meta: undefined,
      optional: false
    };
  }
  clone(spec) {
    const next = new Lazy(this.builder);
    next.spec = Object.assign({}, this.spec, spec);
    return next;
  }
  optionality(optional) {
    const next = this.clone({
      optional
    });
    return next;
  }
  optional() {
    return this.optionality(true);
  }
  resolve(options) {
    return this._resolve(options.value, options);
  }
  cast(value, options) {
    return this._resolve(value, options).cast(value, options);
  }
  asNestedTest(config) {
    let {
      key,
      index,
      parent,
      options
    } = config;
    let value = parent[index != null ? index : key];
    return this._resolve(value, Object.assign({}, options, {
      value,
      parent
    })).asNestedTest(config);
  }
  validate(value, options) {
    return this._resolve(value, options).validate(value, options);
  }
  validateSync(value, options) {
    return this._resolve(value, options).validateSync(value, options);
  }
  validateAt(path, value, options) {
    return this._resolve(value, options).validateAt(path, value, options);
  }
  validateSyncAt(path, value, options) {
    return this._resolve(value, options).validateSyncAt(path, value, options);
  }
  isValid(value, options) {
    return this._resolve(value, options).isValid(value, options);
  }
  isValidSync(value, options) {
    return this._resolve(value, options).isValidSync(value, options);
  }
  describe(options) {
    return options ? this.resolve(options).describe(options) : {
      type: 'lazy',
      meta: this.spec.meta,
      label: undefined
    };
  }
  meta(...args) {
    if (args.length === 0) return this.spec.meta;
    let next = this.clone();
    next.spec.meta = Object.assign(next.spec.meta || {}, args[0]);
    return next;
  }
}

function setLocale(custom) {
  Object.keys(custom).forEach(type => {
    // @ts-ignore
    Object.keys(custom[type]).forEach(method => {
      // @ts-ignore
      locale[type][method] = custom[type][method];
    });
  });
}

function addMethod(schemaType, name, fn) {
  if (!schemaType || !isSchema(schemaType.prototype)) throw new TypeError('You must provide a yup schema constructor function');
  if (typeof name !== 'string') throw new TypeError('A Method name must be provided');
  if (typeof fn !== 'function') throw new TypeError('Method function must be provided');
  schemaType.prototype[name] = fn;
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ1k7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxJQUFJO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsV0FBVztBQUMzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0pBLDhyREFBOHJELEVBQUUsMEtBQTBLLEVBQUU7O0FBRTUyRDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLElBQUk7QUFDYjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9DQUFvQyxTQUFTO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9DQUFvQyxTQUFTO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNqR2E7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsb0NBQW9DO0FBQ25EO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLDBDQUEwQyw0QkFBNEI7QUFDdEUsQ0FBQztBQUNEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQixrQkFBa0IsZ0JBQWdCLG1CQUFPLENBQUMsMkNBQWM7Ozs7Ozs7Ozs7OztBQzFCM0M7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQkFBbUI7QUFDbkIsOEJBQThCLG1CQUFPLENBQUMsZ0RBQUs7QUFDM0MsbUJBQW1CO0FBQ25CO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDVFk7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsb0NBQW9DO0FBQ25EO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsYUFBYSxtQkFBTyxDQUFDLG9DQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCK0M7QUFDM0I7QUFDakI7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsSUFBSTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixhQUFhO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMLCtDQUErQyxvQkFBb0I7QUFDbkU7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyxNQUFNO0FBQ3BCLGVBQWUsTUFBTTtBQUNyQixjQUFjLE1BQU07QUFDcEIsY0FBYyxNQUFNO0FBQ3BCLFlBQVksTUFBTSx1Q0FBdUMsT0FBTztBQUNoRSxlQUFlLE1BQU0sMkNBQTJDLE9BQU87QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxrR0FBa0csZ0NBQWdDO0FBQ2xJLGlDQUFpQyxNQUFNLGNBQWMsS0FBSywyQ0FBMkMsd0JBQXdCLG1CQUFtQixNQUFNLGtFQUFrRSx3QkFBd0I7QUFDaFA7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNLGtCQUFrQixRQUFRO0FBQzdDLFVBQVUsTUFBTSxtQkFBbUIsS0FBSztBQUN4QyxVQUFVLE1BQU0sa0JBQWtCLEtBQUs7QUFDdkMsY0FBYyxNQUFNLDZCQUE2QixNQUFNO0FBQ3ZELFlBQVksTUFBTTtBQUNsQixVQUFVLE1BQU07QUFDaEIsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsTUFBTTtBQUNqQixnQkFBZ0IsTUFBTTtBQUN0QixnQkFBZ0IsTUFBTTtBQUN0QjtBQUNBO0FBQ0EsVUFBVSxNQUFNLG1DQUFtQyxJQUFJO0FBQ3ZELFVBQVUsTUFBTSxnQ0FBZ0MsSUFBSTtBQUNwRCxlQUFlLE1BQU0sb0JBQW9CLEtBQUs7QUFDOUMsZUFBZSxNQUFNLHVCQUF1QixLQUFLO0FBQ2pELGVBQWUsTUFBTTtBQUNyQixlQUFlLE1BQU07QUFDckIsY0FBYyxNQUFNO0FBQ3BCO0FBQ0E7QUFDQSxVQUFVLE1BQU0sMkJBQTJCLElBQUk7QUFDL0MsVUFBVSxNQUFNLGdDQUFnQyxJQUFJO0FBQ3BEO0FBQ0E7QUFDQSxjQUFjLE1BQU0sZ0JBQWdCLE1BQU07QUFDMUM7QUFDQTtBQUNBLGdCQUFnQixNQUFNLDhCQUE4QixRQUFRO0FBQzVEO0FBQ0E7QUFDQSxVQUFVLE1BQU0sMkJBQTJCLEtBQUs7QUFDaEQsVUFBVSxNQUFNLHdDQUF3QyxLQUFLO0FBQzdELGFBQWEsTUFBTSxZQUFZLFFBQVE7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLDRDQUE0QyxNQUFNLHNEQUFzRCxTQUFTLFVBQVUsY0FBYyxlQUFlLHdCQUF3QjtBQUNoTCw0Q0FBNEMsTUFBTSx1REFBdUQsU0FBUyxVQUFVLGNBQWMsZUFBZSx3QkFBd0I7QUFDakw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixxREFBTTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsR0FBRztBQUNoQixhQUFhLFFBQVE7QUFDckIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVFQUF1RSwrQ0FBK0M7QUFDdEg7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxTQUFTO0FBQzlEO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLHNEQUFPO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxzSEFBc0gsY0FBYyxzREFBc0QsY0FBYztBQUN4TTtBQUNBLDRFQUE0RSxNQUFNLGlCQUFpQixLQUFLO0FBQ3hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJHQUEyRyxLQUFLLHFCQUFxQixlQUFlLG9CQUFvQixZQUFZO0FBQ3BMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixtQ0FBbUMsSUFBSTtBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDLDBDQUEwQzs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0lBQXdJLFdBQVcsTUFBTSxZQUFZO0FBQ3JLO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQSw2Q0FBNkM7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMseUJBQXlCLHFFQUFxRSxvQkFBb0IsK0JBQStCLGdCQUFnQiwrREFBK0QsZ0JBQWdCO0FBQzFSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLGlCQUFpQixHQUFHLGdCQUFnQixFQUFFLEdBQUcsc0JBQXNCLFdBQVc7QUFDdEgsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsd0VBQXdFO0FBQ3hFLEtBQUs7QUFDTDtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0EsS0FBSztBQUNMO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUVBQXVFLE9BQU8sMENBQTBDO0FBQ3hIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLHNFQUFzRTtBQUN0RTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixFQUFFLGdDQUFnQyxLQUFLLDZDQUE2QyxLQUFLO0FBQ3RIO0FBQ0E7QUFDQSxpR0FBaUcsRUFBRSxrQkFBa0Isa3JCQUFrckIsRUFBRSxrQkFBa0Isb0ZBQW9GLEVBQUUsa0JBQWtCLDJGQUEyRixFQUFFLGtCQUFrQiw4R0FBOEcsRUFBRSxrQkFBa0I7O0FBRXBwQztBQUNBLDBCQUEwQixFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxHQUFHO0FBQ3hGO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNB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O0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEMsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0MsYUFBYTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNu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Q2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AdXBzaG90L3NoYXJlZC8uLi8uLi9ub2RlX21vZHVsZXMvcHJvcGVydHktZXhwci9pbmRleC5qcyIsIndlYnBhY2s6Ly9AdXBzaG90L3NoYXJlZC8uLi8uLi9ub2RlX21vZHVsZXMvdGlueS1jYXNlL2luZGV4LmpzIiwid2VicGFjazovL0B1cHNob3Qvc2hhcmVkLy4uLy4uL25vZGVfbW9kdWxlcy90b3Bvc29ydC9pbmRleC5qcyIsIndlYnBhY2s6Ly9AdXBzaG90L3NoYXJlZC8uL2luZGV4LnRzIiwid2VicGFjazovL0B1cHNob3Qvc2hhcmVkLy4vdmFsaWRhdGlvbi9mb3JtLnRzIiwid2VicGFjazovL0B1cHNob3Qvc2hhcmVkLy4vdmFsaWRhdGlvbi9pbmRleC50cyIsIndlYnBhY2s6Ly9AdXBzaG90L3NoYXJlZC8uLi8uLi9ub2RlX21vZHVsZXMveXVwL2luZGV4LmVzbS5qcyIsIndlYnBhY2s6Ly9AdXBzaG90L3NoYXJlZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AdXBzaG90L3NoYXJlZC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9AdXBzaG90L3NoYXJlZC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQHVwc2hvdC9zaGFyZWQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AdXBzaG90L3NoYXJlZC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0B1cHNob3Qvc2hhcmVkL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vQHVwc2hvdC9zaGFyZWQvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL0B1cHNob3Qvc2hhcmVkL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEJhc2VkIG9uIEtlbmRvIFVJIENvcmUgZXhwcmVzc2lvbiBjb2RlIDxodHRwczovL2dpdGh1Yi5jb20vdGVsZXJpay9rZW5kby11aS1jb3JlI2xpY2Vuc2UtaW5mb3JtYXRpb24+XG4gKi9cbid1c2Ugc3RyaWN0J1xuXG5mdW5jdGlvbiBDYWNoZShtYXhTaXplKSB7XG4gIHRoaXMuX21heFNpemUgPSBtYXhTaXplXG4gIHRoaXMuY2xlYXIoKVxufVxuQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9zaXplID0gMFxuICB0aGlzLl92YWx1ZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpXG59XG5DYWNoZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gdGhpcy5fdmFsdWVzW2tleV1cbn1cbkNhY2hlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICB0aGlzLl9zaXplID49IHRoaXMuX21heFNpemUgJiYgdGhpcy5jbGVhcigpXG4gIGlmICghKGtleSBpbiB0aGlzLl92YWx1ZXMpKSB0aGlzLl9zaXplKytcblxuICByZXR1cm4gKHRoaXMuX3ZhbHVlc1trZXldID0gdmFsdWUpXG59XG5cbnZhciBTUExJVF9SRUdFWCA9IC9bXi5eXFxdXltdK3woPz1cXFtcXF18XFwuXFwuKS9nLFxuICBESUdJVF9SRUdFWCA9IC9eXFxkKyQvLFxuICBMRUFEX0RJR0lUX1JFR0VYID0gL15cXGQvLFxuICBTUEVDX0NIQVJfUkVHRVggPSAvW35gISMkJVxcXiYqKz1cXC1cXFtcXF1cXFxcJzssL3t9fFxcXFxcIjo8PlxcP10vZyxcbiAgQ0xFQU5fUVVPVEVTX1JFR0VYID0gL15cXHMqKFsnXCJdPykoLio/KShcXDEpXFxzKiQvLFxuICBNQVhfQ0FDSEVfU0laRSA9IDUxMlxuXG52YXIgcGF0aENhY2hlID0gbmV3IENhY2hlKE1BWF9DQUNIRV9TSVpFKSxcbiAgc2V0Q2FjaGUgPSBuZXcgQ2FjaGUoTUFYX0NBQ0hFX1NJWkUpLFxuICBnZXRDYWNoZSA9IG5ldyBDYWNoZShNQVhfQ0FDSEVfU0laRSlcblxudmFyIGNvbmZpZ1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ2FjaGU6IENhY2hlLFxuXG4gIHNwbGl0OiBzcGxpdCxcblxuICBub3JtYWxpemVQYXRoOiBub3JtYWxpemVQYXRoLFxuXG4gIHNldHRlcjogZnVuY3Rpb24gKHBhdGgpIHtcbiAgICB2YXIgcGFydHMgPSBub3JtYWxpemVQYXRoKHBhdGgpXG5cbiAgICByZXR1cm4gKFxuICAgICAgc2V0Q2FjaGUuZ2V0KHBhdGgpIHx8XG4gICAgICBzZXRDYWNoZS5zZXQocGF0aCwgZnVuY3Rpb24gc2V0dGVyKG9iaiwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMFxuICAgICAgICB2YXIgbGVuID0gcGFydHMubGVuZ3RoXG4gICAgICAgIHZhciBkYXRhID0gb2JqXG5cbiAgICAgICAgd2hpbGUgKGluZGV4IDwgbGVuIC0gMSkge1xuICAgICAgICAgIHZhciBwYXJ0ID0gcGFydHNbaW5kZXhdXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgcGFydCA9PT0gJ19fcHJvdG9fXycgfHxcbiAgICAgICAgICAgIHBhcnQgPT09ICdjb25zdHJ1Y3RvcicgfHxcbiAgICAgICAgICAgIHBhcnQgPT09ICdwcm90b3R5cGUnXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGF0YSA9IGRhdGFbcGFydHNbaW5kZXgrK11dXG4gICAgICAgIH1cbiAgICAgICAgZGF0YVtwYXJ0c1tpbmRleF1dID0gdmFsdWVcbiAgICAgIH0pXG4gICAgKVxuICB9LFxuXG4gIGdldHRlcjogZnVuY3Rpb24gKHBhdGgsIHNhZmUpIHtcbiAgICB2YXIgcGFydHMgPSBub3JtYWxpemVQYXRoKHBhdGgpXG4gICAgcmV0dXJuIChcbiAgICAgIGdldENhY2hlLmdldChwYXRoKSB8fFxuICAgICAgZ2V0Q2FjaGUuc2V0KHBhdGgsIGZ1bmN0aW9uIGdldHRlcihkYXRhKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDAsXG4gICAgICAgICAgbGVuID0gcGFydHMubGVuZ3RoXG4gICAgICAgIHdoaWxlIChpbmRleCA8IGxlbikge1xuICAgICAgICAgIGlmIChkYXRhICE9IG51bGwgfHwgIXNhZmUpIGRhdGEgPSBkYXRhW3BhcnRzW2luZGV4KytdXVxuICAgICAgICAgIGVsc2UgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGFcbiAgICAgIH0pXG4gICAgKVxuICB9LFxuXG4gIGpvaW46IGZ1bmN0aW9uIChzZWdtZW50cykge1xuICAgIHJldHVybiBzZWdtZW50cy5yZWR1Y2UoZnVuY3Rpb24gKHBhdGgsIHBhcnQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHBhdGggK1xuICAgICAgICAoaXNRdW90ZWQocGFydCkgfHwgRElHSVRfUkVHRVgudGVzdChwYXJ0KVxuICAgICAgICAgID8gJ1snICsgcGFydCArICddJ1xuICAgICAgICAgIDogKHBhdGggPyAnLicgOiAnJykgKyBwYXJ0KVxuICAgICAgKVxuICAgIH0sICcnKVxuICB9LFxuXG4gIGZvckVhY2g6IGZ1bmN0aW9uIChwYXRoLCBjYiwgdGhpc0FyZykge1xuICAgIGZvckVhY2goQXJyYXkuaXNBcnJheShwYXRoKSA/IHBhdGggOiBzcGxpdChwYXRoKSwgY2IsIHRoaXNBcmcpXG4gIH0sXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVBhdGgocGF0aCkge1xuICByZXR1cm4gKFxuICAgIHBhdGhDYWNoZS5nZXQocGF0aCkgfHxcbiAgICBwYXRoQ2FjaGUuc2V0KFxuICAgICAgcGF0aCxcbiAgICAgIHNwbGl0KHBhdGgpLm1hcChmdW5jdGlvbiAocGFydCkge1xuICAgICAgICByZXR1cm4gcGFydC5yZXBsYWNlKENMRUFOX1FVT1RFU19SRUdFWCwgJyQyJylcbiAgICAgIH0pXG4gICAgKVxuICApXG59XG5cbmZ1bmN0aW9uIHNwbGl0KHBhdGgpIHtcbiAgcmV0dXJuIHBhdGgubWF0Y2goU1BMSVRfUkVHRVgpIHx8IFsnJ11cbn1cblxuZnVuY3Rpb24gZm9yRWFjaChwYXJ0cywgaXRlciwgdGhpc0FyZykge1xuICB2YXIgbGVuID0gcGFydHMubGVuZ3RoLFxuICAgIHBhcnQsXG4gICAgaWR4LFxuICAgIGlzQXJyYXksXG4gICAgaXNCcmFja2V0XG5cbiAgZm9yIChpZHggPSAwOyBpZHggPCBsZW47IGlkeCsrKSB7XG4gICAgcGFydCA9IHBhcnRzW2lkeF1cblxuICAgIGlmIChwYXJ0KSB7XG4gICAgICBpZiAoc2hvdWxkQmVRdW90ZWQocGFydCkpIHtcbiAgICAgICAgcGFydCA9ICdcIicgKyBwYXJ0ICsgJ1wiJ1xuICAgICAgfVxuXG4gICAgICBpc0JyYWNrZXQgPSBpc1F1b3RlZChwYXJ0KVxuICAgICAgaXNBcnJheSA9ICFpc0JyYWNrZXQgJiYgL15cXGQrJC8udGVzdChwYXJ0KVxuXG4gICAgICBpdGVyLmNhbGwodGhpc0FyZywgcGFydCwgaXNCcmFja2V0LCBpc0FycmF5LCBpZHgsIHBhcnRzKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpc1F1b3RlZChzdHIpIHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyAmJiBzdHIgJiYgW1wiJ1wiLCAnXCInXS5pbmRleE9mKHN0ci5jaGFyQXQoMCkpICE9PSAtMVxuICApXG59XG5cbmZ1bmN0aW9uIGhhc0xlYWRpbmdOdW1iZXIocGFydCkge1xuICByZXR1cm4gcGFydC5tYXRjaChMRUFEX0RJR0lUX1JFR0VYKSAmJiAhcGFydC5tYXRjaChESUdJVF9SRUdFWClcbn1cblxuZnVuY3Rpb24gaGFzU3BlY2lhbENoYXJzKHBhcnQpIHtcbiAgcmV0dXJuIFNQRUNfQ0hBUl9SRUdFWC50ZXN0KHBhcnQpXG59XG5cbmZ1bmN0aW9uIHNob3VsZEJlUXVvdGVkKHBhcnQpIHtcbiAgcmV0dXJuICFpc1F1b3RlZChwYXJ0KSAmJiAoaGFzTGVhZGluZ051bWJlcihwYXJ0KSB8fCBoYXNTcGVjaWFsQ2hhcnMocGFydCkpXG59XG4iLCJjb25zdCByZVdvcmRzID0gL1tBLVpcXHhjMC1cXHhkNlxceGQ4LVxceGRlXT9bYS16XFx4ZGYtXFx4ZjZcXHhmOC1cXHhmZl0rKD86WyfigJldKD86ZHxsbHxtfHJlfHN8dHx2ZSkpPyg/PVtcXHhhY1xceGIxXFx4ZDdcXHhmN1xceDAwLVxceDJmXFx4M2EtXFx4NDBcXHg1Yi1cXHg2MFxceDdiLVxceGJmXFx1MjAwMC1cXHUyMDZmIFxcdFxceDBiXFxmXFx4YTBcXHVmZWZmXFxuXFxyXFx1MjAyOFxcdTIwMjlcXHUxNjgwXFx1MTgwZVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBhXFx1MjAyZlxcdTIwNWZcXHUzMDAwXXxbQS1aXFx4YzAtXFx4ZDZcXHhkOC1cXHhkZV18JCl8KD86W0EtWlxceGMwLVxceGQ2XFx4ZDgtXFx4ZGVdfFteXFx1ZDgwMC1cXHVkZmZmXFx4YWNcXHhiMVxceGQ3XFx4ZjdcXHgwMC1cXHgyZlxceDNhLVxceDQwXFx4NWItXFx4NjBcXHg3Yi1cXHhiZlxcdTIwMDAtXFx1MjA2ZiBcXHRcXHgwYlxcZlxceGEwXFx1ZmVmZlxcblxcclxcdTIwMjhcXHUyMDI5XFx1MTY4MFxcdTE4MGVcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwYVxcdTIwMmZcXHUyMDVmXFx1MzAwMFxcZCtcXHUyNzAwLVxcdTI3YmZhLXpcXHhkZi1cXHhmNlxceGY4LVxceGZmQS1aXFx4YzAtXFx4ZDZcXHhkOC1cXHhkZV0pKyg/Olsn4oCZXSg/OkR8TEx8TXxSRXxTfFR8VkUpKT8oPz1bXFx4YWNcXHhiMVxceGQ3XFx4ZjdcXHgwMC1cXHgyZlxceDNhLVxceDQwXFx4NWItXFx4NjBcXHg3Yi1cXHhiZlxcdTIwMDAtXFx1MjA2ZiBcXHRcXHgwYlxcZlxceGEwXFx1ZmVmZlxcblxcclxcdTIwMjhcXHUyMDI5XFx1MTY4MFxcdTE4MGVcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwYVxcdTIwMmZcXHUyMDVmXFx1MzAwMF18W0EtWlxceGMwLVxceGQ2XFx4ZDgtXFx4ZGVdKD86W2EtelxceGRmLVxceGY2XFx4ZjgtXFx4ZmZdfFteXFx1ZDgwMC1cXHVkZmZmXFx4YWNcXHhiMVxceGQ3XFx4ZjdcXHgwMC1cXHgyZlxceDNhLVxceDQwXFx4NWItXFx4NjBcXHg3Yi1cXHhiZlxcdTIwMDAtXFx1MjA2ZiBcXHRcXHgwYlxcZlxceGEwXFx1ZmVmZlxcblxcclxcdTIwMjhcXHUyMDI5XFx1MTY4MFxcdTE4MGVcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwYVxcdTIwMmZcXHUyMDVmXFx1MzAwMFxcZCtcXHUyNzAwLVxcdTI3YmZhLXpcXHhkZi1cXHhmNlxceGY4LVxceGZmQS1aXFx4YzAtXFx4ZDZcXHhkOC1cXHhkZV0pfCQpfFtBLVpcXHhjMC1cXHhkNlxceGQ4LVxceGRlXT8oPzpbYS16XFx4ZGYtXFx4ZjZcXHhmOC1cXHhmZl18W15cXHVkODAwLVxcdWRmZmZcXHhhY1xceGIxXFx4ZDdcXHhmN1xceDAwLVxceDJmXFx4M2EtXFx4NDBcXHg1Yi1cXHg2MFxceDdiLVxceGJmXFx1MjAwMC1cXHUyMDZmIFxcdFxceDBiXFxmXFx4YTBcXHVmZWZmXFxuXFxyXFx1MjAyOFxcdTIwMjlcXHUxNjgwXFx1MTgwZVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBhXFx1MjAyZlxcdTIwNWZcXHUzMDAwXFxkK1xcdTI3MDAtXFx1MjdiZmEtelxceGRmLVxceGY2XFx4ZjgtXFx4ZmZBLVpcXHhjMC1cXHhkNlxceGQ4LVxceGRlXSkrKD86WyfigJldKD86ZHxsbHxtfHJlfHN8dHx2ZSkpP3xbQS1aXFx4YzAtXFx4ZDZcXHhkOC1cXHhkZV0rKD86WyfigJldKD86RHxMTHxNfFJFfFN8VHxWRSkpP3xcXGQqKD86MVNUfDJORHwzUkR8KD8hWzEyM10pXFxkVEgpKD89XFxifFthLXpfXSl8XFxkKig/OjFzdHwybmR8M3JkfCg/IVsxMjNdKVxcZHRoKSg/PVxcYnxbQS1aX10pfFxcZCt8KD86W1xcdTI3MDAtXFx1MjdiZl18KD86XFx1ZDgzY1tcXHVkZGU2LVxcdWRkZmZdKXsyfXxbXFx1ZDgwMC1cXHVkYmZmXVtcXHVkYzAwLVxcdWRmZmZdKVtcXHVmZTBlXFx1ZmUwZl0/KD86W1xcdTAzMDAtXFx1MDM2ZlxcdWZlMjAtXFx1ZmUyZlxcdTIwZDAtXFx1MjBmZl18XFx1ZDgzY1tcXHVkZmZiLVxcdWRmZmZdKT8oPzpcXHUyMDBkKD86W15cXHVkODAwLVxcdWRmZmZdfCg/OlxcdWQ4M2NbXFx1ZGRlNi1cXHVkZGZmXSl7Mn18W1xcdWQ4MDAtXFx1ZGJmZl1bXFx1ZGMwMC1cXHVkZmZmXSlbXFx1ZmUwZVxcdWZlMGZdPyg/OltcXHUwMzAwLVxcdTAzNmZcXHVmZTIwLVxcdWZlMmZcXHUyMGQwLVxcdTIwZmZdfFxcdWQ4M2NbXFx1ZGZmYi1cXHVkZmZmXSk/KSovZ1xuXG5jb25zdCB3b3JkcyA9IChzdHIpID0+IHN0ci5tYXRjaChyZVdvcmRzKSB8fCBbXVxuXG5jb25zdCB1cHBlckZpcnN0ID0gKHN0cikgPT4gc3RyWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSlcblxuY29uc3Qgam9pbiA9IChzdHIsIGQpID0+IHdvcmRzKHN0cikuam9pbihkKS50b0xvd2VyQ2FzZSgpXG5cbmNvbnN0IGNhbWVsQ2FzZSA9IChzdHIpID0+XG4gIHdvcmRzKHN0cikucmVkdWNlKFxuICAgIChhY2MsIG5leHQpID0+XG4gICAgICBgJHthY2N9JHtcbiAgICAgICAgIWFjY1xuICAgICAgICAgID8gbmV4dC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgOiBuZXh0WzBdLnRvVXBwZXJDYXNlKCkgKyBuZXh0LnNsaWNlKDEpLnRvTG93ZXJDYXNlKClcbiAgICAgIH1gLFxuICAgICcnLFxuICApXG5cbmNvbnN0IHBhc2NhbENhc2UgPSAoc3RyKSA9PiB1cHBlckZpcnN0KGNhbWVsQ2FzZShzdHIpKVxuXG5jb25zdCBzbmFrZUNhc2UgPSAoc3RyKSA9PiBqb2luKHN0ciwgJ18nKVxuXG5jb25zdCBrZWJhYkNhc2UgPSAoc3RyKSA9PiBqb2luKHN0ciwgJy0nKVxuXG5jb25zdCBzZW50ZW5jZUNhc2UgPSAoc3RyKSA9PiB1cHBlckZpcnN0KGpvaW4oc3RyLCAnICcpKVxuXG5jb25zdCB0aXRsZUNhc2UgPSAoc3RyKSA9PiB3b3JkcyhzdHIpLm1hcCh1cHBlckZpcnN0KS5qb2luKCcgJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHdvcmRzLFxuICB1cHBlckZpcnN0LFxuICBjYW1lbENhc2UsXG4gIHBhc2NhbENhc2UsXG4gIHNuYWtlQ2FzZSxcbiAga2ViYWJDYXNlLFxuICBzZW50ZW5jZUNhc2UsXG4gIHRpdGxlQ2FzZSxcbn1cbiIsIlxuLyoqXG4gKiBUb3BvbG9naWNhbCBzb3J0aW5nIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtBcnJheX0gZWRnZXNcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVkZ2VzKSB7XG4gIHJldHVybiB0b3Bvc29ydCh1bmlxdWVOb2RlcyhlZGdlcyksIGVkZ2VzKVxufVxuXG5tb2R1bGUuZXhwb3J0cy5hcnJheSA9IHRvcG9zb3J0XG5cbmZ1bmN0aW9uIHRvcG9zb3J0KG5vZGVzLCBlZGdlcykge1xuICB2YXIgY3Vyc29yID0gbm9kZXMubGVuZ3RoXG4gICAgLCBzb3J0ZWQgPSBuZXcgQXJyYXkoY3Vyc29yKVxuICAgICwgdmlzaXRlZCA9IHt9XG4gICAgLCBpID0gY3Vyc29yXG4gICAgLy8gQmV0dGVyIGRhdGEgc3RydWN0dXJlcyBtYWtlIGFsZ29yaXRobSBtdWNoIGZhc3Rlci5cbiAgICAsIG91dGdvaW5nRWRnZXMgPSBtYWtlT3V0Z29pbmdFZGdlcyhlZGdlcylcbiAgICAsIG5vZGVzSGFzaCA9IG1ha2VOb2Rlc0hhc2gobm9kZXMpXG5cbiAgLy8gY2hlY2sgZm9yIHVua25vd24gbm9kZXNcbiAgZWRnZXMuZm9yRWFjaChmdW5jdGlvbihlZGdlKSB7XG4gICAgaWYgKCFub2Rlc0hhc2guaGFzKGVkZ2VbMF0pIHx8ICFub2Rlc0hhc2guaGFzKGVkZ2VbMV0pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gbm9kZS4gVGhlcmUgaXMgYW4gdW5rbm93biBub2RlIGluIHRoZSBzdXBwbGllZCBlZGdlcy4nKVxuICAgIH1cbiAgfSlcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgaWYgKCF2aXNpdGVkW2ldKSB2aXNpdChub2Rlc1tpXSwgaSwgbmV3IFNldCgpKVxuICB9XG5cbiAgcmV0dXJuIHNvcnRlZFxuXG4gIGZ1bmN0aW9uIHZpc2l0KG5vZGUsIGksIHByZWRlY2Vzc29ycykge1xuICAgIGlmKHByZWRlY2Vzc29ycy5oYXMobm9kZSkpIHtcbiAgICAgIHZhciBub2RlUmVwXG4gICAgICB0cnkge1xuICAgICAgICBub2RlUmVwID0gXCIsIG5vZGUgd2FzOlwiICsgSlNPTi5zdHJpbmdpZnkobm9kZSlcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBub2RlUmVwID0gXCJcIlxuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDeWNsaWMgZGVwZW5kZW5jeScgKyBub2RlUmVwKVxuICAgIH1cblxuICAgIGlmICghbm9kZXNIYXNoLmhhcyhub2RlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3VuZCB1bmtub3duIG5vZGUuIE1ha2Ugc3VyZSB0byBwcm92aWRlZCBhbGwgaW52b2x2ZWQgbm9kZXMuIFVua25vd24gbm9kZTogJytKU09OLnN0cmluZ2lmeShub2RlKSlcbiAgICB9XG5cbiAgICBpZiAodmlzaXRlZFtpXSkgcmV0dXJuO1xuICAgIHZpc2l0ZWRbaV0gPSB0cnVlXG5cbiAgICB2YXIgb3V0Z29pbmcgPSBvdXRnb2luZ0VkZ2VzLmdldChub2RlKSB8fCBuZXcgU2V0KClcbiAgICBvdXRnb2luZyA9IEFycmF5LmZyb20ob3V0Z29pbmcpXG5cbiAgICBpZiAoaSA9IG91dGdvaW5nLmxlbmd0aCkge1xuICAgICAgcHJlZGVjZXNzb3JzLmFkZChub2RlKVxuICAgICAgZG8ge1xuICAgICAgICB2YXIgY2hpbGQgPSBvdXRnb2luZ1stLWldXG4gICAgICAgIHZpc2l0KGNoaWxkLCBub2Rlc0hhc2guZ2V0KGNoaWxkKSwgcHJlZGVjZXNzb3JzKVxuICAgICAgfSB3aGlsZSAoaSlcbiAgICAgIHByZWRlY2Vzc29ycy5kZWxldGUobm9kZSlcbiAgICB9XG5cbiAgICBzb3J0ZWRbLS1jdXJzb3JdID0gbm9kZVxuICB9XG59XG5cbmZ1bmN0aW9uIHVuaXF1ZU5vZGVzKGFycil7XG4gIHZhciByZXMgPSBuZXcgU2V0KClcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIHZhciBlZGdlID0gYXJyW2ldXG4gICAgcmVzLmFkZChlZGdlWzBdKVxuICAgIHJlcy5hZGQoZWRnZVsxXSlcbiAgfVxuICByZXR1cm4gQXJyYXkuZnJvbShyZXMpXG59XG5cbmZ1bmN0aW9uIG1ha2VPdXRnb2luZ0VkZ2VzKGFycil7XG4gIHZhciBlZGdlcyA9IG5ldyBNYXAoKVxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFyIGVkZ2UgPSBhcnJbaV1cbiAgICBpZiAoIWVkZ2VzLmhhcyhlZGdlWzBdKSkgZWRnZXMuc2V0KGVkZ2VbMF0sIG5ldyBTZXQoKSlcbiAgICBpZiAoIWVkZ2VzLmhhcyhlZGdlWzFdKSkgZWRnZXMuc2V0KGVkZ2VbMV0sIG5ldyBTZXQoKSlcbiAgICBlZGdlcy5nZXQoZWRnZVswXSkuYWRkKGVkZ2VbMV0pXG4gIH1cbiAgcmV0dXJuIGVkZ2VzXG59XG5cbmZ1bmN0aW9uIG1ha2VOb2Rlc0hhc2goYXJyKXtcbiAgdmFyIHJlcyA9IG5ldyBNYXAoKVxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgcmVzLnNldChhcnJbaV0sIGkpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudmFsaWRhdGlvbiA9IHZvaWQgMDtcbmV4cG9ydHMudmFsaWRhdGlvbiA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi92YWxpZGF0aW9uXCIpKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5sb2dpblNpZ25VcCA9IHZvaWQgMDtcbmNvbnN0IHl1cF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ5dXBcIikpO1xuZXhwb3J0cy5sb2dpblNpZ25VcCA9IHl1cF8xLmRlZmF1bHQub2JqZWN0KHtcbiAgICBlbWFpbDogeXVwXzEuZGVmYXVsdC5zdHJpbmcoKS5lbWFpbChcImVtYWlsIHNob3VsZG4ndCBiZSBlbXB0eVwiKS5yZXF1aXJlZCgpLFxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2Zvcm1cIiksIGV4cG9ydHMpO1xuIiwiaW1wb3J0IHsgZ2V0dGVyLCBmb3JFYWNoLCBzcGxpdCwgbm9ybWFsaXplUGF0aCwgam9pbiB9IGZyb20gJ3Byb3BlcnR5LWV4cHInO1xuaW1wb3J0IHsgY2FtZWxDYXNlLCBzbmFrZUNhc2UgfSBmcm9tICd0aW55LWNhc2UnO1xuaW1wb3J0IHRvcG9zb3J0IGZyb20gJ3RvcG9zb3J0JztcblxuY29uc3QgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuY29uc3QgZXJyb3JUb1N0cmluZyA9IEVycm9yLnByb3RvdHlwZS50b1N0cmluZztcbmNvbnN0IHJlZ0V4cFRvU3RyaW5nID0gUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZztcbmNvbnN0IHN5bWJvbFRvU3RyaW5nID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgPyBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nIDogKCkgPT4gJyc7XG5jb25zdCBTWU1CT0xfUkVHRVhQID0gL15TeW1ib2xcXCgoLiopXFwpKC4qKSQvO1xuZnVuY3Rpb24gcHJpbnROdW1iZXIodmFsKSB7XG4gIGlmICh2YWwgIT0gK3ZhbCkgcmV0dXJuICdOYU4nO1xuICBjb25zdCBpc05lZ2F0aXZlWmVybyA9IHZhbCA9PT0gMCAmJiAxIC8gdmFsIDwgMDtcbiAgcmV0dXJuIGlzTmVnYXRpdmVaZXJvID8gJy0wJyA6ICcnICsgdmFsO1xufVxuZnVuY3Rpb24gcHJpbnRTaW1wbGVWYWx1ZSh2YWwsIHF1b3RlU3RyaW5ncyA9IGZhbHNlKSB7XG4gIGlmICh2YWwgPT0gbnVsbCB8fCB2YWwgPT09IHRydWUgfHwgdmFsID09PSBmYWxzZSkgcmV0dXJuICcnICsgdmFsO1xuICBjb25zdCB0eXBlT2YgPSB0eXBlb2YgdmFsO1xuICBpZiAodHlwZU9mID09PSAnbnVtYmVyJykgcmV0dXJuIHByaW50TnVtYmVyKHZhbCk7XG4gIGlmICh0eXBlT2YgPT09ICdzdHJpbmcnKSByZXR1cm4gcXVvdGVTdHJpbmdzID8gYFwiJHt2YWx9XCJgIDogdmFsO1xuICBpZiAodHlwZU9mID09PSAnZnVuY3Rpb24nKSByZXR1cm4gJ1tGdW5jdGlvbiAnICsgKHZhbC5uYW1lIHx8ICdhbm9ueW1vdXMnKSArICddJztcbiAgaWYgKHR5cGVPZiA9PT0gJ3N5bWJvbCcpIHJldHVybiBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbCkucmVwbGFjZShTWU1CT0xfUkVHRVhQLCAnU3ltYm9sKCQxKScpO1xuICBjb25zdCB0YWcgPSB0b1N0cmluZy5jYWxsKHZhbCkuc2xpY2UoOCwgLTEpO1xuICBpZiAodGFnID09PSAnRGF0ZScpIHJldHVybiBpc05hTih2YWwuZ2V0VGltZSgpKSA/ICcnICsgdmFsIDogdmFsLnRvSVNPU3RyaW5nKHZhbCk7XG4gIGlmICh0YWcgPT09ICdFcnJvcicgfHwgdmFsIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiAnWycgKyBlcnJvclRvU3RyaW5nLmNhbGwodmFsKSArICddJztcbiAgaWYgKHRhZyA9PT0gJ1JlZ0V4cCcpIHJldHVybiByZWdFeHBUb1N0cmluZy5jYWxsKHZhbCk7XG4gIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gcHJpbnRWYWx1ZSh2YWx1ZSwgcXVvdGVTdHJpbmdzKSB7XG4gIGxldCByZXN1bHQgPSBwcmludFNpbXBsZVZhbHVlKHZhbHVlLCBxdW90ZVN0cmluZ3MpO1xuICBpZiAocmVzdWx0ICE9PSBudWxsKSByZXR1cm4gcmVzdWx0O1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgbGV0IHJlc3VsdCA9IHByaW50U2ltcGxlVmFsdWUodGhpc1trZXldLCBxdW90ZVN0cmluZ3MpO1xuICAgIGlmIChyZXN1bHQgIT09IG51bGwpIHJldHVybiByZXN1bHQ7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LCAyKTtcbn1cblxuZnVuY3Rpb24gdG9BcnJheSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/IFtdIDogW10uY29uY2F0KHZhbHVlKTtcbn1cblxubGV0IHN0clJlZyA9IC9cXCRcXHtcXHMqKFxcdyspXFxzKlxcfS9nO1xuY2xhc3MgVmFsaWRhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBzdGF0aWMgZm9ybWF0RXJyb3IobWVzc2FnZSwgcGFyYW1zKSB7XG4gICAgY29uc3QgcGF0aCA9IHBhcmFtcy5sYWJlbCB8fCBwYXJhbXMucGF0aCB8fCAndGhpcyc7XG4gICAgaWYgKHBhdGggIT09IHBhcmFtcy5wYXRoKSBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMsIHtcbiAgICAgIHBhdGhcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnKSByZXR1cm4gbWVzc2FnZS5yZXBsYWNlKHN0clJlZywgKF8sIGtleSkgPT4gcHJpbnRWYWx1ZShwYXJhbXNba2V5XSkpO1xuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIG1lc3NhZ2UocGFyYW1zKTtcbiAgICByZXR1cm4gbWVzc2FnZTtcbiAgfVxuICBzdGF0aWMgaXNFcnJvcihlcnIpIHtcbiAgICByZXR1cm4gZXJyICYmIGVyci5uYW1lID09PSAnVmFsaWRhdGlvbkVycm9yJztcbiAgfVxuICBjb25zdHJ1Y3RvcihlcnJvck9yRXJyb3JzLCB2YWx1ZSwgZmllbGQsIHR5cGUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudmFsdWUgPSB2b2lkIDA7XG4gICAgdGhpcy5wYXRoID0gdm9pZCAwO1xuICAgIHRoaXMudHlwZSA9IHZvaWQgMDtcbiAgICB0aGlzLmVycm9ycyA9IHZvaWQgMDtcbiAgICB0aGlzLnBhcmFtcyA9IHZvaWQgMDtcbiAgICB0aGlzLmlubmVyID0gdm9pZCAwO1xuICAgIHRoaXMubmFtZSA9ICdWYWxpZGF0aW9uRXJyb3InO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnBhdGggPSBmaWVsZDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuZXJyb3JzID0gW107XG4gICAgdGhpcy5pbm5lciA9IFtdO1xuICAgIHRvQXJyYXkoZXJyb3JPckVycm9ycykuZm9yRWFjaChlcnIgPT4ge1xuICAgICAgaWYgKFZhbGlkYXRpb25FcnJvci5pc0Vycm9yKGVycikpIHtcbiAgICAgICAgdGhpcy5lcnJvcnMucHVzaCguLi5lcnIuZXJyb3JzKTtcbiAgICAgICAgdGhpcy5pbm5lciA9IHRoaXMuaW5uZXIuY29uY2F0KGVyci5pbm5lci5sZW5ndGggPyBlcnIuaW5uZXIgOiBlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lcnJvcnMucHVzaChlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuZXJyb3JzLmxlbmd0aCA+IDEgPyBgJHt0aGlzLmVycm9ycy5sZW5ndGh9IGVycm9ycyBvY2N1cnJlZGAgOiB0aGlzLmVycm9yc1swXTtcbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIFZhbGlkYXRpb25FcnJvcik7XG4gIH1cbn1cblxubGV0IG1peGVkID0ge1xuICBkZWZhdWx0OiAnJHtwYXRofSBpcyBpbnZhbGlkJyxcbiAgcmVxdWlyZWQ6ICcke3BhdGh9IGlzIGEgcmVxdWlyZWQgZmllbGQnLFxuICBkZWZpbmVkOiAnJHtwYXRofSBtdXN0IGJlIGRlZmluZWQnLFxuICBub3ROdWxsOiAnJHtwYXRofSBjYW5ub3QgYmUgbnVsbCcsXG4gIG9uZU9mOiAnJHtwYXRofSBtdXN0IGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nIHZhbHVlczogJHt2YWx1ZXN9JyxcbiAgbm90T25lT2Y6ICcke3BhdGh9IG11c3Qgbm90IGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nIHZhbHVlczogJHt2YWx1ZXN9JyxcbiAgbm90VHlwZTogKHtcbiAgICBwYXRoLFxuICAgIHR5cGUsXG4gICAgdmFsdWUsXG4gICAgb3JpZ2luYWxWYWx1ZVxuICB9KSA9PiB7XG4gICAgY29uc3QgY2FzdE1zZyA9IG9yaWdpbmFsVmFsdWUgIT0gbnVsbCAmJiBvcmlnaW5hbFZhbHVlICE9PSB2YWx1ZSA/IGAgKGNhc3QgZnJvbSB0aGUgdmFsdWUgXFxgJHtwcmludFZhbHVlKG9yaWdpbmFsVmFsdWUsIHRydWUpfVxcYCkuYCA6ICcuJztcbiAgICByZXR1cm4gdHlwZSAhPT0gJ21peGVkJyA/IGAke3BhdGh9IG11c3QgYmUgYSBcXGAke3R5cGV9XFxgIHR5cGUsIGAgKyBgYnV0IHRoZSBmaW5hbCB2YWx1ZSB3YXM6IFxcYCR7cHJpbnRWYWx1ZSh2YWx1ZSwgdHJ1ZSl9XFxgYCArIGNhc3RNc2cgOiBgJHtwYXRofSBtdXN0IG1hdGNoIHRoZSBjb25maWd1cmVkIHR5cGUuIGAgKyBgVGhlIHZhbGlkYXRlZCB2YWx1ZSB3YXM6IFxcYCR7cHJpbnRWYWx1ZSh2YWx1ZSwgdHJ1ZSl9XFxgYCArIGNhc3RNc2c7XG4gIH1cbn07XG5sZXQgc3RyaW5nID0ge1xuICBsZW5ndGg6ICcke3BhdGh9IG11c3QgYmUgZXhhY3RseSAke2xlbmd0aH0gY2hhcmFjdGVycycsXG4gIG1pbjogJyR7cGF0aH0gbXVzdCBiZSBhdCBsZWFzdCAke21pbn0gY2hhcmFjdGVycycsXG4gIG1heDogJyR7cGF0aH0gbXVzdCBiZSBhdCBtb3N0ICR7bWF4fSBjaGFyYWN0ZXJzJyxcbiAgbWF0Y2hlczogJyR7cGF0aH0gbXVzdCBtYXRjaCB0aGUgZm9sbG93aW5nOiBcIiR7cmVnZXh9XCInLFxuICBlbWFpbDogJyR7cGF0aH0gbXVzdCBiZSBhIHZhbGlkIGVtYWlsJyxcbiAgdXJsOiAnJHtwYXRofSBtdXN0IGJlIGEgdmFsaWQgVVJMJyxcbiAgdXVpZDogJyR7cGF0aH0gbXVzdCBiZSBhIHZhbGlkIFVVSUQnLFxuICB0cmltOiAnJHtwYXRofSBtdXN0IGJlIGEgdHJpbW1lZCBzdHJpbmcnLFxuICBsb3dlcmNhc2U6ICcke3BhdGh9IG11c3QgYmUgYSBsb3dlcmNhc2Ugc3RyaW5nJyxcbiAgdXBwZXJjYXNlOiAnJHtwYXRofSBtdXN0IGJlIGEgdXBwZXIgY2FzZSBzdHJpbmcnXG59O1xubGV0IG51bWJlciA9IHtcbiAgbWluOiAnJHtwYXRofSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAke21pbn0nLFxuICBtYXg6ICcke3BhdGh9IG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICR7bWF4fScsXG4gIGxlc3NUaGFuOiAnJHtwYXRofSBtdXN0IGJlIGxlc3MgdGhhbiAke2xlc3N9JyxcbiAgbW9yZVRoYW46ICcke3BhdGh9IG11c3QgYmUgZ3JlYXRlciB0aGFuICR7bW9yZX0nLFxuICBwb3NpdGl2ZTogJyR7cGF0aH0gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicsXG4gIG5lZ2F0aXZlOiAnJHtwYXRofSBtdXN0IGJlIGEgbmVnYXRpdmUgbnVtYmVyJyxcbiAgaW50ZWdlcjogJyR7cGF0aH0gbXVzdCBiZSBhbiBpbnRlZ2VyJ1xufTtcbmxldCBkYXRlID0ge1xuICBtaW46ICcke3BhdGh9IGZpZWxkIG11c3QgYmUgbGF0ZXIgdGhhbiAke21pbn0nLFxuICBtYXg6ICcke3BhdGh9IGZpZWxkIG11c3QgYmUgYXQgZWFybGllciB0aGFuICR7bWF4fSdcbn07XG5sZXQgYm9vbGVhbiA9IHtcbiAgaXNWYWx1ZTogJyR7cGF0aH0gZmllbGQgbXVzdCBiZSAke3ZhbHVlfSdcbn07XG5sZXQgb2JqZWN0ID0ge1xuICBub1Vua25vd246ICcke3BhdGh9IGZpZWxkIGhhcyB1bnNwZWNpZmllZCBrZXlzOiAke3Vua25vd259J1xufTtcbmxldCBhcnJheSA9IHtcbiAgbWluOiAnJHtwYXRofSBmaWVsZCBtdXN0IGhhdmUgYXQgbGVhc3QgJHttaW59IGl0ZW1zJyxcbiAgbWF4OiAnJHtwYXRofSBmaWVsZCBtdXN0IGhhdmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICR7bWF4fSBpdGVtcycsXG4gIGxlbmd0aDogJyR7cGF0aH0gbXVzdCBoYXZlICR7bGVuZ3RofSBpdGVtcydcbn07XG5sZXQgdHVwbGUgPSB7XG4gIG5vdFR5cGU6IHBhcmFtcyA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgcGF0aCxcbiAgICAgIHZhbHVlLFxuICAgICAgc3BlY1xuICAgIH0gPSBwYXJhbXM7XG4gICAgY29uc3QgdHlwZUxlbiA9IHNwZWMudHlwZXMubGVuZ3RoO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgaWYgKHZhbHVlLmxlbmd0aCA8IHR5cGVMZW4pIHJldHVybiBgJHtwYXRofSB0dXBsZSB2YWx1ZSBoYXMgdG9vIGZldyBpdGVtcywgZXhwZWN0ZWQgYSBsZW5ndGggb2YgJHt0eXBlTGVufSBidXQgZ290ICR7dmFsdWUubGVuZ3RofSBmb3IgdmFsdWU6IFxcYCR7cHJpbnRWYWx1ZSh2YWx1ZSwgdHJ1ZSl9XFxgYDtcbiAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiB0eXBlTGVuKSByZXR1cm4gYCR7cGF0aH0gdHVwbGUgdmFsdWUgaGFzIHRvbyBtYW55IGl0ZW1zLCBleHBlY3RlZCBhIGxlbmd0aCBvZiAke3R5cGVMZW59IGJ1dCBnb3QgJHt2YWx1ZS5sZW5ndGh9IGZvciB2YWx1ZTogXFxgJHtwcmludFZhbHVlKHZhbHVlLCB0cnVlKX1cXGBgO1xuICAgIH1cbiAgICByZXR1cm4gVmFsaWRhdGlvbkVycm9yLmZvcm1hdEVycm9yKG1peGVkLm5vdFR5cGUsIHBhcmFtcyk7XG4gIH1cbn07XG52YXIgbG9jYWxlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKG51bGwpLCB7XG4gIG1peGVkLFxuICBzdHJpbmcsXG4gIG51bWJlcixcbiAgZGF0ZSxcbiAgb2JqZWN0LFxuICBhcnJheSxcbiAgYm9vbGVhblxufSk7XG5cbmNvbnN0IGlzU2NoZW1hID0gb2JqID0+IG9iaiAmJiBvYmouX19pc1l1cFNjaGVtYV9fO1xuXG5jbGFzcyBDb25kaXRpb24ge1xuICBzdGF0aWMgZnJvbU9wdGlvbnMocmVmcywgY29uZmlnKSB7XG4gICAgaWYgKCFjb25maWcudGhlbiAmJiAhY29uZmlnLm90aGVyd2lzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignZWl0aGVyIGB0aGVuOmAgb3IgYG90aGVyd2lzZTpgIGlzIHJlcXVpcmVkIGZvciBgd2hlbigpYCBjb25kaXRpb25zJyk7XG4gICAgbGV0IHtcbiAgICAgIGlzLFxuICAgICAgdGhlbixcbiAgICAgIG90aGVyd2lzZVxuICAgIH0gPSBjb25maWc7XG4gICAgbGV0IGNoZWNrID0gdHlwZW9mIGlzID09PSAnZnVuY3Rpb24nID8gaXMgOiAoLi4udmFsdWVzKSA9PiB2YWx1ZXMuZXZlcnkodmFsdWUgPT4gdmFsdWUgPT09IGlzKTtcbiAgICByZXR1cm4gbmV3IENvbmRpdGlvbihyZWZzLCAodmFsdWVzLCBzY2hlbWEpID0+IHtcbiAgICAgIHZhciBfYnJhbmNoO1xuICAgICAgbGV0IGJyYW5jaCA9IGNoZWNrKC4uLnZhbHVlcykgPyB0aGVuIDogb3RoZXJ3aXNlO1xuICAgICAgcmV0dXJuIChfYnJhbmNoID0gYnJhbmNoID09IG51bGwgPyB2b2lkIDAgOiBicmFuY2goc2NoZW1hKSkgIT0gbnVsbCA/IF9icmFuY2ggOiBzY2hlbWE7XG4gICAgfSk7XG4gIH1cbiAgY29uc3RydWN0b3IocmVmcywgYnVpbGRlcikge1xuICAgIHRoaXMuZm4gPSB2b2lkIDA7XG4gICAgdGhpcy5yZWZzID0gcmVmcztcbiAgICB0aGlzLnJlZnMgPSByZWZzO1xuICAgIHRoaXMuZm4gPSBidWlsZGVyO1xuICB9XG4gIHJlc29sdmUoYmFzZSwgb3B0aW9ucykge1xuICAgIGxldCB2YWx1ZXMgPSB0aGlzLnJlZnMubWFwKHJlZiA9PlxuICAgIC8vIFRPRE86ID8gb3BlcmF0b3IgaGVyZT9cbiAgICByZWYuZ2V0VmFsdWUob3B0aW9ucyA9PSBudWxsID8gdm9pZCAwIDogb3B0aW9ucy52YWx1ZSwgb3B0aW9ucyA9PSBudWxsID8gdm9pZCAwIDogb3B0aW9ucy5wYXJlbnQsIG9wdGlvbnMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdGlvbnMuY29udGV4dCkpO1xuICAgIGxldCBzY2hlbWEgPSB0aGlzLmZuKHZhbHVlcywgYmFzZSwgb3B0aW9ucyk7XG4gICAgaWYgKHNjaGVtYSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgLy8gQHRzLWlnbm9yZSB0aGlzIGNhbiBiZSBiYXNlXG4gICAgc2NoZW1hID09PSBiYXNlKSB7XG4gICAgICByZXR1cm4gYmFzZTtcbiAgICB9XG4gICAgaWYgKCFpc1NjaGVtYShzY2hlbWEpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdjb25kaXRpb25zIG11c3QgcmV0dXJuIGEgc2NoZW1hIG9iamVjdCcpO1xuICAgIHJldHVybiBzY2hlbWEucmVzb2x2ZShvcHRpb25zKTtcbiAgfVxufVxuXG5jb25zdCBwcmVmaXhlcyA9IHtcbiAgY29udGV4dDogJyQnLFxuICB2YWx1ZTogJy4nXG59O1xuZnVuY3Rpb24gY3JlYXRlJDkoa2V5LCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgUmVmZXJlbmNlKGtleSwgb3B0aW9ucyk7XG59XG5jbGFzcyBSZWZlcmVuY2Uge1xuICBjb25zdHJ1Y3RvcihrZXksIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMua2V5ID0gdm9pZCAwO1xuICAgIHRoaXMuaXNDb250ZXh0ID0gdm9pZCAwO1xuICAgIHRoaXMuaXNWYWx1ZSA9IHZvaWQgMDtcbiAgICB0aGlzLmlzU2libGluZyA9IHZvaWQgMDtcbiAgICB0aGlzLnBhdGggPSB2b2lkIDA7XG4gICAgdGhpcy5nZXR0ZXIgPSB2b2lkIDA7XG4gICAgdGhpcy5tYXAgPSB2b2lkIDA7XG4gICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdyZWYgbXVzdCBiZSBhIHN0cmluZywgZ290OiAnICsga2V5KTtcbiAgICB0aGlzLmtleSA9IGtleS50cmltKCk7XG4gICAgaWYgKGtleSA9PT0gJycpIHRocm93IG5ldyBUeXBlRXJyb3IoJ3JlZiBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuICAgIHRoaXMuaXNDb250ZXh0ID0gdGhpcy5rZXlbMF0gPT09IHByZWZpeGVzLmNvbnRleHQ7XG4gICAgdGhpcy5pc1ZhbHVlID0gdGhpcy5rZXlbMF0gPT09IHByZWZpeGVzLnZhbHVlO1xuICAgIHRoaXMuaXNTaWJsaW5nID0gIXRoaXMuaXNDb250ZXh0ICYmICF0aGlzLmlzVmFsdWU7XG4gICAgbGV0IHByZWZpeCA9IHRoaXMuaXNDb250ZXh0ID8gcHJlZml4ZXMuY29udGV4dCA6IHRoaXMuaXNWYWx1ZSA/IHByZWZpeGVzLnZhbHVlIDogJyc7XG4gICAgdGhpcy5wYXRoID0gdGhpcy5rZXkuc2xpY2UocHJlZml4Lmxlbmd0aCk7XG4gICAgdGhpcy5nZXR0ZXIgPSB0aGlzLnBhdGggJiYgZ2V0dGVyKHRoaXMucGF0aCwgdHJ1ZSk7XG4gICAgdGhpcy5tYXAgPSBvcHRpb25zLm1hcDtcbiAgfVxuICBnZXRWYWx1ZSh2YWx1ZSwgcGFyZW50LCBjb250ZXh0KSB7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuaXNDb250ZXh0ID8gY29udGV4dCA6IHRoaXMuaXNWYWx1ZSA/IHZhbHVlIDogcGFyZW50O1xuICAgIGlmICh0aGlzLmdldHRlcikgcmVzdWx0ID0gdGhpcy5nZXR0ZXIocmVzdWx0IHx8IHt9KTtcbiAgICBpZiAodGhpcy5tYXApIHJlc3VsdCA9IHRoaXMubWFwKHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9ucy5jb250ZXh0XG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9ucy5wYXJlbnRcbiAgICovXG4gIGNhc3QodmFsdWUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRWYWx1ZSh2YWx1ZSwgb3B0aW9ucyA9PSBudWxsID8gdm9pZCAwIDogb3B0aW9ucy5wYXJlbnQsIG9wdGlvbnMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdGlvbnMuY29udGV4dCk7XG4gIH1cbiAgcmVzb2x2ZSgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBkZXNjcmliZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ3JlZicsXG4gICAgICBrZXk6IHRoaXMua2V5XG4gICAgfTtcbiAgfVxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gYFJlZigke3RoaXMua2V5fSlgO1xuICB9XG4gIHN0YXRpYyBpc1JlZih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZS5fX2lzWXVwUmVmO1xuICB9XG59XG5cbi8vIEB0cy1pZ25vcmVcblJlZmVyZW5jZS5wcm90b3R5cGUuX19pc1l1cFJlZiA9IHRydWU7XG5cbmNvbnN0IGlzQWJzZW50ID0gdmFsdWUgPT4gdmFsdWUgPT0gbnVsbDtcblxuZnVuY3Rpb24gY3JlYXRlVmFsaWRhdGlvbihjb25maWcpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUoe1xuICAgIHZhbHVlLFxuICAgIHBhdGggPSAnJyxcbiAgICBvcHRpb25zLFxuICAgIG9yaWdpbmFsVmFsdWUsXG4gICAgc2NoZW1hXG4gIH0sIHBhbmljLCBuZXh0KSB7XG4gICAgY29uc3Qge1xuICAgICAgbmFtZSxcbiAgICAgIHRlc3QsXG4gICAgICBwYXJhbXMsXG4gICAgICBtZXNzYWdlLFxuICAgICAgc2tpcEFic2VudFxuICAgIH0gPSBjb25maWc7XG4gICAgbGV0IHtcbiAgICAgIHBhcmVudCxcbiAgICAgIGNvbnRleHQsXG4gICAgICBhYm9ydEVhcmx5ID0gc2NoZW1hLnNwZWMuYWJvcnRFYXJseVxuICAgIH0gPSBvcHRpb25zO1xuICAgIGZ1bmN0aW9uIHJlc29sdmUoaXRlbSkge1xuICAgICAgcmV0dXJuIFJlZmVyZW5jZS5pc1JlZihpdGVtKSA/IGl0ZW0uZ2V0VmFsdWUodmFsdWUsIHBhcmVudCwgY29udGV4dCkgOiBpdGVtO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVFcnJvcihvdmVycmlkZXMgPSB7fSkge1xuICAgICAgY29uc3QgbmV4dFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICB2YWx1ZSxcbiAgICAgICAgb3JpZ2luYWxWYWx1ZSxcbiAgICAgICAgbGFiZWw6IHNjaGVtYS5zcGVjLmxhYmVsLFxuICAgICAgICBwYXRoOiBvdmVycmlkZXMucGF0aCB8fCBwYXRoLFxuICAgICAgICBzcGVjOiBzY2hlbWEuc3BlY1xuICAgICAgfSwgcGFyYW1zLCBvdmVycmlkZXMucGFyYW1zKTtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG5leHRQYXJhbXMpKSBuZXh0UGFyYW1zW2tleV0gPSByZXNvbHZlKG5leHRQYXJhbXNba2V5XSk7XG4gICAgICBjb25zdCBlcnJvciA9IG5ldyBWYWxpZGF0aW9uRXJyb3IoVmFsaWRhdGlvbkVycm9yLmZvcm1hdEVycm9yKG92ZXJyaWRlcy5tZXNzYWdlIHx8IG1lc3NhZ2UsIG5leHRQYXJhbXMpLCB2YWx1ZSwgbmV4dFBhcmFtcy5wYXRoLCBvdmVycmlkZXMudHlwZSB8fCBuYW1lKTtcbiAgICAgIGVycm9yLnBhcmFtcyA9IG5leHRQYXJhbXM7XG4gICAgICByZXR1cm4gZXJyb3I7XG4gICAgfVxuICAgIGNvbnN0IGludmFsaWQgPSBhYm9ydEVhcmx5ID8gcGFuaWMgOiBuZXh0O1xuICAgIGxldCBjdHggPSB7XG4gICAgICBwYXRoLFxuICAgICAgcGFyZW50LFxuICAgICAgdHlwZTogbmFtZSxcbiAgICAgIGZyb206IG9wdGlvbnMuZnJvbSxcbiAgICAgIGNyZWF0ZUVycm9yLFxuICAgICAgcmVzb2x2ZSxcbiAgICAgIG9wdGlvbnMsXG4gICAgICBvcmlnaW5hbFZhbHVlLFxuICAgICAgc2NoZW1hXG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVSZXN1bHQgPSB2YWxpZE9yRXJyb3IgPT4ge1xuICAgICAgaWYgKFZhbGlkYXRpb25FcnJvci5pc0Vycm9yKHZhbGlkT3JFcnJvcikpIGludmFsaWQodmFsaWRPckVycm9yKTtlbHNlIGlmICghdmFsaWRPckVycm9yKSBpbnZhbGlkKGNyZWF0ZUVycm9yKCkpO2Vsc2UgbmV4dChudWxsKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUVycm9yID0gZXJyID0+IHtcbiAgICAgIGlmIChWYWxpZGF0aW9uRXJyb3IuaXNFcnJvcihlcnIpKSBpbnZhbGlkKGVycik7ZWxzZSBwYW5pYyhlcnIpO1xuICAgIH07XG4gICAgY29uc3Qgc2hvdWxkU2tpcCA9IHNraXBBYnNlbnQgJiYgaXNBYnNlbnQodmFsdWUpO1xuICAgIGlmICghb3B0aW9ucy5zeW5jKSB7XG4gICAgICB0cnkge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoIXNob3VsZFNraXAgPyB0ZXN0LmNhbGwoY3R4LCB2YWx1ZSwgY3R4KSA6IHRydWUpLnRoZW4oaGFuZGxlUmVzdWx0LCBoYW5kbGVFcnJvcik7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgaGFuZGxlRXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHJlc3VsdDtcbiAgICB0cnkge1xuICAgICAgdmFyIF9yZXN1bHQ7XG4gICAgICByZXN1bHQgPSAhc2hvdWxkU2tpcCA/IHRlc3QuY2FsbChjdHgsIHZhbHVlLCBjdHgpIDogdHJ1ZTtcbiAgICAgIGlmICh0eXBlb2YgKChfcmVzdWx0ID0gcmVzdWx0KSA9PSBudWxsID8gdm9pZCAwIDogX3Jlc3VsdC50aGVuKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFZhbGlkYXRpb24gdGVzdCBvZiB0eXBlOiBcIiR7Y3R4LnR5cGV9XCIgcmV0dXJuZWQgYSBQcm9taXNlIGR1cmluZyBhIHN5bmNocm9ub3VzIHZhbGlkYXRlLiBgICsgYFRoaXMgdGVzdCB3aWxsIGZpbmlzaCBhZnRlciB0aGUgdmFsaWRhdGUgY2FsbCBoYXMgcmV0dXJuZWRgKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGhhbmRsZUVycm9yKGVycik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhhbmRsZVJlc3VsdChyZXN1bHQpO1xuICB9XG4gIHZhbGlkYXRlLk9QVElPTlMgPSBjb25maWc7XG4gIHJldHVybiB2YWxpZGF0ZTtcbn1cblxuZnVuY3Rpb24gZ2V0SW4oc2NoZW1hLCBwYXRoLCB2YWx1ZSwgY29udGV4dCA9IHZhbHVlKSB7XG4gIGxldCBwYXJlbnQsIGxhc3RQYXJ0LCBsYXN0UGFydERlYnVnO1xuXG4gIC8vIHJvb3QgcGF0aDogJydcbiAgaWYgKCFwYXRoKSByZXR1cm4ge1xuICAgIHBhcmVudCxcbiAgICBwYXJlbnRQYXRoOiBwYXRoLFxuICAgIHNjaGVtYVxuICB9O1xuICBmb3JFYWNoKHBhdGgsIChfcGFydCwgaXNCcmFja2V0LCBpc0FycmF5KSA9PiB7XG4gICAgbGV0IHBhcnQgPSBpc0JyYWNrZXQgPyBfcGFydC5zbGljZSgxLCBfcGFydC5sZW5ndGggLSAxKSA6IF9wYXJ0O1xuICAgIHNjaGVtYSA9IHNjaGVtYS5yZXNvbHZlKHtcbiAgICAgIGNvbnRleHQsXG4gICAgICBwYXJlbnQsXG4gICAgICB2YWx1ZVxuICAgIH0pO1xuICAgIGxldCBpc1R1cGxlID0gc2NoZW1hLnR5cGUgPT09ICd0dXBsZSc7XG4gICAgbGV0IGlkeCA9IGlzQXJyYXkgPyBwYXJzZUludChwYXJ0LCAxMCkgOiAwO1xuICAgIGlmIChzY2hlbWEuaW5uZXJUeXBlIHx8IGlzVHVwbGUpIHtcbiAgICAgIGlmIChpc1R1cGxlICYmICFpc0FycmF5KSB0aHJvdyBuZXcgRXJyb3IoYFl1cC5yZWFjaCBjYW5ub3QgaW1wbGljaXRseSBpbmRleCBpbnRvIGEgdHVwbGUgdHlwZS4gdGhlIHBhdGggcGFydCBcIiR7bGFzdFBhcnREZWJ1Z31cIiBtdXN0IGNvbnRhaW4gYW4gaW5kZXggdG8gdGhlIHR1cGxlIGVsZW1lbnQsIGUuZy4gXCIke2xhc3RQYXJ0RGVidWd9WzBdXCJgKTtcbiAgICAgIGlmICh2YWx1ZSAmJiBpZHggPj0gdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgWXVwLnJlYWNoIGNhbm5vdCByZXNvbHZlIGFuIGFycmF5IGl0ZW0gYXQgaW5kZXg6ICR7X3BhcnR9LCBpbiB0aGUgcGF0aDogJHtwYXRofS4gYCArIGBiZWNhdXNlIHRoZXJlIGlzIG5vIHZhbHVlIGF0IHRoYXQgaW5kZXguIGApO1xuICAgICAgfVxuICAgICAgcGFyZW50ID0gdmFsdWU7XG4gICAgICB2YWx1ZSA9IHZhbHVlICYmIHZhbHVlW2lkeF07XG4gICAgICBzY2hlbWEgPSBpc1R1cGxlID8gc2NoZW1hLnNwZWMudHlwZXNbaWR4XSA6IHNjaGVtYS5pbm5lclR5cGU7XG4gICAgfVxuXG4gICAgLy8gc29tZXRpbWVzIHRoZSBhcnJheSBpbmRleCBwYXJ0IG9mIGEgcGF0aCBkb2Vzbid0IGV4aXN0OiBcIm5lc3RlZC5hcnIuY2hpbGRcIlxuICAgIC8vIGluIHRoZXNlIGNhc2VzIHRoZSBjdXJyZW50IHBhcnQgaXMgdGhlIG5leHQgc2NoZW1hIGFuZCBzaG91bGQgYmUgcHJvY2Vzc2VkXG4gICAgLy8gaW4gdGhpcyBpdGVyYXRpb24uIEZvciBjYXNlcyB3aGVyZSB0aGUgaW5kZXggc2lnbmF0dXJlIGlzIGluY2x1ZGVkIHRoaXNcbiAgICAvLyBjaGVjayB3aWxsIGZhaWwgYW5kIHdlJ2xsIGhhbmRsZSB0aGUgYGNoaWxkYCBwYXJ0IG9uIHRoZSBuZXh0IGl0ZXJhdGlvbiBsaWtlIG5vcm1hbFxuICAgIGlmICghaXNBcnJheSkge1xuICAgICAgaWYgKCFzY2hlbWEuZmllbGRzIHx8ICFzY2hlbWEuZmllbGRzW3BhcnRdKSB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzY2hlbWEgZG9lcyBub3QgY29udGFpbiB0aGUgcGF0aDogJHtwYXRofS4gYCArIGAoZmFpbGVkIGF0OiAke2xhc3RQYXJ0RGVidWd9IHdoaWNoIGlzIGEgdHlwZTogXCIke3NjaGVtYS50eXBlfVwiKWApO1xuICAgICAgcGFyZW50ID0gdmFsdWU7XG4gICAgICB2YWx1ZSA9IHZhbHVlICYmIHZhbHVlW3BhcnRdO1xuICAgICAgc2NoZW1hID0gc2NoZW1hLmZpZWxkc1twYXJ0XTtcbiAgICB9XG4gICAgbGFzdFBhcnQgPSBwYXJ0O1xuICAgIGxhc3RQYXJ0RGVidWcgPSBpc0JyYWNrZXQgPyAnWycgKyBfcGFydCArICddJyA6ICcuJyArIF9wYXJ0O1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICBzY2hlbWEsXG4gICAgcGFyZW50LFxuICAgIHBhcmVudFBhdGg6IGxhc3RQYXJ0XG4gIH07XG59XG5mdW5jdGlvbiByZWFjaChvYmosIHBhdGgsIHZhbHVlLCBjb250ZXh0KSB7XG4gIHJldHVybiBnZXRJbihvYmosIHBhdGgsIHZhbHVlLCBjb250ZXh0KS5zY2hlbWE7XG59XG5cbmNsYXNzIFJlZmVyZW5jZVNldCBleHRlbmRzIFNldCB7XG4gIGRlc2NyaWJlKCkge1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gW107XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMudmFsdWVzKCkpIHtcbiAgICAgIGRlc2NyaXB0aW9uLnB1c2goUmVmZXJlbmNlLmlzUmVmKGl0ZW0pID8gaXRlbS5kZXNjcmliZSgpIDogaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgfVxuICByZXNvbHZlQWxsKHJlc29sdmUpIHtcbiAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMudmFsdWVzKCkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHJlc29sdmUoaXRlbSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgUmVmZXJlbmNlU2V0KHRoaXMudmFsdWVzKCkpO1xuICB9XG4gIG1lcmdlKG5ld0l0ZW1zLCByZW1vdmVJdGVtcykge1xuICAgIGNvbnN0IG5leHQgPSB0aGlzLmNsb25lKCk7XG4gICAgbmV3SXRlbXMuZm9yRWFjaCh2YWx1ZSA9PiBuZXh0LmFkZCh2YWx1ZSkpO1xuICAgIHJlbW92ZUl0ZW1zLmZvckVhY2godmFsdWUgPT4gbmV4dC5kZWxldGUodmFsdWUpKTtcbiAgICByZXR1cm4gbmV4dDtcbiAgfVxufVxuXG4vLyB0d2Vha2VkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL0tlbGluMjAyNS9uYW5vY2xvbmUvYmxvYi8wYWJlYjc2MzViZGE5YjY4ZWYyMjc3MDkzZjc2ZGJlM2JmMzk0OGUxL3NyYy9pbmRleC5qc1xuZnVuY3Rpb24gY2xvbmUoc3JjLCBzZWVuID0gbmV3IE1hcCgpKSB7XG4gIGlmIChpc1NjaGVtYShzcmMpIHx8ICFzcmMgfHwgdHlwZW9mIHNyYyAhPT0gJ29iamVjdCcpIHJldHVybiBzcmM7XG4gIGlmIChzZWVuLmhhcyhzcmMpKSByZXR1cm4gc2Vlbi5nZXQoc3JjKTtcbiAgbGV0IGNvcHk7XG4gIGlmIChzcmMgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgLy8gRGF0ZVxuICAgIGNvcHkgPSBuZXcgRGF0ZShzcmMuZ2V0VGltZSgpKTtcbiAgICBzZWVuLnNldChzcmMsIGNvcHkpO1xuICB9IGVsc2UgaWYgKHNyYyBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIC8vIFJlZ0V4cFxuICAgIGNvcHkgPSBuZXcgUmVnRXhwKHNyYyk7XG4gICAgc2Vlbi5zZXQoc3JjLCBjb3B5KTtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHNyYykpIHtcbiAgICAvLyBBcnJheVxuICAgIGNvcHkgPSBuZXcgQXJyYXkoc3JjLmxlbmd0aCk7XG4gICAgc2Vlbi5zZXQoc3JjLCBjb3B5KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNyYy5sZW5ndGg7IGkrKykgY29weVtpXSA9IGNsb25lKHNyY1tpXSwgc2Vlbik7XG4gIH0gZWxzZSBpZiAoc3JjIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgLy8gTWFwXG4gICAgY29weSA9IG5ldyBNYXAoKTtcbiAgICBzZWVuLnNldChzcmMsIGNvcHkpO1xuICAgIGZvciAoY29uc3QgW2ssIHZdIG9mIHNyYy5lbnRyaWVzKCkpIGNvcHkuc2V0KGssIGNsb25lKHYsIHNlZW4pKTtcbiAgfSBlbHNlIGlmIChzcmMgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAvLyBTZXRcbiAgICBjb3B5ID0gbmV3IFNldCgpO1xuICAgIHNlZW4uc2V0KHNyYywgY29weSk7XG4gICAgZm9yIChjb25zdCB2IG9mIHNyYykgY29weS5hZGQoY2xvbmUodiwgc2VlbikpO1xuICB9IGVsc2UgaWYgKHNyYyBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgIC8vIE9iamVjdFxuICAgIGNvcHkgPSB7fTtcbiAgICBzZWVuLnNldChzcmMsIGNvcHkpO1xuICAgIGZvciAoY29uc3QgW2ssIHZdIG9mIE9iamVjdC5lbnRyaWVzKHNyYykpIGNvcHlba10gPSBjbG9uZSh2LCBzZWVuKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBFcnJvcihgVW5hYmxlIHRvIGNsb25lICR7c3JjfWApO1xuICB9XG4gIHJldHVybiBjb3B5O1xufVxuXG5jbGFzcyBTY2hlbWEge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy50eXBlID0gdm9pZCAwO1xuICAgIHRoaXMuZGVwcyA9IFtdO1xuICAgIHRoaXMudGVzdHMgPSB2b2lkIDA7XG4gICAgdGhpcy50cmFuc2Zvcm1zID0gdm9pZCAwO1xuICAgIHRoaXMuY29uZGl0aW9ucyA9IFtdO1xuICAgIHRoaXMuX211dGF0ZSA9IHZvaWQgMDtcbiAgICB0aGlzLmludGVybmFsVGVzdHMgPSB7fTtcbiAgICB0aGlzLl93aGl0ZWxpc3QgPSBuZXcgUmVmZXJlbmNlU2V0KCk7XG4gICAgdGhpcy5fYmxhY2tsaXN0ID0gbmV3IFJlZmVyZW5jZVNldCgpO1xuICAgIHRoaXMuZXhjbHVzaXZlVGVzdHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX3R5cGVDaGVjayA9IHZvaWQgMDtcbiAgICB0aGlzLnNwZWMgPSB2b2lkIDA7XG4gICAgdGhpcy50ZXN0cyA9IFtdO1xuICAgIHRoaXMudHJhbnNmb3JtcyA9IFtdO1xuICAgIHRoaXMud2l0aE11dGF0aW9uKCgpID0+IHtcbiAgICAgIHRoaXMudHlwZUVycm9yKG1peGVkLm5vdFR5cGUpO1xuICAgIH0pO1xuICAgIHRoaXMudHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgICB0aGlzLl90eXBlQ2hlY2sgPSBvcHRpb25zLmNoZWNrO1xuICAgIHRoaXMuc3BlYyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgc3RyaXA6IGZhbHNlLFxuICAgICAgc3RyaWN0OiBmYWxzZSxcbiAgICAgIGFib3J0RWFybHk6IHRydWUsXG4gICAgICByZWN1cnNpdmU6IHRydWUsXG4gICAgICBudWxsYWJsZTogZmFsc2UsXG4gICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgIGNvZXJjZTogdHJ1ZVxuICAgIH0sIG9wdGlvbnMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdGlvbnMuc3BlYyk7XG4gICAgdGhpcy53aXRoTXV0YXRpb24ocyA9PiB7XG4gICAgICBzLm5vbk51bGxhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBUT0RPOiByZW1vdmVcbiAgZ2V0IF90eXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cbiAgY2xvbmUoc3BlYykge1xuICAgIGlmICh0aGlzLl9tdXRhdGUpIHtcbiAgICAgIGlmIChzcGVjKSBPYmplY3QuYXNzaWduKHRoaXMuc3BlYywgc3BlYyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgbmVzdGVkIHZhbHVlIGlzIGEgc2NoZW1hIHdlIGNhbiBza2lwIGNsb25pbmcsIHNpbmNlXG4gICAgLy8gdGhleSBhcmUgYWxyZWFkeSBpbW11dGFibGVcbiAgICBjb25zdCBuZXh0ID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykpO1xuXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciB0aGlzIGlzIHJlYWRvbmx5XG4gICAgbmV4dC50eXBlID0gdGhpcy50eXBlO1xuICAgIG5leHQuX3R5cGVDaGVjayA9IHRoaXMuX3R5cGVDaGVjaztcbiAgICBuZXh0Ll93aGl0ZWxpc3QgPSB0aGlzLl93aGl0ZWxpc3QuY2xvbmUoKTtcbiAgICBuZXh0Ll9ibGFja2xpc3QgPSB0aGlzLl9ibGFja2xpc3QuY2xvbmUoKTtcbiAgICBuZXh0LmludGVybmFsVGVzdHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmludGVybmFsVGVzdHMpO1xuICAgIG5leHQuZXhjbHVzaXZlVGVzdHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmV4Y2x1c2l2ZVRlc3RzKTtcblxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgdGhpcyBpcyByZWFkb25seVxuICAgIG5leHQuZGVwcyA9IFsuLi50aGlzLmRlcHNdO1xuICAgIG5leHQuY29uZGl0aW9ucyA9IFsuLi50aGlzLmNvbmRpdGlvbnNdO1xuICAgIG5leHQudGVzdHMgPSBbLi4udGhpcy50ZXN0c107XG4gICAgbmV4dC50cmFuc2Zvcm1zID0gWy4uLnRoaXMudHJhbnNmb3Jtc107XG4gICAgbmV4dC5zcGVjID0gY2xvbmUoT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zcGVjLCBzcGVjKSk7XG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cbiAgbGFiZWwobGFiZWwpIHtcbiAgICBsZXQgbmV4dCA9IHRoaXMuY2xvbmUoKTtcbiAgICBuZXh0LnNwZWMubGFiZWwgPSBsYWJlbDtcbiAgICByZXR1cm4gbmV4dDtcbiAgfVxuICBtZXRhKC4uLmFyZ3MpIHtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHJldHVybiB0aGlzLnNwZWMubWV0YTtcbiAgICBsZXQgbmV4dCA9IHRoaXMuY2xvbmUoKTtcbiAgICBuZXh0LnNwZWMubWV0YSA9IE9iamVjdC5hc3NpZ24obmV4dC5zcGVjLm1ldGEgfHwge30sIGFyZ3NbMF0pO1xuICAgIHJldHVybiBuZXh0O1xuICB9XG4gIHdpdGhNdXRhdGlvbihmbikge1xuICAgIGxldCBiZWZvcmUgPSB0aGlzLl9tdXRhdGU7XG4gICAgdGhpcy5fbXV0YXRlID0gdHJ1ZTtcbiAgICBsZXQgcmVzdWx0ID0gZm4odGhpcyk7XG4gICAgdGhpcy5fbXV0YXRlID0gYmVmb3JlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgY29uY2F0KHNjaGVtYSkge1xuICAgIGlmICghc2NoZW1hIHx8IHNjaGVtYSA9PT0gdGhpcykgcmV0dXJuIHRoaXM7XG4gICAgaWYgKHNjaGVtYS50eXBlICE9PSB0aGlzLnR5cGUgJiYgdGhpcy50eXBlICE9PSAnbWl4ZWQnKSB0aHJvdyBuZXcgVHlwZUVycm9yKGBZb3UgY2Fubm90IFxcYGNvbmNhdCgpXFxgIHNjaGVtYSdzIG9mIGRpZmZlcmVudCB0eXBlczogJHt0aGlzLnR5cGV9IGFuZCAke3NjaGVtYS50eXBlfWApO1xuICAgIGxldCBiYXNlID0gdGhpcztcbiAgICBsZXQgY29tYmluZWQgPSBzY2hlbWEuY2xvbmUoKTtcbiAgICBjb25zdCBtZXJnZWRTcGVjID0gT2JqZWN0LmFzc2lnbih7fSwgYmFzZS5zcGVjLCBjb21iaW5lZC5zcGVjKTtcbiAgICBjb21iaW5lZC5zcGVjID0gbWVyZ2VkU3BlYztcbiAgICBjb21iaW5lZC5pbnRlcm5hbFRlc3RzID0gT2JqZWN0LmFzc2lnbih7fSwgYmFzZS5pbnRlcm5hbFRlc3RzLCBjb21iaW5lZC5pbnRlcm5hbFRlc3RzKTtcblxuICAgIC8vIG1hbnVhbGx5IG1lcmdlIHRoZSBibGFja2xpc3Qvd2hpdGVsaXN0ICh0aGUgb3RoZXIgYHNjaGVtYWAgdGFrZXNcbiAgICAvLyBwcmVjZWRlbmNlIGluIGNhc2Ugb2YgY29uZmxpY3RzKVxuICAgIGNvbWJpbmVkLl93aGl0ZWxpc3QgPSBiYXNlLl93aGl0ZWxpc3QubWVyZ2Uoc2NoZW1hLl93aGl0ZWxpc3QsIHNjaGVtYS5fYmxhY2tsaXN0KTtcbiAgICBjb21iaW5lZC5fYmxhY2tsaXN0ID0gYmFzZS5fYmxhY2tsaXN0Lm1lcmdlKHNjaGVtYS5fYmxhY2tsaXN0LCBzY2hlbWEuX3doaXRlbGlzdCk7XG5cbiAgICAvLyBzdGFydCB3aXRoIHRoZSBjdXJyZW50IHRlc3RzXG4gICAgY29tYmluZWQudGVzdHMgPSBiYXNlLnRlc3RzO1xuICAgIGNvbWJpbmVkLmV4Y2x1c2l2ZVRlc3RzID0gYmFzZS5leGNsdXNpdmVUZXN0cztcblxuICAgIC8vIG1hbnVhbGx5IGFkZCB0aGUgbmV3IHRlc3RzIHRvIGVuc3VyZVxuICAgIC8vIHRoZSBkZWR1cGluZyBsb2dpYyBpcyBjb25zaXN0ZW50XG4gICAgY29tYmluZWQud2l0aE11dGF0aW9uKG5leHQgPT4ge1xuICAgICAgc2NoZW1hLnRlc3RzLmZvckVhY2goZm4gPT4ge1xuICAgICAgICBuZXh0LnRlc3QoZm4uT1BUSU9OUyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBjb21iaW5lZC50cmFuc2Zvcm1zID0gWy4uLmJhc2UudHJhbnNmb3JtcywgLi4uY29tYmluZWQudHJhbnNmb3Jtc107XG4gICAgcmV0dXJuIGNvbWJpbmVkO1xuICB9XG4gIGlzVHlwZSh2KSB7XG4gICAgaWYgKHYgPT0gbnVsbCkge1xuICAgICAgaWYgKHRoaXMuc3BlYy5udWxsYWJsZSAmJiB2ID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLnNwZWMub3B0aW9uYWwgJiYgdiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3R5cGVDaGVjayh2KTtcbiAgfVxuICByZXNvbHZlKG9wdGlvbnMpIHtcbiAgICBsZXQgc2NoZW1hID0gdGhpcztcbiAgICBpZiAoc2NoZW1hLmNvbmRpdGlvbnMubGVuZ3RoKSB7XG4gICAgICBsZXQgY29uZGl0aW9ucyA9IHNjaGVtYS5jb25kaXRpb25zO1xuICAgICAgc2NoZW1hID0gc2NoZW1hLmNsb25lKCk7XG4gICAgICBzY2hlbWEuY29uZGl0aW9ucyA9IFtdO1xuICAgICAgc2NoZW1hID0gY29uZGl0aW9ucy5yZWR1Y2UoKHByZXZTY2hlbWEsIGNvbmRpdGlvbikgPT4gY29uZGl0aW9uLnJlc29sdmUocHJldlNjaGVtYSwgb3B0aW9ucyksIHNjaGVtYSk7XG4gICAgICBzY2hlbWEgPSBzY2hlbWEucmVzb2x2ZShvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHNjaGVtYTtcbiAgfVxuICByZXNvbHZlT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgdmFyIF9vcHRpb25zJHN0cmljdCwgX29wdGlvbnMkYWJvcnRFYXJseSwgX29wdGlvbnMkcmVjdXJzaXZlO1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7XG4gICAgICBmcm9tOiBvcHRpb25zLmZyb20gfHwgW10sXG4gICAgICBzdHJpY3Q6IChfb3B0aW9ucyRzdHJpY3QgPSBvcHRpb25zLnN0cmljdCkgIT0gbnVsbCA/IF9vcHRpb25zJHN0cmljdCA6IHRoaXMuc3BlYy5zdHJpY3QsXG4gICAgICBhYm9ydEVhcmx5OiAoX29wdGlvbnMkYWJvcnRFYXJseSA9IG9wdGlvbnMuYWJvcnRFYXJseSkgIT0gbnVsbCA/IF9vcHRpb25zJGFib3J0RWFybHkgOiB0aGlzLnNwZWMuYWJvcnRFYXJseSxcbiAgICAgIHJlY3Vyc2l2ZTogKF9vcHRpb25zJHJlY3Vyc2l2ZSA9IG9wdGlvbnMucmVjdXJzaXZlKSAhPSBudWxsID8gX29wdGlvbnMkcmVjdXJzaXZlIDogdGhpcy5zcGVjLnJlY3Vyc2l2ZVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1biB0aGUgY29uZmlndXJlZCB0cmFuc2Zvcm0gcGlwZWxpbmUgb3ZlciBhbiBpbnB1dCB2YWx1ZS5cbiAgICovXG5cbiAgY2FzdCh2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IHJlc29sdmVkU2NoZW1hID0gdGhpcy5yZXNvbHZlKE9iamVjdC5hc3NpZ24oe1xuICAgICAgdmFsdWVcbiAgICB9LCBvcHRpb25zKSk7XG4gICAgbGV0IGFsbG93T3B0aW9uYWxpdHkgPSBvcHRpb25zLmFzc2VydCA9PT0gJ2lnbm9yZS1vcHRpb25hbGl0eSc7XG4gICAgbGV0IHJlc3VsdCA9IHJlc29sdmVkU2NoZW1hLl9jYXN0KHZhbHVlLCBvcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucy5hc3NlcnQgIT09IGZhbHNlICYmICFyZXNvbHZlZFNjaGVtYS5pc1R5cGUocmVzdWx0KSkge1xuICAgICAgaWYgKGFsbG93T3B0aW9uYWxpdHkgJiYgaXNBYnNlbnQocmVzdWx0KSkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgbGV0IGZvcm1hdHRlZFZhbHVlID0gcHJpbnRWYWx1ZSh2YWx1ZSk7XG4gICAgICBsZXQgZm9ybWF0dGVkUmVzdWx0ID0gcHJpbnRWYWx1ZShyZXN1bHQpO1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlIHZhbHVlIG9mICR7b3B0aW9ucy5wYXRoIHx8ICdmaWVsZCd9IGNvdWxkIG5vdCBiZSBjYXN0IHRvIGEgdmFsdWUgYCArIGB0aGF0IHNhdGlzZmllcyB0aGUgc2NoZW1hIHR5cGU6IFwiJHtyZXNvbHZlZFNjaGVtYS50eXBlfVwiLiBcXG5cXG5gICsgYGF0dGVtcHRlZCB2YWx1ZTogJHtmb3JtYXR0ZWRWYWx1ZX0gXFxuYCArIChmb3JtYXR0ZWRSZXN1bHQgIT09IGZvcm1hdHRlZFZhbHVlID8gYHJlc3VsdCBvZiBjYXN0OiAke2Zvcm1hdHRlZFJlc3VsdH1gIDogJycpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBfY2FzdChyYXdWYWx1ZSwgX29wdGlvbnMpIHtcbiAgICBsZXQgdmFsdWUgPSByYXdWYWx1ZSA9PT0gdW5kZWZpbmVkID8gcmF3VmFsdWUgOiB0aGlzLnRyYW5zZm9ybXMucmVkdWNlKChwcmV2VmFsdWUsIGZuKSA9PiBmbi5jYWxsKHRoaXMsIHByZXZWYWx1ZSwgcmF3VmFsdWUsIHRoaXMpLCByYXdWYWx1ZSk7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5nZXREZWZhdWx0KCk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBfdmFsaWRhdGUoX3ZhbHVlLCBvcHRpb25zID0ge30sIHBhbmljLCBuZXh0KSB7XG4gICAgbGV0IHtcbiAgICAgIHBhdGgsXG4gICAgICBvcmlnaW5hbFZhbHVlID0gX3ZhbHVlLFxuICAgICAgc3RyaWN0ID0gdGhpcy5zcGVjLnN0cmljdFxuICAgIH0gPSBvcHRpb25zO1xuICAgIGxldCB2YWx1ZSA9IF92YWx1ZTtcbiAgICBpZiAoIXN0cmljdCkge1xuICAgICAgdmFsdWUgPSB0aGlzLl9jYXN0KHZhbHVlLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgYXNzZXJ0OiBmYWxzZVxuICAgICAgfSwgb3B0aW9ucykpO1xuICAgIH1cbiAgICBsZXQgaW5pdGlhbFRlc3RzID0gW107XG4gICAgZm9yIChsZXQgdGVzdCBvZiBPYmplY3QudmFsdWVzKHRoaXMuaW50ZXJuYWxUZXN0cykpIHtcbiAgICAgIGlmICh0ZXN0KSBpbml0aWFsVGVzdHMucHVzaCh0ZXN0KTtcbiAgICB9XG4gICAgdGhpcy5ydW5UZXN0cyh7XG4gICAgICBwYXRoLFxuICAgICAgdmFsdWUsXG4gICAgICBvcmlnaW5hbFZhbHVlLFxuICAgICAgb3B0aW9ucyxcbiAgICAgIHRlc3RzOiBpbml0aWFsVGVzdHNcbiAgICB9LCBwYW5pYywgaW5pdGlhbEVycm9ycyA9PiB7XG4gICAgICAvLyBldmVuIGlmIHdlIGFyZW4ndCBlbmRpbmcgZWFybHkgd2UgY2FuJ3QgcHJvY2VlZCBmdXJ0aGVyIGlmIHRoZSB0eXBlcyBhcmVuJ3QgY29ycmVjdFxuICAgICAgaWYgKGluaXRpYWxFcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBuZXh0KGluaXRpYWxFcnJvcnMsIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucnVuVGVzdHMoe1xuICAgICAgICBwYXRoLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgb3JpZ2luYWxWYWx1ZSxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgdGVzdHM6IHRoaXMudGVzdHNcbiAgICAgIH0sIHBhbmljLCBuZXh0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyBhIHNldCBvZiB2YWxpZGF0aW9ucywgZWl0aGVyIHNjaGVtYSwgcHJvZHVjZWQgVGVzdHMgb3IgYSBuZXN0ZWRcbiAgICogc2NoZW1hIHZhbGlkYXRlIHJlc3VsdC5cbiAgICovXG4gIHJ1blRlc3RzKHJ1bk9wdGlvbnMsIHBhbmljLCBuZXh0KSB7XG4gICAgbGV0IGZpcmVkID0gZmFsc2U7XG4gICAgbGV0IHtcbiAgICAgIHRlc3RzLFxuICAgICAgdmFsdWUsXG4gICAgICBvcmlnaW5hbFZhbHVlLFxuICAgICAgcGF0aCxcbiAgICAgIG9wdGlvbnNcbiAgICB9ID0gcnVuT3B0aW9ucztcbiAgICBsZXQgcGFuaWNPbmNlID0gYXJnID0+IHtcbiAgICAgIGlmIChmaXJlZCkgcmV0dXJuO1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgcGFuaWMoYXJnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBsZXQgbmV4dE9uY2UgPSBhcmcgPT4ge1xuICAgICAgaWYgKGZpcmVkKSByZXR1cm47XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBuZXh0KGFyZywgdmFsdWUpO1xuICAgIH07XG4gICAgbGV0IGNvdW50ID0gdGVzdHMubGVuZ3RoO1xuICAgIGxldCBuZXN0ZWRFcnJvcnMgPSBbXTtcbiAgICBpZiAoIWNvdW50KSByZXR1cm4gbmV4dE9uY2UoW10pO1xuICAgIGxldCBhcmdzID0ge1xuICAgICAgdmFsdWUsXG4gICAgICBvcmlnaW5hbFZhbHVlLFxuICAgICAgcGF0aCxcbiAgICAgIG9wdGlvbnMsXG4gICAgICBzY2hlbWE6IHRoaXNcbiAgICB9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVzdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHRlc3QgPSB0ZXN0c1tpXTtcbiAgICAgIHRlc3QoYXJncywgcGFuaWNPbmNlLCBmdW5jdGlvbiBmaW5pc2hUZXN0UnVuKGVycikge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgbmVzdGVkRXJyb3JzID0gbmVzdGVkRXJyb3JzLmNvbmNhdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgtLWNvdW50IDw9IDApIHtcbiAgICAgICAgICBuZXh0T25jZShuZXN0ZWRFcnJvcnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgYXNOZXN0ZWRUZXN0KHtcbiAgICBrZXksXG4gICAgaW5kZXgsXG4gICAgcGFyZW50LFxuICAgIHBhcmVudFBhdGgsXG4gICAgb3JpZ2luYWxQYXJlbnQsXG4gICAgb3B0aW9uc1xuICB9KSB7XG4gICAgY29uc3QgayA9IGtleSAhPSBudWxsID8ga2V5IDogaW5kZXg7XG4gICAgaWYgKGsgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdNdXN0IGluY2x1ZGUgYGtleWAgb3IgYGluZGV4YCBmb3IgbmVzdGVkIHZhbGlkYXRpb25zJyk7XG4gICAgfVxuICAgIGNvbnN0IGlzSW5kZXggPSB0eXBlb2YgayA9PT0gJ251bWJlcic7XG4gICAgbGV0IHZhbHVlID0gcGFyZW50W2tdO1xuICAgIGNvbnN0IHRlc3RPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge1xuICAgICAgLy8gTmVzdGVkIHZhbGlkYXRpb25zIGZpZWxkcyBhcmUgYWx3YXlzIHN0cmljdDpcbiAgICAgIC8vICAgIDEuIHBhcmVudCBpc24ndCBzdHJpY3Qgc28gdGhlIGNhc3Rpbmcgd2lsbCBhbHNvIGhhdmUgY2FzdCBpbm5lciB2YWx1ZXNcbiAgICAgIC8vICAgIDIuIHBhcmVudCBpcyBzdHJpY3QgaW4gd2hpY2ggY2FzZSB0aGUgbmVzdGVkIHZhbHVlcyB3ZXJlbid0IGNhc3QgZWl0aGVyXG4gICAgICBzdHJpY3Q6IHRydWUsXG4gICAgICBwYXJlbnQsXG4gICAgICB2YWx1ZSxcbiAgICAgIG9yaWdpbmFsVmFsdWU6IG9yaWdpbmFsUGFyZW50W2tdLFxuICAgICAgLy8gRklYTUU6IHRlc3RzIGRlcGVuZCBvbiBgaW5kZXhgIGJlaW5nIHBhc3NlZCBhcm91bmQgZGVlcGx5LFxuICAgICAgLy8gICB3ZSBzaG91bGQgbm90IGxldCB0aGUgb3B0aW9ucy5rZXkvaW5kZXggYmxlZWQgdGhyb3VnaFxuICAgICAga2V5OiB1bmRlZmluZWQsXG4gICAgICAvLyBpbmRleDogdW5kZWZpbmVkLFxuICAgICAgW2lzSW5kZXggPyAnaW5kZXgnIDogJ2tleSddOiBrLFxuICAgICAgcGF0aDogaXNJbmRleCB8fCBrLmluY2x1ZGVzKCcuJykgPyBgJHtwYXJlbnRQYXRoIHx8ICcnfVske3ZhbHVlID8gayA6IGBcIiR7a31cImB9XWAgOiAocGFyZW50UGF0aCA/IGAke3BhcmVudFBhdGh9LmAgOiAnJykgKyBrZXlcbiAgICB9KTtcbiAgICByZXR1cm4gKF8sIHBhbmljLCBuZXh0KSA9PiB0aGlzLnJlc29sdmUodGVzdE9wdGlvbnMpLl92YWxpZGF0ZSh2YWx1ZSwgdGVzdE9wdGlvbnMsIHBhbmljLCBuZXh0KTtcbiAgfVxuICB2YWxpZGF0ZSh2YWx1ZSwgb3B0aW9ucykge1xuICAgIGxldCBzY2hlbWEgPSB0aGlzLnJlc29sdmUoT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge1xuICAgICAgdmFsdWVcbiAgICB9KSk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHNjaGVtYS5fdmFsaWRhdGUodmFsdWUsIG9wdGlvbnMsIChlcnJvciwgcGFyc2VkKSA9PiB7XG4gICAgICBpZiAoVmFsaWRhdGlvbkVycm9yLmlzRXJyb3IoZXJyb3IpKSBlcnJvci52YWx1ZSA9IHBhcnNlZDtcbiAgICAgIHJlamVjdChlcnJvcik7XG4gICAgfSwgKGVycm9ycywgdmFsaWRhdGVkKSA9PiB7XG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCkgcmVqZWN0KG5ldyBWYWxpZGF0aW9uRXJyb3IoZXJyb3JzLCB2YWxpZGF0ZWQpKTtlbHNlIHJlc29sdmUodmFsaWRhdGVkKTtcbiAgICB9KSk7XG4gIH1cbiAgdmFsaWRhdGVTeW5jKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgbGV0IHNjaGVtYSA9IHRoaXMucmVzb2x2ZShPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7XG4gICAgICB2YWx1ZVxuICAgIH0pKTtcbiAgICBsZXQgcmVzdWx0O1xuICAgIHNjaGVtYS5fdmFsaWRhdGUodmFsdWUsIE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHtcbiAgICAgIHN5bmM6IHRydWVcbiAgICB9KSwgKGVycm9yLCBwYXJzZWQpID0+IHtcbiAgICAgIGlmIChWYWxpZGF0aW9uRXJyb3IuaXNFcnJvcihlcnJvcikpIGVycm9yLnZhbHVlID0gcGFyc2VkO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSwgKGVycm9ycywgdmFsaWRhdGVkKSA9PiB7XG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCkgdGhyb3cgbmV3IFZhbGlkYXRpb25FcnJvcihlcnJvcnMsIHZhbHVlKTtcbiAgICAgIHJlc3VsdCA9IHZhbGlkYXRlZDtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlzVmFsaWQodmFsdWUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy52YWxpZGF0ZSh2YWx1ZSwgb3B0aW9ucykudGhlbigoKSA9PiB0cnVlLCBlcnIgPT4ge1xuICAgICAgaWYgKFZhbGlkYXRpb25FcnJvci5pc0Vycm9yKGVycikpIHJldHVybiBmYWxzZTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9KTtcbiAgfVxuICBpc1ZhbGlkU3luYyh2YWx1ZSwgb3B0aW9ucykge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnZhbGlkYXRlU3luYyh2YWx1ZSwgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChWYWxpZGF0aW9uRXJyb3IuaXNFcnJvcihlcnIpKSByZXR1cm4gZmFsc2U7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG4gIF9nZXREZWZhdWx0KCkge1xuICAgIGxldCBkZWZhdWx0VmFsdWUgPSB0aGlzLnNwZWMuZGVmYXVsdDtcbiAgICBpZiAoZGVmYXVsdFZhbHVlID09IG51bGwpIHtcbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB0eXBlb2YgZGVmYXVsdFZhbHVlID09PSAnZnVuY3Rpb24nID8gZGVmYXVsdFZhbHVlLmNhbGwodGhpcykgOiBjbG9uZShkZWZhdWx0VmFsdWUpO1xuICB9XG4gIGdldERlZmF1bHQob3B0aW9uc1xuICAvLyBJZiBzY2hlbWEgaXMgZGVmYXVsdGVkIHdlIGtub3cgaXQncyBhdCBsZWFzdCBub3QgdW5kZWZpbmVkXG4gICkge1xuICAgIGxldCBzY2hlbWEgPSB0aGlzLnJlc29sdmUob3B0aW9ucyB8fCB7fSk7XG4gICAgcmV0dXJuIHNjaGVtYS5fZ2V0RGVmYXVsdCgpO1xuICB9XG4gIGRlZmF1bHQoZGVmKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLl9nZXREZWZhdWx0KCk7XG4gICAgfVxuICAgIGxldCBuZXh0ID0gdGhpcy5jbG9uZSh7XG4gICAgICBkZWZhdWx0OiBkZWZcbiAgICB9KTtcbiAgICByZXR1cm4gbmV4dDtcbiAgfVxuICBzdHJpY3QoaXNTdHJpY3QgPSB0cnVlKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoe1xuICAgICAgc3RyaWN0OiBpc1N0cmljdFxuICAgIH0pO1xuICB9XG4gIG51bGxhYmlsaXR5KG51bGxhYmxlLCBtZXNzYWdlKSB7XG4gICAgY29uc3QgbmV4dCA9IHRoaXMuY2xvbmUoe1xuICAgICAgbnVsbGFibGVcbiAgICB9KTtcbiAgICBuZXh0LmludGVybmFsVGVzdHMubnVsbGFibGUgPSBjcmVhdGVWYWxpZGF0aW9uKHtcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBuYW1lOiAnbnVsbGFibGUnLFxuICAgICAgdGVzdCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgPyB0aGlzLnNjaGVtYS5zcGVjLm51bGxhYmxlIDogdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbmV4dDtcbiAgfVxuICBvcHRpb25hbGl0eShvcHRpb25hbCwgbWVzc2FnZSkge1xuICAgIGNvbnN0IG5leHQgPSB0aGlzLmNsb25lKHtcbiAgICAgIG9wdGlvbmFsXG4gICAgfSk7XG4gICAgbmV4dC5pbnRlcm5hbFRlc3RzLm9wdGlvbmFsaXR5ID0gY3JlYXRlVmFsaWRhdGlvbih7XG4gICAgICBtZXNzYWdlLFxuICAgICAgbmFtZTogJ29wdGlvbmFsaXR5JyxcbiAgICAgIHRlc3QodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB0aGlzLnNjaGVtYS5zcGVjLm9wdGlvbmFsIDogdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbmV4dDtcbiAgfVxuICBvcHRpb25hbCgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25hbGl0eSh0cnVlKTtcbiAgfVxuICBkZWZpbmVkKG1lc3NhZ2UgPSBtaXhlZC5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9uYWxpdHkoZmFsc2UsIG1lc3NhZ2UpO1xuICB9XG4gIG51bGxhYmxlKCkge1xuICAgIHJldHVybiB0aGlzLm51bGxhYmlsaXR5KHRydWUpO1xuICB9XG4gIG5vbk51bGxhYmxlKG1lc3NhZ2UgPSBtaXhlZC5ub3ROdWxsKSB7XG4gICAgcmV0dXJuIHRoaXMubnVsbGFiaWxpdHkoZmFsc2UsIG1lc3NhZ2UpO1xuICB9XG4gIHJlcXVpcmVkKG1lc3NhZ2UgPSBtaXhlZC5yZXF1aXJlZCkge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkud2l0aE11dGF0aW9uKG5leHQgPT4gbmV4dC5ub25OdWxsYWJsZShtZXNzYWdlKS5kZWZpbmVkKG1lc3NhZ2UpKTtcbiAgfVxuICBub3RSZXF1aXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLndpdGhNdXRhdGlvbihuZXh0ID0+IG5leHQubnVsbGFibGUoKS5vcHRpb25hbCgpKTtcbiAgfVxuICB0cmFuc2Zvcm0oZm4pIHtcbiAgICBsZXQgbmV4dCA9IHRoaXMuY2xvbmUoKTtcbiAgICBuZXh0LnRyYW5zZm9ybXMucHVzaChmbik7XG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHRlc3QgZnVuY3Rpb24gdG8gdGhlIHNjaGVtYSdzIHF1ZXVlIG9mIHRlc3RzLlxuICAgKiB0ZXN0cyBjYW4gYmUgZXhjbHVzaXZlIG9yIG5vbi1leGNsdXNpdmUuXG4gICAqXG4gICAqIC0gZXhjbHVzaXZlIHRlc3RzLCB3aWxsIHJlcGxhY2UgYW55IGV4aXN0aW5nIHRlc3RzIG9mIHRoZSBzYW1lIG5hbWUuXG4gICAqIC0gbm9uLWV4Y2x1c2l2ZTogY2FuIGJlIHN0YWNrZWRcbiAgICpcbiAgICogSWYgYSBub24tZXhjbHVzaXZlIHRlc3QgaXMgYWRkZWQgdG8gYSBzY2hlbWEgd2l0aCBhbiBleGNsdXNpdmUgdGVzdCBvZiB0aGUgc2FtZSBuYW1lXG4gICAqIHRoZSBleGNsdXNpdmUgdGVzdCBpcyByZW1vdmVkIGFuZCBmdXJ0aGVyIHRlc3RzIG9mIHRoZSBzYW1lIG5hbWUgd2lsbCBiZSBzdGFja2VkLlxuICAgKlxuICAgKiBJZiBhbiBleGNsdXNpdmUgdGVzdCBpcyBhZGRlZCB0byBhIHNjaGVtYSB3aXRoIG5vbi1leGNsdXNpdmUgdGVzdHMgb2YgdGhlIHNhbWUgbmFtZVxuICAgKiB0aGUgcHJldmlvdXMgdGVzdHMgYXJlIHJlbW92ZWQgYW5kIGZ1cnRoZXIgdGVzdHMgb2YgdGhlIHNhbWUgbmFtZSB3aWxsIHJlcGxhY2UgZWFjaCBvdGhlci5cbiAgICovXG5cbiAgdGVzdCguLi5hcmdzKSB7XG4gICAgbGV0IG9wdHM7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb3B0cyA9IHtcbiAgICAgICAgICB0ZXN0OiBhcmdzWzBdXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRzID0gYXJnc1swXTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09PSAyKSB7XG4gICAgICBvcHRzID0ge1xuICAgICAgICBuYW1lOiBhcmdzWzBdLFxuICAgICAgICB0ZXN0OiBhcmdzWzFdXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRzID0ge1xuICAgICAgICBuYW1lOiBhcmdzWzBdLFxuICAgICAgICBtZXNzYWdlOiBhcmdzWzFdLFxuICAgICAgICB0ZXN0OiBhcmdzWzJdXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAob3B0cy5tZXNzYWdlID09PSB1bmRlZmluZWQpIG9wdHMubWVzc2FnZSA9IG1peGVkLmRlZmF1bHQ7XG4gICAgaWYgKHR5cGVvZiBvcHRzLnRlc3QgIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ2B0ZXN0YCBpcyBhIHJlcXVpcmVkIHBhcmFtZXRlcnMnKTtcbiAgICBsZXQgbmV4dCA9IHRoaXMuY2xvbmUoKTtcbiAgICBsZXQgdmFsaWRhdGUgPSBjcmVhdGVWYWxpZGF0aW9uKG9wdHMpO1xuICAgIGxldCBpc0V4Y2x1c2l2ZSA9IG9wdHMuZXhjbHVzaXZlIHx8IG9wdHMubmFtZSAmJiBuZXh0LmV4Y2x1c2l2ZVRlc3RzW29wdHMubmFtZV0gPT09IHRydWU7XG4gICAgaWYgKG9wdHMuZXhjbHVzaXZlKSB7XG4gICAgICBpZiAoIW9wdHMubmFtZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhjbHVzaXZlIHRlc3RzIG11c3QgcHJvdmlkZSBhIHVuaXF1ZSBgbmFtZWAgaWRlbnRpZnlpbmcgdGhlIHRlc3QnKTtcbiAgICB9XG4gICAgaWYgKG9wdHMubmFtZSkgbmV4dC5leGNsdXNpdmVUZXN0c1tvcHRzLm5hbWVdID0gISFvcHRzLmV4Y2x1c2l2ZTtcbiAgICBuZXh0LnRlc3RzID0gbmV4dC50ZXN0cy5maWx0ZXIoZm4gPT4ge1xuICAgICAgaWYgKGZuLk9QVElPTlMubmFtZSA9PT0gb3B0cy5uYW1lKSB7XG4gICAgICAgIGlmIChpc0V4Y2x1c2l2ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoZm4uT1BUSU9OUy50ZXN0ID09PSB2YWxpZGF0ZS5PUFRJT05TLnRlc3QpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICAgIG5leHQudGVzdHMucHVzaCh2YWxpZGF0ZSk7XG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cbiAgd2hlbihrZXlzLCBvcHRpb25zKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGtleXMpICYmIHR5cGVvZiBrZXlzICE9PSAnc3RyaW5nJykge1xuICAgICAgb3B0aW9ucyA9IGtleXM7XG4gICAgICBrZXlzID0gJy4nO1xuICAgIH1cbiAgICBsZXQgbmV4dCA9IHRoaXMuY2xvbmUoKTtcbiAgICBsZXQgZGVwcyA9IHRvQXJyYXkoa2V5cykubWFwKGtleSA9PiBuZXcgUmVmZXJlbmNlKGtleSkpO1xuICAgIGRlcHMuZm9yRWFjaChkZXAgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZSByZWFkb25seSBhcnJheVxuICAgICAgaWYgKGRlcC5pc1NpYmxpbmcpIG5leHQuZGVwcy5wdXNoKGRlcC5rZXkpO1xuICAgIH0pO1xuICAgIG5leHQuY29uZGl0aW9ucy5wdXNoKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nID8gbmV3IENvbmRpdGlvbihkZXBzLCBvcHRpb25zKSA6IENvbmRpdGlvbi5mcm9tT3B0aW9ucyhkZXBzLCBvcHRpb25zKSk7XG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cbiAgdHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICBsZXQgbmV4dCA9IHRoaXMuY2xvbmUoKTtcbiAgICBuZXh0LmludGVybmFsVGVzdHMudHlwZUVycm9yID0gY3JlYXRlVmFsaWRhdGlvbih7XG4gICAgICBtZXNzYWdlLFxuICAgICAgbmFtZTogJ3R5cGVFcnJvcicsXG4gICAgICB0ZXN0KHZhbHVlKSB7XG4gICAgICAgIGlmICghaXNBYnNlbnQodmFsdWUpICYmICF0aGlzLnNjaGVtYS5fdHlwZUNoZWNrKHZhbHVlKSkgcmV0dXJuIHRoaXMuY3JlYXRlRXJyb3Ioe1xuICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgdHlwZTogdGhpcy5zY2hlbWEudHlwZVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBuZXh0O1xuICB9XG4gIG9uZU9mKGVudW1zLCBtZXNzYWdlID0gbWl4ZWQub25lT2YpIHtcbiAgICBsZXQgbmV4dCA9IHRoaXMuY2xvbmUoKTtcbiAgICBlbnVtcy5mb3JFYWNoKHZhbCA9PiB7XG4gICAgICBuZXh0Ll93aGl0ZWxpc3QuYWRkKHZhbCk7XG4gICAgICBuZXh0Ll9ibGFja2xpc3QuZGVsZXRlKHZhbCk7XG4gICAgfSk7XG4gICAgbmV4dC5pbnRlcm5hbFRlc3RzLndoaXRlTGlzdCA9IGNyZWF0ZVZhbGlkYXRpb24oe1xuICAgICAgbWVzc2FnZSxcbiAgICAgIG5hbWU6ICdvbmVPZicsXG4gICAgICBza2lwQWJzZW50OiB0cnVlLFxuICAgICAgdGVzdCh2YWx1ZSkge1xuICAgICAgICBsZXQgdmFsaWRzID0gdGhpcy5zY2hlbWEuX3doaXRlbGlzdDtcbiAgICAgICAgbGV0IHJlc29sdmVkID0gdmFsaWRzLnJlc29sdmVBbGwodGhpcy5yZXNvbHZlKTtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVkLmluY2x1ZGVzKHZhbHVlKSA/IHRydWUgOiB0aGlzLmNyZWF0ZUVycm9yKHtcbiAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIHZhbHVlczogQXJyYXkuZnJvbSh2YWxpZHMpLmpvaW4oJywgJyksXG4gICAgICAgICAgICByZXNvbHZlZFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cbiAgbm90T25lT2YoZW51bXMsIG1lc3NhZ2UgPSBtaXhlZC5ub3RPbmVPZikge1xuICAgIGxldCBuZXh0ID0gdGhpcy5jbG9uZSgpO1xuICAgIGVudW1zLmZvckVhY2godmFsID0+IHtcbiAgICAgIG5leHQuX2JsYWNrbGlzdC5hZGQodmFsKTtcbiAgICAgIG5leHQuX3doaXRlbGlzdC5kZWxldGUodmFsKTtcbiAgICB9KTtcbiAgICBuZXh0LmludGVybmFsVGVzdHMuYmxhY2tsaXN0ID0gY3JlYXRlVmFsaWRhdGlvbih7XG4gICAgICBtZXNzYWdlLFxuICAgICAgbmFtZTogJ25vdE9uZU9mJyxcbiAgICAgIHRlc3QodmFsdWUpIHtcbiAgICAgICAgbGV0IGludmFsaWRzID0gdGhpcy5zY2hlbWEuX2JsYWNrbGlzdDtcbiAgICAgICAgbGV0IHJlc29sdmVkID0gaW52YWxpZHMucmVzb2x2ZUFsbCh0aGlzLnJlc29sdmUpO1xuICAgICAgICBpZiAocmVzb2x2ZWQuaW5jbHVkZXModmFsdWUpKSByZXR1cm4gdGhpcy5jcmVhdGVFcnJvcih7XG4gICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICB2YWx1ZXM6IEFycmF5LmZyb20oaW52YWxpZHMpLmpvaW4oJywgJyksXG4gICAgICAgICAgICByZXNvbHZlZFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBuZXh0O1xuICB9XG4gIHN0cmlwKHN0cmlwID0gdHJ1ZSkge1xuICAgIGxldCBuZXh0ID0gdGhpcy5jbG9uZSgpO1xuICAgIG5leHQuc3BlYy5zdHJpcCA9IHN0cmlwO1xuICAgIHJldHVybiBuZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHNlcmlhbGl6ZWQgZGVzY3JpcHRpb24gb2YgdGhlIHNjaGVtYSBpbmNsdWRpbmcgdmFsaWRhdGlvbnMsIGZsYWdzLCB0eXBlcyBldGMuXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIFByb3ZpZGUgYW55IG5lZWRlZCBjb250ZXh0IGZvciByZXNvbHZpbmcgcnVudGltZSBzY2hlbWEgYWx0ZXJhdGlvbnMgKGxhenksIHdoZW4gY29uZGl0aW9ucywgZXRjKS5cbiAgICovXG4gIGRlc2NyaWJlKG9wdGlvbnMpIHtcbiAgICBjb25zdCBuZXh0ID0gKG9wdGlvbnMgPyB0aGlzLnJlc29sdmUob3B0aW9ucykgOiB0aGlzKS5jbG9uZSgpO1xuICAgIGNvbnN0IHtcbiAgICAgIGxhYmVsLFxuICAgICAgbWV0YSxcbiAgICAgIG9wdGlvbmFsLFxuICAgICAgbnVsbGFibGVcbiAgICB9ID0gbmV4dC5zcGVjO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0ge1xuICAgICAgbWV0YSxcbiAgICAgIGxhYmVsLFxuICAgICAgb3B0aW9uYWwsXG4gICAgICBudWxsYWJsZSxcbiAgICAgIGRlZmF1bHQ6IG5leHQuZ2V0RGVmYXVsdChvcHRpb25zKSxcbiAgICAgIHR5cGU6IG5leHQudHlwZSxcbiAgICAgIG9uZU9mOiBuZXh0Ll93aGl0ZWxpc3QuZGVzY3JpYmUoKSxcbiAgICAgIG5vdE9uZU9mOiBuZXh0Ll9ibGFja2xpc3QuZGVzY3JpYmUoKSxcbiAgICAgIHRlc3RzOiBuZXh0LnRlc3RzLm1hcChmbiA9PiAoe1xuICAgICAgICBuYW1lOiBmbi5PUFRJT05TLm5hbWUsXG4gICAgICAgIHBhcmFtczogZm4uT1BUSU9OUy5wYXJhbXNcbiAgICAgIH0pKS5maWx0ZXIoKG4sIGlkeCwgbGlzdCkgPT4gbGlzdC5maW5kSW5kZXgoYyA9PiBjLm5hbWUgPT09IG4ubmFtZSkgPT09IGlkeClcbiAgICB9O1xuICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgfVxufVxuLy8gQHRzLWV4cGVjdC1lcnJvclxuU2NoZW1hLnByb3RvdHlwZS5fX2lzWXVwU2NoZW1hX18gPSB0cnVlO1xuZm9yIChjb25zdCBtZXRob2Qgb2YgWyd2YWxpZGF0ZScsICd2YWxpZGF0ZVN5bmMnXSkgU2NoZW1hLnByb3RvdHlwZVtgJHttZXRob2R9QXRgXSA9IGZ1bmN0aW9uIChwYXRoLCB2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHtcbiAgICBwYXJlbnQsXG4gICAgcGFyZW50UGF0aCxcbiAgICBzY2hlbWFcbiAgfSA9IGdldEluKHRoaXMsIHBhdGgsIHZhbHVlLCBvcHRpb25zLmNvbnRleHQpO1xuICByZXR1cm4gc2NoZW1hW21ldGhvZF0ocGFyZW50ICYmIHBhcmVudFtwYXJlbnRQYXRoXSwgT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge1xuICAgIHBhcmVudCxcbiAgICBwYXRoXG4gIH0pKTtcbn07XG5mb3IgKGNvbnN0IGFsaWFzIG9mIFsnZXF1YWxzJywgJ2lzJ10pIFNjaGVtYS5wcm90b3R5cGVbYWxpYXNdID0gU2NoZW1hLnByb3RvdHlwZS5vbmVPZjtcbmZvciAoY29uc3QgYWxpYXMgb2YgWydub3QnLCAnbm9wZSddKSBTY2hlbWEucHJvdG90eXBlW2FsaWFzXSA9IFNjaGVtYS5wcm90b3R5cGUubm90T25lT2Y7XG5cbmNvbnN0IHJldHVybnNUcnVlID0gKCkgPT4gdHJ1ZTtcbmZ1bmN0aW9uIGNyZWF0ZSQ4KHNwZWMpIHtcbiAgcmV0dXJuIG5ldyBNaXhlZFNjaGVtYShzcGVjKTtcbn1cbmNsYXNzIE1peGVkU2NoZW1hIGV4dGVuZHMgU2NoZW1hIHtcbiAgY29uc3RydWN0b3Ioc3BlYykge1xuICAgIHN1cGVyKHR5cGVvZiBzcGVjID09PSAnZnVuY3Rpb24nID8ge1xuICAgICAgdHlwZTogJ21peGVkJyxcbiAgICAgIGNoZWNrOiBzcGVjXG4gICAgfSA6IE9iamVjdC5hc3NpZ24oe1xuICAgICAgdHlwZTogJ21peGVkJyxcbiAgICAgIGNoZWNrOiByZXR1cm5zVHJ1ZVxuICAgIH0sIHNwZWMpKTtcbiAgfVxufVxuY3JlYXRlJDgucHJvdG90eXBlID0gTWl4ZWRTY2hlbWEucHJvdG90eXBlO1xuXG5mdW5jdGlvbiBjcmVhdGUkNygpIHtcbiAgcmV0dXJuIG5ldyBCb29sZWFuU2NoZW1hKCk7XG59XG5jbGFzcyBCb29sZWFuU2NoZW1hIGV4dGVuZHMgU2NoZW1hIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgY2hlY2sodikge1xuICAgICAgICBpZiAodiBpbnN0YW5jZW9mIEJvb2xlYW4pIHYgPSB2LnZhbHVlT2YoKTtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2ID09PSAnYm9vbGVhbic7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy53aXRoTXV0YXRpb24oKCkgPT4ge1xuICAgICAgdGhpcy50cmFuc2Zvcm0oKHZhbHVlLCBfcmF3LCBjdHgpID0+IHtcbiAgICAgICAgaWYgKGN0eC5zcGVjLmNvZXJjZSAmJiAhY3R4LmlzVHlwZSh2YWx1ZSkpIHtcbiAgICAgICAgICBpZiAoL14odHJ1ZXwxKSQvaS50ZXN0KFN0cmluZyh2YWx1ZSkpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICBpZiAoL14oZmFsc2V8MCkkL2kudGVzdChTdHJpbmcodmFsdWUpKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGlzVHJ1ZShtZXNzYWdlID0gYm9vbGVhbi5pc1ZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMudGVzdCh7XG4gICAgICBtZXNzYWdlLFxuICAgICAgbmFtZTogJ2lzLXZhbHVlJyxcbiAgICAgIGV4Y2x1c2l2ZTogdHJ1ZSxcbiAgICAgIHBhcmFtczoge1xuICAgICAgICB2YWx1ZTogJ3RydWUnXG4gICAgICB9LFxuICAgICAgdGVzdCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gaXNBYnNlbnQodmFsdWUpIHx8IHZhbHVlID09PSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGlzRmFsc2UobWVzc2FnZSA9IGJvb2xlYW4uaXNWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLnRlc3Qoe1xuICAgICAgbWVzc2FnZSxcbiAgICAgIG5hbWU6ICdpcy12YWx1ZScsXG4gICAgICBleGNsdXNpdmU6IHRydWUsXG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgdmFsdWU6ICdmYWxzZSdcbiAgICAgIH0sXG4gICAgICB0ZXN0KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBpc0Fic2VudCh2YWx1ZSkgfHwgdmFsdWUgPT09IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGRlZmF1bHQoZGVmKSB7XG4gICAgcmV0dXJuIHN1cGVyLmRlZmF1bHQoZGVmKTtcbiAgfVxuICBkZWZpbmVkKG1zZykge1xuICAgIHJldHVybiBzdXBlci5kZWZpbmVkKG1zZyk7XG4gIH1cbiAgb3B0aW9uYWwoKSB7XG4gICAgcmV0dXJuIHN1cGVyLm9wdGlvbmFsKCk7XG4gIH1cbiAgcmVxdWlyZWQobXNnKSB7XG4gICAgcmV0dXJuIHN1cGVyLnJlcXVpcmVkKG1zZyk7XG4gIH1cbiAgbm90UmVxdWlyZWQoKSB7XG4gICAgcmV0dXJuIHN1cGVyLm5vdFJlcXVpcmVkKCk7XG4gIH1cbiAgbnVsbGFibGUoKSB7XG4gICAgcmV0dXJuIHN1cGVyLm51bGxhYmxlKCk7XG4gIH1cbiAgbm9uTnVsbGFibGUobXNnKSB7XG4gICAgcmV0dXJuIHN1cGVyLm5vbk51bGxhYmxlKG1zZyk7XG4gIH1cbiAgc3RyaXAodikge1xuICAgIHJldHVybiBzdXBlci5zdHJpcCh2KTtcbiAgfVxufVxuY3JlYXRlJDcucHJvdG90eXBlID0gQm9vbGVhblNjaGVtYS5wcm90b3R5cGU7XG5cbi8vIFRha2VuIGZyb20gSFRNTCBzcGVjOiBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbnB1dC5odG1sI3ZhbGlkLWUtbWFpbC1hZGRyZXNzXG5sZXQgckVtYWlsID1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuL15bYS16QS1aMC05LiEjJCUmJyorXFwvPT9eX2B7fH1+LV0rQFthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPyg/OlxcLlthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPykqJC87XG5sZXQgclVybCA9XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbi9eKChodHRwcz98ZnRwKTopP1xcL1xcLygoKChbYS16XXxcXGR8LXxcXC58X3x+fFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKXwoJVtcXGRhLWZdezJ9KXxbIVxcJCYnXFwoXFwpXFwqXFwrLDs9XXw6KSpAKT8oKChcXGR8WzEtOV1cXGR8MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC01XSlcXC4oXFxkfFsxLTldXFxkfDFcXGRcXGR8MlswLTRdXFxkfDI1WzAtNV0pXFwuKFxcZHxbMS05XVxcZHwxXFxkXFxkfDJbMC00XVxcZHwyNVswLTVdKVxcLihcXGR8WzEtOV1cXGR8MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC01XSkpfCgoKFthLXpdfFxcZHxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSl8KChbYS16XXxcXGR8W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKFthLXpdfFxcZHwtfFxcLnxffH58W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKihbYS16XXxcXGR8W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKSlcXC4pKygoW2Etel18W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pfCgoW2Etel18W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKFthLXpdfFxcZHwtfFxcLnxffH58W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKihbYS16XXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkpKVxcLj8pKDpcXGQqKT8pKFxcLygoKFthLXpdfFxcZHwtfFxcLnxffH58W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pfCglW1xcZGEtZl17Mn0pfFshXFwkJidcXChcXClcXCpcXCssOz1dfDp8QCkrKFxcLygoW2Etel18XFxkfC18XFwufF98fnxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSl8KCVbXFxkYS1mXXsyfSl8WyFcXCQmJ1xcKFxcKVxcKlxcKyw7PV18OnxAKSopKik/KT8oXFw/KCgoW2Etel18XFxkfC18XFwufF98fnxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSl8KCVbXFxkYS1mXXsyfSl8WyFcXCQmJ1xcKFxcKVxcKlxcKyw7PV18OnxAKXxbXFx1RTAwMC1cXHVGOEZGXXxcXC98XFw/KSopPyhcXCMoKChbYS16XXxcXGR8LXxcXC58X3x+fFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKXwoJVtcXGRhLWZdezJ9KXxbIVxcJCYnXFwoXFwpXFwqXFwrLDs9XXw6fEApfFxcL3xcXD8pKik/JC9pO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbmxldCByVVVJRCA9IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTtcbmxldCBpc1RyaW1tZWQgPSB2YWx1ZSA9PiBpc0Fic2VudCh2YWx1ZSkgfHwgdmFsdWUgPT09IHZhbHVlLnRyaW0oKTtcbmxldCBvYmpTdHJpbmdUYWcgPSB7fS50b1N0cmluZygpO1xuZnVuY3Rpb24gY3JlYXRlJDYoKSB7XG4gIHJldHVybiBuZXcgU3RyaW5nU2NoZW1hKCk7XG59XG5jbGFzcyBTdHJpbmdTY2hlbWEgZXh0ZW5kcyBTY2hlbWEge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgIGNoZWNrKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZykgdmFsdWUgPSB2YWx1ZS52YWx1ZU9mKCk7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMud2l0aE11dGF0aW9uKCgpID0+IHtcbiAgICAgIHRoaXMudHJhbnNmb3JtKCh2YWx1ZSwgX3JhdywgY3R4KSA9PiB7XG4gICAgICAgIGlmICghY3R4LnNwZWMuY29lcmNlIHx8IGN0eC5pc1R5cGUodmFsdWUpKSByZXR1cm4gdmFsdWU7XG5cbiAgICAgICAgLy8gZG9uJ3QgZXZlciBjb252ZXJ0IGFycmF5c1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgY29uc3Qgc3RyVmFsdWUgPSB2YWx1ZSAhPSBudWxsICYmIHZhbHVlLnRvU3RyaW5nID8gdmFsdWUudG9TdHJpbmcoKSA6IHZhbHVlO1xuXG4gICAgICAgIC8vIG5vIG9uZSB3YW50cyBwbGFpbiBvYmplY3RzIGNvbnZlcnRlZCB0byBbT2JqZWN0IG9iamVjdF1cbiAgICAgICAgaWYgKHN0clZhbHVlID09PSBvYmpTdHJpbmdUYWcpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHN0clZhbHVlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgcmVxdWlyZWQobWVzc2FnZSkge1xuICAgIHJldHVybiBzdXBlci5yZXF1aXJlZChtZXNzYWdlKS53aXRoTXV0YXRpb24oc2NoZW1hID0+IHNjaGVtYS50ZXN0KHtcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UgfHwgbWl4ZWQucmVxdWlyZWQsXG4gICAgICBuYW1lOiAncmVxdWlyZWQnLFxuICAgICAgc2tpcEFic2VudDogdHJ1ZSxcbiAgICAgIHRlc3Q6IHZhbHVlID0+ICEhdmFsdWUubGVuZ3RoXG4gICAgfSkpO1xuICB9XG4gIG5vdFJlcXVpcmVkKCkge1xuICAgIHJldHVybiBzdXBlci5ub3RSZXF1aXJlZCgpLndpdGhNdXRhdGlvbihzY2hlbWEgPT4ge1xuICAgICAgc2NoZW1hLnRlc3RzID0gc2NoZW1hLnRlc3RzLmZpbHRlcih0ID0+IHQuT1BUSU9OUy5uYW1lICE9PSAncmVxdWlyZWQnKTtcbiAgICAgIHJldHVybiBzY2hlbWE7XG4gICAgfSk7XG4gIH1cbiAgbGVuZ3RoKGxlbmd0aCwgbWVzc2FnZSA9IHN0cmluZy5sZW5ndGgpIHtcbiAgICByZXR1cm4gdGhpcy50ZXN0KHtcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBuYW1lOiAnbGVuZ3RoJyxcbiAgICAgIGV4Y2x1c2l2ZTogdHJ1ZSxcbiAgICAgIHBhcmFtczoge1xuICAgICAgICBsZW5ndGhcbiAgICAgIH0sXG4gICAgICBza2lwQWJzZW50OiB0cnVlLFxuICAgICAgdGVzdCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID09PSB0aGlzLnJlc29sdmUobGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBtaW4obWluLCBtZXNzYWdlID0gc3RyaW5nLm1pbikge1xuICAgIHJldHVybiB0aGlzLnRlc3Qoe1xuICAgICAgbWVzc2FnZSxcbiAgICAgIG5hbWU6ICdtaW4nLFxuICAgICAgZXhjbHVzaXZlOiB0cnVlLFxuICAgICAgcGFyYW1zOiB7XG4gICAgICAgIG1pblxuICAgICAgfSxcbiAgICAgIHNraXBBYnNlbnQ6IHRydWUsXG4gICAgICB0ZXN0KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPj0gdGhpcy5yZXNvbHZlKG1pbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgbWF4KG1heCwgbWVzc2FnZSA9IHN0cmluZy5tYXgpIHtcbiAgICByZXR1cm4gdGhpcy50ZXN0KHtcbiAgICAgIG5hbWU6ICdtYXgnLFxuICAgICAgZXhjbHVzaXZlOiB0cnVlLFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHBhcmFtczoge1xuICAgICAgICBtYXhcbiAgICAgIH0sXG4gICAgICBza2lwQWJzZW50OiB0cnVlLFxuICAgICAgdGVzdCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoIDw9IHRoaXMucmVzb2x2ZShtYXgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIG1hdGNoZXMocmVnZXgsIG9wdGlvbnMpIHtcbiAgICBsZXQgZXhjbHVkZUVtcHR5U3RyaW5nID0gZmFsc2U7XG4gICAgbGV0IG1lc3NhZ2U7XG4gICAgbGV0IG5hbWU7XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgKHtcbiAgICAgICAgICBleGNsdWRlRW1wdHlTdHJpbmcgPSBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIG5hbWVcbiAgICAgICAgfSA9IG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSA9IG9wdGlvbnM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRlc3Qoe1xuICAgICAgbmFtZTogbmFtZSB8fCAnbWF0Y2hlcycsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlIHx8IHN0cmluZy5tYXRjaGVzLFxuICAgICAgcGFyYW1zOiB7XG4gICAgICAgIHJlZ2V4XG4gICAgICB9LFxuICAgICAgc2tpcEFic2VudDogdHJ1ZSxcbiAgICAgIHRlc3Q6IHZhbHVlID0+IHZhbHVlID09PSAnJyAmJiBleGNsdWRlRW1wdHlTdHJpbmcgfHwgdmFsdWUuc2VhcmNoKHJlZ2V4KSAhPT0gLTFcbiAgICB9KTtcbiAgfVxuICBlbWFpbChtZXNzYWdlID0gc3RyaW5nLmVtYWlsKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0Y2hlcyhyRW1haWwsIHtcbiAgICAgIG5hbWU6ICdlbWFpbCcsXG4gICAgICBtZXNzYWdlLFxuICAgICAgZXhjbHVkZUVtcHR5U3RyaW5nOiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgdXJsKG1lc3NhZ2UgPSBzdHJpbmcudXJsKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0Y2hlcyhyVXJsLCB7XG4gICAgICBuYW1lOiAndXJsJyxcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBleGNsdWRlRW1wdHlTdHJpbmc6IHRydWVcbiAgICB9KTtcbiAgfVxuICB1dWlkKG1lc3NhZ2UgPSBzdHJpbmcudXVpZCkge1xuICAgIHJldHVybiB0aGlzLm1hdGNoZXMoclVVSUQsIHtcbiAgICAgIG5hbWU6ICd1dWlkJyxcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBleGNsdWRlRW1wdHlTdHJpbmc6IGZhbHNlXG4gICAgfSk7XG4gIH1cblxuICAvLy0tIHRyYW5zZm9ybXMgLS1cbiAgZW5zdXJlKCkge1xuICAgIHJldHVybiB0aGlzLmRlZmF1bHQoJycpLnRyYW5zZm9ybSh2YWwgPT4gdmFsID09PSBudWxsID8gJycgOiB2YWwpO1xuICB9XG4gIHRyaW0obWVzc2FnZSA9IHN0cmluZy50cmltKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKHZhbCA9PiB2YWwgIT0gbnVsbCA/IHZhbC50cmltKCkgOiB2YWwpLnRlc3Qoe1xuICAgICAgbWVzc2FnZSxcbiAgICAgIG5hbWU6ICd0cmltJyxcbiAgICAgIHRlc3Q6IGlzVHJpbW1lZFxuICAgIH0pO1xuICB9XG4gIGxvd2VyY2FzZShtZXNzYWdlID0gc3RyaW5nLmxvd2VyY2FzZSkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh2YWx1ZSA9PiAhaXNBYnNlbnQodmFsdWUpID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IHZhbHVlKS50ZXN0KHtcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBuYW1lOiAnc3RyaW5nX2Nhc2UnLFxuICAgICAgZXhjbHVzaXZlOiB0cnVlLFxuICAgICAgc2tpcEFic2VudDogdHJ1ZSxcbiAgICAgIHRlc3Q6IHZhbHVlID0+IGlzQWJzZW50KHZhbHVlKSB8fCB2YWx1ZSA9PT0gdmFsdWUudG9Mb3dlckNhc2UoKVxuICAgIH0pO1xuICB9XG4gIHVwcGVyY2FzZShtZXNzYWdlID0gc3RyaW5nLnVwcGVyY2FzZSkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh2YWx1ZSA9PiAhaXNBYnNlbnQodmFsdWUpID8gdmFsdWUudG9VcHBlckNhc2UoKSA6IHZhbHVlKS50ZXN0KHtcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBuYW1lOiAnc3RyaW5nX2Nhc2UnLFxuICAgICAgZXhjbHVzaXZlOiB0cnVlLFxuICAgICAgc2tpcEFic2VudDogdHJ1ZSxcbiAgICAgIHRlc3Q6IHZhbHVlID0+IGlzQWJzZW50KHZhbHVlKSB8fCB2YWx1ZSA9PT0gdmFsdWUudG9VcHBlckNhc2UoKVxuICAgIH0pO1xuICB9XG59XG5jcmVhdGUkNi5wcm90b3R5cGUgPSBTdHJpbmdTY2hlbWEucHJvdG90eXBlO1xuXG4vL1xuLy8gU3RyaW5nIEludGVyZmFjZXNcbi8vXG5cbmxldCBpc05hTiQxID0gdmFsdWUgPT4gdmFsdWUgIT0gK3ZhbHVlO1xuZnVuY3Rpb24gY3JlYXRlJDUoKSB7XG4gIHJldHVybiBuZXcgTnVtYmVyU2NoZW1hKCk7XG59XG5jbGFzcyBOdW1iZXJTY2hlbWEgZXh0ZW5kcyBTY2hlbWEge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7XG4gICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgIGNoZWNrKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE51bWJlcikgdmFsdWUgPSB2YWx1ZS52YWx1ZU9mKCk7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmICFpc05hTiQxKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLndpdGhNdXRhdGlvbigoKSA9PiB7XG4gICAgICB0aGlzLnRyYW5zZm9ybSgodmFsdWUsIF9yYXcsIGN0eCkgPT4ge1xuICAgICAgICBpZiAoIWN0eC5zcGVjLmNvZXJjZSkgcmV0dXJuIHZhbHVlO1xuICAgICAgICBsZXQgcGFyc2VkID0gdmFsdWU7XG4gICAgICAgIGlmICh0eXBlb2YgcGFyc2VkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHBhcnNlZCA9IHBhcnNlZC5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgICAgIGlmIChwYXJzZWQgPT09ICcnKSByZXR1cm4gTmFOO1xuICAgICAgICAgIC8vIGRvbid0IHVzZSBwYXJzZUZsb2F0IHRvIGF2b2lkIHBvc2l0aXZlcyBvbiBhbHBoYS1udW1lcmljIHN0cmluZ3NcbiAgICAgICAgICBwYXJzZWQgPSArcGFyc2VkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdHguaXNUeXBlKHBhcnNlZCkpIHJldHVybiBwYXJzZWQ7XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHBhcnNlZCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBtaW4obWluLCBtZXNzYWdlID0gbnVtYmVyLm1pbikge1xuICAgIHJldHVybiB0aGlzLnRlc3Qoe1xuICAgICAgbWVzc2FnZSxcbiAgICAgIG5hbWU6ICdtaW4nLFxuICAgICAgZXhjbHVzaXZlOiB0cnVlLFxuICAgICAgcGFyYW1zOiB7XG4gICAgICAgIG1pblxuICAgICAgfSxcbiAgICAgIHNraXBBYnNlbnQ6IHRydWUsXG4gICAgICB0ZXN0KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA+PSB0aGlzLnJlc29sdmUobWluKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBtYXgobWF4LCBtZXNzYWdlID0gbnVtYmVyLm1heCkge1xuICAgIHJldHVybiB0aGlzLnRlc3Qoe1xuICAgICAgbWVzc2FnZSxcbiAgICAgIG5hbWU6ICdtYXgnLFxuICAgICAgZXhjbHVzaXZlOiB0cnVlLFxuICAgICAgcGFyYW1zOiB7XG4gICAgICAgIG1heFxuICAgICAgfSxcbiAgICAgIHNraXBBYnNlbnQ6IHRydWUsXG4gICAgICB0ZXN0KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA8PSB0aGlzLnJlc29sdmUobWF4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBsZXNzVGhhbihsZXNzLCBtZXNzYWdlID0gbnVtYmVyLmxlc3NUaGFuKSB7XG4gICAgcmV0dXJuIHRoaXMudGVzdCh7XG4gICAgICBtZXNzYWdlLFxuICAgICAgbmFtZTogJ21heCcsXG4gICAgICBleGNsdXNpdmU6IHRydWUsXG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgbGVzc1xuICAgICAgfSxcbiAgICAgIHNraXBBYnNlbnQ6IHRydWUsXG4gICAgICB0ZXN0KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA8IHRoaXMucmVzb2x2ZShsZXNzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBtb3JlVGhhbihtb3JlLCBtZXNzYWdlID0gbnVtYmVyLm1vcmVUaGFuKSB7XG4gICAgcmV0dXJuIHRoaXMudGVzdCh7XG4gICAgICBtZXNzYWdlLFxuICAgICAgbmFtZTogJ21pbicsXG4gICAgICBleGNsdXNpdmU6IHRydWUsXG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgbW9yZVxuICAgICAgfSxcbiAgICAgIHNraXBBYnNlbnQ6IHRydWUsXG4gICAgICB0ZXN0KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA+IHRoaXMucmVzb2x2ZShtb3JlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBwb3NpdGl2ZShtc2cgPSBudW1iZXIucG9zaXRpdmUpIHtcbiAgICByZXR1cm4gdGhpcy5tb3JlVGhhbigwLCBtc2cpO1xuICB9XG4gIG5lZ2F0aXZlKG1zZyA9IG51bWJlci5uZWdhdGl2ZSkge1xuICAgIHJldHVybiB0aGlzLmxlc3NUaGFuKDAsIG1zZyk7XG4gIH1cbiAgaW50ZWdlcihtZXNzYWdlID0gbnVtYmVyLmludGVnZXIpIHtcbiAgICByZXR1cm4gdGhpcy50ZXN0KHtcbiAgICAgIG5hbWU6ICdpbnRlZ2VyJyxcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBza2lwQWJzZW50OiB0cnVlLFxuICAgICAgdGVzdDogdmFsID0+IE51bWJlci5pc0ludGVnZXIodmFsKVxuICAgIH0pO1xuICB9XG4gIHRydW5jYXRlKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh2YWx1ZSA9PiAhaXNBYnNlbnQodmFsdWUpID8gdmFsdWUgfCAwIDogdmFsdWUpO1xuICB9XG4gIHJvdW5kKG1ldGhvZCkge1xuICAgIHZhciBfbWV0aG9kO1xuICAgIGxldCBhdmFpbCA9IFsnY2VpbCcsICdmbG9vcicsICdyb3VuZCcsICd0cnVuYyddO1xuICAgIG1ldGhvZCA9ICgoX21ldGhvZCA9IG1ldGhvZCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9tZXRob2QudG9Mb3dlckNhc2UoKSkgfHwgJ3JvdW5kJztcblxuICAgIC8vIHRoaXMgZXhpc3RzIGZvciBzeW1lbXRyeSB3aXRoIHRoZSBuZXcgTWF0aC50cnVuY1xuICAgIGlmIChtZXRob2QgPT09ICd0cnVuYycpIHJldHVybiB0aGlzLnRydW5jYXRlKCk7XG4gICAgaWYgKGF2YWlsLmluZGV4T2YobWV0aG9kLnRvTG93ZXJDYXNlKCkpID09PSAtMSkgdGhyb3cgbmV3IFR5cGVFcnJvcignT25seSB2YWxpZCBvcHRpb25zIGZvciByb3VuZCgpIGFyZTogJyArIGF2YWlsLmpvaW4oJywgJykpO1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh2YWx1ZSA9PiAhaXNBYnNlbnQodmFsdWUpID8gTWF0aFttZXRob2RdKHZhbHVlKSA6IHZhbHVlKTtcbiAgfVxufVxuY3JlYXRlJDUucHJvdG90eXBlID0gTnVtYmVyU2NoZW1hLnByb3RvdHlwZTtcblxuLy9cbi8vIE51bWJlciBJbnRlcmZhY2VzXG4vL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuLyoqXG4gKlxuICogRGF0ZS5wYXJzZSB3aXRoIHByb2dyZXNzaXZlIGVuaGFuY2VtZW50IGZvciBJU08gODYwMSA8aHR0cHM6Ly9naXRodWIuY29tL2Nzbm92ZXIvanMtaXNvODYwMT5cbiAqIE5PTi1DT05GT1JNQU5UIEVESVRJT04uXG4gKiDCqSAyMDExIENvbGluIFNub3ZlciA8aHR0cDovL3pldGFmbGVldC5jb20+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqL1xuXG4vLyAgICAgICAgICAgICAgMSBZWVlZICAgICAgICAgICAgICAgICAyIE1NICAgICAgICAzIEREICAgICAgICAgICAgICA0IEhIICAgICA1IG1tICAgICAgICA2IHNzICAgICAgICAgICAgNyBtc2VjICAgICAgICAgOCBaIDkgwrEgICAgMTAgdHpISCAgICAxMSB0em1tXG52YXIgaXNvUmVnID0gL14oXFxkezR9fFsrXFwtXVxcZHs2fSkoPzotPyhcXGR7Mn0pKD86LT8oXFxkezJ9KSk/KT8oPzpbIFRdPyhcXGR7Mn0pOj8oXFxkezJ9KSg/Ojo/KFxcZHsyfSkoPzpbLFxcLl0oXFxkezEsfSkpPyk/KD86KFopfChbK1xcLV0pKFxcZHsyfSkoPzo6PyhcXGR7Mn0pKT8pPyk/JC87XG5mdW5jdGlvbiBwYXJzZUlzb0RhdGUoZGF0ZSkge1xuICB2YXIgbnVtZXJpY0tleXMgPSBbMSwgNCwgNSwgNiwgNywgMTAsIDExXSxcbiAgICBtaW51dGVzT2Zmc2V0ID0gMCxcbiAgICB0aW1lc3RhbXAsXG4gICAgc3RydWN0O1xuICBpZiAoc3RydWN0ID0gaXNvUmVnLmV4ZWMoZGF0ZSkpIHtcbiAgICAvLyBhdm9pZCBOYU4gdGltZXN0YW1wcyBjYXVzZWQgYnkg4oCcdW5kZWZpbmVk4oCdIHZhbHVlcyBiZWluZyBwYXNzZWQgdG8gRGF0ZS5VVENcbiAgICBmb3IgKHZhciBpID0gMCwgazsgayA9IG51bWVyaWNLZXlzW2ldOyArK2kpIHN0cnVjdFtrXSA9ICtzdHJ1Y3Rba10gfHwgMDtcblxuICAgIC8vIGFsbG93IHVuZGVmaW5lZCBkYXlzIGFuZCBtb250aHNcbiAgICBzdHJ1Y3RbMl0gPSAoK3N0cnVjdFsyXSB8fCAxKSAtIDE7XG4gICAgc3RydWN0WzNdID0gK3N0cnVjdFszXSB8fCAxO1xuXG4gICAgLy8gYWxsb3cgYXJiaXRyYXJ5IHN1Yi1zZWNvbmQgcHJlY2lzaW9uIGJleW9uZCBtaWxsaXNlY29uZHNcbiAgICBzdHJ1Y3RbN10gPSBzdHJ1Y3RbN10gPyBTdHJpbmcoc3RydWN0WzddKS5zdWJzdHIoMCwgMykgOiAwO1xuXG4gICAgLy8gdGltZXN0YW1wcyB3aXRob3V0IHRpbWV6b25lIGlkZW50aWZpZXJzIHNob3VsZCBiZSBjb25zaWRlcmVkIGxvY2FsIHRpbWVcbiAgICBpZiAoKHN0cnVjdFs4XSA9PT0gdW5kZWZpbmVkIHx8IHN0cnVjdFs4XSA9PT0gJycpICYmIChzdHJ1Y3RbOV0gPT09IHVuZGVmaW5lZCB8fCBzdHJ1Y3RbOV0gPT09ICcnKSkgdGltZXN0YW1wID0gK25ldyBEYXRlKHN0cnVjdFsxXSwgc3RydWN0WzJdLCBzdHJ1Y3RbM10sIHN0cnVjdFs0XSwgc3RydWN0WzVdLCBzdHJ1Y3RbNl0sIHN0cnVjdFs3XSk7ZWxzZSB7XG4gICAgICBpZiAoc3RydWN0WzhdICE9PSAnWicgJiYgc3RydWN0WzldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbWludXRlc09mZnNldCA9IHN0cnVjdFsxMF0gKiA2MCArIHN0cnVjdFsxMV07XG4gICAgICAgIGlmIChzdHJ1Y3RbOV0gPT09ICcrJykgbWludXRlc09mZnNldCA9IDAgLSBtaW51dGVzT2Zmc2V0O1xuICAgICAgfVxuICAgICAgdGltZXN0YW1wID0gRGF0ZS5VVEMoc3RydWN0WzFdLCBzdHJ1Y3RbMl0sIHN0cnVjdFszXSwgc3RydWN0WzRdLCBzdHJ1Y3RbNV0gKyBtaW51dGVzT2Zmc2V0LCBzdHJ1Y3RbNl0sIHN0cnVjdFs3XSk7XG4gICAgfVxuICB9IGVsc2UgdGltZXN0YW1wID0gRGF0ZS5wYXJzZSA/IERhdGUucGFyc2UoZGF0ZSkgOiBOYU47XG4gIHJldHVybiB0aW1lc3RhbXA7XG59XG5cbi8vIEB0cy1pZ25vcmVcbmxldCBpbnZhbGlkRGF0ZSA9IG5ldyBEYXRlKCcnKTtcbmxldCBpc0RhdGUgPSBvYmogPT4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IERhdGVdJztcbmZ1bmN0aW9uIGNyZWF0ZSQ0KCkge1xuICByZXR1cm4gbmV3IERhdGVTY2hlbWEoKTtcbn1cbmNsYXNzIERhdGVTY2hlbWEgZXh0ZW5kcyBTY2hlbWEge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7XG4gICAgICB0eXBlOiAnZGF0ZScsXG4gICAgICBjaGVjayh2KSB7XG4gICAgICAgIHJldHVybiBpc0RhdGUodikgJiYgIWlzTmFOKHYuZ2V0VGltZSgpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLndpdGhNdXRhdGlvbigoKSA9PiB7XG4gICAgICB0aGlzLnRyYW5zZm9ybSgodmFsdWUsIF9yYXcsIGN0eCkgPT4ge1xuICAgICAgICBpZiAoIWN0eC5zcGVjLmNvZXJjZSB8fCBjdHguaXNUeXBlKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICAgICAgICB2YWx1ZSA9IHBhcnNlSXNvRGF0ZSh2YWx1ZSk7XG5cbiAgICAgICAgLy8gMCBpcyBhIHZhbGlkIHRpbWVzdGFtcCBlcXVpdmFsZW50IHRvIDE5NzAtMDEtMDFUMDA6MDA6MDBaKHVuaXggZXBvY2gpIG9yIGJlZm9yZS5cbiAgICAgICAgcmV0dXJuICFpc05hTih2YWx1ZSkgPyBuZXcgRGF0ZSh2YWx1ZSkgOiBEYXRlU2NoZW1hLklOVkFMSURfREFURTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHByZXBhcmVQYXJhbShyZWYsIG5hbWUpIHtcbiAgICBsZXQgcGFyYW07XG4gICAgaWYgKCFSZWZlcmVuY2UuaXNSZWYocmVmKSkge1xuICAgICAgbGV0IGNhc3QgPSB0aGlzLmNhc3QocmVmKTtcbiAgICAgIGlmICghdGhpcy5fdHlwZUNoZWNrKGNhc3QpKSB0aHJvdyBuZXcgVHlwZUVycm9yKGBcXGAke25hbWV9XFxgIG11c3QgYmUgYSBEYXRlIG9yIGEgdmFsdWUgdGhhdCBjYW4gYmUgXFxgY2FzdCgpXFxgIHRvIGEgRGF0ZWApO1xuICAgICAgcGFyYW0gPSBjYXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJhbSA9IHJlZjtcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtO1xuICB9XG4gIG1pbihtaW4sIG1lc3NhZ2UgPSBkYXRlLm1pbikge1xuICAgIGxldCBsaW1pdCA9IHRoaXMucHJlcGFyZVBhcmFtKG1pbiwgJ21pbicpO1xuICAgIHJldHVybiB0aGlzLnRlc3Qoe1xuICAgICAgbWVzc2FnZSxcbiAgICAgIG5hbWU6ICdtaW4nLFxuICAgICAgZXhjbHVzaXZlOiB0cnVlLFxuICAgICAgcGFyYW1zOiB7XG4gICAgICAgIG1pblxuICAgICAgfSxcbiAgICAgIHNraXBBYnNlbnQ6IHRydWUsXG4gICAgICB0ZXN0KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA+PSB0aGlzLnJlc29sdmUobGltaXQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIG1heChtYXgsIG1lc3NhZ2UgPSBkYXRlLm1heCkge1xuICAgIGxldCBsaW1pdCA9IHRoaXMucHJlcGFyZVBhcmFtKG1heCwgJ21heCcpO1xuICAgIHJldHVybiB0aGlzLnRlc3Qoe1xuICAgICAgbWVzc2FnZSxcbiAgICAgIG5hbWU6ICdtYXgnLFxuICAgICAgZXhjbHVzaXZlOiB0cnVlLFxuICAgICAgcGFyYW1zOiB7XG4gICAgICAgIG1heFxuICAgICAgfSxcbiAgICAgIHNraXBBYnNlbnQ6IHRydWUsXG4gICAgICB0ZXN0KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA8PSB0aGlzLnJlc29sdmUobGltaXQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5EYXRlU2NoZW1hLklOVkFMSURfREFURSA9IGludmFsaWREYXRlO1xuY3JlYXRlJDQucHJvdG90eXBlID0gRGF0ZVNjaGVtYS5wcm90b3R5cGU7XG5jcmVhdGUkNC5JTlZBTElEX0RBVEUgPSBpbnZhbGlkRGF0ZTtcblxuLy8gQHRzLWV4cGVjdC1lcnJvclxuZnVuY3Rpb24gc29ydEZpZWxkcyhmaWVsZHMsIGV4Y2x1ZGVkRWRnZXMgPSBbXSkge1xuICBsZXQgZWRnZXMgPSBbXTtcbiAgbGV0IG5vZGVzID0gbmV3IFNldCgpO1xuICBsZXQgZXhjbHVkZXMgPSBuZXcgU2V0KGV4Y2x1ZGVkRWRnZXMubWFwKChbYSwgYl0pID0+IGAke2F9LSR7Yn1gKSk7XG4gIGZ1bmN0aW9uIGFkZE5vZGUoZGVwUGF0aCwga2V5KSB7XG4gICAgbGV0IG5vZGUgPSBzcGxpdChkZXBQYXRoKVswXTtcbiAgICBub2Rlcy5hZGQobm9kZSk7XG4gICAgaWYgKCFleGNsdWRlcy5oYXMoYCR7a2V5fS0ke25vZGV9YCkpIGVkZ2VzLnB1c2goW2tleSwgbm9kZV0pO1xuICB9XG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGZpZWxkcykpIHtcbiAgICBsZXQgdmFsdWUgPSBmaWVsZHNba2V5XTtcbiAgICBub2Rlcy5hZGQoa2V5KTtcbiAgICBpZiAoUmVmZXJlbmNlLmlzUmVmKHZhbHVlKSAmJiB2YWx1ZS5pc1NpYmxpbmcpIGFkZE5vZGUodmFsdWUucGF0aCwga2V5KTtlbHNlIGlmIChpc1NjaGVtYSh2YWx1ZSkgJiYgJ2RlcHMnIGluIHZhbHVlKSB2YWx1ZS5kZXBzLmZvckVhY2gocGF0aCA9PiBhZGROb2RlKHBhdGgsIGtleSkpO1xuICB9XG4gIHJldHVybiB0b3Bvc29ydC5hcnJheShBcnJheS5mcm9tKG5vZGVzKSwgZWRnZXMpLnJldmVyc2UoKTtcbn1cblxuZnVuY3Rpb24gZmluZEluZGV4KGFyciwgZXJyKSB7XG4gIGxldCBpZHggPSBJbmZpbml0eTtcbiAgYXJyLnNvbWUoKGtleSwgaWkpID0+IHtcbiAgICB2YXIgX2VyciRwYXRoO1xuICAgIGlmICgoX2VyciRwYXRoID0gZXJyLnBhdGgpICE9IG51bGwgJiYgX2VyciRwYXRoLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgIGlkeCA9IGlpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGlkeDtcbn1cbmZ1bmN0aW9uIHNvcnRCeUtleU9yZGVyKGtleXMpIHtcbiAgcmV0dXJuIChhLCBiKSA9PiB7XG4gICAgcmV0dXJuIGZpbmRJbmRleChrZXlzLCBhKSAtIGZpbmRJbmRleChrZXlzLCBiKTtcbiAgfTtcbn1cblxuY29uc3QgcGFyc2VKc29uID0gKHZhbHVlLCBfLCBjdHgpID0+IHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgbGV0IHBhcnNlZCA9IHZhbHVlO1xuICB0cnkge1xuICAgIHBhcnNlZCA9IEpTT04ucGFyc2UodmFsdWUpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvKiAqL1xuICB9XG4gIHJldHVybiBjdHguaXNUeXBlKHBhcnNlZCkgPyBwYXJzZWQgOiB2YWx1ZTtcbn07XG5cbi8vIEB0cy1pZ25vcmVcbmZ1bmN0aW9uIGRlZXBQYXJ0aWFsKHNjaGVtYSkge1xuICBpZiAoJ2ZpZWxkcycgaW4gc2NoZW1hKSB7XG4gICAgY29uc3QgcGFydGlhbCA9IHt9O1xuICAgIGZvciAoY29uc3QgW2tleSwgZmllbGRTY2hlbWFdIG9mIE9iamVjdC5lbnRyaWVzKHNjaGVtYS5maWVsZHMpKSB7XG4gICAgICBwYXJ0aWFsW2tleV0gPSBkZWVwUGFydGlhbChmaWVsZFNjaGVtYSk7XG4gICAgfVxuICAgIHJldHVybiBzY2hlbWEuc2V0RmllbGRzKHBhcnRpYWwpO1xuICB9XG4gIGlmIChzY2hlbWEudHlwZSA9PT0gJ2FycmF5Jykge1xuICAgIGNvbnN0IG5leHRBcnJheSA9IHNjaGVtYS5vcHRpb25hbCgpO1xuICAgIGlmIChuZXh0QXJyYXkuaW5uZXJUeXBlKSBuZXh0QXJyYXkuaW5uZXJUeXBlID0gZGVlcFBhcnRpYWwobmV4dEFycmF5LmlubmVyVHlwZSk7XG4gICAgcmV0dXJuIG5leHRBcnJheTtcbiAgfVxuICBpZiAoc2NoZW1hLnR5cGUgPT09ICd0dXBsZScpIHtcbiAgICByZXR1cm4gc2NoZW1hLm9wdGlvbmFsKCkuY2xvbmUoe1xuICAgICAgdHlwZXM6IHNjaGVtYS5zcGVjLnR5cGVzLm1hcChkZWVwUGFydGlhbClcbiAgICB9KTtcbiAgfVxuICBpZiAoJ29wdGlvbmFsJyBpbiBzY2hlbWEpIHtcbiAgICByZXR1cm4gc2NoZW1hLm9wdGlvbmFsKCk7XG4gIH1cbiAgcmV0dXJuIHNjaGVtYTtcbn1cbmNvbnN0IGRlZXBIYXMgPSAob2JqLCBwKSA9PiB7XG4gIGNvbnN0IHBhdGggPSBbLi4ubm9ybWFsaXplUGF0aChwKV07XG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHBhdGhbMF0gaW4gb2JqO1xuICBsZXQgbGFzdCA9IHBhdGgucG9wKCk7XG4gIGxldCBwYXJlbnQgPSBnZXR0ZXIoam9pbihwYXRoKSwgdHJ1ZSkob2JqKTtcbiAgcmV0dXJuICEhKHBhcmVudCAmJiBsYXN0IGluIHBhcmVudCk7XG59O1xubGV0IGlzT2JqZWN0ID0gb2JqID0+IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBPYmplY3RdJztcbmZ1bmN0aW9uIHVua25vd24oY3R4LCB2YWx1ZSkge1xuICBsZXQga25vd24gPSBPYmplY3Qua2V5cyhjdHguZmllbGRzKTtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbHVlKS5maWx0ZXIoa2V5ID0+IGtub3duLmluZGV4T2Yoa2V5KSA9PT0gLTEpO1xufVxuY29uc3QgZGVmYXVsdFNvcnQgPSBzb3J0QnlLZXlPcmRlcihbXSk7XG5mdW5jdGlvbiBjcmVhdGUkMyhzcGVjKSB7XG4gIHJldHVybiBuZXcgT2JqZWN0U2NoZW1hKHNwZWMpO1xufVxuY2xhc3MgT2JqZWN0U2NoZW1hIGV4dGVuZHMgU2NoZW1hIHtcbiAgY29uc3RydWN0b3Ioc3BlYykge1xuICAgIHN1cGVyKHtcbiAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgY2hlY2sodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKSB8fCB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5maWVsZHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX3NvcnRFcnJvcnMgPSBkZWZhdWx0U29ydDtcbiAgICB0aGlzLl9ub2RlcyA9IFtdO1xuICAgIHRoaXMuX2V4Y2x1ZGVkRWRnZXMgPSBbXTtcbiAgICB0aGlzLndpdGhNdXRhdGlvbigoKSA9PiB7XG4gICAgICBpZiAoc3BlYykge1xuICAgICAgICB0aGlzLnNoYXBlKHNwZWMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIF9jYXN0KF92YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgdmFyIF9vcHRpb25zJHN0cmlwVW5rbm93bjtcbiAgICBsZXQgdmFsdWUgPSBzdXBlci5fY2FzdChfdmFsdWUsIG9wdGlvbnMpO1xuXG4gICAgLy9zaG91bGQgaWdub3JlIG51bGxzIGhlcmVcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMuZ2V0RGVmYXVsdCgpO1xuICAgIGlmICghdGhpcy5fdHlwZUNoZWNrKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICAgIGxldCBmaWVsZHMgPSB0aGlzLmZpZWxkcztcbiAgICBsZXQgc3RyaXAgPSAoX29wdGlvbnMkc3RyaXBVbmtub3duID0gb3B0aW9ucy5zdHJpcFVua25vd24pICE9IG51bGwgPyBfb3B0aW9ucyRzdHJpcFVua25vd24gOiB0aGlzLnNwZWMubm9Vbmtub3duO1xuICAgIGxldCBwcm9wcyA9IFtdLmNvbmNhdCh0aGlzLl9ub2RlcywgT2JqZWN0LmtleXModmFsdWUpLmZpbHRlcih2ID0+ICF0aGlzLl9ub2Rlcy5pbmNsdWRlcyh2KSkpO1xuICAgIGxldCBpbnRlcm1lZGlhdGVWYWx1ZSA9IHt9OyAvLyBpcyBmaWxsZWQgZHVyaW5nIHRoZSB0cmFuc2Zvcm0gYmVsb3dcbiAgICBsZXQgaW5uZXJPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge1xuICAgICAgcGFyZW50OiBpbnRlcm1lZGlhdGVWYWx1ZSxcbiAgICAgIF9fdmFsaWRhdGluZzogb3B0aW9ucy5fX3ZhbGlkYXRpbmcgfHwgZmFsc2VcbiAgICB9KTtcbiAgICBsZXQgaXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BzKSB7XG4gICAgICBsZXQgZmllbGQgPSBmaWVsZHNbcHJvcF07XG4gICAgICBsZXQgZXhpc3RzID0gKHByb3AgaW4gdmFsdWUpO1xuICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgIGxldCBmaWVsZFZhbHVlO1xuICAgICAgICBsZXQgaW5wdXRWYWx1ZSA9IHZhbHVlW3Byb3BdO1xuXG4gICAgICAgIC8vIHNhZmUgdG8gbXV0YXRlIHNpbmNlIHRoaXMgaXMgZmlyZWQgaW4gc2VxdWVuY2VcbiAgICAgICAgaW5uZXJPcHRpb25zLnBhdGggPSAob3B0aW9ucy5wYXRoID8gYCR7b3B0aW9ucy5wYXRofS5gIDogJycpICsgcHJvcDtcbiAgICAgICAgZmllbGQgPSBmaWVsZC5yZXNvbHZlKHtcbiAgICAgICAgICB2YWx1ZTogaW5wdXRWYWx1ZSxcbiAgICAgICAgICBjb250ZXh0OiBvcHRpb25zLmNvbnRleHQsXG4gICAgICAgICAgcGFyZW50OiBpbnRlcm1lZGlhdGVWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGZpZWxkU3BlYyA9IGZpZWxkIGluc3RhbmNlb2YgU2NoZW1hID8gZmllbGQuc3BlYyA6IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IHN0cmljdCA9IGZpZWxkU3BlYyA9PSBudWxsID8gdm9pZCAwIDogZmllbGRTcGVjLnN0cmljdDtcbiAgICAgICAgaWYgKGZpZWxkU3BlYyAhPSBudWxsICYmIGZpZWxkU3BlYy5zdHJpcCkge1xuICAgICAgICAgIGlzQ2hhbmdlZCA9IGlzQ2hhbmdlZCB8fCBwcm9wIGluIHZhbHVlO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGZpZWxkVmFsdWUgPSAhb3B0aW9ucy5fX3ZhbGlkYXRpbmcgfHwgIXN0cmljdCA/XG4gICAgICAgIC8vIFRPRE86IHVzZSBfY2FzdCwgdGhpcyBpcyBkb3VibGUgcmVzb2x2aW5nXG4gICAgICAgIGZpZWxkLmNhc3QodmFsdWVbcHJvcF0sIGlubmVyT3B0aW9ucykgOiB2YWx1ZVtwcm9wXTtcbiAgICAgICAgaWYgKGZpZWxkVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGludGVybWVkaWF0ZVZhbHVlW3Byb3BdID0gZmllbGRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChleGlzdHMgJiYgIXN0cmlwKSB7XG4gICAgICAgIGludGVybWVkaWF0ZVZhbHVlW3Byb3BdID0gdmFsdWVbcHJvcF07XG4gICAgICB9XG4gICAgICBpZiAoZXhpc3RzICE9PSBwcm9wIGluIGludGVybWVkaWF0ZVZhbHVlIHx8IGludGVybWVkaWF0ZVZhbHVlW3Byb3BdICE9PSB2YWx1ZVtwcm9wXSkge1xuICAgICAgICBpc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNDaGFuZ2VkID8gaW50ZXJtZWRpYXRlVmFsdWUgOiB2YWx1ZTtcbiAgfVxuICBfdmFsaWRhdGUoX3ZhbHVlLCBvcHRpb25zID0ge30sIHBhbmljLCBuZXh0KSB7XG4gICAgbGV0IHtcbiAgICAgIGZyb20gPSBbXSxcbiAgICAgIG9yaWdpbmFsVmFsdWUgPSBfdmFsdWUsXG4gICAgICByZWN1cnNpdmUgPSB0aGlzLnNwZWMucmVjdXJzaXZlXG4gICAgfSA9IG9wdGlvbnM7XG4gICAgb3B0aW9ucy5mcm9tID0gW3tcbiAgICAgIHNjaGVtYTogdGhpcyxcbiAgICAgIHZhbHVlOiBvcmlnaW5hbFZhbHVlXG4gICAgfSwgLi4uZnJvbV07XG4gICAgLy8gdGhpcyBmbGFnIGlzIG5lZWRlZCBmb3IgaGFuZGxpbmcgYHN0cmljdGAgY29ycmVjdGx5IGluIHRoZSBjb250ZXh0IG9mXG4gICAgLy8gdmFsaWRhdGlvbiB2cyBqdXN0IGNhc3RpbmcuIGUuZyBzdHJpY3QoKSBvbiBhIGZpZWxkIGlzIG9ubHkgdXNlZCB3aGVuIHZhbGlkYXRpbmdcbiAgICBvcHRpb25zLl9fdmFsaWRhdGluZyA9IHRydWU7XG4gICAgb3B0aW9ucy5vcmlnaW5hbFZhbHVlID0gb3JpZ2luYWxWYWx1ZTtcbiAgICBzdXBlci5fdmFsaWRhdGUoX3ZhbHVlLCBvcHRpb25zLCBwYW5pYywgKG9iamVjdEVycm9ycywgdmFsdWUpID0+IHtcbiAgICAgIGlmICghcmVjdXJzaXZlIHx8ICFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgbmV4dChvYmplY3RFcnJvcnMsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgb3JpZ2luYWxWYWx1ZSA9IG9yaWdpbmFsVmFsdWUgfHwgdmFsdWU7XG4gICAgICBsZXQgdGVzdHMgPSBbXTtcbiAgICAgIGZvciAobGV0IGtleSBvZiB0aGlzLl9ub2Rlcykge1xuICAgICAgICBsZXQgZmllbGQgPSB0aGlzLmZpZWxkc1trZXldO1xuICAgICAgICBpZiAoIWZpZWxkIHx8IFJlZmVyZW5jZS5pc1JlZihmaWVsZCkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB0ZXN0cy5wdXNoKGZpZWxkLmFzTmVzdGVkVGVzdCh7XG4gICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgcGFyZW50OiB2YWx1ZSxcbiAgICAgICAgICBwYXJlbnRQYXRoOiBvcHRpb25zLnBhdGgsXG4gICAgICAgICAgb3JpZ2luYWxQYXJlbnQ6IG9yaWdpbmFsVmFsdWVcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgdGhpcy5ydW5UZXN0cyh7XG4gICAgICAgIHRlc3RzLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgb3JpZ2luYWxWYWx1ZSxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgfSwgcGFuaWMsIGZpZWxkRXJyb3JzID0+IHtcbiAgICAgICAgbmV4dChmaWVsZEVycm9ycy5zb3J0KHRoaXMuX3NvcnRFcnJvcnMpLmNvbmNhdChvYmplY3RFcnJvcnMpLCB2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBjbG9uZShzcGVjKSB7XG4gICAgY29uc3QgbmV4dCA9IHN1cGVyLmNsb25lKHNwZWMpO1xuICAgIG5leHQuZmllbGRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5maWVsZHMpO1xuICAgIG5leHQuX25vZGVzID0gdGhpcy5fbm9kZXM7XG4gICAgbmV4dC5fZXhjbHVkZWRFZGdlcyA9IHRoaXMuX2V4Y2x1ZGVkRWRnZXM7XG4gICAgbmV4dC5fc29ydEVycm9ycyA9IHRoaXMuX3NvcnRFcnJvcnM7XG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cbiAgY29uY2F0KHNjaGVtYSkge1xuICAgIGxldCBuZXh0ID0gc3VwZXIuY29uY2F0KHNjaGVtYSk7XG4gICAgbGV0IG5leHRGaWVsZHMgPSBuZXh0LmZpZWxkcztcbiAgICBmb3IgKGxldCBbZmllbGQsIHNjaGVtYU9yUmVmXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmZpZWxkcykpIHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IG5leHRGaWVsZHNbZmllbGRdO1xuICAgICAgbmV4dEZpZWxkc1tmaWVsZF0gPSB0YXJnZXQgPT09IHVuZGVmaW5lZCA/IHNjaGVtYU9yUmVmIDogdGFyZ2V0O1xuICAgIH1cbiAgICByZXR1cm4gbmV4dC53aXRoTXV0YXRpb24ocyA9PiBzLnNldEZpZWxkcyhuZXh0RmllbGRzLCB0aGlzLl9leGNsdWRlZEVkZ2VzKSk7XG4gIH1cbiAgX2dldERlZmF1bHQoKSB7XG4gICAgaWYgKCdkZWZhdWx0JyBpbiB0aGlzLnNwZWMpIHtcbiAgICAgIHJldHVybiBzdXBlci5fZ2V0RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIGRlZmF1bHQgc2V0IGludmVudCBvbmVcbiAgICBpZiAoIXRoaXMuX25vZGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgbGV0IGRmdCA9IHt9O1xuICAgIHRoaXMuX25vZGVzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGNvbnN0IGZpZWxkID0gdGhpcy5maWVsZHNba2V5XTtcbiAgICAgIGRmdFtrZXldID0gZmllbGQgJiYgJ2dldERlZmF1bHQnIGluIGZpZWxkID8gZmllbGQuZ2V0RGVmYXVsdCgpIDogdW5kZWZpbmVkO1xuICAgIH0pO1xuICAgIHJldHVybiBkZnQ7XG4gIH1cbiAgc2V0RmllbGRzKHNoYXBlLCBleGNsdWRlZEVkZ2VzKSB7XG4gICAgbGV0IG5leHQgPSB0aGlzLmNsb25lKCk7XG4gICAgbmV4dC5maWVsZHMgPSBzaGFwZTtcbiAgICBuZXh0Ll9ub2RlcyA9IHNvcnRGaWVsZHMoc2hhcGUsIGV4Y2x1ZGVkRWRnZXMpO1xuICAgIG5leHQuX3NvcnRFcnJvcnMgPSBzb3J0QnlLZXlPcmRlcihPYmplY3Qua2V5cyhzaGFwZSkpO1xuICAgIC8vIFhYWDogdGhpcyBjYXJyaWVzIG92ZXIgZWRnZXMgd2hpY2ggbWF5IG5vdCBiZSB3aGF0IHlvdSB3YW50XG4gICAgaWYgKGV4Y2x1ZGVkRWRnZXMpIG5leHQuX2V4Y2x1ZGVkRWRnZXMgPSBleGNsdWRlZEVkZ2VzO1xuICAgIHJldHVybiBuZXh0O1xuICB9XG4gIHNoYXBlKGFkZGl0aW9ucywgZXhjbHVkZXMgPSBbXSkge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkud2l0aE11dGF0aW9uKG5leHQgPT4ge1xuICAgICAgbGV0IGVkZ2VzID0gbmV4dC5fZXhjbHVkZWRFZGdlcztcbiAgICAgIGlmIChleGNsdWRlcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGV4Y2x1ZGVzWzBdKSkgZXhjbHVkZXMgPSBbZXhjbHVkZXNdO1xuICAgICAgICBlZGdlcyA9IFsuLi5uZXh0Ll9leGNsdWRlZEVkZ2VzLCAuLi5leGNsdWRlc107XG4gICAgICB9XG5cbiAgICAgIC8vIFhYWDogZXhjbHVkZXMgaGVyZSBpcyB3cm9uZ1xuICAgICAgcmV0dXJuIG5leHQuc2V0RmllbGRzKE9iamVjdC5hc3NpZ24obmV4dC5maWVsZHMsIGFkZGl0aW9ucyksIGVkZ2VzKTtcbiAgICB9KTtcbiAgfVxuICBwYXJ0aWFsKCkge1xuICAgIGNvbnN0IHBhcnRpYWwgPSB7fTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHNjaGVtYV0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5maWVsZHMpKSB7XG4gICAgICBwYXJ0aWFsW2tleV0gPSAnb3B0aW9uYWwnIGluIHNjaGVtYSAmJiBzY2hlbWEub3B0aW9uYWwgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHNjaGVtYS5vcHRpb25hbCgpIDogc2NoZW1hO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zZXRGaWVsZHMocGFydGlhbCk7XG4gIH1cbiAgZGVlcFBhcnRpYWwoKSB7XG4gICAgY29uc3QgbmV4dCA9IGRlZXBQYXJ0aWFsKHRoaXMpO1xuICAgIHJldHVybiBuZXh0O1xuICB9XG4gIHBpY2soa2V5cykge1xuICAgIGNvbnN0IHBpY2tlZCA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgIGlmICh0aGlzLmZpZWxkc1trZXldKSBwaWNrZWRba2V5XSA9IHRoaXMuZmllbGRzW2tleV07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNldEZpZWxkcyhwaWNrZWQpO1xuICB9XG4gIG9taXQoa2V5cykge1xuICAgIGNvbnN0IGZpZWxkcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZmllbGRzKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICBkZWxldGUgZmllbGRzW2tleV07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNldEZpZWxkcyhmaWVsZHMpO1xuICB9XG4gIGZyb20oZnJvbSwgdG8sIGFsaWFzKSB7XG4gICAgbGV0IGZyb21HZXR0ZXIgPSBnZXR0ZXIoZnJvbSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKG9iaiA9PiB7XG4gICAgICBpZiAoIW9iaikgcmV0dXJuIG9iajtcbiAgICAgIGxldCBuZXdPYmogPSBvYmo7XG4gICAgICBpZiAoZGVlcEhhcyhvYmosIGZyb20pKSB7XG4gICAgICAgIG5ld09iaiA9IE9iamVjdC5hc3NpZ24oe30sIG9iaik7XG4gICAgICAgIGlmICghYWxpYXMpIGRlbGV0ZSBuZXdPYmpbZnJvbV07XG4gICAgICAgIG5ld09ialt0b10gPSBmcm9tR2V0dGVyKG9iaik7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFBhcnNlIGFuIGlucHV0IEpTT04gc3RyaW5nIHRvIGFuIG9iamVjdCAqL1xuICBqc29uKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybShwYXJzZUpzb24pO1xuICB9XG4gIG5vVW5rbm93bihub0FsbG93ID0gdHJ1ZSwgbWVzc2FnZSA9IG9iamVjdC5ub1Vua25vd24pIHtcbiAgICBpZiAodHlwZW9mIG5vQWxsb3cgIT09ICdib29sZWFuJykge1xuICAgICAgbWVzc2FnZSA9IG5vQWxsb3c7XG4gICAgICBub0FsbG93ID0gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IG5leHQgPSB0aGlzLnRlc3Qoe1xuICAgICAgbmFtZTogJ25vVW5rbm93bicsXG4gICAgICBleGNsdXNpdmU6IHRydWUsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgdGVzdCh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gICAgICAgIGNvbnN0IHVua25vd25LZXlzID0gdW5rbm93bih0aGlzLnNjaGVtYSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gIW5vQWxsb3cgfHwgdW5rbm93bktleXMubGVuZ3RoID09PSAwIHx8IHRoaXMuY3JlYXRlRXJyb3Ioe1xuICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgdW5rbm93bjogdW5rbm93bktleXMuam9pbignLCAnKVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgbmV4dC5zcGVjLm5vVW5rbm93biA9IG5vQWxsb3c7XG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cbiAgdW5rbm93bihhbGxvdyA9IHRydWUsIG1lc3NhZ2UgPSBvYmplY3Qubm9Vbmtub3duKSB7XG4gICAgcmV0dXJuIHRoaXMubm9Vbmtub3duKCFhbGxvdywgbWVzc2FnZSk7XG4gIH1cbiAgdHJhbnNmb3JtS2V5cyhmbikge1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybShvYmogPT4ge1xuICAgICAgaWYgKCFvYmopIHJldHVybiBvYmo7XG4gICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iaikpIHJlc3VsdFtmbihrZXkpXSA9IG9ialtrZXldO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcbiAgfVxuICBjYW1lbENhc2UoKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtS2V5cyhjYW1lbENhc2UpO1xuICB9XG4gIHNuYWtlQ2FzZSgpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm1LZXlzKHNuYWtlQ2FzZSk7XG4gIH1cbiAgY29uc3RhbnRDYXNlKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybUtleXMoa2V5ID0+IHNuYWtlQ2FzZShrZXkpLnRvVXBwZXJDYXNlKCkpO1xuICB9XG4gIGRlc2NyaWJlKG9wdGlvbnMpIHtcbiAgICBsZXQgYmFzZSA9IHN1cGVyLmRlc2NyaWJlKG9wdGlvbnMpO1xuICAgIGJhc2UuZmllbGRzID0ge307XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5maWVsZHMpKSB7XG4gICAgICB2YXIgX2lubmVyT3B0aW9ucztcbiAgICAgIGxldCBpbm5lck9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgaWYgKChfaW5uZXJPcHRpb25zID0gaW5uZXJPcHRpb25zKSAhPSBudWxsICYmIF9pbm5lck9wdGlvbnMudmFsdWUpIHtcbiAgICAgICAgaW5uZXJPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgaW5uZXJPcHRpb25zLCB7XG4gICAgICAgICAgcGFyZW50OiBpbm5lck9wdGlvbnMudmFsdWUsXG4gICAgICAgICAgdmFsdWU6IGlubmVyT3B0aW9ucy52YWx1ZVtrZXldXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYmFzZS5maWVsZHNba2V5XSA9IHZhbHVlLmRlc2NyaWJlKGlubmVyT3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiBiYXNlO1xuICB9XG59XG5jcmVhdGUkMy5wcm90b3R5cGUgPSBPYmplY3RTY2hlbWEucHJvdG90eXBlO1xuXG5mdW5jdGlvbiBjcmVhdGUkMih0eXBlKSB7XG4gIHJldHVybiBuZXcgQXJyYXlTY2hlbWEodHlwZSk7XG59XG5jbGFzcyBBcnJheVNjaGVtYSBleHRlbmRzIFNjaGVtYSB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcih7XG4gICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgY2hlY2sodikge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGB1bmRlZmluZWRgIHNwZWNpZmljYWxseSBtZWFucyB1bmluaXRpYWxpemVkLCBhcyBvcHBvc2VkIHRvIFwibm8gc3VidHlwZVwiXG4gICAgdGhpcy5pbm5lclR5cGUgPSB2b2lkIDA7XG4gICAgdGhpcy5pbm5lclR5cGUgPSB0eXBlO1xuICB9XG4gIF9jYXN0KF92YWx1ZSwgX29wdHMpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHN1cGVyLl9jYXN0KF92YWx1ZSwgX29wdHMpO1xuXG4gICAgLy8gc2hvdWxkIGlnbm9yZSBudWxscyBoZXJlXG4gICAgaWYgKCF0aGlzLl90eXBlQ2hlY2sodmFsdWUpIHx8ICF0aGlzLmlubmVyVHlwZSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBsZXQgaXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgY29uc3QgY2FzdEFycmF5ID0gdmFsdWUubWFwKCh2LCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IGNhc3RFbGVtZW50ID0gdGhpcy5pbm5lclR5cGUuY2FzdCh2LCBPYmplY3QuYXNzaWduKHt9LCBfb3B0cywge1xuICAgICAgICBwYXRoOiBgJHtfb3B0cy5wYXRoIHx8ICcnfVske2lkeH1dYFxuICAgICAgfSkpO1xuICAgICAgaWYgKGNhc3RFbGVtZW50ICE9PSB2KSB7XG4gICAgICAgIGlzQ2hhbmdlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2FzdEVsZW1lbnQ7XG4gICAgfSk7XG4gICAgcmV0dXJuIGlzQ2hhbmdlZCA/IGNhc3RBcnJheSA6IHZhbHVlO1xuICB9XG4gIF92YWxpZGF0ZShfdmFsdWUsIG9wdGlvbnMgPSB7fSwgcGFuaWMsIG5leHQpIHtcbiAgICB2YXIgX29wdGlvbnMkcmVjdXJzaXZlO1xuICAgIC8vIGxldCBzeW5jID0gb3B0aW9ucy5zeW5jO1xuICAgIC8vIGxldCBwYXRoID0gb3B0aW9ucy5wYXRoO1xuICAgIGxldCBpbm5lclR5cGUgPSB0aGlzLmlubmVyVHlwZTtcbiAgICAvLyBsZXQgZW5kRWFybHkgPSBvcHRpb25zLmFib3J0RWFybHkgPz8gdGhpcy5zcGVjLmFib3J0RWFybHk7XG4gICAgbGV0IHJlY3Vyc2l2ZSA9IChfb3B0aW9ucyRyZWN1cnNpdmUgPSBvcHRpb25zLnJlY3Vyc2l2ZSkgIT0gbnVsbCA/IF9vcHRpb25zJHJlY3Vyc2l2ZSA6IHRoaXMuc3BlYy5yZWN1cnNpdmU7XG4gICAgb3B0aW9ucy5vcmlnaW5hbFZhbHVlICE9IG51bGwgPyBvcHRpb25zLm9yaWdpbmFsVmFsdWUgOiBfdmFsdWU7XG4gICAgc3VwZXIuX3ZhbGlkYXRlKF92YWx1ZSwgb3B0aW9ucywgcGFuaWMsIChhcnJheUVycm9ycywgdmFsdWUpID0+IHtcbiAgICAgIHZhciBfb3B0aW9ucyRvcmlnaW5hbFZhbHUyO1xuICAgICAgaWYgKCFyZWN1cnNpdmUgfHwgIWlubmVyVHlwZSB8fCAhdGhpcy5fdHlwZUNoZWNrKHZhbHVlKSkge1xuICAgICAgICBuZXh0KGFycmF5RXJyb3JzLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gIzk1MCBFbnN1cmUgdGhhdCBzcGFyc2UgYXJyYXkgZW1wdHkgc2xvdHMgYXJlIHZhbGlkYXRlZFxuICAgICAgbGV0IHRlc3RzID0gbmV3IEFycmF5KHZhbHVlLmxlbmd0aCk7XG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdmFsdWUubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHZhciBfb3B0aW9ucyRvcmlnaW5hbFZhbHU7XG4gICAgICAgIHRlc3RzW2luZGV4XSA9IGlubmVyVHlwZS5hc05lc3RlZFRlc3Qoe1xuICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgcGFyZW50OiB2YWx1ZSxcbiAgICAgICAgICBwYXJlbnRQYXRoOiBvcHRpb25zLnBhdGgsXG4gICAgICAgICAgb3JpZ2luYWxQYXJlbnQ6IChfb3B0aW9ucyRvcmlnaW5hbFZhbHUgPSBvcHRpb25zLm9yaWdpbmFsVmFsdWUpICE9IG51bGwgPyBfb3B0aW9ucyRvcmlnaW5hbFZhbHUgOiBfdmFsdWVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLnJ1blRlc3RzKHtcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIHRlc3RzLFxuICAgICAgICBvcmlnaW5hbFZhbHVlOiAoX29wdGlvbnMkb3JpZ2luYWxWYWx1MiA9IG9wdGlvbnMub3JpZ2luYWxWYWx1ZSkgIT0gbnVsbCA/IF9vcHRpb25zJG9yaWdpbmFsVmFsdTIgOiBfdmFsdWUsXG4gICAgICAgIG9wdGlvbnNcbiAgICAgIH0sIHBhbmljLCBpbm5lclR5cGVFcnJvcnMgPT4gbmV4dChpbm5lclR5cGVFcnJvcnMuY29uY2F0KGFycmF5RXJyb3JzKSwgdmFsdWUpKTtcbiAgICB9KTtcbiAgfVxuICBjbG9uZShzcGVjKSB7XG4gICAgY29uc3QgbmV4dCA9IHN1cGVyLmNsb25lKHNwZWMpO1xuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgcmVhZG9ubHlcbiAgICBuZXh0LmlubmVyVHlwZSA9IHRoaXMuaW5uZXJUeXBlO1xuICAgIHJldHVybiBuZXh0O1xuICB9XG5cbiAgLyoqIFBhcnNlIGFuIGlucHV0IEpTT04gc3RyaW5nIHRvIGFuIG9iamVjdCAqL1xuICBqc29uKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybShwYXJzZUpzb24pO1xuICB9XG4gIGNvbmNhdChzY2hlbWEpIHtcbiAgICBsZXQgbmV4dCA9IHN1cGVyLmNvbmNhdChzY2hlbWEpO1xuXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciByZWFkb25seVxuICAgIG5leHQuaW5uZXJUeXBlID0gdGhpcy5pbm5lclR5cGU7XG4gICAgaWYgKHNjaGVtYS5pbm5lclR5cGUpXG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIHJlYWRvbmx5XG4gICAgICBuZXh0LmlubmVyVHlwZSA9IG5leHQuaW5uZXJUeXBlID9cbiAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgTGF6eSBkb2Vzbid0IGhhdmUgY29uY2F0IGFuZCB3aWxsIGJyZWFrXG4gICAgICBuZXh0LmlubmVyVHlwZS5jb25jYXQoc2NoZW1hLmlubmVyVHlwZSkgOiBzY2hlbWEuaW5uZXJUeXBlO1xuICAgIHJldHVybiBuZXh0O1xuICB9XG4gIG9mKHNjaGVtYSkge1xuICAgIC8vIEZJWE1FOiB0aGlzIHNob3VsZCByZXR1cm4gYSBuZXcgaW5zdGFuY2Ugb2YgYXJyYXkgd2l0aG91dCB0aGUgZGVmYXVsdCB0byBiZVxuICAgIGxldCBuZXh0ID0gdGhpcy5jbG9uZSgpO1xuICAgIGlmICghaXNTY2hlbWEoc2NoZW1hKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignYGFycmF5Lm9mKClgIHN1Yi1zY2hlbWEgbXVzdCBiZSBhIHZhbGlkIHl1cCBzY2hlbWEgbm90OiAnICsgcHJpbnRWYWx1ZShzY2hlbWEpKTtcblxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgcmVhZG9ubHlcbiAgICBuZXh0LmlubmVyVHlwZSA9IHNjaGVtYTtcbiAgICByZXR1cm4gbmV4dDtcbiAgfVxuICBsZW5ndGgobGVuZ3RoLCBtZXNzYWdlID0gYXJyYXkubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHRoaXMudGVzdCh7XG4gICAgICBtZXNzYWdlLFxuICAgICAgbmFtZTogJ2xlbmd0aCcsXG4gICAgICBleGNsdXNpdmU6IHRydWUsXG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgbGVuZ3RoXG4gICAgICB9LFxuICAgICAgc2tpcEFic2VudDogdHJ1ZSxcbiAgICAgIHRlc3QodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA9PT0gdGhpcy5yZXNvbHZlKGxlbmd0aCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgbWluKG1pbiwgbWVzc2FnZSkge1xuICAgIG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGFycmF5Lm1pbjtcbiAgICByZXR1cm4gdGhpcy50ZXN0KHtcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBuYW1lOiAnbWluJyxcbiAgICAgIGV4Y2x1c2l2ZTogdHJ1ZSxcbiAgICAgIHBhcmFtczoge1xuICAgICAgICBtaW5cbiAgICAgIH0sXG4gICAgICBza2lwQWJzZW50OiB0cnVlLFxuICAgICAgLy8gRklYTUUodHMpOiBBcnJheTx0eXBlb2YgVD5cbiAgICAgIHRlc3QodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+PSB0aGlzLnJlc29sdmUobWluKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBtYXgobWF4LCBtZXNzYWdlKSB7XG4gICAgbWVzc2FnZSA9IG1lc3NhZ2UgfHwgYXJyYXkubWF4O1xuICAgIHJldHVybiB0aGlzLnRlc3Qoe1xuICAgICAgbWVzc2FnZSxcbiAgICAgIG5hbWU6ICdtYXgnLFxuICAgICAgZXhjbHVzaXZlOiB0cnVlLFxuICAgICAgcGFyYW1zOiB7XG4gICAgICAgIG1heFxuICAgICAgfSxcbiAgICAgIHNraXBBYnNlbnQ6IHRydWUsXG4gICAgICB0ZXN0KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPD0gdGhpcy5yZXNvbHZlKG1heCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZW5zdXJlKCkge1xuICAgIHJldHVybiB0aGlzLmRlZmF1bHQoKCkgPT4gW10pLnRyYW5zZm9ybSgodmFsLCBvcmlnaW5hbCkgPT4ge1xuICAgICAgLy8gV2UgZG9uJ3Qgd2FudCB0byByZXR1cm4gYG51bGxgIGZvciBudWxsYWJsZSBzY2hlbWFcbiAgICAgIGlmICh0aGlzLl90eXBlQ2hlY2sodmFsKSkgcmV0dXJuIHZhbDtcbiAgICAgIHJldHVybiBvcmlnaW5hbCA9PSBudWxsID8gW10gOiBbXS5jb25jYXQob3JpZ2luYWwpO1xuICAgIH0pO1xuICB9XG4gIGNvbXBhY3QocmVqZWN0b3IpIHtcbiAgICBsZXQgcmVqZWN0ID0gIXJlamVjdG9yID8gdiA9PiAhIXYgOiAodiwgaSwgYSkgPT4gIXJlamVjdG9yKHYsIGksIGEpO1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh2YWx1ZXMgPT4gdmFsdWVzICE9IG51bGwgPyB2YWx1ZXMuZmlsdGVyKHJlamVjdCkgOiB2YWx1ZXMpO1xuICB9XG4gIGRlc2NyaWJlKG9wdGlvbnMpIHtcbiAgICBsZXQgYmFzZSA9IHN1cGVyLmRlc2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuaW5uZXJUeXBlKSB7XG4gICAgICB2YXIgX2lubmVyT3B0aW9ucztcbiAgICAgIGxldCBpbm5lck9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgaWYgKChfaW5uZXJPcHRpb25zID0gaW5uZXJPcHRpb25zKSAhPSBudWxsICYmIF9pbm5lck9wdGlvbnMudmFsdWUpIHtcbiAgICAgICAgaW5uZXJPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgaW5uZXJPcHRpb25zLCB7XG4gICAgICAgICAgcGFyZW50OiBpbm5lck9wdGlvbnMudmFsdWUsXG4gICAgICAgICAgdmFsdWU6IGlubmVyT3B0aW9ucy52YWx1ZVswXVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGJhc2UuaW5uZXJUeXBlID0gdGhpcy5pbm5lclR5cGUuZGVzY3JpYmUob3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiBiYXNlO1xuICB9XG59XG5jcmVhdGUkMi5wcm90b3R5cGUgPSBBcnJheVNjaGVtYS5wcm90b3R5cGU7XG5cbi8vIEB0cy1pZ25vcmVcbmZ1bmN0aW9uIGNyZWF0ZSQxKHNjaGVtYXMpIHtcbiAgcmV0dXJuIG5ldyBUdXBsZVNjaGVtYShzY2hlbWFzKTtcbn1cbmNsYXNzIFR1cGxlU2NoZW1hIGV4dGVuZHMgU2NoZW1hIHtcbiAgY29uc3RydWN0b3Ioc2NoZW1hcykge1xuICAgIHN1cGVyKHtcbiAgICAgIHR5cGU6ICd0dXBsZScsXG4gICAgICBzcGVjOiB7XG4gICAgICAgIHR5cGVzOiBzY2hlbWFzXG4gICAgICB9LFxuICAgICAgY2hlY2sodikge1xuICAgICAgICBjb25zdCB0eXBlcyA9IHRoaXMuc3BlYy50eXBlcztcbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodikgJiYgdi5sZW5ndGggPT09IHR5cGVzLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLndpdGhNdXRhdGlvbigoKSA9PiB7XG4gICAgICB0aGlzLnR5cGVFcnJvcih0dXBsZS5ub3RUeXBlKTtcbiAgICB9KTtcbiAgfVxuICBfY2FzdChpbnB1dFZhbHVlLCBvcHRpb25zKSB7XG4gICAgY29uc3Qge1xuICAgICAgdHlwZXNcbiAgICB9ID0gdGhpcy5zcGVjO1xuICAgIGNvbnN0IHZhbHVlID0gc3VwZXIuX2Nhc3QoaW5wdXRWYWx1ZSwgb3B0aW9ucyk7XG4gICAgaWYgKCF0aGlzLl90eXBlQ2hlY2sodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGxldCBpc0NoYW5nZWQgPSBmYWxzZTtcbiAgICBjb25zdCBjYXN0QXJyYXkgPSB0eXBlcy5tYXAoKHR5cGUsIGlkeCkgPT4ge1xuICAgICAgY29uc3QgY2FzdEVsZW1lbnQgPSB0eXBlLmNhc3QodmFsdWVbaWR4XSwgT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge1xuICAgICAgICBwYXRoOiBgJHtvcHRpb25zLnBhdGggfHwgJyd9WyR7aWR4fV1gXG4gICAgICB9KSk7XG4gICAgICBpZiAoY2FzdEVsZW1lbnQgIT09IHZhbHVlW2lkeF0pIGlzQ2hhbmdlZCA9IHRydWU7XG4gICAgICByZXR1cm4gY2FzdEVsZW1lbnQ7XG4gICAgfSk7XG4gICAgcmV0dXJuIGlzQ2hhbmdlZCA/IGNhc3RBcnJheSA6IHZhbHVlO1xuICB9XG4gIF92YWxpZGF0ZShfdmFsdWUsIG9wdGlvbnMgPSB7fSwgcGFuaWMsIG5leHQpIHtcbiAgICBsZXQgaXRlbVR5cGVzID0gdGhpcy5zcGVjLnR5cGVzO1xuICAgIHN1cGVyLl92YWxpZGF0ZShfdmFsdWUsIG9wdGlvbnMsIHBhbmljLCAodHVwbGVFcnJvcnMsIHZhbHVlKSA9PiB7XG4gICAgICB2YXIgX29wdGlvbnMkb3JpZ2luYWxWYWx1MjtcbiAgICAgIC8vIGludGVudGlvbmFsbHkgbm90IHJlc3BlY3RpbmcgcmVjdXJzaXZlXG4gICAgICBpZiAoIXRoaXMuX3R5cGVDaGVjayh2YWx1ZSkpIHtcbiAgICAgICAgbmV4dCh0dXBsZUVycm9ycywgdmFsdWUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBsZXQgdGVzdHMgPSBbXTtcbiAgICAgIGZvciAobGV0IFtpbmRleCwgaXRlbVNjaGVtYV0gb2YgaXRlbVR5cGVzLmVudHJpZXMoKSkge1xuICAgICAgICB2YXIgX29wdGlvbnMkb3JpZ2luYWxWYWx1O1xuICAgICAgICB0ZXN0c1tpbmRleF0gPSBpdGVtU2NoZW1hLmFzTmVzdGVkVGVzdCh7XG4gICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgICBwYXJlbnQ6IHZhbHVlLFxuICAgICAgICAgIHBhcmVudFBhdGg6IG9wdGlvbnMucGF0aCxcbiAgICAgICAgICBvcmlnaW5hbFBhcmVudDogKF9vcHRpb25zJG9yaWdpbmFsVmFsdSA9IG9wdGlvbnMub3JpZ2luYWxWYWx1ZSkgIT0gbnVsbCA/IF9vcHRpb25zJG9yaWdpbmFsVmFsdSA6IF92YWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMucnVuVGVzdHMoe1xuICAgICAgICB2YWx1ZSxcbiAgICAgICAgdGVzdHMsXG4gICAgICAgIG9yaWdpbmFsVmFsdWU6IChfb3B0aW9ucyRvcmlnaW5hbFZhbHUyID0gb3B0aW9ucy5vcmlnaW5hbFZhbHVlKSAhPSBudWxsID8gX29wdGlvbnMkb3JpZ2luYWxWYWx1MiA6IF92YWx1ZSxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgfSwgcGFuaWMsIGlubmVyVHlwZUVycm9ycyA9PiBuZXh0KGlubmVyVHlwZUVycm9ycy5jb25jYXQodHVwbGVFcnJvcnMpLCB2YWx1ZSkpO1xuICAgIH0pO1xuICB9XG59XG5jcmVhdGUkMS5wcm90b3R5cGUgPSBUdXBsZVNjaGVtYS5wcm90b3R5cGU7XG5cbmZ1bmN0aW9uIGNyZWF0ZShidWlsZGVyKSB7XG4gIHJldHVybiBuZXcgTGF6eShidWlsZGVyKTtcbn1cbmNsYXNzIExhenkge1xuICBjb25zdHJ1Y3RvcihidWlsZGVyKSB7XG4gICAgdGhpcy50eXBlID0gJ2xhenknO1xuICAgIHRoaXMuX19pc1l1cFNjaGVtYV9fID0gdHJ1ZTtcbiAgICB0aGlzLnNwZWMgPSB2b2lkIDA7XG4gICAgdGhpcy5fcmVzb2x2ZSA9ICh2YWx1ZSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgICBsZXQgc2NoZW1hID0gdGhpcy5idWlsZGVyKHZhbHVlLCBvcHRpb25zKTtcbiAgICAgIGlmICghaXNTY2hlbWEoc2NoZW1hKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignbGF6eSgpIGZ1bmN0aW9ucyBtdXN0IHJldHVybiBhIHZhbGlkIHNjaGVtYScpO1xuICAgICAgaWYgKHRoaXMuc3BlYy5vcHRpb25hbCkgc2NoZW1hID0gc2NoZW1hLm9wdGlvbmFsKCk7XG4gICAgICByZXR1cm4gc2NoZW1hLnJlc29sdmUob3B0aW9ucyk7XG4gICAgfTtcbiAgICB0aGlzLmJ1aWxkZXIgPSBidWlsZGVyO1xuICAgIHRoaXMuc3BlYyA9IHtcbiAgICAgIG1ldGE6IHVuZGVmaW5lZCxcbiAgICAgIG9wdGlvbmFsOiBmYWxzZVxuICAgIH07XG4gIH1cbiAgY2xvbmUoc3BlYykge1xuICAgIGNvbnN0IG5leHQgPSBuZXcgTGF6eSh0aGlzLmJ1aWxkZXIpO1xuICAgIG5leHQuc3BlYyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3BlYywgc3BlYyk7XG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cbiAgb3B0aW9uYWxpdHkob3B0aW9uYWwpIHtcbiAgICBjb25zdCBuZXh0ID0gdGhpcy5jbG9uZSh7XG4gICAgICBvcHRpb25hbFxuICAgIH0pO1xuICAgIHJldHVybiBuZXh0O1xuICB9XG4gIG9wdGlvbmFsKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbmFsaXR5KHRydWUpO1xuICB9XG4gIHJlc29sdmUob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9yZXNvbHZlKG9wdGlvbnMudmFsdWUsIG9wdGlvbnMpO1xuICB9XG4gIGNhc3QodmFsdWUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzb2x2ZSh2YWx1ZSwgb3B0aW9ucykuY2FzdCh2YWx1ZSwgb3B0aW9ucyk7XG4gIH1cbiAgYXNOZXN0ZWRUZXN0KGNvbmZpZykge1xuICAgIGxldCB7XG4gICAgICBrZXksXG4gICAgICBpbmRleCxcbiAgICAgIHBhcmVudCxcbiAgICAgIG9wdGlvbnNcbiAgICB9ID0gY29uZmlnO1xuICAgIGxldCB2YWx1ZSA9IHBhcmVudFtpbmRleCAhPSBudWxsID8gaW5kZXggOiBrZXldO1xuICAgIHJldHVybiB0aGlzLl9yZXNvbHZlKHZhbHVlLCBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7XG4gICAgICB2YWx1ZSxcbiAgICAgIHBhcmVudFxuICAgIH0pKS5hc05lc3RlZFRlc3QoY29uZmlnKTtcbiAgfVxuICB2YWxpZGF0ZSh2YWx1ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9yZXNvbHZlKHZhbHVlLCBvcHRpb25zKS52YWxpZGF0ZSh2YWx1ZSwgb3B0aW9ucyk7XG4gIH1cbiAgdmFsaWRhdGVTeW5jKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jlc29sdmUodmFsdWUsIG9wdGlvbnMpLnZhbGlkYXRlU3luYyh2YWx1ZSwgb3B0aW9ucyk7XG4gIH1cbiAgdmFsaWRhdGVBdChwYXRoLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9yZXNvbHZlKHZhbHVlLCBvcHRpb25zKS52YWxpZGF0ZUF0KHBhdGgsIHZhbHVlLCBvcHRpb25zKTtcbiAgfVxuICB2YWxpZGF0ZVN5bmNBdChwYXRoLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9yZXNvbHZlKHZhbHVlLCBvcHRpb25zKS52YWxpZGF0ZVN5bmNBdChwYXRoLCB2YWx1ZSwgb3B0aW9ucyk7XG4gIH1cbiAgaXNWYWxpZCh2YWx1ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9yZXNvbHZlKHZhbHVlLCBvcHRpb25zKS5pc1ZhbGlkKHZhbHVlLCBvcHRpb25zKTtcbiAgfVxuICBpc1ZhbGlkU3luYyh2YWx1ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9yZXNvbHZlKHZhbHVlLCBvcHRpb25zKS5pc1ZhbGlkU3luYyh2YWx1ZSwgb3B0aW9ucyk7XG4gIH1cbiAgZGVzY3JpYmUob3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zID8gdGhpcy5yZXNvbHZlKG9wdGlvbnMpLmRlc2NyaWJlKG9wdGlvbnMpIDoge1xuICAgICAgdHlwZTogJ2xhenknLFxuICAgICAgbWV0YTogdGhpcy5zcGVjLm1ldGEsXG4gICAgICBsYWJlbDogdW5kZWZpbmVkXG4gICAgfTtcbiAgfVxuICBtZXRhKC4uLmFyZ3MpIHtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHJldHVybiB0aGlzLnNwZWMubWV0YTtcbiAgICBsZXQgbmV4dCA9IHRoaXMuY2xvbmUoKTtcbiAgICBuZXh0LnNwZWMubWV0YSA9IE9iamVjdC5hc3NpZ24obmV4dC5zcGVjLm1ldGEgfHwge30sIGFyZ3NbMF0pO1xuICAgIHJldHVybiBuZXh0O1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldExvY2FsZShjdXN0b20pIHtcbiAgT2JqZWN0LmtleXMoY3VzdG9tKS5mb3JFYWNoKHR5cGUgPT4ge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBPYmplY3Qua2V5cyhjdXN0b21bdHlwZV0pLmZvckVhY2gobWV0aG9kID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGxvY2FsZVt0eXBlXVttZXRob2RdID0gY3VzdG9tW3R5cGVdW21ldGhvZF07XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRNZXRob2Qoc2NoZW1hVHlwZSwgbmFtZSwgZm4pIHtcbiAgaWYgKCFzY2hlbWFUeXBlIHx8ICFpc1NjaGVtYShzY2hlbWFUeXBlLnByb3RvdHlwZSkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgYSB5dXAgc2NoZW1hIGNvbnN0cnVjdG9yIGZ1bmN0aW9uJyk7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0EgTWV0aG9kIG5hbWUgbXVzdCBiZSBwcm92aWRlZCcpO1xuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdNZXRob2QgZnVuY3Rpb24gbXVzdCBiZSBwcm92aWRlZCcpO1xuICBzY2hlbWFUeXBlLnByb3RvdHlwZVtuYW1lXSA9IGZuO1xufVxuXG5leHBvcnQgeyBBcnJheVNjaGVtYSwgQm9vbGVhblNjaGVtYSwgRGF0ZVNjaGVtYSwgTWl4ZWRTY2hlbWEsIE51bWJlclNjaGVtYSwgT2JqZWN0U2NoZW1hLCBTY2hlbWEsIFN0cmluZ1NjaGVtYSwgVHVwbGVTY2hlbWEsIFZhbGlkYXRpb25FcnJvciwgYWRkTWV0aG9kLCBjcmVhdGUkMiBhcyBhcnJheSwgY3JlYXRlJDcgYXMgYm9vbCwgY3JlYXRlJDcgYXMgYm9vbGVhbiwgY3JlYXRlJDQgYXMgZGF0ZSwgZ2V0SW4sIGlzU2NoZW1hLCBjcmVhdGUgYXMgbGF6eSwgY3JlYXRlJDggYXMgbWl4ZWQsIGNyZWF0ZSQ1IGFzIG51bWJlciwgY3JlYXRlJDMgYXMgb2JqZWN0LCByZWFjaCwgY3JlYXRlJDkgYXMgcmVmLCBzZXRMb2NhbGUsIGNyZWF0ZSQ2IGFzIHN0cmluZywgY3JlYXRlJDEgYXMgdHVwbGUgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9