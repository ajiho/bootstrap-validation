/*!
 * bootstrap-validation v0.0.1 (https://gitee.com/ajiho/bootstrap-validation)
 * Copyright 2023-2023 ajiho
 * license MIT (https://gitee.com/ajiho/bootstrap-validation/blob/master/LICENSE)
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.BootstrapValidation = factory(global.jQuery));
})(this, (function ($$6) { 'use strict';

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
    return _classApplyDescriptorGet(receiver, descriptor);
  }
  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
    _classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
  function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
  }
  function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }
  }
  function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
  }
  function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
  function _classPrivateFieldInitSpec(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }
  function _classPrivateMethodInitSpec(obj, privateSet) {
    _checkPrivateRedeclaration(obj, privateSet);
    privateSet.add(obj);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var check = function (it) {
    return it && it.Math === Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$g =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$i = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$h = fails$i;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$h(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
  });

  var fails$g = fails$i;

  var functionBindNative = !fails$g(function () {
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var test = (function () { /* empty */ }).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var NATIVE_BIND$2 = functionBindNative;

  var call$9 = Function.prototype.call;

  var functionCall = NATIVE_BIND$2 ? call$9.bind(call$9) : function () {
    return call$9.apply(call$9, arguments);
  };

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$2(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;

  var createPropertyDescriptor$4 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var NATIVE_BIND$1 = functionBindNative;

  var FunctionPrototype$2 = Function.prototype;
  var call$8 = FunctionPrototype$2.call;
  var uncurryThisWithBind = NATIVE_BIND$1 && FunctionPrototype$2.bind.bind(call$8, call$8);

  var functionUncurryThis = NATIVE_BIND$1 ? uncurryThisWithBind : function (fn) {
    return function () {
      return call$8.apply(fn, arguments);
    };
  };

  var uncurryThis$h = functionUncurryThis;

  var toString$7 = uncurryThis$h({}.toString);
  var stringSlice$5 = uncurryThis$h(''.slice);

  var classofRaw$2 = function (it) {
    return stringSlice$5(toString$7(it), 8, -1);
  };

  var uncurryThis$g = functionUncurryThis;
  var fails$f = fails$i;
  var classof$4 = classofRaw$2;

  var $Object$4 = Object;
  var split = uncurryThis$g(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$f(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object$4('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$4(it) === 'String' ? split(it, '') : $Object$4(it);
  } : $Object$4;

  // we can't use just `it == null` since of `document.all` special case
  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
  var isNullOrUndefined$3 = function (it) {
    return it === null || it === undefined;
  };

  var isNullOrUndefined$2 = isNullOrUndefined$3;

  var $TypeError$9 = TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$5 = function (it) {
    if (isNullOrUndefined$2(it)) throw new $TypeError$9("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject = indexedObject;
  var requireObjectCoercible$4 = requireObjectCoercible$5;

  var toIndexedObject$5 = function (it) {
    return IndexedObject(requireObjectCoercible$4(it));
  };

  var documentAll$2 = typeof document == 'object' && document.all;

  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
  // eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
  var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

  var documentAll_1 = {
    all: documentAll$2,
    IS_HTMLDDA: IS_HTMLDDA
  };

  var $documentAll$1 = documentAll_1;

  var documentAll$1 = $documentAll$1.all;

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable$i = $documentAll$1.IS_HTMLDDA ? function (argument) {
    return typeof argument == 'function' || argument === documentAll$1;
  } : function (argument) {
    return typeof argument == 'function';
  };

  var isCallable$h = isCallable$i;
  var $documentAll = documentAll_1;

  var documentAll = $documentAll.all;

  var isObject$8 = $documentAll.IS_HTMLDDA ? function (it) {
    return typeof it == 'object' ? it !== null : isCallable$h(it) || it === documentAll;
  } : function (it) {
    return typeof it == 'object' ? it !== null : isCallable$h(it);
  };

  var global$f = global$g;
  var isCallable$g = isCallable$i;

  var aFunction = function (argument) {
    return isCallable$g(argument) ? argument : undefined;
  };

  var getBuiltIn$4 = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global$f[namespace]) : global$f[namespace] && global$f[namespace][method];
  };

  var uncurryThis$f = functionUncurryThis;

  var objectIsPrototypeOf = uncurryThis$f({}.isPrototypeOf);

  var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

  var global$e = global$g;
  var userAgent = engineUserAgent;

  var process = global$e.process;
  var Deno = global$e.Deno;
  var versions = process && process.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }

  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version && userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }

  var engineV8Version = version;

  /* eslint-disable es/no-symbol -- required for testing */
  var V8_VERSION = engineV8Version;
  var fails$e = fails$i;
  var global$d = global$g;

  var $String$5 = global$d.String;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$e(function () {
    var symbol = Symbol('symbol detection');
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
    // of course, fail.
    return !$String$5(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION && V8_VERSION < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */
  var NATIVE_SYMBOL$1 = symbolConstructorDetection;

  var useSymbolAsUid = NATIVE_SYMBOL$1
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var getBuiltIn$3 = getBuiltIn$4;
  var isCallable$f = isCallable$i;
  var isPrototypeOf$1 = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

  var $Object$3 = Object;

  var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$3('Symbol');
    return isCallable$f($Symbol) && isPrototypeOf$1($Symbol.prototype, $Object$3(it));
  };

  var $String$4 = String;

  var tryToString$1 = function (argument) {
    try {
      return $String$4(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var isCallable$e = isCallable$i;
  var tryToString = tryToString$1;

  var $TypeError$8 = TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable$2 = function (argument) {
    if (isCallable$e(argument)) return argument;
    throw new $TypeError$8(tryToString(argument) + ' is not a function');
  };

  var aCallable$1 = aCallable$2;
  var isNullOrUndefined$1 = isNullOrUndefined$3;

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod$2 = function (V, P) {
    var func = V[P];
    return isNullOrUndefined$1(func) ? undefined : aCallable$1(func);
  };

  var call$7 = functionCall;
  var isCallable$d = isCallable$i;
  var isObject$7 = isObject$8;

  var $TypeError$7 = TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$d(fn = input.toString) && !isObject$7(val = call$7(fn, input))) return val;
    if (isCallable$d(fn = input.valueOf) && !isObject$7(val = call$7(fn, input))) return val;
    if (pref !== 'string' && isCallable$d(fn = input.toString) && !isObject$7(val = call$7(fn, input))) return val;
    throw new $TypeError$7("Can't convert object to primitive value");
  };

  var shared$4 = {exports: {}};

  var global$c = global$g;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$5 = Object.defineProperty;

  var defineGlobalProperty$3 = function (key, value) {
    try {
      defineProperty$5(global$c, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global$c[key] = value;
    } return value;
  };

  var global$b = global$g;
  var defineGlobalProperty$2 = defineGlobalProperty$3;

  var SHARED = '__core-js_shared__';
  var store$3 = global$b[SHARED] || defineGlobalProperty$2(SHARED, {});

  var sharedStore = store$3;

  var store$2 = sharedStore;

  (shared$4.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.34.0',
    mode: 'global',
    copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.34.0/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });

  var sharedExports = shared$4.exports;

  var requireObjectCoercible$3 = requireObjectCoercible$5;

  var $Object$2 = Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$4 = function (argument) {
    return $Object$2(requireObjectCoercible$3(argument));
  };

  var uncurryThis$e = functionUncurryThis;
  var toObject$3 = toObject$4;

  var hasOwnProperty = uncurryThis$e({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  // eslint-disable-next-line es/no-object-hasown -- safe
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject$3(it), key);
  };

  var uncurryThis$d = functionUncurryThis;

  var id = 0;
  var postfix = Math.random();
  var toString$6 = uncurryThis$d(1.0.toString);

  var uid$2 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$6(++id + postfix, 36);
  };

  var global$a = global$g;
  var shared$3 = sharedExports;
  var hasOwn$9 = hasOwnProperty_1;
  var uid$1 = uid$2;
  var NATIVE_SYMBOL = symbolConstructorDetection;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;

  var Symbol$1 = global$a.Symbol;
  var WellKnownSymbolsStore = shared$3('wks');
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1['for'] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

  var wellKnownSymbol$a = function (name) {
    if (!hasOwn$9(WellKnownSymbolsStore, name)) {
      WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$9(Symbol$1, name)
        ? Symbol$1[name]
        : createWellKnownSymbol('Symbol.' + name);
    } return WellKnownSymbolsStore[name];
  };

  var call$6 = functionCall;
  var isObject$6 = isObject$8;
  var isSymbol$1 = isSymbol$2;
  var getMethod$1 = getMethod$2;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$9 = wellKnownSymbol$a;

  var $TypeError$6 = TypeError;
  var TO_PRIMITIVE = wellKnownSymbol$9('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$1 = function (input, pref) {
    if (!isObject$6(input) || isSymbol$1(input)) return input;
    var exoticToPrim = getMethod$1(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$6(exoticToPrim, input, pref);
      if (!isObject$6(result) || isSymbol$1(result)) return result;
      throw new $TypeError$6("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive = toPrimitive$1;
  var isSymbol = isSymbol$2;

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$2 = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
  };

  var global$9 = global$g;
  var isObject$5 = isObject$8;

  var document$1 = global$9.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$1 = isObject$5(document$1) && isObject$5(document$1.createElement);

  var documentCreateElement$2 = function (it) {
    return EXISTS$1 ? document$1.createElement(it) : {};
  };

  var DESCRIPTORS$a = descriptors;
  var fails$d = fails$i;
  var createElement = documentCreateElement$2;

  // Thanks to IE8 for its funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$a && !fails$d(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () { return 7; }
    }).a !== 7;
  });

  var DESCRIPTORS$9 = descriptors;
  var call$5 = functionCall;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createPropertyDescriptor$3 = createPropertyDescriptor$4;
  var toIndexedObject$4 = toIndexedObject$5;
  var toPropertyKey$1 = toPropertyKey$2;
  var hasOwn$8 = hasOwnProperty_1;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$9 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$4(O);
    P = toPropertyKey$1(P);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) { /* empty */ }
    if (hasOwn$8(O, P)) return createPropertyDescriptor$3(!call$5(propertyIsEnumerableModule.f, O, P), O[P]);
  };

  var objectDefineProperty = {};

  var DESCRIPTORS$8 = descriptors;
  var fails$c = fails$i;

  // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334
  var v8PrototypeDefineBug = DESCRIPTORS$8 && fails$c(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () { /* empty */ }, 'prototype', {
      value: 42,
      writable: false
    }).prototype !== 42;
  });

  var isObject$4 = isObject$8;

  var $String$3 = String;
  var $TypeError$5 = TypeError;

  // `Assert: Type(argument) is Object`
  var anObject$8 = function (argument) {
    if (isObject$4(argument)) return argument;
    throw new $TypeError$5($String$3(argument) + ' is not an object');
  };

  var DESCRIPTORS$7 = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
  var anObject$7 = anObject$8;
  var toPropertyKey = toPropertyKey$2;

  var $TypeError$4 = TypeError;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE$1 = 'configurable';
  var WRITABLE = 'writable';

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$7 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
    anObject$7(O);
    P = toPropertyKey(P);
    anObject$7(Attributes);
    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor(O, P);
      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    } return $defineProperty(O, P, Attributes);
  } : $defineProperty : function defineProperty(O, P, Attributes) {
    anObject$7(O);
    P = toPropertyKey(P);
    anObject$7(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$4('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$6 = descriptors;
  var definePropertyModule$3 = objectDefineProperty;
  var createPropertyDescriptor$2 = createPropertyDescriptor$4;

  var createNonEnumerableProperty$8 = DESCRIPTORS$6 ? function (object, key, value) {
    return definePropertyModule$3.f(object, key, createPropertyDescriptor$2(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var makeBuiltIn$2 = {exports: {}};

  var DESCRIPTORS$5 = descriptors;
  var hasOwn$7 = hasOwnProperty_1;

  var FunctionPrototype$1 = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = DESCRIPTORS$5 && Object.getOwnPropertyDescriptor;

  var EXISTS = hasOwn$7(FunctionPrototype$1, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE = EXISTS && (!DESCRIPTORS$5 || (DESCRIPTORS$5 && getDescriptor(FunctionPrototype$1, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var uncurryThis$c = functionUncurryThis;
  var isCallable$c = isCallable$i;
  var store$1 = sharedStore;

  var functionToString = uncurryThis$c(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$c(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString(it);
    };
  }

  var inspectSource$1 = store$1.inspectSource;

  var global$8 = global$g;
  var isCallable$b = isCallable$i;

  var WeakMap$2 = global$8.WeakMap;

  var weakMapBasicDetection = isCallable$b(WeakMap$2) && /native code/.test(String(WeakMap$2));

  var shared$2 = sharedExports;
  var uid = uid$2;

  var keys = shared$2('keys');

  var sharedKey$3 = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys$4 = {};

  var NATIVE_WEAK_MAP = weakMapBasicDetection;
  var global$7 = global$g;
  var isObject$3 = isObject$8;
  var createNonEnumerableProperty$7 = createNonEnumerableProperty$8;
  var hasOwn$6 = hasOwnProperty_1;
  var shared$1 = sharedStore;
  var sharedKey$2 = sharedKey$3;
  var hiddenKeys$3 = hiddenKeys$4;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$1 = global$7.TypeError;
  var WeakMap$1 = global$7.WeakMap;
  var set, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$3(it) || (state = get(it)).type !== TYPE) {
        throw new TypeError$1('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared$1.state) {
    var store = shared$1.state || (shared$1.state = new WeakMap$1());
    /* eslint-disable no-self-assign -- prototype methods protection */
    store.get = store.get;
    store.has = store.has;
    store.set = store.set;
    /* eslint-enable no-self-assign -- prototype methods protection */
    set = function (it, metadata) {
      if (store.has(it)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      store.set(it, metadata);
      return metadata;
    };
    get = function (it) {
      return store.get(it) || {};
    };
    has = function (it) {
      return store.has(it);
    };
  } else {
    var STATE = sharedKey$2('state');
    hiddenKeys$3[STATE] = true;
    set = function (it, metadata) {
      if (hasOwn$6(it, STATE)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$7(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return hasOwn$6(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwn$6(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var uncurryThis$b = functionUncurryThis;
  var fails$b = fails$i;
  var isCallable$a = isCallable$i;
  var hasOwn$5 = hasOwnProperty_1;
  var DESCRIPTORS$4 = descriptors;
  var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
  var inspectSource = inspectSource$1;
  var InternalStateModule$1 = internalState;

  var enforceInternalState = InternalStateModule$1.enforce;
  var getInternalState$2 = InternalStateModule$1.get;
  var $String$2 = String;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$4 = Object.defineProperty;
  var stringSlice$4 = uncurryThis$b(''.slice);
  var replace$4 = uncurryThis$b(''.replace);
  var join = uncurryThis$b([].join);

  var CONFIGURABLE_LENGTH = DESCRIPTORS$4 && !fails$b(function () {
    return defineProperty$4(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
  });

  var TEMPLATE = String(String).split('String');

  var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
    if (stringSlice$4($String$2(name), 0, 7) === 'Symbol(') {
      name = '[' + replace$4($String$2(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (options && options.getter) name = 'get ' + name;
    if (options && options.setter) name = 'set ' + name;
    if (!hasOwn$5(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
      if (DESCRIPTORS$4) defineProperty$4(value, 'name', { value: name, configurable: true });
      else value.name = name;
    }
    if (CONFIGURABLE_LENGTH && options && hasOwn$5(options, 'arity') && value.length !== options.arity) {
      defineProperty$4(value, 'length', { value: options.arity });
    }
    try {
      if (options && hasOwn$5(options, 'constructor') && options.constructor) {
        if (DESCRIPTORS$4) defineProperty$4(value, 'prototype', { writable: false });
      // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
      } else if (value.prototype) value.prototype = undefined;
    } catch (error) { /* empty */ }
    var state = enforceInternalState(value);
    if (!hasOwn$5(state, 'source')) {
      state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
    } return value;
  };

  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  // eslint-disable-next-line no-extend-native -- required
  Function.prototype.toString = makeBuiltIn$1(function toString() {
    return isCallable$a(this) && getInternalState$2(this).source || inspectSource(this);
  }, 'toString');

  var makeBuiltInExports = makeBuiltIn$2.exports;

  var isCallable$9 = isCallable$i;
  var definePropertyModule$2 = objectDefineProperty;
  var makeBuiltIn = makeBuiltInExports;
  var defineGlobalProperty$1 = defineGlobalProperty$3;

  var defineBuiltIn$4 = function (O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== undefined ? options.name : key;
    if (isCallable$9(value)) makeBuiltIn(value, name, options);
    if (options.global) {
      if (simple) O[key] = value;
      else defineGlobalProperty$1(key, value);
    } else {
      try {
        if (!options.unsafe) delete O[key];
        else if (O[key]) simple = true;
      } catch (error) { /* empty */ }
      if (simple) O[key] = value;
      else definePropertyModule$2.f(O, key, {
        value: value,
        enumerable: false,
        configurable: !options.nonConfigurable,
        writable: !options.nonWritable
      });
    } return O;
  };

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor$1 = Math.floor;

  // `Math.trunc` method
  // https://tc39.es/ecma262/#sec-math.trunc
  // eslint-disable-next-line es/no-math-trunc -- safe
  var mathTrunc = Math.trunc || function trunc(x) {
    var n = +x;
    return (n > 0 ? floor$1 : ceil)(n);
  };

  var trunc = mathTrunc;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity$4 = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : trunc(number);
  };

  var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;

  var max$1 = Math.max;
  var min$2 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$1 = function (index, length) {
    var integer = toIntegerOrInfinity$3(index);
    return integer < 0 ? max$1(integer + length, 0) : min$2(integer, length);
  };

  var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;

  var min$1 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$2 = function (argument) {
    return argument > 0 ? min$1(toIntegerOrInfinity$2(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength$1 = toLength$2;

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike$2 = function (obj) {
    return toLength$1(obj.length);
  };

  var toIndexedObject$3 = toIndexedObject$5;
  var toAbsoluteIndex = toAbsoluteIndex$1;
  var lengthOfArrayLike$1 = lengthOfArrayLike$2;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$2 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$3($this);
      var length = lengthOfArrayLike$1(O);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el !== el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value !== value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$2(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$2(false)
  };

  var uncurryThis$a = functionUncurryThis;
  var hasOwn$4 = hasOwnProperty_1;
  var toIndexedObject$2 = toIndexedObject$5;
  var indexOf$1 = arrayIncludes.indexOf;
  var hiddenKeys$2 = hiddenKeys$4;

  var push$1 = uncurryThis$a([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$2(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn$4(hiddenKeys$2, key) && hasOwn$4(O, key) && push$1(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwn$4(O, key = names[i++])) {
      ~indexOf$1(result, key) || push$1(result, key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys$3 = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;

  var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$1);
  };

  var objectGetOwnPropertySymbols = {};

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$2 = getBuiltIn$4;
  var uncurryThis$9 = functionUncurryThis;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var anObject$6 = anObject$8;

  var concat$1 = uncurryThis$9([].concat);

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn$2('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$6(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
  };

  var hasOwn$3 = hasOwnProperty_1;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$1 = objectDefineProperty;

  var copyConstructorProperties$2 = function (target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$1.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn$3(target, key) && !(exceptions && hasOwn$3(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  var fails$a = fails$i;
  var isCallable$8 = isCallable$i;

  var replacement = /#|\.prototype\./;

  var isForced$1 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value === POLYFILL ? true
      : value === NATIVE ? false
      : isCallable$8(detection) ? fails$a(detection)
      : !!detection;
  };

  var normalize = isForced$1.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$1.data = {};
  var NATIVE = isForced$1.NATIVE = 'N';
  var POLYFILL = isForced$1.POLYFILL = 'P';

  var isForced_1 = isForced$1;

  var global$6 = global$g;
  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$8;
  var defineBuiltIn$3 = defineBuiltIn$4;
  var defineGlobalProperty = defineGlobalProperty$3;
  var copyConstructorProperties$1 = copyConstructorProperties$2;
  var isForced = isForced_1;

  /*
    options.target         - name of the target object
    options.global         - target is the global object
    options.stat           - export as static methods of target
    options.proto          - export as prototype methods of target
    options.real           - real prototype method for the `pure` version
    options.forced         - export even if the native feature is available
    options.bind           - bind methods to the target, required for the `pure` version
    options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe         - use the simple assignment of property instead of delete + defineProperty
    options.sham           - add a flag to not completely full polyfills
    options.enumerable     - export as enumerable property
    options.dontCallGetSet - prevent calling a getter on target
    options.name           - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$6;
    } else if (STATIC) {
      target = global$6[TARGET] || defineGlobalProperty(TARGET, {});
    } else {
      target = (global$6[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties$1(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$6(sourceProperty, 'sham', true);
      }
      defineBuiltIn$3(target, key, sourceProperty, options);
    }
  };

  var NATIVE_BIND = functionBindNative;

  var FunctionPrototype = Function.prototype;
  var apply$2 = FunctionPrototype.apply;
  var call$4 = FunctionPrototype.call;

  // eslint-disable-next-line es/no-reflect -- safe
  var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$4.bind(apply$2) : function () {
    return call$4.apply(apply$2, arguments);
  });

  var uncurryThis$8 = functionUncurryThis;
  var aCallable = aCallable$2;

  var functionUncurryThisAccessor = function (object, key, method) {
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      return uncurryThis$8(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
    } catch (error) { /* empty */ }
  };

  var isCallable$7 = isCallable$i;

  var $String$1 = String;
  var $TypeError$3 = TypeError;

  var aPossiblePrototype$1 = function (argument) {
    if (typeof argument == 'object' || isCallable$7(argument)) return argument;
    throw new $TypeError$3("Can't set " + $String$1(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */
  var uncurryThisAccessor = functionUncurryThisAccessor;
  var anObject$5 = anObject$8;
  var aPossiblePrototype = aPossiblePrototype$1;

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject$5(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var defineProperty$3 = objectDefineProperty.f;

  var proxyAccessor$1 = function (Target, Source, key) {
    key in Target || defineProperty$3(Target, key, {
      configurable: true,
      get: function () { return Source[key]; },
      set: function (it) { Source[key] = it; }
    });
  };

  var isCallable$6 = isCallable$i;
  var isObject$2 = isObject$8;
  var setPrototypeOf$2 = objectSetPrototypeOf;

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      setPrototypeOf$2 &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      isCallable$6(NewTarget = dummy.constructor) &&
      NewTarget !== Wrapper &&
      isObject$2(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) setPrototypeOf$2($this, NewTargetPrototype);
    return $this;
  };

  var wellKnownSymbol$8 = wellKnownSymbol$a;

  var TO_STRING_TAG$2 = wellKnownSymbol$8('toStringTag');
  var test = {};

  test[TO_STRING_TAG$2] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var isCallable$5 = isCallable$i;
  var classofRaw$1 = classofRaw$2;
  var wellKnownSymbol$7 = wellKnownSymbol$a;

  var TO_STRING_TAG$1 = wellKnownSymbol$7('toStringTag');
  var $Object$1 = Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw$1(function () { return arguments; }()) === 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$3 = TO_STRING_TAG_SUPPORT ? classofRaw$1 : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw$1(O)
      // ES3 arguments fallback
      : (result = classofRaw$1(O)) === 'Object' && isCallable$5(O.callee) ? 'Arguments' : result;
  };

  var classof$2 = classof$3;

  var $String = String;

  var toString$5 = function (argument) {
    if (classof$2(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
    return $String(argument);
  };

  var toString$4 = toString$5;

  var normalizeStringArgument$1 = function (argument, $default) {
    return argument === undefined ? arguments.length < 2 ? '' : $default : toString$4(argument);
  };

  var isObject$1 = isObject$8;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$8;

  // `InstallErrorCause` abstract operation
  // https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
  var installErrorCause$1 = function (O, options) {
    if (isObject$1(options) && 'cause' in options) {
      createNonEnumerableProperty$5(O, 'cause', options.cause);
    }
  };

  var uncurryThis$7 = functionUncurryThis;

  var $Error = Error;
  var replace$3 = uncurryThis$7(''.replace);

  var TEST = (function (arg) { return String(new $Error(arg).stack); })('zxcasd');
  // eslint-disable-next-line redos/no-vulnerable -- safe
  var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
  var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

  var errorStackClear = function (stack, dropEntries) {
    if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
      while (dropEntries--) stack = replace$3(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
    } return stack;
  };

  var fails$9 = fails$i;
  var createPropertyDescriptor$1 = createPropertyDescriptor$4;

  var errorStackInstallable = !fails$9(function () {
    var error = new Error('a');
    if (!('stack' in error)) return true;
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(error, 'stack', createPropertyDescriptor$1(1, 7));
    return error.stack !== 7;
  });

  var createNonEnumerableProperty$4 = createNonEnumerableProperty$8;
  var clearErrorStack = errorStackClear;
  var ERROR_STACK_INSTALLABLE = errorStackInstallable;

  // non-standard V8
  var captureStackTrace = Error.captureStackTrace;

  var errorStackInstall = function (error, C, stack, dropEntries) {
    if (ERROR_STACK_INSTALLABLE) {
      if (captureStackTrace) captureStackTrace(error, C);
      else createNonEnumerableProperty$4(error, 'stack', clearErrorStack(stack, dropEntries));
    }
  };

  var getBuiltIn$1 = getBuiltIn$4;
  var hasOwn$2 = hasOwnProperty_1;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$8;
  var isPrototypeOf = objectIsPrototypeOf;
  var setPrototypeOf$1 = objectSetPrototypeOf;
  var copyConstructorProperties = copyConstructorProperties$2;
  var proxyAccessor = proxyAccessor$1;
  var inheritIfRequired = inheritIfRequired$1;
  var normalizeStringArgument = normalizeStringArgument$1;
  var installErrorCause = installErrorCause$1;
  var installErrorStack = errorStackInstall;
  var DESCRIPTORS$3 = descriptors;

  var wrapErrorConstructorWithCause$1 = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
    var STACK_TRACE_LIMIT = 'stackTraceLimit';
    var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
    var path = FULL_NAME.split('.');
    var ERROR_NAME = path[path.length - 1];
    var OriginalError = getBuiltIn$1.apply(null, path);

    if (!OriginalError) return;

    var OriginalErrorPrototype = OriginalError.prototype;

    // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
    if (hasOwn$2(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

    if (!FORCED) return OriginalError;

    var BaseError = getBuiltIn$1('Error');

    var WrappedError = wrapper(function (a, b) {
      var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
      var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
      if (message !== undefined) createNonEnumerableProperty$3(result, 'message', message);
      installErrorStack(result, WrappedError, result.stack, 2);
      if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
      if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
      return result;
    });

    WrappedError.prototype = OriginalErrorPrototype;

    if (ERROR_NAME !== 'Error') {
      if (setPrototypeOf$1) setPrototypeOf$1(WrappedError, BaseError);
      else copyConstructorProperties(WrappedError, BaseError, { name: true });
    } else if (DESCRIPTORS$3 && STACK_TRACE_LIMIT in OriginalError) {
      proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
      proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
    }

    copyConstructorProperties(WrappedError, OriginalError);

    try {
      // Safari 13- bug: WebAssembly errors does not have a proper `.name`
      if (OriginalErrorPrototype.name !== ERROR_NAME) {
        createNonEnumerableProperty$3(OriginalErrorPrototype, 'name', ERROR_NAME);
      }
      OriginalErrorPrototype.constructor = WrappedError;
    } catch (error) { /* empty */ }

    return WrappedError;
  };

  /* eslint-disable no-unused-vars -- required for functions `.length` */
  var $$5 = _export;
  var global$5 = global$g;
  var apply$1 = functionApply;
  var wrapErrorConstructorWithCause = wrapErrorConstructorWithCause$1;

  var WEB_ASSEMBLY = 'WebAssembly';
  var WebAssembly = global$5[WEB_ASSEMBLY];

  // eslint-disable-next-line es/no-error-cause -- feature detection
  var FORCED$1 = new Error('e', { cause: 7 }).cause !== 7;

  var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED$1);
    $$5({ global: true, constructor: true, arity: 1, forced: FORCED$1 }, O);
  };

  var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
    if (WebAssembly && WebAssembly[ERROR_NAME]) {
      var O = {};
      O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED$1);
      $$5({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED$1 }, O);
    }
  };

  // https://tc39.es/ecma262/#sec-nativeerror
  exportGlobalErrorCauseWrapper('Error', function (init) {
    return function Error(message) { return apply$1(init, this, arguments); };
  });
  exportGlobalErrorCauseWrapper('EvalError', function (init) {
    return function EvalError(message) { return apply$1(init, this, arguments); };
  });
  exportGlobalErrorCauseWrapper('RangeError', function (init) {
    return function RangeError(message) { return apply$1(init, this, arguments); };
  });
  exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
    return function ReferenceError(message) { return apply$1(init, this, arguments); };
  });
  exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
    return function SyntaxError(message) { return apply$1(init, this, arguments); };
  });
  exportGlobalErrorCauseWrapper('TypeError', function (init) {
    return function TypeError(message) { return apply$1(init, this, arguments); };
  });
  exportGlobalErrorCauseWrapper('URIError', function (init) {
    return function URIError(message) { return apply$1(init, this, arguments); };
  });
  exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
    return function CompileError(message) { return apply$1(init, this, arguments); };
  });
  exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
    return function LinkError(message) { return apply$1(init, this, arguments); };
  });
  exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
    return function RuntimeError(message) { return apply$1(init, this, arguments); };
  });

  var objectDefineProperties = {};

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$1 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

  var DESCRIPTORS$2 = descriptors;
  var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
  var definePropertyModule = objectDefineProperty;
  var anObject$4 = anObject$8;
  var toIndexedObject$1 = toIndexedObject$5;
  var objectKeys = objectKeys$1;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  objectDefineProperties.f = DESCRIPTORS$2 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$4(O);
    var props = toIndexedObject$1(Properties);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
    return O;
  };

  var getBuiltIn = getBuiltIn$4;

  var html$1 = getBuiltIn('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */
  var anObject$3 = anObject$8;
  var definePropertiesModule = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys = hiddenKeys$4;
  var html = html$1;
  var documentCreateElement$1 = documentCreateElement$2;
  var sharedKey$1 = sharedKey$3;

  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey$1('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement$1('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  // eslint-disable-next-line es/no-object-create -- safe
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$3(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
  };

  var wellKnownSymbol$6 = wellKnownSymbol$a;
  var create$2 = objectCreate;
  var defineProperty$2 = objectDefineProperty.f;

  var UNSCOPABLES = wellKnownSymbol$6('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] === undefined) {
    defineProperty$2(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: create$2(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables$1 = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var iterators = {};

  var fails$8 = fails$i;

  var correctPrototypeGetter = !fails$8(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var hasOwn$1 = hasOwnProperty_1;
  var isCallable$4 = isCallable$i;
  var toObject$2 = toObject$4;
  var sharedKey = sharedKey$3;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

  var IE_PROTO = sharedKey('IE_PROTO');
  var $Object = Object;
  var ObjectPrototype = $Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
    var object = toObject$2(O);
    if (hasOwn$1(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable$4(constructor) && object instanceof constructor) {
      return constructor.prototype;
    } return object instanceof $Object ? ObjectPrototype : null;
  };

  var fails$7 = fails$i;
  var isCallable$3 = isCallable$i;
  var isObject = isObject$8;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var defineBuiltIn$2 = defineBuiltIn$4;
  var wellKnownSymbol$5 = wellKnownSymbol$a;

  var ITERATOR$2 = wellKnownSymbol$5('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype$2) || fails$7(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$2].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable$3(IteratorPrototype$2[ITERATOR$2])) {
    defineBuiltIn$2(IteratorPrototype$2, ITERATOR$2, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var defineProperty$1 = objectDefineProperty.f;
  var hasOwn = hasOwnProperty_1;
  var wellKnownSymbol$4 = wellKnownSymbol$a;

  var TO_STRING_TAG = wellKnownSymbol$4('toStringTag');

  var setToStringTag$3 = function (target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;
    if (target && !hasOwn(target, TO_STRING_TAG)) {
      defineProperty$1(target, TO_STRING_TAG, { configurable: true, value: TAG });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create$1 = objectCreate;
  var createPropertyDescriptor = createPropertyDescriptor$4;
  var setToStringTag$2 = setToStringTag$3;
  var Iterators$2 = iterators;

  var returnThis$1 = function () { return this; };

  var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$1(IteratorPrototype$1, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
    setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$2[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var $$4 = _export;
  var call$3 = functionCall;
  var FunctionName = functionName;
  var isCallable$2 = isCallable$i;
  var createIteratorConstructor = iteratorCreateConstructor;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf = objectSetPrototypeOf;
  var setToStringTag$1 = setToStringTag$3;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$8;
  var defineBuiltIn$1 = defineBuiltIn$4;
  var wellKnownSymbol$3 = wellKnownSymbol$a;
  var Iterators$1 = iterators;
  var IteratorsCore = iteratorsCore;

  var PROPER_FUNCTION_NAME$1 = FunctionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$1 = wellKnownSymbol$3('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () { return this; };

  var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      }

      return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$1]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf) {
            setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
          } else if (!isCallable$2(CurrentIteratorPrototype[ITERATOR$1])) {
            defineBuiltIn$1(CurrentIteratorPrototype, ITERATOR$1, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME$1 && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (CONFIGURABLE_FUNCTION_NAME) {
        createNonEnumerableProperty$2(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return call$3(nativeIterator, this); };
      }
    }

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          defineBuiltIn$1(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$4({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
      defineBuiltIn$1(IterablePrototype, ITERATOR$1, defaultIterator, { name: DEFAULT });
    }
    Iterators$1[NAME] = defaultIterator;

    return methods;
  };

  // `CreateIterResultObject` abstract operation
  // https://tc39.es/ecma262/#sec-createiterresultobject
  var createIterResultObject$1 = function (value, done) {
    return { value: value, done: done };
  };

  var toIndexedObject = toIndexedObject$5;
  var addToUnscopables = addToUnscopables$1;
  var Iterators = iterators;
  var InternalStateModule = internalState;
  var defineProperty = objectDefineProperty.f;
  var defineIterator = iteratorDefine;
  var createIterResultObject = createIterResultObject$1;
  var DESCRIPTORS$1 = descriptors;

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState = InternalStateModule.set;
  var getInternalState$1 = InternalStateModule.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
    setInternalState(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(iterated), // target
      index: 0,                          // next index
      kind: kind                         // kind
    });
  // `%ArrayIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$1(this);
    var target = state.target;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return createIterResultObject(undefined, true);
    }
    switch (state.kind) {
      case 'keys': return createIterResultObject(index, false);
      case 'values': return createIterResultObject(target[index], false);
    } return createIterResultObject([index, target[index]], false);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  var values = Iterators.Arguments = Iterators.Array;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');

  // V8 ~ Chrome 45- bug
  if (DESCRIPTORS$1 && values.name !== 'values') try {
    defineProperty(values, 'name', { value: 'values' });
  } catch (error) { /* empty */ }

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
  var documentCreateElement = documentCreateElement$2;

  var classList = documentCreateElement('span').classList;
  var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

  var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

  var global$4 = global$g;
  var DOMIterables = domIterables;
  var DOMTokenListPrototype = domTokenListPrototype;
  var ArrayIteratorMethods = es_array_iterator;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$8;
  var setToStringTag = setToStringTag$3;
  var wellKnownSymbol$2 = wellKnownSymbol$a;

  var ITERATOR = wellKnownSymbol$2('iterator');
  var ArrayValues = ArrayIteratorMethods.values;

  var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
    if (CollectionPrototype) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
        createNonEnumerableProperty$1(CollectionPrototype, ITERATOR, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR] = ArrayValues;
      }
      setToStringTag(CollectionPrototype, COLLECTION_NAME, true);
      if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
          createNonEnumerableProperty$1(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
        }
      }
    }
  };

  for (var COLLECTION_NAME in DOMIterables) {
    handlePrototype(global$4[COLLECTION_NAME] && global$4[COLLECTION_NAME].prototype, COLLECTION_NAME);
  }

  handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

  // a string of all valid unicode whitespaces
  var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var uncurryThis$6 = functionUncurryThis;
  var requireObjectCoercible$2 = requireObjectCoercible$5;
  var toString$3 = toString$5;
  var whitespaces$1 = whitespaces$2;

  var replace$2 = uncurryThis$6(''.replace);
  var ltrim = RegExp('^[' + whitespaces$1 + ']+');
  var rtrim = RegExp('(^|[^' + whitespaces$1 + '])[' + whitespaces$1 + ']+$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$1 = function (TYPE) {
    return function ($this) {
      var string = toString$3(requireObjectCoercible$2($this));
      if (TYPE & 1) string = replace$2(string, ltrim, '');
      if (TYPE & 2) string = replace$2(string, rtrim, '$1');
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod$1(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod$1(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod$1(3)
  };

  var PROPER_FUNCTION_NAME = functionName.PROPER;
  var fails$6 = fails$i;
  var whitespaces = whitespaces$2;

  var non = '\u200B\u0085\u180E';

  // check that a method works with the correct list
  // of whitespaces and has a correct name
  var stringTrimForced = function (METHOD_NAME) {
    return fails$6(function () {
      return !!whitespaces[METHOD_NAME]()
        || non[METHOD_NAME]() !== non
        || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
    });
  };

  var $$3 = _export;
  var $trim = stringTrim.trim;
  var forcedStringTrimMethod = stringTrimForced;

  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  $$3({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
    trim: function trim() {
      return $trim(this);
    }
  });

  var anObject$2 = anObject$8;

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags$1 = function () {
    var that = anObject$2(this);
    var result = '';
    if (that.hasIndices) result += 'd';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.unicodeSets) result += 'v';
    if (that.sticky) result += 'y';
    return result;
  };

  var fails$5 = fails$i;
  var global$3 = global$g;

  // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var $RegExp$2 = global$3.RegExp;

  var UNSUPPORTED_Y$1 = fails$5(function () {
    var re = $RegExp$2('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') !== null;
  });

  // UC Browser bug
  // https://github.com/zloirock/core-js/issues/1008
  var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$5(function () {
    return !$RegExp$2('a', 'y').sticky;
  });

  var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$5(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp$2('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') !== null;
  });

  var regexpStickyHelpers = {
    BROKEN_CARET: BROKEN_CARET,
    MISSED_STICKY: MISSED_STICKY,
    UNSUPPORTED_Y: UNSUPPORTED_Y$1
  };

  var fails$4 = fails$i;
  var global$2 = global$g;

  // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var $RegExp$1 = global$2.RegExp;

  var regexpUnsupportedDotAll = fails$4(function () {
    var re = $RegExp$1('.', 's');
    return !(re.dotAll && re.test('\n') && re.flags === 's');
  });

  var fails$3 = fails$i;
  var global$1 = global$g;

  // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
  var $RegExp = global$1.RegExp;

  var regexpUnsupportedNcg = fails$3(function () {
    var re = $RegExp('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' ||
      'b'.replace(re, '$<a>c') !== 'bc';
  });

  /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */
  var call$2 = functionCall;
  var uncurryThis$5 = functionUncurryThis;
  var toString$2 = toString$5;
  var regexpFlags = regexpFlags$1;
  var stickyHelpers = regexpStickyHelpers;
  var shared = sharedExports;
  var create = objectCreate;
  var getInternalState = internalState.get;
  var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG = regexpUnsupportedNcg;

  var nativeReplace = shared('native-string-replace', String.prototype.replace);
  var nativeExec = RegExp.prototype.exec;
  var patchedExec = nativeExec;
  var charAt$3 = uncurryThis$5(''.charAt);
  var indexOf = uncurryThis$5(''.indexOf);
  var replace$1 = uncurryThis$5(''.replace);
  var stringSlice$3 = uncurryThis$5(''.slice);

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    call$2(nativeExec, re1, 'a');
    call$2(nativeExec, re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

  if (PATCH) {
    patchedExec = function exec(string) {
      var re = this;
      var state = getInternalState(re);
      var str = toString$2(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = call$2(patchedExec, raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y && re.sticky;
      var flags = call$2(regexpFlags, re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = replace$1(flags, 'y', '');
        if (indexOf(flags, 'g') === -1) {
          flags += 'g';
        }

        strCopy = stringSlice$3(str, re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$3(str, re.lastIndex - 1) !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = call$2(nativeExec, sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = stringSlice$3(match.input, charsAdded);
          match[0] = stringSlice$3(match[0], charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
        call$2(nativeReplace, match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      if (match && groups) {
        match.groups = object = create(null);
        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          object[group[0]] = match[group[1]];
        }
      }

      return match;
    };
  }

  var regexpExec$2 = patchedExec;

  var $$2 = _export;
  var exec = regexpExec$2;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  $$2({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
    exec: exec
  });

  // 版本号
  const VERSION = '0.5.3';

  //默认选项
  const DEFAULTS = {
    // 第一个无效字段将自动聚焦,默认是true,还可以为特定字段设置此选项
    autoFocus: true,
    //错误消息容器。可以是:
    // - 'tooltip' 如果要使用引导工具提示显示错误消息
    // - 'popover' 如果要使用引导弹出窗口显示错误消息
    // - css选择器指定的容器
    // 在前两种情况下，由于工具提示/popover应该足够小，因此插件只显示一条错误消息
    // 您还可以为特定字段定义消息容器
    //String|Function 指示错误消息的显示位置。这是null默认的
    container: null,
    // 表单CSS类
    elementClass: 'bv-form',
    // 使用自定义事件名称以避免jQuery调用window.onerror
    events: {
      formInit: 'init.form.bv',
      formError: 'error.form.bv',
      formSuccess: 'success.form.bv',
      fieldAdded: 'added.field.bv',
      fieldRemoved: 'removed.field.bv',
      fieldInit: 'init.field.bv',
      fieldError: 'error.field.bv',
      fieldSuccess: 'success.field.bv',
      fieldStatus: 'status.field.bv',
      ruleError: 'error.rule.bv',
      ruleSuccess: 'success.rule.bv'
    },
    // 指示不会被验证的字段，默认下面三种类型的字段不会被验证
    excluded: [':disabled', ':hidden', ':not(:visible)'],
    // 反馈图标
    // - 使用 FontAwesome icons:
    //  feedbackIcons: {
    //      valid: 'fa fa-check',
    //      invalid: 'fa fa-times',
    //      validating: 'fa fa-refresh'
    //  }
    feedbackIcons: {
      valid: null,
      invalid: null,
      validating: null
    },
    // 使用验证器规则映射字段名称
    fields: null,
    // 用于指示元素的CSS选择器由字段组成
    // 默认情况下，每个字段都放置在<div class=“form group”></div>中
    // 如果您的表单组包含许多字段，但并非所有字段都需要验证，则应调整此选项
    group: '.form-group',
    // 实时验证选项
    // 可以是3个值之一:
    // - enabled: 字段更改后立即验证字段
    // - disabled: 提交表单后才会显示错误消息
    // - submitted: 表单提交后启用实时验证
    live: 'enabled',
    // 默认无效消息
    message: '此值无效',
    // 提交按钮选择器
    // 这些按钮将被禁用，以防止有效表单多次提交
    submitButtons: '[type="submit"]',
    // 如果字段长度小于此字符数，则不会对其进行实时验证 Number
    threshold: null,
    // 验证字段时是否详细.
    // 可能值:
    // - true:  当一个字段有多个验证器时，将分别检查所有验证器，如果多个验证器中出现错误，则将向用户显示所有验证器
    // - false: 当一个字段有多个验证器时，该字段的验证将在第一次遇到错误时终止。因此，只有与该字段相关的第一条错误消息才会显示给用户
    verbose: true
  };

  //未验证的
  const STATUS_NOT_VALIDATED = 'NOT_VALIDATED';
  //验证中
  const STATUS_VALIDATING = 'VALIDATING';
  //无效的
  const STATUS_INVALID = 'INVALID';
  //通过
  const STATUS_VALID = 'VALID';

  //jquery插件名称
  const NAME = 'bootstrapValidation';
  var Constants = {
    VERSION,
    DEFAULTS,
    STATUS_NOT_VALIDATED,
    STATUS_VALIDATING,
    STATUS_INVALID,
    STATUS_VALID,
    NAME
  };

  var classofRaw = classofRaw$2;
  var uncurryThis$4 = functionUncurryThis;

  var functionUncurryThisClause = function (fn) {
    // Nashorn bug:
    //   https://github.com/zloirock/core-js/issues/1128
    //   https://github.com/zloirock/core-js/issues/1130
    if (classofRaw(fn) === 'Function') return uncurryThis$4(fn);
  };

  // TODO: Remove from `core-js@4` since it's moved to entry points

  var uncurryThis$3 = functionUncurryThisClause;
  var defineBuiltIn = defineBuiltIn$4;
  var regexpExec$1 = regexpExec$2;
  var fails$2 = fails$i;
  var wellKnownSymbol$1 = wellKnownSymbol$a;
  var createNonEnumerableProperty = createNonEnumerableProperty$8;

  var SPECIES = wellKnownSymbol$1('species');
  var RegExpPrototype = RegExp.prototype;

  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$1(KEY);

    var DELEGATES_TO_SYMBOL = !fails$2(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) !== 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$2(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES] = function () { return re; };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () {
        execCalled = true;
        return null;
      };

      re[SYMBOL]('');
      return !execCalled;
    });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      FORCED
    ) {
      var uncurriedNativeRegExpMethod = uncurryThis$3(/./[SYMBOL]);
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = uncurryThis$3(nativeMethod);
        var $exec = regexp.exec;
        if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
          }
          return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
        }
        return { done: false };
      });

      defineBuiltIn(String.prototype, KEY, methods[0]);
      defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
  };

  var uncurryThis$2 = functionUncurryThis;
  var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
  var toString$1 = toString$5;
  var requireObjectCoercible$1 = requireObjectCoercible$5;

  var charAt$2 = uncurryThis$2(''.charAt);
  var charCodeAt = uncurryThis$2(''.charCodeAt);
  var stringSlice$2 = uncurryThis$2(''.slice);

  var createMethod = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$1(requireObjectCoercible$1($this));
      var position = toIntegerOrInfinity$1(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING
            ? charAt$2(S, position)
            : first
          : CONVERT_TO_STRING
            ? stringSlice$2(S, position, position + 2)
            : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod(true)
  };

  var charAt$1 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex$1 = function (S, index, unicode) {
    return index + (unicode ? charAt$1(S, index).length : 1);
  };

  var uncurryThis$1 = functionUncurryThis;
  var toObject$1 = toObject$4;

  var floor = Math.floor;
  var charAt = uncurryThis$1(''.charAt);
  var replace = uncurryThis$1(''.replace);
  var stringSlice$1 = uncurryThis$1(''.slice);
  // eslint-disable-next-line redos/no-vulnerable -- safe
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution
  var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject$1(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace(replacement, symbols, function (match, ch) {
      var capture;
      switch (charAt(ch, 0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return stringSlice$1(str, 0, position);
        case "'": return stringSlice$1(str, tailPos);
        case '<':
          capture = namedCaptures[stringSlice$1(ch, 1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var call$1 = functionCall;
  var anObject$1 = anObject$8;
  var isCallable$1 = isCallable$i;
  var classof$1 = classofRaw$2;
  var regexpExec = regexpExec$2;

  var $TypeError$2 = TypeError;

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (isCallable$1(exec)) {
      var result = call$1(exec, R, S);
      if (result !== null) anObject$1(result);
      return result;
    }
    if (classof$1(R) === 'RegExp') return call$1(regexpExec, R, S);
    throw new $TypeError$2('RegExp#exec called on incompatible receiver');
  };

  var apply = functionApply;
  var call = functionCall;
  var uncurryThis = functionUncurryThis;
  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var fails$1 = fails$i;
  var anObject = anObject$8;
  var isCallable = isCallable$i;
  var isNullOrUndefined = isNullOrUndefined$3;
  var toIntegerOrInfinity = toIntegerOrInfinity$4;
  var toLength = toLength$2;
  var toString = toString$5;
  var requireObjectCoercible = requireObjectCoercible$5;
  var advanceStringIndex = advanceStringIndex$1;
  var getMethod = getMethod$2;
  var getSubstitution = getSubstitution$1;
  var regExpExec = regexpExecAbstract;
  var wellKnownSymbol = wellKnownSymbol$a;

  var REPLACE = wellKnownSymbol('replace');
  var max = Math.max;
  var min = Math.min;
  var concat = uncurryThis([].concat);
  var push = uncurryThis([].push);
  var stringIndexOf = uncurryThis(''.indexOf);
  var stringSlice = uncurryThis(''.slice);

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  })();

  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  })();

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$1(function () {
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
    return ''.replace(re, '$<a>') !== '7';
  });

  // @@replace logic
  fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

    return [
      // `String.prototype.replace` method
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible(this);
        var replacer = isNullOrUndefined(searchValue) ? undefined : getMethod(searchValue, REPLACE);
        return replacer
          ? call(replacer, searchValue, O, replaceValue)
          : call(nativeReplace, toString(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject(this);
        var S = toString(string);

        if (
          typeof replaceValue == 'string' &&
          stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
          stringIndexOf(replaceValue, '$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
          if (res.done) return res.value;
        }

        var functionalReplace = isCallable(replaceValue);
        if (!functionalReplace) replaceValue = toString(replaceValue);

        var global = rx.global;
        var fullUnicode;
        if (global) {
          fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }

        var results = [];
        var result;
        while (true) {
          result = regExpExec(rx, S);
          if (result === null) break;

          push(results, result);
          if (!global) break;

          var matchStr = toString(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = toString(result[0]);
          var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
          var captures = [];
          var replacement;
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = concat([matched], captures, position, S);
            if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
            replacement = toString(apply(replaceValue, undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }

        return accumulatedResult + stringSlice(S, nextSourcePosition);
      }
    ];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  var Utils = {
    /**
     * 执行回调函数
     *
     * @param {String|Function} functionName Can be
     * - 全局函数的名称
     * - 命名空间函数的名称（如A.B.C）
     * - 函数
     * @param {Array} args 回调参数
     */
    call(functionName, args) {
      if ('function' === typeof functionName) {
        return functionName.apply(this, args);
      } else if ('string' === typeof functionName) {
        if ('()' === functionName.substring(functionName.length - 2)) {
          functionName = functionName.substring(0, functionName.length - 2);
        }
        let ns = functionName.split('.'),
          func = ns.pop(),
          context = window;
        for (let i = 0; i < ns.length; i++) {
          context = context[ns[i]];
        }
        return typeof context[func] === 'undefined' ? null : context[func].apply(this, args);
      }
    },
    /**
     * 设置字符串格式
     * 它用于格式化错误消息
     * format（“字段必须介于%s和%s之间”，[10，20]）=“字段必须在10和20之间”
     *
     * @param {String} message
     * @param {Array} parameters
     * @returns {String}
     */
    format(message, parameters) {
      if (!$.isArray(parameters)) {
        parameters = [parameters];
      }
      for (let i in parameters) {
        message = message.replace('%s', parameters[i]);
      }
      return message;
    },
    /**
     * 验证日期
     *
     * @param {Number} year 4位数的全年
     * @param {Number} month 月份编号
     * @param {Number} day 日期编号
     * @param {Boolean} [notInFuture] 如果为true，则日期不得在将来
     * @returns {Boolean}
     */
    date(year, month, day, notInFuture) {
      if (isNaN(year) || isNaN(month) || isNaN(day)) {
        return false;
      }
      if (day.length > 2 || month.length > 2 || year.length > 4) {
        return false;
      }
      day = parseInt(day, 10);
      month = parseInt(month, 10);
      year = parseInt(year, 10);
      if (year < 1000 || year > 9999 || month <= 0 || month > 12) {
        return false;
      }
      let numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      // Update the number of days in Feb of leap year
      if (year % 400 === 0 || year % 100 !== 0 && year % 4 === 0) {
        numDays[1] = 29;
      }

      // Check the day
      if (day <= 0 || day > numDays[month - 1]) {
        return false;
      }
      if (notInFuture === true) {
        let currentDate = new Date(),
          currentYear = currentDate.getFullYear(),
          currentMonth = currentDate.getMonth(),
          currentDay = currentDate.getDate();
        return year < currentYear || year === currentYear && month - 1 < currentMonth || year === currentYear && month - 1 === currentMonth && day < currentDay;
      }
      return true;
    },
    /**
     * 实现Luhn验证算法
     * Credit to https://gist.github.com/ShirtlessKirk/2134376
     *
     * @see http://en.wikipedia.org/wiki/Luhn
     * @param {String} value
     * @returns {Boolean}
     */
    luhn(value) {
      let length = value.length,
        mul = 0,
        prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
        sum = 0;
      while (length--) {
        sum += prodArr[mul][parseInt(value.charAt(length), 10)];
        mul ^= 1;
      }
      return sum % 10 === 0 && sum > 0;
    },
    /**
     * 实现模数11，10（ISO 7064）算法
     *
     * @param {String} value
     * @returns {Boolean}
     */
    mod11And10(value) {
      let check = 5,
        length = value.length;
      for (let i = 0; i < length; i++) {
        check = ((check || 10) * 2 % 11 + parseInt(value.charAt(i), 10)) % 10;
      }
      return check === 1;
    },
    /**
     * 实施Mod 37、36（ISO 7064）算法
     * Usages:
     * mod37And36('A12425GABC1234002M')
     * mod37And36('002006673085', '0123456789')
     *
     * @param {String} value
     * @param {String} [alphabet]
     * @returns {Boolean}
     */
    mod37And36(value, alphabet) {
      alphabet = alphabet || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let modulus = alphabet.length,
        length = value.length,
        check = Math.floor(modulus / 2);
      for (let i = 0; i < length; i++) {
        check = ((check || modulus) * 2 % (modulus + 1) + alphabet.indexOf(value.charAt(i))) % modulus;
      }
      return check === 1;
    },
    isEmptyObject(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object;
    },
    isObj(value) {
      return value && Object.prototype.toString.call(value) === '[object Object]' && !Array.isArray(value);
    },
    extend(target) {
      for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
      }
      if (!sources.length) return target;
      const source = sources.shift();
      if (this.isObj(target) && this.isObj(source)) {
        for (const key in source) {
          if (this.isObj(source[key])) {
            if (!target[key]) Object.assign(target, {
              [key]: {}
            });
            this.extend(target[key], source[key]);
          } else {
            Object.assign(target, {
              [key]: source[key]
            });
          }
        }
      }
      return this.extend(target, ...sources);
    },
    utf8Length(str) {
      let s = str.length;
      for (let i = str.length - 1; i >= 0; i--) {
        let code = str.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff) {
          s++;
        } else if (code > 0x7ff && code <= 0xffff) {
          s += 2;
        }
        if (code >= 0xdc00 && code <= 0xdfff) {
          i--;
        }
      }
      return s;
    },
    /**
     * 批量判断某个对象上是否存在指定的属性
     * @param {Object} obj 
     * @param {Array} props 
     * @returns {Boolean} 如果有任何一个属性不存在，则返回 false；否则返回 true
     */
    checkProps(obj, props) {
      for (let i = 0; i < props.length; i++) {
        if (!(props[i] in obj)) {
          return false;
        }
      }
      return true;
    }
  };

  var require = {
    //断给定的 $field 元素是否启用了 HTML5 的 required 属性
    //为 true，则表示该元素要求必填；如果返回值为 false，则表示该元素不要求必填
    enableByHtml5($field) {
      let required = $field.prop('required');
      return required === true;
    },
    /**
     * 检查输入值是否为空
     *
     * @param {BootstrapValidation} validation 验证器插件实例
     * @param {jQuery} $field 字段元素
     * @param {Object} options
     * @returns {Boolean}
     */
    rule(validation, $field, options) {
      let type = $field.attr('type');
      if ('radio' === type || 'checkbox' === type) {
        return validation.getFieldElements($field.attr('data-bv-field')).filter(':checked').length > 0;
      }
      if ('number' === type && $field.get(0).validity && $field.get(0).validity.badInput === true) {
        return true;
      }
      return $.trim($field.val()) !== '';
    }
  };

  var stringLength = {
    html5Attributes: {
      message: 'message',
      min: 'min',
      max: 'max',
      trim: 'trim',
      utf8bytes: 'utf8Bytes'
    },
    enableByHtml5: function ($field) {
      let options = {};
      let maxLength = $field.attr('maxlength');
      let minLength = $field.attr('minlength');
      if (maxLength) {
        options.max = parseInt(maxLength, 10);
      }
      if (minLength) {
        options.min = parseInt(minLength, 10);
      }
      return $.isEmptyObject(options) ? false : options;
    },
    /**
     * 检查元素值的长度是否小于或大于给定的数字
     *
     * @param {bootstrapValidation} validation 验证器插件实例
     * @param {jQuery} $field 字段元素
     * @param {Object} options 由以下键组成:
     * - min
     * - max
     *      - 数字
     *      - 字段的名称，其值定义数字
     *      - 返回数字的回调函数的名称
     *      - 返回数字的回调函数
     *
     * - message: 无效消息
     * - trim: 指示是否在修剪值后计算长度。默认情况下为false
     * - utf8bytes: 以UTF-8字节计算字符串长度，默认为false
     * @returns {Object}
     */
    rule: function (validation, $field, options) {
      let value = $field.val();

      // console.log(validation, $field, options);

      if (options.trim === true || options.trim === 'true') {
        value = $.trim(value);
      }
      if (value === '') {
        return true;
      }
      let min = $.isNumeric(options.min) ? options.min : validation.getDynamicOption($field, options.min);
      let max = $.isNumeric(options.max) ? options.max : validation.getDynamicOption($field, options.max);
      let isValid = true;
      let length = options.utf8Bytes ? Utils.utf8Length(value) : value.length;
      let message = options.message || $.fn[Constants.NAME].i18n.stringLength['default'];
      if (min && length < parseInt(min, 10) || max && length > parseInt(max, 10)) {
        isValid = false;
      }
      switch (true) {
        case !!min && !!max:
          message = Utils.format(options.message || $.fn[Constants.NAME].i18n.stringLength.between, [parseInt(min, 10), parseInt(max, 10)]);
          break;
        case !!min:
          message = Utils.format(options.message || $.fn[Constants.NAME].i18n.stringLength.more, parseInt(min, 10));
          break;
        case !!max:
          message = Utils.format(options.message || $.fn[Constants.NAME].i18n.stringLength.less, parseInt(max, 10));
          break;
      }
      return {
        valid: isValid,
        message: message
      };
    }
  };

  var classof = classofRaw$2;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$1 = Array.isArray || function isArray(argument) {
    return classof(argument) === 'Array';
  };

  var DESCRIPTORS = descriptors;
  var isArray = isArray$1;

  var $TypeError$1 = TypeError;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Safari < 13 does not throw an error in this case
  var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
    // makes no sense without proper strict mode support
    if (this !== undefined) return true;
    try {
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      Object.defineProperty([], 'length', { writable: false }).length = 1;
    } catch (error) {
      return error instanceof TypeError;
    }
  }();

  var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
    if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
      throw new $TypeError$1('Cannot set read only .length');
    } return O.length = length;
  } : function (O, length) {
    return O.length = length;
  };

  var $TypeError = TypeError;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

  var doesNotExceedSafeInteger$1 = function (it) {
    if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
    return it;
  };

  var $$1 = _export;
  var toObject = toObject$4;
  var lengthOfArrayLike = lengthOfArrayLike$2;
  var setArrayLength = arraySetLength;
  var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
  var fails = fails$i;

  var INCORRECT_TO_LENGTH = fails(function () {
    return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
  });

  // V8 and Safari <= 15.4, FF < 23 throws InternalError
  // https://bugs.chromium.org/p/v8/issues/detail?id=12681
  var properErrorOnNonWritableLength = function () {
    try {
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      Object.defineProperty([], 'length', { writable: false }).push();
    } catch (error) {
      return error instanceof TypeError;
    }
  };

  var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

  // `Array.prototype.push` method
  // https://tc39.es/ecma262/#sec-array.prototype.push
  $$1({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    push: function push(item) {
      var O = toObject(this);
      var len = lengthOfArrayLike(O);
      var argCount = arguments.length;
      doesNotExceedSafeInteger(len + argCount);
      for (var i = 0; i < argCount; i++) {
        O[len] = arguments[i];
        len++;
      }
      setArrayLength(O, len);
      return len;
    }
  });

  var isEmail$1 = {exports: {}};

  var assertString = {exports: {}};

  (function (module, exports) {

  	Object.defineProperty(exports, "__esModule", {
  	  value: true
  	});
  	exports.default = assertString;

  	function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  	function assertString(input) {
  	  var isString = typeof input === 'string' || input instanceof String;

  	  if (!isString) {
  	    var invalidType = _typeof(input);

  	    if (input === null) invalidType = 'null';else if (invalidType === 'object') invalidType = input.constructor.name;
  	    throw new TypeError("Expected a string but received a ".concat(invalidType));
  	  }
  	}

  	module.exports = exports.default;
  	module.exports.default = exports.default; 
  } (assertString, assertString.exports));

  var assertStringExports = assertString.exports;

  var isByteLength = {exports: {}};

  (function (module, exports) {

  	Object.defineProperty(exports, "__esModule", {
  	  value: true
  	});
  	exports.default = isByteLength;

  	var _assertString = _interopRequireDefault(assertStringExports);

  	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  	function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  	/* eslint-disable prefer-rest-params */
  	function isByteLength(str, options) {
  	  (0, _assertString.default)(str);
  	  var min;
  	  var max;

  	  if (_typeof(options) === 'object') {
  	    min = options.min || 0;
  	    max = options.max;
  	  } else {
  	    // backwards compatibility: isByteLength(str, min [, max])
  	    min = arguments[1];
  	    max = arguments[2];
  	  }

  	  var len = encodeURI(str).split(/%..|./).length - 1;
  	  return len >= min && (typeof max === 'undefined' || len <= max);
  	}

  	module.exports = exports.default;
  	module.exports.default = exports.default; 
  } (isByteLength, isByteLength.exports));

  var isByteLengthExports = isByteLength.exports;

  var isFQDN = {exports: {}};

  var merge = {exports: {}};

  (function (module, exports) {

  	Object.defineProperty(exports, "__esModule", {
  	  value: true
  	});
  	exports.default = merge;

  	function merge() {
  	  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  	  var defaults = arguments.length > 1 ? arguments[1] : undefined;

  	  for (var key in defaults) {
  	    if (typeof obj[key] === 'undefined') {
  	      obj[key] = defaults[key];
  	    }
  	  }

  	  return obj;
  	}

  	module.exports = exports.default;
  	module.exports.default = exports.default; 
  } (merge, merge.exports));

  var mergeExports = merge.exports;

  (function (module, exports) {

  	Object.defineProperty(exports, "__esModule", {
  	  value: true
  	});
  	exports.default = isFQDN;

  	var _assertString = _interopRequireDefault(assertStringExports);

  	var _merge = _interopRequireDefault(mergeExports);

  	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  	var default_fqdn_options = {
  	  require_tld: true,
  	  allow_underscores: false,
  	  allow_trailing_dot: false,
  	  allow_numeric_tld: false,
  	  allow_wildcard: false,
  	  ignore_max_length: false
  	};

  	function isFQDN(str, options) {
  	  (0, _assertString.default)(str);
  	  options = (0, _merge.default)(options, default_fqdn_options);
  	  /* Remove the optional trailing dot before checking validity */

  	  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
  	    str = str.substring(0, str.length - 1);
  	  }
  	  /* Remove the optional wildcard before checking validity */


  	  if (options.allow_wildcard === true && str.indexOf('*.') === 0) {
  	    str = str.substring(2);
  	  }

  	  var parts = str.split('.');
  	  var tld = parts[parts.length - 1];

  	  if (options.require_tld) {
  	    // disallow fqdns without tld
  	    if (parts.length < 2) {
  	      return false;
  	    }

  	    if (!options.allow_numeric_tld && !/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
  	      return false;
  	    } // disallow spaces


  	    if (/\s/.test(tld)) {
  	      return false;
  	    }
  	  } // reject numeric TLDs


  	  if (!options.allow_numeric_tld && /^\d+$/.test(tld)) {
  	    return false;
  	  }

  	  return parts.every(function (part) {
  	    if (part.length > 63 && !options.ignore_max_length) {
  	      return false;
  	    }

  	    if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
  	      return false;
  	    } // disallow full-width chars


  	    if (/[\uff01-\uff5e]/.test(part)) {
  	      return false;
  	    } // disallow parts starting or ending with hyphen


  	    if (/^-|-$/.test(part)) {
  	      return false;
  	    }

  	    if (!options.allow_underscores && /_/.test(part)) {
  	      return false;
  	    }

  	    return true;
  	  });
  	}

  	module.exports = exports.default;
  	module.exports.default = exports.default; 
  } (isFQDN, isFQDN.exports));

  var isFQDNExports = isFQDN.exports;

  var isIP = {exports: {}};

  (function (module, exports) {

  	Object.defineProperty(exports, "__esModule", {
  	  value: true
  	});
  	exports.default = isIP;

  	var _assertString = _interopRequireDefault(assertStringExports);

  	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  	/**
  	11.3.  Examples

  	   The following addresses

  	             fe80::1234 (on the 1st link of the node)
  	             ff02::5678 (on the 5th link of the node)
  	             ff08::9abc (on the 10th organization of the node)

  	   would be represented as follows:

  	             fe80::1234%1
  	             ff02::5678%5
  	             ff08::9abc%10

  	   (Here we assume a natural translation from a zone index to the
  	   <zone_id> part, where the Nth zone of any scope is translated into
  	   "N".)

  	   If we use interface names as <zone_id>, those addresses could also be
  	   represented as follows:

  	            fe80::1234%ne0
  	            ff02::5678%pvc1.3
  	            ff08::9abc%interface10

  	   where the interface "ne0" belongs to the 1st link, "pvc1.3" belongs
  	   to the 5th link, and "interface10" belongs to the 10th organization.
  	 * * */
  	var IPv4SegmentFormat = '(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])';
  	var IPv4AddressFormat = "(".concat(IPv4SegmentFormat, "[.]){3}").concat(IPv4SegmentFormat);
  	var IPv4AddressRegExp = new RegExp("^".concat(IPv4AddressFormat, "$"));
  	var IPv6SegmentFormat = '(?:[0-9a-fA-F]{1,4})';
  	var IPv6AddressRegExp = new RegExp('^(' + "(?:".concat(IPv6SegmentFormat, ":){7}(?:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){6}(?:").concat(IPv4AddressFormat, "|:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){5}(?::").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,2}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){4}(?:(:").concat(IPv6SegmentFormat, "){0,1}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,3}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){3}(?:(:").concat(IPv6SegmentFormat, "){0,2}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,4}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){2}(?:(:").concat(IPv6SegmentFormat, "){0,3}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,5}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){1}(?:(:").concat(IPv6SegmentFormat, "){0,4}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,6}|:)|") + "(?::((?::".concat(IPv6SegmentFormat, "){0,5}:").concat(IPv4AddressFormat, "|(?::").concat(IPv6SegmentFormat, "){1,7}|:))") + ')(%[0-9a-zA-Z-.:]{1,})?$');

  	function isIP(str) {
  	  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  	  (0, _assertString.default)(str);
  	  version = String(version);

  	  if (!version) {
  	    return isIP(str, 4) || isIP(str, 6);
  	  }

  	  if (version === '4') {
  	    return IPv4AddressRegExp.test(str);
  	  }

  	  if (version === '6') {
  	    return IPv6AddressRegExp.test(str);
  	  }

  	  return false;
  	}

  	module.exports = exports.default;
  	module.exports.default = exports.default; 
  } (isIP, isIP.exports));

  var isIPExports = isIP.exports;

  (function (module, exports) {

  	Object.defineProperty(exports, "__esModule", {
  	  value: true
  	});
  	exports.default = isEmail;

  	var _assertString = _interopRequireDefault(assertStringExports);

  	var _isByteLength = _interopRequireDefault(isByteLengthExports);

  	var _isFQDN = _interopRequireDefault(isFQDNExports);

  	var _isIP = _interopRequireDefault(isIPExports);

  	var _merge = _interopRequireDefault(mergeExports);

  	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  	var default_email_options = {
  	  allow_display_name: false,
  	  allow_underscores: false,
  	  require_display_name: false,
  	  allow_utf8_local_part: true,
  	  require_tld: true,
  	  blacklisted_chars: '',
  	  ignore_max_length: false,
  	  host_blacklist: [],
  	  host_whitelist: []
  	};
  	/* eslint-disable max-len */

  	/* eslint-disable no-control-regex */

  	var splitNameAddress = /^([^\x00-\x1F\x7F-\x9F\cX]+)</i;
  	var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
  	var gmailUserPart = /^[a-z\d]+$/;
  	var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
  	var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A1-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
  	var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
  	var defaultMaxEmailLength = 254;
  	/* eslint-enable max-len */

  	/* eslint-enable no-control-regex */

  	/**
  	 * Validate display name according to the RFC2822: https://tools.ietf.org/html/rfc2822#appendix-A.1.2
  	 * @param {String} display_name
  	 */

  	function validateDisplayName(display_name) {
  	  var display_name_without_quotes = display_name.replace(/^"(.+)"$/, '$1'); // display name with only spaces is not valid

  	  if (!display_name_without_quotes.trim()) {
  	    return false;
  	  } // check whether display name contains illegal character


  	  var contains_illegal = /[\.";<>]/.test(display_name_without_quotes);

  	  if (contains_illegal) {
  	    // if contains illegal characters,
  	    // must to be enclosed in double-quotes, otherwise it's not a valid display name
  	    if (display_name_without_quotes === display_name) {
  	      return false;
  	    } // the quotes in display name must start with character symbol \


  	    var all_start_with_back_slash = display_name_without_quotes.split('"').length === display_name_without_quotes.split('\\"').length;

  	    if (!all_start_with_back_slash) {
  	      return false;
  	    }
  	  }

  	  return true;
  	}

  	function isEmail(str, options) {
  	  (0, _assertString.default)(str);
  	  options = (0, _merge.default)(options, default_email_options);

  	  if (options.require_display_name || options.allow_display_name) {
  	    var display_email = str.match(splitNameAddress);

  	    if (display_email) {
  	      var display_name = display_email[1]; // Remove display name and angle brackets to get email address
  	      // Can be done in the regex but will introduce a ReDOS (See  #1597 for more info)

  	      str = str.replace(display_name, '').replace(/(^<|>$)/g, ''); // sometimes need to trim the last space to get the display name
  	      // because there may be a space between display name and email address
  	      // eg. myname <address@gmail.com>
  	      // the display name is `myname` instead of `myname `, so need to trim the last space

  	      if (display_name.endsWith(' ')) {
  	        display_name = display_name.slice(0, -1);
  	      }

  	      if (!validateDisplayName(display_name)) {
  	        return false;
  	      }
  	    } else if (options.require_display_name) {
  	      return false;
  	    }
  	  }

  	  if (!options.ignore_max_length && str.length > defaultMaxEmailLength) {
  	    return false;
  	  }

  	  var parts = str.split('@');
  	  var domain = parts.pop();
  	  var lower_domain = domain.toLowerCase();

  	  if (options.host_blacklist.includes(lower_domain)) {
  	    return false;
  	  }

  	  if (options.host_whitelist.length > 0 && !options.host_whitelist.includes(lower_domain)) {
  	    return false;
  	  }

  	  var user = parts.join('@');

  	  if (options.domain_specific_validation && (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com')) {
  	    /*
  	      Previously we removed dots for gmail addresses before validating.
  	      This was removed because it allows `multiple..dots@gmail.com`
  	      to be reported as valid, but it is not.
  	      Gmail only normalizes single dots, removing them from here is pointless,
  	      should be done in normalizeEmail
  	    */
  	    user = user.toLowerCase(); // Removing sub-address from username before gmail validation

  	    var username = user.split('+')[0]; // Dots are not included in gmail length restriction

  	    if (!(0, _isByteLength.default)(username.replace(/\./g, ''), {
  	      min: 6,
  	      max: 30
  	    })) {
  	      return false;
  	    }

  	    var _user_parts = username.split('.');

  	    for (var i = 0; i < _user_parts.length; i++) {
  	      if (!gmailUserPart.test(_user_parts[i])) {
  	        return false;
  	      }
  	    }
  	  }

  	  if (options.ignore_max_length === false && (!(0, _isByteLength.default)(user, {
  	    max: 64
  	  }) || !(0, _isByteLength.default)(domain, {
  	    max: 254
  	  }))) {
  	    return false;
  	  }

  	  if (!(0, _isFQDN.default)(domain, {
  	    require_tld: options.require_tld,
  	    ignore_max_length: options.ignore_max_length,
  	    allow_underscores: options.allow_underscores
  	  })) {
  	    if (!options.allow_ip_domain) {
  	      return false;
  	    }

  	    if (!(0, _isIP.default)(domain)) {
  	      if (!domain.startsWith('[') || !domain.endsWith(']')) {
  	        return false;
  	      }

  	      var noBracketdomain = domain.slice(1, -1);

  	      if (noBracketdomain.length === 0 || !(0, _isIP.default)(noBracketdomain)) {
  	        return false;
  	      }
  	    }
  	  }

  	  if (user[0] === '"') {
  	    user = user.slice(1, user.length - 1);
  	    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  	  }

  	  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
  	  var user_parts = user.split('.');

  	  for (var _i = 0; _i < user_parts.length; _i++) {
  	    if (!pattern.test(user_parts[_i])) {
  	      return false;
  	    }
  	  }

  	  if (options.blacklisted_chars) {
  	    if (user.search(new RegExp("[".concat(options.blacklisted_chars, "]+"), 'g')) !== -1) return false;
  	  }

  	  return true;
  	}

  	module.exports = exports.default;
  	module.exports.default = exports.default; 
  } (isEmail$1, isEmail$1.exports));

  var isEmailExports = isEmail$1.exports;
  var isEmail = /*@__PURE__*/getDefaultExportFromCjs(isEmailExports);

  var email = {
    html5Attributes: {
      message: 'message',
      multiple: 'multiple',
      separator: 'separator'
    },
    enableByHtml5($field) {
      return 'email' === $field.attr('type');
    },
    /**
     * 当且仅当输入值是有效的电子邮件地址时返回true
     *
     * @param {BootstrapValidation} validation 验证插件实例
     * @param {jQuery} $field Field element
     * @param {Object} [options]
     * - multiple: 允许多个电子邮件地址，用逗号或分号分隔；默认值为false。
     * - separator: Regex用于一个或多个字符，这些字符应作为地址之间的分隔符；默认值为逗号/[，；]/，即逗号或分号。
     * @returns {Boolean}
     */
    rule(validation, $field, options) {
      let value = $field.val();
      if (value === '') {
        return true;
      }
      let allowMultiple = options.multiple === true || options.multiple === 'true';
      if (allowMultiple) {
        //如果是多个邮箱
        let separator = options.separator || /[,;]/;
        let addresses = this._splitEmailAddresses(value, separator);
        for (let i = 0; i < addresses.length; i++) {
          if (!isEmail(addresses[i])) {
            return false;
          }
        }
        return true;
      } else {
        return isEmail(value);
      }
    },
    _splitEmailAddresses(emailAddresses, separator) {
      let quotedFragments = emailAddresses.split(/"/),
        quotedFragmentCount = quotedFragments.length,
        emailAddressArray = [],
        nextEmailAddress = '';
      for (let i = 0; i < quotedFragmentCount; i++) {
        if (i % 2 === 0) {
          let splitEmailAddressFragments = quotedFragments[i].split(separator),
            splitEmailAddressFragmentCount = splitEmailAddressFragments.length;
          if (splitEmailAddressFragmentCount === 1) {
            nextEmailAddress += splitEmailAddressFragments[0];
          } else {
            emailAddressArray.push(nextEmailAddress + splitEmailAddressFragments[0]);
            for (let j = 1; j < splitEmailAddressFragmentCount - 1; j++) {
              emailAddressArray.push(splitEmailAddressFragments[j]);
            }
            nextEmailAddress = splitEmailAddressFragments[splitEmailAddressFragmentCount - 1];
          }
        } else {
          nextEmailAddress += '"' + quotedFragments[i];
          if (i < quotedFragmentCount - 1) {
            nextEmailAddress += '"';
          }
        }
      }
      emailAddressArray.push(nextEmailAddress);
      return emailAddressArray;
    }
  };

  var remote = {
    html5Attributes: {
      message: 'message',
      name: 'name',
      type: 'type',
      url: 'url',
      data: 'data',
      delay: 'delay'
    },
    /**
     * 销毁bootstrapValidattion时销毁计时器（使用validation.dedestroy（）方法）
     */
    destroy(validation, $field, options) {
      if ($field.data('bv.remote.timer')) {
        clearTimeout($field.data('bv.remote.timer'));
        $field.removeData('bv.remote.timer');
      }
    },
    /**
     * 请求远程服务器检查输入值
     *
     * @param {BootstrapValidation} validation 插件实例
     * @param {jQuery} $field 字段元素
     * @param {Object} options 选项
     * - url {String|Function}
     * - type {String} [optional] 可以是GET或POST（默认）
     * - data {Object|Function} [optional]: 默认情况下，它将采用值
     *  {
     *      <fieldName>: <fieldValue>
     *  }
     * - delay
     * - name {String} [optional]: 覆盖请求的字段名称。
     * - message: 无效消息
     * - headers: 附加标头
     * @returns {Deferred}
     */
    rule(validation, $field, options) {
      let value = $field.val();
      let dfd = new $.Deferred();
      if (value === '') {
        // 异步操作成功，调用 resolve()
        dfd.resolve($field, 'remote', {
          valid: true
        });
        return dfd;
      }
      let name = $field.attr('data-bv-field');
      let data = options.data || {};
      let url = options.url;
      let type = options.type || 'GET';
      let headers = options.headers || {};

      // 支持动态数据
      if ('function' === typeof data) {
        data = data.call(this, validation);
      }

      // 从HTML5属性分析字符串数据
      if ('string' === typeof data) {
        data = JSON.parse(data);
      }

      // 支持动态url
      if ('function' === typeof url) {
        url = url.call(this, validation);
      }
      data[options.name || name] = value;
      function runCallback() {
        const xhr = $.ajax({
          type: type,
          headers: headers,
          url: url,
          dataType: 'json',
          data: data
        });
        xhr.then(function (response) {
          response.valid = response.valid === true || response.valid === 'true';

          //异步操作成功，调用 resolve()
          dfd.resolve($field, 'remote', response);
        });
        dfd.fail(function () {
          xhr.abort();
        });
        return dfd;
      }
      if (options.delay) {
        //由于表单可能有多个具有相同名称的字段
        //我必须将计时器连接到字段元素
        if ($field.data('bv.remote.timer')) {
          clearTimeout($field.data('bv.remote.timer'));
        }
        $field.data('bv.remote.timer', setTimeout(runCallback, options.delay));
        return dfd;
      } else {
        return runCallback();
      }
    }
  };

  var Rules = {
    require,
    email,
    stringLength,
    remote
  };

  var popoverAction = {
    show: ($icon, content) => {
      $icon.css('cursor', 'pointer').popover('destroy').popover({
        container: 'body',
        content,
        html: true,
        placement: 'auto top',
        trigger: 'hover click'
      });
    },
    hide: $icon => {
      $icon.css('cursor', '').popover('destroy');
    }
  };

  var tooltipAction = {
    show: ($icon, title) => {
      $icon.css('cursor', 'pointer').tooltip('destroy').tooltip({
        container: 'body',
        html: true,
        placement: 'auto top',
        title
      });
    },
    hide: $icon => {
      $icon.css('cursor', '').tooltip('destroy');
    }
  };

  var _$form = /*#__PURE__*/new WeakMap();
  var _options = /*#__PURE__*/new WeakMap();
  var _$invalidFields = /*#__PURE__*/new WeakMap();
  var _$submitButton = /*#__PURE__*/new WeakMap();
  var _$hiddenButton = /*#__PURE__*/new WeakMap();
  var _changeEvent = /*#__PURE__*/new WeakMap();
  var _submitIfValid = /*#__PURE__*/new WeakMap();
  var _cacheFields = /*#__PURE__*/new WeakMap();
  var _init = /*#__PURE__*/new WeakSet();
  var _initField = /*#__PURE__*/new WeakSet();
  var _submit = /*#__PURE__*/new WeakSet();
  var _onSuccess = /*#__PURE__*/new WeakSet();
  var _onError = /*#__PURE__*/new WeakSet();
  var _getFields = /*#__PURE__*/new WeakSet();
  var _isExistField = /*#__PURE__*/new WeakSet();
  var _onFieldValidated = /*#__PURE__*/new WeakSet();
  var _isExcluded = /*#__PURE__*/new WeakSet();
  var _isOptionEnabled = /*#__PURE__*/new WeakSet();
  var _exceedThreshold = /*#__PURE__*/new WeakSet();
  var _getMessage = /*#__PURE__*/new WeakSet();
  var _getMessageContainer = /*#__PURE__*/new WeakSet();
  var _parseOptions = /*#__PURE__*/new WeakSet();
  var _getOptionsfromHtml = /*#__PURE__*/new WeakSet();
  var _getCommonDataOptions = /*#__PURE__*/new WeakSet();
  var _getDynamicOption = /*#__PURE__*/new WeakSet();
  class BootstrapValidation {
    constructor(el, _options2) {
      /**
      * 一些验证规则可以选择其值是动态的。
      * 例如，zipCode验证器具有国家选项，该选项可能会由select元素动态更改。
      *
      * @param {jQuery|String} field 字段名称或元素
      * @param {String|Function} option 可通过以下方式确定的选项:
      * - 字符串
      * - 定义值的字段的名称
      * - 返回值的函数的名称
      * - 函数返回值
      *
      * 回调函数的格式为
      *      callback: function(value, validation, $field) {
      *          // value 是字段的值
      *          // validation  是BootstrapValidation 实例
      *          // $field 是字段元素
      *      }
      *
      * @returns {String}
      */
      _classPrivateMethodInitSpec(this, _getDynamicOption);
      /**
       * 获取表单和字段元素都可以设置的选项
       * @param {JQuery} $type 表单元素/字段元素
       * @returns
       */
      _classPrivateMethodInitSpec(this, _getCommonDataOptions);
      /**
       * 从html属性上获取属性
       * @returns {Object} 选项
       */
      _classPrivateMethodInitSpec(this, _getOptionsfromHtml);
      /**
       * 从HTML属性分析验证器选项
       * @param {JQuery} $field 字段元素
       */
      _classPrivateMethodInitSpec(this, _parseOptions);
      /**
       * 获取用于放置错误消息的元素
       * @param {jQuery} $field  字段元素
       * @param {String} group  字段元素容器选择器
       */
      _classPrivateMethodInitSpec(this, _getMessageContainer);
      /**
       * 获取给定字段和验证器的错误消息
       *
       * @param {String} field 字段名称
       * @param {String} ruleName 规则名称
       * @returns {String}
       */
      _classPrivateMethodInitSpec(this, _getMessage);
      /**
       * 检查字段值的字符数是否超过阈值
       *
       * @param {jQuery} $field 字段元素
       * @returns {Boolean}
       */
      _classPrivateMethodInitSpec(this, _exceedThreshold);
      /**
       * 检查字段选项是否已启用
       *
       * @param {String} field 字段名称
       * @param {String} option 选项名称, 例如:"verbose", "autoFocus"
       * @returns {Boolean}
       */
      _classPrivateMethodInitSpec(this, _isOptionEnabled);
      /**
       * 检查该字段是否已排除。
       * 返回true表示该字段将不被验证
       *
       * @param {jQuery} $field 字段元素
       * @returns {Boolean}
       */
      _classPrivateMethodInitSpec(this, _isExcluded);
      /**
       * 在验证字段元素后调用
       *
       * @param {jQuery} $field 字段元素
       * @param {String} [ruleName] 规则名
       */
      _classPrivateMethodInitSpec(this, _onFieldValidated);
      /**
       * 检查字段是否存在
       * @param {JQuery} fields
       * @param {String} matchedField
       * @returns {Boolean}
       */
      _classPrivateMethodInitSpec(this, _isExistField);
      /**
       * 获取字段匹配结果 {fields,matchedField}  fields:是一个字段元素的jQuery集合 matchedField:字段名称
       * @param {String|jQuery} field  字段名称或字段元素
       * @returns {Object}
       */
      _classPrivateMethodInitSpec(this, _getFields);
      /**
       * success.form.bv事件的默认处理程序。
       * 当所有字段都有效时，将调用它
       *
       * @param {Object} e jQuery事件对象
       */
      _classPrivateMethodInitSpec(this, _onError);
      /**
       * success.form.bv事件的默认处理程序。
       * 当所有字段都有效时，将调用它
       *
       * @param {Object} e jQuery事件对象
       */
      _classPrivateMethodInitSpec(this, _onSuccess);
      /**
      * Called when all validations are completed
      */
      _classPrivateMethodInitSpec(this, _submit);
      /**
       * 初始化字段
       * @param {String|jQuery} field  字段名称或字段元素
       */
      _classPrivateMethodInitSpec(this, _initField);
      //初始化方法
      _classPrivateMethodInitSpec(this, _init);
      //表单jQ对象
      _classPrivateFieldInitSpec(this, _$form, {
        writable: true,
        value: void 0
      });
      //选项
      _classPrivateFieldInitSpec(this, _options, {
        writable: true,
        value: void 0
      });
      // 无效字段数组
      _classPrivateFieldInitSpec(this, _$invalidFields, {
        writable: true,
        value: $$6([])
      });
      //单击以提交表单的提交按钮
      _classPrivateFieldInitSpec(this, _$submitButton, {
        writable: true,
        value: void 0
      });
      //隐藏的按钮
      _classPrivateFieldInitSpec(this, _$hiddenButton, {
        writable: true,
        value: void 0
      });
      //验证状态(已经封装到常量里)
      //事件
      _classPrivateFieldInitSpec(this, _changeEvent, {
        writable: true,
        value: 'input'
      });
      //当远程/回调验证器返回时，指示表单已准备好提交的标志
      _classPrivateFieldInitSpec(this, _submitIfValid, {
        writable: true,
        value: void 0
      });
      //缓存字段
      _classPrivateFieldInitSpec(this, _cacheFields, {
        writable: true,
        value: {}
      });
      //这里的options是已经合并过默认选项的
      _classPrivateFieldSet(this, _options, _options2);
      _classPrivateFieldSet(this, _$form, $$6(el));

      //初始化
      _classPrivateMethodGet(this, _init, _init2).call(this);
    }
    /**
     * 验证表单
     *
     * @returns {BootstrapValidation}
     */
    validate() {
      if (!_classPrivateFieldGet(this, _options).fields) {
        return this;
      }
      this.disableSubmitButtons(true);
      _classPrivateFieldSet(this, _submitIfValid, false);
      for (let field in _classPrivateFieldGet(this, _options).fields) {
        this.validateField(field);
      }
      _classPrivateMethodGet(this, _submit, _submit2).call(this);
      _classPrivateFieldSet(this, _submitIfValid, true);
      return this;
    }

    /**
     * 验证字段
     *
     * @param {String|jQuery} field 字段名称或者字段元素
     * @returns {BootstrapValidation}
     */
    validateField(field) {
      let {
        fields,
        matchedField
      } = _classPrivateMethodGet(this, _getFields, _getFields2).call(this, field);
      field = matchedField;
      if (!_classPrivateMethodGet(this, _isExistField, _isExistField2).call(this, fields, matchedField)) {
        return this;
      }
      let that = this;
      let type = fields.attr('type');
      let total = 'radio' === type || 'checkbox' === type ? 1 : fields.length;
      let updateAll = 'radio' === type || 'checkbox' === type;
      let rules = _classPrivateFieldGet(this, _options).fields[field].rules;
      let verbose = _classPrivateMethodGet(this, _isOptionEnabled, _isOptionEnabled2).call(this, field, 'verbose');
      for (let i = 0; i < total; i++) {
        let $field = fields.eq(i);
        if (_classPrivateMethodGet(this, _isExcluded, _isExcluded2).call(this, $field)) {
          //如果是排除的字段则跳过当前循环
          continue;
        }
        let stop = false;
        for (let ruleName in rules) {
          if ($field.data('bv.dfs.' + ruleName)) {
            $field.data('bv.dfs.' + ruleName).reject();
          }
          if (stop) {
            break;
          }

          //如果已验证字段，则不验证该字段
          let result = $field.data('bv.result.' + ruleName);
          if (result === Constants.STATUS_VALID || result === Constants.STATUS_INVALID) {
            //如果是通过，或是无效
            _classPrivateMethodGet(this, _onFieldValidated, _onFieldValidated2).call(this, $field, ruleName);
            continue;
          } else if (rules[ruleName].enabled === false) {
            this.updateStatus(updateAll ? field : $field, Constants.STATUS_VALID, ruleName);
            continue;
          }

          //保存验证的结果
          $field.data('bv.result.' + ruleName, Constants.STATUS_VALIDATING);
          //调用内置的验证规则并返回结果
          let validateResult = $$6.fn[Constants.NAME].rules[ruleName].rule(this, $field, rules[ruleName]);
          console.log(validateResult);

          //如果返回的结果布尔类型
          if ('boolean' === typeof validateResult) {
            $field.data('bv.response.' + ruleName, validateResult);

            //如果是单选框和复选框
            const updateField = updateAll ? field : $field;
            //验证结果为真则验证状态设置为通过。
            const status = validateResult ? Constants.STATUS_VALID : Constants.STATUS_INVALID;

            //跟新状态
            this.updateStatus(updateField, status, ruleName);

            //如果没通过，verbose===false的时候就直接终止循环，只显示一条错误关系
            if (!validateResult && !verbose) {
              break;
            }
          }
          // 如果是一个对象 { valid: true/false, message: 'dynamic message' }
          else if (Utils.isObj(validateResult) && Utils.checkProps(validateResult, ['valid', 'message'])) {
            $field.data('bv.response.' + ruleName, validateResult);

            //更新错误信息
            this.updateMessage(updateAll ? field : $field, ruleName, validateResult.message);

            //更新状态
            this.updateStatus(updateAll ? field : $field, validateResult.valid ? Constants.STATUS_VALID : Constants.STATUS_INVALID, ruleName);
            if (!validateResult.valid && !verbose) {
              break;
            }
          } else if (Utils.isObj(validateResult) && validateResult.resolve) {
            //如果是dfd对象

            //更新状态
            this.updateStatus(updateAll ? field : $field, Constants.STATUS_VALIDATING, ruleName);
            // 字段上存返回结果
            $field.data('bv.dfs.' + ruleName, validateResult);

            //注册回调函数
            validateResult.done(function ($field, ruleName, response) {
              $field.removeData('bv.dfs.' + ruleName).data('bv.response.' + ruleName, response);
              if (response.message) {
                that.updateMessage($field, ruleName, response.message);
              }
              that.updateStatus(updateAll ? $field.attr('data-bv-field') : $field, response.valid ? Constants.STATUS_VALID : Constants.STATUS_INVALID, ruleName);
              if (response.valid && _classPrivateFieldGet(that, _submitIfValid) === true) {
                // 如果远程验证器返回true并且表单已准备好提交，则执行此操作
                _classPrivateMethodGet(that, _submit, _submit2).call(that);
              } else if (!response.valid && !verbose) {
                stop = true;
              }
            });
          }
        }
      }
    }
    /**
    * 更新错误信息
    *
    * @param {String|jQuery} field 字段名称或字段元素
    * @param {String} rule 验证规则名称
    * @param {String} message 信息
    * @returns {BootstrapValidation}
    */
    updateMessage(field, rule, message) {
      let {
        fields,
        matchedField
      } = _classPrivateMethodGet(this, _getFields, _getFields2).call(this, field);
      fields.each(function () {
        $$6(this).data('bv.messages').find('.help-block[data-bv-rule="' + rule + '"][data-bv-for="' + matchedField + '"]').html(message);
      });
    }

    /**
     * 更新字段的所有验证结果
     *
     * @param {String|jQuery} field 字段名称或字段元素
     * @param {String} status 状态  可用值 'NOT_VALIDATED', 'VALIDATING', 'INVALID' , 'VALID'
     * @param {String} [ruleName] 验证器名称。如果为null，该方法将更新所有验证器的有效性结果
     * @returns {BootstrapValidation}
     */
    updateStatus(field, status, ruleName) {
      let {
        fields,
        matchedField
      } = _classPrivateMethodGet(this, _getFields, _getFields2).call(this, field);
      field = matchedField;
      if (status === Constants.STATUS_NOT_VALIDATED) {
        // 重置标志
        // 当延迟验证器在键入时返回true时，防止表单进行提交
        _classPrivateFieldSet(this, _submitIfValid, false);
      }
      let type = fields.attr('type');
      let group = _classPrivateFieldGet(this, _options).fields[field].group || _classPrivateFieldGet(this, _options).group;
      let total = 'radio' === type || 'checkbox' === type ? 1 : fields.length;
      for (let i = 0; i < total; i++) {
        let $field = fields.eq(i);
        if (_classPrivateMethodGet(this, _isExcluded, _isExcluded2).call(this, $field)) {
          continue;
        }
        let $parent = $field.parents(group);
        let $message = $field.data('bv.messages');
        let $allErrors = $message.find('.help-block[data-bv-rule][data-bv-for="' + field + '"]');
        let $errors = ruleName ? $allErrors.filter('[data-bv-rule="' + ruleName + '"]') : $allErrors;
        let $icon = $field.data('bv.icon');
        let condition1 = 'function' === typeof (_classPrivateFieldGet(this, _options).fields[field].container || _classPrivateFieldGet(this, _options).container);
        let container = condition1 ? (_classPrivateFieldGet(this, _options).fields[field].container || _classPrivateFieldGet(this, _options).container).call(this, $field, this) : _classPrivateFieldGet(this, _options).fields[field].container || _classPrivateFieldGet(this, _options).container;
        let isValidField = null;

        // 更新状态
        if (ruleName) {
          $field.data('bv.result.' + ruleName, status);
        } else {
          for (let ruleName in _classPrivateFieldGet(this, _options).fields[field].rules) {
            $field.data('bv.result.' + ruleName, status);
          }
        }

        // 显示隐藏 错误元素和反馈图标
        $errors.attr('data-bv-result', status);

        //确定包含元素的选项卡
        let $tabPane = $field.parents('.tab-pane');
        let tabId;
        let $tab;
        if ($tabPane && (tabId = $tabPane.attr('id'))) {
          $tab = $$6('a[href="#' + tabId + '"][data-toggle="tab"]').parent();
        }
        const statusActions = {
          [Constants.STATUS_VALIDATING]: () => {
            //验证中

            isValidField = null;
            //禁用提交按钮
            this.disableSubmitButtons(true);
            //移除成功状态添加错误状态
            $parent.removeClass('has-success').removeClass('has-error');
            if ($icon) {
              //有图标

              $icon.removeClass(_classPrivateFieldGet(this, _options).feedbackIcons.valid).removeClass(_classPrivateFieldGet(this, _options).feedbackIcons.invalid).addClass(_classPrivateFieldGet(this, _options).feedbackIcons.validating).show();
            }
            if ($tab) {
              $tab.removeClass('bv-tab-success').removeClass('bv-tab-error');
            }
          },
          [Constants.STATUS_INVALID]: () => {
            //无效

            isValidField = false;
            this.disableSubmitButtons(true);
            $parent.removeClass('has-success').addClass('has-error');
            if ($icon) {
              $icon.removeClass(_classPrivateFieldGet(this, _options).feedbackIcons.valid).removeClass(_classPrivateFieldGet(this, _options).feedbackIcons.validating).addClass(_classPrivateFieldGet(this, _options).feedbackIcons.invalid).show();
            }
            if ($tab) {
              $tab.removeClass('bv-tab-success').addClass('bv-tab-error');
            }
          },
          [Constants.STATUS_VALID]: () => {
            //通过

            let not_validated = $allErrors.filter('[data-bv-result="' + Constants.STATUS_NOT_VALIDATED + '"]').length === 0;
            //所有验证器已完成
            let all_completed = $allErrors.filter('[data-bv-result="' + Constants.STATUS_VALID + '"]').length === $allErrors.length;
            isValidField = not_validated ? all_completed : null;
            if (isValidField !== null) {
              this.disableSubmitButtons(_classPrivateFieldGet(this, _$submitButton) ? !this.isValid() : !isValidField);
              if ($icon) {
                $icon.removeClass(_classPrivateFieldGet(this, _options).feedbackIcons.invalid).removeClass(_classPrivateFieldGet(this, _options).feedbackIcons.validating).removeClass(_classPrivateFieldGet(this, _options).feedbackIcons.valid).addClass(isValidField ? _classPrivateFieldGet(this, _options).feedbackIcons.valid : _classPrivateFieldGet(this, _options).feedbackIcons.invalid).show();
              }
            }
            $parent.removeClass('has-error has-success').addClass(this.isValidContainer($parent) ? 'has-success' : 'has-error');
            if ($tab) {
              $tab.removeClass('bv-tab-success').removeClass('bv-tab-error').addClass(this.isValidContainer($tabPane) ? 'bv-tab-success' : 'bv-tab-error');
            }
          },
          [Constants.STATUS_NOT_VALIDATED]: () => {
            //未验证
            isValidField = null;
            this.disableSubmitButtons(false);
            $parent.removeClass('has-success').removeClass('has-error');
            if ($icon) {
              $icon.removeClass(_classPrivateFieldGet(this, _options).feedbackIcons.valid).removeClass(_classPrivateFieldGet(this, _options).feedbackIcons.invalid).removeClass(_classPrivateFieldGet(this, _options).feedbackIcons.validating).hide();
            }
            if ($tab) {
              $tab.removeClass('bv-tab-success').removeClass('bv-tab-error');
            }
          },
          default: () => {
            // 默认情况的处理逻辑
            statusActions[Constants.STATUS_NOT_VALIDATED]();
          }
        }

        // console.log(statusActions[status]);
        ;
        (statusActions[status] || statusActions.default)();

        // 判断图标且容器类型
        if ($icon && 'tooltip' === container) {
          const title = $allErrors.filter("[data-bv-result=\"".concat(Constants.STATUS_INVALID, "\"]")).eq(0).html();
          isValidField === false ? tooltipAction.show($icon, title) : tooltipAction.hide($icon);
        } else if ($icon && 'popover' === container) {
          const content = $allErrors.filter("[data-bv-result=\"".concat(Constants.STATUS_INVALID, "\"]")).eq(0).html();
          isValidField === false ? popoverAction.show($icon, content) : popoverAction.hide($icon);
        } else {
          status === Constants.STATUS_INVALID ? $errors.show() : $errors.hide();
        }

        // 触发事件
        $field.trigger($$6.Event(_classPrivateFieldGet(this, _options).events.fieldStatus), {
          bv: this,
          field: field,
          element: $field,
          status: status
        });

        // 验证字段后调用。
        _classPrivateMethodGet(this, _onFieldValidated, _onFieldValidated2).call(this, $field, ruleName);
      }
      return this;
    }

    /**
     * 检查表单有效性
     *
     * @returns {Boolean}
     */
    isValid() {
      for (let field in _classPrivateFieldGet(this, _options).fields) {
        if (!this.isValidField(field)) {
          return false;
        }
      }
      return true;
    }

    /**
     * 检查字段是否有效
     *
     * @param {String|jQuery} field 字段名称或字段元素
     * @returns {Boolean}
     */
    isValidField(field) {
      let {
        fields,
        matchedField
      } = _classPrivateMethodGet(this, _getFields, _getFields2).call(this, field);
      if (!_classPrivateMethodGet(this, _isExistField, _isExistField2).call(this, fields, matchedField)) {
        return true;
      }
      let type = fields.attr('type');
      let total = 'radio' === type || 'checkbox' === type ? 1 : fields.length;
      for (let i = 0; i < total; i++) {
        let $field = fields.eq(i);
        if (_classPrivateMethodGet(this, _isExcluded, _isExcluded2).call(this, $field)) {
          continue;
        }
        for (let ruleName in _classPrivateFieldGet(this, _options).fields[field].rules) {
          if (_classPrivateFieldGet(this, _options).fields[field].rules[ruleName].enabled === false) {
            continue;
          }
          let status = $field.data('bv.result.' + ruleName);
          if (status !== Constants.STATUS_VALID) {
            return false;
          }
        }
      }
      return true;
    }
    /**
     * 检查给定容器内的所有字段是否有效.
     * 当使用诸如选项卡、折叠之类的向导时，它很有用
     *
     * @param {String|jQuery} container 容器选择器或元素
     * @returns {Boolean}
     */
    isValidContainer(container) {
      let that = this;
      let map = {};
      let $container = 'string' === typeof container ? $$6(container) : container;
      if ($container.length === 0) {
        return true;
      }
      $container.find('[data-bv-field]').each(function () {
        let $field = $$6(this);
        let field = $field.attr('data-bv-field');
        if (!_classPrivateMethodGet(that, _isExcluded, _isExcluded2).call(that, $field) && !map[field]) {
          map[field] = $field;
        }
      });
      for (let field in map) {
        let $f = map[field];
        if ($f.data('bv.messages').find('.help-block[data-bv-rule][data-bv-for="' + field + '"]').filter('[data-bv-result="' + Constants.STATUS_INVALID + '"]').length > 0) {
          return false;
        }
      }
      return true;
    }
    /**
     * 禁用或启用提交按钮
     *
     * @param {Boolean} disabled ture  false
     * @returns {BootstrapValidation}
     */
    disableSubmitButtons(disabled) {
      if (!disabled) {
        _classPrivateFieldGet(this, _$form).find(_classPrivateFieldGet(this, _options).submitButtons).removeAttr('disabled');
      } else if (_classPrivateFieldGet(this, _options).live !== 'disabled') {
        // 如果禁用了实时验证模式，则不要禁用
        _classPrivateFieldGet(this, _$form).find(_classPrivateFieldGet(this, _options).submitButtons).attr('disabled', 'disabled');
      }
      return this;
    }
    /**
     * 获取字段选项
     *
     * @param {String|jQuery} [field] 字段名称或字段元素。如果未设置，该方法将返回表单选项
     * @param {String} [validator] 规则的名称。如果为null，则该方法返回表单选项
     * @param {String} [option] 选项名称
     * @return {String|Object}
     */
    getOptions(field, rule, option) {
      if (!field) {
        return option ? _classPrivateFieldGet(this, _options)[option] : _classPrivateFieldGet(this, _options);
      }
      if ('object' === typeof field) {
        field = field.attr('data-bv-field');
      }
      if (!_classPrivateFieldGet(this, _options).fields[field]) {
        return null;
      }
      let options = _classPrivateFieldGet(this, _options).fields[field];
      if (!rule) {
        return option ? options[option] : options;
      }
      if (!options.rules || !options.rules[rule]) {
        return null;
      }
      return option ? options.rules[rule][option] : options.rules[rule];
    }
    /**
     * 按给定名称检索字段元素
     * @param {String} field 字段名
     * @returns
     */
    getFieldElements(field) {
      if (!_classPrivateFieldGet(this, _cacheFields)[field]) {
        _classPrivateFieldGet(this, _cacheFields)[field] = _classPrivateFieldGet(this, _options).fields[field] && _classPrivateFieldGet(this, _options).fields[field].selector ? $$6(_classPrivateFieldGet(this, _options).fields[field].selector) : _classPrivateFieldGet(this, _$form).find('[name="' + field + '"]');
      }
      return _classPrivateFieldGet(this, _cacheFields)[field];
    }
  }

  /**
   * jQuery API
   * ====================================================
   */
  function _init2() {
    //保存this
    const that = this;

    //从html属性上取一次参数
    let options = {
      ..._classPrivateMethodGet(that, _getOptionsfromHtml, _getOptionsfromHtml2).call(that),
      fields: {}
    };
    // console.log(options);

    _classPrivateFieldGet(that, _$form) // 禁用HTML 5中的客户端验证
    .attr('novalidate', 'novalidate')
    //添加一个class
    .addClass(_classPrivateFieldGet(this, _options).elementClass)
    // 首先禁用默认提交
    .on('submit.bv', function (e) {
      e.preventDefault();

      //验证方法，先注释
      that.validate();
    }).on('click.bv', _classPrivateFieldGet(this, _options).submitButtons, function () {
      //保存提交按钮的JQ对象
      _classPrivateFieldSet(that, _$submitButton, $$6(this));
      // 用户只需点击提交按钮
      _classPrivateFieldSet(that, _submitIfValid, true);
    })
    // 查找所有具有“name”或“data bv field”属性的字段
    .find('[name], [data-bv-field]').each(function () {
      //得到该字段元素的jQuery对象。
      let $field = $$6(this);

      //从新获取字段
      let field = $field.attr('name') || $field.attr('data-bv-field');
      // console.log($field,field);

      let opts = _classPrivateMethodGet(that, _parseOptions, _parseOptions2).call(that, $field);
      if (opts) {
        $field.attr('data-bv-field', field);
        options.fields[field] = $$6.extend({}, opts, options.fields[field]);
      }
    });

    //合并最大的选项
    _classPrivateFieldSet(this, _options, $$6.extend(true, _classPrivateFieldGet(this, _options), options));
    // console.log(this.#options);

    //当在表单中的任何字段上按Enter键时，第一个提交按钮将完成其工作。
    //然后将提交表格。
    //我创建了第一个隐藏的提交按钮
    _classPrivateFieldSet(this, _$hiddenButton, $$6('<button/>').attr('type', 'submit').prependTo(_classPrivateFieldGet(this, _$form)).addClass('bv-hidden-submit').css({
      display: 'none',
      width: 0,
      height: 0
    }));
    _classPrivateFieldGet(this, _$form).on('click.bv', '[type="submit"]', function (e) {
      //e.isDefaultPrevented() 用来判断 用于检测事件是否已经调用 event.preventDefault() 阻止了默认行为。如果事件调用了 event.preventDefault() 方法，则 e.isDefaultPrevented() 返回 true，否则返回 false
      // e.isDefaultPrevented() 可以用来判断是否执行了默认行为的阻止操作
      // 检查按钮单击处理程序是否返回false
      if (!e.isDefaultPrevented()) {
        //没有阻止默认事件，因为如果用户自己阻止了默认提交事件，我们这里就不能强制让它手动提交了。

        const $target = $$6(e.target);
        // 按钮可能包含HTML标记
        const $button = $target.is('[type="submit"]') ? $target.eq(0) : $target.parent('[type="submit"]').eq(0);

        // 单击提交按钮/输入时不执行验证
        // 不是由“submitButtons”选项定义的
        if (_classPrivateFieldGet(that, _options).submitButtons && !$button.is(_classPrivateFieldGet(that, _options).submitButtons) && !$button.is(_classPrivateFieldGet(that, _$hiddenButton))) {
          _classPrivateFieldGet(that, _$form).off('submit.bv').submit();
        }
      }
    });

    //循环初始化每个字段
    for (let field in _classPrivateFieldGet(this, _options).fields) {
      // console.log(field);
      _classPrivateMethodGet(this, _initField, _initField2).call(this, field);
    }

    //插件初始化表单后触发
    _classPrivateFieldGet(this, _$form).trigger($$6.Event(_classPrivateFieldGet(this, _options).events.formInit), {
      bv: this,
      options: _classPrivateFieldGet(this, _options)
    });

    // 准备事件
    if (_classPrivateFieldGet(this, _options).onSuccess) {
      _classPrivateFieldGet(this, _$form).on(_classPrivateFieldGet(this, _options).events.formSuccess, function (e) {
        Utils.call(_classPrivateFieldGet(that, _options).onSuccess, [e]);
      });
    }
    if (_classPrivateFieldGet(this, _options).onError) {
      _classPrivateFieldGet(this, _$form).on(_classPrivateFieldGet(this, _options).events.formError, function (e) {
        Utils.call(_classPrivateFieldGet(that, _options).onError, [e]);
      });
    }
  }
  function _initField2(field) {
    //保存this
    let that = this;
    let {
      fields,
      matchedField
    } = _classPrivateMethodGet(this, _getFields, _getFields2).call(this, field);
    field = matchedField;

    // 这里有的字段提供的可能是这种有多个选择的单选框
    //   fields: {
    //     'hobby[]': {
    //         message: '这是无效的。',
    //         rules: {
    //             notEmpty: {
    //                 message: '必须选择一个，这里会覆盖上面的message的默认值。'
    //             },
    //         }
    //     }
    // }
    //  因为html可能是这样的。 注意 ：name="hobby[]"
    //     <div class="form-group">
    //     <label class="col-lg-3 control-label">爱好</label>
    //     <div class="col-lg-5">
    //         <div class="radio">
    //             <label>
    //                 <input type="radio" name="hobby[]" id="hobby1" value="option1">
    //                 跑步
    //             </label>
    //         </div>
    //         <div class="radio">
    //             <label>
    //                 <input type="radio" name="hobby[]" id="hobby2" value="option2">
    //                 篮球
    //             </label>
    //         </div>
    //         <div class="radio disabled">
    //             <label>
    //                 <input type="radio" name="hobby[]" id="hobby3" value="option3" disabled>
    //                 乒乓球
    //             </label>
    //         </div>
    //     </div>
    // </div>

    // 因此fields里面可能会包含多个type 为 radio 的 input的jQuery对象为下面的代码做铺垫。

    //我们不需要验证不存在的字段
    if (fields.length === 0 || _classPrivateFieldGet(this, _options).fields[field] === null || _classPrivateFieldGet(this, _options).fields[field].rules === null) {
      return false;
    }

    /**
     * 过滤选项上传递的一些不存在的验证规则
     * fields:{
     *  username:{
     *    rules:{
     *      notEmpty:{},
     *      notEmptyqqxx:{},//这种rule在 bootstrapValidation 内置的rules中 肯定是不存在的，需要把它过滤掉，避免无意义的循环
     *    }
     *  }
     * }
     */
    Object.keys(_classPrivateFieldGet(this, _options).fields[field].rules).forEach(ruleName => {
      if (!$$6.fn[Constants.NAME].rules[ruleName]) {
        delete _classPrivateFieldGet(this, _options).fields[field].rules[ruleName];
      }
    });

    //是否启用字段的验证，没有设置默认给设置称true，true:表示开启。
    if (_classPrivateFieldGet(this, _options).fields[field].enabled === null) {
      _classPrivateFieldGet(this, _options).fields[field].enabled = true;
    }

    //字段元素jQ集合的长度，上面已经解释过了。它不会总是等于1
    let total = fields.length;

    // console.log(total);

    //获取类型
    let type = fields.attr('type');
    // console.log(type,field);

    //该判断是为了区分多个元素是否具有同样的name
    // <div class="form-group">
    //   <label class="col-lg-3 control-label">Editors</label>
    //   <div class="col-lg-5">
    //       <input class="form-control" type="text" name="editors[]" />
    //   </div>
    //   </div>
    //   <div class="form-group">
    //       <div class="col-lg-offset-3 col-lg-5">
    //           <input class="form-control" type="text" name="editors[]" />
    //       </div>
    //   </div>
    //   <div class="form-group">
    //       <div class="col-lg-offset-3 col-lg-5">
    //           <input class="form-control" type="text" name="editors[]" />
    //       </div>
    //   </div>
    //   <div class="form-group">
    //       <div class="col-lg-offset-3 col-lg-5">
    //           <input class="form-control" type="text" name="editors[]" />
    //       </div>
    //   </div>
    // 像上面这种结果该判断就会变成false
    let updateAll = total === 1 || 'radio' === type || 'checkbox' === type;
    // console.log(updateAll,field);

    // 事件类型判断，如果是字段元素是 radio checkbox file SELECT 则用change事件，否则就调用 this.#changeEvent
    let event = 'radio' === type || 'checkbox' === type || 'file' === type || 'SELECT' === fields.eq(0).get(0).tagName ? 'change' : _classPrivateFieldGet(this, _changeEvent);
    //获取字段触发验证的事件，并生成数组 ['focus','blur']
    let trigger = (_classPrivateFieldGet(this, _options).fields[field].trigger || _classPrivateFieldGet(this, _options).trigger || event).split(' ');
    // console.log(trigger)
    // 得到带有命名空间的事件 'focus.update.bv blur.update.bv',注意:这种格式的事件在jquery上也是可以触发的。
    let events = trigger.map(item => {
      return item + '.update.bv';
    }).join(' ');
    for (let i = 0; i < total; i++) {
      //当前字段元素
      let $field = fields.eq(i);

      // 字段元素容器选择器,先从字段选项上的group开始取，如果没有则在大选项中取
      let group = _classPrivateFieldGet(this, _options).fields[field].group || _classPrivateFieldGet(this, _options).group;

      //然后通过group参数取到jQuery对象
      let $parent = $field.parents(group);

      // 字段错误消息的容器,如果传递的选项是一个函数，则使用call方式调用。
      let container = 'function' === typeof (_classPrivateFieldGet(this, _options).fields[field].container || _classPrivateFieldGet(this, _options).container) ? (_classPrivateFieldGet(this, _options).fields[field].container || _classPrivateFieldGet(this, _options).container).call(this, $field, this) : _classPrivateFieldGet(this, _options).fields[field].container || _classPrivateFieldGet(this, _options).container;
      // 得到错误消息容器jQuery对象,如果container设置了且不等于tooltip和popover 那么就通过jQuery选择器查找元素,否则调用getMessageContainer()自动查找
      let $message = container && container !== 'tooltip' && container !== 'popover' ? $$6(container) : _classPrivateMethodGet(this, _getMessageContainer, _getMessageContainer2).call(this, $field, group);

      //如果container为真，且不等于tooltip或者popover则给错误容器添加一个.has-error
      //#https://getbootstrap.com/docs/3.4/css/#forms-control-validation
      if (container && container !== 'tooltip' && container !== 'popover') {
        $message.addClass('has-error');
      }

      //删除所有错误消息和反馈图标
      $message.find('.help-block[data-bv-rule][data-bv-for="' + field + '"]').remove();
      $parent.find('i[data-bv-icon-for="' + field + '"]').remove();

      // 每当用户更新字段值时，将其标记为尚未验证
      $field.off(events).on(events, function () {
        that.updateStatus($$6(this), Constants.STATUS_NOT_VALIDATED);
      });

      //保存错误消息容器到$field上
      $field.data('bv.messages', $message); //updateStatus要用

      for (let ruleName in _classPrivateFieldGet(this, _options).fields[field].rules) {
        //将所有的验证规则标记为未验证  bv.result.notEmpty bv.result.stringLength bv.result.emailAddress
        $field.data('bv.result.' + ruleName, Constants.STATUS_NOT_VALIDATED);

        //!updateAll：如果具有多个除了类型为radio，checkbox相同的name的字段元素时
        // || i === total - 1  如果类型是radio，checkbox 或者 total长度为1的字段元素 则等待外层循环到最后一次时再执行if内语句
        // 如果你这样有点不太好理解，可以换成这样
        // if (!updateAll) {
        //   $('<small/>')
        //     .css('display', 'none')
        //     .addClass('help-block')
        //     .attr('data-bv-rule', ruleName)
        //     .attr('data-bv-for', field)
        //     .attr('data-bv-result', Constants.STATUS_NOT_VALIDATED)
        //     .html(this.#getMessage(field, ruleName))
        //     .appendTo($message);
        // } else if (i === total - 1) { //这个判断是等待外层循环到最后一次时再执行
        //   $('<small/>')
        //     .css('display', 'none')
        //     .addClass('help-block')
        //     .attr('data-bv-rule', ruleName)
        //     .attr('data-bv-for', field)
        //     .attr('data-bv-result', Constants.STATUS_NOT_VALIDATED)
        //     .html(this.#getMessage(field, ruleName))
        //     .appendTo($message);
        // }
        if (!updateAll || i === total - 1) {
          $$6('<small/>').css('display', 'none').addClass('help-block').attr('data-bv-rule', ruleName).attr('data-bv-for', field).attr('data-bv-result', Constants.STATUS_NOT_VALIDATED).html(_classPrivateMethodGet(this, _getMessage, _getMessage2).call(this, field, ruleName)).appendTo($message);
        }

        // 初始化验证器
        if ('function' === typeof $$6.fn[Constants.NAME].rules[ruleName].init) {
          //如果验证规则中 定义了init方法，那么调用它。
          $$6.fn[Constants.NAME].rules[ruleName].init(this, $field, this.options.fields[field].rules[ruleName]);
        }
      }

      //准备反馈图标
      // 可用图标 https://getbootstrap.com/docs/3.4/css/#forms-control-validation
      //该判断是先判断字段是否已经先设置图标，字段没有，那就从大选项中去找
      if (_classPrivateFieldGet(this, _options).fields[field].feedbackIcons !== false && _classPrivateFieldGet(this, _options).fields[field].feedbackIcons !== 'false' && _classPrivateFieldGet(this, _options).feedbackIcons && _classPrivateFieldGet(this, _options).feedbackIcons.validating && _classPrivateFieldGet(this, _options).feedbackIcons.invalid && _classPrivateFieldGet(this, _options).feedbackIcons.valid && (!updateAll || i === total - 1)) {
        // $parent.removeClass('has-success').removeClass('has-error').addClass('has-feedback');

        // 如果是带有图标的设置，那么根据bootstrap3.x的官网可以得出结论，是需要在父级添加.has-feedback类的。
        //   <div class="form-group has-success has-feedback">
        //     <label class="control-label" for="inputGroupSuccess1">带成功状态的input-group</label>
        //     <div class="input-group">
        //         <span class="input-group-addon">@</span>
        //         <input type="text" class="form-control" id="inputGroupSuccess1"
        //             aria-describedby="inputGroupSuccess1Status">
        //     </div>
        //     <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
        //     <span id="inputGroupSuccess1Status" class="sr-only">(success)</span>
        // </div>
        // 实际上就是给.form-group所在的元素添加一个.has-feedback
        $parent.addClass('has-feedback');

        //创建图标元素。插入到字段元素的后面$field
        let $icon = $$6('<i/>').css('display', 'none').addClass('form-control-feedback').attr('data-bv-icon-for', field).insertAfter($field);

        // console.log($icon);

        // 如果是单选框和复选框放在的容器后面
        // <div class="form-group">
        //   <label class="col-lg-3 control-label">爱好</label>
        //     <div class="col-lg-5">
        //         <div class="radio">
        //             <label>
        //                 <input type="radio" name="hobby[]" id="hobby1" value="option1">
        //                 跑步
        //             </label>
        //         </div>
        //         <div class="radio">
        //             <label>
        //                 <input type="radio" name="hobby[]" id="hobby2" value="option2">
        //                 篮球
        //             </label>
        //         </div>
        //         <div class="radio disabled">
        //             <label>
        //                 <input type="radio" name="hobby[]" id="hobby3" value="option3" disabled>
        //                 乒乓球
        //             </label>
        //         </div>
        //     </div>
        // </div>
        // $field其实就是上面的每一个input框 <input type="radio" name="hobby[]" id="hobby2" value="option2">
        if ('checkbox' === type || 'radio' === type) {
          let $fieldParent = $field.parent(); //得到的是 <label>xxx</label>
          if ($fieldParent.hasClass(type)) {
            //既然得到的是<label>xxx</label> 那么它肯定是没有这个radio或者是chekcbox类(bootstrap的单选/复选设计如此)
            $icon.insertAfter($fieldParent); //如果有就直接插入到该字段元素的父级元素后面。
          } else if ($fieldParent.parent().hasClass(type)) {
            //进入该判断，则判断父级的父级是否有该类
            $icon.insertAfter($fieldParent.parent()); //有的话就插入到后面。
          }
        }

        // 如果没有标签，则反馈图标无法正确渲染
        // https://github.com/twbs/bootstrap/issues/12873
        if ($parent.find('label').length === 0) {
          $icon.addClass('bv-no-label');
        }

        // 修复输入组中的反馈图标
        if ($parent.find('.input-group').length !== 0) {
          $icon.addClass('bv-icon-input-group').insertAfter($parent.find('.input-group').eq(0));
        }

        // 将图标存储为字段元素的数据
        if (!updateAll) {
          $field.data('bv.icon', $icon);
        } else if (i === total - 1) {
          // 具有相同名称的所有字段都具有相同的图标
          fields.data('bv.icon', $icon);
        }
        if (container) {
          //如果有指示错误消息容器。
          $field
          // 当字段获得焦点时显示工具提示/弹出消息
          .off('focus.container.bv').on('focus.container.bv', function () {
            switch (container) {
              case 'tooltip':
                $$6(this).data('bv.icon').tooltip('show');
                break;
              case 'popover':
                $$6(this).data('bv.icon').popover('show');
                break;
            }
          })
          // 并在失去焦点时隐藏它们
          .off('blur.container.bv').on('blur.container.bv', function () {
            switch (container) {
              case 'tooltip':
                $$6(this).data('bv.icon').tooltip('hide');
                break;
              case 'popover':
                $$6(this).data('bv.icon').popover('hide');
                break;
            }
          });
        }
      }
    }

    // 准备事件
    fields.on(_classPrivateFieldGet(this, _options).events.fieldSuccess, function (e, data) {
      let onSuccess = that.getOptions(data.field, null, 'onSuccess');
      if (onSuccess) {
        Utils.call(onSuccess, [e, data]);
      }
    }).on(_classPrivateFieldGet(this, _options).events.fieldError, function (e, data) {
      let onError = that.getOptions(data.field, null, 'onError');
      if (onError) {
        Utils.call(onError, [e, data]);
      }
    }).on(_classPrivateFieldGet(this, _options).events.fieldStatus, function (e, data) {
      let onStatus = that.getOptions(data.field, null, 'onStatus');
      if (onStatus) {
        Utils.call(onStatus, [e, data]);
      }
    }).on(_classPrivateFieldGet(this, _options).events.validatorError, function (e, data) {
      let onError = that.getOptions(data.field, data.validator, 'onError');
      if (onError) {
        Utils.call(onError, [e, data]);
      }
    }).on(_classPrivateFieldGet(this, _options).events.validatorSuccess, function (e, data) {
      let onSuccess = that.getOptions(data.field, data.validator, 'onSuccess');
      if (onSuccess) {
        Utils.call(onSuccess, [e, data]);
      }
    });

    // 根据选项传入过来的模式选项来开始设置事件。 focus.live.bv blur.live.bv  change.live.bv input.live.bv
    events = $$6.map(trigger, function (item) {
      return item + '.live.bv';
    }).join(' ');
    if (_classPrivateFieldGet(this, _options).live === 'disabled') {
      // 提交表单后才会显示错误消息
      fields.off(events);
    } else if (_classPrivateFieldGet(this, _options).live !== 'submitted') {
      // 意思就是 this.#options.live === 'enabled' 或者其它乱七八糟的字符串

      fields.off(events).on(events, function () {
        if (_classPrivateMethodGet(that, _exceedThreshold, _exceedThreshold2).call(that, $$6(this))) {
          that.validateField($$6(this));
        }
      });
    }
    fields.trigger($$6.Event(_classPrivateFieldGet(this, _options).events.fieldInit), {
      bv: this,
      field: field,
      element: fields
    });
  }
  function _submit2() {
    let isValid = this.isValid();
    let eventType = isValid ? _classPrivateFieldGet(this, _options).events.formSuccess : _classPrivateFieldGet(this, _options).events.formError;
    let e = $$6.Event(eventType);
    _classPrivateFieldGet(this, _$form).trigger(e);

    // 调用默认处理程序
    // 检查是否单击了提交按钮
    if (_classPrivateFieldGet(this, _$submitButton)) {
      isValid ? _classPrivateMethodGet(this, _onSuccess, _onSuccess2).call(this, e) : _classPrivateMethodGet(this, _onError, _onError2).call(this, e);
    }
  }
  function _onSuccess2(e) {
    if (e.isDefaultPrevented()) {
      return;
    }

    // 提交表单
    this.disableSubmitButtons(true).defaultSubmit();
  }
  function _onError2(e) {
    if (e.isDefaultPrevented()) {
      return;
    }
    if ('submitted' === _classPrivateFieldGet(this, _options).live) {
      // 设置成 enabled 模式
      _classPrivateFieldGet(this, _options).live = 'enabled';

      //保存this
      let that = this;
      for (let field in _classPrivateFieldGet(this, _options).fields) {
        let fields = this.getFieldElements(field);
        if (fields.length) {
          let type = $$6(fields[0]).attr('type');
          let event = 'radio' === type || 'checkbox' === type || 'file' === type || 'SELECT' === $$6(fields[0]).get(0).tagName ? 'change' : _classPrivateFieldGet(that, _changeEvent);
          let trigger = _classPrivateFieldGet(that, _options).fields[field].trigger || _classPrivateFieldGet(that, _options).trigger || event;
          let events = $$6.map(trigger.split(' '), function (item) {
            return item + '.live.bv';
          }).join(' ');
          fields.off(events).on(events, function () {
            if (_classPrivateMethodGet(that, _exceedThreshold, _exceedThreshold2).call(that, $$6(this))) {
              that.validateField($$6(this));
            }
          });
        }
      }
    }

    // 已确定将自动关注的第一个无效字段
    for (let i = 0; i < _classPrivateFieldGet(this, _$invalidFields).length; i++) {
      let $field = _classPrivateFieldGet(this, _$invalidFields).eq(i);
      let autoFocus = _classPrivateMethodGet(this, _isOptionEnabled, _isOptionEnabled2).call(this, $field.attr('data-bv-field'), 'autoFocus');
      if (autoFocus) {
        // 激活包含字段的选项卡（如果存在）
        let $tabPane = $field.parents('.tab-pane');
        let tabId;
        if ($tabPane && (tabId = $tabPane.attr('id'))) {
          $$6('a[href="#' + tabId + '"][data-toggle="tab"]').tab('show');
        }
        // 给字段聚焦
        $field.focus();
        break;
      }
    }
  }
  function _getFields2(field) {
    var _fieldMapping$field;
    let fields = $$6([]);
    const fieldMapping = {
      object: () => {
        fields = field;
        field = field.attr('data-bv-field');
      },
      string: () => {
        fields = this.getFieldElements(field);
      }
    };

    //可选链运算符 ?.
    (_fieldMapping$field = fieldMapping[typeof field]) === null || _fieldMapping$field === void 0 || _fieldMapping$field.call(fieldMapping);
    return {
      fields,
      matchedField: field
    };
  }
  function _isExistField2(fields, matchedField) {
    if (fields.length === 0 || !_classPrivateFieldGet(this, _options).fields[matchedField] || _classPrivateFieldGet(this, _options).fields[matchedField].enabled === false) {
      return false;
    }
    return true;
  }
  function _onFieldValidated2($field, ruleName) {
    let field = $field.attr('data-bv-field');
    let rules = _classPrivateFieldGet(this, _options).fields[field].rules;
    let counter = {};
    let numValidators = 0;
    let data = {
      bv: this,
      field: field,
      element: $field,
      validator: ruleName,
      result: $field.data('bv.response.' + ruleName)
    };

    // 在给定的验证器完成后触发事件
    if (ruleName) {
      var _ruleMapping$$field$d;
      const ruleMapping = {
        [Constants.STATUS_INVALID]: () => {
          //xxxx
          $field.trigger($$6.Event(_classPrivateFieldGet(this, _options).events.ruleError), data);
        },
        [Constants.STATUS_VALID]: () => {
          //xxx
          $field.trigger($$6.Event(_classPrivateFieldGet(this, _options).events.ruleSuccess), data);
        }
      };
      (_ruleMapping$$field$d = ruleMapping[$field.data('bv.result.' + ruleName)]) === null || _ruleMapping$$field$d === void 0 || _ruleMapping$$field$d.call(ruleMapping);
    }
    counter[Constants.STATUS_NOT_VALIDATED] = 0;
    counter[Constants.STATUS_VALIDATING] = 0;
    counter[Constants.STATUS_INVALID] = 0;
    counter[Constants.STATUS_VALID] = 0;
    for (let rule in rules) {
      if (rules[rule].enabled === false) {
        continue;
      }
      numValidators++;
      let result = $field.data('bv.result.' + rule);
      if (result) {
        counter[result]++;
      }
    }

    //如果所有验证器都已完成，并且至少有一个验证器未通过
    let condition = (counter[Constants.STATUS_NOT_VALIDATED] === 0 || !_classPrivateMethodGet(this, _isOptionEnabled, _isOptionEnabled2).call(this, field, 'verbose')) && counter[Constants.STATUS_VALIDATING] === 0 && counter[Constants.STATUS_INVALID] > 0;
    if (counter[Constants.STATUS_VALID] === numValidators) {
      //从无效字段列表中删除
      _classPrivateFieldSet(this, _$invalidFields, _classPrivateFieldGet(this, _$invalidFields).not($field));
      $field.trigger($$6.Event(_classPrivateFieldGet(this, _options).events.fieldSuccess), data);
    } else if (condition) {
      // 添加到无效字段列表
      _classPrivateFieldSet(this, _$invalidFields, _classPrivateFieldGet(this, _$invalidFields).add($field));
      $field.trigger($$6.Event(_classPrivateFieldGet(this, _options).events.fieldError), data);
    }
  }
  function _isExcluded2($field) {
    let excludedAttr = $field.attr('data-bv-excluded');
    // 再次取字段
    let field = $field.attr('data-bv-field') || $field.attr('name');

    //确保有该字段。
    let hasField = Boolean(field) && _classPrivateFieldGet(this, _options).fields && _classPrivateFieldGet(this, _options).fields[field];
    // 确保字段选项上有设置 excluded
    let hasExcludedOption = _classPrivateFieldGet(this, _options).fields[field].excluded === 'true' || _classPrivateFieldGet(this, _options).fields[field].excluded === true;
    let withoutExcludedOption = _classPrivateFieldGet(this, _options).fields[field].excluded === 'false' || _classPrivateFieldGet(this, _options).fields[field].excluded === false;
    if (hasField && hasExcludedOption || excludedAttr === 'true' || excludedAttr === '') {
      return true;
    } else if (hasField && withoutExcludedOption || excludedAttr === 'false') {
      return false;
    } else {
      if (_classPrivateFieldGet(this, _options).excluded) {
        // excluded的格式可以是下面三种情况
        // 数组，元素是字符串:
        // [':disabled', ':hidden', ':not(:visible)']
        // 字符串数组，使用逗号分隔:
        // ':disabled, :hidden, :not(:visible)'
        // 数组，元素可以是一个callback，其中callback内必须返回true/false
        // [':disabled', ':hidden', function ($field, validation) {
        //   // 不验证不可见元素
        //   return !$field.is(':visible');
        // }]

        // 如果是字符串格式 ':disabled, :hidden, :not(:visible)'
        // 先统一转换成数组的格式
        if ('string' === typeof _classPrivateFieldGet(this, _options).excluded) {
          _classPrivateFieldGet(this, _options).excluded = _classPrivateFieldGet(this, _options).excluded.split(',').map(item => {
            return item.trim();
          });
        }
        for (const excludedItem of _classPrivateFieldGet(this, _options).excluded) {
          //如果是字符串，就判断字段元素 是否符合excluded选择器
          // 如果是函数，那就执行回调。
          if ('string' === typeof excludedItem && $field.is(excludedItem) || 'function' === typeof excludedItem && excludedItem.call(this, $field, this) === true) {
            return true;
          }
        }
      }
      return false;
    }
  }
  function _isOptionEnabled2(field, option) {
    if (_classPrivateFieldGet(this, _options).fields[field] && (_classPrivateFieldGet(this, _options).fields[field][option] === 'true' || _classPrivateFieldGet(this, _options).fields[field][option] === true)) {
      return true;
    }
    if (_classPrivateFieldGet(this, _options).fields[field] && (_classPrivateFieldGet(this, _options).fields[field][option] === 'false' || _classPrivateFieldGet(this, _options).fields[field][option] === false)) {
      return false;
    }
    return _classPrivateFieldGet(this, _options)[option] === 'true' || _classPrivateFieldGet(this, _options)[option] === true;
  }
  function _exceedThreshold2($field) {
    let field = $field.attr('data-bv-field');
    let threshold = _classPrivateFieldGet(this, _options).fields[field].threshold || _classPrivateFieldGet(this, _options).threshold;
    if (!threshold) {
      return true;
    }
    let cannotType = $$6.inArray($field.attr('type'), ['button', 'checkbox', 'file', 'hidden', 'image', 'radio', 'reset', 'submit']) !== -1;
    return cannotType || $field.val().length >= threshold;
  }
  function _getMessage2(field, ruleName) {
    if (!_classPrivateFieldGet(this, _options).fields[field] || !$$6.fn[Constants.NAME].rules[ruleName] || !_classPrivateFieldGet(this, _options).fields[field].rules || !_classPrivateFieldGet(this, _options).fields[field].rules[ruleName]) {
      return '';
    }
    let options = _classPrivateFieldGet(this, _options).fields[field].rules[ruleName];
    switch (true) {
      case !!options.message:
        return options.message;
      case !!_classPrivateFieldGet(this, _options).fields[field].message:
        return _classPrivateFieldGet(this, _options).fields[field].message;
      case !!$$6.fn[Constants.NAME].i18n[ruleName]:
        return $$6.fn[Constants.NAME].i18n[ruleName]['default'];
      default:
        return _classPrivateFieldGet(this, _options).message;
    }
  }
  function _getMessageContainer2($field, group) {
    let $parent = $field.parent();
    if ($parent.is(group)) {
      return $parent;
    }
    let cssClasses = $parent.attr('class');
    if (!cssClasses) {
      return _classPrivateMethodGet(this, _getMessageContainer, _getMessageContainer2).call(this, $parent, group);
    }
    cssClasses = cssClasses.split(' ');
    let n = cssClasses.length;
    for (let i = 0; i < n; i++) {
      if (/^col-(xs|sm|md|lg)-\d+$/.test(cssClasses[i]) || /^col-(xs|sm|md|lg)-offset-\d+$/.test(cssClasses[i])) {
        return $parent;
      }
    }
    return _classPrivateMethodGet(this, _getMessageContainer, _getMessageContainer2).call(this, $parent, group);
  }
  function _parseOptions2($field) {
    let field = $field.attr('name') || $field.attr('data-bv-field');
    // console.log($.fn[Constants.NAME].rules);

    //验证规则
    let rules = {};
    for (const [ruleName, rule] of Object.entries($$6.fn[Constants.NAME].rules)) {
      //有几个验证规则，这里就要循环几次
      // console.log(ruleName,rule);

      let attrName = 'data-bv-' + ruleName.toLowerCase();

      //然后从字段元素上取  data-bv-notempty 或者 data-bv-stringlength data-bv-xxx 属性,强制转换为string
      let enabled = String($field.attr(attrName));
      let html5AttrMap = 'function' === typeof rule.enableByHtml5 ? rule.enableByHtml5($field) : null;

      // console.log(attrName,enabled,typeof enabled,html5AttrMap,$field);

      //启用html5属性，同时是通过data-bv-xxx来设置验证规则的。
      let condition = html5AttrMap && enabled !== 'false';

      // 没有启用html5的属性 但是有通过data-bv-xxx来设置验证规则的。
      //例子1:<input  type="text" class="form-control" name="username" data-bv-notempty data-bv-stringlength="true" />
      // 例子1解释: 它有data-bv-notempty  data-bv-stringlength="true" 这样的方式来设置rule属性 condition2就会为true
      // 例子2：<input  type="text" class="form-control" name="username" require  />
      // 例子2解释：如果设置了，html5的属性 require 或者 没有通过 data-bv-xxx 这种方式来设置验证规则，则enabled肯定会等于undefined 则condition2 就会变成false
      let condition2 = html5AttrMap !== true && ('' === enabled || 'true' === enabled || attrName === enabled.toLowerCase());
      // console.log("condition2:",condition2);

      if (condition || condition2) {
        //尝试通过属性解析选项

        // 合并验证规则 rule 的 html5的属性。下面要用来循环取值
        // 比如stringLength的html5属性默认有min、max、trim、utf8bytes、message
        // {message: 'message', onerror: 'onError', onsuccess: 'onSuccess', min: 'min', max: 'max'}
        rule.html5Attributes = $$6.extend({}, {
          message: 'message',
          onerror: 'onError',
          onsuccess: 'onSuccess'
        }, rule.html5Attributes);
        // console.log(rule.html5Attributes,$field);

        rules[ruleName] = $$6.extend({}, html5AttrMap === true ? {} : html5AttrMap, rules[ruleName]);
        // console.log(rules);

        //解析验证规则的子选项
        // 例子：<input  type="text" class="form-control" name="username" data-bv-notempty data-bv-stringlength="true" data-bv-stringlength-min="2" data-bv-stringlength-max="10" />
        // 这段代码解析的就是 data-bv-stringlength-min data-bv-stringlength-max 这种验证规则的子选项
        for (const [html5AttrName, optionName] of Object.entries(rule.html5Attributes)) {
          let optionAttrName = 'data-bv-' + ruleName.toLowerCase() + '-' + html5AttrName;
          let optionValue = $field.attr(optionAttrName);
          // console.log(optionAttrName,optionValue);
          if (optionValue) {
            // 如果有设置
            if ('true' === optionValue || optionAttrName === optionValue.toLowerCase()) {
              //如果设置的值为true
              optionValue = true;
            } else if ('false' === optionValue) {
              //如果为false
              optionValue = false;
            }

            // 则分别给不同的验证规则添加上验证规则的选项。
            //比如原来该规则是空对象 stringLength: {}   添加过后则变成 stringLength: {min: '2', max: '10' }
            rules[ruleName][optionName] = optionValue;
          }
        }
      }
    }

    //获取字段选项
    const opts = {
      feedbackIcons: $field.attr('data-bv-feedbackicons'),
      onStatus: $field.attr('data-bv-onstatus'),
      selector: $field.attr('data-bv-selector'),
      ..._classPrivateMethodGet(this, _getCommonDataOptions, _getCommonDataOptions2).call(this, $field),
      rules
    };

    //检查字段选项是否使用HTML属性设置
    let emptyOptions = $$6.isEmptyObject(opts);
    //检查字段验证器是否使用HTML属性设置
    let emptyRules = $$6.isEmptyObject(rules);
    if (!emptyRules || !emptyOptions && _classPrivateFieldGet(this, _options).fields && _classPrivateFieldGet(this, _options).fields[field]) {
      opts.rules = rules;
      return opts;
    } else {
      return null;
    }
  }
  function _getOptionsfromHtml2() {
    return {
      events: {
        formInit: _classPrivateFieldGet(this, _$form).attr('data-bv-events-form-init'),
        formError: _classPrivateFieldGet(this, _$form).attr('data-bv-events-form-error'),
        formSuccess: _classPrivateFieldGet(this, _$form).attr('data-bv-events-form-success'),
        fieldAdded: _classPrivateFieldGet(this, _$form).attr('data-bv-events-field-added'),
        fieldRemoved: _classPrivateFieldGet(this, _$form).attr('data-bv-events-field-removed'),
        fieldInit: _classPrivateFieldGet(this, _$form).attr('data-bv-events-field-init'),
        fieldError: _classPrivateFieldGet(this, _$form).attr('data-bv-events-field-error'),
        fieldSuccess: _classPrivateFieldGet(this, _$form).attr('data-bv-events-field-success'),
        fieldStatus: _classPrivateFieldGet(this, _$form).attr('data-bv-events-field-status'),
        validatorError: _classPrivateFieldGet(this, _$form).attr('data-bv-events-validator-error'),
        validatorSuccess: _classPrivateFieldGet(this, _$form).attr('data-bv-events-validator-success')
      },
      feedbackIcons: {
        valid: _classPrivateFieldGet(this, _$form).attr('data-bv-feedbackicons-valid'),
        invalid: _classPrivateFieldGet(this, _$form).attr('data-bv-feedbackicons-invalid'),
        validating: _classPrivateFieldGet(this, _$form).attr('data-bv-feedbackicons-validating')
      },
      live: _classPrivateFieldGet(this, _$form).attr('data-bv-live'),
      submitButtons: _classPrivateFieldGet(this, _$form).attr('data-bv-submitbuttons'),
      ..._classPrivateMethodGet(this, _getCommonDataOptions, _getCommonDataOptions2).call(this, _classPrivateFieldGet(this, _$form))
    };
  }
  function _getCommonDataOptions2($type) {
    return {
      autoFocus: $type.attr('data-bv-autofocus'),
      container: $type.attr('data-bv-container'),
      excluded: $type.attr('data-bv-excluded'),
      group: $type.attr('data-bv-group'),
      message: $type.attr('data-bv-message'),
      onError: $type.attr('data-bv-onerror'),
      onSuccess: $type.attr('data-bv-onsuccess'),
      threshold: $type.attr('data-bv-threshold'),
      trigger: $type.attr('data-bv-trigger'),
      verbose: $type.attr('data-bv-verbose')
    };
  }
  //静态变量
  _defineProperty(BootstrapValidation, "VERSION", Constants.VERSION);
  _defineProperty(BootstrapValidation, "DEFAULTS", Constants.DEFAULTS);
  $$6.fn[Constants.NAME] = function (option) {
    //获取参数
    let params = arguments;
    return this.each(function () {
      let $this = $$6(this);
      let data = $this.data(Constants.NAME);

      //选项合并
      let options = $$6.extend({}, $$6.fn[Constants.NAME].defaults, 'object' === typeof option && option);
      //如果不存在就创建一个实例,然后存到data属性
      if (!data) {
        data = new BootstrapValidation(this, options);
        $this.data(Constants.NAME, data);
      }
      if ('string' === typeof option) {
        if (typeof data[option] !== 'function') {
          throw new Error("Unknown method: ".concat(option));
        }
        data[option].apply(data, Array.prototype.slice.call(params, 1));
      }
    });
  };
  $$6.fn[Constants.NAME].Constructor = BootstrapValidation;
  $$6.fn[Constants.NAME].VERSION = BootstrapValidation.VERSION;
  $$6.fn[Constants.NAME].defaults = BootstrapValidation.DEFAULTS;
  $$6.fn[Constants.NAME].rules = Rules;
  $$6.fn[Constants.NAME].i18n = {};
  $$6.fn[Constants.NAME].utils = Utils;

  return BootstrapValidation;

}));
//# sourceMappingURL=bootstrap-validation.js.map
