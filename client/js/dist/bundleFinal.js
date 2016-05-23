"bundle";
(function() {
var define = System.amdDefine;
(function(global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ? factory(global, true) : function(w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
  var arr = [];
  var document = window.document;
  var slice = arr.slice;
  var concat = arr.concat;
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var support = {};
  var version = "2.2.4",
      jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
      },
      rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      rmsPrefix = /^-ms-/,
      rdashAlpha = /-([\da-z])/gi,
      fcamelCase = function(all, letter) {
        return letter.toUpperCase();
      };
  jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    selector: "",
    length: 0,
    toArray: function() {
      return slice.call(this);
    },
    get: function(num) {
      return num != null ? (num < 0 ? this[num + this.length] : this[num]) : slice.call(this);
    },
    pushStack: function(elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      return ret;
    },
    each: function(callback) {
      return jQuery.each(this, callback);
    },
    map: function(callback) {
      return this.pushStack(jQuery.map(this, function(elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    slice: function() {
      return this.pushStack(slice.apply(this, arguments));
    },
    first: function() {
      return this.eq(0);
    },
    last: function() {
      return this.eq(-1);
    },
    eq: function(i) {
      var len = this.length,
          j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function() {
      return this.prevObject || this.constructor();
    },
    push: push,
    sort: arr.sort,
    splice: arr.splice
  };
  jQuery.extend = jQuery.fn.extend = function() {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    isReady: true,
    error: function(msg) {
      throw new Error(msg);
    },
    noop: function() {},
    isFunction: function(obj) {
      return jQuery.type(obj) === "function";
    },
    isArray: Array.isArray,
    isWindow: function(obj) {
      return obj != null && obj === obj.window;
    },
    isNumeric: function(obj) {
      var realStringObj = obj && obj.toString();
      return !jQuery.isArray(obj) && (realStringObj - parseFloat(realStringObj) + 1) >= 0;
    },
    isPlainObject: function(obj) {
      var key;
      if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
      }
      if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype || {}, "isPrototypeOf")) {
        return false;
      }
      for (key in obj) {}
      return key === undefined || hasOwn.call(obj, key);
    },
    isEmptyObject: function(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    type: function(obj) {
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
    },
    globalEval: function(code) {
      var script,
          indirect = eval;
      code = jQuery.trim(code);
      if (code) {
        if (code.indexOf("use strict") === 1) {
          script = document.createElement("script");
          script.text = code;
          document.head.appendChild(script).parentNode.removeChild(script);
        } else {
          indirect(code);
        }
      }
    },
    camelCase: function(string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    },
    nodeName: function(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each: function(obj, callback) {
      var length,
          i = 0;
      if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }
      return obj;
    },
    trim: function(text) {
      return text == null ? "" : (text + "").replace(rtrim, "");
    },
    makeArray: function(arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function(elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },
    merge: function(first, second) {
      var len = +second.length,
          j = 0,
          i = first.length;
      for (; j < len; j++) {
        first[i++] = second[j];
      }
      first.length = i;
      return first;
    },
    grep: function(elems, callback, invert) {
      var callbackInverse,
          matches = [],
          i = 0,
          length = elems.length,
          callbackExpect = !invert;
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }
      return matches;
    },
    map: function(elems, callback, arg) {
      var length,
          value,
          i = 0,
          ret = [];
      if (isArrayLike(elems)) {
        length = elems.length;
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      }
      return concat.apply([], ret);
    },
    guid: 1,
    proxy: function(fn, context) {
      var tmp,
          args,
          proxy;
      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }
      args = slice.call(arguments, 2);
      proxy = function() {
        return fn.apply(context || this, args.concat(slice.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    },
    now: Date.now,
    support: support
  });
  if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
  }
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });
  function isArrayLike(obj) {
    var length = !!obj && "length" in obj && obj.length,
        type = jQuery.type(obj);
    if (type === "function" || jQuery.isWindow(obj)) {
      return false;
    }
    return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
  }
  var Sizzle = (function(window) {
    var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,
        setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,
        expando = "sizzle" + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        sortOrder = function(a, b) {
          if (a === b) {
            hasDuplicate = true;
          }
          return 0;
        },
        MAX_NEGATIVE = 1 << 31,
        hasOwn = ({}).hasOwnProperty,
        arr = [],
        pop = arr.pop,
        push_native = arr.push,
        push = arr.push,
        slice = arr.slice,
        indexOf = function(list, elem) {
          var i = 0,
              len = list.length;
          for (; i < len; i++) {
            if (list[i] === elem) {
              return i;
            }
          }
          return -1;
        },
        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        whitespace = "[\\x20\\t\\r\\n\\f]",
        identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
        pseudos = ":(" + identifier + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)",
        rwhitespace = new RegExp(whitespace + "+", "g"),
        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
        rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
        rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
        rpseudo = new RegExp(pseudos),
        ridentifier = new RegExp("^" + identifier + "$"),
        matchExpr = {
          "ID": new RegExp("^#(" + identifier + ")"),
          "CLASS": new RegExp("^\\.(" + identifier + ")"),
          "TAG": new RegExp("^(" + identifier + "|[*])"),
          "ATTR": new RegExp("^" + attributes),
          "PSEUDO": new RegExp("^" + pseudos),
          "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
          "bool": new RegExp("^(?:" + booleans + ")$", "i"),
          "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        },
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,
        rnative = /^[^{]+\{\s*\[native \w/,
        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        rsibling = /[+~]/,
        rescape = /'|\\/g,
        runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
        funescape = function(_, escaped, escapedWhitespace) {
          var high = "0x" + escaped - 0x10000;
          return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
        },
        unloadHandler = function() {
          setDocument();
        };
    try {
      push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {apply: arr.length ? function(target, els) {
          push_native.apply(target, slice.call(els));
        } : function(target, els) {
          var j = target.length,
              i = 0;
          while ((target[j++] = els[i++])) {}
          target.length = j - 1;
        }};
    }
    function Sizzle(selector, context, results, seed) {
      var m,
          i,
          elem,
          nid,
          nidselect,
          match,
          groups,
          newSelector,
          newContext = context && context.ownerDocument,
          nodeType = context ? context.nodeType : 9;
      results = results || [];
      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }
      if (!seed) {
        if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
          setDocument(context);
        }
        context = context || document;
        if (documentIsHTML) {
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            if ((m = match[1])) {
              if (nodeType === 9) {
                if ((elem = context.getElementById(m))) {
                  if (elem.id === m) {
                    results.push(elem);
                    return results;
                  }
                } else {
                  return results;
                }
              } else {
                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                  results.push(elem);
                  return results;
                }
              }
            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results;
            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          }
          if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
            if (nodeType !== 1) {
              newContext = context;
              newSelector = selector;
            } else if (context.nodeName.toLowerCase() !== "object") {
              if ((nid = context.getAttribute("id"))) {
                nid = nid.replace(rescape, "\\$&");
              } else {
                context.setAttribute("id", (nid = expando));
              }
              groups = tokenize(selector);
              i = groups.length;
              nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']";
              while (i--) {
                groups[i] = nidselect + " " + toSelector(groups[i]);
              }
              newSelector = groups.join(",");
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
            }
            if (newSelector) {
              try {
                push.apply(results, newContext.querySelectorAll(newSelector));
                return results;
              } catch (qsaError) {} finally {
                if (nid === expando) {
                  context.removeAttribute("id");
                }
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    function createCache() {
      var keys = [];
      function cache(key, value) {
        if (keys.push(key + " ") > Expr.cacheLength) {
          delete cache[keys.shift()];
        }
        return (cache[key + " "] = value);
      }
      return cache;
    }
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    function assert(fn) {
      var div = document.createElement("div");
      try {
        return !!fn(div);
      } catch (e) {
        return false;
      } finally {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
        div = null;
      }
    }
    function addHandle(attrs, handler) {
      var arr = attrs.split("|"),
          i = arr.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    function siblingCheck(a, b) {
      var cur = b && a,
          diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
      if (diff) {
        return diff;
      }
      if (cur) {
        while ((cur = cur.nextSibling)) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    function createInputPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function(argument) {
        argument = +argument;
        return markFunction(function(seed, matches) {
          var j,
              matchIndexes = fn([], seed.length, argument),
              i = matchIndexes.length;
          while (i--) {
            if (seed[(j = matchIndexes[i])]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    }
    support = Sizzle.support = {};
    isXML = Sizzle.isXML = function(elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== "HTML" : false;
    };
    setDocument = Sizzle.setDocument = function(node) {
      var hasCompare,
          parent,
          doc = node ? node.ownerDocument || node : preferredDoc;
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }
      document = doc;
      docElem = document.documentElement;
      documentIsHTML = !isXML(document);
      if ((parent = document.defaultView) && parent.top !== parent) {
        if (parent.addEventListener) {
          parent.addEventListener("unload", unloadHandler, false);
        } else if (parent.attachEvent) {
          parent.attachEvent("onunload", unloadHandler);
        }
      }
      support.attributes = assert(function(div) {
        div.className = "i";
        return !div.getAttribute("className");
      });
      support.getElementsByTagName = assert(function(div) {
        div.appendChild(document.createComment(""));
        return !div.getElementsByTagName("*").length;
      });
      support.getElementsByClassName = rnative.test(document.getElementsByClassName);
      support.getById = assert(function(div) {
        docElem.appendChild(div).id = expando;
        return !document.getElementsByName || !document.getElementsByName(expando).length;
      });
      if (support.getById) {
        Expr.find["ID"] = function(id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var m = context.getElementById(id);
            return m ? [m] : [];
          }
        };
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            return elem.getAttribute("id") === attrId;
          };
        };
      } else {
        delete Expr.find["ID"];
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        };
      }
      Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
        if (typeof context.getElementsByTagName !== "undefined") {
          return context.getElementsByTagName(tag);
        } else if (support.qsa) {
          return context.querySelectorAll(tag);
        }
      } : function(tag, context) {
        var elem,
            tmp = [],
            i = 0,
            results = context.getElementsByTagName(tag);
        if (tag === "*") {
          while ((elem = results[i++])) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }
          return tmp;
        }
        return results;
      };
      Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
        if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      rbuggyMatches = [];
      rbuggyQSA = [];
      if ((support.qsa = rnative.test(document.querySelectorAll))) {
        assert(function(div) {
          docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";
          if (div.querySelectorAll("[msallowcapture^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
          }
          if (!div.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
          }
          if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
            rbuggyQSA.push("~=");
          }
          if (!div.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked");
          }
          if (!div.querySelectorAll("a#" + expando + "+*").length) {
            rbuggyQSA.push(".#.+[+~]");
          }
        });
        assert(function(div) {
          var input = document.createElement("input");
          input.setAttribute("type", "hidden");
          div.appendChild(input).setAttribute("name", "D");
          if (div.querySelectorAll("[name=d]").length) {
            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
          }
          if (!div.querySelectorAll(":enabled").length) {
            rbuggyQSA.push(":enabled", ":disabled");
          }
          div.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }
      if ((support.matchesSelector = rnative.test((matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
        assert(function(div) {
          support.disconnectedMatch = matches.call(div, "div");
          matches.call(div, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos);
        });
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
      hasCompare = rnative.test(docElem.compareDocumentPosition);
      contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function(a, b) {
        if (b) {
          while ((b = b.parentNode)) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      };
      sortOrder = hasCompare ? function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
          return compare;
        }
        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
        if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
          if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
            return -1;
          }
          if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
            return 1;
          }
          return sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
        }
        return compare & 4 ? -1 : 1;
      } : function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var cur,
            i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [a],
            bp = [b];
        if (!aup || !bup) {
          return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
        } else if (aup === bup) {
          return siblingCheck(a, b);
        }
        cur = a;
        while ((cur = cur.parentNode)) {
          ap.unshift(cur);
        }
        cur = b;
        while ((cur = cur.parentNode)) {
          bp.unshift(cur);
        }
        while (ap[i] === bp[i]) {
          i++;
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return document;
    };
    Sizzle.matches = function(expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function(elem, expr) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      expr = expr.replace(rattributeQuotes, "='$1']");
      if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {}
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    Sizzle.contains = function(context, elem) {
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }
      return contains(context, elem);
    };
    Sizzle.attr = function(elem, name) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()],
          val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };
    Sizzle.error = function(msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };
    Sizzle.uniqueSort = function(results) {
      var elem,
          duplicates = [],
          j = 0,
          i = 0;
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while ((elem = results[i++])) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      sortInput = null;
      return results;
    };
    getText = Sizzle.getText = function(elem) {
      var node,
          ret = "",
          i = 0,
          nodeType = elem.nodeType;
      if (!nodeType) {
        while ((node = elem[i++])) {
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        if (typeof elem.textContent === "string") {
          return elem.textContent;
        } else {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      return ret;
    };
    Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: true
        },
        " ": {dir: "parentNode"},
        "+": {
          dir: "previousSibling",
          first: true
        },
        "~": {dir: "previousSibling"}
      },
      preFilter: {
        "ATTR": function(match) {
          match[1] = match[1].replace(runescape, funescape);
          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
          if (match[2] === "~=") {
            match[3] = " " + match[3] + " ";
          }
          return match.slice(0, 4);
        },
        "CHILD": function(match) {
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === "nth") {
            if (!match[3]) {
              Sizzle.error(match[0]);
            }
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +((match[7] + match[8]) || match[3] === "odd");
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        "PSEUDO": function(match) {
          var excess,
              unquoted = !match[6] && match[2];
          if (matchExpr["CHILD"].test(match[0])) {
            return null;
          }
          if (match[3]) {
            match[2] = match[4] || match[5] || "";
          } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }
          return match.slice(0, 3);
        }
      },
      filter: {
        "TAG": function(nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function() {
            return true;
          } : function(elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        "CLASS": function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
          });
        },
        "ATTR": function(name, operator, check) {
          return function(elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === "!=";
            }
            if (!operator) {
              return true;
            }
            result += "";
            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
          };
        },
        "CHILD": function(type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
              forward = type.slice(-4) !== "last",
              ofType = what === "of-type";
          return first === 1 && last === 0 ? function(elem) {
            return !!elem.parentNode;
          } : function(elem, context, xml) {
            var cache,
                uniqueCache,
                outerCache,
                node,
                nodeIndex,
                start,
                dir = simple !== forward ? "nextSibling" : "previousSibling",
                parent = elem.parentNode,
                name = ofType && elem.nodeName.toLowerCase(),
                useCache = !xml && !ofType,
                diff = false;
            if (parent) {
              if (simple) {
                while (dir) {
                  node = elem;
                  while ((node = node[dir])) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  }
                  start = dir = type === "only" && !start && "nextSibling";
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              if (forward && useCache) {
                node = parent;
                outerCache = node[expando] || (node[expando] = {});
                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                cache = uniqueCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    uniqueCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                if (useCache) {
                  node = elem;
                  outerCache = node[expando] || (node[expando] = {});
                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                  cache = uniqueCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                }
                if (diff === false) {
                  while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {});
                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        uniqueCache[type] = [dirruns, diff];
                      }
                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || (diff % first === 0 && diff / first >= 0);
            }
          };
        },
        "PSEUDO": function(pseudo, argument) {
          var args,
              fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
          if (fn[expando]) {
            return fn(argument);
          }
          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
              var idx,
                  matched = fn(seed, argument),
                  i = matched.length;
              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function(elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        "not": markFunction(function(selector) {
          var input = [],
              results = [],
              matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
            var elem,
                unmatched = matcher(seed, null, xml, []),
                i = seed.length;
            while (i--) {
              if ((elem = unmatched[i])) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function(elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            input[0] = null;
            return !results.pop();
          };
        }),
        "has": markFunction(function(selector) {
          return function(elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        "contains": markFunction(function(text) {
          text = text.replace(runescape, funescape);
          return function(elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        "lang": markFunction(function(lang) {
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function(elem) {
            var elemLang;
            do {
              if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        "target": function(elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        "root": function(elem) {
          return elem === docElem;
        },
        "focus": function(elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        "enabled": function(elem) {
          return elem.disabled === false;
        },
        "disabled": function(elem) {
          return elem.disabled === true;
        },
        "checked": function(elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
        },
        "selected": function(elem) {
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        "empty": function(elem) {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        "parent": function(elem) {
          return !Expr.pseudos["empty"](elem);
        },
        "header": function(elem) {
          return rheader.test(elem.nodeName);
        },
        "input": function(elem) {
          return rinputs.test(elem.nodeName);
        },
        "button": function(elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button";
        },
        "text": function(elem) {
          var attr;
          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
        },
        "first": createPositionalPseudo(function() {
          return [0];
        }),
        "last": createPositionalPseudo(function(matchIndexes, length) {
          return [length - 1];
        }),
        "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        "even": createPositionalPseudo(function(matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "odd": createPositionalPseudo(function(matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; --i >= 0; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos["nth"] = Expr.pseudos["eq"];
    for (i in {
      radio: true,
      checkbox: true,
      file: true,
      password: true,
      image: true
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in {
      submit: true,
      reset: true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    tokenize = Sizzle.tokenize = function(selector, parseOnly) {
      var matched,
          match,
          tokens,
          type,
          soFar,
          groups,
          preFilters,
          cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push((tokens = []));
        }
        matched = false;
        if ((match = rcombinators.exec(soFar))) {
          matched = match.shift();
          tokens.push({
            value: matched,
            type: match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length);
        }
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    };
    function toSelector(tokens) {
      var i = 0,
          len = tokens.length,
          selector = "";
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
          checkNonElements = base && dir === "parentNode",
          doneName = done++;
      return combinator.first ? function(elem, context, xml) {
        while ((elem = elem[dir])) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }
      } : function(elem, context, xml) {
        var oldCache,
            uniqueCache,
            outerCache,
            newCache = [dirruns, doneName];
        if (xml) {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
              if ((oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                return (newCache[2] = oldCache[2]);
              } else {
                uniqueCache[dir] = newCache;
                if ((newCache[2] = matcher(elem, context, xml))) {
                  return true;
                }
              }
            }
          }
        }
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i = 0,
          len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem,
          newUnmatched = [],
          i = 0,
          len = unmatched.length,
          mapped = map != null;
      for (; i < len; i++) {
        if ((elem = unmatched[i])) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function(seed, results, context, xml) {
        var temp,
            i,
            elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,
            elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
            matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
            matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i = temp.length;
          while (i--) {
            if ((elem = temp[i])) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if ((elem = matcherOut[i])) {
                  temp.push((matcherIn[i] = elem));
                }
              }
              postFinder(null, (matcherOut = []), temp, xml);
            }
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext,
          matcher,
          j,
          len = tokens.length,
          leadingRelative = Expr.relative[tokens[0].type],
          implicitRelative = leadingRelative || Expr.relative[" "],
          i = leadingRelative ? 1 : 0,
          matchContext = addCombinator(function(elem) {
            return elem === checkContext;
          }, implicitRelative, true),
          matchAnyContext = addCombinator(function(elem) {
            return indexOf(checkContext, elem) > -1;
          }, implicitRelative, true),
          matchers = [function(elem, context, xml) {
            var ret = (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            checkContext = null;
            return ret;
          }];
      for (; i < len; i++) {
        if ((matcher = Expr.relative[tokens[i].type])) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          if (matcher[expando]) {
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({value: tokens[i - 2].type === " " ? "*" : ""})).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
          byElement = elementMatchers.length > 0,
          superMatcher = function(seed, context, xml, results, outermost) {
            var elem,
                j,
                matcher,
                matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                setMatched = [],
                contextBackup = outermostContext,
                elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                len = elems.length;
            if (outermost) {
              outermostContext = context === document || context || outermost;
            }
            for (; i !== len && (elem = elems[i]) != null; i++) {
              if (byElement && elem) {
                j = 0;
                if (!context && elem.ownerDocument !== document) {
                  setDocument(elem);
                  xml = !documentIsHTML;
                }
                while ((matcher = elementMatchers[j++])) {
                  if (matcher(elem, context || document, xml)) {
                    results.push(elem);
                    break;
                  }
                }
                if (outermost) {
                  dirruns = dirrunsUnique;
                }
              }
              if (bySet) {
                if ((elem = !matcher && elem)) {
                  matchedCount--;
                }
                if (seed) {
                  unmatched.push(elem);
                }
              }
            }
            matchedCount += i;
            if (bySet && i !== matchedCount) {
              j = 0;
              while ((matcher = setMatchers[j++])) {
                matcher(unmatched, setMatched, context, xml);
              }
              if (seed) {
                if (matchedCount > 0) {
                  while (i--) {
                    if (!(unmatched[i] || setMatched[i])) {
                      setMatched[i] = pop.call(results);
                    }
                  }
                }
                setMatched = condense(setMatched);
              }
              push.apply(results, setMatched);
              if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                Sizzle.uniqueSort(results);
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
              outermostContext = contextBackup;
            }
            return unmatched;
          };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function(selector, match) {
      var i,
          setMatchers = [],
          elementMatchers = [],
          cached = compilerCache[selector + " "];
      if (!cached) {
        if (!match) {
          match = tokenize(selector);
        }
        i = match.length;
        while (i--) {
          cached = matcherFromTokens(match[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
        cached.selector = selector;
      }
      return cached;
    };
    select = Sizzle.select = function(selector, context, results, seed) {
      var i,
          tokens,
          token,
          type,
          find,
          compiled = typeof selector === "function" && selector,
          match = !seed && tokenize((selector = compiled.selector || selector));
      results = results || [];
      if (match.length === 1) {
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
          if (!context) {
            return results;
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
        while (i--) {
          token = tokens[i];
          if (Expr.relative[(type = token.type)]) {
            break;
          }
          if ((find = Expr.find[type])) {
            if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }
      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    };
    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
    support.detectDuplicates = !!hasDuplicate;
    setDocument();
    support.sortDetached = assert(function(div1) {
      return div1.compareDocumentPosition(document.createElement("div")) & 1;
    });
    if (!assert(function(div) {
      div.innerHTML = "<a href='#'></a>";
      return div.firstChild.getAttribute("href") === "#";
    })) {
      addHandle("type|href|height|width", function(elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
        }
      });
    }
    if (!support.attributes || !assert(function(div) {
      div.innerHTML = "<input/>";
      div.firstChild.setAttribute("value", "");
      return div.firstChild.getAttribute("value") === "";
    })) {
      addHandle("value", function(elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === "input") {
          return elem.defaultValue;
        }
      });
    }
    if (!assert(function(div) {
      return div.getAttribute("disabled") == null;
    })) {
      addHandle(booleans, function(elem, name, isXML) {
        var val;
        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
      });
    }
    return Sizzle;
  })(window);
  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;
  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  var dir = function(elem, dir, until) {
    var matched = [],
        truncate = until !== undefined;
    while ((elem = elem[dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break;
        }
        matched.push(elem);
      }
    }
    return matched;
  };
  var siblings = function(n, elem) {
    var matched = [];
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }
    return matched;
  };
  var rneedsContext = jQuery.expr.match.needsContext;
  var rsingleTag = (/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/);
  var risSimple = /^.[^:#\[\.,]*$/;
  function winnow(elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function(elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function(elem) {
        return (elem === qualifier) !== not;
      });
    }
    if (typeof qualifier === "string") {
      if (risSimple.test(qualifier)) {
        return jQuery.filter(qualifier, elements, not);
      }
      qualifier = jQuery.filter(qualifier, elements);
    }
    return jQuery.grep(elements, function(elem) {
      return (indexOf.call(qualifier, elem) > -1) !== not;
    });
  }
  jQuery.filter = function(expr, elems, not) {
    var elem = elems[0];
    if (not) {
      expr = ":not(" + expr + ")";
    }
    return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
      return elem.nodeType === 1;
    }));
  };
  jQuery.fn.extend({
    find: function(selector) {
      var i,
          len = this.length,
          ret = [],
          self = this;
      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function() {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }
      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
      ret.selector = this.selector ? this.selector + " " + selector : selector;
      return ret;
    },
    filter: function(selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function(selector) {
      return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    }
  });
  var rootjQuery,
      rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      init = jQuery.fn.init = function(selector, context, root) {
        var match,
            elem;
        if (!selector) {
          return this;
        }
        root = root || rootjQuery;
        if (typeof selector === "string") {
          if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
            match = [null, selector, null];
          } else {
            match = rquickExpr.exec(selector);
          }
          if (match && (match[1] || !context)) {
            if (match[1]) {
              context = context instanceof jQuery ? context[0] : context;
              jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
              if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                for (match in context) {
                  if (jQuery.isFunction(this[match])) {
                    this[match](context[match]);
                  } else {
                    this.attr(match, context[match]);
                  }
                }
              }
              return this;
            } else {
              elem = document.getElementById(match[2]);
              if (elem && elem.parentNode) {
                this.length = 1;
                this[0] = elem;
              }
              this.context = document;
              this.selector = selector;
              return this;
            }
          } else if (!context || context.jquery) {
            return (context || root).find(selector);
          } else {
            return this.constructor(context).find(selector);
          }
        } else if (selector.nodeType) {
          this.context = this[0] = selector;
          this.length = 1;
          return this;
        } else if (jQuery.isFunction(selector)) {
          return root.ready !== undefined ? root.ready(selector) : selector(jQuery);
        }
        if (selector.selector !== undefined) {
          this.selector = selector.selector;
          this.context = selector.context;
        }
        return jQuery.makeArray(selector, this);
      };
  init.prototype = jQuery.fn;
  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
      guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
      };
  jQuery.fn.extend({
    has: function(target) {
      var targets = jQuery(target, this),
          l = targets.length;
      return this.filter(function() {
        var i = 0;
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function(selectors, context) {
      var cur,
          i = 0,
          l = this.length,
          matched = [],
          pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
      for (; i < l; i++) {
        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
          if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
            matched.push(cur);
            break;
          }
        }
      }
      return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
    },
    index: function(elem) {
      if (!elem) {
        return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
      }
      if (typeof elem === "string") {
        return indexOf.call(jQuery(elem), this[0]);
      }
      return indexOf.call(this, elem.jquery ? elem[0] : elem);
    },
    add: function(selector, context) {
      return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
    },
    addBack: function(selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur;
  }
  jQuery.each({
    parent: function(elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function(elem) {
      return dir(elem, "parentNode");
    },
    parentsUntil: function(elem, i, until) {
      return dir(elem, "parentNode", until);
    },
    next: function(elem) {
      return sibling(elem, "nextSibling");
    },
    prev: function(elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll: function(elem) {
      return dir(elem, "nextSibling");
    },
    prevAll: function(elem) {
      return dir(elem, "previousSibling");
    },
    nextUntil: function(elem, i, until) {
      return dir(elem, "nextSibling", until);
    },
    prevUntil: function(elem, i, until) {
      return dir(elem, "previousSibling", until);
    },
    siblings: function(elem) {
      return siblings((elem.parentNode || {}).firstChild, elem);
    },
    children: function(elem) {
      return siblings(elem.firstChild);
    },
    contents: function(elem) {
      return elem.contentDocument || jQuery.merge([], elem.childNodes);
    }
  }, function(name, fn) {
    jQuery.fn[name] = function(until, selector) {
      var matched = jQuery.map(this, fn, until);
      if (name.slice(-5) !== "Until") {
        selector = until;
      }
      if (selector && typeof selector === "string") {
        matched = jQuery.filter(selector, matched);
      }
      if (this.length > 1) {
        if (!guaranteedUnique[name]) {
          jQuery.uniqueSort(matched);
        }
        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }
      return this.pushStack(matched);
    };
  });
  var rnotwhite = (/\S+/g);
  function createOptions(options) {
    var object = {};
    jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
      object[flag] = true;
    });
    return object;
  }
  jQuery.Callbacks = function(options) {
    options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
    var firing,
        memory,
        fired,
        locked,
        list = [],
        queue = [],
        firingIndex = -1,
        fire = function() {
          locked = options.once;
          fired = firing = true;
          for (; queue.length; firingIndex = -1) {
            memory = queue.shift();
            while (++firingIndex < list.length) {
              if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                firingIndex = list.length;
                memory = false;
              }
            }
          }
          if (!options.memory) {
            memory = false;
          }
          firing = false;
          if (locked) {
            if (memory) {
              list = [];
            } else {
              list = "";
            }
          }
        },
        self = {
          add: function() {
            if (list) {
              if (memory && !firing) {
                firingIndex = list.length - 1;
                queue.push(memory);
              }
              (function add(args) {
                jQuery.each(args, function(_, arg) {
                  if (jQuery.isFunction(arg)) {
                    if (!options.unique || !self.has(arg)) {
                      list.push(arg);
                    }
                  } else if (arg && arg.length && jQuery.type(arg) !== "string") {
                    add(arg);
                  }
                });
              })(arguments);
              if (memory && !firing) {
                fire();
              }
            }
            return this;
          },
          remove: function() {
            jQuery.each(arguments, function(_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (index <= firingIndex) {
                  firingIndex--;
                }
              }
            });
            return this;
          },
          has: function(fn) {
            return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
          },
          empty: function() {
            if (list) {
              list = [];
            }
            return this;
          },
          disable: function() {
            locked = queue = [];
            list = memory = "";
            return this;
          },
          disabled: function() {
            return !list;
          },
          lock: function() {
            locked = queue = [];
            if (!memory) {
              list = memory = "";
            }
            return this;
          },
          locked: function() {
            return !!locked;
          },
          fireWith: function(context, args) {
            if (!locked) {
              args = args || [];
              args = [context, args.slice ? args.slice() : args];
              queue.push(args);
              if (!firing) {
                fire();
              }
            }
            return this;
          },
          fire: function() {
            self.fireWith(this, arguments);
            return this;
          },
          fired: function() {
            return !!fired;
          }
        };
    return self;
  };
  jQuery.extend({
    Deferred: function(func) {
      var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
          state = "pending",
          promise = {
            state: function() {
              return state;
            },
            always: function() {
              deferred.done(arguments).fail(arguments);
              return this;
            },
            then: function() {
              var fns = arguments;
              return jQuery.Deferred(function(newDefer) {
                jQuery.each(tuples, function(i, tuple) {
                  var fn = jQuery.isFunction(fns[i]) && fns[i];
                  deferred[tuple[1]](function() {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && jQuery.isFunction(returned.promise)) {
                      returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                    } else {
                      newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                    }
                  });
                });
                fns = null;
              }).promise();
            },
            promise: function(obj) {
              return obj != null ? jQuery.extend(obj, promise) : promise;
            }
          },
          deferred = {};
      promise.pipe = promise.then;
      jQuery.each(tuples, function(i, tuple) {
        var list = tuple[2],
            stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function() {
            state = stateString;
          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }
        deferred[tuple[0]] = function() {
          deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
          return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred);
      }
      return deferred;
    },
    when: function(subordinate) {
      var i = 0,
          resolveValues = slice.call(arguments),
          length = resolveValues.length,
          remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
          deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
          updateFunc = function(i, contexts, values) {
            return function(value) {
              contexts[i] = this;
              values[i] = arguments.length > 1 ? slice.call(arguments) : value;
              if (values === progressValues) {
                deferred.notifyWith(contexts, values);
              } else if (!(--remaining)) {
                deferred.resolveWith(contexts, values);
              }
            };
          },
          progressValues,
          progressContexts,
          resolveContexts;
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject);
          } else {
            --remaining;
          }
        }
      }
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues);
      }
      return deferred.promise();
    }
  });
  var readyList;
  jQuery.fn.ready = function(fn) {
    jQuery.ready.promise().done(fn);
    return this;
  };
  jQuery.extend({
    isReady: false,
    readyWait: 1,
    holdReady: function(hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready: function(wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }
      jQuery.isReady = true;
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }
      readyList.resolveWith(document, [jQuery]);
      if (jQuery.fn.triggerHandler) {
        jQuery(document).triggerHandler("ready");
        jQuery(document).off("ready");
      }
    }
  });
  function completed() {
    document.removeEventListener("DOMContentLoaded", completed);
    window.removeEventListener("load", completed);
    jQuery.ready();
  }
  jQuery.ready.promise = function(obj) {
    if (!readyList) {
      readyList = jQuery.Deferred();
      if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
        window.setTimeout(jQuery.ready);
      } else {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
      }
    }
    return readyList.promise(obj);
  };
  jQuery.ready.promise();
  var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
        len = elems.length,
        bulk = key == null;
    if (jQuery.type(key) === "object") {
      chainable = true;
      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      }
    } else if (value !== undefined) {
      chainable = true;
      if (!jQuery.isFunction(value)) {
        raw = true;
      }
      if (bulk) {
        if (raw) {
          fn.call(elems, value);
          fn = null;
        } else {
          bulk = fn;
          fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }
      if (fn) {
        for (; i < len; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }
    return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
  };
  var acceptData = function(owner) {
    return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
  };
  function Data() {
    this.expando = jQuery.expando + Data.uid++;
  }
  Data.uid = 1;
  Data.prototype = {
    register: function(owner, initial) {
      var value = initial || {};
      if (owner.nodeType) {
        owner[this.expando] = value;
      } else {
        Object.defineProperty(owner, this.expando, {
          value: value,
          writable: true,
          configurable: true
        });
      }
      return owner[this.expando];
    },
    cache: function(owner) {
      if (!acceptData(owner)) {
        return {};
      }
      var value = owner[this.expando];
      if (!value) {
        value = {};
        if (acceptData(owner)) {
          if (owner.nodeType) {
            owner[this.expando] = value;
          } else {
            Object.defineProperty(owner, this.expando, {
              value: value,
              configurable: true
            });
          }
        }
      }
      return value;
    },
    set: function(owner, data, value) {
      var prop,
          cache = this.cache(owner);
      if (typeof data === "string") {
        cache[data] = value;
      } else {
        for (prop in data) {
          cache[prop] = data[prop];
        }
      }
      return cache;
    },
    get: function(owner, key) {
      return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][key];
    },
    access: function(owner, key, value) {
      var stored;
      if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
        stored = this.get(owner, key);
        return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
      }
      this.set(owner, key, value);
      return value !== undefined ? value : key;
    },
    remove: function(owner, key) {
      var i,
          name,
          camel,
          cache = owner[this.expando];
      if (cache === undefined) {
        return;
      }
      if (key === undefined) {
        this.register(owner);
      } else {
        if (jQuery.isArray(key)) {
          name = key.concat(key.map(jQuery.camelCase));
        } else {
          camel = jQuery.camelCase(key);
          if (key in cache) {
            name = [key, camel];
          } else {
            name = camel;
            name = name in cache ? [name] : (name.match(rnotwhite) || []);
          }
        }
        i = name.length;
        while (i--) {
          delete cache[name[i]];
        }
      }
      if (key === undefined || jQuery.isEmptyObject(cache)) {
        if (owner.nodeType) {
          owner[this.expando] = undefined;
        } else {
          delete owner[this.expando];
        }
      }
    },
    hasData: function(owner) {
      var cache = owner[this.expando];
      return cache !== undefined && !jQuery.isEmptyObject(cache);
    }
  };
  var dataPriv = new Data();
  var dataUser = new Data();
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      rmultiDash = /[A-Z]/g;
  function dataAttr(elem, key, data) {
    var name;
    if (data === undefined && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === "string") {
        try {
          data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
        } catch (e) {}
        dataUser.set(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }
  jQuery.extend({
    hasData: function(elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem);
    },
    data: function(elem, name, data) {
      return dataUser.access(elem, name, data);
    },
    removeData: function(elem, name) {
      dataUser.remove(elem, name);
    },
    _data: function(elem, name, data) {
      return dataPriv.access(elem, name, data);
    },
    _removeData: function(elem, name) {
      dataPriv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    data: function(key, value) {
      var i,
          name,
          data,
          elem = this[0],
          attrs = elem && elem.attributes;
      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem);
          if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
            i = attrs.length;
            while (i--) {
              if (attrs[i]) {
                name = attrs[i].name;
                if (name.indexOf("data-") === 0) {
                  name = jQuery.camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }
            dataPriv.set(elem, "hasDataAttrs", true);
          }
        }
        return data;
      }
      if (typeof key === "object") {
        return this.each(function() {
          dataUser.set(this, key);
        });
      }
      return access(this, function(value) {
        var data,
            camelKey;
        if (elem && value === undefined) {
          data = dataUser.get(elem, key) || dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase());
          if (data !== undefined) {
            return data;
          }
          camelKey = jQuery.camelCase(key);
          data = dataUser.get(elem, camelKey);
          if (data !== undefined) {
            return data;
          }
          data = dataAttr(elem, camelKey, undefined);
          if (data !== undefined) {
            return data;
          }
          return;
        }
        camelKey = jQuery.camelCase(key);
        this.each(function() {
          var data = dataUser.get(this, camelKey);
          dataUser.set(this, camelKey, value);
          if (key.indexOf("-") > -1 && data !== undefined) {
            dataUser.set(this, key, value);
          }
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function(key) {
      return this.each(function() {
        dataUser.remove(this, key);
      });
    }
  });
  jQuery.extend({
    queue: function(elem, type, data) {
      var queue;
      if (elem) {
        type = (type || "fx") + "queue";
        queue = dataPriv.get(elem, type);
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type),
          startLength = queue.length,
          fn = queue.shift(),
          hooks = jQuery._queueHooks(elem, type),
          next = function() {
            jQuery.dequeue(elem, type);
          };
      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        if (type === "fx") {
          queue.unshift("inprogress");
        }
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    _queueHooks: function(elem, type) {
      var key = type + "queueHooks";
      return dataPriv.get(elem, key) || dataPriv.access(elem, key, {empty: jQuery.Callbacks("once memory").add(function() {
          dataPriv.remove(elem, [type + "queue", key]);
        })});
    }
  });
  jQuery.fn.extend({
    queue: function(type, data) {
      var setter = 2;
      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined ? this : this.each(function() {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function(type) {
      return this.each(function() {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function(type) {
      return this.queue(type || "fx", []);
    },
    promise: function(type, obj) {
      var tmp,
          count = 1,
          defer = jQuery.Deferred(),
          elements = this,
          i = this.length,
          resolve = function() {
            if (!(--count)) {
              defer.resolveWith(elements, [elements]);
            }
          };
      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }
      type = type || "fx";
      while (i--) {
        tmp = dataPriv.get(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
  var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var isHidden = function(elem, el) {
    elem = el || elem;
    return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
  };
  function adjustCSS(elem, prop, valueParts, tween) {
    var adjusted,
        scale = 1,
        maxIterations = 20,
        currentValue = tween ? function() {
          return tween.cur();
        } : function() {
          return jQuery.css(elem, prop, "");
        },
        initial = currentValue(),
        unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
        initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
    if (initialInUnit && initialInUnit[3] !== unit) {
      unit = unit || initialInUnit[3];
      valueParts = valueParts || [];
      initialInUnit = +initial || 1;
      do {
        scale = scale || ".5";
        initialInUnit = initialInUnit / scale;
        jQuery.style(elem, prop, initialInUnit + unit);
      } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
    }
    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0;
      adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted;
      }
    }
    return adjusted;
  }
  var rcheckableType = (/^(?:checkbox|radio)$/i);
  var rtagName = (/<([\w:-]+)/);
  var rscriptType = (/^$|\/(?:java|ecma)script/i);
  var wrapMap = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  function getAll(context, tag) {
    var ret = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : [];
    return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
  }
  function setGlobalEval(elems, refElements) {
    var i = 0,
        l = elems.length;
    for (; i < l; i++) {
      dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
    }
  }
  var rhtml = /<|&#?\w+;/;
  function buildFragment(elems, context, scripts, selection, ignored) {
    var elem,
        tmp,
        tag,
        wrap,
        contains,
        j,
        fragment = context.createDocumentFragment(),
        nodes = [],
        i = 0,
        l = elems.length;
    for (; i < l; i++) {
      elem = elems[i];
      if (elem || elem === 0) {
        if (jQuery.type(elem) === "object") {
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem));
        } else {
          tmp = tmp || fragment.appendChild(context.createElement("div"));
          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
          j = wrap[0];
          while (j--) {
            tmp = tmp.lastChild;
          }
          jQuery.merge(nodes, tmp.childNodes);
          tmp = fragment.firstChild;
          tmp.textContent = "";
        }
      }
    }
    fragment.textContent = "";
    i = 0;
    while ((elem = nodes[i++])) {
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem);
        }
        continue;
      }
      contains = jQuery.contains(elem.ownerDocument, elem);
      tmp = getAll(fragment.appendChild(elem), "script");
      if (contains) {
        setGlobalEval(tmp);
      }
      if (scripts) {
        j = 0;
        while ((elem = tmp[j++])) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem);
          }
        }
      }
    }
    return fragment;
  }
  (function() {
    var fragment = document.createDocumentFragment(),
        div = fragment.appendChild(document.createElement("div")),
        input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input);
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
  })();
  var rkeyEvent = /^key/,
      rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }
  function on(elem, types, selector, data, fn, one) {
    var origFn,
        type;
    if (typeof types === "object") {
      if (typeof selector !== "string") {
        data = data || selector;
        selector = undefined;
      }
      for (type in types) {
        on(elem, type, selector, data, types[type], one);
      }
      return elem;
    }
    if (data == null && fn == null) {
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === "string") {
        fn = data;
        data = undefined;
      } else {
        fn = data;
        data = selector;
        selector = undefined;
      }
    }
    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return elem;
    }
    if (one === 1) {
      origFn = fn;
      fn = function(event) {
        jQuery().off(event);
        return origFn.apply(this, arguments);
      };
      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }
    return elem.each(function() {
      jQuery.event.add(this, types, fn, data, selector);
    });
  }
  jQuery.event = {
    global: {},
    add: function(elem, types, handler, data, selector) {
      var handleObjIn,
          eventHandle,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.get(elem);
      if (!elemData) {
        return;
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }
      if (!(events = elemData.events)) {
        events = elemData.events = {};
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function(e) {
          return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
        };
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery.event.special[type] || {};
        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn);
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }
        jQuery.event.global[type] = true;
      }
    },
    remove: function(elem, types, handler, selector, mappedTypes) {
      var j,
          origCount,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }
        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }
      if (jQuery.isEmptyObject(events)) {
        dataPriv.remove(elem, "handle events");
      }
    },
    dispatch: function(event) {
      event = jQuery.event.fix(event);
      var i,
          j,
          ret,
          matched,
          handleObj,
          handlerQueue = [],
          args = slice.call(arguments),
          handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
          special = jQuery.event.special[event.type] || {};
      args[0] = event;
      event.delegateTarget = this;
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    handlers: function(event, handlers) {
      var i,
          matches,
          sel,
          handleObj,
          handlerQueue = [],
          delegateCount = handlers.delegateCount,
          cur = event.target;
      if (delegateCount && cur.nodeType && (event.type !== "click" || isNaN(event.button) || event.button < 1)) {
        for (; cur !== this; cur = cur.parentNode || this) {
          if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
            matches = [];
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector + " ";
              if (matches[sel] === undefined) {
                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
              }
              if (matches[sel]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matches
              });
            }
          }
        }
      }
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: this,
          handlers: handlers.slice(delegateCount)
        });
      }
      return handlerQueue;
    },
    props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(event, original) {
        if (event.which == null) {
          event.which = original.charCode != null ? original.charCode : original.keyCode;
        }
        return event;
      }
    },
    mouseHooks: {
      props: ("button buttons clientX clientY offsetX offsetY pageX pageY " + "screenX screenY toElement").split(" "),
      filter: function(event, original) {
        var eventDoc,
            doc,
            body,
            button = original.button;
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }
        if (!event.which && button !== undefined) {
          event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
        }
        return event;
      }
    },
    fix: function(event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i,
          prop,
          copy,
          type = event.type,
          originalEvent = event,
          fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      while (i--) {
        prop = copy[i];
        event[prop] = originalEvent[prop];
      }
      if (!event.target) {
        event.target = document;
      }
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode;
      }
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    special: {
      load: {noBubble: true},
      focus: {
        trigger: function() {
          if (this !== safeActiveElement() && this.focus) {
            this.focus();
            return false;
          }
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false;
          }
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
            this.click();
            return false;
          }
        },
        _default: function(event) {
          return jQuery.nodeName(event.target, "a");
        }
      },
      beforeunload: {postDispatch: function(event) {
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }}
    }
  };
  jQuery.removeEvent = function(elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };
  jQuery.Event = function(src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
    } else {
      this.type = src;
    }
    if (props) {
      jQuery.extend(this, props);
    }
    this.timeStamp = src && src.timeStamp || jQuery.now();
    this[jQuery.expando] = true;
  };
  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    isSimulated: false,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (e && !this.isSimulated) {
        e.preventDefault();
      }
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (e && !this.isSimulated) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;
      if (e && !this.isSimulated) {
        e.stopImmediatePropagation();
      }
      this.stopPropagation();
    }
  };
  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function(event) {
        var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj;
        if (!related || (related !== target && !jQuery.contains(target, related))) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });
  jQuery.fn.extend({
    on: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn);
    },
    one: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn, 1);
    },
    off: function(types, selector, fn) {
      var handleObj,
          type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }
      if (typeof types === "object") {
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === "function") {
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function() {
        jQuery.event.remove(this, types, fn, selector);
      });
    }
  });
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
      rnoInnerhtml = /<script|<style|<link/i,
      rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
      rscriptTypeMasked = /^true\/(.*)/,
      rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
  }
  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem;
  }
  function restoreScript(elem) {
    var match = rscriptTypeMasked.exec(elem.type);
    if (match) {
      elem.type = match[1];
    } else {
      elem.removeAttribute("type");
    }
    return elem;
  }
  function cloneCopyEvent(src, dest) {
    var i,
        l,
        type,
        pdataOld,
        pdataCur,
        udataOld,
        udataCur,
        events;
    if (dest.nodeType !== 1) {
      return;
    }
    if (dataPriv.hasData(src)) {
      pdataOld = dataPriv.access(src);
      pdataCur = dataPriv.set(dest, pdataOld);
      events = pdataOld.events;
      if (events) {
        delete pdataCur.handle;
        pdataCur.events = {};
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    }
    if (dataUser.hasData(src)) {
      udataOld = dataUser.access(src);
      udataCur = jQuery.extend({}, udataOld);
      dataUser.set(dest, udataCur);
    }
  }
  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();
    if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked;
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }
  function domManip(collection, args, callback, ignored) {
    args = concat.apply([], args);
    var fragment,
        first,
        scripts,
        hasScripts,
        node,
        doc,
        i = 0,
        l = collection.length,
        iNoClone = l - 1,
        value = args[0],
        isFunction = jQuery.isFunction(value);
    if (isFunction || (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
      return collection.each(function(index) {
        var self = collection.eq(index);
        if (isFunction) {
          args[0] = value.call(this, index, self.html());
        }
        domManip(self, args, callback, ignored);
      });
    }
    if (l) {
      fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
      first = fragment.firstChild;
      if (fragment.childNodes.length === 1) {
        fragment = first;
      }
      if (first || ignored) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length;
        for (; i < l; i++) {
          node = fragment;
          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true);
            if (hasScripts) {
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }
          callback.call(collection[i], node, i);
        }
        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument;
          jQuery.map(scripts, restoreScript);
          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];
            if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
              if (node.src) {
                if (jQuery._evalUrl) {
                  jQuery._evalUrl(node.src);
                }
              } else {
                jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
              }
            }
          }
        }
      }
    }
    return collection;
  }
  function remove(elem, selector, keepData) {
    var node,
        nodes = selector ? jQuery.filter(selector, elem) : elem,
        i = 0;
    for (; (node = nodes[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery.cleanData(getAll(node));
      }
      if (node.parentNode) {
        if (keepData && jQuery.contains(node.ownerDocument, node)) {
          setGlobalEval(getAll(node, "script"));
        }
        node.parentNode.removeChild(node);
      }
    }
    return elem;
  }
  jQuery.extend({
    htmlPrefilter: function(html) {
      return html.replace(rxhtmlTag, "<$1></$2>");
    },
    clone: function(elem, dataAndEvents, deepDataAndEvents) {
      var i,
          l,
          srcElements,
          destElements,
          clone = elem.cloneNode(true),
          inPage = jQuery.contains(elem.ownerDocument, elem);
      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      destElements = getAll(clone, "script");
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      }
      return clone;
    },
    cleanData: function(elems) {
      var data,
          elem,
          type,
          special = jQuery.event.special,
          i = 0;
      for (; (elem = elems[i]) !== undefined; i++) {
        if (acceptData(elem)) {
          if ((data = elem[dataPriv.expando])) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }
            elem[dataPriv.expando] = undefined;
          }
          if (elem[dataUser.expando]) {
            elem[dataUser.expando] = undefined;
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    domManip: domManip,
    detach: function(selector) {
      return remove(this, selector, true);
    },
    remove: function(selector) {
      return remove(this, selector);
    },
    text: function(value) {
      return access(this, function(value) {
        return value === undefined ? jQuery.text(this) : this.empty().each(function() {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            this.textContent = value;
          }
        });
      }, null, value, arguments.length);
    },
    append: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    empty: function() {
      var elem,
          i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem, false));
          elem.textContent = "";
        }
      }
      return this;
    },
    clone: function(dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function() {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function(value) {
      return access(this, function(value) {
        var elem = this[0] || {},
            i = 0,
            l = this.length;
        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        }
        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
          value = jQuery.htmlPrefilter(value);
          try {
            for (; i < l; i++) {
              elem = this[i] || {};
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }
            elem = 0;
          } catch (e) {}
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function() {
      var ignored = [];
      return domManip(this, arguments, function(elem) {
        var parent = this.parentNode;
        if (jQuery.inArray(this, ignored) < 0) {
          jQuery.cleanData(getAll(this));
          if (parent) {
            parent.replaceChild(elem, this);
          }
        }
      }, ignored);
    }
  });
  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(name, original) {
    jQuery.fn[name] = function(selector) {
      var elems,
          ret = [],
          insert = jQuery(selector),
          last = insert.length - 1,
          i = 0;
      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);
        push.apply(ret, elems.get());
      }
      return this.pushStack(ret);
    };
  });
  var iframe,
      elemdisplay = {
        HTML: "block",
        BODY: "block"
      };
  function actualDisplay(name, doc) {
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
        display = jQuery.css(elem[0], "display");
    elem.detach();
    return display;
  }
  function defaultDisplay(nodeName) {
    var doc = document,
        display = elemdisplay[nodeName];
    if (!display) {
      display = actualDisplay(nodeName, doc);
      if (display === "none" || !display) {
        iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
        doc = iframe[0].contentDocument;
        doc.write();
        doc.close();
        display = actualDisplay(nodeName, doc);
        iframe.detach();
      }
      elemdisplay[nodeName] = display;
    }
    return display;
  }
  var rmargin = (/^margin/);
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
  var getStyles = function(elem) {
    var view = elem.ownerDocument.defaultView;
    if (!view || !view.opener) {
      view = window;
    }
    return view.getComputedStyle(elem);
  };
  var swap = function(elem, options, callback, args) {
    var ret,
        name,
        old = {};
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }
    ret = callback.apply(elem, args || []);
    for (name in options) {
      elem.style[name] = old[name];
    }
    return ret;
  };
  var documentElement = document.documentElement;
  (function() {
    var pixelPositionVal,
        boxSizingReliableVal,
        pixelMarginRightVal,
        reliableMarginLeftVal,
        container = document.createElement("div"),
        div = document.createElement("div");
    if (!div.style) {
      return;
    }
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
    container.appendChild(div);
    function computeStyleTests() {
      div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
      div.innerHTML = "";
      documentElement.appendChild(container);
      var divStyle = window.getComputedStyle(div);
      pixelPositionVal = divStyle.top !== "1%";
      reliableMarginLeftVal = divStyle.marginLeft === "2px";
      boxSizingReliableVal = divStyle.width === "4px";
      div.style.marginRight = "50%";
      pixelMarginRightVal = divStyle.marginRight === "4px";
      documentElement.removeChild(container);
    }
    jQuery.extend(support, {
      pixelPosition: function() {
        computeStyleTests();
        return pixelPositionVal;
      },
      boxSizingReliable: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return boxSizingReliableVal;
      },
      pixelMarginRight: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return pixelMarginRightVal;
      },
      reliableMarginLeft: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return reliableMarginLeftVal;
      },
      reliableMarginRight: function() {
        var ret,
            marginDiv = div.appendChild(document.createElement("div"));
        marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;" + "display:block;margin:0;border:0;padding:0";
        marginDiv.style.marginRight = marginDiv.style.width = "0";
        div.style.width = "1px";
        documentElement.appendChild(container);
        ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight);
        documentElement.removeChild(container);
        div.removeChild(marginDiv);
        return ret;
      }
    });
  })();
  function curCSS(elem, name, computed) {
    var width,
        minWidth,
        maxWidth,
        ret,
        style = elem.style;
    computed = computed || getStyles(elem);
    ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;
    if ((ret === "" || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
      ret = jQuery.style(elem, name);
    }
    if (computed) {
      if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }
    return ret !== undefined ? ret + "" : ret;
  }
  function addGetHookIf(conditionFn, hookFn) {
    return {get: function() {
        if (conditionFn()) {
          delete this.get;
          return;
        }
        return (this.get = hookFn).apply(this, arguments);
      }};
  }
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
      cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
      },
      cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
      },
      cssPrefixes = ["Webkit", "O", "Moz", "ms"],
      emptyStyle = document.createElement("div").style;
  function vendorPropName(name) {
    if (name in emptyStyle) {
      return name;
    }
    var capName = name[0].toUpperCase() + name.slice(1),
        i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in emptyStyle) {
        return name;
      }
    }
  }
  function setPositiveNumber(elem, value, subtract) {
    var matches = rcssNum.exec(value);
    return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
        val = 0;
    for (; i < 4; i += 2) {
      if (extra === "margin") {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        if (extra === "content") {
          val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }
        if (extra !== "margin") {
          val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      } else {
        val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        if (extra !== "padding") {
          val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    var valueIsBorderBox = true,
        val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
        styles = getStyles(elem),
        isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
    if (val <= 0 || val == null) {
      val = curCSS(elem, name, styles);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }
      if (rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
      val = parseFloat(val) || 0;
    }
    return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
  }
  function showHide(elements, show) {
    var display,
        elem,
        hidden,
        values = [],
        index = 0,
        length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      values[index] = dataPriv.get(elem, "olddisplay");
      display = elem.style.display;
      if (show) {
        if (!values[index] && display === "none") {
          elem.style.display = "";
        }
        if (elem.style.display === "" && isHidden(elem)) {
          values[index] = dataPriv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
        }
      } else {
        hidden = isHidden(elem);
        if (display !== "none" || !hidden) {
          dataPriv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
        }
      }
    }
    for (index = 0; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      if (!show || elem.style.display === "none" || elem.style.display === "") {
        elem.style.display = show ? values[index] || "" : "none";
      }
    }
    return elements;
  }
  jQuery.extend({
    cssHooks: {opacity: {get: function(elem, computed) {
          if (computed) {
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }}},
    cssNumber: {
      "animationIterationCount": true,
      "columnCount": true,
      "fillOpacity": true,
      "flexGrow": true,
      "flexShrink": true,
      "fontWeight": true,
      "lineHeight": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "widows": true,
      "zIndex": true,
      "zoom": true
    },
    cssProps: {"float": "cssFloat"},
    style: function(elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }
      var ret,
          type,
          hooks,
          origName = jQuery.camelCase(name),
          style = elem.style;
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (value !== undefined) {
        type = typeof value;
        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret);
          type = "number";
        }
        if (value == null || value !== value) {
          return;
        }
        if (type === "number") {
          value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
        }
        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit";
        }
        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          style[name] = value;
        }
      } else {
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        }
        return style[name];
      }
    },
    css: function(elem, name, extra, styles) {
      var val,
          num,
          hooks,
          origName = jQuery.camelCase(name);
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      }
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }
      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }
      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val;
      }
      return val;
    }
  });
  jQuery.each(["height", "width"], function(i, name) {
    jQuery.cssHooks[name] = {
      get: function(elem, computed, extra) {
        if (computed) {
          return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? swap(elem, cssShow, function() {
            return getWidthOrHeight(elem, name, extra);
          }) : getWidthOrHeight(elem, name, extra);
        }
      },
      set: function(elem, value, extra) {
        var matches,
            styles = extra && getStyles(elem),
            subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);
        if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
          elem.style[name] = value;
          value = jQuery.css(elem, name);
        }
        return setPositiveNumber(elem, value, subtract);
      }
    };
  });
  jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
    if (computed) {
      return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {marginLeft: 0}, function() {
        return elem.getBoundingClientRect().left;
      })) + "px";
    }
  });
  jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
    if (computed) {
      return swap(elem, {"display": "inline-block"}, curCSS, [elem, "marginRight"]);
    }
  });
  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {expand: function(value) {
        var i = 0,
            expanded = {},
            parts = typeof value === "string" ? value.split(" ") : [value];
        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }};
    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    css: function(name, value) {
      return access(this, function(elem, name, value) {
        var styles,
            len,
            map = {},
            i = 0;
        if (jQuery.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;
          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show: function() {
      return showHide(this, true);
    },
    hide: function() {
      return showHide(this);
    },
    toggle: function(state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }
      return this.each(function() {
        if (isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function(elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || jQuery.easing._default;
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur: function() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function(percent) {
      var eased,
          hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {_default: {
      get: function(tween) {
        var result;
        if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
          return tween.elem[tween.prop];
        }
        result = jQuery.css(tween.elem, tween.prop, "");
        return !result || result === "auto" ? 0 : result;
      },
      set: function(tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }};
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {set: function(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }};
  jQuery.easing = {
    linear: function(p) {
      return p;
    },
    swing: function(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    _default: "swing"
  };
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.step = {};
  var fxNow,
      timerId,
      rfxtypes = /^(?:toggle|show|hide)$/,
      rrun = /queueHooks$/;
  function createFxNow() {
    window.setTimeout(function() {
      fxNow = undefined;
    });
    return (fxNow = jQuery.now());
  }
  function genFx(type, includeWidth) {
    var which,
        i = 0,
        attrs = {height: type};
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  function createTween(value, prop, animation) {
    var tween,
        collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
        index = 0,
        length = collection.length;
    for (; index < length; index++) {
      if ((tween = collection[index].call(animation, prop, value))) {
        return tween;
      }
    }
  }
  function defaultPrefilter(elem, props, opts) {
    var prop,
        value,
        toggle,
        tween,
        hooks,
        oldfire,
        display,
        checkDisplay,
        anim = this,
        orig = {},
        style = elem.style,
        hidden = elem.nodeType && isHidden(elem),
        dataShow = dataPriv.get(elem, "fxshow");
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function() {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function() {
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
      display = jQuery.css(elem, "display");
      checkDisplay = display === "none" ? dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
      if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
        style.display = "inline-block";
      }
    }
    if (opts.overflow) {
      style.overflow = "hidden";
      anim.always(function() {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.exec(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";
        if (value === (hidden ? "hide" : "show")) {
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true;
          } else {
            continue;
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      } else {
        display = undefined;
      }
    }
    if (!jQuery.isEmptyObject(orig)) {
      if (dataShow) {
        if ("hidden" in dataShow) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = dataPriv.access(elem, "fxshow", {});
      }
      if (toggle) {
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function() {
          jQuery(elem).hide();
        });
      }
      anim.done(function() {
        var prop;
        dataPriv.remove(elem, "fxshow");
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            tween.start = prop === "width" || prop === "height" ? 1 : 0;
          }
        }
      }
    } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
      style.display = display;
    }
  }
  function propFilter(props, specialEasing) {
    var index,
        name,
        easing,
        value,
        hooks;
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  function Animation(elem, properties, options) {
    var result,
        stopped,
        index = 0,
        length = Animation.prefilters.length,
        deferred = jQuery.Deferred().always(function() {
          delete tick.elem;
        }),
        tick = function() {
          if (stopped) {
            return false;
          }
          var currentTime = fxNow || createFxNow(),
              remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
              temp = remaining / animation.duration || 0,
              percent = 1 - temp,
              index = 0,
              length = animation.tweens.length;
          for (; index < length; index++) {
            animation.tweens[index].run(percent);
          }
          deferred.notifyWith(elem, [animation, percent, remaining]);
          if (percent < 1 && length) {
            return remaining;
          } else {
            deferred.resolveWith(elem, [animation]);
            return false;
          }
        },
        animation = deferred.promise({
          elem: elem,
          props: jQuery.extend({}, properties),
          opts: jQuery.extend(true, {
            specialEasing: {},
            easing: jQuery.easing._default
          }, options),
          originalProperties: properties,
          originalOptions: options,
          startTime: fxNow || createFxNow(),
          duration: options.duration,
          tweens: [],
          createTween: function(prop, end) {
            var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
            animation.tweens.push(tween);
            return tween;
          },
          stop: function(gotoEnd) {
            var index = 0,
                length = gotoEnd ? animation.tweens.length : 0;
            if (stopped) {
              return this;
            }
            stopped = true;
            for (; index < length; index++) {
              animation.tweens[index].run(1);
            }
            if (gotoEnd) {
              deferred.notifyWith(elem, [animation, 1, 0]);
              deferred.resolveWith(elem, [animation, gotoEnd]);
            } else {
              deferred.rejectWith(elem, [animation, gotoEnd]);
            }
            return this;
          }
        }),
        props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        if (jQuery.isFunction(result.stop)) {
          jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
        }
        return result;
      }
    }
    jQuery.map(props, createTween, animation);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweeners: {"*": [function(prop, value) {
        var tween = this.createTween(prop, value);
        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
        return tween;
      }]},
    tweener: function(props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = ["*"];
      } else {
        props = props.match(rnotwhite);
      }
      var prop,
          index = 0,
          length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
        Animation.tweeners[prop].unshift(callback);
      }
    },
    prefilters: [defaultPrefilter],
    prefilter: function(callback, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(callback);
      } else {
        Animation.prefilters.push(callback);
      }
    }
  });
  jQuery.speed = function(speed, easing, fn) {
    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
    };
    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    }
    opt.old = opt.complete;
    opt.complete = function() {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.fn.extend({
    fadeTo: function(speed, to, easing, callback) {
      return this.filter(isHidden).css("opacity", 0).show().end().animate({opacity: to}, speed, easing, callback);
    },
    animate: function(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
          optall = jQuery.speed(speed, easing, callback),
          doAnimation = function() {
            var anim = Animation(this, jQuery.extend({}, prop), optall);
            if (empty || dataPriv.get(this, "finish")) {
              anim.stop(true);
            }
          };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function(type, clearQueue, gotoEnd) {
      var stopQueue = function(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue && type !== false) {
        this.queue(type || "fx", []);
      }
      return this.each(function() {
        var dequeue = true,
            index = type != null && type + "queueHooks",
            timers = jQuery.timers,
            data = dataPriv.get(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function(type) {
      if (type !== false) {
        type = type || "fx";
      }
      return this.each(function() {
        var index,
            data = dataPriv.get(this),
            queue = data[type + "queue"],
            hooks = data[type + "queueHooks"],
            timers = jQuery.timers,
            length = queue ? queue.length : 0;
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        delete data.finish;
      });
    }
  });
  jQuery.each(["toggle", "show", "hide"], function(i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function(speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  });
  jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: {opacity: "show"},
    fadeOut: {opacity: "hide"},
    fadeToggle: {opacity: "toggle"}
  }, function(name, props) {
    jQuery.fn[name] = function(speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.timers = [];
  jQuery.fx.tick = function() {
    var timer,
        i = 0,
        timers = jQuery.timers;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function(timer) {
    jQuery.timers.push(timer);
    if (timer()) {
      jQuery.fx.start();
    } else {
      jQuery.timers.pop();
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function() {
    if (!timerId) {
      timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  jQuery.fx.stop = function() {
    window.clearInterval(timerId);
    timerId = null;
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  };
  jQuery.fn.delay = function(time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function(next, hooks) {
      var timeout = window.setTimeout(next, time);
      hooks.stop = function() {
        window.clearTimeout(timeout);
      };
    });
  };
  (function() {
    var input = document.createElement("input"),
        select = document.createElement("select"),
        opt = select.appendChild(document.createElement("option"));
    input.type = "checkbox";
    support.checkOn = input.value !== "";
    support.optSelected = opt.selected;
    select.disabled = true;
    support.optDisabled = !opt.disabled;
    input = document.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";
  })();
  var boolHook,
      attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr: function(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function(name) {
      return this.each(function() {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr: function(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (typeof elem.getAttribute === "undefined") {
        return jQuery.prop(elem, name, value);
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = name.toLowerCase();
        hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        }
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        elem.setAttribute(name, value + "");
        return value;
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      ret = jQuery.find.attr(elem, name);
      return ret == null ? undefined : ret;
    },
    attrHooks: {type: {set: function(elem, value) {
          if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }}},
    removeAttr: function(elem, value) {
      var name,
          propName,
          i = 0,
          attrNames = value && value.match(rnotwhite);
      if (attrNames && elem.nodeType === 1) {
        while ((name = attrNames[i++])) {
          propName = jQuery.propFix[name] || name;
          if (jQuery.expr.match.bool.test(name)) {
            elem[propName] = false;
          }
          elem.removeAttribute(name);
        }
      }
    }
  });
  boolHook = {set: function(elem, value, name) {
      if (value === false) {
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }
      return name;
    }};
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;
    attrHandle[name] = function(elem, name, isXML) {
      var ret,
          handle;
      if (!isXML) {
        handle = attrHandle[name];
        attrHandle[name] = ret;
        ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
        attrHandle[name] = handle;
      }
      return ret;
    };
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i,
      rclickable = /^(?:a|area)$/i;
  jQuery.fn.extend({
    prop: function(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function(name) {
      return this.each(function() {
        delete this[jQuery.propFix[name] || name];
      });
    }
  });
  jQuery.extend({
    prop: function(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        return (elem[name] = value);
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      return elem[name];
    },
    propHooks: {tabIndex: {get: function(elem) {
          var tabindex = jQuery.find.attr(elem, "tabindex");
          return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
        }}},
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  });
  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get: function(elem) {
        var parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }
        return null;
      },
      set: function(elem) {
        var parent = elem.parentNode;
        if (parent) {
          parent.selectedIndex;
          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
      }
    };
  }
  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    jQuery.propFix[this.toLowerCase()] = this;
  });
  var rclass = /[\t\r\n\f]/g;
  function getClass(elem) {
    return elem.getAttribute && elem.getAttribute("class") || "";
  }
  jQuery.fn.extend({
    addClass: function(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).addClass(value.call(this, j, getClass(this)));
        });
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnotwhite) || [];
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            }
            finalValue = jQuery.trim(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }
      return this;
    },
    removeClass: function(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).removeClass(value.call(this, j, getClass(this)));
        });
      }
      if (!arguments.length) {
        return this.attr("class", "");
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnotwhite) || [];
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              while (cur.indexOf(" " + clazz + " ") > -1) {
                cur = cur.replace(" " + clazz + " ", " ");
              }
            }
            finalValue = jQuery.trim(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }
      return this;
    },
    toggleClass: function(value, stateVal) {
      var type = typeof value;
      if (typeof stateVal === "boolean" && type === "string") {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }
      if (jQuery.isFunction(value)) {
        return this.each(function(i) {
          jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
        });
      }
      return this.each(function() {
        var className,
            i,
            self,
            classNames;
        if (type === "string") {
          i = 0;
          self = jQuery(this);
          classNames = value.match(rnotwhite) || [];
          while ((className = classNames[i++])) {
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }
        } else if (value === undefined || type === "boolean") {
          className = getClass(this);
          if (className) {
            dataPriv.set(this, "__className__", className);
          }
          if (this.setAttribute) {
            this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
          }
        }
      });
    },
    hasClass: function(selector) {
      var className,
          elem,
          i = 0;
      className = " " + selector + " ";
      while ((elem = this[i++])) {
        if (elem.nodeType === 1 && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) {
          return true;
        }
      }
      return false;
    }
  });
  var rreturn = /\r/g,
      rspaces = /[\x20\t\r\n\f]+/g;
  jQuery.fn.extend({val: function(value) {
      var hooks,
          ret,
          isFunction,
          elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
            return ret;
          }
          ret = elem.value;
          return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
        }
        return;
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function(i) {
        var val;
        if (this.nodeType !== 1) {
          return;
        }
        if (isFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }
        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (jQuery.isArray(val)) {
          val = jQuery.map(val, function(value) {
            return value == null ? "" : value + "";
          });
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val;
        }
      });
    }});
  jQuery.extend({valHooks: {
      option: {get: function(elem) {
          var val = jQuery.find.attr(elem, "value");
          return val != null ? val : jQuery.trim(jQuery.text(elem)).replace(rspaces, " ");
        }},
      select: {
        get: function(elem) {
          var value,
              option,
              options = elem.options,
              index = elem.selectedIndex,
              one = elem.type === "select-one" || index < 0,
              values = one ? null : [],
              max = one ? index + 1 : options.length,
              i = index < 0 ? max : one ? index : 0;
          for (; i < max; i++) {
            option = options[i];
            if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
              value = jQuery(option).val();
              if (one) {
                return value;
              }
              values.push(value);
            }
          }
          return values;
        },
        set: function(elem, value) {
          var optionSet,
              option,
              options = elem.options,
              values = jQuery.makeArray(value),
              i = options.length;
          while (i--) {
            option = options[i];
            if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
              optionSet = true;
            }
          }
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    }});
  jQuery.each(["radio", "checkbox"], function() {
    jQuery.valHooks[this] = {set: function(elem, value) {
        if (jQuery.isArray(value)) {
          return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
        }
      }};
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function(elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  });
  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
  jQuery.extend(jQuery.event, {
    trigger: function(event, data, elem, onlyHandlers) {
      var i,
          cur,
          tmp,
          bubbleType,
          ontype,
          handle,
          special,
          eventPath = [elem || document],
          type = hasOwn.call(event, "type") ? event.type : event,
          namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = tmp = elem = elem || document;
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }
      if (type.indexOf(".") > -1) {
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(":") < 0 && "on" + type;
      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }
      data = data == null ? [event] : jQuery.makeArray(data, [event]);
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        event.type = i > 1 ? bubbleType : special.bindType || type;
        handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
        if (handle) {
          handle.apply(cur, data);
        }
        handle = ontype && cur[ontype];
        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);
          if (event.result === false) {
            event.preventDefault();
          }
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
          if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null;
            }
            jQuery.event.triggered = type;
            elem[type]();
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }
      return event.result;
    },
    simulate: function(type, elem, event) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true
      });
      jQuery.event.trigger(e, null, elem);
    }
  });
  jQuery.fn.extend({
    trigger: function(type, data) {
      return this.each(function() {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function(type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  });
  jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
    jQuery.fn[name] = function(data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  });
  jQuery.fn.extend({hover: function(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }});
  support.focusin = "onfocusin" in window;
  if (!support.focusin) {
    jQuery.each({
      focus: "focusin",
      blur: "focusout"
    }, function(orig, fix) {
      var handler = function(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
      };
      jQuery.event.special[fix] = {
        setup: function() {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix);
          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }
          dataPriv.access(doc, fix, (attaches || 0) + 1);
        },
        teardown: function() {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix) - 1;
          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            dataPriv.remove(doc, fix);
          } else {
            dataPriv.access(doc, fix, attaches);
          }
        }
      };
    });
  }
  var location = window.location;
  var nonce = jQuery.now();
  var rquery = (/\?/);
  jQuery.parseJSON = function(data) {
    return JSON.parse(data + "");
  };
  jQuery.parseXML = function(data) {
    var xml;
    if (!data || typeof data !== "string") {
      return null;
    }
    try {
      xml = (new window.DOMParser()).parseFromString(data, "text/xml");
    } catch (e) {
      xml = undefined;
    }
    if (!xml || xml.getElementsByTagName("parsererror").length) {
      jQuery.error("Invalid XML: " + data);
    }
    return xml;
  };
  var rhash = /#.*$/,
      rts = /([?&])_=[^&]*/,
      rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
      rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      rnoContent = /^(?:GET|HEAD)$/,
      rprotocol = /^\/\//,
      prefilters = {},
      transports = {},
      allTypes = "*/".concat("*"),
      originAnchor = document.createElement("a");
  originAnchor.href = location.href;
  function addToPrefiltersOrTransports(structure) {
    return function(dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }
      var dataType,
          i = 0,
          dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
      if (jQuery.isFunction(func)) {
        while ((dataType = dataTypes[i++])) {
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func);
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {},
        seekingTransport = (structure === transports);
    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }
    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
  }
  function ajaxExtend(target, src) {
    var key,
        deep,
        flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
    return target;
  }
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct,
        type,
        finalDataType,
        firstDataType,
        contents = s.contents,
        dataTypes = s.dataTypes;
    while (dataTypes[0] === "*") {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }
      finalDataType = finalDataType || firstDataType;
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2,
        current,
        conv,
        tmp,
        prev,
        converters = {},
        dataTypes = s.dataTypes.slice();
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        if (current === "*") {
          current = prev;
        } else if (prev !== "*" && prev !== current) {
          conv = converters[prev + " " + current] || converters["* " + current];
          if (!conv) {
            for (conv2 in converters) {
              tmp = conv2.split(" ");
              if (tmp[1] === current) {
                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                if (conv) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }
          if (conv !== true) {
            if (conv && s.throws) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : "No conversion from " + prev + " to " + current
                };
              }
            }
          }
        }
      }
    }
    return {
      state: "success",
      data: response
    };
  }
  jQuery.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: location.href,
      type: "GET",
      isLocal: rlocalProtocol.test(location.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": true,
        "text json": jQuery.parseJSON,
        "text xml": jQuery.parseXML
      },
      flatOptions: {
        url: true,
        context: true
      }
    },
    ajaxSetup: function(target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function(url, options) {
      if (typeof url === "object") {
        options = url;
        url = undefined;
      }
      options = options || {};
      var transport,
          cacheURL,
          responseHeadersString,
          responseHeaders,
          timeoutTimer,
          urlAnchor,
          fireGlobals,
          i,
          s = jQuery.ajaxSetup({}, options),
          callbackContext = s.context || s,
          globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
          deferred = jQuery.Deferred(),
          completeDeferred = jQuery.Callbacks("once memory"),
          statusCode = s.statusCode || {},
          requestHeaders = {},
          requestHeadersNames = {},
          state = 0,
          strAbort = "canceled",
          jqXHR = {
            readyState: 0,
            getResponseHeader: function(key) {
              var match;
              if (state === 2) {
                if (!responseHeaders) {
                  responseHeaders = {};
                  while ((match = rheaders.exec(responseHeadersString))) {
                    responseHeaders[match[1].toLowerCase()] = match[2];
                  }
                }
                match = responseHeaders[key.toLowerCase()];
              }
              return match == null ? null : match;
            },
            getAllResponseHeaders: function() {
              return state === 2 ? responseHeadersString : null;
            },
            setRequestHeader: function(name, value) {
              var lname = name.toLowerCase();
              if (!state) {
                name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                requestHeaders[name] = value;
              }
              return this;
            },
            overrideMimeType: function(type) {
              if (!state) {
                s.mimeType = type;
              }
              return this;
            },
            statusCode: function(map) {
              var code;
              if (map) {
                if (state < 2) {
                  for (code in map) {
                    statusCode[code] = [statusCode[code], map[code]];
                  }
                } else {
                  jqXHR.always(map[jqXHR.status]);
                }
              }
              return this;
            },
            abort: function(statusText) {
              var finalText = statusText || strAbort;
              if (transport) {
                transport.abort(finalText);
              }
              done(0, finalText);
              return this;
            }
          };
      deferred.promise(jqXHR).complete = completeDeferred.add;
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
      s.url = ((url || s.url || location.href) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//");
      s.type = options.method || options.type || s.method || s.type;
      s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
      if (s.crossDomain == null) {
        urlAnchor = document.createElement("a");
        try {
          urlAnchor.href = s.url;
          urlAnchor.href = urlAnchor.href;
          s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
        } catch (e) {
          s.crossDomain = true;
        }
      }
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (state === 2) {
        return jqXHR;
      }
      fireGlobals = jQuery.event && s.global;
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
      }
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      cacheURL = s.url;
      if (!s.hasContent) {
        if (s.data) {
          cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
          delete s.data;
        }
        if (s.cache === false) {
          s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }
      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
        return jqXHR.abort();
      }
      strAbort = "abort";
      for (i in {
        success: 1,
        error: 1,
        complete: 1
      }) {
        jqXHR[i](s[i]);
      }
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }
        if (state === 2) {
          return jqXHR;
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = window.setTimeout(function() {
            jqXHR.abort("timeout");
          }, s.timeout);
        }
        try {
          state = 1;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (state < 2) {
            done(-1, e);
          } else {
            throw e;
          }
        }
      }
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess,
            success,
            error,
            response,
            modified,
            statusText = nativeStatusText;
        if (state === 2) {
          return;
        }
        state = 2;
        if (timeoutTimer) {
          window.clearTimeout(timeoutTimer);
        }
        transport = undefined;
        responseHeadersString = headers || "";
        jqXHR.readyState = status > 0 ? 4 : 0;
        isSuccess = status >= 200 && status < 300 || status === 304;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }
        response = ajaxConvert(s, response, jqXHR, isSuccess);
        if (isSuccess) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader("etag");
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }
          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent";
          } else if (status === 304) {
            statusText = "notmodified";
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          error = statusText;
          if (status || !statusText) {
            statusText = "error";
            if (status < 0) {
              status = 0;
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        }
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
        }
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
          if (!(--jQuery.active)) {
            jQuery.event.trigger("ajaxStop");
          }
        }
      }
      return jqXHR;
    },
    getJSON: function(url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },
    getScript: function(url, callback) {
      return jQuery.get(url, undefined, callback, "script");
    }
  });
  jQuery.each(["get", "post"], function(i, method) {
    jQuery[method] = function(url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.ajax(jQuery.extend({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      }, jQuery.isPlainObject(url) && url));
    };
  });
  jQuery._evalUrl = function(url) {
    return jQuery.ajax({
      url: url,
      type: "GET",
      dataType: "script",
      async: false,
      global: false,
      "throws": true
    });
  };
  jQuery.fn.extend({
    wrapAll: function(html) {
      var wrap;
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      }
      if (this[0]) {
        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function() {
          var elem = this;
          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function(html) {
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function() {
        var self = jQuery(this),
            contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function(html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function(i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function() {
      return this.parent().each(function() {
        if (!jQuery.nodeName(this, "body")) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    }
  });
  jQuery.expr.filters.hidden = function(elem) {
    return !jQuery.expr.filters.visible(elem);
  };
  jQuery.expr.filters.visible = function(elem) {
    return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
  };
  var r20 = /%20/g,
      rbracket = /\[\]$/,
      rCRLF = /\r?\n/g,
      rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
      rsubmittable = /^(?:input|select|textarea|keygen)/i;
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function(i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
        }
      });
    } else if (!traditional && jQuery.type(obj) === "object") {
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  jQuery.param = function(a, traditional) {
    var prefix,
        s = [],
        add = function(key, value) {
          value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
          s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }
    if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
      jQuery.each(a, function() {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return s.join("&").replace(r20, "+");
  };
  jQuery.fn.extend({
    serialize: function() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function() {
      return this.map(function() {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function() {
        var type = this.type;
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
      }).map(function(i, elem) {
        var val = jQuery(this).val();
        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
          return {
            name: elem.name,
            value: val.replace(rCRLF, "\r\n")
          };
        }) : {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        };
      }).get();
    }
  });
  jQuery.ajaxSettings.xhr = function() {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  };
  var xhrSuccessStatus = {
    0: 200,
    1223: 204
  },
      xhrSupported = jQuery.ajaxSettings.xhr();
  support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function(options) {
    var callback,
        errorCallback;
    if (support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function(headers, complete) {
          var i,
              xhr = options.xhr();
          xhr.open(options.type, options.url, options.async, options.username, options.password);
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }
          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          }
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }
          callback = function(type) {
            return function() {
              if (callback) {
                callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
                if (type === "abort") {
                  xhr.abort();
                } else if (type === "error") {
                  if (typeof xhr.status !== "number") {
                    complete(0, "error");
                  } else {
                    complete(xhr.status, xhr.statusText);
                  }
                } else {
                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {binary: xhr.response} : {text: xhr.responseText}, xhr.getAllResponseHeaders());
                }
              }
            };
          };
          xhr.onload = callback();
          errorCallback = xhr.onerror = callback("error");
          if (xhr.onabort !== undefined) {
            xhr.onabort = errorCallback;
          } else {
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                window.setTimeout(function() {
                  if (callback) {
                    errorCallback();
                  }
                });
              }
            };
          }
          callback = callback("abort");
          try {
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {
            if (callback) {
              throw e;
            }
          }
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  jQuery.ajaxSetup({
    accepts: {script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"},
    contents: {script: /\b(?:java|ecma)script\b/},
    converters: {"text script": function(text) {
        jQuery.globalEval(text);
        return text;
      }}
  });
  jQuery.ajaxPrefilter("script", function(s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = "GET";
    }
  });
  jQuery.ajaxTransport("script", function(s) {
    if (s.crossDomain) {
      var script,
          callback;
      return {
        send: function(_, complete) {
          script = jQuery("<script>").prop({
            charset: s.scriptCharset,
            src: s.url
          }).on("load error", callback = function(evt) {
            script.remove();
            callback = null;
            if (evt) {
              complete(evt.type === "error" ? 404 : 200, evt.type);
            }
          });
          document.head.appendChild(script[0]);
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var oldCallbacks = [],
      rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
      this[callback] = true;
      return callback;
    }
  });
  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
    var callbackName,
        overwritten,
        responseContainer,
        jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
    if (jsonProp || s.dataTypes[0] === "jsonp") {
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      }
      s.converters["script json"] = function() {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called");
        }
        return responseContainer[0];
      };
      s.dataTypes[0] = "json";
      overwritten = window[callbackName];
      window[callbackName] = function() {
        responseContainer = arguments;
      };
      jqXHR.always(function() {
        if (overwritten === undefined) {
          jQuery(window).removeProp(callbackName);
        } else {
          window[callbackName] = overwritten;
        }
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName);
        }
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });
      return "script";
    }
  });
  jQuery.parseHTML = function(data, context, keepScripts) {
    if (!data || typeof data !== "string") {
      return null;
    }
    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }
    context = context || document;
    var parsed = rsingleTag.exec(data),
        scripts = !keepScripts && [];
    if (parsed) {
      return [context.createElement(parsed[1])];
    }
    parsed = buildFragment([data], context, scripts);
    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }
    return jQuery.merge([], parsed.childNodes);
  };
  var _load = jQuery.fn.load;
  jQuery.fn.load = function(url, params, callback) {
    if (typeof url !== "string" && _load) {
      return _load.apply(this, arguments);
    }
    var selector,
        type,
        response,
        self = this,
        off = url.indexOf(" ");
    if (off > -1) {
      selector = jQuery.trim(url.slice(off));
      url = url.slice(0, off);
    }
    if (jQuery.isFunction(params)) {
      callback = params;
      params = undefined;
    } else if (params && typeof params === "object") {
      type = "POST";
    }
    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        type: type || "GET",
        dataType: "html",
        data: params
      }).done(function(responseText) {
        response = arguments;
        self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
      }).always(callback && function(jqXHR, status) {
        self.each(function() {
          callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
        });
      });
    }
    return this;
  };
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
    jQuery.fn[type] = function(fn) {
      return this.on(type, fn);
    };
  });
  jQuery.expr.filters.animated = function(elem) {
    return jQuery.grep(jQuery.timers, function(fn) {
      return elem === fn.elem;
    }).length;
  };
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }
  jQuery.offset = {setOffset: function(elem, options, i) {
      var curPosition,
          curLeft,
          curCSSTop,
          curTop,
          curOffset,
          curCSSLeft,
          calculatePosition,
          position = jQuery.css(elem, "position"),
          curElem = jQuery(elem),
          props = {};
      if (position === "static") {
        elem.style.position = "relative";
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, jQuery.extend({}, curOffset));
      }
      if (options.top != null) {
        props.top = (options.top - curOffset.top) + curTop;
      }
      if (options.left != null) {
        props.left = (options.left - curOffset.left) + curLeft;
      }
      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }};
  jQuery.fn.extend({
    offset: function(options) {
      if (arguments.length) {
        return options === undefined ? this : this.each(function(i) {
          jQuery.offset.setOffset(this, options, i);
        });
      }
      var docElem,
          win,
          elem = this[0],
          box = {
            top: 0,
            left: 0
          },
          doc = elem && elem.ownerDocument;
      if (!doc) {
        return;
      }
      docElem = doc.documentElement;
      if (!jQuery.contains(docElem, elem)) {
        return box;
      }
      box = elem.getBoundingClientRect();
      win = getWindow(doc);
      return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
      };
    },
    position: function() {
      if (!this[0]) {
        return;
      }
      var offsetParent,
          offset,
          elem = this[0],
          parentOffset = {
            top: 0,
            left: 0
          };
      if (jQuery.css(elem, "position") === "fixed") {
        offset = elem.getBoundingClientRect();
      } else {
        offsetParent = this.offsetParent();
        offset = this.offset();
        if (!jQuery.nodeName(offsetParent[0], "html")) {
          parentOffset = offsetParent.offset();
        }
        parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
        parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
      }
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      };
    },
    offsetParent: function() {
      return this.map(function() {
        var offsetParent = this.offsetParent;
        while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || documentElement;
      });
    }
  });
  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(method, prop) {
    var top = "pageYOffset" === prop;
    jQuery.fn[method] = function(val) {
      return access(this, function(elem, method, val) {
        var win = getWindow(elem);
        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }
        if (win) {
          win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length);
    };
  });
  jQuery.each(["top", "left"], function(i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
      if (computed) {
        computed = curCSS(elem, prop);
        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
      }
    });
  });
  jQuery.each({
    Height: "height",
    Width: "width"
  }, function(name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function(defaultExtra, funcName) {
      jQuery.fn[funcName] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
            extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function(elem, type, value) {
          var doc;
          if (jQuery.isWindow(elem)) {
            return elem.document.documentElement["client" + name];
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
          }
          return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable, null);
      };
    });
  });
  jQuery.fn.extend({
    bind: function(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function(types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function(selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function(selector, types, fn) {
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    },
    size: function() {
      return this.length;
    }
  });
  jQuery.fn.andSelf = jQuery.fn.addBack;
  if (typeof define === "function" && define.amd) {
    define("npm:jquery@2.2.4/dist/jquery.js", [], function() {
      return jQuery;
    }), define("jquery", ["npm:jquery@2.2.4/dist/jquery.js"], function(m) {
      return m;
    });
  }
  var _jQuery = window.jQuery,
      _$ = window.$;
  jQuery.noConflict = function(deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }
    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }
    return jQuery;
  };
  if (!noGlobal) {
    window.jQuery = window.$ = jQuery;
  }
  return jQuery;
}));

})();
(function() {
var define = System.amdDefine;
define("npm:jquery@2.2.4.js", ["npm:jquery@2.2.4/dist/jquery.js"], function(main) {
  return main;
});

})();
(function() {
var define = System.amdDefine;
(function(global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ? factory(global, true) : function(w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
  var arr = [];
  var document = window.document;
  var slice = arr.slice;
  var concat = arr.concat;
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var support = {};
  var version = "2.2.1",
      jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
      },
      rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      rmsPrefix = /^-ms-/,
      rdashAlpha = /-([\da-z])/gi,
      fcamelCase = function(all, letter) {
        return letter.toUpperCase();
      };
  jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    selector: "",
    length: 0,
    toArray: function() {
      return slice.call(this);
    },
    get: function(num) {
      return num != null ? (num < 0 ? this[num + this.length] : this[num]) : slice.call(this);
    },
    pushStack: function(elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      return ret;
    },
    each: function(callback) {
      return jQuery.each(this, callback);
    },
    map: function(callback) {
      return this.pushStack(jQuery.map(this, function(elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    slice: function() {
      return this.pushStack(slice.apply(this, arguments));
    },
    first: function() {
      return this.eq(0);
    },
    last: function() {
      return this.eq(-1);
    },
    eq: function(i) {
      var len = this.length,
          j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function() {
      return this.prevObject || this.constructor();
    },
    push: push,
    sort: arr.sort,
    splice: arr.splice
  };
  jQuery.extend = jQuery.fn.extend = function() {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    isReady: true,
    error: function(msg) {
      throw new Error(msg);
    },
    noop: function() {},
    isFunction: function(obj) {
      return jQuery.type(obj) === "function";
    },
    isArray: Array.isArray,
    isWindow: function(obj) {
      return obj != null && obj === obj.window;
    },
    isNumeric: function(obj) {
      var realStringObj = obj && obj.toString();
      return !jQuery.isArray(obj) && (realStringObj - parseFloat(realStringObj) + 1) >= 0;
    },
    isPlainObject: function(obj) {
      if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
      }
      if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }
      return true;
    },
    isEmptyObject: function(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    type: function(obj) {
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
    },
    globalEval: function(code) {
      var script,
          indirect = eval;
      code = jQuery.trim(code);
      if (code) {
        if (code.indexOf("use strict") === 1) {
          script = document.createElement("script");
          script.text = code;
          document.head.appendChild(script).parentNode.removeChild(script);
        } else {
          indirect(code);
        }
      }
    },
    camelCase: function(string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    },
    nodeName: function(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each: function(obj, callback) {
      var length,
          i = 0;
      if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }
      return obj;
    },
    trim: function(text) {
      return text == null ? "" : (text + "").replace(rtrim, "");
    },
    makeArray: function(arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function(elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },
    merge: function(first, second) {
      var len = +second.length,
          j = 0,
          i = first.length;
      for (; j < len; j++) {
        first[i++] = second[j];
      }
      first.length = i;
      return first;
    },
    grep: function(elems, callback, invert) {
      var callbackInverse,
          matches = [],
          i = 0,
          length = elems.length,
          callbackExpect = !invert;
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }
      return matches;
    },
    map: function(elems, callback, arg) {
      var length,
          value,
          i = 0,
          ret = [];
      if (isArrayLike(elems)) {
        length = elems.length;
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      }
      return concat.apply([], ret);
    },
    guid: 1,
    proxy: function(fn, context) {
      var tmp,
          args,
          proxy;
      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }
      args = slice.call(arguments, 2);
      proxy = function() {
        return fn.apply(context || this, args.concat(slice.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    },
    now: Date.now,
    support: support
  });
  if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
  }
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });
  function isArrayLike(obj) {
    var length = !!obj && "length" in obj && obj.length,
        type = jQuery.type(obj);
    if (type === "function" || jQuery.isWindow(obj)) {
      return false;
    }
    return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
  }
  var Sizzle = (function(window) {
    var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,
        setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,
        expando = "sizzle" + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        sortOrder = function(a, b) {
          if (a === b) {
            hasDuplicate = true;
          }
          return 0;
        },
        MAX_NEGATIVE = 1 << 31,
        hasOwn = ({}).hasOwnProperty,
        arr = [],
        pop = arr.pop,
        push_native = arr.push,
        push = arr.push,
        slice = arr.slice,
        indexOf = function(list, elem) {
          var i = 0,
              len = list.length;
          for (; i < len; i++) {
            if (list[i] === elem) {
              return i;
            }
          }
          return -1;
        },
        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        whitespace = "[\\x20\\t\\r\\n\\f]",
        identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
        pseudos = ":(" + identifier + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)",
        rwhitespace = new RegExp(whitespace + "+", "g"),
        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
        rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
        rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
        rpseudo = new RegExp(pseudos),
        ridentifier = new RegExp("^" + identifier + "$"),
        matchExpr = {
          "ID": new RegExp("^#(" + identifier + ")"),
          "CLASS": new RegExp("^\\.(" + identifier + ")"),
          "TAG": new RegExp("^(" + identifier + "|[*])"),
          "ATTR": new RegExp("^" + attributes),
          "PSEUDO": new RegExp("^" + pseudos),
          "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
          "bool": new RegExp("^(?:" + booleans + ")$", "i"),
          "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        },
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,
        rnative = /^[^{]+\{\s*\[native \w/,
        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        rsibling = /[+~]/,
        rescape = /'|\\/g,
        runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
        funescape = function(_, escaped, escapedWhitespace) {
          var high = "0x" + escaped - 0x10000;
          return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
        },
        unloadHandler = function() {
          setDocument();
        };
    try {
      push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {apply: arr.length ? function(target, els) {
          push_native.apply(target, slice.call(els));
        } : function(target, els) {
          var j = target.length,
              i = 0;
          while ((target[j++] = els[i++])) {}
          target.length = j - 1;
        }};
    }
    function Sizzle(selector, context, results, seed) {
      var m,
          i,
          elem,
          nid,
          nidselect,
          match,
          groups,
          newSelector,
          newContext = context && context.ownerDocument,
          nodeType = context ? context.nodeType : 9;
      results = results || [];
      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }
      if (!seed) {
        if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
          setDocument(context);
        }
        context = context || document;
        if (documentIsHTML) {
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            if ((m = match[1])) {
              if (nodeType === 9) {
                if ((elem = context.getElementById(m))) {
                  if (elem.id === m) {
                    results.push(elem);
                    return results;
                  }
                } else {
                  return results;
                }
              } else {
                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                  results.push(elem);
                  return results;
                }
              }
            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results;
            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          }
          if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
            if (nodeType !== 1) {
              newContext = context;
              newSelector = selector;
            } else if (context.nodeName.toLowerCase() !== "object") {
              if ((nid = context.getAttribute("id"))) {
                nid = nid.replace(rescape, "\\$&");
              } else {
                context.setAttribute("id", (nid = expando));
              }
              groups = tokenize(selector);
              i = groups.length;
              nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']";
              while (i--) {
                groups[i] = nidselect + " " + toSelector(groups[i]);
              }
              newSelector = groups.join(",");
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
            }
            if (newSelector) {
              try {
                push.apply(results, newContext.querySelectorAll(newSelector));
                return results;
              } catch (qsaError) {} finally {
                if (nid === expando) {
                  context.removeAttribute("id");
                }
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    function createCache() {
      var keys = [];
      function cache(key, value) {
        if (keys.push(key + " ") > Expr.cacheLength) {
          delete cache[keys.shift()];
        }
        return (cache[key + " "] = value);
      }
      return cache;
    }
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    function assert(fn) {
      var div = document.createElement("div");
      try {
        return !!fn(div);
      } catch (e) {
        return false;
      } finally {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
        div = null;
      }
    }
    function addHandle(attrs, handler) {
      var arr = attrs.split("|"),
          i = arr.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    function siblingCheck(a, b) {
      var cur = b && a,
          diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
      if (diff) {
        return diff;
      }
      if (cur) {
        while ((cur = cur.nextSibling)) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    function createInputPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function(argument) {
        argument = +argument;
        return markFunction(function(seed, matches) {
          var j,
              matchIndexes = fn([], seed.length, argument),
              i = matchIndexes.length;
          while (i--) {
            if (seed[(j = matchIndexes[i])]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    }
    support = Sizzle.support = {};
    isXML = Sizzle.isXML = function(elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== "HTML" : false;
    };
    setDocument = Sizzle.setDocument = function(node) {
      var hasCompare,
          parent,
          doc = node ? node.ownerDocument || node : preferredDoc;
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }
      document = doc;
      docElem = document.documentElement;
      documentIsHTML = !isXML(document);
      if ((parent = document.defaultView) && parent.top !== parent) {
        if (parent.addEventListener) {
          parent.addEventListener("unload", unloadHandler, false);
        } else if (parent.attachEvent) {
          parent.attachEvent("onunload", unloadHandler);
        }
      }
      support.attributes = assert(function(div) {
        div.className = "i";
        return !div.getAttribute("className");
      });
      support.getElementsByTagName = assert(function(div) {
        div.appendChild(document.createComment(""));
        return !div.getElementsByTagName("*").length;
      });
      support.getElementsByClassName = rnative.test(document.getElementsByClassName);
      support.getById = assert(function(div) {
        docElem.appendChild(div).id = expando;
        return !document.getElementsByName || !document.getElementsByName(expando).length;
      });
      if (support.getById) {
        Expr.find["ID"] = function(id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var m = context.getElementById(id);
            return m ? [m] : [];
          }
        };
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            return elem.getAttribute("id") === attrId;
          };
        };
      } else {
        delete Expr.find["ID"];
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        };
      }
      Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
        if (typeof context.getElementsByTagName !== "undefined") {
          return context.getElementsByTagName(tag);
        } else if (support.qsa) {
          return context.querySelectorAll(tag);
        }
      } : function(tag, context) {
        var elem,
            tmp = [],
            i = 0,
            results = context.getElementsByTagName(tag);
        if (tag === "*") {
          while ((elem = results[i++])) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }
          return tmp;
        }
        return results;
      };
      Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
        if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      rbuggyMatches = [];
      rbuggyQSA = [];
      if ((support.qsa = rnative.test(document.querySelectorAll))) {
        assert(function(div) {
          docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";
          if (div.querySelectorAll("[msallowcapture^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
          }
          if (!div.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
          }
          if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
            rbuggyQSA.push("~=");
          }
          if (!div.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked");
          }
          if (!div.querySelectorAll("a#" + expando + "+*").length) {
            rbuggyQSA.push(".#.+[+~]");
          }
        });
        assert(function(div) {
          var input = document.createElement("input");
          input.setAttribute("type", "hidden");
          div.appendChild(input).setAttribute("name", "D");
          if (div.querySelectorAll("[name=d]").length) {
            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
          }
          if (!div.querySelectorAll(":enabled").length) {
            rbuggyQSA.push(":enabled", ":disabled");
          }
          div.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }
      if ((support.matchesSelector = rnative.test((matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
        assert(function(div) {
          support.disconnectedMatch = matches.call(div, "div");
          matches.call(div, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos);
        });
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
      hasCompare = rnative.test(docElem.compareDocumentPosition);
      contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function(a, b) {
        if (b) {
          while ((b = b.parentNode)) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      };
      sortOrder = hasCompare ? function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
          return compare;
        }
        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
        if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
          if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
            return -1;
          }
          if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
            return 1;
          }
          return sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
        }
        return compare & 4 ? -1 : 1;
      } : function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var cur,
            i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [a],
            bp = [b];
        if (!aup || !bup) {
          return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
        } else if (aup === bup) {
          return siblingCheck(a, b);
        }
        cur = a;
        while ((cur = cur.parentNode)) {
          ap.unshift(cur);
        }
        cur = b;
        while ((cur = cur.parentNode)) {
          bp.unshift(cur);
        }
        while (ap[i] === bp[i]) {
          i++;
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return document;
    };
    Sizzle.matches = function(expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function(elem, expr) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      expr = expr.replace(rattributeQuotes, "='$1']");
      if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {}
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    Sizzle.contains = function(context, elem) {
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }
      return contains(context, elem);
    };
    Sizzle.attr = function(elem, name) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()],
          val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };
    Sizzle.error = function(msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };
    Sizzle.uniqueSort = function(results) {
      var elem,
          duplicates = [],
          j = 0,
          i = 0;
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while ((elem = results[i++])) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      sortInput = null;
      return results;
    };
    getText = Sizzle.getText = function(elem) {
      var node,
          ret = "",
          i = 0,
          nodeType = elem.nodeType;
      if (!nodeType) {
        while ((node = elem[i++])) {
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        if (typeof elem.textContent === "string") {
          return elem.textContent;
        } else {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      return ret;
    };
    Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: true
        },
        " ": {dir: "parentNode"},
        "+": {
          dir: "previousSibling",
          first: true
        },
        "~": {dir: "previousSibling"}
      },
      preFilter: {
        "ATTR": function(match) {
          match[1] = match[1].replace(runescape, funescape);
          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
          if (match[2] === "~=") {
            match[3] = " " + match[3] + " ";
          }
          return match.slice(0, 4);
        },
        "CHILD": function(match) {
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === "nth") {
            if (!match[3]) {
              Sizzle.error(match[0]);
            }
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +((match[7] + match[8]) || match[3] === "odd");
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        "PSEUDO": function(match) {
          var excess,
              unquoted = !match[6] && match[2];
          if (matchExpr["CHILD"].test(match[0])) {
            return null;
          }
          if (match[3]) {
            match[2] = match[4] || match[5] || "";
          } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }
          return match.slice(0, 3);
        }
      },
      filter: {
        "TAG": function(nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function() {
            return true;
          } : function(elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        "CLASS": function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
          });
        },
        "ATTR": function(name, operator, check) {
          return function(elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === "!=";
            }
            if (!operator) {
              return true;
            }
            result += "";
            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
          };
        },
        "CHILD": function(type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
              forward = type.slice(-4) !== "last",
              ofType = what === "of-type";
          return first === 1 && last === 0 ? function(elem) {
            return !!elem.parentNode;
          } : function(elem, context, xml) {
            var cache,
                uniqueCache,
                outerCache,
                node,
                nodeIndex,
                start,
                dir = simple !== forward ? "nextSibling" : "previousSibling",
                parent = elem.parentNode,
                name = ofType && elem.nodeName.toLowerCase(),
                useCache = !xml && !ofType,
                diff = false;
            if (parent) {
              if (simple) {
                while (dir) {
                  node = elem;
                  while ((node = node[dir])) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  }
                  start = dir = type === "only" && !start && "nextSibling";
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              if (forward && useCache) {
                node = parent;
                outerCache = node[expando] || (node[expando] = {});
                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                cache = uniqueCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    uniqueCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                if (useCache) {
                  node = elem;
                  outerCache = node[expando] || (node[expando] = {});
                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                  cache = uniqueCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                }
                if (diff === false) {
                  while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {});
                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        uniqueCache[type] = [dirruns, diff];
                      }
                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || (diff % first === 0 && diff / first >= 0);
            }
          };
        },
        "PSEUDO": function(pseudo, argument) {
          var args,
              fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
          if (fn[expando]) {
            return fn(argument);
          }
          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
              var idx,
                  matched = fn(seed, argument),
                  i = matched.length;
              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function(elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        "not": markFunction(function(selector) {
          var input = [],
              results = [],
              matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
            var elem,
                unmatched = matcher(seed, null, xml, []),
                i = seed.length;
            while (i--) {
              if ((elem = unmatched[i])) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function(elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            input[0] = null;
            return !results.pop();
          };
        }),
        "has": markFunction(function(selector) {
          return function(elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        "contains": markFunction(function(text) {
          text = text.replace(runescape, funescape);
          return function(elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        "lang": markFunction(function(lang) {
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function(elem) {
            var elemLang;
            do {
              if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        "target": function(elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        "root": function(elem) {
          return elem === docElem;
        },
        "focus": function(elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        "enabled": function(elem) {
          return elem.disabled === false;
        },
        "disabled": function(elem) {
          return elem.disabled === true;
        },
        "checked": function(elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
        },
        "selected": function(elem) {
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        "empty": function(elem) {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        "parent": function(elem) {
          return !Expr.pseudos["empty"](elem);
        },
        "header": function(elem) {
          return rheader.test(elem.nodeName);
        },
        "input": function(elem) {
          return rinputs.test(elem.nodeName);
        },
        "button": function(elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button";
        },
        "text": function(elem) {
          var attr;
          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
        },
        "first": createPositionalPseudo(function() {
          return [0];
        }),
        "last": createPositionalPseudo(function(matchIndexes, length) {
          return [length - 1];
        }),
        "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        "even": createPositionalPseudo(function(matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "odd": createPositionalPseudo(function(matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; --i >= 0; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos["nth"] = Expr.pseudos["eq"];
    for (i in {
      radio: true,
      checkbox: true,
      file: true,
      password: true,
      image: true
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in {
      submit: true,
      reset: true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    tokenize = Sizzle.tokenize = function(selector, parseOnly) {
      var matched,
          match,
          tokens,
          type,
          soFar,
          groups,
          preFilters,
          cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push((tokens = []));
        }
        matched = false;
        if ((match = rcombinators.exec(soFar))) {
          matched = match.shift();
          tokens.push({
            value: matched,
            type: match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length);
        }
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    };
    function toSelector(tokens) {
      var i = 0,
          len = tokens.length,
          selector = "";
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
          checkNonElements = base && dir === "parentNode",
          doneName = done++;
      return combinator.first ? function(elem, context, xml) {
        while ((elem = elem[dir])) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }
      } : function(elem, context, xml) {
        var oldCache,
            uniqueCache,
            outerCache,
            newCache = [dirruns, doneName];
        if (xml) {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
              if ((oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                return (newCache[2] = oldCache[2]);
              } else {
                uniqueCache[dir] = newCache;
                if ((newCache[2] = matcher(elem, context, xml))) {
                  return true;
                }
              }
            }
          }
        }
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i = 0,
          len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem,
          newUnmatched = [],
          i = 0,
          len = unmatched.length,
          mapped = map != null;
      for (; i < len; i++) {
        if ((elem = unmatched[i])) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function(seed, results, context, xml) {
        var temp,
            i,
            elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,
            elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
            matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
            matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i = temp.length;
          while (i--) {
            if ((elem = temp[i])) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if ((elem = matcherOut[i])) {
                  temp.push((matcherIn[i] = elem));
                }
              }
              postFinder(null, (matcherOut = []), temp, xml);
            }
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext,
          matcher,
          j,
          len = tokens.length,
          leadingRelative = Expr.relative[tokens[0].type],
          implicitRelative = leadingRelative || Expr.relative[" "],
          i = leadingRelative ? 1 : 0,
          matchContext = addCombinator(function(elem) {
            return elem === checkContext;
          }, implicitRelative, true),
          matchAnyContext = addCombinator(function(elem) {
            return indexOf(checkContext, elem) > -1;
          }, implicitRelative, true),
          matchers = [function(elem, context, xml) {
            var ret = (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            checkContext = null;
            return ret;
          }];
      for (; i < len; i++) {
        if ((matcher = Expr.relative[tokens[i].type])) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          if (matcher[expando]) {
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({value: tokens[i - 2].type === " " ? "*" : ""})).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
          byElement = elementMatchers.length > 0,
          superMatcher = function(seed, context, xml, results, outermost) {
            var elem,
                j,
                matcher,
                matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                setMatched = [],
                contextBackup = outermostContext,
                elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                len = elems.length;
            if (outermost) {
              outermostContext = context === document || context || outermost;
            }
            for (; i !== len && (elem = elems[i]) != null; i++) {
              if (byElement && elem) {
                j = 0;
                if (!context && elem.ownerDocument !== document) {
                  setDocument(elem);
                  xml = !documentIsHTML;
                }
                while ((matcher = elementMatchers[j++])) {
                  if (matcher(elem, context || document, xml)) {
                    results.push(elem);
                    break;
                  }
                }
                if (outermost) {
                  dirruns = dirrunsUnique;
                }
              }
              if (bySet) {
                if ((elem = !matcher && elem)) {
                  matchedCount--;
                }
                if (seed) {
                  unmatched.push(elem);
                }
              }
            }
            matchedCount += i;
            if (bySet && i !== matchedCount) {
              j = 0;
              while ((matcher = setMatchers[j++])) {
                matcher(unmatched, setMatched, context, xml);
              }
              if (seed) {
                if (matchedCount > 0) {
                  while (i--) {
                    if (!(unmatched[i] || setMatched[i])) {
                      setMatched[i] = pop.call(results);
                    }
                  }
                }
                setMatched = condense(setMatched);
              }
              push.apply(results, setMatched);
              if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                Sizzle.uniqueSort(results);
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
              outermostContext = contextBackup;
            }
            return unmatched;
          };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function(selector, match) {
      var i,
          setMatchers = [],
          elementMatchers = [],
          cached = compilerCache[selector + " "];
      if (!cached) {
        if (!match) {
          match = tokenize(selector);
        }
        i = match.length;
        while (i--) {
          cached = matcherFromTokens(match[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
        cached.selector = selector;
      }
      return cached;
    };
    select = Sizzle.select = function(selector, context, results, seed) {
      var i,
          tokens,
          token,
          type,
          find,
          compiled = typeof selector === "function" && selector,
          match = !seed && tokenize((selector = compiled.selector || selector));
      results = results || [];
      if (match.length === 1) {
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
          if (!context) {
            return results;
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
        while (i--) {
          token = tokens[i];
          if (Expr.relative[(type = token.type)]) {
            break;
          }
          if ((find = Expr.find[type])) {
            if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }
      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    };
    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
    support.detectDuplicates = !!hasDuplicate;
    setDocument();
    support.sortDetached = assert(function(div1) {
      return div1.compareDocumentPosition(document.createElement("div")) & 1;
    });
    if (!assert(function(div) {
      div.innerHTML = "<a href='#'></a>";
      return div.firstChild.getAttribute("href") === "#";
    })) {
      addHandle("type|href|height|width", function(elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
        }
      });
    }
    if (!support.attributes || !assert(function(div) {
      div.innerHTML = "<input/>";
      div.firstChild.setAttribute("value", "");
      return div.firstChild.getAttribute("value") === "";
    })) {
      addHandle("value", function(elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === "input") {
          return elem.defaultValue;
        }
      });
    }
    if (!assert(function(div) {
      return div.getAttribute("disabled") == null;
    })) {
      addHandle(booleans, function(elem, name, isXML) {
        var val;
        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
      });
    }
    return Sizzle;
  })(window);
  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;
  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  var dir = function(elem, dir, until) {
    var matched = [],
        truncate = until !== undefined;
    while ((elem = elem[dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break;
        }
        matched.push(elem);
      }
    }
    return matched;
  };
  var siblings = function(n, elem) {
    var matched = [];
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }
    return matched;
  };
  var rneedsContext = jQuery.expr.match.needsContext;
  var rsingleTag = (/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/);
  var risSimple = /^.[^:#\[\.,]*$/;
  function winnow(elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function(elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function(elem) {
        return (elem === qualifier) !== not;
      });
    }
    if (typeof qualifier === "string") {
      if (risSimple.test(qualifier)) {
        return jQuery.filter(qualifier, elements, not);
      }
      qualifier = jQuery.filter(qualifier, elements);
    }
    return jQuery.grep(elements, function(elem) {
      return (indexOf.call(qualifier, elem) > -1) !== not;
    });
  }
  jQuery.filter = function(expr, elems, not) {
    var elem = elems[0];
    if (not) {
      expr = ":not(" + expr + ")";
    }
    return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
      return elem.nodeType === 1;
    }));
  };
  jQuery.fn.extend({
    find: function(selector) {
      var i,
          len = this.length,
          ret = [],
          self = this;
      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function() {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }
      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
      ret.selector = this.selector ? this.selector + " " + selector : selector;
      return ret;
    },
    filter: function(selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function(selector) {
      return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    }
  });
  var rootjQuery,
      rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      init = jQuery.fn.init = function(selector, context, root) {
        var match,
            elem;
        if (!selector) {
          return this;
        }
        root = root || rootjQuery;
        if (typeof selector === "string") {
          if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
            match = [null, selector, null];
          } else {
            match = rquickExpr.exec(selector);
          }
          if (match && (match[1] || !context)) {
            if (match[1]) {
              context = context instanceof jQuery ? context[0] : context;
              jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
              if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                for (match in context) {
                  if (jQuery.isFunction(this[match])) {
                    this[match](context[match]);
                  } else {
                    this.attr(match, context[match]);
                  }
                }
              }
              return this;
            } else {
              elem = document.getElementById(match[2]);
              if (elem && elem.parentNode) {
                this.length = 1;
                this[0] = elem;
              }
              this.context = document;
              this.selector = selector;
              return this;
            }
          } else if (!context || context.jquery) {
            return (context || root).find(selector);
          } else {
            return this.constructor(context).find(selector);
          }
        } else if (selector.nodeType) {
          this.context = this[0] = selector;
          this.length = 1;
          return this;
        } else if (jQuery.isFunction(selector)) {
          return root.ready !== undefined ? root.ready(selector) : selector(jQuery);
        }
        if (selector.selector !== undefined) {
          this.selector = selector.selector;
          this.context = selector.context;
        }
        return jQuery.makeArray(selector, this);
      };
  init.prototype = jQuery.fn;
  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
      guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
      };
  jQuery.fn.extend({
    has: function(target) {
      var targets = jQuery(target, this),
          l = targets.length;
      return this.filter(function() {
        var i = 0;
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function(selectors, context) {
      var cur,
          i = 0,
          l = this.length,
          matched = [],
          pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
      for (; i < l; i++) {
        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
          if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
            matched.push(cur);
            break;
          }
        }
      }
      return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
    },
    index: function(elem) {
      if (!elem) {
        return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
      }
      if (typeof elem === "string") {
        return indexOf.call(jQuery(elem), this[0]);
      }
      return indexOf.call(this, elem.jquery ? elem[0] : elem);
    },
    add: function(selector, context) {
      return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
    },
    addBack: function(selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur;
  }
  jQuery.each({
    parent: function(elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function(elem) {
      return dir(elem, "parentNode");
    },
    parentsUntil: function(elem, i, until) {
      return dir(elem, "parentNode", until);
    },
    next: function(elem) {
      return sibling(elem, "nextSibling");
    },
    prev: function(elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll: function(elem) {
      return dir(elem, "nextSibling");
    },
    prevAll: function(elem) {
      return dir(elem, "previousSibling");
    },
    nextUntil: function(elem, i, until) {
      return dir(elem, "nextSibling", until);
    },
    prevUntil: function(elem, i, until) {
      return dir(elem, "previousSibling", until);
    },
    siblings: function(elem) {
      return siblings((elem.parentNode || {}).firstChild, elem);
    },
    children: function(elem) {
      return siblings(elem.firstChild);
    },
    contents: function(elem) {
      return elem.contentDocument || jQuery.merge([], elem.childNodes);
    }
  }, function(name, fn) {
    jQuery.fn[name] = function(until, selector) {
      var matched = jQuery.map(this, fn, until);
      if (name.slice(-5) !== "Until") {
        selector = until;
      }
      if (selector && typeof selector === "string") {
        matched = jQuery.filter(selector, matched);
      }
      if (this.length > 1) {
        if (!guaranteedUnique[name]) {
          jQuery.uniqueSort(matched);
        }
        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }
      return this.pushStack(matched);
    };
  });
  var rnotwhite = (/\S+/g);
  function createOptions(options) {
    var object = {};
    jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
      object[flag] = true;
    });
    return object;
  }
  jQuery.Callbacks = function(options) {
    options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
    var firing,
        memory,
        fired,
        locked,
        list = [],
        queue = [],
        firingIndex = -1,
        fire = function() {
          locked = options.once;
          fired = firing = true;
          for (; queue.length; firingIndex = -1) {
            memory = queue.shift();
            while (++firingIndex < list.length) {
              if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                firingIndex = list.length;
                memory = false;
              }
            }
          }
          if (!options.memory) {
            memory = false;
          }
          firing = false;
          if (locked) {
            if (memory) {
              list = [];
            } else {
              list = "";
            }
          }
        },
        self = {
          add: function() {
            if (list) {
              if (memory && !firing) {
                firingIndex = list.length - 1;
                queue.push(memory);
              }
              (function add(args) {
                jQuery.each(args, function(_, arg) {
                  if (jQuery.isFunction(arg)) {
                    if (!options.unique || !self.has(arg)) {
                      list.push(arg);
                    }
                  } else if (arg && arg.length && jQuery.type(arg) !== "string") {
                    add(arg);
                  }
                });
              })(arguments);
              if (memory && !firing) {
                fire();
              }
            }
            return this;
          },
          remove: function() {
            jQuery.each(arguments, function(_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (index <= firingIndex) {
                  firingIndex--;
                }
              }
            });
            return this;
          },
          has: function(fn) {
            return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
          },
          empty: function() {
            if (list) {
              list = [];
            }
            return this;
          },
          disable: function() {
            locked = queue = [];
            list = memory = "";
            return this;
          },
          disabled: function() {
            return !list;
          },
          lock: function() {
            locked = queue = [];
            if (!memory) {
              list = memory = "";
            }
            return this;
          },
          locked: function() {
            return !!locked;
          },
          fireWith: function(context, args) {
            if (!locked) {
              args = args || [];
              args = [context, args.slice ? args.slice() : args];
              queue.push(args);
              if (!firing) {
                fire();
              }
            }
            return this;
          },
          fire: function() {
            self.fireWith(this, arguments);
            return this;
          },
          fired: function() {
            return !!fired;
          }
        };
    return self;
  };
  jQuery.extend({
    Deferred: function(func) {
      var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
          state = "pending",
          promise = {
            state: function() {
              return state;
            },
            always: function() {
              deferred.done(arguments).fail(arguments);
              return this;
            },
            then: function() {
              var fns = arguments;
              return jQuery.Deferred(function(newDefer) {
                jQuery.each(tuples, function(i, tuple) {
                  var fn = jQuery.isFunction(fns[i]) && fns[i];
                  deferred[tuple[1]](function() {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && jQuery.isFunction(returned.promise)) {
                      returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                    } else {
                      newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                    }
                  });
                });
                fns = null;
              }).promise();
            },
            promise: function(obj) {
              return obj != null ? jQuery.extend(obj, promise) : promise;
            }
          },
          deferred = {};
      promise.pipe = promise.then;
      jQuery.each(tuples, function(i, tuple) {
        var list = tuple[2],
            stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function() {
            state = stateString;
          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }
        deferred[tuple[0]] = function() {
          deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
          return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred);
      }
      return deferred;
    },
    when: function(subordinate) {
      var i = 0,
          resolveValues = slice.call(arguments),
          length = resolveValues.length,
          remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
          deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
          updateFunc = function(i, contexts, values) {
            return function(value) {
              contexts[i] = this;
              values[i] = arguments.length > 1 ? slice.call(arguments) : value;
              if (values === progressValues) {
                deferred.notifyWith(contexts, values);
              } else if (!(--remaining)) {
                deferred.resolveWith(contexts, values);
              }
            };
          },
          progressValues,
          progressContexts,
          resolveContexts;
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject);
          } else {
            --remaining;
          }
        }
      }
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues);
      }
      return deferred.promise();
    }
  });
  var readyList;
  jQuery.fn.ready = function(fn) {
    jQuery.ready.promise().done(fn);
    return this;
  };
  jQuery.extend({
    isReady: false,
    readyWait: 1,
    holdReady: function(hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready: function(wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }
      jQuery.isReady = true;
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }
      readyList.resolveWith(document, [jQuery]);
      if (jQuery.fn.triggerHandler) {
        jQuery(document).triggerHandler("ready");
        jQuery(document).off("ready");
      }
    }
  });
  function completed() {
    document.removeEventListener("DOMContentLoaded", completed);
    window.removeEventListener("load", completed);
    jQuery.ready();
  }
  jQuery.ready.promise = function(obj) {
    if (!readyList) {
      readyList = jQuery.Deferred();
      if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
        window.setTimeout(jQuery.ready);
      } else {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
      }
    }
    return readyList.promise(obj);
  };
  jQuery.ready.promise();
  var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
        len = elems.length,
        bulk = key == null;
    if (jQuery.type(key) === "object") {
      chainable = true;
      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      }
    } else if (value !== undefined) {
      chainable = true;
      if (!jQuery.isFunction(value)) {
        raw = true;
      }
      if (bulk) {
        if (raw) {
          fn.call(elems, value);
          fn = null;
        } else {
          bulk = fn;
          fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }
      if (fn) {
        for (; i < len; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }
    return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
  };
  var acceptData = function(owner) {
    return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
  };
  function Data() {
    this.expando = jQuery.expando + Data.uid++;
  }
  Data.uid = 1;
  Data.prototype = {
    register: function(owner, initial) {
      var value = initial || {};
      if (owner.nodeType) {
        owner[this.expando] = value;
      } else {
        Object.defineProperty(owner, this.expando, {
          value: value,
          writable: true,
          configurable: true
        });
      }
      return owner[this.expando];
    },
    cache: function(owner) {
      if (!acceptData(owner)) {
        return {};
      }
      var value = owner[this.expando];
      if (!value) {
        value = {};
        if (acceptData(owner)) {
          if (owner.nodeType) {
            owner[this.expando] = value;
          } else {
            Object.defineProperty(owner, this.expando, {
              value: value,
              configurable: true
            });
          }
        }
      }
      return value;
    },
    set: function(owner, data, value) {
      var prop,
          cache = this.cache(owner);
      if (typeof data === "string") {
        cache[data] = value;
      } else {
        for (prop in data) {
          cache[prop] = data[prop];
        }
      }
      return cache;
    },
    get: function(owner, key) {
      return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][key];
    },
    access: function(owner, key, value) {
      var stored;
      if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
        stored = this.get(owner, key);
        return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
      }
      this.set(owner, key, value);
      return value !== undefined ? value : key;
    },
    remove: function(owner, key) {
      var i,
          name,
          camel,
          cache = owner[this.expando];
      if (cache === undefined) {
        return;
      }
      if (key === undefined) {
        this.register(owner);
      } else {
        if (jQuery.isArray(key)) {
          name = key.concat(key.map(jQuery.camelCase));
        } else {
          camel = jQuery.camelCase(key);
          if (key in cache) {
            name = [key, camel];
          } else {
            name = camel;
            name = name in cache ? [name] : (name.match(rnotwhite) || []);
          }
        }
        i = name.length;
        while (i--) {
          delete cache[name[i]];
        }
      }
      if (key === undefined || jQuery.isEmptyObject(cache)) {
        if (owner.nodeType) {
          owner[this.expando] = undefined;
        } else {
          delete owner[this.expando];
        }
      }
    },
    hasData: function(owner) {
      var cache = owner[this.expando];
      return cache !== undefined && !jQuery.isEmptyObject(cache);
    }
  };
  var dataPriv = new Data();
  var dataUser = new Data();
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      rmultiDash = /[A-Z]/g;
  function dataAttr(elem, key, data) {
    var name;
    if (data === undefined && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === "string") {
        try {
          data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
        } catch (e) {}
        dataUser.set(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }
  jQuery.extend({
    hasData: function(elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem);
    },
    data: function(elem, name, data) {
      return dataUser.access(elem, name, data);
    },
    removeData: function(elem, name) {
      dataUser.remove(elem, name);
    },
    _data: function(elem, name, data) {
      return dataPriv.access(elem, name, data);
    },
    _removeData: function(elem, name) {
      dataPriv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    data: function(key, value) {
      var i,
          name,
          data,
          elem = this[0],
          attrs = elem && elem.attributes;
      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem);
          if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
            i = attrs.length;
            while (i--) {
              if (attrs[i]) {
                name = attrs[i].name;
                if (name.indexOf("data-") === 0) {
                  name = jQuery.camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }
            dataPriv.set(elem, "hasDataAttrs", true);
          }
        }
        return data;
      }
      if (typeof key === "object") {
        return this.each(function() {
          dataUser.set(this, key);
        });
      }
      return access(this, function(value) {
        var data,
            camelKey;
        if (elem && value === undefined) {
          data = dataUser.get(elem, key) || dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase());
          if (data !== undefined) {
            return data;
          }
          camelKey = jQuery.camelCase(key);
          data = dataUser.get(elem, camelKey);
          if (data !== undefined) {
            return data;
          }
          data = dataAttr(elem, camelKey, undefined);
          if (data !== undefined) {
            return data;
          }
          return;
        }
        camelKey = jQuery.camelCase(key);
        this.each(function() {
          var data = dataUser.get(this, camelKey);
          dataUser.set(this, camelKey, value);
          if (key.indexOf("-") > -1 && data !== undefined) {
            dataUser.set(this, key, value);
          }
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function(key) {
      return this.each(function() {
        dataUser.remove(this, key);
      });
    }
  });
  jQuery.extend({
    queue: function(elem, type, data) {
      var queue;
      if (elem) {
        type = (type || "fx") + "queue";
        queue = dataPriv.get(elem, type);
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type),
          startLength = queue.length,
          fn = queue.shift(),
          hooks = jQuery._queueHooks(elem, type),
          next = function() {
            jQuery.dequeue(elem, type);
          };
      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        if (type === "fx") {
          queue.unshift("inprogress");
        }
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    _queueHooks: function(elem, type) {
      var key = type + "queueHooks";
      return dataPriv.get(elem, key) || dataPriv.access(elem, key, {empty: jQuery.Callbacks("once memory").add(function() {
          dataPriv.remove(elem, [type + "queue", key]);
        })});
    }
  });
  jQuery.fn.extend({
    queue: function(type, data) {
      var setter = 2;
      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined ? this : this.each(function() {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function(type) {
      return this.each(function() {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function(type) {
      return this.queue(type || "fx", []);
    },
    promise: function(type, obj) {
      var tmp,
          count = 1,
          defer = jQuery.Deferred(),
          elements = this,
          i = this.length,
          resolve = function() {
            if (!(--count)) {
              defer.resolveWith(elements, [elements]);
            }
          };
      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }
      type = type || "fx";
      while (i--) {
        tmp = dataPriv.get(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
  var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var isHidden = function(elem, el) {
    elem = el || elem;
    return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
  };
  function adjustCSS(elem, prop, valueParts, tween) {
    var adjusted,
        scale = 1,
        maxIterations = 20,
        currentValue = tween ? function() {
          return tween.cur();
        } : function() {
          return jQuery.css(elem, prop, "");
        },
        initial = currentValue(),
        unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
        initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
    if (initialInUnit && initialInUnit[3] !== unit) {
      unit = unit || initialInUnit[3];
      valueParts = valueParts || [];
      initialInUnit = +initial || 1;
      do {
        scale = scale || ".5";
        initialInUnit = initialInUnit / scale;
        jQuery.style(elem, prop, initialInUnit + unit);
      } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
    }
    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0;
      adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted;
      }
    }
    return adjusted;
  }
  var rcheckableType = (/^(?:checkbox|radio)$/i);
  var rtagName = (/<([\w:-]+)/);
  var rscriptType = (/^$|\/(?:java|ecma)script/i);
  var wrapMap = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  function getAll(context, tag) {
    var ret = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : [];
    return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
  }
  function setGlobalEval(elems, refElements) {
    var i = 0,
        l = elems.length;
    for (; i < l; i++) {
      dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
    }
  }
  var rhtml = /<|&#?\w+;/;
  function buildFragment(elems, context, scripts, selection, ignored) {
    var elem,
        tmp,
        tag,
        wrap,
        contains,
        j,
        fragment = context.createDocumentFragment(),
        nodes = [],
        i = 0,
        l = elems.length;
    for (; i < l; i++) {
      elem = elems[i];
      if (elem || elem === 0) {
        if (jQuery.type(elem) === "object") {
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem));
        } else {
          tmp = tmp || fragment.appendChild(context.createElement("div"));
          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
          j = wrap[0];
          while (j--) {
            tmp = tmp.lastChild;
          }
          jQuery.merge(nodes, tmp.childNodes);
          tmp = fragment.firstChild;
          tmp.textContent = "";
        }
      }
    }
    fragment.textContent = "";
    i = 0;
    while ((elem = nodes[i++])) {
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem);
        }
        continue;
      }
      contains = jQuery.contains(elem.ownerDocument, elem);
      tmp = getAll(fragment.appendChild(elem), "script");
      if (contains) {
        setGlobalEval(tmp);
      }
      if (scripts) {
        j = 0;
        while ((elem = tmp[j++])) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem);
          }
        }
      }
    }
    return fragment;
  }
  (function() {
    var fragment = document.createDocumentFragment(),
        div = fragment.appendChild(document.createElement("div")),
        input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input);
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
  })();
  var rkeyEvent = /^key/,
      rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }
  function on(elem, types, selector, data, fn, one) {
    var origFn,
        type;
    if (typeof types === "object") {
      if (typeof selector !== "string") {
        data = data || selector;
        selector = undefined;
      }
      for (type in types) {
        on(elem, type, selector, data, types[type], one);
      }
      return elem;
    }
    if (data == null && fn == null) {
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === "string") {
        fn = data;
        data = undefined;
      } else {
        fn = data;
        data = selector;
        selector = undefined;
      }
    }
    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return elem;
    }
    if (one === 1) {
      origFn = fn;
      fn = function(event) {
        jQuery().off(event);
        return origFn.apply(this, arguments);
      };
      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }
    return elem.each(function() {
      jQuery.event.add(this, types, fn, data, selector);
    });
  }
  jQuery.event = {
    global: {},
    add: function(elem, types, handler, data, selector) {
      var handleObjIn,
          eventHandle,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.get(elem);
      if (!elemData) {
        return;
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }
      if (!(events = elemData.events)) {
        events = elemData.events = {};
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function(e) {
          return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
        };
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery.event.special[type] || {};
        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn);
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }
        jQuery.event.global[type] = true;
      }
    },
    remove: function(elem, types, handler, selector, mappedTypes) {
      var j,
          origCount,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }
        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }
      if (jQuery.isEmptyObject(events)) {
        dataPriv.remove(elem, "handle events");
      }
    },
    dispatch: function(event) {
      event = jQuery.event.fix(event);
      var i,
          j,
          ret,
          matched,
          handleObj,
          handlerQueue = [],
          args = slice.call(arguments),
          handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
          special = jQuery.event.special[event.type] || {};
      args[0] = event;
      event.delegateTarget = this;
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    handlers: function(event, handlers) {
      var i,
          matches,
          sel,
          handleObj,
          handlerQueue = [],
          delegateCount = handlers.delegateCount,
          cur = event.target;
      if (delegateCount && cur.nodeType && (event.type !== "click" || isNaN(event.button) || event.button < 1)) {
        for (; cur !== this; cur = cur.parentNode || this) {
          if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
            matches = [];
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector + " ";
              if (matches[sel] === undefined) {
                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
              }
              if (matches[sel]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matches
              });
            }
          }
        }
      }
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: this,
          handlers: handlers.slice(delegateCount)
        });
      }
      return handlerQueue;
    },
    props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(event, original) {
        if (event.which == null) {
          event.which = original.charCode != null ? original.charCode : original.keyCode;
        }
        return event;
      }
    },
    mouseHooks: {
      props: ("button buttons clientX clientY offsetX offsetY pageX pageY " + "screenX screenY toElement").split(" "),
      filter: function(event, original) {
        var eventDoc,
            doc,
            body,
            button = original.button;
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }
        if (!event.which && button !== undefined) {
          event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
        }
        return event;
      }
    },
    fix: function(event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i,
          prop,
          copy,
          type = event.type,
          originalEvent = event,
          fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      while (i--) {
        prop = copy[i];
        event[prop] = originalEvent[prop];
      }
      if (!event.target) {
        event.target = document;
      }
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode;
      }
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    special: {
      load: {noBubble: true},
      focus: {
        trigger: function() {
          if (this !== safeActiveElement() && this.focus) {
            this.focus();
            return false;
          }
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false;
          }
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
            this.click();
            return false;
          }
        },
        _default: function(event) {
          return jQuery.nodeName(event.target, "a");
        }
      },
      beforeunload: {postDispatch: function(event) {
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }}
    }
  };
  jQuery.removeEvent = function(elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };
  jQuery.Event = function(src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
    } else {
      this.type = src;
    }
    if (props) {
      jQuery.extend(this, props);
    }
    this.timeStamp = src && src.timeStamp || jQuery.now();
    this[jQuery.expando] = true;
  };
  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (e) {
        e.preventDefault();
      }
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (e) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;
      if (e) {
        e.stopImmediatePropagation();
      }
      this.stopPropagation();
    }
  };
  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function(event) {
        var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj;
        if (!related || (related !== target && !jQuery.contains(target, related))) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });
  jQuery.fn.extend({
    on: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn);
    },
    one: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn, 1);
    },
    off: function(types, selector, fn) {
      var handleObj,
          type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }
      if (typeof types === "object") {
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === "function") {
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function() {
        jQuery.event.remove(this, types, fn, selector);
      });
    }
  });
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
      rnoInnerhtml = /<script|<style|<link/i,
      rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
      rscriptTypeMasked = /^true\/(.*)/,
      rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
  }
  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem;
  }
  function restoreScript(elem) {
    var match = rscriptTypeMasked.exec(elem.type);
    if (match) {
      elem.type = match[1];
    } else {
      elem.removeAttribute("type");
    }
    return elem;
  }
  function cloneCopyEvent(src, dest) {
    var i,
        l,
        type,
        pdataOld,
        pdataCur,
        udataOld,
        udataCur,
        events;
    if (dest.nodeType !== 1) {
      return;
    }
    if (dataPriv.hasData(src)) {
      pdataOld = dataPriv.access(src);
      pdataCur = dataPriv.set(dest, pdataOld);
      events = pdataOld.events;
      if (events) {
        delete pdataCur.handle;
        pdataCur.events = {};
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    }
    if (dataUser.hasData(src)) {
      udataOld = dataUser.access(src);
      udataCur = jQuery.extend({}, udataOld);
      dataUser.set(dest, udataCur);
    }
  }
  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();
    if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked;
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }
  function domManip(collection, args, callback, ignored) {
    args = concat.apply([], args);
    var fragment,
        first,
        scripts,
        hasScripts,
        node,
        doc,
        i = 0,
        l = collection.length,
        iNoClone = l - 1,
        value = args[0],
        isFunction = jQuery.isFunction(value);
    if (isFunction || (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
      return collection.each(function(index) {
        var self = collection.eq(index);
        if (isFunction) {
          args[0] = value.call(this, index, self.html());
        }
        domManip(self, args, callback, ignored);
      });
    }
    if (l) {
      fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
      first = fragment.firstChild;
      if (fragment.childNodes.length === 1) {
        fragment = first;
      }
      if (first || ignored) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length;
        for (; i < l; i++) {
          node = fragment;
          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true);
            if (hasScripts) {
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }
          callback.call(collection[i], node, i);
        }
        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument;
          jQuery.map(scripts, restoreScript);
          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];
            if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
              if (node.src) {
                if (jQuery._evalUrl) {
                  jQuery._evalUrl(node.src);
                }
              } else {
                jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
              }
            }
          }
        }
      }
    }
    return collection;
  }
  function remove(elem, selector, keepData) {
    var node,
        nodes = selector ? jQuery.filter(selector, elem) : elem,
        i = 0;
    for (; (node = nodes[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery.cleanData(getAll(node));
      }
      if (node.parentNode) {
        if (keepData && jQuery.contains(node.ownerDocument, node)) {
          setGlobalEval(getAll(node, "script"));
        }
        node.parentNode.removeChild(node);
      }
    }
    return elem;
  }
  jQuery.extend({
    htmlPrefilter: function(html) {
      return html.replace(rxhtmlTag, "<$1></$2>");
    },
    clone: function(elem, dataAndEvents, deepDataAndEvents) {
      var i,
          l,
          srcElements,
          destElements,
          clone = elem.cloneNode(true),
          inPage = jQuery.contains(elem.ownerDocument, elem);
      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      destElements = getAll(clone, "script");
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      }
      return clone;
    },
    cleanData: function(elems) {
      var data,
          elem,
          type,
          special = jQuery.event.special,
          i = 0;
      for (; (elem = elems[i]) !== undefined; i++) {
        if (acceptData(elem)) {
          if ((data = elem[dataPriv.expando])) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }
            elem[dataPriv.expando] = undefined;
          }
          if (elem[dataUser.expando]) {
            elem[dataUser.expando] = undefined;
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    domManip: domManip,
    detach: function(selector) {
      return remove(this, selector, true);
    },
    remove: function(selector) {
      return remove(this, selector);
    },
    text: function(value) {
      return access(this, function(value) {
        return value === undefined ? jQuery.text(this) : this.empty().each(function() {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            this.textContent = value;
          }
        });
      }, null, value, arguments.length);
    },
    append: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    empty: function() {
      var elem,
          i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem, false));
          elem.textContent = "";
        }
      }
      return this;
    },
    clone: function(dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function() {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function(value) {
      return access(this, function(value) {
        var elem = this[0] || {},
            i = 0,
            l = this.length;
        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        }
        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
          value = jQuery.htmlPrefilter(value);
          try {
            for (; i < l; i++) {
              elem = this[i] || {};
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }
            elem = 0;
          } catch (e) {}
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function() {
      var ignored = [];
      return domManip(this, arguments, function(elem) {
        var parent = this.parentNode;
        if (jQuery.inArray(this, ignored) < 0) {
          jQuery.cleanData(getAll(this));
          if (parent) {
            parent.replaceChild(elem, this);
          }
        }
      }, ignored);
    }
  });
  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(name, original) {
    jQuery.fn[name] = function(selector) {
      var elems,
          ret = [],
          insert = jQuery(selector),
          last = insert.length - 1,
          i = 0;
      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);
        push.apply(ret, elems.get());
      }
      return this.pushStack(ret);
    };
  });
  var iframe,
      elemdisplay = {
        HTML: "block",
        BODY: "block"
      };
  function actualDisplay(name, doc) {
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
        display = jQuery.css(elem[0], "display");
    elem.detach();
    return display;
  }
  function defaultDisplay(nodeName) {
    var doc = document,
        display = elemdisplay[nodeName];
    if (!display) {
      display = actualDisplay(nodeName, doc);
      if (display === "none" || !display) {
        iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
        doc = iframe[0].contentDocument;
        doc.write();
        doc.close();
        display = actualDisplay(nodeName, doc);
        iframe.detach();
      }
      elemdisplay[nodeName] = display;
    }
    return display;
  }
  var rmargin = (/^margin/);
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
  var getStyles = function(elem) {
    var view = elem.ownerDocument.defaultView;
    if (!view || !view.opener) {
      view = window;
    }
    return view.getComputedStyle(elem);
  };
  var swap = function(elem, options, callback, args) {
    var ret,
        name,
        old = {};
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }
    ret = callback.apply(elem, args || []);
    for (name in options) {
      elem.style[name] = old[name];
    }
    return ret;
  };
  var documentElement = document.documentElement;
  (function() {
    var pixelPositionVal,
        boxSizingReliableVal,
        pixelMarginRightVal,
        reliableMarginLeftVal,
        container = document.createElement("div"),
        div = document.createElement("div");
    if (!div.style) {
      return;
    }
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
    container.appendChild(div);
    function computeStyleTests() {
      div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
      div.innerHTML = "";
      documentElement.appendChild(container);
      var divStyle = window.getComputedStyle(div);
      pixelPositionVal = divStyle.top !== "1%";
      reliableMarginLeftVal = divStyle.marginLeft === "2px";
      boxSizingReliableVal = divStyle.width === "4px";
      div.style.marginRight = "50%";
      pixelMarginRightVal = divStyle.marginRight === "4px";
      documentElement.removeChild(container);
    }
    jQuery.extend(support, {
      pixelPosition: function() {
        computeStyleTests();
        return pixelPositionVal;
      },
      boxSizingReliable: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return boxSizingReliableVal;
      },
      pixelMarginRight: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return pixelMarginRightVal;
      },
      reliableMarginLeft: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return reliableMarginLeftVal;
      },
      reliableMarginRight: function() {
        var ret,
            marginDiv = div.appendChild(document.createElement("div"));
        marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;" + "display:block;margin:0;border:0;padding:0";
        marginDiv.style.marginRight = marginDiv.style.width = "0";
        div.style.width = "1px";
        documentElement.appendChild(container);
        ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight);
        documentElement.removeChild(container);
        div.removeChild(marginDiv);
        return ret;
      }
    });
  })();
  function curCSS(elem, name, computed) {
    var width,
        minWidth,
        maxWidth,
        ret,
        style = elem.style;
    computed = computed || getStyles(elem);
    ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;
    if ((ret === "" || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
      ret = jQuery.style(elem, name);
    }
    if (computed) {
      if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }
    return ret !== undefined ? ret + "" : ret;
  }
  function addGetHookIf(conditionFn, hookFn) {
    return {get: function() {
        if (conditionFn()) {
          delete this.get;
          return;
        }
        return (this.get = hookFn).apply(this, arguments);
      }};
  }
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
      cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
      },
      cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
      },
      cssPrefixes = ["Webkit", "O", "Moz", "ms"],
      emptyStyle = document.createElement("div").style;
  function vendorPropName(name) {
    if (name in emptyStyle) {
      return name;
    }
    var capName = name[0].toUpperCase() + name.slice(1),
        i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in emptyStyle) {
        return name;
      }
    }
  }
  function setPositiveNumber(elem, value, subtract) {
    var matches = rcssNum.exec(value);
    return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
        val = 0;
    for (; i < 4; i += 2) {
      if (extra === "margin") {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        if (extra === "content") {
          val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }
        if (extra !== "margin") {
          val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      } else {
        val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        if (extra !== "padding") {
          val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    var valueIsBorderBox = true,
        val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
        styles = getStyles(elem),
        isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
    if (document.msFullscreenElement && window.top !== window) {
      if (elem.getClientRects().length) {
        val = Math.round(elem.getBoundingClientRect()[name] * 100);
      }
    }
    if (val <= 0 || val == null) {
      val = curCSS(elem, name, styles);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }
      if (rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
      val = parseFloat(val) || 0;
    }
    return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
  }
  function showHide(elements, show) {
    var display,
        elem,
        hidden,
        values = [],
        index = 0,
        length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      values[index] = dataPriv.get(elem, "olddisplay");
      display = elem.style.display;
      if (show) {
        if (!values[index] && display === "none") {
          elem.style.display = "";
        }
        if (elem.style.display === "" && isHidden(elem)) {
          values[index] = dataPriv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
        }
      } else {
        hidden = isHidden(elem);
        if (display !== "none" || !hidden) {
          dataPriv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
        }
      }
    }
    for (index = 0; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      if (!show || elem.style.display === "none" || elem.style.display === "") {
        elem.style.display = show ? values[index] || "" : "none";
      }
    }
    return elements;
  }
  jQuery.extend({
    cssHooks: {opacity: {get: function(elem, computed) {
          if (computed) {
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }}},
    cssNumber: {
      "animationIterationCount": true,
      "columnCount": true,
      "fillOpacity": true,
      "flexGrow": true,
      "flexShrink": true,
      "fontWeight": true,
      "lineHeight": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "widows": true,
      "zIndex": true,
      "zoom": true
    },
    cssProps: {"float": "cssFloat"},
    style: function(elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }
      var ret,
          type,
          hooks,
          origName = jQuery.camelCase(name),
          style = elem.style;
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (value !== undefined) {
        type = typeof value;
        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret);
          type = "number";
        }
        if (value == null || value !== value) {
          return;
        }
        if (type === "number") {
          value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
        }
        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit";
        }
        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          style[name] = value;
        }
      } else {
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        }
        return style[name];
      }
    },
    css: function(elem, name, extra, styles) {
      var val,
          num,
          hooks,
          origName = jQuery.camelCase(name);
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      }
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }
      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }
      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val;
      }
      return val;
    }
  });
  jQuery.each(["height", "width"], function(i, name) {
    jQuery.cssHooks[name] = {
      get: function(elem, computed, extra) {
        if (computed) {
          return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? swap(elem, cssShow, function() {
            return getWidthOrHeight(elem, name, extra);
          }) : getWidthOrHeight(elem, name, extra);
        }
      },
      set: function(elem, value, extra) {
        var matches,
            styles = extra && getStyles(elem),
            subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);
        if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
          elem.style[name] = value;
          value = jQuery.css(elem, name);
        }
        return setPositiveNumber(elem, value, subtract);
      }
    };
  });
  jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
    if (computed) {
      return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {marginLeft: 0}, function() {
        return elem.getBoundingClientRect().left;
      })) + "px";
    }
  });
  jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
    if (computed) {
      return swap(elem, {"display": "inline-block"}, curCSS, [elem, "marginRight"]);
    }
  });
  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {expand: function(value) {
        var i = 0,
            expanded = {},
            parts = typeof value === "string" ? value.split(" ") : [value];
        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }};
    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    css: function(name, value) {
      return access(this, function(elem, name, value) {
        var styles,
            len,
            map = {},
            i = 0;
        if (jQuery.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;
          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show: function() {
      return showHide(this, true);
    },
    hide: function() {
      return showHide(this);
    },
    toggle: function(state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }
      return this.each(function() {
        if (isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function(elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || jQuery.easing._default;
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur: function() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function(percent) {
      var eased,
          hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {_default: {
      get: function(tween) {
        var result;
        if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
          return tween.elem[tween.prop];
        }
        result = jQuery.css(tween.elem, tween.prop, "");
        return !result || result === "auto" ? 0 : result;
      },
      set: function(tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }};
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {set: function(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }};
  jQuery.easing = {
    linear: function(p) {
      return p;
    },
    swing: function(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    _default: "swing"
  };
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.step = {};
  var fxNow,
      timerId,
      rfxtypes = /^(?:toggle|show|hide)$/,
      rrun = /queueHooks$/;
  function createFxNow() {
    window.setTimeout(function() {
      fxNow = undefined;
    });
    return (fxNow = jQuery.now());
  }
  function genFx(type, includeWidth) {
    var which,
        i = 0,
        attrs = {height: type};
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  function createTween(value, prop, animation) {
    var tween,
        collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
        index = 0,
        length = collection.length;
    for (; index < length; index++) {
      if ((tween = collection[index].call(animation, prop, value))) {
        return tween;
      }
    }
  }
  function defaultPrefilter(elem, props, opts) {
    var prop,
        value,
        toggle,
        tween,
        hooks,
        oldfire,
        display,
        checkDisplay,
        anim = this,
        orig = {},
        style = elem.style,
        hidden = elem.nodeType && isHidden(elem),
        dataShow = dataPriv.get(elem, "fxshow");
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function() {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function() {
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
      display = jQuery.css(elem, "display");
      checkDisplay = display === "none" ? dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
      if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
        style.display = "inline-block";
      }
    }
    if (opts.overflow) {
      style.overflow = "hidden";
      anim.always(function() {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.exec(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";
        if (value === (hidden ? "hide" : "show")) {
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true;
          } else {
            continue;
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      } else {
        display = undefined;
      }
    }
    if (!jQuery.isEmptyObject(orig)) {
      if (dataShow) {
        if ("hidden" in dataShow) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = dataPriv.access(elem, "fxshow", {});
      }
      if (toggle) {
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function() {
          jQuery(elem).hide();
        });
      }
      anim.done(function() {
        var prop;
        dataPriv.remove(elem, "fxshow");
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            tween.start = prop === "width" || prop === "height" ? 1 : 0;
          }
        }
      }
    } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
      style.display = display;
    }
  }
  function propFilter(props, specialEasing) {
    var index,
        name,
        easing,
        value,
        hooks;
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  function Animation(elem, properties, options) {
    var result,
        stopped,
        index = 0,
        length = Animation.prefilters.length,
        deferred = jQuery.Deferred().always(function() {
          delete tick.elem;
        }),
        tick = function() {
          if (stopped) {
            return false;
          }
          var currentTime = fxNow || createFxNow(),
              remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
              temp = remaining / animation.duration || 0,
              percent = 1 - temp,
              index = 0,
              length = animation.tweens.length;
          for (; index < length; index++) {
            animation.tweens[index].run(percent);
          }
          deferred.notifyWith(elem, [animation, percent, remaining]);
          if (percent < 1 && length) {
            return remaining;
          } else {
            deferred.resolveWith(elem, [animation]);
            return false;
          }
        },
        animation = deferred.promise({
          elem: elem,
          props: jQuery.extend({}, properties),
          opts: jQuery.extend(true, {
            specialEasing: {},
            easing: jQuery.easing._default
          }, options),
          originalProperties: properties,
          originalOptions: options,
          startTime: fxNow || createFxNow(),
          duration: options.duration,
          tweens: [],
          createTween: function(prop, end) {
            var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
            animation.tweens.push(tween);
            return tween;
          },
          stop: function(gotoEnd) {
            var index = 0,
                length = gotoEnd ? animation.tweens.length : 0;
            if (stopped) {
              return this;
            }
            stopped = true;
            for (; index < length; index++) {
              animation.tweens[index].run(1);
            }
            if (gotoEnd) {
              deferred.notifyWith(elem, [animation, 1, 0]);
              deferred.resolveWith(elem, [animation, gotoEnd]);
            } else {
              deferred.rejectWith(elem, [animation, gotoEnd]);
            }
            return this;
          }
        }),
        props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        if (jQuery.isFunction(result.stop)) {
          jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
        }
        return result;
      }
    }
    jQuery.map(props, createTween, animation);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweeners: {"*": [function(prop, value) {
        var tween = this.createTween(prop, value);
        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
        return tween;
      }]},
    tweener: function(props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = ["*"];
      } else {
        props = props.match(rnotwhite);
      }
      var prop,
          index = 0,
          length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
        Animation.tweeners[prop].unshift(callback);
      }
    },
    prefilters: [defaultPrefilter],
    prefilter: function(callback, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(callback);
      } else {
        Animation.prefilters.push(callback);
      }
    }
  });
  jQuery.speed = function(speed, easing, fn) {
    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
    };
    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    }
    opt.old = opt.complete;
    opt.complete = function() {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.fn.extend({
    fadeTo: function(speed, to, easing, callback) {
      return this.filter(isHidden).css("opacity", 0).show().end().animate({opacity: to}, speed, easing, callback);
    },
    animate: function(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
          optall = jQuery.speed(speed, easing, callback),
          doAnimation = function() {
            var anim = Animation(this, jQuery.extend({}, prop), optall);
            if (empty || dataPriv.get(this, "finish")) {
              anim.stop(true);
            }
          };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function(type, clearQueue, gotoEnd) {
      var stopQueue = function(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue && type !== false) {
        this.queue(type || "fx", []);
      }
      return this.each(function() {
        var dequeue = true,
            index = type != null && type + "queueHooks",
            timers = jQuery.timers,
            data = dataPriv.get(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function(type) {
      if (type !== false) {
        type = type || "fx";
      }
      return this.each(function() {
        var index,
            data = dataPriv.get(this),
            queue = data[type + "queue"],
            hooks = data[type + "queueHooks"],
            timers = jQuery.timers,
            length = queue ? queue.length : 0;
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        delete data.finish;
      });
    }
  });
  jQuery.each(["toggle", "show", "hide"], function(i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function(speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  });
  jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: {opacity: "show"},
    fadeOut: {opacity: "hide"},
    fadeToggle: {opacity: "toggle"}
  }, function(name, props) {
    jQuery.fn[name] = function(speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.timers = [];
  jQuery.fx.tick = function() {
    var timer,
        i = 0,
        timers = jQuery.timers;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function(timer) {
    jQuery.timers.push(timer);
    if (timer()) {
      jQuery.fx.start();
    } else {
      jQuery.timers.pop();
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function() {
    if (!timerId) {
      timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  jQuery.fx.stop = function() {
    window.clearInterval(timerId);
    timerId = null;
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  };
  jQuery.fn.delay = function(time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function(next, hooks) {
      var timeout = window.setTimeout(next, time);
      hooks.stop = function() {
        window.clearTimeout(timeout);
      };
    });
  };
  (function() {
    var input = document.createElement("input"),
        select = document.createElement("select"),
        opt = select.appendChild(document.createElement("option"));
    input.type = "checkbox";
    support.checkOn = input.value !== "";
    support.optSelected = opt.selected;
    select.disabled = true;
    support.optDisabled = !opt.disabled;
    input = document.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";
  })();
  var boolHook,
      attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr: function(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function(name) {
      return this.each(function() {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr: function(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (typeof elem.getAttribute === "undefined") {
        return jQuery.prop(elem, name, value);
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = name.toLowerCase();
        hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        }
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        elem.setAttribute(name, value + "");
        return value;
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      ret = jQuery.find.attr(elem, name);
      return ret == null ? undefined : ret;
    },
    attrHooks: {type: {set: function(elem, value) {
          if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }}},
    removeAttr: function(elem, value) {
      var name,
          propName,
          i = 0,
          attrNames = value && value.match(rnotwhite);
      if (attrNames && elem.nodeType === 1) {
        while ((name = attrNames[i++])) {
          propName = jQuery.propFix[name] || name;
          if (jQuery.expr.match.bool.test(name)) {
            elem[propName] = false;
          }
          elem.removeAttribute(name);
        }
      }
    }
  });
  boolHook = {set: function(elem, value, name) {
      if (value === false) {
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }
      return name;
    }};
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;
    attrHandle[name] = function(elem, name, isXML) {
      var ret,
          handle;
      if (!isXML) {
        handle = attrHandle[name];
        attrHandle[name] = ret;
        ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
        attrHandle[name] = handle;
      }
      return ret;
    };
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i,
      rclickable = /^(?:a|area)$/i;
  jQuery.fn.extend({
    prop: function(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function(name) {
      return this.each(function() {
        delete this[jQuery.propFix[name] || name];
      });
    }
  });
  jQuery.extend({
    prop: function(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        return (elem[name] = value);
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      return elem[name];
    },
    propHooks: {tabIndex: {get: function(elem) {
          var tabindex = jQuery.find.attr(elem, "tabindex");
          return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
        }}},
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  });
  if (!support.optSelected) {
    jQuery.propHooks.selected = {get: function(elem) {
        var parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }
        return null;
      }};
  }
  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    jQuery.propFix[this.toLowerCase()] = this;
  });
  var rclass = /[\t\r\n\f]/g;
  function getClass(elem) {
    return elem.getAttribute && elem.getAttribute("class") || "";
  }
  jQuery.fn.extend({
    addClass: function(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).addClass(value.call(this, j, getClass(this)));
        });
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnotwhite) || [];
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            }
            finalValue = jQuery.trim(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }
      return this;
    },
    removeClass: function(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).removeClass(value.call(this, j, getClass(this)));
        });
      }
      if (!arguments.length) {
        return this.attr("class", "");
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnotwhite) || [];
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              while (cur.indexOf(" " + clazz + " ") > -1) {
                cur = cur.replace(" " + clazz + " ", " ");
              }
            }
            finalValue = jQuery.trim(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }
      return this;
    },
    toggleClass: function(value, stateVal) {
      var type = typeof value;
      if (typeof stateVal === "boolean" && type === "string") {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }
      if (jQuery.isFunction(value)) {
        return this.each(function(i) {
          jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
        });
      }
      return this.each(function() {
        var className,
            i,
            self,
            classNames;
        if (type === "string") {
          i = 0;
          self = jQuery(this);
          classNames = value.match(rnotwhite) || [];
          while ((className = classNames[i++])) {
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }
        } else if (value === undefined || type === "boolean") {
          className = getClass(this);
          if (className) {
            dataPriv.set(this, "__className__", className);
          }
          if (this.setAttribute) {
            this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
          }
        }
      });
    },
    hasClass: function(selector) {
      var className,
          elem,
          i = 0;
      className = " " + selector + " ";
      while ((elem = this[i++])) {
        if (elem.nodeType === 1 && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) {
          return true;
        }
      }
      return false;
    }
  });
  var rreturn = /\r/g;
  jQuery.fn.extend({val: function(value) {
      var hooks,
          ret,
          isFunction,
          elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
            return ret;
          }
          ret = elem.value;
          return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
        }
        return;
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function(i) {
        var val;
        if (this.nodeType !== 1) {
          return;
        }
        if (isFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }
        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (jQuery.isArray(val)) {
          val = jQuery.map(val, function(value) {
            return value == null ? "" : value + "";
          });
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val;
        }
      });
    }});
  jQuery.extend({valHooks: {
      option: {get: function(elem) {
          return jQuery.trim(elem.value);
        }},
      select: {
        get: function(elem) {
          var value,
              option,
              options = elem.options,
              index = elem.selectedIndex,
              one = elem.type === "select-one" || index < 0,
              values = one ? null : [],
              max = one ? index + 1 : options.length,
              i = index < 0 ? max : one ? index : 0;
          for (; i < max; i++) {
            option = options[i];
            if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
              value = jQuery(option).val();
              if (one) {
                return value;
              }
              values.push(value);
            }
          }
          return values;
        },
        set: function(elem, value) {
          var optionSet,
              option,
              options = elem.options,
              values = jQuery.makeArray(value),
              i = options.length;
          while (i--) {
            option = options[i];
            if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
              optionSet = true;
            }
          }
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    }});
  jQuery.each(["radio", "checkbox"], function() {
    jQuery.valHooks[this] = {set: function(elem, value) {
        if (jQuery.isArray(value)) {
          return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
        }
      }};
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function(elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  });
  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
  jQuery.extend(jQuery.event, {
    trigger: function(event, data, elem, onlyHandlers) {
      var i,
          cur,
          tmp,
          bubbleType,
          ontype,
          handle,
          special,
          eventPath = [elem || document],
          type = hasOwn.call(event, "type") ? event.type : event,
          namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = tmp = elem = elem || document;
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }
      if (type.indexOf(".") > -1) {
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(":") < 0 && "on" + type;
      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }
      data = data == null ? [event] : jQuery.makeArray(data, [event]);
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        event.type = i > 1 ? bubbleType : special.bindType || type;
        handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
        if (handle) {
          handle.apply(cur, data);
        }
        handle = ontype && cur[ontype];
        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);
          if (event.result === false) {
            event.preventDefault();
          }
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
          if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null;
            }
            jQuery.event.triggered = type;
            elem[type]();
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }
      return event.result;
    },
    simulate: function(type, elem, event) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true
      });
      jQuery.event.trigger(e, null, elem);
      if (e.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  });
  jQuery.fn.extend({
    trigger: function(type, data) {
      return this.each(function() {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function(type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  });
  jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
    jQuery.fn[name] = function(data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  });
  jQuery.fn.extend({hover: function(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }});
  support.focusin = "onfocusin" in window;
  if (!support.focusin) {
    jQuery.each({
      focus: "focusin",
      blur: "focusout"
    }, function(orig, fix) {
      var handler = function(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
      };
      jQuery.event.special[fix] = {
        setup: function() {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix);
          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }
          dataPriv.access(doc, fix, (attaches || 0) + 1);
        },
        teardown: function() {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix) - 1;
          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            dataPriv.remove(doc, fix);
          } else {
            dataPriv.access(doc, fix, attaches);
          }
        }
      };
    });
  }
  var location = window.location;
  var nonce = jQuery.now();
  var rquery = (/\?/);
  jQuery.parseJSON = function(data) {
    return JSON.parse(data + "");
  };
  jQuery.parseXML = function(data) {
    var xml;
    if (!data || typeof data !== "string") {
      return null;
    }
    try {
      xml = (new window.DOMParser()).parseFromString(data, "text/xml");
    } catch (e) {
      xml = undefined;
    }
    if (!xml || xml.getElementsByTagName("parsererror").length) {
      jQuery.error("Invalid XML: " + data);
    }
    return xml;
  };
  var rhash = /#.*$/,
      rts = /([?&])_=[^&]*/,
      rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
      rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      rnoContent = /^(?:GET|HEAD)$/,
      rprotocol = /^\/\//,
      prefilters = {},
      transports = {},
      allTypes = "*/".concat("*"),
      originAnchor = document.createElement("a");
  originAnchor.href = location.href;
  function addToPrefiltersOrTransports(structure) {
    return function(dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }
      var dataType,
          i = 0,
          dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
      if (jQuery.isFunction(func)) {
        while ((dataType = dataTypes[i++])) {
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func);
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {},
        seekingTransport = (structure === transports);
    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }
    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
  }
  function ajaxExtend(target, src) {
    var key,
        deep,
        flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
    return target;
  }
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct,
        type,
        finalDataType,
        firstDataType,
        contents = s.contents,
        dataTypes = s.dataTypes;
    while (dataTypes[0] === "*") {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }
      finalDataType = finalDataType || firstDataType;
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2,
        current,
        conv,
        tmp,
        prev,
        converters = {},
        dataTypes = s.dataTypes.slice();
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        if (current === "*") {
          current = prev;
        } else if (prev !== "*" && prev !== current) {
          conv = converters[prev + " " + current] || converters["* " + current];
          if (!conv) {
            for (conv2 in converters) {
              tmp = conv2.split(" ");
              if (tmp[1] === current) {
                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                if (conv) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }
          if (conv !== true) {
            if (conv && s.throws) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : "No conversion from " + prev + " to " + current
                };
              }
            }
          }
        }
      }
    }
    return {
      state: "success",
      data: response
    };
  }
  jQuery.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: location.href,
      type: "GET",
      isLocal: rlocalProtocol.test(location.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": true,
        "text json": jQuery.parseJSON,
        "text xml": jQuery.parseXML
      },
      flatOptions: {
        url: true,
        context: true
      }
    },
    ajaxSetup: function(target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function(url, options) {
      if (typeof url === "object") {
        options = url;
        url = undefined;
      }
      options = options || {};
      var transport,
          cacheURL,
          responseHeadersString,
          responseHeaders,
          timeoutTimer,
          urlAnchor,
          fireGlobals,
          i,
          s = jQuery.ajaxSetup({}, options),
          callbackContext = s.context || s,
          globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
          deferred = jQuery.Deferred(),
          completeDeferred = jQuery.Callbacks("once memory"),
          statusCode = s.statusCode || {},
          requestHeaders = {},
          requestHeadersNames = {},
          state = 0,
          strAbort = "canceled",
          jqXHR = {
            readyState: 0,
            getResponseHeader: function(key) {
              var match;
              if (state === 2) {
                if (!responseHeaders) {
                  responseHeaders = {};
                  while ((match = rheaders.exec(responseHeadersString))) {
                    responseHeaders[match[1].toLowerCase()] = match[2];
                  }
                }
                match = responseHeaders[key.toLowerCase()];
              }
              return match == null ? null : match;
            },
            getAllResponseHeaders: function() {
              return state === 2 ? responseHeadersString : null;
            },
            setRequestHeader: function(name, value) {
              var lname = name.toLowerCase();
              if (!state) {
                name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                requestHeaders[name] = value;
              }
              return this;
            },
            overrideMimeType: function(type) {
              if (!state) {
                s.mimeType = type;
              }
              return this;
            },
            statusCode: function(map) {
              var code;
              if (map) {
                if (state < 2) {
                  for (code in map) {
                    statusCode[code] = [statusCode[code], map[code]];
                  }
                } else {
                  jqXHR.always(map[jqXHR.status]);
                }
              }
              return this;
            },
            abort: function(statusText) {
              var finalText = statusText || strAbort;
              if (transport) {
                transport.abort(finalText);
              }
              done(0, finalText);
              return this;
            }
          };
      deferred.promise(jqXHR).complete = completeDeferred.add;
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
      s.url = ((url || s.url || location.href) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//");
      s.type = options.method || options.type || s.method || s.type;
      s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
      if (s.crossDomain == null) {
        urlAnchor = document.createElement("a");
        try {
          urlAnchor.href = s.url;
          urlAnchor.href = urlAnchor.href;
          s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
        } catch (e) {
          s.crossDomain = true;
        }
      }
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (state === 2) {
        return jqXHR;
      }
      fireGlobals = jQuery.event && s.global;
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
      }
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      cacheURL = s.url;
      if (!s.hasContent) {
        if (s.data) {
          cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
          delete s.data;
        }
        if (s.cache === false) {
          s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }
      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
        return jqXHR.abort();
      }
      strAbort = "abort";
      for (i in {
        success: 1,
        error: 1,
        complete: 1
      }) {
        jqXHR[i](s[i]);
      }
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }
        if (state === 2) {
          return jqXHR;
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = window.setTimeout(function() {
            jqXHR.abort("timeout");
          }, s.timeout);
        }
        try {
          state = 1;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (state < 2) {
            done(-1, e);
          } else {
            throw e;
          }
        }
      }
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess,
            success,
            error,
            response,
            modified,
            statusText = nativeStatusText;
        if (state === 2) {
          return;
        }
        state = 2;
        if (timeoutTimer) {
          window.clearTimeout(timeoutTimer);
        }
        transport = undefined;
        responseHeadersString = headers || "";
        jqXHR.readyState = status > 0 ? 4 : 0;
        isSuccess = status >= 200 && status < 300 || status === 304;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }
        response = ajaxConvert(s, response, jqXHR, isSuccess);
        if (isSuccess) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader("etag");
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }
          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent";
          } else if (status === 304) {
            statusText = "notmodified";
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          error = statusText;
          if (status || !statusText) {
            statusText = "error";
            if (status < 0) {
              status = 0;
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        }
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
        }
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
          if (!(--jQuery.active)) {
            jQuery.event.trigger("ajaxStop");
          }
        }
      }
      return jqXHR;
    },
    getJSON: function(url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },
    getScript: function(url, callback) {
      return jQuery.get(url, undefined, callback, "script");
    }
  });
  jQuery.each(["get", "post"], function(i, method) {
    jQuery[method] = function(url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.ajax(jQuery.extend({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      }, jQuery.isPlainObject(url) && url));
    };
  });
  jQuery._evalUrl = function(url) {
    return jQuery.ajax({
      url: url,
      type: "GET",
      dataType: "script",
      async: false,
      global: false,
      "throws": true
    });
  };
  jQuery.fn.extend({
    wrapAll: function(html) {
      var wrap;
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      }
      if (this[0]) {
        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function() {
          var elem = this;
          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function(html) {
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function() {
        var self = jQuery(this),
            contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function(html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function(i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function() {
      return this.parent().each(function() {
        if (!jQuery.nodeName(this, "body")) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    }
  });
  jQuery.expr.filters.hidden = function(elem) {
    return !jQuery.expr.filters.visible(elem);
  };
  jQuery.expr.filters.visible = function(elem) {
    return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
  };
  var r20 = /%20/g,
      rbracket = /\[\]$/,
      rCRLF = /\r?\n/g,
      rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
      rsubmittable = /^(?:input|select|textarea|keygen)/i;
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function(i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
        }
      });
    } else if (!traditional && jQuery.type(obj) === "object") {
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  jQuery.param = function(a, traditional) {
    var prefix,
        s = [],
        add = function(key, value) {
          value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
          s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }
    if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
      jQuery.each(a, function() {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return s.join("&").replace(r20, "+");
  };
  jQuery.fn.extend({
    serialize: function() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function() {
      return this.map(function() {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function() {
        var type = this.type;
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
      }).map(function(i, elem) {
        var val = jQuery(this).val();
        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
          return {
            name: elem.name,
            value: val.replace(rCRLF, "\r\n")
          };
        }) : {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        };
      }).get();
    }
  });
  jQuery.ajaxSettings.xhr = function() {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  };
  var xhrSuccessStatus = {
    0: 200,
    1223: 204
  },
      xhrSupported = jQuery.ajaxSettings.xhr();
  support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function(options) {
    var callback,
        errorCallback;
    if (support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function(headers, complete) {
          var i,
              xhr = options.xhr();
          xhr.open(options.type, options.url, options.async, options.username, options.password);
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }
          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          }
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }
          callback = function(type) {
            return function() {
              if (callback) {
                callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
                if (type === "abort") {
                  xhr.abort();
                } else if (type === "error") {
                  if (typeof xhr.status !== "number") {
                    complete(0, "error");
                  } else {
                    complete(xhr.status, xhr.statusText);
                  }
                } else {
                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {binary: xhr.response} : {text: xhr.responseText}, xhr.getAllResponseHeaders());
                }
              }
            };
          };
          xhr.onload = callback();
          errorCallback = xhr.onerror = callback("error");
          if (xhr.onabort !== undefined) {
            xhr.onabort = errorCallback;
          } else {
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                window.setTimeout(function() {
                  if (callback) {
                    errorCallback();
                  }
                });
              }
            };
          }
          callback = callback("abort");
          try {
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {
            if (callback) {
              throw e;
            }
          }
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  jQuery.ajaxSetup({
    accepts: {script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"},
    contents: {script: /\b(?:java|ecma)script\b/},
    converters: {"text script": function(text) {
        jQuery.globalEval(text);
        return text;
      }}
  });
  jQuery.ajaxPrefilter("script", function(s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = "GET";
    }
  });
  jQuery.ajaxTransport("script", function(s) {
    if (s.crossDomain) {
      var script,
          callback;
      return {
        send: function(_, complete) {
          script = jQuery("<script>").prop({
            charset: s.scriptCharset,
            src: s.url
          }).on("load error", callback = function(evt) {
            script.remove();
            callback = null;
            if (evt) {
              complete(evt.type === "error" ? 404 : 200, evt.type);
            }
          });
          document.head.appendChild(script[0]);
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var oldCallbacks = [],
      rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
      this[callback] = true;
      return callback;
    }
  });
  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
    var callbackName,
        overwritten,
        responseContainer,
        jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
    if (jsonProp || s.dataTypes[0] === "jsonp") {
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      }
      s.converters["script json"] = function() {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called");
        }
        return responseContainer[0];
      };
      s.dataTypes[0] = "json";
      overwritten = window[callbackName];
      window[callbackName] = function() {
        responseContainer = arguments;
      };
      jqXHR.always(function() {
        if (overwritten === undefined) {
          jQuery(window).removeProp(callbackName);
        } else {
          window[callbackName] = overwritten;
        }
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName);
        }
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });
      return "script";
    }
  });
  support.createHTMLDocument = (function() {
    var body = document.implementation.createHTMLDocument("").body;
    body.innerHTML = "<form></form><form></form>";
    return body.childNodes.length === 2;
  })();
  jQuery.parseHTML = function(data, context, keepScripts) {
    if (!data || typeof data !== "string") {
      return null;
    }
    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }
    context = context || (support.createHTMLDocument ? document.implementation.createHTMLDocument("") : document);
    var parsed = rsingleTag.exec(data),
        scripts = !keepScripts && [];
    if (parsed) {
      return [context.createElement(parsed[1])];
    }
    parsed = buildFragment([data], context, scripts);
    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }
    return jQuery.merge([], parsed.childNodes);
  };
  var _load = jQuery.fn.load;
  jQuery.fn.load = function(url, params, callback) {
    if (typeof url !== "string" && _load) {
      return _load.apply(this, arguments);
    }
    var selector,
        type,
        response,
        self = this,
        off = url.indexOf(" ");
    if (off > -1) {
      selector = jQuery.trim(url.slice(off));
      url = url.slice(0, off);
    }
    if (jQuery.isFunction(params)) {
      callback = params;
      params = undefined;
    } else if (params && typeof params === "object") {
      type = "POST";
    }
    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        type: type || "GET",
        dataType: "html",
        data: params
      }).done(function(responseText) {
        response = arguments;
        self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
      }).always(callback && function(jqXHR, status) {
        self.each(function() {
          callback.apply(self, response || [jqXHR.responseText, status, jqXHR]);
        });
      });
    }
    return this;
  };
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
    jQuery.fn[type] = function(fn) {
      return this.on(type, fn);
    };
  });
  jQuery.expr.filters.animated = function(elem) {
    return jQuery.grep(jQuery.timers, function(fn) {
      return elem === fn.elem;
    }).length;
  };
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }
  jQuery.offset = {setOffset: function(elem, options, i) {
      var curPosition,
          curLeft,
          curCSSTop,
          curTop,
          curOffset,
          curCSSLeft,
          calculatePosition,
          position = jQuery.css(elem, "position"),
          curElem = jQuery(elem),
          props = {};
      if (position === "static") {
        elem.style.position = "relative";
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, jQuery.extend({}, curOffset));
      }
      if (options.top != null) {
        props.top = (options.top - curOffset.top) + curTop;
      }
      if (options.left != null) {
        props.left = (options.left - curOffset.left) + curLeft;
      }
      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }};
  jQuery.fn.extend({
    offset: function(options) {
      if (arguments.length) {
        return options === undefined ? this : this.each(function(i) {
          jQuery.offset.setOffset(this, options, i);
        });
      }
      var docElem,
          win,
          elem = this[0],
          box = {
            top: 0,
            left: 0
          },
          doc = elem && elem.ownerDocument;
      if (!doc) {
        return;
      }
      docElem = doc.documentElement;
      if (!jQuery.contains(docElem, elem)) {
        return box;
      }
      box = elem.getBoundingClientRect();
      win = getWindow(doc);
      return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
      };
    },
    position: function() {
      if (!this[0]) {
        return;
      }
      var offsetParent,
          offset,
          elem = this[0],
          parentOffset = {
            top: 0,
            left: 0
          };
      if (jQuery.css(elem, "position") === "fixed") {
        offset = elem.getBoundingClientRect();
      } else {
        offsetParent = this.offsetParent();
        offset = this.offset();
        if (!jQuery.nodeName(offsetParent[0], "html")) {
          parentOffset = offsetParent.offset();
        }
        parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
        parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
      }
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      };
    },
    offsetParent: function() {
      return this.map(function() {
        var offsetParent = this.offsetParent;
        while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || documentElement;
      });
    }
  });
  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(method, prop) {
    var top = "pageYOffset" === prop;
    jQuery.fn[method] = function(val) {
      return access(this, function(elem, method, val) {
        var win = getWindow(elem);
        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }
        if (win) {
          win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length);
    };
  });
  jQuery.each(["top", "left"], function(i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
      if (computed) {
        computed = curCSS(elem, prop);
        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
      }
    });
  });
  jQuery.each({
    Height: "height",
    Width: "width"
  }, function(name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function(defaultExtra, funcName) {
      jQuery.fn[funcName] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
            extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function(elem, type, value) {
          var doc;
          if (jQuery.isWindow(elem)) {
            return elem.document.documentElement["client" + name];
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
          }
          return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable, null);
      };
    });
  });
  jQuery.fn.extend({
    bind: function(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function(types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function(selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function(selector, types, fn) {
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    },
    size: function() {
      return this.length;
    }
  });
  jQuery.fn.andSelf = jQuery.fn.addBack;
  if (typeof define === "function" && define.amd) {
    define("github:components/jquery@2.2.1/jquery.js", [], function() {
      return jQuery;
    }), define("jquery", ["github:components/jquery@2.2.1/jquery.js"], function(m) {
      return m;
    });
  }
  var _jQuery = window.jQuery,
      _$ = window.$;
  jQuery.noConflict = function(deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }
    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }
    return jQuery;
  };
  if (!noGlobal) {
    window.jQuery = window.$ = jQuery;
  }
  return jQuery;
}));

})();
(function() {
var define = System.amdDefine;
define("github:components/jquery@2.2.1.js", ["github:components/jquery@2.2.1/jquery.js"], function(main) {
  return main;
});

})();
System.register("npm:materialize-css@0.97.6/dist/css/materialize.css!github:systemjs/plugin-css@0.1.21.js", [], function() { return { setters: [], execute: function() {} } });

System.registerDynamic("npm:materialize-css@0.97.6/dist/js/materialize.js", ["github:components/jquery@2.2.1.js", "npm:materialize-css@0.97.6/dist/css/materialize.css!github:systemjs/plugin-css@0.1.21.js"], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, "$", null);
  (function() {
    var jQuery = this["jQuery"];
    var Vel = this["Vel"];
    "format global";
    "deps jquery";
    "deps ../css/materialize.css!";
    "exports $";
    if (typeof(jQuery) === 'undefined') {
      var jQuery;
      if (typeof(require) === 'function') {
        jQuery = $ = require('jquery');
      } else {
        jQuery = $;
      }
    }
    ;
    jQuery.easing['jswing'] = jQuery.easing['swing'];
    jQuery.extend(jQuery.easing, {
      def: 'easeOutQuad',
      swing: function(x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
      },
      easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b;
      },
      easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
      },
      easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
          return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
      },
      easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
      },
      easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
      },
      easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
          return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
      },
      easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
      },
      easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      },
      easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
          return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
      },
      easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
      },
      easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
      },
      easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
          return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
      },
      easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
      },
      easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
      },
      easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
      },
      easeInExpo: function(x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
      },
      easeOutExpo: function(x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
      },
      easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0)
          return b;
        if (t == d)
          return b + c;
        if ((t /= d / 2) < 1)
          return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      },
      easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
      },
      easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
      },
      easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
          return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
      },
      easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)
          return b;
        if ((t /= d) == 1)
          return b + c;
        if (!p)
          p = d * .3;
        if (a < Math.abs(c)) {
          a = c;
          var s = p / 4;
        } else
          var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      },
      easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)
          return b;
        if ((t /= d) == 1)
          return b + c;
        if (!p)
          p = d * .3;
        if (a < Math.abs(c)) {
          a = c;
          var s = p / 4;
        } else
          var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
      },
      easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)
          return b;
        if ((t /= d / 2) == 2)
          return b + c;
        if (!p)
          p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
          a = c;
          var s = p / 4;
        } else
          var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1)
          return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
      },
      easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined)
          s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
      },
      easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined)
          s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
      },
      easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined)
          s = 1.70158;
        if ((t /= d / 2) < 1)
          return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
      },
      easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
      },
      easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
          return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
          return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
          return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
          return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
      },
      easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2)
          return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
      }
    });
    ;
    jQuery.extend(jQuery.easing, {easeInOutMaterial: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
          return c / 2 * t * t + b;
        return c / 4 * ((t -= 2) * t * t + 2) + b;
      }});
    ;
    jQuery.Velocity ? console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity.") : (!function(e) {
      function t(e) {
        var t = e.length,
            a = r.type(e);
        return "function" === a || r.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === a || 0 === t || "number" == typeof t && t > 0 && t - 1 in e;
      }
      if (!e.jQuery) {
        var r = function(e, t) {
          return new r.fn.init(e, t);
        };
        r.isWindow = function(e) {
          return null != e && e == e.window;
        }, r.type = function(e) {
          return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[i.call(e)] || "object" : typeof e;
        }, r.isArray = Array.isArray || function(e) {
          return "array" === r.type(e);
        }, r.isPlainObject = function(e) {
          var t;
          if (!e || "object" !== r.type(e) || e.nodeType || r.isWindow(e))
            return !1;
          try {
            if (e.constructor && !o.call(e, "constructor") && !o.call(e.constructor.prototype, "isPrototypeOf"))
              return !1;
          } catch (a) {
            return !1;
          }
          for (t in e)
            ;
          return void 0 === t || o.call(e, t);
        }, r.each = function(e, r, a) {
          var n,
              o = 0,
              i = e.length,
              s = t(e);
          if (a) {
            if (s)
              for (; i > o && (n = r.apply(e[o], a), n !== !1); o++)
                ;
            else
              for (o in e)
                if (n = r.apply(e[o], a), n === !1)
                  break;
          } else if (s)
            for (; i > o && (n = r.call(e[o], o, e[o]), n !== !1); o++)
              ;
          else
            for (o in e)
              if (n = r.call(e[o], o, e[o]), n === !1)
                break;
          return e;
        }, r.data = function(e, t, n) {
          if (void 0 === n) {
            var o = e[r.expando],
                i = o && a[o];
            if (void 0 === t)
              return i;
            if (i && t in i)
              return i[t];
          } else if (void 0 !== t) {
            var o = e[r.expando] || (e[r.expando] = ++r.uuid);
            return a[o] = a[o] || {}, a[o][t] = n, n;
          }
        }, r.removeData = function(e, t) {
          var n = e[r.expando],
              o = n && a[n];
          o && r.each(t, function(e, t) {
            delete o[t];
          });
        }, r.extend = function() {
          var e,
              t,
              a,
              n,
              o,
              i,
              s = arguments[0] || {},
              l = 1,
              u = arguments.length,
              c = !1;
          for ("boolean" == typeof s && (c = s, s = arguments[l] || {}, l++), "object" != typeof s && "function" !== r.type(s) && (s = {}), l === u && (s = this, l--); u > l; l++)
            if (null != (o = arguments[l]))
              for (n in o)
                e = s[n], a = o[n], s !== a && (c && a && (r.isPlainObject(a) || (t = r.isArray(a))) ? (t ? (t = !1, i = e && r.isArray(e) ? e : []) : i = e && r.isPlainObject(e) ? e : {}, s[n] = r.extend(c, i, a)) : void 0 !== a && (s[n] = a));
          return s;
        }, r.queue = function(e, a, n) {
          function o(e, r) {
            var a = r || [];
            return null != e && (t(Object(e)) ? !function(e, t) {
              for (var r = +t.length,
                  a = 0,
                  n = e.length; r > a; )
                e[n++] = t[a++];
              if (r !== r)
                for (; void 0 !== t[a]; )
                  e[n++] = t[a++];
              return e.length = n, e;
            }(a, "string" == typeof e ? [e] : e) : [].push.call(a, e)), a;
          }
          if (e) {
            a = (a || "fx") + "queue";
            var i = r.data(e, a);
            return n ? (!i || r.isArray(n) ? i = r.data(e, a, o(n)) : i.push(n), i) : i || [];
          }
        }, r.dequeue = function(e, t) {
          r.each(e.nodeType ? [e] : e, function(e, a) {
            t = t || "fx";
            var n = r.queue(a, t),
                o = n.shift();
            "inprogress" === o && (o = n.shift()), o && ("fx" === t && n.unshift("inprogress"), o.call(a, function() {
              r.dequeue(a, t);
            }));
          });
        }, r.fn = r.prototype = {
          init: function(e) {
            if (e.nodeType)
              return this[0] = e, this;
            throw new Error("Not a DOM node.");
          },
          offset: function() {
            var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
              top: 0,
              left: 0
            };
            return {
              top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
              left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
            };
          },
          position: function() {
            function e() {
              for (var e = this.offsetParent || document; e && "html" === !e.nodeType.toLowerCase && "static" === e.style.position; )
                e = e.offsetParent;
              return e || document;
            }
            var t = this[0],
                e = e.apply(t),
                a = this.offset(),
                n = /^(?:body|html)$/i.test(e.nodeName) ? {
                  top: 0,
                  left: 0
                } : r(e).offset();
            return a.top -= parseFloat(t.style.marginTop) || 0, a.left -= parseFloat(t.style.marginLeft) || 0, e.style && (n.top += parseFloat(e.style.borderTopWidth) || 0, n.left += parseFloat(e.style.borderLeftWidth) || 0), {
              top: a.top - n.top,
              left: a.left - n.left
            };
          }
        };
        var a = {};
        r.expando = "velocity" + (new Date).getTime(), r.uuid = 0;
        for (var n = {},
            o = n.hasOwnProperty,
            i = n.toString,
            s = "Boolean Number String Function Array Date RegExp Object Error".split(" "),
            l = 0; l < s.length; l++)
          n["[object " + s[l] + "]"] = s[l].toLowerCase();
        r.fn.init.prototype = r.fn, e.Velocity = {Utilities: r};
      }
    }(window), function(e) {
      "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : e();
    }(function() {
      return function(e, t, r, a) {
        function n(e) {
          for (var t = -1,
              r = e ? e.length : 0,
              a = []; ++t < r; ) {
            var n = e[t];
            n && a.push(n);
          }
          return a;
        }
        function o(e) {
          return m.isWrapped(e) ? e = [].slice.call(e) : m.isNode(e) && (e = [e]), e;
        }
        function i(e) {
          var t = f.data(e, "velocity");
          return null === t ? a : t;
        }
        function s(e) {
          return function(t) {
            return Math.round(t * e) * (1 / e);
          };
        }
        function l(e, r, a, n) {
          function o(e, t) {
            return 1 - 3 * t + 3 * e;
          }
          function i(e, t) {
            return 3 * t - 6 * e;
          }
          function s(e) {
            return 3 * e;
          }
          function l(e, t, r) {
            return ((o(t, r) * e + i(t, r)) * e + s(t)) * e;
          }
          function u(e, t, r) {
            return 3 * o(t, r) * e * e + 2 * i(t, r) * e + s(t);
          }
          function c(t, r) {
            for (var n = 0; m > n; ++n) {
              var o = u(r, e, a);
              if (0 === o)
                return r;
              var i = l(r, e, a) - t;
              r -= i / o;
            }
            return r;
          }
          function p() {
            for (var t = 0; b > t; ++t)
              w[t] = l(t * x, e, a);
          }
          function f(t, r, n) {
            var o,
                i,
                s = 0;
            do
              i = r + (n - r) / 2, o = l(i, e, a) - t, o > 0 ? n = i : r = i;
 while (Math.abs(o) > h && ++s < v);
            return i;
          }
          function d(t) {
            for (var r = 0,
                n = 1,
                o = b - 1; n != o && w[n] <= t; ++n)
              r += x;
            --n;
            var i = (t - w[n]) / (w[n + 1] - w[n]),
                s = r + i * x,
                l = u(s, e, a);
            return l >= y ? c(t, s) : 0 == l ? s : f(t, r, r + x);
          }
          function g() {
            V = !0, (e != r || a != n) && p();
          }
          var m = 4,
              y = .001,
              h = 1e-7,
              v = 10,
              b = 11,
              x = 1 / (b - 1),
              S = "Float32Array" in t;
          if (4 !== arguments.length)
            return !1;
          for (var P = 0; 4 > P; ++P)
            if ("number" != typeof arguments[P] || isNaN(arguments[P]) || !isFinite(arguments[P]))
              return !1;
          e = Math.min(e, 1), a = Math.min(a, 1), e = Math.max(e, 0), a = Math.max(a, 0);
          var w = S ? new Float32Array(b) : new Array(b),
              V = !1,
              C = function(t) {
                return V || g(), e === r && a === n ? t : 0 === t ? 0 : 1 === t ? 1 : l(d(t), r, n);
              };
          C.getControlPoints = function() {
            return [{
              x: e,
              y: r
            }, {
              x: a,
              y: n
            }];
          };
          var T = "generateBezier(" + [e, r, a, n] + ")";
          return C.toString = function() {
            return T;
          }, C;
        }
        function u(e, t) {
          var r = e;
          return m.isString(e) ? b.Easings[e] || (r = !1) : r = m.isArray(e) && 1 === e.length ? s.apply(null, e) : m.isArray(e) && 2 === e.length ? x.apply(null, e.concat([t])) : m.isArray(e) && 4 === e.length ? l.apply(null, e) : !1, r === !1 && (r = b.Easings[b.defaults.easing] ? b.defaults.easing : v), r;
        }
        function c(e) {
          if (e) {
            var t = (new Date).getTime(),
                r = b.State.calls.length;
            r > 1e4 && (b.State.calls = n(b.State.calls));
            for (var o = 0; r > o; o++)
              if (b.State.calls[o]) {
                var s = b.State.calls[o],
                    l = s[0],
                    u = s[2],
                    d = s[3],
                    g = !!d,
                    y = null;
                d || (d = b.State.calls[o][3] = t - 16);
                for (var h = Math.min((t - d) / u.duration, 1),
                    v = 0,
                    x = l.length; x > v; v++) {
                  var P = l[v],
                      V = P.element;
                  if (i(V)) {
                    var C = !1;
                    if (u.display !== a && null !== u.display && "none" !== u.display) {
                      if ("flex" === u.display) {
                        var T = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                        f.each(T, function(e, t) {
                          S.setPropertyValue(V, "display", t);
                        });
                      }
                      S.setPropertyValue(V, "display", u.display);
                    }
                    u.visibility !== a && "hidden" !== u.visibility && S.setPropertyValue(V, "visibility", u.visibility);
                    for (var k in P)
                      if ("element" !== k) {
                        var A,
                            F = P[k],
                            j = m.isString(F.easing) ? b.Easings[F.easing] : F.easing;
                        if (1 === h)
                          A = F.endValue;
                        else {
                          var E = F.endValue - F.startValue;
                          if (A = F.startValue + E * j(h, u, E), !g && A === F.currentValue)
                            continue;
                        }
                        if (F.currentValue = A, "tween" === k)
                          y = A;
                        else {
                          if (S.Hooks.registered[k]) {
                            var H = S.Hooks.getRoot(k),
                                N = i(V).rootPropertyValueCache[H];
                            N && (F.rootPropertyValue = N);
                          }
                          var L = S.setPropertyValue(V, k, F.currentValue + (0 === parseFloat(A) ? "" : F.unitType), F.rootPropertyValue, F.scrollData);
                          S.Hooks.registered[k] && (i(V).rootPropertyValueCache[H] = S.Normalizations.registered[H] ? S.Normalizations.registered[H]("extract", null, L[1]) : L[1]), "transform" === L[0] && (C = !0);
                        }
                      }
                    u.mobileHA && i(V).transformCache.translate3d === a && (i(V).transformCache.translate3d = "(0px, 0px, 0px)", C = !0), C && S.flushTransformCache(V);
                  }
                }
                u.display !== a && "none" !== u.display && (b.State.calls[o][2].display = !1), u.visibility !== a && "hidden" !== u.visibility && (b.State.calls[o][2].visibility = !1), u.progress && u.progress.call(s[1], s[1], h, Math.max(0, d + u.duration - t), d, y), 1 === h && p(o);
              }
          }
          b.State.isTicking && w(c);
        }
        function p(e, t) {
          if (!b.State.calls[e])
            return !1;
          for (var r = b.State.calls[e][0],
              n = b.State.calls[e][1],
              o = b.State.calls[e][2],
              s = b.State.calls[e][4],
              l = !1,
              u = 0,
              c = r.length; c > u; u++) {
            var p = r[u].element;
            if (t || o.loop || ("none" === o.display && S.setPropertyValue(p, "display", o.display), "hidden" === o.visibility && S.setPropertyValue(p, "visibility", o.visibility)), o.loop !== !0 && (f.queue(p)[1] === a || !/\.velocityQueueEntryFlag/i.test(f.queue(p)[1])) && i(p)) {
              i(p).isAnimating = !1, i(p).rootPropertyValueCache = {};
              var d = !1;
              f.each(S.Lists.transforms3D, function(e, t) {
                var r = /^scale/.test(t) ? 1 : 0,
                    n = i(p).transformCache[t];
                i(p).transformCache[t] !== a && new RegExp("^\\(" + r + "[^.]").test(n) && (d = !0, delete i(p).transformCache[t]);
              }), o.mobileHA && (d = !0, delete i(p).transformCache.translate3d), d && S.flushTransformCache(p), S.Values.removeClass(p, "velocity-animating");
            }
            if (!t && o.complete && !o.loop && u === c - 1)
              try {
                o.complete.call(n, n);
              } catch (g) {
                setTimeout(function() {
                  throw g;
                }, 1);
              }
            s && o.loop !== !0 && s(n), i(p) && o.loop === !0 && !t && (f.each(i(p).tweensContainer, function(e, t) {
              /^rotate/.test(e) && 360 === parseFloat(t.endValue) && (t.endValue = 0, t.startValue = 360), /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0, t.startValue = 100);
            }), b(p, "reverse", {
              loop: !0,
              delay: o.delay
            })), o.queue !== !1 && f.dequeue(p, o.queue);
          }
          b.State.calls[e] = !1;
          for (var m = 0,
              y = b.State.calls.length; y > m; m++)
            if (b.State.calls[m] !== !1) {
              l = !0;
              break;
            }
          l === !1 && (b.State.isTicking = !1, delete b.State.calls, b.State.calls = []);
        }
        var f,
            d = function() {
              if (r.documentMode)
                return r.documentMode;
              for (var e = 7; e > 4; e--) {
                var t = r.createElement("div");
                if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", t.getElementsByTagName("span").length)
                  return t = null, e;
              }
              return a;
            }(),
            g = function() {
              var e = 0;
              return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function(t) {
                var r,
                    a = (new Date).getTime();
                return r = Math.max(0, 16 - (a - e)), e = a + r, setTimeout(function() {
                  t(a + r);
                }, r);
              };
            }(),
            m = {
              isString: function(e) {
                return "string" == typeof e;
              },
              isArray: Array.isArray || function(e) {
                return "[object Array]" === Object.prototype.toString.call(e);
              },
              isFunction: function(e) {
                return "[object Function]" === Object.prototype.toString.call(e);
              },
              isNode: function(e) {
                return e && e.nodeType;
              },
              isNodeList: function(e) {
                return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== a && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0);
              },
              isWrapped: function(e) {
                return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e));
              },
              isSVG: function(e) {
                return t.SVGElement && e instanceof t.SVGElement;
              },
              isEmptyObject: function(e) {
                for (var t in e)
                  return !1;
                return !0;
              }
            },
            y = !1;
        if (e.fn && e.fn.jquery ? (f = e, y = !0) : f = t.Velocity.Utilities, 8 >= d && !y)
          throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
        if (7 >= d)
          return void(jQuery.fn.velocity = jQuery.fn.animate);
        var h = 400,
            v = "swing",
            b = {
              State: {
                isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                isAndroid: /Android/i.test(navigator.userAgent),
                isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                isChrome: t.chrome,
                isFirefox: /Firefox/i.test(navigator.userAgent),
                prefixElement: r.createElement("div"),
                prefixMatches: {},
                scrollAnchor: null,
                scrollPropertyLeft: null,
                scrollPropertyTop: null,
                isTicking: !1,
                calls: []
              },
              CSS: {},
              Utilities: f,
              Redirects: {},
              Easings: {},
              Promise: t.Promise,
              defaults: {
                queue: "",
                duration: h,
                easing: v,
                begin: a,
                complete: a,
                progress: a,
                display: a,
                visibility: a,
                loop: !1,
                delay: !1,
                mobileHA: !0,
                _cacheValues: !0
              },
              init: function(e) {
                f.data(e, "velocity", {
                  isSVG: m.isSVG(e),
                  isAnimating: !1,
                  computedStyle: null,
                  tweensContainer: null,
                  rootPropertyValueCache: {},
                  transformCache: {}
                });
              },
              hook: null,
              mock: !1,
              version: {
                major: 1,
                minor: 2,
                patch: 2
              },
              debug: !1
            };
        t.pageYOffset !== a ? (b.State.scrollAnchor = t, b.State.scrollPropertyLeft = "pageXOffset", b.State.scrollPropertyTop = "pageYOffset") : (b.State.scrollAnchor = r.documentElement || r.body.parentNode || r.body, b.State.scrollPropertyLeft = "scrollLeft", b.State.scrollPropertyTop = "scrollTop");
        var x = function() {
          function e(e) {
            return -e.tension * e.x - e.friction * e.v;
          }
          function t(t, r, a) {
            var n = {
              x: t.x + a.dx * r,
              v: t.v + a.dv * r,
              tension: t.tension,
              friction: t.friction
            };
            return {
              dx: n.v,
              dv: e(n)
            };
          }
          function r(r, a) {
            var n = {
              dx: r.v,
              dv: e(r)
            },
                o = t(r, .5 * a, n),
                i = t(r, .5 * a, o),
                s = t(r, a, i),
                l = 1 / 6 * (n.dx + 2 * (o.dx + i.dx) + s.dx),
                u = 1 / 6 * (n.dv + 2 * (o.dv + i.dv) + s.dv);
            return r.x = r.x + l * a, r.v = r.v + u * a, r;
          }
          return function a(e, t, n) {
            var o,
                i,
                s,
                l = {
                  x: -1,
                  v: 0,
                  tension: null,
                  friction: null
                },
                u = [0],
                c = 0,
                p = 1e-4,
                f = .016;
            for (e = parseFloat(e) || 500, t = parseFloat(t) || 20, n = n || null, l.tension = e, l.friction = t, o = null !== n, o ? (c = a(e, t), i = c / n * f) : i = f; s = r(s || l, i), u.push(1 + s.x), c += 16, Math.abs(s.x) > p && Math.abs(s.v) > p; )
              ;
            return o ? function(e) {
              return u[e * (u.length - 1) | 0];
            } : c;
          };
        }();
        b.Easings = {
          linear: function(e) {
            return e;
          },
          swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2;
          },
          spring: function(e) {
            return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e);
          }
        }, f.each([["ease", [.25, .1, .25, 1]], ["ease-in", [.42, 0, 1, 1]], ["ease-out", [0, 0, .58, 1]], ["ease-in-out", [.42, 0, .58, 1]], ["easeInSine", [.47, 0, .745, .715]], ["easeOutSine", [.39, .575, .565, 1]], ["easeInOutSine", [.445, .05, .55, .95]], ["easeInQuad", [.55, .085, .68, .53]], ["easeOutQuad", [.25, .46, .45, .94]], ["easeInOutQuad", [.455, .03, .515, .955]], ["easeInCubic", [.55, .055, .675, .19]], ["easeOutCubic", [.215, .61, .355, 1]], ["easeInOutCubic", [.645, .045, .355, 1]], ["easeInQuart", [.895, .03, .685, .22]], ["easeOutQuart", [.165, .84, .44, 1]], ["easeInOutQuart", [.77, 0, .175, 1]], ["easeInQuint", [.755, .05, .855, .06]], ["easeOutQuint", [.23, 1, .32, 1]], ["easeInOutQuint", [.86, 0, .07, 1]], ["easeInExpo", [.95, .05, .795, .035]], ["easeOutExpo", [.19, 1, .22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [.6, .04, .98, .335]], ["easeOutCirc", [.075, .82, .165, 1]], ["easeInOutCirc", [.785, .135, .15, .86]]], function(e, t) {
          b.Easings[t[0]] = l.apply(null, t[1]);
        });
        var S = b.CSS = {
          RegEx: {
            isHex: /^#([A-f\d]{3}){1,2}$/i,
            valueUnwrap: /^[A-z]+\((.*)\)$/i,
            wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
            valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
          },
          Lists: {
            colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
            transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
            transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
          },
          Hooks: {
            templates: {
              textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
              boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
              clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
              backgroundPosition: ["X Y", "0% 0%"],
              transformOrigin: ["X Y Z", "50% 50% 0px"],
              perspectiveOrigin: ["X Y", "50% 50%"]
            },
            registered: {},
            register: function() {
              for (var e = 0; e < S.Lists.colors.length; e++) {
                var t = "color" === S.Lists.colors[e] ? "0 0 0 1" : "255 255 255 1";
                S.Hooks.templates[S.Lists.colors[e]] = ["Red Green Blue Alpha", t];
              }
              var r,
                  a,
                  n;
              if (d)
                for (r in S.Hooks.templates) {
                  a = S.Hooks.templates[r], n = a[0].split(" ");
                  var o = a[1].match(S.RegEx.valueSplit);
                  "Color" === n[0] && (n.push(n.shift()), o.push(o.shift()), S.Hooks.templates[r] = [n.join(" "), o.join(" ")]);
                }
              for (r in S.Hooks.templates) {
                a = S.Hooks.templates[r], n = a[0].split(" ");
                for (var e in n) {
                  var i = r + n[e],
                      s = e;
                  S.Hooks.registered[i] = [r, s];
                }
              }
            },
            getRoot: function(e) {
              var t = S.Hooks.registered[e];
              return t ? t[0] : e;
            },
            cleanRootPropertyValue: function(e, t) {
              return S.RegEx.valueUnwrap.test(t) && (t = t.match(S.RegEx.valueUnwrap)[1]), S.Values.isCSSNullValue(t) && (t = S.Hooks.templates[e][1]), t;
            },
            extractValue: function(e, t) {
              var r = S.Hooks.registered[e];
              if (r) {
                var a = r[0],
                    n = r[1];
                return t = S.Hooks.cleanRootPropertyValue(a, t), t.toString().match(S.RegEx.valueSplit)[n];
              }
              return t;
            },
            injectValue: function(e, t, r) {
              var a = S.Hooks.registered[e];
              if (a) {
                var n,
                    o,
                    i = a[0],
                    s = a[1];
                return r = S.Hooks.cleanRootPropertyValue(i, r), n = r.toString().match(S.RegEx.valueSplit), n[s] = t, o = n.join(" ");
              }
              return r;
            }
          },
          Normalizations: {
            registered: {
              clip: function(e, t, r) {
                switch (e) {
                  case "name":
                    return "clip";
                  case "extract":
                    var a;
                    return S.RegEx.wrappedValueAlreadyExtracted.test(r) ? a = r : (a = r.toString().match(S.RegEx.valueUnwrap), a = a ? a[1].replace(/,(\s+)?/g, " ") : r), a;
                  case "inject":
                    return "rect(" + r + ")";
                }
              },
              blur: function(e, t, r) {
                switch (e) {
                  case "name":
                    return b.State.isFirefox ? "filter" : "-webkit-filter";
                  case "extract":
                    var a = parseFloat(r);
                    if (!a && 0 !== a) {
                      var n = r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                      a = n ? n[1] : 0;
                    }
                    return a;
                  case "inject":
                    return parseFloat(r) ? "blur(" + r + ")" : "none";
                }
              },
              opacity: function(e, t, r) {
                if (8 >= d)
                  switch (e) {
                    case "name":
                      return "filter";
                    case "extract":
                      var a = r.toString().match(/alpha\(opacity=(.*)\)/i);
                      return r = a ? a[1] / 100 : 1;
                    case "inject":
                      return t.style.zoom = 1, parseFloat(r) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(r), 10) + ")";
                  }
                else
                  switch (e) {
                    case "name":
                      return "opacity";
                    case "extract":
                      return r;
                    case "inject":
                      return r;
                  }
              }
            },
            register: function() {
              9 >= d || b.State.isGingerbread || (S.Lists.transformsBase = S.Lists.transformsBase.concat(S.Lists.transforms3D));
              for (var e = 0; e < S.Lists.transformsBase.length; e++)
                !function() {
                  var t = S.Lists.transformsBase[e];
                  S.Normalizations.registered[t] = function(e, r, n) {
                    switch (e) {
                      case "name":
                        return "transform";
                      case "extract":
                        return i(r) === a || i(r).transformCache[t] === a ? /^scale/i.test(t) ? 1 : 0 : i(r).transformCache[t].replace(/[()]/g, "");
                      case "inject":
                        var o = !1;
                        switch (t.substr(0, t.length - 1)) {
                          case "translate":
                            o = !/(%|px|em|rem|vw|vh|\d)$/i.test(n);
                            break;
                          case "scal":
                          case "scale":
                            b.State.isAndroid && i(r).transformCache[t] === a && 1 > n && (n = 1), o = !/(\d)$/i.test(n);
                            break;
                          case "skew":
                            o = !/(deg|\d)$/i.test(n);
                            break;
                          case "rotate":
                            o = !/(deg|\d)$/i.test(n);
                        }
                        return o || (i(r).transformCache[t] = "(" + n + ")"), i(r).transformCache[t];
                    }
                  };
                }();
              for (var e = 0; e < S.Lists.colors.length; e++)
                !function() {
                  var t = S.Lists.colors[e];
                  S.Normalizations.registered[t] = function(e, r, n) {
                    switch (e) {
                      case "name":
                        return t;
                      case "extract":
                        var o;
                        if (S.RegEx.wrappedValueAlreadyExtracted.test(n))
                          o = n;
                        else {
                          var i,
                              s = {
                                black: "rgb(0, 0, 0)",
                                blue: "rgb(0, 0, 255)",
                                gray: "rgb(128, 128, 128)",
                                green: "rgb(0, 128, 0)",
                                red: "rgb(255, 0, 0)",
                                white: "rgb(255, 255, 255)"
                              };
                          /^[A-z]+$/i.test(n) ? i = s[n] !== a ? s[n] : s.black : S.RegEx.isHex.test(n) ? i = "rgb(" + S.Values.hexToRgb(n).join(" ") + ")" : /^rgba?\(/i.test(n) || (i = s.black), o = (i || n).toString().match(S.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                        }
                        return 8 >= d || 3 !== o.split(" ").length || (o += " 1"), o;
                      case "inject":
                        return 8 >= d ? 4 === n.split(" ").length && (n = n.split(/\s+/).slice(0, 3).join(" ")) : 3 === n.split(" ").length && (n += " 1"), (8 >= d ? "rgb" : "rgba") + "(" + n.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";
                    }
                  };
                }();
            }
          },
          Names: {
            camelCase: function(e) {
              return e.replace(/-(\w)/g, function(e, t) {
                return t.toUpperCase();
              });
            },
            SVGAttribute: function(e) {
              var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
              return (d || b.State.isAndroid && !b.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e);
            },
            prefixCheck: function(e) {
              if (b.State.prefixMatches[e])
                return [b.State.prefixMatches[e], !0];
              for (var t = ["", "Webkit", "Moz", "ms", "O"],
                  r = 0,
                  a = t.length; a > r; r++) {
                var n;
                if (n = 0 === r ? e : t[r] + e.replace(/^\w/, function(e) {
                  return e.toUpperCase();
                }), m.isString(b.State.prefixElement.style[n]))
                  return b.State.prefixMatches[e] = n, [n, !0];
              }
              return [e, !1];
            }
          },
          Values: {
            hexToRgb: function(e) {
              var t,
                  r = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                  a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
              return e = e.replace(r, function(e, t, r, a) {
                return t + t + r + r + a + a;
              }), t = a.exec(e), t ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : [0, 0, 0];
            },
            isCSSNullValue: function(e) {
              return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e);
            },
            getUnitType: function(e) {
              return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px";
            },
            getDisplayType: function(e) {
              var t = e && e.tagName.toString().toLowerCase();
              return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block";
            },
            addClass: function(e, t) {
              e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t;
            },
            removeClass: function(e, t) {
              e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ");
            }
          },
          getPropertyValue: function(e, r, n, o) {
            function s(e, r) {
              function n() {
                u && S.setPropertyValue(e, "display", "none");
              }
              var l = 0;
              if (8 >= d)
                l = f.css(e, r);
              else {
                var u = !1;
                if (/^(width|height)$/.test(r) && 0 === S.getPropertyValue(e, "display") && (u = !0, S.setPropertyValue(e, "display", S.Values.getDisplayType(e))), !o) {
                  if ("height" === r && "border-box" !== S.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                    var c = e.offsetHeight - (parseFloat(S.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(S.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(S.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(S.getPropertyValue(e, "paddingBottom")) || 0);
                    return n(), c;
                  }
                  if ("width" === r && "border-box" !== S.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                    var p = e.offsetWidth - (parseFloat(S.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(S.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(S.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(S.getPropertyValue(e, "paddingRight")) || 0);
                    return n(), p;
                  }
                }
                var g;
                g = i(e) === a ? t.getComputedStyle(e, null) : i(e).computedStyle ? i(e).computedStyle : i(e).computedStyle = t.getComputedStyle(e, null), "borderColor" === r && (r = "borderTopColor"), l = 9 === d && "filter" === r ? g.getPropertyValue(r) : g[r], ("" === l || null === l) && (l = e.style[r]), n();
              }
              if ("auto" === l && /^(top|right|bottom|left)$/i.test(r)) {
                var m = s(e, "position");
                ("fixed" === m || "absolute" === m && /top|left/i.test(r)) && (l = f(e).position()[r] + "px");
              }
              return l;
            }
            var l;
            if (S.Hooks.registered[r]) {
              var u = r,
                  c = S.Hooks.getRoot(u);
              n === a && (n = S.getPropertyValue(e, S.Names.prefixCheck(c)[0])), S.Normalizations.registered[c] && (n = S.Normalizations.registered[c]("extract", e, n)), l = S.Hooks.extractValue(u, n);
            } else if (S.Normalizations.registered[r]) {
              var p,
                  g;
              p = S.Normalizations.registered[r]("name", e), "transform" !== p && (g = s(e, S.Names.prefixCheck(p)[0]), S.Values.isCSSNullValue(g) && S.Hooks.templates[r] && (g = S.Hooks.templates[r][1])), l = S.Normalizations.registered[r]("extract", e, g);
            }
            if (!/^[\d-]/.test(l))
              if (i(e) && i(e).isSVG && S.Names.SVGAttribute(r))
                if (/^(height|width)$/i.test(r))
                  try {
                    l = e.getBBox()[r];
                  } catch (m) {
                    l = 0;
                  }
                else
                  l = e.getAttribute(r);
              else
                l = s(e, S.Names.prefixCheck(r)[0]);
            return S.Values.isCSSNullValue(l) && (l = 0), b.debug >= 2 && console.log("Get " + r + ": " + l), l;
          },
          setPropertyValue: function(e, r, a, n, o) {
            var s = r;
            if ("scroll" === r)
              o.container ? o.container["scroll" + o.direction] = a : "Left" === o.direction ? t.scrollTo(a, o.alternateValue) : t.scrollTo(o.alternateValue, a);
            else if (S.Normalizations.registered[r] && "transform" === S.Normalizations.registered[r]("name", e))
              S.Normalizations.registered[r]("inject", e, a), s = "transform", a = i(e).transformCache[r];
            else {
              if (S.Hooks.registered[r]) {
                var l = r,
                    u = S.Hooks.getRoot(r);
                n = n || S.getPropertyValue(e, u), a = S.Hooks.injectValue(l, a, n), r = u;
              }
              if (S.Normalizations.registered[r] && (a = S.Normalizations.registered[r]("inject", e, a), r = S.Normalizations.registered[r]("name", e)), s = S.Names.prefixCheck(r)[0], 8 >= d)
                try {
                  e.style[s] = a;
                } catch (c) {
                  b.debug && console.log("Browser does not support [" + a + "] for [" + s + "]");
                }
              else
                i(e) && i(e).isSVG && S.Names.SVGAttribute(r) ? e.setAttribute(r, a) : e.style[s] = a;
              b.debug >= 2 && console.log("Set " + r + " (" + s + "): " + a);
            }
            return [s, a];
          },
          flushTransformCache: function(e) {
            function t(t) {
              return parseFloat(S.getPropertyValue(e, t));
            }
            var r = "";
            if ((d || b.State.isAndroid && !b.State.isChrome) && i(e).isSVG) {
              var a = {
                translate: [t("translateX"), t("translateY")],
                skewX: [t("skewX")],
                skewY: [t("skewY")],
                scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")],
                rotate: [t("rotateZ"), 0, 0]
              };
              f.each(i(e).transformCache, function(e) {
                /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), a[e] && (r += e + "(" + a[e].join(" ") + ") ", delete a[e]);
              });
            } else {
              var n,
                  o;
              f.each(i(e).transformCache, function(t) {
                return n = i(e).transformCache[t], "transformPerspective" === t ? (o = n, !0) : (9 === d && "rotateZ" === t && (t = "rotate"), void(r += t + n + " "));
              }), o && (r = "perspective" + o + " " + r);
            }
            S.setPropertyValue(e, "transform", r);
          }
        };
        S.Hooks.register(), S.Normalizations.register(), b.hook = function(e, t, r) {
          var n = a;
          return e = o(e), f.each(e, function(e, o) {
            if (i(o) === a && b.init(o), r === a)
              n === a && (n = b.CSS.getPropertyValue(o, t));
            else {
              var s = b.CSS.setPropertyValue(o, t, r);
              "transform" === s[0] && b.CSS.flushTransformCache(o), n = s;
            }
          }), n;
        };
        var P = function() {
          function e() {
            return s ? k.promise || null : l;
          }
          function n() {
            function e(e) {
              function p(e, t) {
                var r = a,
                    n = a,
                    i = a;
                return m.isArray(e) ? (r = e[0], !m.isArray(e[1]) && /^[\d-]/.test(e[1]) || m.isFunction(e[1]) || S.RegEx.isHex.test(e[1]) ? i = e[1] : (m.isString(e[1]) && !S.RegEx.isHex.test(e[1]) || m.isArray(e[1])) && (n = t ? e[1] : u(e[1], s.duration), e[2] !== a && (i = e[2]))) : r = e, t || (n = n || s.easing), m.isFunction(r) && (r = r.call(o, V, w)), m.isFunction(i) && (i = i.call(o, V, w)), [r || 0, n, i];
              }
              function d(e, t) {
                var r,
                    a;
                return a = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(e) {
                  return r = e, "";
                }), r || (r = S.Values.getUnitType(e)), [a, r];
              }
              function h() {
                var e = {
                  myParent: o.parentNode || r.body,
                  position: S.getPropertyValue(o, "position"),
                  fontSize: S.getPropertyValue(o, "fontSize")
                },
                    a = e.position === L.lastPosition && e.myParent === L.lastParent,
                    n = e.fontSize === L.lastFontSize;
                L.lastParent = e.myParent, L.lastPosition = e.position, L.lastFontSize = e.fontSize;
                var s = 100,
                    l = {};
                if (n && a)
                  l.emToPx = L.lastEmToPx, l.percentToPxWidth = L.lastPercentToPxWidth, l.percentToPxHeight = L.lastPercentToPxHeight;
                else {
                  var u = i(o).isSVG ? r.createElementNS("http://www.w3.org/2000/svg", "rect") : r.createElement("div");
                  b.init(u), e.myParent.appendChild(u), f.each(["overflow", "overflowX", "overflowY"], function(e, t) {
                    b.CSS.setPropertyValue(u, t, "hidden");
                  }), b.CSS.setPropertyValue(u, "position", e.position), b.CSS.setPropertyValue(u, "fontSize", e.fontSize), b.CSS.setPropertyValue(u, "boxSizing", "content-box"), f.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(e, t) {
                    b.CSS.setPropertyValue(u, t, s + "%");
                  }), b.CSS.setPropertyValue(u, "paddingLeft", s + "em"), l.percentToPxWidth = L.lastPercentToPxWidth = (parseFloat(S.getPropertyValue(u, "width", null, !0)) || 1) / s, l.percentToPxHeight = L.lastPercentToPxHeight = (parseFloat(S.getPropertyValue(u, "height", null, !0)) || 1) / s, l.emToPx = L.lastEmToPx = (parseFloat(S.getPropertyValue(u, "paddingLeft")) || 1) / s, e.myParent.removeChild(u);
                }
                return null === L.remToPx && (L.remToPx = parseFloat(S.getPropertyValue(r.body, "fontSize")) || 16), null === L.vwToPx && (L.vwToPx = parseFloat(t.innerWidth) / 100, L.vhToPx = parseFloat(t.innerHeight) / 100), l.remToPx = L.remToPx, l.vwToPx = L.vwToPx, l.vhToPx = L.vhToPx, b.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), o), l;
              }
              if (s.begin && 0 === V)
                try {
                  s.begin.call(g, g);
                } catch (x) {
                  setTimeout(function() {
                    throw x;
                  }, 1);
                }
              if ("scroll" === A) {
                var P,
                    C,
                    T,
                    F = /^x$/i.test(s.axis) ? "Left" : "Top",
                    j = parseFloat(s.offset) || 0;
                s.container ? m.isWrapped(s.container) || m.isNode(s.container) ? (s.container = s.container[0] || s.container, P = s.container["scroll" + F], T = P + f(o).position()[F.toLowerCase()] + j) : s.container = null : (P = b.State.scrollAnchor[b.State["scrollProperty" + F]], C = b.State.scrollAnchor[b.State["scrollProperty" + ("Left" === F ? "Top" : "Left")]], T = f(o).offset()[F.toLowerCase()] + j), l = {
                  scroll: {
                    rootPropertyValue: !1,
                    startValue: P,
                    currentValue: P,
                    endValue: T,
                    unitType: "",
                    easing: s.easing,
                    scrollData: {
                      container: s.container,
                      direction: F,
                      alternateValue: C
                    }
                  },
                  element: o
                }, b.debug && console.log("tweensContainer (scroll): ", l.scroll, o);
              } else if ("reverse" === A) {
                if (!i(o).tweensContainer)
                  return void f.dequeue(o, s.queue);
                "none" === i(o).opts.display && (i(o).opts.display = "auto"), "hidden" === i(o).opts.visibility && (i(o).opts.visibility = "visible"), i(o).opts.loop = !1, i(o).opts.begin = null, i(o).opts.complete = null, v.easing || delete s.easing, v.duration || delete s.duration, s = f.extend({}, i(o).opts, s);
                var E = f.extend(!0, {}, i(o).tweensContainer);
                for (var H in E)
                  if ("element" !== H) {
                    var N = E[H].startValue;
                    E[H].startValue = E[H].currentValue = E[H].endValue, E[H].endValue = N, m.isEmptyObject(v) || (E[H].easing = s.easing), b.debug && console.log("reverse tweensContainer (" + H + "): " + JSON.stringify(E[H]), o);
                  }
                l = E;
              } else if ("start" === A) {
                var E;
                i(o).tweensContainer && i(o).isAnimating === !0 && (E = i(o).tweensContainer), f.each(y, function(e, t) {
                  if (RegExp("^" + S.Lists.colors.join("$|^") + "$").test(e)) {
                    var r = p(t, !0),
                        n = r[0],
                        o = r[1],
                        i = r[2];
                    if (S.RegEx.isHex.test(n)) {
                      for (var s = ["Red", "Green", "Blue"],
                          l = S.Values.hexToRgb(n),
                          u = i ? S.Values.hexToRgb(i) : a,
                          c = 0; c < s.length; c++) {
                        var f = [l[c]];
                        o && f.push(o), u !== a && f.push(u[c]), y[e + s[c]] = f;
                      }
                      delete y[e];
                    }
                  }
                });
                for (var z in y) {
                  var O = p(y[z]),
                      q = O[0],
                      $ = O[1],
                      M = O[2];
                  z = S.Names.camelCase(z);
                  var I = S.Hooks.getRoot(z),
                      B = !1;
                  if (i(o).isSVG || "tween" === I || S.Names.prefixCheck(I)[1] !== !1 || S.Normalizations.registered[I] !== a) {
                    (s.display !== a && null !== s.display && "none" !== s.display || s.visibility !== a && "hidden" !== s.visibility) && /opacity|filter/.test(z) && !M && 0 !== q && (M = 0), s._cacheValues && E && E[z] ? (M === a && (M = E[z].endValue + E[z].unitType), B = i(o).rootPropertyValueCache[I]) : S.Hooks.registered[z] ? M === a ? (B = S.getPropertyValue(o, I), M = S.getPropertyValue(o, z, B)) : B = S.Hooks.templates[I][1] : M === a && (M = S.getPropertyValue(o, z));
                    var W,
                        G,
                        Y,
                        D = !1;
                    if (W = d(z, M), M = W[0], Y = W[1], W = d(z, q), q = W[0].replace(/^([+-\/*])=/, function(e, t) {
                      return D = t, "";
                    }), G = W[1], M = parseFloat(M) || 0, q = parseFloat(q) || 0, "%" === G && (/^(fontSize|lineHeight)$/.test(z) ? (q /= 100, G = "em") : /^scale/.test(z) ? (q /= 100, G = "") : /(Red|Green|Blue)$/i.test(z) && (q = q / 100 * 255, G = "")), /[\/*]/.test(D))
                      G = Y;
                    else if (Y !== G && 0 !== M)
                      if (0 === q)
                        G = Y;
                      else {
                        n = n || h();
                        var Q = /margin|padding|left|right|width|text|word|letter/i.test(z) || /X$/.test(z) || "x" === z ? "x" : "y";
                        switch (Y) {
                          case "%":
                            M *= "x" === Q ? n.percentToPxWidth : n.percentToPxHeight;
                            break;
                          case "px":
                            break;
                          default:
                            M *= n[Y + "ToPx"];
                        }
                        switch (G) {
                          case "%":
                            M *= 1 / ("x" === Q ? n.percentToPxWidth : n.percentToPxHeight);
                            break;
                          case "px":
                            break;
                          default:
                            M *= 1 / n[G + "ToPx"];
                        }
                      }
                    switch (D) {
                      case "+":
                        q = M + q;
                        break;
                      case "-":
                        q = M - q;
                        break;
                      case "*":
                        q = M * q;
                        break;
                      case "/":
                        q = M / q;
                    }
                    l[z] = {
                      rootPropertyValue: B,
                      startValue: M,
                      currentValue: M,
                      endValue: q,
                      unitType: G,
                      easing: $
                    }, b.debug && console.log("tweensContainer (" + z + "): " + JSON.stringify(l[z]), o);
                  } else
                    b.debug && console.log("Skipping [" + I + "] due to a lack of browser support.");
                }
                l.element = o;
              }
              l.element && (S.Values.addClass(o, "velocity-animating"), R.push(l), "" === s.queue && (i(o).tweensContainer = l, i(o).opts = s), i(o).isAnimating = !0, V === w - 1 ? (b.State.calls.push([R, g, s, null, k.resolver]), b.State.isTicking === !1 && (b.State.isTicking = !0, c())) : V++);
            }
            var n,
                o = this,
                s = f.extend({}, b.defaults, v),
                l = {};
            switch (i(o) === a && b.init(o), parseFloat(s.delay) && s.queue !== !1 && f.queue(o, s.queue, function(e) {
              b.velocityQueueEntryFlag = !0, i(o).delayTimer = {
                setTimeout: setTimeout(e, parseFloat(s.delay)),
                next: e
              };
            }), s.duration.toString().toLowerCase()) {
              case "fast":
                s.duration = 200;
                break;
              case "normal":
                s.duration = h;
                break;
              case "slow":
                s.duration = 600;
                break;
              default:
                s.duration = parseFloat(s.duration) || 1;
            }
            b.mock !== !1 && (b.mock === !0 ? s.duration = s.delay = 1 : (s.duration *= parseFloat(b.mock) || 1, s.delay *= parseFloat(b.mock) || 1)), s.easing = u(s.easing, s.duration), s.begin && !m.isFunction(s.begin) && (s.begin = null), s.progress && !m.isFunction(s.progress) && (s.progress = null), s.complete && !m.isFunction(s.complete) && (s.complete = null), s.display !== a && null !== s.display && (s.display = s.display.toString().toLowerCase(), "auto" === s.display && (s.display = b.CSS.Values.getDisplayType(o))), s.visibility !== a && null !== s.visibility && (s.visibility = s.visibility.toString().toLowerCase()), s.mobileHA = s.mobileHA && b.State.isMobile && !b.State.isGingerbread, s.queue === !1 ? s.delay ? setTimeout(e, s.delay) : e() : f.queue(o, s.queue, function(t, r) {
              return r === !0 ? (k.promise && k.resolver(g), !0) : (b.velocityQueueEntryFlag = !0, void e(t));
            }), "" !== s.queue && "fx" !== s.queue || "inprogress" === f.queue(o)[0] || f.dequeue(o);
          }
          var s,
              l,
              d,
              g,
              y,
              v,
              x = arguments[0] && (arguments[0].p || f.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || m.isString(arguments[0].properties));
          if (m.isWrapped(this) ? (s = !1, d = 0, g = this, l = this) : (s = !0, d = 1, g = x ? arguments[0].elements || arguments[0].e : arguments[0]), g = o(g)) {
            x ? (y = arguments[0].properties || arguments[0].p, v = arguments[0].options || arguments[0].o) : (y = arguments[d], v = arguments[d + 1]);
            var w = g.length,
                V = 0;
            if (!/^(stop|finish)$/i.test(y) && !f.isPlainObject(v)) {
              var C = d + 1;
              v = {};
              for (var T = C; T < arguments.length; T++)
                m.isArray(arguments[T]) || !/^(fast|normal|slow)$/i.test(arguments[T]) && !/^\d/.test(arguments[T]) ? m.isString(arguments[T]) || m.isArray(arguments[T]) ? v.easing = arguments[T] : m.isFunction(arguments[T]) && (v.complete = arguments[T]) : v.duration = arguments[T];
            }
            var k = {
              promise: null,
              resolver: null,
              rejecter: null
            };
            s && b.Promise && (k.promise = new b.Promise(function(e, t) {
              k.resolver = e, k.rejecter = t;
            }));
            var A;
            switch (y) {
              case "scroll":
                A = "scroll";
                break;
              case "reverse":
                A = "reverse";
                break;
              case "finish":
              case "stop":
                f.each(g, function(e, t) {
                  i(t) && i(t).delayTimer && (clearTimeout(i(t).delayTimer.setTimeout), i(t).delayTimer.next && i(t).delayTimer.next(), delete i(t).delayTimer);
                });
                var F = [];
                return f.each(b.State.calls, function(e, t) {
                  t && f.each(t[1], function(r, n) {
                    var o = v === a ? "" : v;
                    return o === !0 || t[2].queue === o || v === a && t[2].queue === !1 ? void f.each(g, function(r, a) {
                      a === n && ((v === !0 || m.isString(v)) && (f.each(f.queue(a, m.isString(v) ? v : ""), function(e, t) {
                        m.isFunction(t) && t(null, !0);
                      }), f.queue(a, m.isString(v) ? v : "", [])), "stop" === y ? (i(a) && i(a).tweensContainer && o !== !1 && f.each(i(a).tweensContainer, function(e, t) {
                        t.endValue = t.currentValue;
                      }), F.push(e)) : "finish" === y && (t[2].duration = 1));
                    }) : !0;
                  });
                }), "stop" === y && (f.each(F, function(e, t) {
                  p(t, !0);
                }), k.promise && k.resolver(g)), e();
              default:
                if (!f.isPlainObject(y) || m.isEmptyObject(y)) {
                  if (m.isString(y) && b.Redirects[y]) {
                    var j = f.extend({}, v),
                        E = j.duration,
                        H = j.delay || 0;
                    return j.backwards === !0 && (g = f.extend(!0, [], g).reverse()), f.each(g, function(e, t) {
                      parseFloat(j.stagger) ? j.delay = H + parseFloat(j.stagger) * e : m.isFunction(j.stagger) && (j.delay = H + j.stagger.call(t, e, w)), j.drag && (j.duration = parseFloat(E) || (/^(callout|transition)/.test(y) ? 1e3 : h), j.duration = Math.max(j.duration * (j.backwards ? 1 - e / w : (e + 1) / w), .75 * j.duration, 200)), b.Redirects[y].call(t, t, j || {}, e, w, g, k.promise ? k : a);
                    }), e();
                  }
                  var N = "Velocity: First argument (" + y + ") was not a property map, a known action, or a registered redirect. Aborting.";
                  return k.promise ? k.rejecter(new Error(N)) : console.log(N), e();
                }
                A = "start";
            }
            var L = {
              lastParent: null,
              lastPosition: null,
              lastFontSize: null,
              lastPercentToPxWidth: null,
              lastPercentToPxHeight: null,
              lastEmToPx: null,
              remToPx: null,
              vwToPx: null,
              vhToPx: null
            },
                R = [];
            f.each(g, function(e, t) {
              m.isNode(t) && n.call(t);
            });
            var z,
                j = f.extend({}, b.defaults, v);
            if (j.loop = parseInt(j.loop), z = 2 * j.loop - 1, j.loop)
              for (var O = 0; z > O; O++) {
                var q = {
                  delay: j.delay,
                  progress: j.progress
                };
                O === z - 1 && (q.display = j.display, q.visibility = j.visibility, q.complete = j.complete), P(g, "reverse", q);
              }
            return e();
          }
        };
        b = f.extend(P, b), b.animate = P;
        var w = t.requestAnimationFrame || g;
        return b.State.isMobile || r.hidden === a || r.addEventListener("visibilitychange", function() {
          r.hidden ? (w = function(e) {
            return setTimeout(function() {
              e(!0);
            }, 16);
          }, c()) : w = t.requestAnimationFrame || g;
        }), e.Velocity = b, e !== t && (e.fn.velocity = P, e.fn.velocity.defaults = b.defaults), f.each(["Down", "Up"], function(e, t) {
          b.Redirects["slide" + t] = function(e, r, n, o, i, s) {
            var l = f.extend({}, r),
                u = l.begin,
                c = l.complete,
                p = {
                  height: "",
                  marginTop: "",
                  marginBottom: "",
                  paddingTop: "",
                  paddingBottom: ""
                },
                d = {};
            l.display === a && (l.display = "Down" === t ? "inline" === b.CSS.Values.getDisplayType(e) ? "inline-block" : "block" : "none"), l.begin = function() {
              u && u.call(i, i);
              for (var r in p) {
                d[r] = e.style[r];
                var a = b.CSS.getPropertyValue(e, r);
                p[r] = "Down" === t ? [a, 0] : [0, a];
              }
              d.overflow = e.style.overflow, e.style.overflow = "hidden";
            }, l.complete = function() {
              for (var t in d)
                e.style[t] = d[t];
              c && c.call(i, i), s && s.resolver(i);
            }, b(e, p, l);
          };
        }), f.each(["In", "Out"], function(e, t) {
          b.Redirects["fade" + t] = function(e, r, n, o, i, s) {
            var l = f.extend({}, r),
                u = {opacity: "In" === t ? 1 : 0},
                c = l.complete;
            l.complete = n !== o - 1 ? l.begin = null : function() {
              c && c.call(i, i), s && s.resolver(i);
            }, l.display === a && (l.display = "In" === t ? "auto" : "none"), b(this, u, l);
          };
        }), b;
      }(window.jQuery || window.Zepto || window, window, document);
    }));
    ;
    !function(a, b, c, d) {
      "use strict";
      function k(a, b, c) {
        return setTimeout(q(a, c), b);
      }
      function l(a, b, c) {
        return Array.isArray(a) ? (m(a, c[b], c), !0) : !1;
      }
      function m(a, b, c) {
        var e;
        if (a)
          if (a.forEach)
            a.forEach(b, c);
          else if (a.length !== d)
            for (e = 0; e < a.length; )
              b.call(c, a[e], e, a), e++;
          else
            for (e in a)
              a.hasOwnProperty(e) && b.call(c, a[e], e, a);
      }
      function n(a, b, c) {
        for (var e = Object.keys(b),
            f = 0; f < e.length; )
          (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
        return a;
      }
      function o(a, b) {
        return n(a, b, !0);
      }
      function p(a, b, c) {
        var e,
            d = b.prototype;
        e = a.prototype = Object.create(d), e.constructor = a, e._super = d, c && n(e, c);
      }
      function q(a, b) {
        return function() {
          return a.apply(b, arguments);
        };
      }
      function r(a, b) {
        return typeof a == g ? a.apply(b ? b[0] || d : d, b) : a;
      }
      function s(a, b) {
        return a === d ? b : a;
      }
      function t(a, b, c) {
        m(x(b), function(b) {
          a.addEventListener(b, c, !1);
        });
      }
      function u(a, b, c) {
        m(x(b), function(b) {
          a.removeEventListener(b, c, !1);
        });
      }
      function v(a, b) {
        for (; a; ) {
          if (a == b)
            return !0;
          a = a.parentNode;
        }
        return !1;
      }
      function w(a, b) {
        return a.indexOf(b) > -1;
      }
      function x(a) {
        return a.trim().split(/\s+/g);
      }
      function y(a, b, c) {
        if (a.indexOf && !c)
          return a.indexOf(b);
        for (var d = 0; d < a.length; ) {
          if (c && a[d][c] == b || !c && a[d] === b)
            return d;
          d++;
        }
        return -1;
      }
      function z(a) {
        return Array.prototype.slice.call(a, 0);
      }
      function A(a, b, c) {
        for (var d = [],
            e = [],
            f = 0; f < a.length; ) {
          var g = b ? a[f][b] : a[f];
          y(e, g) < 0 && d.push(a[f]), e[f] = g, f++;
        }
        return c && (d = b ? d.sort(function(a, c) {
          return a[b] > c[b];
        }) : d.sort()), d;
      }
      function B(a, b) {
        for (var c,
            f,
            g = b[0].toUpperCase() + b.slice(1),
            h = 0; h < e.length; ) {
          if (c = e[h], f = c ? c + g : b, f in a)
            return f;
          h++;
        }
        return d;
      }
      function D() {
        return C++;
      }
      function E(a) {
        var b = a.ownerDocument;
        return b.defaultView || b.parentWindow;
      }
      function ab(a, b) {
        var c = this;
        this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function(b) {
          r(a.options.enable, [a]) && c.handler(b);
        }, this.init();
      }
      function bb(a) {
        var b,
            c = a.options.inputClass;
        return b = c ? c : H ? wb : I ? Eb : G ? Gb : rb, new b(a, cb);
      }
      function cb(a, b, c) {
        var d = c.pointers.length,
            e = c.changedPointers.length,
            f = b & O && 0 === d - e,
            g = b & (Q | R) && 0 === d - e;
        c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, db(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c;
      }
      function db(a, b) {
        var c = a.session,
            d = b.pointers,
            e = d.length;
        c.firstInput || (c.firstInput = gb(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = gb(b) : 1 === e && (c.firstMultiple = !1);
        var f = c.firstInput,
            g = c.firstMultiple,
            h = g ? g.center : f.center,
            i = b.center = hb(d);
        b.timeStamp = j(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = lb(h, i), b.distance = kb(h, i), eb(c, b), b.offsetDirection = jb(b.deltaX, b.deltaY), b.scale = g ? nb(g.pointers, d) : 1, b.rotation = g ? mb(g.pointers, d) : 0, fb(c, b);
        var k = a.element;
        v(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k;
      }
      function eb(a, b) {
        var c = b.center,
            d = a.offsetDelta || {},
            e = a.prevDelta || {},
            f = a.prevInput || {};
        (b.eventType === O || f.eventType === Q) && (e = a.prevDelta = {
          x: f.deltaX || 0,
          y: f.deltaY || 0
        }, d = a.offsetDelta = {
          x: c.x,
          y: c.y
        }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y);
      }
      function fb(a, b) {
        var f,
            g,
            h,
            j,
            c = a.lastInterval || b,
            e = b.timeStamp - c.timeStamp;
        if (b.eventType != R && (e > N || c.velocity === d)) {
          var k = c.deltaX - b.deltaX,
              l = c.deltaY - b.deltaY,
              m = ib(e, k, l);
          g = m.x, h = m.y, f = i(m.x) > i(m.y) ? m.x : m.y, j = jb(k, l), a.lastInterval = b;
        } else
          f = c.velocity, g = c.velocityX, h = c.velocityY, j = c.direction;
        b.velocity = f, b.velocityX = g, b.velocityY = h, b.direction = j;
      }
      function gb(a) {
        for (var b = [],
            c = 0; c < a.pointers.length; )
          b[c] = {
            clientX: h(a.pointers[c].clientX),
            clientY: h(a.pointers[c].clientY)
          }, c++;
        return {
          timeStamp: j(),
          pointers: b,
          center: hb(b),
          deltaX: a.deltaX,
          deltaY: a.deltaY
        };
      }
      function hb(a) {
        var b = a.length;
        if (1 === b)
          return {
            x: h(a[0].clientX),
            y: h(a[0].clientY)
          };
        for (var c = 0,
            d = 0,
            e = 0; b > e; )
          c += a[e].clientX, d += a[e].clientY, e++;
        return {
          x: h(c / b),
          y: h(d / b)
        };
      }
      function ib(a, b, c) {
        return {
          x: b / a || 0,
          y: c / a || 0
        };
      }
      function jb(a, b) {
        return a === b ? S : i(a) >= i(b) ? a > 0 ? T : U : b > 0 ? V : W;
      }
      function kb(a, b, c) {
        c || (c = $);
        var d = b[c[0]] - a[c[0]],
            e = b[c[1]] - a[c[1]];
        return Math.sqrt(d * d + e * e);
      }
      function lb(a, b, c) {
        c || (c = $);
        var d = b[c[0]] - a[c[0]],
            e = b[c[1]] - a[c[1]];
        return 180 * Math.atan2(e, d) / Math.PI;
      }
      function mb(a, b) {
        return lb(b[1], b[0], _) - lb(a[1], a[0], _);
      }
      function nb(a, b) {
        return kb(b[0], b[1], _) / kb(a[0], a[1], _);
      }
      function rb() {
        this.evEl = pb, this.evWin = qb, this.allow = !0, this.pressed = !1, ab.apply(this, arguments);
      }
      function wb() {
        this.evEl = ub, this.evWin = vb, ab.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
      }
      function Ab() {
        this.evTarget = yb, this.evWin = zb, this.started = !1, ab.apply(this, arguments);
      }
      function Bb(a, b) {
        var c = z(a.touches),
            d = z(a.changedTouches);
        return b & (Q | R) && (c = A(c.concat(d), "identifier", !0)), [c, d];
      }
      function Eb() {
        this.evTarget = Db, this.targetIds = {}, ab.apply(this, arguments);
      }
      function Fb(a, b) {
        var c = z(a.touches),
            d = this.targetIds;
        if (b & (O | P) && 1 === c.length)
          return d[c[0].identifier] = !0, [c, c];
        var e,
            f,
            g = z(a.changedTouches),
            h = [],
            i = this.target;
        if (f = c.filter(function(a) {
          return v(a.target, i);
        }), b === O)
          for (e = 0; e < f.length; )
            d[f[e].identifier] = !0, e++;
        for (e = 0; e < g.length; )
          d[g[e].identifier] && h.push(g[e]), b & (Q | R) && delete d[g[e].identifier], e++;
        return h.length ? [A(f.concat(h), "identifier", !0), h] : void 0;
      }
      function Gb() {
        ab.apply(this, arguments);
        var a = q(this.handler, this);
        this.touch = new Eb(this.manager, a), this.mouse = new rb(this.manager, a);
      }
      function Pb(a, b) {
        this.manager = a, this.set(b);
      }
      function Qb(a) {
        if (w(a, Mb))
          return Mb;
        var b = w(a, Nb),
            c = w(a, Ob);
        return b && c ? Nb + " " + Ob : b || c ? b ? Nb : Ob : w(a, Lb) ? Lb : Kb;
      }
      function Yb(a) {
        this.id = D(), this.manager = null, this.options = o(a || {}, this.defaults), this.options.enable = s(this.options.enable, !0), this.state = Rb, this.simultaneous = {}, this.requireFail = [];
      }
      function Zb(a) {
        return a & Wb ? "cancel" : a & Ub ? "end" : a & Tb ? "move" : a & Sb ? "start" : "";
      }
      function $b(a) {
        return a == W ? "down" : a == V ? "up" : a == T ? "left" : a == U ? "right" : "";
      }
      function _b(a, b) {
        var c = b.manager;
        return c ? c.get(a) : a;
      }
      function ac() {
        Yb.apply(this, arguments);
      }
      function bc() {
        ac.apply(this, arguments), this.pX = null, this.pY = null;
      }
      function cc() {
        ac.apply(this, arguments);
      }
      function dc() {
        Yb.apply(this, arguments), this._timer = null, this._input = null;
      }
      function ec() {
        ac.apply(this, arguments);
      }
      function fc() {
        ac.apply(this, arguments);
      }
      function gc() {
        Yb.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
      }
      function hc(a, b) {
        return b = b || {}, b.recognizers = s(b.recognizers, hc.defaults.preset), new kc(a, b);
      }
      function kc(a, b) {
        b = b || {}, this.options = o(b, hc.defaults), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, this.input = bb(this), this.touchAction = new Pb(this, this.options.touchAction), lc(this, !0), m(b.recognizers, function(a) {
          var b = this.add(new a[0](a[1]));
          a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]);
        }, this);
      }
      function lc(a, b) {
        var c = a.element;
        m(a.options.cssProps, function(a, d) {
          c.style[B(c.style, d)] = b ? a : "";
        });
      }
      function mc(a, c) {
        var d = b.createEvent("Event");
        d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d);
      }
      var e = ["", "webkit", "moz", "MS", "ms", "o"],
          f = b.createElement("div"),
          g = "function",
          h = Math.round,
          i = Math.abs,
          j = Date.now,
          C = 1,
          F = /mobile|tablet|ip(ad|hone|od)|android/i,
          G = "ontouchstart" in a,
          H = B(a, "PointerEvent") !== d,
          I = G && F.test(navigator.userAgent),
          J = "touch",
          K = "pen",
          L = "mouse",
          M = "kinect",
          N = 25,
          O = 1,
          P = 2,
          Q = 4,
          R = 8,
          S = 1,
          T = 2,
          U = 4,
          V = 8,
          W = 16,
          X = T | U,
          Y = V | W,
          Z = X | Y,
          $ = ["x", "y"],
          _ = ["clientX", "clientY"];
      ab.prototype = {
        handler: function() {},
        init: function() {
          this.evEl && t(this.element, this.evEl, this.domHandler), this.evTarget && t(this.target, this.evTarget, this.domHandler), this.evWin && t(E(this.element), this.evWin, this.domHandler);
        },
        destroy: function() {
          this.evEl && u(this.element, this.evEl, this.domHandler), this.evTarget && u(this.target, this.evTarget, this.domHandler), this.evWin && u(E(this.element), this.evWin, this.domHandler);
        }
      };
      var ob = {
        mousedown: O,
        mousemove: P,
        mouseup: Q
      },
          pb = "mousedown",
          qb = "mousemove mouseup";
      p(rb, ab, {handler: function(a) {
          var b = ob[a.type];
          b & O && 0 === a.button && (this.pressed = !0), b & P && 1 !== a.which && (b = Q), this.pressed && this.allow && (b & Q && (this.pressed = !1), this.callback(this.manager, b, {
            pointers: [a],
            changedPointers: [a],
            pointerType: L,
            srcEvent: a
          }));
        }});
      var sb = {
        pointerdown: O,
        pointermove: P,
        pointerup: Q,
        pointercancel: R,
        pointerout: R
      },
          tb = {
            2: J,
            3: K,
            4: L,
            5: M
          },
          ub = "pointerdown",
          vb = "pointermove pointerup pointercancel";
      a.MSPointerEvent && (ub = "MSPointerDown", vb = "MSPointerMove MSPointerUp MSPointerCancel"), p(wb, ab, {handler: function(a) {
          var b = this.store,
              c = !1,
              d = a.type.toLowerCase().replace("ms", ""),
              e = sb[d],
              f = tb[a.pointerType] || a.pointerType,
              g = f == J,
              h = y(b, a.pointerId, "pointerId");
          e & O && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Q | R) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, {
            pointers: b,
            changedPointers: [a],
            pointerType: f,
            srcEvent: a
          }), c && b.splice(h, 1));
        }});
      var xb = {
        touchstart: O,
        touchmove: P,
        touchend: Q,
        touchcancel: R
      },
          yb = "touchstart",
          zb = "touchstart touchmove touchend touchcancel";
      p(Ab, ab, {handler: function(a) {
          var b = xb[a.type];
          if (b === O && (this.started = !0), this.started) {
            var c = Bb.call(this, a, b);
            b & (Q | R) && 0 === c[0].length - c[1].length && (this.started = !1), this.callback(this.manager, b, {
              pointers: c[0],
              changedPointers: c[1],
              pointerType: J,
              srcEvent: a
            });
          }
        }});
      var Cb = {
        touchstart: O,
        touchmove: P,
        touchend: Q,
        touchcancel: R
      },
          Db = "touchstart touchmove touchend touchcancel";
      p(Eb, ab, {handler: function(a) {
          var b = Cb[a.type],
              c = Fb.call(this, a, b);
          c && this.callback(this.manager, b, {
            pointers: c[0],
            changedPointers: c[1],
            pointerType: J,
            srcEvent: a
          });
        }}), p(Gb, ab, {
        handler: function(a, b, c) {
          var d = c.pointerType == J,
              e = c.pointerType == L;
          if (d)
            this.mouse.allow = !1;
          else if (e && !this.mouse.allow)
            return;
          b & (Q | R) && (this.mouse.allow = !0), this.callback(a, b, c);
        },
        destroy: function() {
          this.touch.destroy(), this.mouse.destroy();
        }
      });
      var Hb = B(f.style, "touchAction"),
          Ib = Hb !== d,
          Jb = "compute",
          Kb = "auto",
          Lb = "manipulation",
          Mb = "none",
          Nb = "pan-x",
          Ob = "pan-y";
      Pb.prototype = {
        set: function(a) {
          a == Jb && (a = this.compute()), Ib && (this.manager.element.style[Hb] = a), this.actions = a.toLowerCase().trim();
        },
        update: function() {
          this.set(this.manager.options.touchAction);
        },
        compute: function() {
          var a = [];
          return m(this.manager.recognizers, function(b) {
            r(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()));
          }), Qb(a.join(" "));
        },
        preventDefaults: function(a) {
          if (!Ib) {
            var b = a.srcEvent,
                c = a.offsetDirection;
            if (this.manager.session.prevented)
              return b.preventDefault(), void 0;
            var d = this.actions,
                e = w(d, Mb),
                f = w(d, Ob),
                g = w(d, Nb);
            return e || f && c & X || g && c & Y ? this.preventSrc(b) : void 0;
          }
        },
        preventSrc: function(a) {
          this.manager.session.prevented = !0, a.preventDefault();
        }
      };
      var Rb = 1,
          Sb = 2,
          Tb = 4,
          Ub = 8,
          Vb = Ub,
          Wb = 16,
          Xb = 32;
      Yb.prototype = {
        defaults: {},
        set: function(a) {
          return n(this.options, a), this.manager && this.manager.touchAction.update(), this;
        },
        recognizeWith: function(a) {
          if (l(a, "recognizeWith", this))
            return this;
          var b = this.simultaneous;
          return a = _b(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this;
        },
        dropRecognizeWith: function(a) {
          return l(a, "dropRecognizeWith", this) ? this : (a = _b(a, this), delete this.simultaneous[a.id], this);
        },
        requireFailure: function(a) {
          if (l(a, "requireFailure", this))
            return this;
          var b = this.requireFail;
          return a = _b(a, this), -1 === y(b, a) && (b.push(a), a.requireFailure(this)), this;
        },
        dropRequireFailure: function(a) {
          if (l(a, "dropRequireFailure", this))
            return this;
          a = _b(a, this);
          var b = y(this.requireFail, a);
          return b > -1 && this.requireFail.splice(b, 1), this;
        },
        hasRequireFailures: function() {
          return this.requireFail.length > 0;
        },
        canRecognizeWith: function(a) {
          return !!this.simultaneous[a.id];
        },
        emit: function(a) {
          function d(d) {
            b.manager.emit(b.options.event + (d ? Zb(c) : ""), a);
          }
          var b = this,
              c = this.state;
          Ub > c && d(!0), d(), c >= Ub && d(!0);
        },
        tryEmit: function(a) {
          return this.canEmit() ? this.emit(a) : (this.state = Xb, void 0);
        },
        canEmit: function() {
          for (var a = 0; a < this.requireFail.length; ) {
            if (!(this.requireFail[a].state & (Xb | Rb)))
              return !1;
            a++;
          }
          return !0;
        },
        recognize: function(a) {
          var b = n({}, a);
          return r(this.options.enable, [this, b]) ? (this.state & (Vb | Wb | Xb) && (this.state = Rb), this.state = this.process(b), this.state & (Sb | Tb | Ub | Wb) && this.tryEmit(b), void 0) : (this.reset(), this.state = Xb, void 0);
        },
        process: function() {},
        getTouchAction: function() {},
        reset: function() {}
      }, p(ac, Yb, {
        defaults: {pointers: 1},
        attrTest: function(a) {
          var b = this.options.pointers;
          return 0 === b || a.pointers.length === b;
        },
        process: function(a) {
          var b = this.state,
              c = a.eventType,
              d = b & (Sb | Tb),
              e = this.attrTest(a);
          return d && (c & R || !e) ? b | Wb : d || e ? c & Q ? b | Ub : b & Sb ? b | Tb : Sb : Xb;
        }
      }), p(bc, ac, {
        defaults: {
          event: "pan",
          threshold: 10,
          pointers: 1,
          direction: Z
        },
        getTouchAction: function() {
          var a = this.options.direction,
              b = [];
          return a & X && b.push(Ob), a & Y && b.push(Nb), b;
        },
        directionTest: function(a) {
          var b = this.options,
              c = !0,
              d = a.distance,
              e = a.direction,
              f = a.deltaX,
              g = a.deltaY;
          return e & b.direction || (b.direction & X ? (e = 0 === f ? S : 0 > f ? T : U, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? S : 0 > g ? V : W, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction;
        },
        attrTest: function(a) {
          return ac.prototype.attrTest.call(this, a) && (this.state & Sb || !(this.state & Sb) && this.directionTest(a));
        },
        emit: function(a) {
          this.pX = a.deltaX, this.pY = a.deltaY;
          var b = $b(a.direction);
          b && this.manager.emit(this.options.event + b, a), this._super.emit.call(this, a);
        }
      }), p(cc, ac, {
        defaults: {
          event: "pinch",
          threshold: 0,
          pointers: 2
        },
        getTouchAction: function() {
          return [Mb];
        },
        attrTest: function(a) {
          return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & Sb);
        },
        emit: function(a) {
          if (this._super.emit.call(this, a), 1 !== a.scale) {
            var b = a.scale < 1 ? "in" : "out";
            this.manager.emit(this.options.event + b, a);
          }
        }
      }), p(dc, Yb, {
        defaults: {
          event: "press",
          pointers: 1,
          time: 500,
          threshold: 5
        },
        getTouchAction: function() {
          return [Kb];
        },
        process: function(a) {
          var b = this.options,
              c = a.pointers.length === b.pointers,
              d = a.distance < b.threshold,
              e = a.deltaTime > b.time;
          if (this._input = a, !d || !c || a.eventType & (Q | R) && !e)
            this.reset();
          else if (a.eventType & O)
            this.reset(), this._timer = k(function() {
              this.state = Vb, this.tryEmit();
            }, b.time, this);
          else if (a.eventType & Q)
            return Vb;
          return Xb;
        },
        reset: function() {
          clearTimeout(this._timer);
        },
        emit: function(a) {
          this.state === Vb && (a && a.eventType & Q ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = j(), this.manager.emit(this.options.event, this._input)));
        }
      }), p(ec, ac, {
        defaults: {
          event: "rotate",
          threshold: 0,
          pointers: 2
        },
        getTouchAction: function() {
          return [Mb];
        },
        attrTest: function(a) {
          return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & Sb);
        }
      }), p(fc, ac, {
        defaults: {
          event: "swipe",
          threshold: 10,
          velocity: .65,
          direction: X | Y,
          pointers: 1
        },
        getTouchAction: function() {
          return bc.prototype.getTouchAction.call(this);
        },
        attrTest: function(a) {
          var c,
              b = this.options.direction;
          return b & (X | Y) ? c = a.velocity : b & X ? c = a.velocityX : b & Y && (c = a.velocityY), this._super.attrTest.call(this, a) && b & a.direction && a.distance > this.options.threshold && i(c) > this.options.velocity && a.eventType & Q;
        },
        emit: function(a) {
          var b = $b(a.direction);
          b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a);
        }
      }), p(gc, Yb, {
        defaults: {
          event: "tap",
          pointers: 1,
          taps: 1,
          interval: 300,
          time: 250,
          threshold: 2,
          posThreshold: 10
        },
        getTouchAction: function() {
          return [Lb];
        },
        process: function(a) {
          var b = this.options,
              c = a.pointers.length === b.pointers,
              d = a.distance < b.threshold,
              e = a.deltaTime < b.time;
          if (this.reset(), a.eventType & O && 0 === this.count)
            return this.failTimeout();
          if (d && e && c) {
            if (a.eventType != Q)
              return this.failTimeout();
            var f = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
                g = !this.pCenter || kb(this.pCenter, a.center) < b.posThreshold;
            this.pTime = a.timeStamp, this.pCenter = a.center, g && f ? this.count += 1 : this.count = 1, this._input = a;
            var h = this.count % b.taps;
            if (0 === h)
              return this.hasRequireFailures() ? (this._timer = k(function() {
                this.state = Vb, this.tryEmit();
              }, b.interval, this), Sb) : Vb;
          }
          return Xb;
        },
        failTimeout: function() {
          return this._timer = k(function() {
            this.state = Xb;
          }, this.options.interval, this), Xb;
        },
        reset: function() {
          clearTimeout(this._timer);
        },
        emit: function() {
          this.state == Vb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
        }
      }), hc.VERSION = "2.0.4", hc.defaults = {
        domEvents: !1,
        touchAction: Jb,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [[ec, {enable: !1}], [cc, {enable: !1}, ["rotate"]], [fc, {direction: X}], [bc, {direction: X}, ["swipe"]], [gc], [gc, {
          event: "doubletap",
          taps: 2
        }, ["tap"]], [dc]],
        cssProps: {
          userSelect: "default",
          touchSelect: "none",
          touchCallout: "none",
          contentZooming: "none",
          userDrag: "none",
          tapHighlightColor: "rgba(0,0,0,0)"
        }
      };
      var ic = 1,
          jc = 2;
      kc.prototype = {
        set: function(a) {
          return n(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this;
        },
        stop: function(a) {
          this.session.stopped = a ? jc : ic;
        },
        recognize: function(a) {
          var b = this.session;
          if (!b.stopped) {
            this.touchAction.preventDefaults(a);
            var c,
                d = this.recognizers,
                e = b.curRecognizer;
            (!e || e && e.state & Vb) && (e = b.curRecognizer = null);
            for (var f = 0; f < d.length; )
              c = d[f], b.stopped === jc || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (Sb | Tb | Ub) && (e = b.curRecognizer = c), f++;
          }
        },
        get: function(a) {
          if (a instanceof Yb)
            return a;
          for (var b = this.recognizers,
              c = 0; c < b.length; c++)
            if (b[c].options.event == a)
              return b[c];
          return null;
        },
        add: function(a) {
          if (l(a, "add", this))
            return this;
          var b = this.get(a.options.event);
          return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a;
        },
        remove: function(a) {
          if (l(a, "remove", this))
            return this;
          var b = this.recognizers;
          return a = this.get(a), b.splice(y(b, a), 1), this.touchAction.update(), this;
        },
        on: function(a, b) {
          var c = this.handlers;
          return m(x(a), function(a) {
            c[a] = c[a] || [], c[a].push(b);
          }), this;
        },
        off: function(a, b) {
          var c = this.handlers;
          return m(x(a), function(a) {
            b ? c[a].splice(y(c[a], b), 1) : delete c[a];
          }), this;
        },
        emit: function(a, b) {
          this.options.domEvents && mc(a, b);
          var c = this.handlers[a] && this.handlers[a].slice();
          if (c && c.length) {
            b.type = a, b.preventDefault = function() {
              b.srcEvent.preventDefault();
            };
            for (var d = 0; d < c.length; )
              c[d](b), d++;
          }
        },
        destroy: function() {
          this.element && lc(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
        }
      }, n(hc, {
        INPUT_START: O,
        INPUT_MOVE: P,
        INPUT_END: Q,
        INPUT_CANCEL: R,
        STATE_POSSIBLE: Rb,
        STATE_BEGAN: Sb,
        STATE_CHANGED: Tb,
        STATE_ENDED: Ub,
        STATE_RECOGNIZED: Vb,
        STATE_CANCELLED: Wb,
        STATE_FAILED: Xb,
        DIRECTION_NONE: S,
        DIRECTION_LEFT: T,
        DIRECTION_RIGHT: U,
        DIRECTION_UP: V,
        DIRECTION_DOWN: W,
        DIRECTION_HORIZONTAL: X,
        DIRECTION_VERTICAL: Y,
        DIRECTION_ALL: Z,
        Manager: kc,
        Input: ab,
        TouchAction: Pb,
        TouchInput: Eb,
        MouseInput: rb,
        PointerEventInput: wb,
        TouchMouseInput: Gb,
        SingleTouchInput: Ab,
        Recognizer: Yb,
        AttrRecognizer: ac,
        Tap: gc,
        Pan: bc,
        Swipe: fc,
        Pinch: cc,
        Rotate: ec,
        Press: dc,
        on: t,
        off: u,
        each: m,
        merge: o,
        extend: n,
        inherit: p,
        bindFn: q,
        prefixed: B
      }), typeof define == g && define.amd ? define(function() {
        return hc;
      }) : "undefined" != typeof module && module.exports ? module.exports = hc : a[c] = hc;
    }(window, document, "Hammer");
    ;
    (function(factory) {
      if (typeof define === 'function' && define.amd) {
        define(['jquery', 'hammerjs'], factory);
      } else if (typeof exports === 'object') {
        factory(require('jquery'), require('hammerjs'));
      } else {
        factory(jQuery, Hammer);
      }
    }(function($, Hammer) {
      function hammerify(el, options) {
        var $el = $(el);
        if (!$el.data("hammer")) {
          $el.data("hammer", new Hammer($el[0], options));
        }
      }
      $.fn.hammer = function(options) {
        return this.each(function() {
          hammerify(this, options);
        });
      };
      Hammer.Manager.prototype.emit = (function(originalEmit) {
        return function(type, data) {
          originalEmit.call(this, type, data);
          $(this.element).trigger({
            type: type,
            gesture: data
          });
        };
      })(Hammer.Manager.prototype.emit);
    }));
    ;
    (function(window) {
      if (window.Package) {
        Materialize = {};
      } else {
        window.Materialize = {};
      }
    })(window);
    Materialize.guid = (function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      };
    })();
    Materialize.elementOrParentIsFixed = function(element) {
      var $element = $(element);
      var $checkElements = $element.add($element.parents());
      var isFixed = false;
      $checkElements.each(function() {
        if ($(this).css("position") === "fixed") {
          isFixed = true;
          return false;
        }
      });
      return isFixed;
    };
    var Vel;
    if ($) {
      Vel = $.Velocity;
    } else if (jQuery) {
      Vel = jQuery.Velocity;
    } else {
      Vel = Velocity;
    }
    ;
    (function($) {
      $.fn.collapsible = function(options) {
        var defaults = {accordion: undefined};
        options = $.extend(defaults, options);
        return this.each(function() {
          var $this = $(this);
          var $panel_headers = $(this).find('> li > .collapsible-header');
          var collapsible_type = $this.data("collapsible");
          $this.off('click.collapse', '> li > .collapsible-header');
          $panel_headers.off('click.collapse');
          function accordionOpen(object) {
            $panel_headers = $this.find('> li > .collapsible-header');
            if (object.hasClass('active')) {
              object.parent().addClass('active');
            } else {
              object.parent().removeClass('active');
            }
            if (object.parent().hasClass('active')) {
              object.siblings('.collapsible-body').stop(true, false).slideDown({
                duration: 350,
                easing: "easeOutQuart",
                queue: false,
                complete: function() {
                  $(this).css('height', '');
                }
              });
            } else {
              object.siblings('.collapsible-body').stop(true, false).slideUp({
                duration: 350,
                easing: "easeOutQuart",
                queue: false,
                complete: function() {
                  $(this).css('height', '');
                }
              });
            }
            $panel_headers.not(object).removeClass('active').parent().removeClass('active');
            $panel_headers.not(object).parent().children('.collapsible-body').stop(true, false).slideUp({
              duration: 350,
              easing: "easeOutQuart",
              queue: false,
              complete: function() {
                $(this).css('height', '');
              }
            });
          }
          function expandableOpen(object) {
            if (object.hasClass('active')) {
              object.parent().addClass('active');
            } else {
              object.parent().removeClass('active');
            }
            if (object.parent().hasClass('active')) {
              object.siblings('.collapsible-body').stop(true, false).slideDown({
                duration: 350,
                easing: "easeOutQuart",
                queue: false,
                complete: function() {
                  $(this).css('height', '');
                }
              });
            } else {
              object.siblings('.collapsible-body').stop(true, false).slideUp({
                duration: 350,
                easing: "easeOutQuart",
                queue: false,
                complete: function() {
                  $(this).css('height', '');
                }
              });
            }
          }
          function isChildrenOfPanelHeader(object) {
            var panelHeader = getPanelHeader(object);
            return panelHeader.length > 0;
          }
          function getPanelHeader(object) {
            return object.closest('li > .collapsible-header');
          }
          $this.on('click.collapse', '> li > .collapsible-header', function(e) {
            var $header = $(this),
                element = $(e.target);
            if (isChildrenOfPanelHeader(element)) {
              element = getPanelHeader(element);
            }
            element.toggleClass('active');
            if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) {
              accordionOpen(element);
            } else {
              expandableOpen(element);
              if ($header.hasClass('active')) {
                expandableOpen($header);
              }
            }
          });
          var $panel_headers = $this.find('> li > .collapsible-header');
          if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) {
            accordionOpen($panel_headers.filter('.active').first());
          } else {
            $panel_headers.filter('.active').each(function() {
              expandableOpen($(this));
            });
          }
        });
      };
      $(document).ready(function() {
        $('.collapsible').collapsible();
      });
    }(jQuery));
    ;
    (function($) {
      $.fn.scrollTo = function(elem) {
        $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top);
        return this;
      };
      $.fn.dropdown = function(option) {
        var defaults = {
          inDuration: 300,
          outDuration: 225,
          constrain_width: true,
          hover: false,
          gutter: 0,
          belowOrigin: false,
          alignment: 'left'
        };
        this.each(function() {
          var origin = $(this);
          var options = $.extend({}, defaults, option);
          var isFocused = false;
          var activates = $("#" + origin.attr('data-activates'));
          function updateOptions() {
            if (origin.data('induration') !== undefined)
              options.inDuration = origin.data('inDuration');
            if (origin.data('outduration') !== undefined)
              options.outDuration = origin.data('outDuration');
            if (origin.data('constrainwidth') !== undefined)
              options.constrain_width = origin.data('constrainwidth');
            if (origin.data('hover') !== undefined)
              options.hover = origin.data('hover');
            if (origin.data('gutter') !== undefined)
              options.gutter = origin.data('gutter');
            if (origin.data('beloworigin') !== undefined)
              options.belowOrigin = origin.data('beloworigin');
            if (origin.data('alignment') !== undefined)
              options.alignment = origin.data('alignment');
          }
          updateOptions();
          origin.after(activates);
          function placeDropdown(eventType) {
            if (eventType === 'focus') {
              isFocused = true;
            }
            updateOptions();
            activates.addClass('active');
            origin.addClass('active');
            if (options.constrain_width === true) {
              activates.css('width', origin.outerWidth());
            } else {
              activates.css('white-space', 'nowrap');
            }
            var windowHeight = window.innerHeight;
            var originHeight = origin.innerHeight();
            var offsetLeft = origin.offset().left;
            var offsetTop = origin.offset().top - $(window).scrollTop();
            var currAlignment = options.alignment;
            var gutterSpacing = 0;
            var leftPosition = 0;
            var verticalOffset = 0;
            if (options.belowOrigin === true) {
              verticalOffset = originHeight;
            }
            var scrollOffset = 0;
            var wrapper = origin.parent();
            if (!wrapper.is('body') && wrapper[0].scrollHeight > wrapper[0].clientHeight) {
              scrollOffset = wrapper[0].scrollTop;
            }
            if (offsetLeft + activates.innerWidth() > $(window).width()) {
              currAlignment = 'right';
            } else if (offsetLeft - activates.innerWidth() + origin.innerWidth() < 0) {
              currAlignment = 'left';
            }
            if (offsetTop + activates.innerHeight() > windowHeight) {
              if (offsetTop + originHeight - activates.innerHeight() < 0) {
                var adjustedHeight = windowHeight - offsetTop - verticalOffset;
                activates.css('max-height', adjustedHeight);
              } else {
                if (!verticalOffset) {
                  verticalOffset += originHeight;
                }
                verticalOffset -= activates.innerHeight();
              }
            }
            if (currAlignment === 'left') {
              gutterSpacing = options.gutter;
              leftPosition = origin.position().left + gutterSpacing;
            } else if (currAlignment === 'right') {
              var offsetRight = origin.position().left + origin.outerWidth() - activates.outerWidth();
              gutterSpacing = -options.gutter;
              leftPosition = offsetRight + gutterSpacing;
            }
            activates.css({
              position: 'absolute',
              top: origin.position().top + verticalOffset + scrollOffset,
              left: leftPosition
            });
            activates.stop(true, true).css('opacity', 0).slideDown({
              queue: false,
              duration: options.inDuration,
              easing: 'easeOutCubic',
              complete: function() {
                $(this).css('height', '');
              }
            }).animate({opacity: 1}, {
              queue: false,
              duration: options.inDuration,
              easing: 'easeOutSine'
            });
          }
          function hideDropdown() {
            isFocused = false;
            activates.fadeOut(options.outDuration);
            activates.removeClass('active');
            origin.removeClass('active');
            setTimeout(function() {
              activates.css('max-height', '');
            }, options.outDuration);
          }
          if (options.hover) {
            var open = false;
            origin.unbind('click.' + origin.attr('id'));
            origin.on('mouseenter', function(e) {
              if (open === false) {
                placeDropdown();
                open = true;
              }
            });
            origin.on('mouseleave', function(e) {
              var toEl = e.toElement || e.relatedTarget;
              if (!$(toEl).closest('.dropdown-content').is(activates)) {
                activates.stop(true, true);
                hideDropdown();
                open = false;
              }
            });
            activates.on('mouseleave', function(e) {
              var toEl = e.toElement || e.relatedTarget;
              if (!$(toEl).closest('.dropdown-button').is(origin)) {
                activates.stop(true, true);
                hideDropdown();
                open = false;
              }
            });
          } else {
            origin.unbind('click.' + origin.attr('id'));
            origin.bind('click.' + origin.attr('id'), function(e) {
              if (!isFocused) {
                if (origin[0] == e.currentTarget && !origin.hasClass('active') && ($(e.target).closest('.dropdown-content').length === 0)) {
                  e.preventDefault();
                  placeDropdown('click');
                } else if (origin.hasClass('active')) {
                  hideDropdown();
                  $(document).unbind('click.' + activates.attr('id') + ' touchstart.' + activates.attr('id'));
                }
                if (activates.hasClass('active')) {
                  $(document).bind('click.' + activates.attr('id') + ' touchstart.' + activates.attr('id'), function(e) {
                    if (!activates.is(e.target) && !origin.is(e.target) && (!origin.find(e.target).length)) {
                      hideDropdown();
                      $(document).unbind('click.' + activates.attr('id') + ' touchstart.' + activates.attr('id'));
                    }
                  });
                }
              }
            });
          }
          origin.on('open', function(e, eventType) {
            placeDropdown(eventType);
          });
          origin.on('close', hideDropdown);
        });
      };
      $(document).ready(function() {
        $('.dropdown-button').dropdown();
      });
    }(jQuery));
    ;
    (function($) {
      var _stack = 0,
          _lastID = 0,
          _generateID = function() {
            _lastID++;
            return 'materialize-lean-overlay-' + _lastID;
          };
      $.fn.extend({openModal: function(options) {
          var $body = $('body');
          var oldWidth = $body.innerWidth();
          $body.css('overflow', 'hidden');
          $body.width(oldWidth);
          var defaults = {
            opacity: 0.5,
            in_duration: 350,
            out_duration: 250,
            ready: undefined,
            complete: undefined,
            dismissible: true,
            starting_top: '4%'
          },
              $modal = $(this);
          if ($modal.hasClass('open')) {
            return;
          }
          overlayID = _generateID();
          $overlay = $('<div class="lean-overlay"></div>');
          lStack = (++_stack);
          $overlay.attr('id', overlayID).css('z-index', 1000 + lStack * 2);
          $modal.data('overlay-id', overlayID).css('z-index', 1000 + lStack * 2 + 1);
          $modal.addClass('open');
          $("body").append($overlay);
          options = $.extend(defaults, options);
          if (options.dismissible) {
            $overlay.click(function() {
              $modal.closeModal(options);
            });
            $(document).on('keyup.leanModal' + overlayID, function(e) {
              if (e.keyCode === 27) {
                $modal.closeModal(options);
              }
            });
          }
          $modal.find(".modal-close").on('click.close', function(e) {
            $modal.closeModal(options);
          });
          $overlay.css({
            display: "block",
            opacity: 0
          });
          $modal.css({
            display: "block",
            opacity: 0
          });
          $overlay.velocity({opacity: options.opacity}, {
            duration: options.in_duration,
            queue: false,
            ease: "easeOutCubic"
          });
          $modal.data('associated-overlay', $overlay[0]);
          if ($modal.hasClass('bottom-sheet')) {
            $modal.velocity({
              bottom: "0",
              opacity: 1
            }, {
              duration: options.in_duration,
              queue: false,
              ease: "easeOutCubic",
              complete: function() {
                if (typeof(options.ready) === "function") {
                  options.ready();
                }
              }
            });
          } else {
            $.Velocity.hook($modal, "scaleX", 0.7);
            $modal.css({top: options.starting_top});
            $modal.velocity({
              top: "10%",
              opacity: 1,
              scaleX: '1'
            }, {
              duration: options.in_duration,
              queue: false,
              ease: "easeOutCubic",
              complete: function() {
                if (typeof(options.ready) === "function") {
                  options.ready();
                }
              }
            });
          }
        }});
      $.fn.extend({closeModal: function(options) {
          var defaults = {
            out_duration: 250,
            complete: undefined
          },
              $modal = $(this),
              overlayID = $modal.data('overlay-id'),
              $overlay = $('#' + overlayID);
          $modal.removeClass('open');
          options = $.extend(defaults, options);
          $('body').css({
            overflow: '',
            width: ''
          });
          $modal.find('.modal-close').off('click.close');
          $(document).off('keyup.leanModal' + overlayID);
          $overlay.velocity({opacity: 0}, {
            duration: options.out_duration,
            queue: false,
            ease: "easeOutQuart"
          });
          if ($modal.hasClass('bottom-sheet')) {
            $modal.velocity({
              bottom: "-100%",
              opacity: 0
            }, {
              duration: options.out_duration,
              queue: false,
              ease: "easeOutCubic",
              complete: function() {
                $overlay.css({display: "none"});
                if (typeof(options.complete) === "function") {
                  options.complete();
                }
                $overlay.remove();
                _stack--;
              }
            });
          } else {
            $modal.velocity({
              top: options.starting_top,
              opacity: 0,
              scaleX: 0.7
            }, {
              duration: options.out_duration,
              complete: function() {
                $(this).css('display', 'none');
                if (typeof(options.complete) === "function") {
                  options.complete();
                }
                $overlay.remove();
                _stack--;
              }
            });
          }
        }});
      $.fn.extend({leanModal: function(option) {
          return this.each(function() {
            var defaults = {starting_top: '4%'},
                options = $.extend(defaults, option);
            $(this).click(function(e) {
              options.starting_top = ($(this).offset().top - $(window).scrollTop()) / 1.15;
              var modal_id = $(this).attr("href") || '#' + $(this).data('target');
              $(modal_id).openModal(options);
              e.preventDefault();
            });
          });
        }});
    })(jQuery);
    ;
    (function($) {
      $.fn.materialbox = function() {
        return this.each(function() {
          if ($(this).hasClass('initialized')) {
            return;
          }
          $(this).addClass('initialized');
          var overlayActive = false;
          var doneAnimating = true;
          var inDuration = 275;
          var outDuration = 200;
          var origin = $(this);
          var placeholder = $('<div></div>').addClass('material-placeholder');
          var originalWidth = 0;
          var originalHeight = 0;
          var ancestorsChanged;
          var ancestor;
          origin.wrap(placeholder);
          origin.on('click', function() {
            var placeholder = origin.parent('.material-placeholder');
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var originalWidth = origin.width();
            var originalHeight = origin.height();
            if (doneAnimating === false) {
              returnToOriginal();
              return false;
            } else if (overlayActive && doneAnimating === true) {
              returnToOriginal();
              return false;
            }
            doneAnimating = false;
            origin.addClass('active');
            overlayActive = true;
            placeholder.css({
              width: placeholder[0].getBoundingClientRect().width,
              height: placeholder[0].getBoundingClientRect().height,
              position: 'relative',
              top: 0,
              left: 0
            });
            ancestorsChanged = undefined;
            ancestor = placeholder[0].parentNode;
            var count = 0;
            while (ancestor !== null && !$(ancestor).is(document)) {
              var curr = $(ancestor);
              if (curr.css('overflow') !== 'visible') {
                curr.css('overflow', 'visible');
                if (ancestorsChanged === undefined) {
                  ancestorsChanged = curr;
                } else {
                  ancestorsChanged = ancestorsChanged.add(curr);
                }
              }
              ancestor = ancestor.parentNode;
            }
            origin.css({
              position: 'absolute',
              'z-index': 1000
            }).data('width', originalWidth).data('height', originalHeight);
            var overlay = $('<div id="materialbox-overlay"></div>').css({opacity: 0}).click(function() {
              if (doneAnimating === true)
                returnToOriginal();
            });
            origin.before(overlay);
            overlay.velocity({opacity: 1}, {
              duration: inDuration,
              queue: false,
              easing: 'easeOutQuad'
            });
            if (origin.data('caption') !== "") {
              var $photo_caption = $('<div class="materialbox-caption"></div>');
              $photo_caption.text(origin.data('caption'));
              $('body').append($photo_caption);
              $photo_caption.css({"display": "inline"});
              $photo_caption.velocity({opacity: 1}, {
                duration: inDuration,
                queue: false,
                easing: 'easeOutQuad'
              });
            }
            var ratio = 0;
            var widthPercent = originalWidth / windowWidth;
            var heightPercent = originalHeight / windowHeight;
            var newWidth = 0;
            var newHeight = 0;
            if (widthPercent > heightPercent) {
              ratio = originalHeight / originalWidth;
              newWidth = windowWidth * 0.9;
              newHeight = windowWidth * 0.9 * ratio;
            } else {
              ratio = originalWidth / originalHeight;
              newWidth = (windowHeight * 0.9) * ratio;
              newHeight = windowHeight * 0.9;
            }
            if (origin.hasClass('responsive-img')) {
              origin.velocity({
                'max-width': newWidth,
                'width': originalWidth
              }, {
                duration: 0,
                queue: false,
                complete: function() {
                  origin.css({
                    left: 0,
                    top: 0
                  }).velocity({
                    height: newHeight,
                    width: newWidth,
                    left: $(document).scrollLeft() + windowWidth / 2 - origin.parent('.material-placeholder').offset().left - newWidth / 2,
                    top: $(document).scrollTop() + windowHeight / 2 - origin.parent('.material-placeholder').offset().top - newHeight / 2
                  }, {
                    duration: inDuration,
                    queue: false,
                    easing: 'easeOutQuad',
                    complete: function() {
                      doneAnimating = true;
                    }
                  });
                }
              });
            } else {
              origin.css('left', 0).css('top', 0).velocity({
                height: newHeight,
                width: newWidth,
                left: $(document).scrollLeft() + windowWidth / 2 - origin.parent('.material-placeholder').offset().left - newWidth / 2,
                top: $(document).scrollTop() + windowHeight / 2 - origin.parent('.material-placeholder').offset().top - newHeight / 2
              }, {
                duration: inDuration,
                queue: false,
                easing: 'easeOutQuad',
                complete: function() {
                  doneAnimating = true;
                }
              });
            }
          });
          $(window).scroll(function() {
            if (overlayActive) {
              returnToOriginal();
            }
          });
          $(document).keyup(function(e) {
            if (e.keyCode === 27 && doneAnimating === true) {
              if (overlayActive) {
                returnToOriginal();
              }
            }
          });
          function returnToOriginal() {
            doneAnimating = false;
            var placeholder = origin.parent('.material-placeholder');
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var originalWidth = origin.data('width');
            var originalHeight = origin.data('height');
            origin.velocity("stop", true);
            $('#materialbox-overlay').velocity("stop", true);
            $('.materialbox-caption').velocity("stop", true);
            $('#materialbox-overlay').velocity({opacity: 0}, {
              duration: outDuration,
              queue: false,
              easing: 'easeOutQuad',
              complete: function() {
                overlayActive = false;
                $(this).remove();
              }
            });
            origin.velocity({
              width: originalWidth,
              height: originalHeight,
              left: 0,
              top: 0
            }, {
              duration: outDuration,
              queue: false,
              easing: 'easeOutQuad'
            });
            $('.materialbox-caption').velocity({opacity: 0}, {
              duration: outDuration,
              queue: false,
              easing: 'easeOutQuad',
              complete: function() {
                placeholder.css({
                  height: '',
                  width: '',
                  position: '',
                  top: '',
                  left: ''
                });
                origin.css({
                  height: '',
                  top: '',
                  left: '',
                  width: '',
                  'max-width': '',
                  position: '',
                  'z-index': ''
                });
                origin.removeClass('active');
                doneAnimating = true;
                $(this).remove();
                if (ancestorsChanged) {
                  ancestorsChanged.css('overflow', '');
                }
              }
            });
          }
        });
      };
      $(document).ready(function() {
        $('.materialboxed').materialbox();
      });
    }(jQuery));
    ;
    (function($) {
      $.fn.parallax = function() {
        var window_width = $(window).width();
        return this.each(function(i) {
          var $this = $(this);
          $this.addClass('parallax');
          function updateParallax(initial) {
            var container_height;
            if (window_width < 601) {
              container_height = ($this.height() > 0) ? $this.height() : $this.children("img").height();
            } else {
              container_height = ($this.height() > 0) ? $this.height() : 500;
            }
            var $img = $this.children("img").first();
            var img_height = $img.height();
            var parallax_dist = img_height - container_height;
            var bottom = $this.offset().top + container_height;
            var top = $this.offset().top;
            var scrollTop = $(window).scrollTop();
            var windowHeight = window.innerHeight;
            var windowBottom = scrollTop + windowHeight;
            var percentScrolled = (windowBottom - top) / (container_height + windowHeight);
            var parallax = Math.round((parallax_dist * percentScrolled));
            if (initial) {
              $img.css('display', 'block');
            }
            if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {
              $img.css('transform', "translate3D(-50%," + parallax + "px, 0)");
            }
          }
          $this.children("img").one("load", function() {
            updateParallax(true);
          }).each(function() {
            if (this.complete)
              $(this).load();
          });
          $(window).scroll(function() {
            window_width = $(window).width();
            updateParallax(false);
          });
          $(window).resize(function() {
            window_width = $(window).width();
            updateParallax(false);
          });
        });
      };
    }(jQuery));
    ;
    (function($) {
      var methods = {
        init: function() {
          return this.each(function() {
            var $this = $(this),
                window_width = $(window).width();
            $this.width('100%');
            var $active,
                $content,
                $links = $this.find('li.tab a'),
                $tabs_width = $this.width(),
                $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length,
                $index = 0;
            $active = $($links.filter('[href="' + location.hash + '"]'));
            if ($active.length === 0) {
              $active = $(this).find('li.tab a.active').first();
            }
            if ($active.length === 0) {
              $active = $(this).find('li.tab a').first();
            }
            $active.addClass('active');
            $index = $links.index($active);
            if ($index < 0) {
              $index = 0;
            }
            if ($active[0] !== undefined) {
              $content = $($active[0].hash);
            }
            $this.append('<div class="indicator"></div>');
            var $indicator = $this.find('.indicator');
            if ($this.is(":visible")) {
              $indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});
              $indicator.css({"left": $index * $tab_width});
            }
            $(window).resize(function() {
              $tabs_width = $this.width();
              $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length;
              if ($index < 0) {
                $index = 0;
              }
              if ($tab_width !== 0 && $tabs_width !== 0) {
                $indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});
                $indicator.css({"left": $index * $tab_width});
              }
            });
            $links.not($active).each(function() {
              $(this.hash).hide();
            });
            $this.on('click', 'a', function(e) {
              if ($(this).parent().hasClass('disabled')) {
                e.preventDefault();
                return;
              }
              $tabs_width = $this.width();
              $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length;
              $active.removeClass('active');
              if ($content !== undefined) {
                $content.hide();
              }
              $active = $(this);
              $content = $(this.hash);
              $links = $this.find('li.tab a');
              $active.addClass('active');
              var $prev_index = $index;
              $index = $links.index($(this));
              if ($index < 0) {
                $index = 0;
              }
              if ($content !== undefined) {
                $content.show();
              }
              if (($index - $prev_index) >= 0) {
                $indicator.velocity({"right": $tabs_width - (($index + 1) * $tab_width)}, {
                  duration: 300,
                  queue: false,
                  easing: 'easeOutQuad'
                });
                $indicator.velocity({"left": $index * $tab_width}, {
                  duration: 300,
                  queue: false,
                  easing: 'easeOutQuad',
                  delay: 90
                });
              } else {
                $indicator.velocity({"left": $index * $tab_width}, {
                  duration: 300,
                  queue: false,
                  easing: 'easeOutQuad'
                });
                $indicator.velocity({"right": $tabs_width - (($index + 1) * $tab_width)}, {
                  duration: 300,
                  queue: false,
                  easing: 'easeOutQuad',
                  delay: 90
                });
              }
              e.preventDefault();
            });
          });
        },
        select_tab: function(id) {
          this.find('a[href="#' + id + '"]').trigger('click');
        }
      };
      $.fn.tabs = function(methodOrOptions) {
        if (methods[methodOrOptions]) {
          return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
          return methods.init.apply(this, arguments);
        } else {
          $.error('Method ' + methodOrOptions + ' does not exist on jQuery.tooltip');
        }
      };
      $(document).ready(function() {
        $('ul.tabs').tabs();
      });
    }(jQuery));
    ;
    (function($) {
      $.fn.tooltip = function(options) {
        var timeout = null,
            margin = 5;
        var defaults = {delay: 350};
        if (options === "remove") {
          this.each(function() {
            $('#' + $(this).attr('data-tooltip-id')).remove();
            $(this).off('mouseenter.tooltip mouseleave.tooltip');
          });
          return false;
        }
        options = $.extend(defaults, options);
        return this.each(function() {
          var tooltipId = Materialize.guid();
          var origin = $(this);
          origin.attr('data-tooltip-id', tooltipId);
          var tooltip_text = $('<span></span>').text(origin.attr('data-tooltip'));
          var newTooltip = $('<div></div>');
          newTooltip.addClass('material-tooltip').append(tooltip_text).appendTo($('body')).attr('id', tooltipId);
          var backdrop = $('<div></div>').addClass('backdrop');
          backdrop.appendTo(newTooltip);
          backdrop.css({
            top: 0,
            left: 0
          });
          origin.off('mouseenter.tooltip mouseleave.tooltip');
          var started = false,
              timeoutRef;
          origin.on({
            'mouseenter.tooltip': function(e) {
              var tooltip_delay = origin.attr('data-delay');
              tooltip_delay = (tooltip_delay === undefined || tooltip_delay === '') ? options.delay : tooltip_delay;
              timeoutRef = setTimeout(function() {
                started = true;
                newTooltip.velocity('stop');
                backdrop.velocity('stop');
                newTooltip.css({
                  display: 'block',
                  left: '0px',
                  top: '0px'
                });
                newTooltip.children('span').text(origin.attr('data-tooltip'));
                var originWidth = origin.outerWidth();
                var originHeight = origin.outerHeight();
                var tooltipPosition = origin.attr('data-position');
                var tooltipHeight = newTooltip.outerHeight();
                var tooltipWidth = newTooltip.outerWidth();
                var tooltipVerticalMovement = '0px';
                var tooltipHorizontalMovement = '0px';
                var scale_factor = 8;
                var targetTop,
                    targetLeft,
                    newCoordinates;
                if (tooltipPosition === "top") {
                  targetTop = origin.offset().top - tooltipHeight - margin;
                  targetLeft = origin.offset().left + originWidth / 2 - tooltipWidth / 2;
                  newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
                  tooltipVerticalMovement = '-10px';
                  backdrop.css({
                    borderRadius: '14px 14px 0 0',
                    transformOrigin: '50% 90%',
                    marginTop: tooltipHeight,
                    marginLeft: (tooltipWidth / 2) - (backdrop.width() / 2)
                  });
                } else if (tooltipPosition === "left") {
                  targetTop = origin.offset().top + originHeight / 2 - tooltipHeight / 2;
                  targetLeft = origin.offset().left - tooltipWidth - margin;
                  newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
                  tooltipHorizontalMovement = '-10px';
                  backdrop.css({
                    width: '14px',
                    height: '14px',
                    borderRadius: '14px 0 0 14px',
                    transformOrigin: '95% 50%',
                    marginTop: tooltipHeight / 2,
                    marginLeft: tooltipWidth
                  });
                } else if (tooltipPosition === "right") {
                  targetTop = origin.offset().top + originHeight / 2 - tooltipHeight / 2;
                  targetLeft = origin.offset().left + originWidth + margin;
                  newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
                  tooltipHorizontalMovement = '+10px';
                  backdrop.css({
                    width: '14px',
                    height: '14px',
                    borderRadius: '0 14px 14px 0',
                    transformOrigin: '5% 50%',
                    marginTop: tooltipHeight / 2,
                    marginLeft: '0px'
                  });
                } else {
                  targetTop = origin.offset().top + origin.outerHeight() + margin;
                  targetLeft = origin.offset().left + originWidth / 2 - tooltipWidth / 2;
                  newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
                  tooltipVerticalMovement = '+10px';
                  backdrop.css({marginLeft: (tooltipWidth / 2) - (backdrop.width() / 2)});
                }
                newTooltip.css({
                  top: newCoordinates.y,
                  left: newCoordinates.x
                });
                scale_factor = tooltipWidth / 8;
                if (scale_factor < 8) {
                  scale_factor = 8;
                }
                if (tooltipPosition === "right" || tooltipPosition === "left") {
                  scale_factor = tooltipWidth / 10;
                  if (scale_factor < 6)
                    scale_factor = 6;
                }
                newTooltip.velocity({
                  marginTop: tooltipVerticalMovement,
                  marginLeft: tooltipHorizontalMovement
                }, {
                  duration: 350,
                  queue: false
                }).velocity({opacity: 1}, {
                  duration: 300,
                  delay: 50,
                  queue: false
                });
                backdrop.css({display: 'block'}).velocity({opacity: 1}, {
                  duration: 55,
                  delay: 0,
                  queue: false
                }).velocity({scale: scale_factor}, {
                  duration: 300,
                  delay: 0,
                  queue: false,
                  easing: 'easeInOutQuad'
                });
              }, tooltip_delay);
            },
            'mouseleave.tooltip': function() {
              started = false;
              clearTimeout(timeoutRef);
              setTimeout(function() {
                if (started != true) {
                  newTooltip.velocity({
                    opacity: 0,
                    marginTop: 0,
                    marginLeft: 0
                  }, {
                    duration: 225,
                    queue: false
                  });
                  backdrop.velocity({
                    opacity: 0,
                    scale: 1
                  }, {
                    duration: 225,
                    queue: false,
                    complete: function() {
                      backdrop.css('display', 'none');
                      newTooltip.css('display', 'none');
                      started = false;
                    }
                  });
                }
              }, 225);
            }
          });
        });
      };
      var repositionWithinScreen = function(x, y, width, height) {
        var newX = x;
        var newY = y;
        if (newX < 0) {
          newX = 4;
        } else if (newX + width > window.innerWidth) {
          newX -= newX + width - window.innerWidth;
        }
        if (newY < 0) {
          newY = 4;
        } else if (newY + height > window.innerHeight + $(window).scrollTop) {
          newY -= newY + height - window.innerHeight;
        }
        return {
          x: newX,
          y: newY
        };
      };
      $(document).ready(function() {
        $('.tooltipped').tooltip();
      });
    }(jQuery));
    ;
    ;
    (function(window) {
      'use strict';
      var Waves = Waves || {};
      var $$ = document.querySelectorAll.bind(document);
      function isWindow(obj) {
        return obj !== null && obj === obj.window;
      }
      function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
      }
      function offset(elem) {
        var docElem,
            win,
            box = {
              top: 0,
              left: 0
            },
            doc = elem && elem.ownerDocument;
        docElem = doc.documentElement;
        if (typeof elem.getBoundingClientRect !== typeof undefined) {
          box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
          top: box.top + win.pageYOffset - docElem.clientTop,
          left: box.left + win.pageXOffset - docElem.clientLeft
        };
      }
      function convertStyle(obj) {
        var style = '';
        for (var a in obj) {
          if (obj.hasOwnProperty(a)) {
            style += (a + ':' + obj[a] + ';');
          }
        }
        return style;
      }
      var Effect = {
        duration: 750,
        show: function(e, element) {
          if (e.button === 2) {
            return false;
          }
          var el = element || this;
          var ripple = document.createElement('div');
          ripple.className = 'waves-ripple';
          el.appendChild(ripple);
          var pos = offset(el);
          var relativeY = (e.pageY - pos.top);
          var relativeX = (e.pageX - pos.left);
          var scale = 'scale(' + ((el.clientWidth / 100) * 10) + ')';
          if ('touches' in e) {
            relativeY = (e.touches[0].pageY - pos.top);
            relativeX = (e.touches[0].pageX - pos.left);
          }
          ripple.setAttribute('data-hold', Date.now());
          ripple.setAttribute('data-scale', scale);
          ripple.setAttribute('data-x', relativeX);
          ripple.setAttribute('data-y', relativeY);
          var rippleStyle = {
            'top': relativeY + 'px',
            'left': relativeX + 'px'
          };
          ripple.className = ripple.className + ' waves-notransition';
          ripple.setAttribute('style', convertStyle(rippleStyle));
          ripple.className = ripple.className.replace('waves-notransition', '');
          rippleStyle['-webkit-transform'] = scale;
          rippleStyle['-moz-transform'] = scale;
          rippleStyle['-ms-transform'] = scale;
          rippleStyle['-o-transform'] = scale;
          rippleStyle.transform = scale;
          rippleStyle.opacity = '1';
          rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
          rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
          rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
          rippleStyle['transition-duration'] = Effect.duration + 'ms';
          rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
          rippleStyle['-moz-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
          rippleStyle['-o-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
          rippleStyle['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
          ripple.setAttribute('style', convertStyle(rippleStyle));
        },
        hide: function(e) {
          TouchHandler.touchup(e);
          var el = this;
          var width = el.clientWidth * 1.4;
          var ripple = null;
          var ripples = el.getElementsByClassName('waves-ripple');
          if (ripples.length > 0) {
            ripple = ripples[ripples.length - 1];
          } else {
            return false;
          }
          var relativeX = ripple.getAttribute('data-x');
          var relativeY = ripple.getAttribute('data-y');
          var scale = ripple.getAttribute('data-scale');
          var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
          var delay = 350 - diff;
          if (delay < 0) {
            delay = 0;
          }
          setTimeout(function() {
            var style = {
              'top': relativeY + 'px',
              'left': relativeX + 'px',
              'opacity': '0',
              '-webkit-transition-duration': Effect.duration + 'ms',
              '-moz-transition-duration': Effect.duration + 'ms',
              '-o-transition-duration': Effect.duration + 'ms',
              'transition-duration': Effect.duration + 'ms',
              '-webkit-transform': scale,
              '-moz-transform': scale,
              '-ms-transform': scale,
              '-o-transform': scale,
              'transform': scale
            };
            ripple.setAttribute('style', convertStyle(style));
            setTimeout(function() {
              try {
                el.removeChild(ripple);
              } catch (e) {
                return false;
              }
            }, Effect.duration);
          }, delay);
        },
        wrapInput: function(elements) {
          for (var a = 0; a < elements.length; a++) {
            var el = elements[a];
            if (el.tagName.toLowerCase() === 'input') {
              var parent = el.parentNode;
              if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
                continue;
              }
              var wrapper = document.createElement('i');
              wrapper.className = el.className + ' waves-input-wrapper';
              var elementStyle = el.getAttribute('style');
              if (!elementStyle) {
                elementStyle = '';
              }
              wrapper.setAttribute('style', elementStyle);
              el.className = 'waves-button-input';
              el.removeAttribute('style');
              parent.replaceChild(wrapper, el);
              wrapper.appendChild(el);
            }
          }
        }
      };
      var TouchHandler = {
        touches: 0,
        allowEvent: function(e) {
          var allow = true;
          if (e.type === 'touchstart') {
            TouchHandler.touches += 1;
          } else if (e.type === 'touchend' || e.type === 'touchcancel') {
            setTimeout(function() {
              if (TouchHandler.touches > 0) {
                TouchHandler.touches -= 1;
              }
            }, 500);
          } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
            allow = false;
          }
          return allow;
        },
        touchup: function(e) {
          TouchHandler.allowEvent(e);
        }
      };
      function getWavesEffectElement(e) {
        if (TouchHandler.allowEvent(e) === false) {
          return null;
        }
        var element = null;
        var target = e.target || e.srcElement;
        while (target.parentElement !== null) {
          if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
            element = target;
            break;
          } else if (target.classList.contains('waves-effect')) {
            element = target;
            break;
          }
          target = target.parentElement;
        }
        return element;
      }
      function showEffect(e) {
        var element = getWavesEffectElement(e);
        if (element !== null) {
          Effect.show(e, element);
          if ('ontouchstart' in window) {
            element.addEventListener('touchend', Effect.hide, false);
            element.addEventListener('touchcancel', Effect.hide, false);
          }
          element.addEventListener('mouseup', Effect.hide, false);
          element.addEventListener('mouseleave', Effect.hide, false);
        }
      }
      Waves.displayEffect = function(options) {
        options = options || {};
        if ('duration' in options) {
          Effect.duration = options.duration;
        }
        Effect.wrapInput($$('.waves-effect'));
        if ('ontouchstart' in window) {
          document.body.addEventListener('touchstart', showEffect, false);
        }
        document.body.addEventListener('mousedown', showEffect, false);
      };
      Waves.attach = function(element) {
        if (element.tagName.toLowerCase() === 'input') {
          Effect.wrapInput([element]);
          element = element.parentElement;
        }
        if ('ontouchstart' in window) {
          element.addEventListener('touchstart', showEffect, false);
        }
        element.addEventListener('mousedown', showEffect, false);
      };
      window.Waves = Waves;
      document.addEventListener('DOMContentLoaded', function() {
        Waves.displayEffect();
      }, false);
    })(window);
    ;
    Materialize.toast = function(message, displayLength, className, completeCallback) {
      className = className || "";
      var container = document.getElementById('toast-container');
      if (container === null) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
      }
      var newToast = createToast(message);
      if (message) {
        container.appendChild(newToast);
      }
      newToast.style.top = '35px';
      newToast.style.opacity = 0;
      Vel(newToast, {
        "top": "0px",
        opacity: 1
      }, {
        duration: 300,
        easing: 'easeOutCubic',
        queue: false
      });
      var timeLeft = displayLength;
      var counterInterval = setInterval(function() {
        if (newToast.parentNode === null)
          window.clearInterval(counterInterval);
        if (!newToast.classList.contains('panning')) {
          timeLeft -= 20;
        }
        if (timeLeft <= 0) {
          Vel(newToast, {
            "opacity": 0,
            marginTop: '-40px'
          }, {
            duration: 375,
            easing: 'easeOutExpo',
            queue: false,
            complete: function() {
              if (typeof(completeCallback) === "function")
                completeCallback();
              this[0].parentNode.removeChild(this[0]);
            }
          });
          window.clearInterval(counterInterval);
        }
      }, 20);
      function createToast(html) {
        var toast = document.createElement('div');
        toast.classList.add('toast');
        if (className) {
          var classes = className.split(' ');
          for (var i = 0,
              count = classes.length; i < count; i++) {
            toast.classList.add(classes[i]);
          }
        }
        if (typeof HTMLElement === "object" ? html instanceof HTMLElement : html && typeof html === "object" && html !== null && html.nodeType === 1 && typeof html.nodeName === "string") {
          toast.appendChild(html);
        } else if (html instanceof jQuery) {
          toast.appendChild(html[0]);
        } else {
          toast.innerHTML = html;
        }
        var hammerHandler = new Hammer(toast, {prevent_default: false});
        hammerHandler.on('pan', function(e) {
          var deltaX = e.deltaX;
          var activationDistance = 80;
          if (!toast.classList.contains('panning')) {
            toast.classList.add('panning');
          }
          var opacityPercent = 1 - Math.abs(deltaX / activationDistance);
          if (opacityPercent < 0)
            opacityPercent = 0;
          Vel(toast, {
            left: deltaX,
            opacity: opacityPercent
          }, {
            duration: 50,
            queue: false,
            easing: 'easeOutQuad'
          });
        });
        hammerHandler.on('panend', function(e) {
          var deltaX = e.deltaX;
          var activationDistance = 80;
          if (Math.abs(deltaX) > activationDistance) {
            Vel(toast, {marginTop: '-40px'}, {
              duration: 375,
              easing: 'easeOutExpo',
              queue: false,
              complete: function() {
                if (typeof(completeCallback) === "function") {
                  completeCallback();
                }
                toast.parentNode.removeChild(toast);
              }
            });
          } else {
            toast.classList.remove('panning');
            Vel(toast, {
              left: 0,
              opacity: 1
            }, {
              duration: 300,
              easing: 'easeOutExpo',
              queue: false
            });
          }
        });
        return toast;
      }
    };
    ;
    (function($) {
      var methods = {
        init: function(options) {
          var defaults = {
            menuWidth: 240,
            edge: 'left',
            closeOnClick: false
          };
          options = $.extend(defaults, options);
          $(this).each(function() {
            var $this = $(this);
            var menu_id = $("#" + $this.attr('data-activates'));
            if (options.menuWidth != 240) {
              menu_id.css('width', options.menuWidth);
            }
            var dragTarget = $('<div class="drag-target"></div>');
            $('body').append(dragTarget);
            if (options.edge == 'left') {
              menu_id.css('transform', 'translateX(-100%)');
              dragTarget.css({'left': 0});
            } else {
              menu_id.addClass('right-aligned').css('transform', 'translateX(100%)');
              dragTarget.css({'right': 0});
            }
            if (menu_id.hasClass('fixed')) {
              if (window.innerWidth > 992) {
                menu_id.css('transform', 'translateX(0)');
              }
            }
            if (menu_id.hasClass('fixed')) {
              $(window).resize(function() {
                if (window.innerWidth > 992) {
                  if ($('#sidenav-overlay').length != 0 && menuOut) {
                    removeMenu(true);
                  } else {
                    menu_id.css('transform', 'translateX(0%)');
                  }
                } else if (menuOut === false) {
                  if (options.edge === 'left') {
                    menu_id.css('transform', 'translateX(-100%)');
                  } else {
                    menu_id.css('transform', 'translateX(100%)');
                  }
                }
              });
            }
            if (options.closeOnClick === true) {
              menu_id.on("click.itemclick", "a:not(.collapsible-header)", function() {
                removeMenu();
              });
            }
            function removeMenu(restoreNav) {
              panning = false;
              menuOut = false;
              $('body').css({
                overflow: '',
                width: ''
              });
              $('#sidenav-overlay').velocity({opacity: 0}, {
                duration: 200,
                queue: false,
                easing: 'easeOutQuad',
                complete: function() {
                  $(this).remove();
                }
              });
              if (options.edge === 'left') {
                dragTarget.css({
                  width: '',
                  right: '',
                  left: '0'
                });
                menu_id.velocity({'translateX': '-100%'}, {
                  duration: 200,
                  queue: false,
                  easing: 'easeOutCubic',
                  complete: function() {
                    if (restoreNav === true) {
                      menu_id.removeAttr('style');
                      menu_id.css('width', options.menuWidth);
                    }
                  }
                });
              } else {
                dragTarget.css({
                  width: '',
                  right: '0',
                  left: ''
                });
                menu_id.velocity({'translateX': '100%'}, {
                  duration: 200,
                  queue: false,
                  easing: 'easeOutCubic',
                  complete: function() {
                    if (restoreNav === true) {
                      menu_id.removeAttr('style');
                      menu_id.css('width', options.menuWidth);
                    }
                  }
                });
              }
            }
            var panning = false;
            var menuOut = false;
            dragTarget.on('click', function() {
              removeMenu();
            });
            dragTarget.hammer({prevent_default: false}).bind('pan', function(e) {
              if (e.gesture.pointerType == "touch") {
                var direction = e.gesture.direction;
                var x = e.gesture.center.x;
                var y = e.gesture.center.y;
                var velocityX = e.gesture.velocityX;
                var $body = $('body');
                var oldWidth = $body.innerWidth();
                $body.css('overflow', 'hidden');
                $body.width(oldWidth);
                if ($('#sidenav-overlay').length === 0) {
                  var overlay = $('<div id="sidenav-overlay"></div>');
                  overlay.css('opacity', 0).click(function() {
                    removeMenu();
                  });
                  $('body').append(overlay);
                }
                if (options.edge === 'left') {
                  if (x > options.menuWidth) {
                    x = options.menuWidth;
                  } else if (x < 0) {
                    x = 0;
                  }
                }
                if (options.edge === 'left') {
                  if (x < (options.menuWidth / 2)) {
                    menuOut = false;
                  } else if (x >= (options.menuWidth / 2)) {
                    menuOut = true;
                  }
                  menu_id.css('transform', 'translateX(' + (x - options.menuWidth) + 'px)');
                } else {
                  if (x < (window.innerWidth - options.menuWidth / 2)) {
                    menuOut = true;
                  } else if (x >= (window.innerWidth - options.menuWidth / 2)) {
                    menuOut = false;
                  }
                  var rightPos = (x - options.menuWidth / 2);
                  if (rightPos < 0) {
                    rightPos = 0;
                  }
                  menu_id.css('transform', 'translateX(' + rightPos + 'px)');
                }
                var overlayPerc;
                if (options.edge === 'left') {
                  overlayPerc = x / options.menuWidth;
                  $('#sidenav-overlay').velocity({opacity: overlayPerc}, {
                    duration: 10,
                    queue: false,
                    easing: 'easeOutQuad'
                  });
                } else {
                  overlayPerc = Math.abs((x - window.innerWidth) / options.menuWidth);
                  $('#sidenav-overlay').velocity({opacity: overlayPerc}, {
                    duration: 10,
                    queue: false,
                    easing: 'easeOutQuad'
                  });
                }
              }
            }).bind('panend', function(e) {
              if (e.gesture.pointerType == "touch") {
                var velocityX = e.gesture.velocityX;
                var x = e.gesture.center.x;
                var leftPos = x - options.menuWidth;
                var rightPos = x - options.menuWidth / 2;
                if (leftPos > 0) {
                  leftPos = 0;
                }
                if (rightPos < 0) {
                  rightPos = 0;
                }
                panning = false;
                if (options.edge === 'left') {
                  if ((menuOut && velocityX <= 0.3) || velocityX < -0.5) {
                    if (leftPos != 0) {
                      menu_id.velocity({'translateX': [0, leftPos]}, {
                        duration: 300,
                        queue: false,
                        easing: 'easeOutQuad'
                      });
                    }
                    $('#sidenav-overlay').velocity({opacity: 1}, {
                      duration: 50,
                      queue: false,
                      easing: 'easeOutQuad'
                    });
                    dragTarget.css({
                      width: '50%',
                      right: 0,
                      left: ''
                    });
                  } else if (!menuOut || velocityX > 0.3) {
                    $('body').css({
                      overflow: '',
                      width: ''
                    });
                    menu_id.velocity({'translateX': [-1 * options.menuWidth - 10, leftPos]}, {
                      duration: 200,
                      queue: false,
                      easing: 'easeOutQuad'
                    });
                    $('#sidenav-overlay').velocity({opacity: 0}, {
                      duration: 200,
                      queue: false,
                      easing: 'easeOutQuad',
                      complete: function() {
                        $(this).remove();
                      }
                    });
                    dragTarget.css({
                      width: '10px',
                      right: '',
                      left: 0
                    });
                  }
                } else {
                  if ((menuOut && velocityX >= -0.3) || velocityX > 0.5) {
                    menu_id.velocity({'translateX': [0, rightPos]}, {
                      duration: 300,
                      queue: false,
                      easing: 'easeOutQuad'
                    });
                    $('#sidenav-overlay').velocity({opacity: 1}, {
                      duration: 50,
                      queue: false,
                      easing: 'easeOutQuad'
                    });
                    dragTarget.css({
                      width: '50%',
                      right: '',
                      left: 0
                    });
                  } else if (!menuOut || velocityX < -0.3) {
                    $('body').css({
                      overflow: '',
                      width: ''
                    });
                    menu_id.velocity({'translateX': [options.menuWidth + 10, rightPos]}, {
                      duration: 200,
                      queue: false,
                      easing: 'easeOutQuad'
                    });
                    $('#sidenav-overlay').velocity({opacity: 0}, {
                      duration: 200,
                      queue: false,
                      easing: 'easeOutQuad',
                      complete: function() {
                        $(this).remove();
                      }
                    });
                    dragTarget.css({
                      width: '10px',
                      right: 0,
                      left: ''
                    });
                  }
                }
              }
            });
            $this.click(function() {
              if (menuOut === true) {
                menuOut = false;
                panning = false;
                removeMenu();
              } else {
                var $body = $('body');
                var oldWidth = $body.innerWidth();
                $body.css('overflow', 'hidden');
                $body.width(oldWidth);
                $('body').append(dragTarget);
                if (options.edge === 'left') {
                  dragTarget.css({
                    width: '50%',
                    right: 0,
                    left: ''
                  });
                  menu_id.velocity({'translateX': [0, -1 * options.menuWidth]}, {
                    duration: 300,
                    queue: false,
                    easing: 'easeOutQuad'
                  });
                } else {
                  dragTarget.css({
                    width: '50%',
                    right: '',
                    left: 0
                  });
                  menu_id.velocity({'translateX': [0, options.menuWidth]}, {
                    duration: 300,
                    queue: false,
                    easing: 'easeOutQuad'
                  });
                }
                var overlay = $('<div id="sidenav-overlay"></div>');
                overlay.css('opacity', 0).click(function() {
                  menuOut = false;
                  panning = false;
                  removeMenu();
                  overlay.velocity({opacity: 0}, {
                    duration: 300,
                    queue: false,
                    easing: 'easeOutQuad',
                    complete: function() {
                      $(this).remove();
                    }
                  });
                });
                $('body').append(overlay);
                overlay.velocity({opacity: 1}, {
                  duration: 300,
                  queue: false,
                  easing: 'easeOutQuad',
                  complete: function() {
                    menuOut = true;
                    panning = false;
                  }
                });
              }
              return false;
            });
          });
        },
        show: function() {
          this.trigger('click');
        },
        hide: function() {
          $('#sidenav-overlay').trigger('click');
        }
      };
      $.fn.sideNav = function(methodOrOptions) {
        if (methods[methodOrOptions]) {
          return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
          return methods.init.apply(this, arguments);
        } else {
          $.error('Method ' + methodOrOptions + ' does not exist on jQuery.sideNav');
        }
      };
    }(jQuery));
    ;
    (function($) {
      var jWindow = $(window);
      var elements = [];
      var elementsInView = [];
      var isSpying = false;
      var ticks = 0;
      var unique_id = 1;
      var offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
      function findElements(top, right, bottom, left) {
        var hits = $();
        $.each(elements, function(i, element) {
          if (element.height() > 0) {
            var elTop = element.offset().top,
                elLeft = element.offset().left,
                elRight = elLeft + element.width(),
                elBottom = elTop + element.height();
            var isIntersect = !(elLeft > right || elRight < left || elTop > bottom || elBottom < top);
            if (isIntersect) {
              hits.push(element);
            }
          }
        });
        return hits;
      }
      function onScroll() {
        ++ticks;
        var top = jWindow.scrollTop(),
            left = jWindow.scrollLeft(),
            right = left + jWindow.width(),
            bottom = top + jWindow.height();
        var intersections = findElements(top + offset.top + 200, right + offset.right, bottom + offset.bottom, left + offset.left);
        $.each(intersections, function(i, element) {
          var lastTick = element.data('scrollSpy:ticks');
          if (typeof lastTick != 'number') {
            element.triggerHandler('scrollSpy:enter');
          }
          element.data('scrollSpy:ticks', ticks);
        });
        $.each(elementsInView, function(i, element) {
          var lastTick = element.data('scrollSpy:ticks');
          if (typeof lastTick == 'number' && lastTick !== ticks) {
            element.triggerHandler('scrollSpy:exit');
            element.data('scrollSpy:ticks', null);
          }
        });
        elementsInView = intersections;
      }
      function onWinSize() {
        jWindow.trigger('scrollSpy:winSize');
      }
      var getTime = (Date.now || function() {
        return new Date().getTime();
      });
      function throttle(func, wait, options) {
        var context,
            args,
            result;
        var timeout = null;
        var previous = 0;
        options || (options = {});
        var later = function() {
          previous = options.leading === false ? 0 : getTime();
          timeout = null;
          result = func.apply(context, args);
          context = args = null;
        };
        return function() {
          var now = getTime();
          if (!previous && options.leading === false)
            previous = now;
          var remaining = wait - (now - previous);
          context = this;
          args = arguments;
          if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
            context = args = null;
          } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
          }
          return result;
        };
      }
      ;
      $.scrollSpy = function(selector, options) {
        var visible = [];
        selector = $(selector);
        selector.each(function(i, element) {
          elements.push($(element));
          $(element).data("scrollSpy:id", i);
          $('a[href="#' + $(element).attr('id') + '"]').click(function(e) {
            e.preventDefault();
            var offset = $(this.hash).offset().top + 1;
            $('html, body').animate({scrollTop: offset - 200}, {
              duration: 400,
              queue: false,
              easing: 'easeOutCubic'
            });
          });
        });
        options = options || {throttle: 100};
        offset.top = options.offsetTop || 0;
        offset.right = options.offsetRight || 0;
        offset.bottom = options.offsetBottom || 0;
        offset.left = options.offsetLeft || 0;
        var throttledScroll = throttle(onScroll, options.throttle || 100);
        var readyScroll = function() {
          $(document).ready(throttledScroll);
        };
        if (!isSpying) {
          jWindow.on('scroll', readyScroll);
          jWindow.on('resize', readyScroll);
          isSpying = true;
        }
        setTimeout(readyScroll, 0);
        selector.on('scrollSpy:enter', function() {
          visible = $.grep(visible, function(value) {
            return value.height() != 0;
          });
          var $this = $(this);
          if (visible[0]) {
            $('a[href="#' + visible[0].attr('id') + '"]').removeClass('active');
            if ($this.data('scrollSpy:id') < visible[0].data('scrollSpy:id')) {
              visible.unshift($(this));
            } else {
              visible.push($(this));
            }
          } else {
            visible.push($(this));
          }
          $('a[href="#' + visible[0].attr('id') + '"]').addClass('active');
        });
        selector.on('scrollSpy:exit', function() {
          visible = $.grep(visible, function(value) {
            return value.height() != 0;
          });
          if (visible[0]) {
            $('a[href="#' + visible[0].attr('id') + '"]').removeClass('active');
            var $this = $(this);
            visible = $.grep(visible, function(value) {
              return value.attr('id') != $this.attr('id');
            });
            if (visible[0]) {
              $('a[href="#' + visible[0].attr('id') + '"]').addClass('active');
            }
          }
        });
        return selector;
      };
      $.winSizeSpy = function(options) {
        $.winSizeSpy = function() {
          return jWindow;
        };
        options = options || {throttle: 100};
        return jWindow.on('resize', throttle(onWinSize, options.throttle || 100));
      };
      $.fn.scrollSpy = function(options) {
        return $.scrollSpy($(this), options);
      };
    })(jQuery);
    ;
    (function($) {
      $(document).ready(function() {
        Materialize.updateTextFields = function() {
          var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
          $(input_selector).each(function(index, element) {
            if ($(element).val().length > 0 || element.autofocus || $(this).attr('placeholder') !== undefined || $(element)[0].validity.badInput === true) {
              $(this).siblings('label, i').addClass('active');
            } else {
              $(this).siblings('label, i').removeClass('active');
            }
          });
        };
        var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
        $(document).on('change', input_selector, function() {
          if ($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined) {
            $(this).siblings('label').addClass('active');
          }
          validate_field($(this));
        });
        $(document).ready(function() {
          Materialize.updateTextFields();
        });
        $(document).on('reset', function(e) {
          var formReset = $(e.target);
          if (formReset.is('form')) {
            formReset.find(input_selector).removeClass('valid').removeClass('invalid');
            formReset.find(input_selector).each(function() {
              if ($(this).attr('value') === '') {
                $(this).siblings('label, i').removeClass('active');
              }
            });
            formReset.find('select.initialized').each(function() {
              var reset_text = formReset.find('option[selected]').text();
              formReset.siblings('input.select-dropdown').val(reset_text);
            });
          }
        });
        $(document).on('focus', input_selector, function() {
          $(this).siblings('label, i').addClass('active');
        });
        $(document).on('blur', input_selector, function() {
          var $inputElement = $(this);
          if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
            $inputElement.siblings('label, i').removeClass('active');
          }
          if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') !== undefined) {
            $inputElement.siblings('i').removeClass('active');
          }
          validate_field($inputElement);
        });
        window.validate_field = function(object) {
          var hasLength = object.attr('length') !== undefined;
          var lenAttr = parseInt(object.attr('length'));
          var len = object.val().length;
          if (object.val().length === 0 && object[0].validity.badInput === false) {
            if (object.hasClass('validate')) {
              object.removeClass('valid');
              object.removeClass('invalid');
            }
          } else {
            if (object.hasClass('validate')) {
              if ((object.is(':valid') && hasLength && (len <= lenAttr)) || (object.is(':valid') && !hasLength)) {
                object.removeClass('invalid');
                object.addClass('valid');
              } else {
                object.removeClass('valid');
                object.addClass('invalid');
              }
            }
          }
        };
        var radio_checkbox = 'input[type=radio], input[type=checkbox]';
        $(document).on('keyup.radio', radio_checkbox, function(e) {
          if (e.which === 9) {
            $(this).addClass('tabbed');
            var $this = $(this);
            $this.one('blur', function(e) {
              $(this).removeClass('tabbed');
            });
            return;
          }
        });
        var hiddenDiv = $('.hiddendiv').first();
        if (!hiddenDiv.length) {
          hiddenDiv = $('<div class="hiddendiv common"></div>');
          $('body').append(hiddenDiv);
        }
        var text_area_selector = '.materialize-textarea';
        function textareaAutoResize($textarea) {
          var fontFamily = $textarea.css('font-family');
          var fontSize = $textarea.css('font-size');
          if (fontSize) {
            hiddenDiv.css('font-size', fontSize);
          }
          if (fontFamily) {
            hiddenDiv.css('font-family', fontFamily);
          }
          if ($textarea.attr('wrap') === "off") {
            hiddenDiv.css('overflow-wrap', "normal").css('white-space', "pre");
          }
          hiddenDiv.text($textarea.val() + '\n');
          var content = hiddenDiv.html().replace(/\n/g, '<br>');
          hiddenDiv.html(content);
          if ($textarea.is(':visible')) {
            hiddenDiv.css('width', $textarea.width());
          } else {
            hiddenDiv.css('width', $(window).width() / 2);
          }
          $textarea.css('height', hiddenDiv.height());
        }
        $(text_area_selector).each(function() {
          var $textarea = $(this);
          if ($textarea.val().length) {
            textareaAutoResize($textarea);
          }
        });
        $('body').on('keyup keydown autoresize', text_area_selector, function() {
          textareaAutoResize($(this));
        });
        $(document).on('change', '.file-field input[type="file"]', function() {
          var file_field = $(this).closest('.file-field');
          var path_input = file_field.find('input.file-path');
          var files = $(this)[0].files;
          var file_names = [];
          for (var i = 0; i < files.length; i++) {
            file_names.push(files[i].name);
          }
          path_input.val(file_names.join(", "));
          path_input.trigger('change');
        });
        var range_type = 'input[type=range]';
        var range_mousedown = false;
        var left;
        $(range_type).each(function() {
          var thumb = $('<span class="thumb"><span class="value"></span></span>');
          $(this).after(thumb);
        });
        var range_wrapper = '.range-field';
        $(document).on('change', range_type, function(e) {
          var thumb = $(this).siblings('.thumb');
          thumb.find('.value').html($(this).val());
        });
        $(document).on('input mousedown touchstart', range_type, function(e) {
          var thumb = $(this).siblings('.thumb');
          var width = $(this).outerWidth();
          if (thumb.length <= 0) {
            thumb = $('<span class="thumb"><span class="value"></span></span>');
            $(this).after(thumb);
          }
          thumb.find('.value').html($(this).val());
          range_mousedown = true;
          $(this).addClass('active');
          if (!thumb.hasClass('active')) {
            thumb.velocity({
              height: "30px",
              width: "30px",
              top: "-20px",
              marginLeft: "-15px"
            }, {
              duration: 300,
              easing: 'easeOutExpo'
            });
          }
          if (e.type !== 'input') {
            if (e.pageX === undefined || e.pageX === null) {
              left = e.originalEvent.touches[0].pageX - $(this).offset().left;
            } else {
              left = e.pageX - $(this).offset().left;
            }
            if (left < 0) {
              left = 0;
            } else if (left > width) {
              left = width;
            }
            thumb.addClass('active').css('left', left);
          }
          thumb.find('.value').html($(this).val());
        });
        $(document).on('mouseup touchend', range_wrapper, function() {
          range_mousedown = false;
          $(this).removeClass('active');
        });
        $(document).on('mousemove touchmove', range_wrapper, function(e) {
          var thumb = $(this).children('.thumb');
          var left;
          if (range_mousedown) {
            if (!thumb.hasClass('active')) {
              thumb.velocity({
                height: '30px',
                width: '30px',
                top: '-20px',
                marginLeft: '-15px'
              }, {
                duration: 300,
                easing: 'easeOutExpo'
              });
            }
            if (e.pageX === undefined || e.pageX === null) {
              left = e.originalEvent.touches[0].pageX - $(this).offset().left;
            } else {
              left = e.pageX - $(this).offset().left;
            }
            var width = $(this).outerWidth();
            if (left < 0) {
              left = 0;
            } else if (left > width) {
              left = width;
            }
            thumb.addClass('active').css('left', left);
            thumb.find('.value').html(thumb.siblings(range_type).val());
          }
        });
        $(document).on('mouseout touchleave', range_wrapper, function() {
          if (!range_mousedown) {
            var thumb = $(this).children('.thumb');
            if (thumb.hasClass('active')) {
              thumb.velocity({
                height: '0',
                width: '0',
                top: '10px',
                marginLeft: '-6px'
              }, {duration: 100});
            }
            thumb.removeClass('active');
          }
        });
      });
      $.fn.material_select = function(callback) {
        $(this).each(function() {
          var $select = $(this);
          if ($select.hasClass('browser-default')) {
            return;
          }
          var multiple = $select.attr('multiple') ? true : false,
              lastID = $select.data('select-id');
          if (lastID) {
            $select.parent().find('span.caret').remove();
            $select.parent().find('input').remove();
            $select.unwrap();
            $('ul#select-options-' + lastID).remove();
          }
          if (callback === 'destroy') {
            $select.data('select-id', null).removeClass('initialized');
            return;
          }
          var uniqueID = Materialize.guid();
          $select.data('select-id', uniqueID);
          var wrapper = $('<div class="select-wrapper"></div>');
          wrapper.addClass($select.attr('class'));
          var options = $('<ul id="select-options-' + uniqueID + '" class="dropdown-content select-dropdown ' + (multiple ? 'multiple-select-dropdown' : '') + '"></ul>'),
              selectChildren = $select.children('option, optgroup'),
              valuesSelected = [],
              optionsHover = false;
          var label = $select.find('option:selected').html() || $select.find('option:first').html() || "";
          var appendOptionWithIcon = function(select, option, type) {
            var disabledClass = (option.is(':disabled')) ? 'disabled ' : '';
            var optgroupClass = (type === 'optgroup-option') ? 'optgroup-option ' : '';
            var icon_url = option.data('icon');
            var classes = option.attr('class');
            if (!!icon_url) {
              var classString = '';
              if (!!classes)
                classString = ' class="' + classes + '"';
              if (type === 'multiple') {
                options.append($('<li class="' + disabledClass + '"><img src="' + icon_url + '"' + classString + '><span><input type="checkbox"' + disabledClass + '/><label></label>' + option.html() + '</span></li>'));
              } else {
                options.append($('<li class="' + disabledClass + optgroupClass + '"><img src="' + icon_url + '"' + classString + '><span>' + option.html() + '</span></li>'));
              }
              return true;
            }
            if (type === 'multiple') {
              options.append($('<li class="' + disabledClass + '"><span><input type="checkbox"' + disabledClass + '/><label></label>' + option.html() + '</span></li>'));
            } else {
              options.append($('<li class="' + disabledClass + optgroupClass + '"><span>' + option.html() + '</span></li>'));
            }
          };
          if (selectChildren.length) {
            selectChildren.each(function() {
              if ($(this).is('option')) {
                if (multiple) {
                  appendOptionWithIcon($select, $(this), 'multiple');
                } else {
                  appendOptionWithIcon($select, $(this));
                }
              } else if ($(this).is('optgroup')) {
                var selectOptions = $(this).children('option');
                options.append($('<li class="optgroup"><span>' + $(this).attr('label') + '</span></li>'));
                selectOptions.each(function() {
                  appendOptionWithIcon($select, $(this), 'optgroup-option');
                });
              }
            });
          }
          options.find('li:not(.optgroup)').each(function(i) {
            $(this).click(function(e) {
              if (!$(this).hasClass('disabled') && !$(this).hasClass('optgroup')) {
                var selected = true;
                if (multiple) {
                  $('input[type="checkbox"]', this).prop('checked', function(i, v) {
                    return !v;
                  });
                  selected = toggleEntryFromArray(valuesSelected, $(this).index(), $select);
                  $newSelect.trigger('focus');
                } else {
                  options.find('li').removeClass('active');
                  $(this).toggleClass('active');
                  $newSelect.val($(this).text());
                }
                activateOption(options, $(this));
                $select.find('option').eq(i).prop('selected', selected);
                $select.trigger('change');
                if (typeof callback !== 'undefined')
                  callback();
              }
              e.stopPropagation();
            });
          });
          $select.wrap(wrapper);
          var dropdownIcon = $('<span class="caret">&#9660;</span>');
          if ($select.is(':disabled'))
            dropdownIcon.addClass('disabled');
          var sanitizedLabelHtml = label.replace(/"/g, '&quot;');
          var $newSelect = $('<input type="text" class="select-dropdown" readonly="true" ' + (($select.is(':disabled')) ? 'disabled' : '') + ' data-activates="select-options-' + uniqueID + '" value="' + sanitizedLabelHtml + '"/>');
          $select.before($newSelect);
          $newSelect.before(dropdownIcon);
          $newSelect.after(options);
          if (!$select.is(':disabled')) {
            $newSelect.dropdown({
              'hover': false,
              'closeOnClick': false
            });
          }
          if ($select.attr('tabindex')) {
            $($newSelect[0]).attr('tabindex', $select.attr('tabindex'));
          }
          $select.addClass('initialized');
          $newSelect.on({
            'focus': function() {
              if ($('ul.select-dropdown').not(options[0]).is(':visible')) {
                $('input.select-dropdown').trigger('close');
              }
              if (!options.is(':visible')) {
                $(this).trigger('open', ['focus']);
                var label = $(this).val();
                var selectedOption = options.find('li').filter(function() {
                  return $(this).text().toLowerCase() === label.toLowerCase();
                })[0];
                activateOption(options, selectedOption);
              }
            },
            'click': function(e) {
              e.stopPropagation();
            }
          });
          $newSelect.on('blur', function() {
            if (!multiple) {
              $(this).trigger('close');
            }
            options.find('li.selected').removeClass('selected');
          });
          options.hover(function() {
            optionsHover = true;
          }, function() {
            optionsHover = false;
          });
          $(window).on({'click': function() {
              multiple && (optionsHover || $newSelect.trigger('close'));
            }});
          if (multiple) {
            $select.find("option:selected:not(:disabled)").each(function() {
              var index = $(this).index();
              toggleEntryFromArray(valuesSelected, index, $select);
              options.find("li").eq(index).find(":checkbox").prop("checked", true);
            });
          }
          var activateOption = function(collection, newOption) {
            if (newOption) {
              collection.find('li.selected').removeClass('selected');
              var option = $(newOption);
              option.addClass('selected');
              options.scrollTo(option);
            }
          };
          var filterQuery = [],
              onKeyDown = function(e) {
                if (e.which == 9) {
                  $newSelect.trigger('close');
                  return;
                }
                if (e.which == 40 && !options.is(':visible')) {
                  $newSelect.trigger('open');
                  return;
                }
                if (e.which == 13 && !options.is(':visible')) {
                  return;
                }
                e.preventDefault();
                var letter = String.fromCharCode(e.which).toLowerCase(),
                    nonLetters = [9, 13, 27, 38, 40];
                if (letter && (nonLetters.indexOf(e.which) === -1)) {
                  filterQuery.push(letter);
                  var string = filterQuery.join(''),
                      newOption = options.find('li').filter(function() {
                        return $(this).text().toLowerCase().indexOf(string) === 0;
                      })[0];
                  if (newOption) {
                    activateOption(options, newOption);
                  }
                }
                if (e.which == 13) {
                  var activeOption = options.find('li.selected:not(.disabled)')[0];
                  if (activeOption) {
                    $(activeOption).trigger('click');
                    if (!multiple) {
                      $newSelect.trigger('close');
                    }
                  }
                }
                if (e.which == 40) {
                  if (options.find('li.selected').length) {
                    newOption = options.find('li.selected').next('li:not(.disabled)')[0];
                  } else {
                    newOption = options.find('li:not(.disabled)')[0];
                  }
                  activateOption(options, newOption);
                }
                if (e.which == 27) {
                  $newSelect.trigger('close');
                }
                if (e.which == 38) {
                  newOption = options.find('li.selected').prev('li:not(.disabled)')[0];
                  if (newOption)
                    activateOption(options, newOption);
                }
                setTimeout(function() {
                  filterQuery = [];
                }, 1000);
              };
          $newSelect.on('keydown', onKeyDown);
        });
        function toggleEntryFromArray(entriesArray, entryIndex, select) {
          var index = entriesArray.indexOf(entryIndex),
              notAdded = index === -1;
          if (notAdded) {
            entriesArray.push(entryIndex);
          } else {
            entriesArray.splice(index, 1);
          }
          select.siblings('ul.dropdown-content').find('li').eq(entryIndex).toggleClass('active');
          select.find('option').eq(entryIndex).prop('selected', notAdded);
          setValueToInput(entriesArray, select);
          return notAdded;
        }
        function setValueToInput(entriesArray, select) {
          var value = '';
          for (var i = 0,
              count = entriesArray.length; i < count; i++) {
            var text = select.find('option').eq(entriesArray[i]).text();
            i === 0 ? value += text : value += ', ' + text;
          }
          if (value === '') {
            value = select.find('option:disabled').eq(0).text();
          }
          select.siblings('input.select-dropdown').val(value);
        }
      };
    }(jQuery));
    ;
    (function($) {
      var methods = {
        init: function(options) {
          var defaults = {
            indicators: true,
            height: 400,
            transition: 500,
            interval: 6000
          };
          options = $.extend(defaults, options);
          return this.each(function() {
            var $this = $(this);
            var $slider = $this.find('ul.slides').first();
            var $slides = $slider.find('li');
            var $active_index = $slider.find('.active').index();
            var $active,
                $indicators,
                $interval;
            if ($active_index != -1) {
              $active = $slides.eq($active_index);
            }
            function captionTransition(caption, duration) {
              if (caption.hasClass("center-align")) {
                caption.velocity({
                  opacity: 0,
                  translateY: -100
                }, {
                  duration: duration,
                  queue: false
                });
              } else if (caption.hasClass("right-align")) {
                caption.velocity({
                  opacity: 0,
                  translateX: 100
                }, {
                  duration: duration,
                  queue: false
                });
              } else if (caption.hasClass("left-align")) {
                caption.velocity({
                  opacity: 0,
                  translateX: -100
                }, {
                  duration: duration,
                  queue: false
                });
              }
            }
            function moveToSlide(index) {
              if (index >= $slides.length)
                index = 0;
              else if (index < 0)
                index = $slides.length - 1;
              $active_index = $slider.find('.active').index();
              if ($active_index != index) {
                $active = $slides.eq($active_index);
                $caption = $active.find('.caption');
                $active.removeClass('active');
                $active.velocity({opacity: 0}, {
                  duration: options.transition,
                  queue: false,
                  easing: 'easeOutQuad',
                  complete: function() {
                    $slides.not('.active').velocity({
                      opacity: 0,
                      translateX: 0,
                      translateY: 0
                    }, {
                      duration: 0,
                      queue: false
                    });
                  }
                });
                captionTransition($caption, options.transition);
                if (options.indicators) {
                  $indicators.eq($active_index).removeClass('active');
                }
                $slides.eq(index).velocity({opacity: 1}, {
                  duration: options.transition,
                  queue: false,
                  easing: 'easeOutQuad'
                });
                $slides.eq(index).find('.caption').velocity({
                  opacity: 1,
                  translateX: 0,
                  translateY: 0
                }, {
                  duration: options.transition,
                  delay: options.transition,
                  queue: false,
                  easing: 'easeOutQuad'
                });
                $slides.eq(index).addClass('active');
                if (options.indicators) {
                  $indicators.eq(index).addClass('active');
                }
              }
            }
            if (!$this.hasClass('fullscreen')) {
              if (options.indicators) {
                $this.height(options.height + 40);
              } else {
                $this.height(options.height);
              }
              $slider.height(options.height);
            }
            $slides.find('.caption').each(function() {
              captionTransition($(this), 0);
            });
            $slides.find('img').each(function() {
              var placeholderBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
              if ($(this).attr('src') !== placeholderBase64) {
                $(this).css('background-image', 'url(' + $(this).attr('src') + ')');
                $(this).attr('src', placeholderBase64);
              }
            });
            if (options.indicators) {
              $indicators = $('<ul class="indicators"></ul>');
              $slides.each(function(index) {
                var $indicator = $('<li class="indicator-item"></li>');
                $indicator.click(function() {
                  var $parent = $slider.parent();
                  var curr_index = $parent.find($(this)).index();
                  moveToSlide(curr_index);
                  clearInterval($interval);
                  $interval = setInterval(function() {
                    $active_index = $slider.find('.active').index();
                    if ($slides.length == $active_index + 1)
                      $active_index = 0;
                    else
                      $active_index += 1;
                    moveToSlide($active_index);
                  }, options.transition + options.interval);
                });
                $indicators.append($indicator);
              });
              $this.append($indicators);
              $indicators = $this.find('ul.indicators').find('li.indicator-item');
            }
            if ($active) {
              $active.show();
            } else {
              $slides.first().addClass('active').velocity({opacity: 1}, {
                duration: options.transition,
                queue: false,
                easing: 'easeOutQuad'
              });
              $active_index = 0;
              $active = $slides.eq($active_index);
              if (options.indicators) {
                $indicators.eq($active_index).addClass('active');
              }
            }
            $active.find('img').each(function() {
              $active.find('.caption').velocity({
                opacity: 1,
                translateX: 0,
                translateY: 0
              }, {
                duration: options.transition,
                queue: false,
                easing: 'easeOutQuad'
              });
            });
            $interval = setInterval(function() {
              $active_index = $slider.find('.active').index();
              moveToSlide($active_index + 1);
            }, options.transition + options.interval);
            var panning = false;
            var swipeLeft = false;
            var swipeRight = false;
            $this.hammer({prevent_default: false}).bind('pan', function(e) {
              if (e.gesture.pointerType === "touch") {
                clearInterval($interval);
                var direction = e.gesture.direction;
                var x = e.gesture.deltaX;
                var velocityX = e.gesture.velocityX;
                $curr_slide = $slider.find('.active');
                $curr_slide.velocity({translateX: x}, {
                  duration: 50,
                  queue: false,
                  easing: 'easeOutQuad'
                });
                if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.65)) {
                  swipeRight = true;
                } else if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.65)) {
                  swipeLeft = true;
                }
                var next_slide;
                if (swipeLeft) {
                  next_slide = $curr_slide.next();
                  if (next_slide.length === 0) {
                    next_slide = $slides.first();
                  }
                  next_slide.velocity({opacity: 1}, {
                    duration: 300,
                    queue: false,
                    easing: 'easeOutQuad'
                  });
                }
                if (swipeRight) {
                  next_slide = $curr_slide.prev();
                  if (next_slide.length === 0) {
                    next_slide = $slides.last();
                  }
                  next_slide.velocity({opacity: 1}, {
                    duration: 300,
                    queue: false,
                    easing: 'easeOutQuad'
                  });
                }
              }
            }).bind('panend', function(e) {
              if (e.gesture.pointerType === "touch") {
                $curr_slide = $slider.find('.active');
                panning = false;
                curr_index = $slider.find('.active').index();
                if (!swipeRight && !swipeLeft || $slides.length <= 1) {
                  $curr_slide.velocity({translateX: 0}, {
                    duration: 300,
                    queue: false,
                    easing: 'easeOutQuad'
                  });
                } else if (swipeLeft) {
                  moveToSlide(curr_index + 1);
                  $curr_slide.velocity({translateX: -1 * $this.innerWidth()}, {
                    duration: 300,
                    queue: false,
                    easing: 'easeOutQuad',
                    complete: function() {
                      $curr_slide.velocity({
                        opacity: 0,
                        translateX: 0
                      }, {
                        duration: 0,
                        queue: false
                      });
                    }
                  });
                } else if (swipeRight) {
                  moveToSlide(curr_index - 1);
                  $curr_slide.velocity({translateX: $this.innerWidth()}, {
                    duration: 300,
                    queue: false,
                    easing: 'easeOutQuad',
                    complete: function() {
                      $curr_slide.velocity({
                        opacity: 0,
                        translateX: 0
                      }, {
                        duration: 0,
                        queue: false
                      });
                    }
                  });
                }
                swipeLeft = false;
                swipeRight = false;
                clearInterval($interval);
                $interval = setInterval(function() {
                  $active_index = $slider.find('.active').index();
                  if ($slides.length == $active_index + 1)
                    $active_index = 0;
                  else
                    $active_index += 1;
                  moveToSlide($active_index);
                }, options.transition + options.interval);
              }
            });
            $this.on('sliderPause', function() {
              clearInterval($interval);
            });
            $this.on('sliderStart', function() {
              clearInterval($interval);
              $interval = setInterval(function() {
                $active_index = $slider.find('.active').index();
                if ($slides.length == $active_index + 1)
                  $active_index = 0;
                else
                  $active_index += 1;
                moveToSlide($active_index);
              }, options.transition + options.interval);
            });
            $this.on('sliderNext', function() {
              $active_index = $slider.find('.active').index();
              moveToSlide($active_index + 1);
            });
            $this.on('sliderPrev', function() {
              $active_index = $slider.find('.active').index();
              moveToSlide($active_index - 1);
            });
          });
        },
        pause: function() {
          $(this).trigger('sliderPause');
        },
        start: function() {
          $(this).trigger('sliderStart');
        },
        next: function() {
          $(this).trigger('sliderNext');
        },
        prev: function() {
          $(this).trigger('sliderPrev');
        }
      };
      $.fn.slider = function(methodOrOptions) {
        if (methods[methodOrOptions]) {
          return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
          return methods.init.apply(this, arguments);
        } else {
          $.error('Method ' + methodOrOptions + ' does not exist on jQuery.tooltip');
        }
      };
    }(jQuery));
    ;
    (function($) {
      $(document).ready(function() {
        $(document).on('click.card', '.card', function(e) {
          if ($(this).find('> .card-reveal').length) {
            if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {
              $(this).find('.card-reveal').velocity({translateY: 0}, {
                duration: 225,
                queue: false,
                easing: 'easeInOutQuad',
                complete: function() {
                  $(this).css({display: 'none'});
                }
              });
            } else if ($(e.target).is($('.card .activator')) || $(e.target).is($('.card .activator i'))) {
              $(e.target).closest('.card').css('overflow', 'hidden');
              $(this).find('.card-reveal').css({display: 'block'}).velocity("stop", false).velocity({translateY: '-100%'}, {
                duration: 300,
                queue: false,
                easing: 'easeInOutQuad'
              });
            }
          }
          $('.card-reveal').closest('.card').css('overflow', 'hidden');
        });
      });
    }(jQuery));
    ;
    (function($) {
      $(document).ready(function() {
        $(document).on('click.chip', '.chip .material-icons', function(e) {
          $(this).parent().remove();
        });
      });
    }(jQuery));
    ;
    (function($) {
      $.fn.pushpin = function(options) {
        var defaults = {
          top: 0,
          bottom: Infinity,
          offset: 0
        };
        options = $.extend(defaults, options);
        $index = 0;
        return this.each(function() {
          var $uniqueId = Materialize.guid(),
              $this = $(this),
              $original_offset = $(this).offset().top;
          function removePinClasses(object) {
            object.removeClass('pin-top');
            object.removeClass('pinned');
            object.removeClass('pin-bottom');
          }
          function updateElements(objects, scrolled) {
            objects.each(function() {
              if (options.top <= scrolled && options.bottom >= scrolled && !$(this).hasClass('pinned')) {
                removePinClasses($(this));
                $(this).css('top', options.offset);
                $(this).addClass('pinned');
              }
              if (scrolled < options.top && !$(this).hasClass('pin-top')) {
                removePinClasses($(this));
                $(this).css('top', 0);
                $(this).addClass('pin-top');
              }
              if (scrolled > options.bottom && !$(this).hasClass('pin-bottom')) {
                removePinClasses($(this));
                $(this).addClass('pin-bottom');
                $(this).css('top', options.bottom - $original_offset);
              }
            });
          }
          updateElements($this, $(window).scrollTop());
          $(window).on('scroll.' + $uniqueId, function() {
            var $scrolled = $(window).scrollTop() + options.offset;
            updateElements($this, $scrolled);
          });
        });
      };
    }(jQuery));
    ;
    (function($) {
      $(document).ready(function() {
        $.fn.reverse = [].reverse;
        $(document).on('mouseenter.fixedActionBtn', '.fixed-action-btn:not(.click-to-toggle)', function(e) {
          var $this = $(this);
          openFABMenu($this);
        });
        $(document).on('mouseleave.fixedActionBtn', '.fixed-action-btn:not(.click-to-toggle)', function(e) {
          var $this = $(this);
          closeFABMenu($this);
        });
        $(document).on('click.fixedActionBtn', '.fixed-action-btn.click-to-toggle > a', function(e) {
          var $this = $(this);
          var $menu = $this.parent();
          if ($menu.hasClass('active')) {
            closeFABMenu($menu);
          } else {
            openFABMenu($menu);
          }
        });
      });
      $.fn.extend({
        openFAB: function() {
          openFABMenu($(this));
        },
        closeFAB: function() {
          closeFABMenu($(this));
        }
      });
      var openFABMenu = function(btn) {
        $this = btn;
        if ($this.hasClass('active') === false) {
          var horizontal = $this.hasClass('horizontal');
          var offsetY,
              offsetX;
          if (horizontal === true) {
            offsetX = 40;
          } else {
            offsetY = 40;
          }
          $this.addClass('active');
          $this.find('ul .btn-floating').velocity({
            scaleY: ".4",
            scaleX: ".4",
            translateY: offsetY + 'px',
            translateX: offsetX + 'px'
          }, {duration: 0});
          var time = 0;
          $this.find('ul .btn-floating').reverse().each(function() {
            $(this).velocity({
              opacity: "1",
              scaleX: "1",
              scaleY: "1",
              translateY: "0",
              translateX: '0'
            }, {
              duration: 80,
              delay: time
            });
            time += 40;
          });
        }
      };
      var closeFABMenu = function(btn) {
        $this = btn;
        var horizontal = $this.hasClass('horizontal');
        var offsetY,
            offsetX;
        if (horizontal === true) {
          offsetX = 40;
        } else {
          offsetY = 40;
        }
        $this.removeClass('active');
        var time = 0;
        $this.find('ul .btn-floating').velocity("stop", true);
        $this.find('ul .btn-floating').velocity({
          opacity: "0",
          scaleX: ".4",
          scaleY: ".4",
          translateY: offsetY + 'px',
          translateX: offsetX + 'px'
        }, {duration: 80});
      };
    }(jQuery));
    ;
    (function($) {
      Materialize.fadeInImage = function(selector) {
        var element = $(selector);
        element.css({opacity: 0});
        $(element).velocity({opacity: 1}, {
          duration: 650,
          queue: false,
          easing: 'easeOutSine'
        });
        $(element).velocity({opacity: 1}, {
          duration: 1300,
          queue: false,
          easing: 'swing',
          step: function(now, fx) {
            fx.start = 100;
            var grayscale_setting = now / 100;
            var brightness_setting = 150 - (100 - now) / 1.75;
            if (brightness_setting < 100) {
              brightness_setting = 100;
            }
            if (now >= 0) {
              $(this).css({
                "-webkit-filter": "grayscale(" + grayscale_setting + ")" + "brightness(" + brightness_setting + "%)",
                "filter": "grayscale(" + grayscale_setting + ")" + "brightness(" + brightness_setting + "%)"
              });
            }
          }
        });
      };
      Materialize.showStaggeredList = function(selector) {
        var time = 0;
        $(selector).find('li').velocity({translateX: "-100px"}, {duration: 0});
        $(selector).find('li').each(function() {
          $(this).velocity({
            opacity: "1",
            translateX: "0"
          }, {
            duration: 800,
            delay: time,
            easing: [60, 10]
          });
          time += 120;
        });
      };
      $(document).ready(function() {
        var swipeLeft = false;
        var swipeRight = false;
        $('.dismissable').each(function() {
          $(this).hammer({prevent_default: false}).bind('pan', function(e) {
            if (e.gesture.pointerType === "touch") {
              var $this = $(this);
              var direction = e.gesture.direction;
              var x = e.gesture.deltaX;
              var velocityX = e.gesture.velocityX;
              $this.velocity({translateX: x}, {
                duration: 50,
                queue: false,
                easing: 'easeOutQuad'
              });
              if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.75)) {
                swipeLeft = true;
              }
              if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.75)) {
                swipeRight = true;
              }
            }
          }).bind('panend', function(e) {
            if (Math.abs(e.gesture.deltaX) < ($(this).innerWidth() / 2)) {
              swipeRight = false;
              swipeLeft = false;
            }
            if (e.gesture.pointerType === "touch") {
              var $this = $(this);
              if (swipeLeft || swipeRight) {
                var fullWidth;
                if (swipeLeft) {
                  fullWidth = $this.innerWidth();
                } else {
                  fullWidth = -1 * $this.innerWidth();
                }
                $this.velocity({translateX: fullWidth}, {
                  duration: 100,
                  queue: false,
                  easing: 'easeOutQuad',
                  complete: function() {
                    $this.css('border', 'none');
                    $this.velocity({
                      height: 0,
                      padding: 0
                    }, {
                      duration: 200,
                      queue: false,
                      easing: 'easeOutQuad',
                      complete: function() {
                        $this.remove();
                      }
                    });
                  }
                });
              } else {
                $this.velocity({translateX: 0}, {
                  duration: 100,
                  queue: false,
                  easing: 'easeOutQuad'
                });
              }
              swipeLeft = false;
              swipeRight = false;
            }
          });
        });
      });
    }(jQuery));
    ;
    (function($) {
      Materialize.scrollFire = function(options) {
        var didScroll = false;
        window.addEventListener("scroll", function() {
          didScroll = true;
        });
        setInterval(function() {
          if (didScroll) {
            didScroll = false;
            var windowScroll = window.pageYOffset + window.innerHeight;
            for (var i = 0; i < options.length; i++) {
              var value = options[i];
              var selector = value.selector,
                  offset = value.offset,
                  callback = value.callback;
              var currentElement = document.querySelector(selector);
              if (currentElement !== null) {
                var elementOffset = currentElement.getBoundingClientRect().top + window.pageYOffset;
                if (windowScroll > (elementOffset + offset)) {
                  if (value.done !== true) {
                    if (typeof(callback) === 'function') {
                      callback.call(this);
                    } else if (typeof(callback) === 'string') {
                      var callbackFunc = new Function(callback);
                      callbackFunc();
                    }
                    value.done = true;
                  }
                }
              }
            }
          }
        }, 100);
      };
    })(jQuery);
    ;
    (function(factory) {
      if (typeof define == 'function' && define.amd)
        define('picker', ['jquery'], factory);
      else if (typeof exports == 'object')
        module.exports = factory(require('jquery'));
      else
        this.Picker = factory(jQuery);
    }(function($) {
      var $window = $(window);
      var $document = $(document);
      var $html = $(document.documentElement);
      function PickerConstructor(ELEMENT, NAME, COMPONENT, OPTIONS) {
        if (!ELEMENT)
          return PickerConstructor;
        var IS_DEFAULT_THEME = false,
            STATE = {id: ELEMENT.id || 'P' + Math.abs(~~(Math.random() * new Date()))},
            SETTINGS = COMPONENT ? $.extend(true, {}, COMPONENT.defaults, OPTIONS) : OPTIONS || {},
            CLASSES = $.extend({}, PickerConstructor.klasses(), SETTINGS.klass),
            $ELEMENT = $(ELEMENT),
            PickerInstance = function() {
              return this.start();
            },
            P = PickerInstance.prototype = {
              constructor: PickerInstance,
              $node: $ELEMENT,
              start: function() {
                if (STATE && STATE.start)
                  return P;
                STATE.methods = {};
                STATE.start = true;
                STATE.open = false;
                STATE.type = ELEMENT.type;
                ELEMENT.autofocus = ELEMENT == getActiveElement();
                ELEMENT.readOnly = !SETTINGS.editable;
                ELEMENT.id = ELEMENT.id || STATE.id;
                if (ELEMENT.type != 'text') {
                  ELEMENT.type = 'text';
                }
                P.component = new COMPONENT(P, SETTINGS);
                P.$root = $(PickerConstructor._.node('div', createWrappedComponent(), CLASSES.picker, 'id="' + ELEMENT.id + '_root" tabindex="0"'));
                prepareElementRoot();
                if (SETTINGS.formatSubmit) {
                  prepareElementHidden();
                }
                prepareElement();
                if (SETTINGS.container)
                  $(SETTINGS.container).append(P.$root);
                else
                  $ELEMENT.after(P.$root);
                P.on({
                  start: P.component.onStart,
                  render: P.component.onRender,
                  stop: P.component.onStop,
                  open: P.component.onOpen,
                  close: P.component.onClose,
                  set: P.component.onSet
                }).on({
                  start: SETTINGS.onStart,
                  render: SETTINGS.onRender,
                  stop: SETTINGS.onStop,
                  open: SETTINGS.onOpen,
                  close: SETTINGS.onClose,
                  set: SETTINGS.onSet
                });
                IS_DEFAULT_THEME = isUsingDefaultTheme(P.$root.children()[0]);
                if (ELEMENT.autofocus) {
                  P.open();
                }
                return P.trigger('start').trigger('render');
              },
              render: function(entireComponent) {
                if (entireComponent)
                  P.$root.html(createWrappedComponent());
                else
                  P.$root.find('.' + CLASSES.box).html(P.component.nodes(STATE.open));
                return P.trigger('render');
              },
              stop: function() {
                if (!STATE.start)
                  return P;
                P.close();
                if (P._hidden) {
                  P._hidden.parentNode.removeChild(P._hidden);
                }
                P.$root.remove();
                $ELEMENT.removeClass(CLASSES.input).removeData(NAME);
                setTimeout(function() {
                  $ELEMENT.off('.' + STATE.id);
                }, 0);
                ELEMENT.type = STATE.type;
                ELEMENT.readOnly = false;
                P.trigger('stop');
                STATE.methods = {};
                STATE.start = false;
                return P;
              },
              open: function(dontGiveFocus) {
                if (STATE.open)
                  return P;
                $ELEMENT.addClass(CLASSES.active);
                aria(ELEMENT, 'expanded', true);
                setTimeout(function() {
                  P.$root.addClass(CLASSES.opened);
                  aria(P.$root[0], 'hidden', false);
                }, 0);
                if (dontGiveFocus !== false) {
                  STATE.open = true;
                  if (IS_DEFAULT_THEME) {
                    $html.css('overflow', 'hidden').css('padding-right', '+=' + getScrollbarWidth());
                  }
                  P.$root.eq(0).focus();
                  $document.on('click.' + STATE.id + ' focusin.' + STATE.id, function(event) {
                    var target = event.target;
                    if (target != ELEMENT && target != document && event.which != 3) {
                      P.close(target === P.$root.children()[0]);
                    }
                  }).on('keydown.' + STATE.id, function(event) {
                    var keycode = event.keyCode,
                        keycodeToMove = P.component.key[keycode],
                        target = event.target;
                    if (keycode == 27) {
                      P.close(true);
                    } else if (target == P.$root[0] && (keycodeToMove || keycode == 13)) {
                      event.preventDefault();
                      if (keycodeToMove) {
                        PickerConstructor._.trigger(P.component.key.go, P, [PickerConstructor._.trigger(keycodeToMove)]);
                      } else if (!P.$root.find('.' + CLASSES.highlighted).hasClass(CLASSES.disabled)) {
                        P.set('select', P.component.item.highlight).close();
                      }
                    } else if ($.contains(P.$root[0], target) && keycode == 13) {
                      event.preventDefault();
                      target.click();
                    }
                  });
                }
                return P.trigger('open');
              },
              close: function(giveFocus) {
                if (giveFocus) {
                  P.$root.off('focus.toOpen').eq(0).focus();
                  setTimeout(function() {
                    P.$root.on('focus.toOpen', handleFocusToOpenEvent);
                  }, 0);
                }
                $ELEMENT.removeClass(CLASSES.active);
                aria(ELEMENT, 'expanded', false);
                setTimeout(function() {
                  P.$root.removeClass(CLASSES.opened + ' ' + CLASSES.focused);
                  aria(P.$root[0], 'hidden', true);
                }, 0);
                if (!STATE.open)
                  return P;
                STATE.open = false;
                if (IS_DEFAULT_THEME) {
                  $html.css('overflow', '').css('padding-right', '-=' + getScrollbarWidth());
                }
                $document.off('.' + STATE.id);
                return P.trigger('close');
              },
              clear: function(options) {
                return P.set('clear', null, options);
              },
              set: function(thing, value, options) {
                var thingItem,
                    thingValue,
                    thingIsObject = $.isPlainObject(thing),
                    thingObject = thingIsObject ? thing : {};
                options = thingIsObject && $.isPlainObject(value) ? value : options || {};
                if (thing) {
                  if (!thingIsObject) {
                    thingObject[thing] = value;
                  }
                  for (thingItem in thingObject) {
                    thingValue = thingObject[thingItem];
                    if (thingItem in P.component.item) {
                      if (thingValue === undefined)
                        thingValue = null;
                      P.component.set(thingItem, thingValue, options);
                    }
                    if (thingItem == 'select' || thingItem == 'clear') {
                      $ELEMENT.val(thingItem == 'clear' ? '' : P.get(thingItem, SETTINGS.format)).trigger('change');
                    }
                  }
                  P.render();
                }
                return options.muted ? P : P.trigger('set', thingObject);
              },
              get: function(thing, format) {
                thing = thing || 'value';
                if (STATE[thing] != null) {
                  return STATE[thing];
                }
                if (thing == 'valueSubmit') {
                  if (P._hidden) {
                    return P._hidden.value;
                  }
                  thing = 'value';
                }
                if (thing == 'value') {
                  return ELEMENT.value;
                }
                if (thing in P.component.item) {
                  if (typeof format == 'string') {
                    var thingValue = P.component.get(thing);
                    return thingValue ? PickerConstructor._.trigger(P.component.formats.toString, P.component, [format, thingValue]) : '';
                  }
                  return P.component.get(thing);
                }
              },
              on: function(thing, method, internal) {
                var thingName,
                    thingMethod,
                    thingIsObject = $.isPlainObject(thing),
                    thingObject = thingIsObject ? thing : {};
                if (thing) {
                  if (!thingIsObject) {
                    thingObject[thing] = method;
                  }
                  for (thingName in thingObject) {
                    thingMethod = thingObject[thingName];
                    if (internal) {
                      thingName = '_' + thingName;
                    }
                    STATE.methods[thingName] = STATE.methods[thingName] || [];
                    STATE.methods[thingName].push(thingMethod);
                  }
                }
                return P;
              },
              off: function() {
                var i,
                    thingName,
                    names = arguments;
                for (i = 0, namesCount = names.length; i < namesCount; i += 1) {
                  thingName = names[i];
                  if (thingName in STATE.methods) {
                    delete STATE.methods[thingName];
                  }
                }
                return P;
              },
              trigger: function(name, data) {
                var _trigger = function(name) {
                  var methodList = STATE.methods[name];
                  if (methodList) {
                    methodList.map(function(method) {
                      PickerConstructor._.trigger(method, P, [data]);
                    });
                  }
                };
                _trigger('_' + name);
                _trigger(name);
                return P;
              }
            };
        function createWrappedComponent() {
          return PickerConstructor._.node('div', PickerConstructor._.node('div', PickerConstructor._.node('div', PickerConstructor._.node('div', P.component.nodes(STATE.open), CLASSES.box), CLASSES.wrap), CLASSES.frame), CLASSES.holder);
        }
        function prepareElement() {
          $ELEMENT.data(NAME, P).addClass(CLASSES.input).attr('tabindex', -1).val($ELEMENT.data('value') ? P.get('select', SETTINGS.format) : ELEMENT.value);
          if (!SETTINGS.editable) {
            $ELEMENT.on('focus.' + STATE.id + ' click.' + STATE.id, function(event) {
              event.preventDefault();
              P.$root.eq(0).focus();
            }).on('keydown.' + STATE.id, handleKeydownEvent);
          }
          aria(ELEMENT, {
            haspopup: true,
            expanded: false,
            readonly: false,
            owns: ELEMENT.id + '_root'
          });
        }
        function prepareElementRoot() {
          P.$root.on({
            keydown: handleKeydownEvent,
            focusin: function(event) {
              P.$root.removeClass(CLASSES.focused);
              event.stopPropagation();
            },
            'mousedown click': function(event) {
              var target = event.target;
              if (target != P.$root.children()[0]) {
                event.stopPropagation();
                if (event.type == 'mousedown' && !$(target).is('input, select, textarea, button, option')) {
                  event.preventDefault();
                  P.$root.eq(0).focus();
                }
              }
            }
          }).on({
            focus: function() {
              $ELEMENT.addClass(CLASSES.target);
            },
            blur: function() {
              $ELEMENT.removeClass(CLASSES.target);
            }
          }).on('focus.toOpen', handleFocusToOpenEvent).on('click', '[data-pick], [data-nav], [data-clear], [data-close]', function() {
            var $target = $(this),
                targetData = $target.data(),
                targetDisabled = $target.hasClass(CLASSES.navDisabled) || $target.hasClass(CLASSES.disabled),
                activeElement = getActiveElement();
            activeElement = activeElement && (activeElement.type || activeElement.href);
            if (targetDisabled || activeElement && !$.contains(P.$root[0], activeElement)) {
              P.$root.eq(0).focus();
            }
            if (!targetDisabled && targetData.nav) {
              P.set('highlight', P.component.item.highlight, {nav: targetData.nav});
            } else if (!targetDisabled && 'pick' in targetData) {
              P.set('select', targetData.pick);
            } else if (targetData.clear) {
              P.clear().close(true);
            } else if (targetData.close) {
              P.close(true);
            }
          });
          aria(P.$root[0], 'hidden', true);
        }
        function prepareElementHidden() {
          var name;
          if (SETTINGS.hiddenName === true) {
            name = ELEMENT.name;
            ELEMENT.name = '';
          } else {
            name = [typeof SETTINGS.hiddenPrefix == 'string' ? SETTINGS.hiddenPrefix : '', typeof SETTINGS.hiddenSuffix == 'string' ? SETTINGS.hiddenSuffix : '_submit'];
            name = name[0] + ELEMENT.name + name[1];
          }
          P._hidden = $('<input ' + 'type=hidden ' + 'name="' + name + '"' + ($ELEMENT.data('value') || ELEMENT.value ? ' value="' + P.get('select', SETTINGS.formatSubmit) + '"' : '') + '>')[0];
          $ELEMENT.on('change.' + STATE.id, function() {
            P._hidden.value = ELEMENT.value ? P.get('select', SETTINGS.formatSubmit) : '';
          });
          if (SETTINGS.container)
            $(SETTINGS.container).append(P._hidden);
          else
            $ELEMENT.after(P._hidden);
        }
        function handleKeydownEvent(event) {
          var keycode = event.keyCode,
              isKeycodeDelete = /^(8|46)$/.test(keycode);
          if (keycode == 27) {
            P.close();
            return false;
          }
          if (keycode == 32 || isKeycodeDelete || !STATE.open && P.component.key[keycode]) {
            event.preventDefault();
            event.stopPropagation();
            if (isKeycodeDelete) {
              P.clear().close();
            } else {
              P.open();
            }
          }
        }
        function handleFocusToOpenEvent(event) {
          event.stopPropagation();
          if (event.type == 'focus') {
            P.$root.addClass(CLASSES.focused);
          }
          P.open();
        }
        return new PickerInstance();
      }
      PickerConstructor.klasses = function(prefix) {
        prefix = prefix || 'picker';
        return {
          picker: prefix,
          opened: prefix + '--opened',
          focused: prefix + '--focused',
          input: prefix + '__input',
          active: prefix + '__input--active',
          target: prefix + '__input--target',
          holder: prefix + '__holder',
          frame: prefix + '__frame',
          wrap: prefix + '__wrap',
          box: prefix + '__box'
        };
      };
      function isUsingDefaultTheme(element) {
        var theme,
            prop = 'position';
        if (element.currentStyle) {
          theme = element.currentStyle[prop];
        } else if (window.getComputedStyle) {
          theme = getComputedStyle(element)[prop];
        }
        return theme == 'fixed';
      }
      function getScrollbarWidth() {
        if ($html.height() <= $window.height()) {
          return 0;
        }
        var $outer = $('<div style="visibility:hidden;width:100px" />').appendTo('body');
        var widthWithoutScroll = $outer[0].offsetWidth;
        $outer.css('overflow', 'scroll');
        var $inner = $('<div style="width:100%" />').appendTo($outer);
        var widthWithScroll = $inner[0].offsetWidth;
        $outer.remove();
        return widthWithoutScroll - widthWithScroll;
      }
      PickerConstructor._ = {
        group: function(groupObject) {
          var loopObjectScope,
              nodesList = '',
              counter = PickerConstructor._.trigger(groupObject.min, groupObject);
          for (; counter <= PickerConstructor._.trigger(groupObject.max, groupObject, [counter]); counter += groupObject.i) {
            loopObjectScope = PickerConstructor._.trigger(groupObject.item, groupObject, [counter]);
            nodesList += PickerConstructor._.node(groupObject.node, loopObjectScope[0], loopObjectScope[1], loopObjectScope[2]);
          }
          return nodesList;
        },
        node: function(wrapper, item, klass, attribute) {
          if (!item)
            return '';
          item = $.isArray(item) ? item.join('') : item;
          klass = klass ? ' class="' + klass + '"' : '';
          attribute = attribute ? ' ' + attribute : '';
          return '<' + wrapper + klass + attribute + '>' + item + '</' + wrapper + '>';
        },
        lead: function(number) {
          return (number < 10 ? '0' : '') + number;
        },
        trigger: function(callback, scope, args) {
          return typeof callback == 'function' ? callback.apply(scope, args || []) : callback;
        },
        digits: function(string) {
          return (/\d/).test(string[1]) ? 2 : 1;
        },
        isDate: function(value) {
          return {}.toString.call(value).indexOf('Date') > -1 && this.isInteger(value.getDate());
        },
        isInteger: function(value) {
          return {}.toString.call(value).indexOf('Number') > -1 && value % 1 === 0;
        },
        ariaAttr: ariaAttr
      };
      PickerConstructor.extend = function(name, Component) {
        $.fn[name] = function(options, action) {
          var componentData = this.data(name);
          if (options == 'picker') {
            return componentData;
          }
          if (componentData && typeof options == 'string') {
            return PickerConstructor._.trigger(componentData[options], componentData, [action]);
          }
          return this.each(function() {
            var $this = $(this);
            if (!$this.data(name)) {
              new PickerConstructor(this, name, Component, options);
            }
          });
        };
        $.fn[name].defaults = Component.defaults;
      };
      function aria(element, attribute, value) {
        if ($.isPlainObject(attribute)) {
          for (var key in attribute) {
            ariaSet(element, key, attribute[key]);
          }
        } else {
          ariaSet(element, attribute, value);
        }
      }
      function ariaSet(element, attribute, value) {
        element.setAttribute((attribute == 'role' ? '' : 'aria-') + attribute, value);
      }
      function ariaAttr(attribute, data) {
        if (!$.isPlainObject(attribute)) {
          attribute = {attribute: data};
        }
        data = '';
        for (var key in attribute) {
          var attr = (key == 'role' ? '' : 'aria-') + key,
              attrVal = attribute[key];
          data += attrVal == null ? '' : attr + '="' + attribute[key] + '"';
        }
        return data;
      }
      function getActiveElement() {
        try {
          return document.activeElement;
        } catch (err) {}
      }
      return PickerConstructor;
    }));
    ;
    (function(factory) {
      if (typeof define == 'function' && define.amd)
        define(['picker', 'jquery'], factory);
      else if (typeof exports == 'object')
        module.exports = factory(require('./picker.js'), require('jquery'));
      else
        factory(Picker, jQuery);
    }(function(Picker, $) {
      var DAYS_IN_WEEK = 7,
          WEEKS_IN_CALENDAR = 6,
          _ = Picker._;
      function DatePicker(picker, settings) {
        var calendar = this,
            element = picker.$node[0],
            elementValue = element.value,
            elementDataValue = picker.$node.data('value'),
            valueString = elementDataValue || elementValue,
            formatString = elementDataValue ? settings.formatSubmit : settings.format,
            isRTL = function() {
              return element.currentStyle ? element.currentStyle.direction == 'rtl' : getComputedStyle(picker.$root[0]).direction == 'rtl';
            };
        calendar.settings = settings;
        calendar.$node = picker.$node;
        calendar.queue = {
          min: 'measure create',
          max: 'measure create',
          now: 'now create',
          select: 'parse create validate',
          highlight: 'parse navigate create validate',
          view: 'parse create validate viewset',
          disable: 'deactivate',
          enable: 'activate'
        };
        calendar.item = {};
        calendar.item.clear = null;
        calendar.item.disable = (settings.disable || []).slice(0);
        calendar.item.enable = -(function(collectionDisabled) {
          return collectionDisabled[0] === true ? collectionDisabled.shift() : -1;
        })(calendar.item.disable);
        calendar.set('min', settings.min).set('max', settings.max).set('now');
        if (valueString) {
          calendar.set('select', valueString, {format: formatString});
        } else {
          calendar.set('select', null).set('highlight', calendar.item.now);
        }
        calendar.key = {
          40: 7,
          38: -7,
          39: function() {
            return isRTL() ? -1 : 1;
          },
          37: function() {
            return isRTL() ? 1 : -1;
          },
          go: function(timeChange) {
            var highlightedObject = calendar.item.highlight,
                targetDate = new Date(highlightedObject.year, highlightedObject.month, highlightedObject.date + timeChange);
            calendar.set('highlight', targetDate, {interval: timeChange});
            this.render();
          }
        };
        picker.on('render', function() {
          picker.$root.find('.' + settings.klass.selectMonth).on('change', function() {
            var value = this.value;
            if (value) {
              picker.set('highlight', [picker.get('view').year, value, picker.get('highlight').date]);
              picker.$root.find('.' + settings.klass.selectMonth).trigger('focus');
            }
          });
          picker.$root.find('.' + settings.klass.selectYear).on('change', function() {
            var value = this.value;
            if (value) {
              picker.set('highlight', [value, picker.get('view').month, picker.get('highlight').date]);
              picker.$root.find('.' + settings.klass.selectYear).trigger('focus');
            }
          });
        }, 1).on('open', function() {
          var includeToday = '';
          if (calendar.disabled(calendar.get('now'))) {
            includeToday = ':not(.' + settings.klass.buttonToday + ')';
          }
          picker.$root.find('button' + includeToday + ', select').attr('disabled', false);
        }, 1).on('close', function() {
          picker.$root.find('button, select').attr('disabled', true);
        }, 1);
      }
      DatePicker.prototype.set = function(type, value, options) {
        var calendar = this,
            calendarItem = calendar.item;
        if (value === null) {
          if (type == 'clear')
            type = 'select';
          calendarItem[type] = value;
          return calendar;
        }
        calendarItem[(type == 'enable' ? 'disable' : type == 'flip' ? 'enable' : type)] = calendar.queue[type].split(' ').map(function(method) {
          value = calendar[method](type, value, options);
          return value;
        }).pop();
        if (type == 'select') {
          calendar.set('highlight', calendarItem.select, options);
        } else if (type == 'highlight') {
          calendar.set('view', calendarItem.highlight, options);
        } else if (type.match(/^(flip|min|max|disable|enable)$/)) {
          if (calendarItem.select && calendar.disabled(calendarItem.select)) {
            calendar.set('select', calendarItem.select, options);
          }
          if (calendarItem.highlight && calendar.disabled(calendarItem.highlight)) {
            calendar.set('highlight', calendarItem.highlight, options);
          }
        }
        return calendar;
      };
      DatePicker.prototype.get = function(type) {
        return this.item[type];
      };
      DatePicker.prototype.create = function(type, value, options) {
        var isInfiniteValue,
            calendar = this;
        value = value === undefined ? type : value;
        if (value == -Infinity || value == Infinity) {
          isInfiniteValue = value;
        } else if ($.isPlainObject(value) && _.isInteger(value.pick)) {
          value = value.obj;
        } else if ($.isArray(value)) {
          value = new Date(value[0], value[1], value[2]);
          value = _.isDate(value) ? value : calendar.create().obj;
        } else if (_.isInteger(value) || _.isDate(value)) {
          value = calendar.normalize(new Date(value), options);
        } else {
          value = calendar.now(type, value, options);
        }
        return {
          year: isInfiniteValue || value.getFullYear(),
          month: isInfiniteValue || value.getMonth(),
          date: isInfiniteValue || value.getDate(),
          day: isInfiniteValue || value.getDay(),
          obj: isInfiniteValue || value,
          pick: isInfiniteValue || value.getTime()
        };
      };
      DatePicker.prototype.createRange = function(from, to) {
        var calendar = this,
            createDate = function(date) {
              if (date === true || $.isArray(date) || _.isDate(date)) {
                return calendar.create(date);
              }
              return date;
            };
        if (!_.isInteger(from)) {
          from = createDate(from);
        }
        if (!_.isInteger(to)) {
          to = createDate(to);
        }
        if (_.isInteger(from) && $.isPlainObject(to)) {
          from = [to.year, to.month, to.date + from];
        } else if (_.isInteger(to) && $.isPlainObject(from)) {
          to = [from.year, from.month, from.date + to];
        }
        return {
          from: createDate(from),
          to: createDate(to)
        };
      };
      DatePicker.prototype.withinRange = function(range, dateUnit) {
        range = this.createRange(range.from, range.to);
        return dateUnit.pick >= range.from.pick && dateUnit.pick <= range.to.pick;
      };
      DatePicker.prototype.overlapRanges = function(one, two) {
        var calendar = this;
        one = calendar.createRange(one.from, one.to);
        two = calendar.createRange(two.from, two.to);
        return calendar.withinRange(one, two.from) || calendar.withinRange(one, two.to) || calendar.withinRange(two, one.from) || calendar.withinRange(two, one.to);
      };
      DatePicker.prototype.now = function(type, value, options) {
        value = new Date();
        if (options && options.rel) {
          value.setDate(value.getDate() + options.rel);
        }
        return this.normalize(value, options);
      };
      DatePicker.prototype.navigate = function(type, value, options) {
        var targetDateObject,
            targetYear,
            targetMonth,
            targetDate,
            isTargetArray = $.isArray(value),
            isTargetObject = $.isPlainObject(value),
            viewsetObject = this.item.view;
        if (isTargetArray || isTargetObject) {
          if (isTargetObject) {
            targetYear = value.year;
            targetMonth = value.month;
            targetDate = value.date;
          } else {
            targetYear = +value[0];
            targetMonth = +value[1];
            targetDate = +value[2];
          }
          if (options && options.nav && viewsetObject && viewsetObject.month !== targetMonth) {
            targetYear = viewsetObject.year;
            targetMonth = viewsetObject.month;
          }
          targetDateObject = new Date(targetYear, targetMonth + (options && options.nav ? options.nav : 0), 1);
          targetYear = targetDateObject.getFullYear();
          targetMonth = targetDateObject.getMonth();
          while (new Date(targetYear, targetMonth, targetDate).getMonth() !== targetMonth) {
            targetDate -= 1;
          }
          value = [targetYear, targetMonth, targetDate];
        }
        return value;
      };
      DatePicker.prototype.normalize = function(value) {
        value.setHours(0, 0, 0, 0);
        return value;
      };
      DatePicker.prototype.measure = function(type, value) {
        var calendar = this;
        if (!value) {
          value = type == 'min' ? -Infinity : Infinity;
        } else if (typeof value == 'string') {
          value = calendar.parse(type, value);
        } else if (_.isInteger(value)) {
          value = calendar.now(type, value, {rel: value});
        }
        return value;
      };
      DatePicker.prototype.viewset = function(type, dateObject) {
        return this.create([dateObject.year, dateObject.month, 1]);
      };
      DatePicker.prototype.validate = function(type, dateObject, options) {
        var calendar = this,
            originalDateObject = dateObject,
            interval = options && options.interval ? options.interval : 1,
            isFlippedBase = calendar.item.enable === -1,
            hasEnabledBeforeTarget,
            hasEnabledAfterTarget,
            minLimitObject = calendar.item.min,
            maxLimitObject = calendar.item.max,
            reachedMin,
            reachedMax,
            hasEnabledWeekdays = isFlippedBase && calendar.item.disable.filter(function(value) {
              if ($.isArray(value)) {
                var dateTime = calendar.create(value).pick;
                if (dateTime < dateObject.pick)
                  hasEnabledBeforeTarget = true;
                else if (dateTime > dateObject.pick)
                  hasEnabledAfterTarget = true;
              }
              return _.isInteger(value);
            }).length;
        if (!options || !options.nav)
          if ((!isFlippedBase && calendar.disabled(dateObject)) || (isFlippedBase && calendar.disabled(dateObject) && (hasEnabledWeekdays || hasEnabledBeforeTarget || hasEnabledAfterTarget)) || (!isFlippedBase && (dateObject.pick <= minLimitObject.pick || dateObject.pick >= maxLimitObject.pick))) {
            if (isFlippedBase && !hasEnabledWeekdays && ((!hasEnabledAfterTarget && interval > 0) || (!hasEnabledBeforeTarget && interval < 0))) {
              interval *= -1;
            }
            while (calendar.disabled(dateObject)) {
              if (Math.abs(interval) > 1 && (dateObject.month < originalDateObject.month || dateObject.month > originalDateObject.month)) {
                dateObject = originalDateObject;
                interval = interval > 0 ? 1 : -1;
              }
              if (dateObject.pick <= minLimitObject.pick) {
                reachedMin = true;
                interval = 1;
                dateObject = calendar.create([minLimitObject.year, minLimitObject.month, minLimitObject.date + (dateObject.pick === minLimitObject.pick ? 0 : -1)]);
              } else if (dateObject.pick >= maxLimitObject.pick) {
                reachedMax = true;
                interval = -1;
                dateObject = calendar.create([maxLimitObject.year, maxLimitObject.month, maxLimitObject.date + (dateObject.pick === maxLimitObject.pick ? 0 : 1)]);
              }
              if (reachedMin && reachedMax) {
                break;
              }
              dateObject = calendar.create([dateObject.year, dateObject.month, dateObject.date + interval]);
            }
          }
        return dateObject;
      };
      DatePicker.prototype.disabled = function(dateToVerify) {
        var calendar = this,
            isDisabledMatch = calendar.item.disable.filter(function(dateToDisable) {
              if (_.isInteger(dateToDisable)) {
                return dateToVerify.day === (calendar.settings.firstDay ? dateToDisable : dateToDisable - 1) % 7;
              }
              if ($.isArray(dateToDisable) || _.isDate(dateToDisable)) {
                return dateToVerify.pick === calendar.create(dateToDisable).pick;
              }
              if ($.isPlainObject(dateToDisable)) {
                return calendar.withinRange(dateToDisable, dateToVerify);
              }
            });
        isDisabledMatch = isDisabledMatch.length && !isDisabledMatch.filter(function(dateToDisable) {
          return $.isArray(dateToDisable) && dateToDisable[3] == 'inverted' || $.isPlainObject(dateToDisable) && dateToDisable.inverted;
        }).length;
        return calendar.item.enable === -1 ? !isDisabledMatch : isDisabledMatch || dateToVerify.pick < calendar.item.min.pick || dateToVerify.pick > calendar.item.max.pick;
      };
      DatePicker.prototype.parse = function(type, value, options) {
        var calendar = this,
            parsingObject = {};
        if (!value || typeof value != 'string') {
          return value;
        }
        if (!(options && options.format)) {
          options = options || {};
          options.format = calendar.settings.format;
        }
        calendar.formats.toArray(options.format).map(function(label) {
          var formattingLabel = calendar.formats[label],
              formatLength = formattingLabel ? _.trigger(formattingLabel, calendar, [value, parsingObject]) : label.replace(/^!/, '').length;
          if (formattingLabel) {
            parsingObject[label] = value.substr(0, formatLength);
          }
          value = value.substr(formatLength);
        });
        return [parsingObject.yyyy || parsingObject.yy, +(parsingObject.mm || parsingObject.m) - 1, parsingObject.dd || parsingObject.d];
      };
      DatePicker.prototype.formats = (function() {
        function getWordLengthFromCollection(string, collection, dateObject) {
          var word = string.match(/\w+/)[0];
          if (!dateObject.mm && !dateObject.m) {
            dateObject.m = collection.indexOf(word) + 1;
          }
          return word.length;
        }
        function getFirstWordLength(string) {
          return string.match(/\w+/)[0].length;
        }
        return {
          d: function(string, dateObject) {
            return string ? _.digits(string) : dateObject.date;
          },
          dd: function(string, dateObject) {
            return string ? 2 : _.lead(dateObject.date);
          },
          ddd: function(string, dateObject) {
            return string ? getFirstWordLength(string) : this.settings.weekdaysShort[dateObject.day];
          },
          dddd: function(string, dateObject) {
            return string ? getFirstWordLength(string) : this.settings.weekdaysFull[dateObject.day];
          },
          m: function(string, dateObject) {
            return string ? _.digits(string) : dateObject.month + 1;
          },
          mm: function(string, dateObject) {
            return string ? 2 : _.lead(dateObject.month + 1);
          },
          mmm: function(string, dateObject) {
            var collection = this.settings.monthsShort;
            return string ? getWordLengthFromCollection(string, collection, dateObject) : collection[dateObject.month];
          },
          mmmm: function(string, dateObject) {
            var collection = this.settings.monthsFull;
            return string ? getWordLengthFromCollection(string, collection, dateObject) : collection[dateObject.month];
          },
          yy: function(string, dateObject) {
            return string ? 2 : ('' + dateObject.year).slice(2);
          },
          yyyy: function(string, dateObject) {
            return string ? 4 : dateObject.year;
          },
          toArray: function(formatString) {
            return formatString.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
          },
          toString: function(formatString, itemObject) {
            var calendar = this;
            return calendar.formats.toArray(formatString).map(function(label) {
              return _.trigger(calendar.formats[label], calendar, [0, itemObject]) || label.replace(/^!/, '');
            }).join('');
          }
        };
      })();
      DatePicker.prototype.isDateExact = function(one, two) {
        var calendar = this;
        if ((_.isInteger(one) && _.isInteger(two)) || (typeof one == 'boolean' && typeof two == 'boolean')) {
          return one === two;
        }
        if ((_.isDate(one) || $.isArray(one)) && (_.isDate(two) || $.isArray(two))) {
          return calendar.create(one).pick === calendar.create(two).pick;
        }
        if ($.isPlainObject(one) && $.isPlainObject(two)) {
          return calendar.isDateExact(one.from, two.from) && calendar.isDateExact(one.to, two.to);
        }
        return false;
      };
      DatePicker.prototype.isDateOverlap = function(one, two) {
        var calendar = this,
            firstDay = calendar.settings.firstDay ? 1 : 0;
        if (_.isInteger(one) && (_.isDate(two) || $.isArray(two))) {
          one = one % 7 + firstDay;
          return one === calendar.create(two).day + 1;
        }
        if (_.isInteger(two) && (_.isDate(one) || $.isArray(one))) {
          two = two % 7 + firstDay;
          return two === calendar.create(one).day + 1;
        }
        if ($.isPlainObject(one) && $.isPlainObject(two)) {
          return calendar.overlapRanges(one, two);
        }
        return false;
      };
      DatePicker.prototype.flipEnable = function(val) {
        var itemObject = this.item;
        itemObject.enable = val || (itemObject.enable == -1 ? 1 : -1);
      };
      DatePicker.prototype.deactivate = function(type, datesToDisable) {
        var calendar = this,
            disabledItems = calendar.item.disable.slice(0);
        if (datesToDisable == 'flip') {
          calendar.flipEnable();
        } else if (datesToDisable === false) {
          calendar.flipEnable(1);
          disabledItems = [];
        } else if (datesToDisable === true) {
          calendar.flipEnable(-1);
          disabledItems = [];
        } else {
          datesToDisable.map(function(unitToDisable) {
            var matchFound;
            for (var index = 0; index < disabledItems.length; index += 1) {
              if (calendar.isDateExact(unitToDisable, disabledItems[index])) {
                matchFound = true;
                break;
              }
            }
            if (!matchFound) {
              if (_.isInteger(unitToDisable) || _.isDate(unitToDisable) || $.isArray(unitToDisable) || ($.isPlainObject(unitToDisable) && unitToDisable.from && unitToDisable.to)) {
                disabledItems.push(unitToDisable);
              }
            }
          });
        }
        return disabledItems;
      };
      DatePicker.prototype.activate = function(type, datesToEnable) {
        var calendar = this,
            disabledItems = calendar.item.disable,
            disabledItemsCount = disabledItems.length;
        if (datesToEnable == 'flip') {
          calendar.flipEnable();
        } else if (datesToEnable === true) {
          calendar.flipEnable(1);
          disabledItems = [];
        } else if (datesToEnable === false) {
          calendar.flipEnable(-1);
          disabledItems = [];
        } else {
          datesToEnable.map(function(unitToEnable) {
            var matchFound,
                disabledUnit,
                index,
                isExactRange;
            for (index = 0; index < disabledItemsCount; index += 1) {
              disabledUnit = disabledItems[index];
              if (calendar.isDateExact(disabledUnit, unitToEnable)) {
                matchFound = disabledItems[index] = null;
                isExactRange = true;
                break;
              } else if (calendar.isDateOverlap(disabledUnit, unitToEnable)) {
                if ($.isPlainObject(unitToEnable)) {
                  unitToEnable.inverted = true;
                  matchFound = unitToEnable;
                } else if ($.isArray(unitToEnable)) {
                  matchFound = unitToEnable;
                  if (!matchFound[3])
                    matchFound.push('inverted');
                } else if (_.isDate(unitToEnable)) {
                  matchFound = [unitToEnable.getFullYear(), unitToEnable.getMonth(), unitToEnable.getDate(), 'inverted'];
                }
                break;
              }
            }
            if (matchFound)
              for (index = 0; index < disabledItemsCount; index += 1) {
                if (calendar.isDateExact(disabledItems[index], unitToEnable)) {
                  disabledItems[index] = null;
                  break;
                }
              }
            if (isExactRange)
              for (index = 0; index < disabledItemsCount; index += 1) {
                if (calendar.isDateOverlap(disabledItems[index], unitToEnable)) {
                  disabledItems[index] = null;
                  break;
                }
              }
            if (matchFound) {
              disabledItems.push(matchFound);
            }
          });
        }
        return disabledItems.filter(function(val) {
          return val != null;
        });
      };
      DatePicker.prototype.nodes = function(isOpen) {
        var calendar = this,
            settings = calendar.settings,
            calendarItem = calendar.item,
            nowObject = calendarItem.now,
            selectedObject = calendarItem.select,
            highlightedObject = calendarItem.highlight,
            viewsetObject = calendarItem.view,
            disabledCollection = calendarItem.disable,
            minLimitObject = calendarItem.min,
            maxLimitObject = calendarItem.max,
            tableHead = (function(collection, fullCollection) {
              if (settings.firstDay) {
                collection.push(collection.shift());
                fullCollection.push(fullCollection.shift());
              }
              return _.node('thead', _.node('tr', _.group({
                min: 0,
                max: DAYS_IN_WEEK - 1,
                i: 1,
                node: 'th',
                item: function(counter) {
                  return [collection[counter], settings.klass.weekdays, 'scope=col title="' + fullCollection[counter] + '"'];
                }
              })));
            })((settings.showWeekdaysFull ? settings.weekdaysFull : settings.weekdaysLetter).slice(0), settings.weekdaysFull.slice(0)),
            createMonthNav = function(next) {
              return _.node('div', ' ', settings.klass['nav' + (next ? 'Next' : 'Prev')] + ((next && viewsetObject.year >= maxLimitObject.year && viewsetObject.month >= maxLimitObject.month) || (!next && viewsetObject.year <= minLimitObject.year && viewsetObject.month <= minLimitObject.month) ? ' ' + settings.klass.navDisabled : ''), 'data-nav=' + (next || -1) + ' ' + _.ariaAttr({
                role: 'button',
                controls: calendar.$node[0].id + '_table'
              }) + ' ' + 'title="' + (next ? settings.labelMonthNext : settings.labelMonthPrev) + '"');
            },
            createMonthLabel = function(override) {
              var monthsCollection = settings.showMonthsShort ? settings.monthsShort : settings.monthsFull;
              if (override == "short_months") {
                monthsCollection = settings.monthsShort;
              }
              if (settings.selectMonths && override == undefined) {
                return _.node('select', _.group({
                  min: 0,
                  max: 11,
                  i: 1,
                  node: 'option',
                  item: function(loopedMonth) {
                    return [monthsCollection[loopedMonth], 0, 'value=' + loopedMonth + (viewsetObject.month == loopedMonth ? ' selected' : '') + (((viewsetObject.year == minLimitObject.year && loopedMonth < minLimitObject.month) || (viewsetObject.year == maxLimitObject.year && loopedMonth > maxLimitObject.month)) ? ' disabled' : '')];
                  }
                }), settings.klass.selectMonth + ' browser-default', (isOpen ? '' : 'disabled') + ' ' + _.ariaAttr({controls: calendar.$node[0].id + '_table'}) + ' ' + 'title="' + settings.labelMonthSelect + '"');
              }
              if (override == "short_months")
                if (selectedObject != null)
                  return _.node('div', monthsCollection[selectedObject.month]);
                else
                  return _.node('div', monthsCollection[viewsetObject.month]);
              return _.node('div', monthsCollection[viewsetObject.month], settings.klass.month);
            },
            createYearLabel = function(override) {
              var focusedYear = viewsetObject.year,
                  numberYears = settings.selectYears === true ? 5 : ~~(settings.selectYears / 2);
              if (numberYears) {
                var minYear = minLimitObject.year,
                    maxYear = maxLimitObject.year,
                    lowestYear = focusedYear - numberYears,
                    highestYear = focusedYear + numberYears;
                if (minYear > lowestYear) {
                  highestYear += minYear - lowestYear;
                  lowestYear = minYear;
                }
                if (maxYear < highestYear) {
                  var availableYears = lowestYear - minYear,
                      neededYears = highestYear - maxYear;
                  lowestYear -= availableYears > neededYears ? neededYears : availableYears;
                  highestYear = maxYear;
                }
                if (settings.selectYears && override == undefined) {
                  return _.node('select', _.group({
                    min: lowestYear,
                    max: highestYear,
                    i: 1,
                    node: 'option',
                    item: function(loopedYear) {
                      return [loopedYear, 0, 'value=' + loopedYear + (focusedYear == loopedYear ? ' selected' : '')];
                    }
                  }), settings.klass.selectYear + ' browser-default', (isOpen ? '' : 'disabled') + ' ' + _.ariaAttr({controls: calendar.$node[0].id + '_table'}) + ' ' + 'title="' + settings.labelYearSelect + '"');
                }
              }
              if (override == "raw")
                return _.node('div', focusedYear);
              return _.node('div', focusedYear, settings.klass.year);
            };
        createDayLabel = function() {
          if (selectedObject != null)
            return _.node('div', selectedObject.date);
          else
            return _.node('div', nowObject.date);
        };
        createWeekdayLabel = function() {
          var display_day;
          if (selectedObject != null)
            display_day = selectedObject.day;
          else
            display_day = nowObject.day;
          var weekday = settings.weekdaysFull[display_day];
          return weekday;
        };
        return _.node('div', _.node('div', createWeekdayLabel(), "picker__weekday-display") + _.node('div', createMonthLabel("short_months"), settings.klass.month_display) + _.node('div', createDayLabel(), settings.klass.day_display) + _.node('div', createYearLabel("raw"), settings.klass.year_display), settings.klass.date_display) + _.node('div', _.node('div', (settings.selectYears ? createMonthLabel() + createYearLabel() : createMonthLabel() + createYearLabel()) + createMonthNav() + createMonthNav(1), settings.klass.header) + _.node('table', tableHead + _.node('tbody', _.group({
          min: 0,
          max: WEEKS_IN_CALENDAR - 1,
          i: 1,
          node: 'tr',
          item: function(rowCounter) {
            var shiftDateBy = settings.firstDay && calendar.create([viewsetObject.year, viewsetObject.month, 1]).day === 0 ? -7 : 0;
            return [_.group({
              min: DAYS_IN_WEEK * rowCounter - viewsetObject.day + shiftDateBy + 1,
              max: function() {
                return this.min + DAYS_IN_WEEK - 1;
              },
              i: 1,
              node: 'td',
              item: function(targetDate) {
                targetDate = calendar.create([viewsetObject.year, viewsetObject.month, targetDate + (settings.firstDay ? 1 : 0)]);
                var isSelected = selectedObject && selectedObject.pick == targetDate.pick,
                    isHighlighted = highlightedObject && highlightedObject.pick == targetDate.pick,
                    isDisabled = disabledCollection && calendar.disabled(targetDate) || targetDate.pick < minLimitObject.pick || targetDate.pick > maxLimitObject.pick,
                    formattedDate = _.trigger(calendar.formats.toString, calendar, [settings.format, targetDate]);
                return [_.node('div', targetDate.date, (function(klasses) {
                  klasses.push(viewsetObject.month == targetDate.month ? settings.klass.infocus : settings.klass.outfocus);
                  if (nowObject.pick == targetDate.pick) {
                    klasses.push(settings.klass.now);
                  }
                  if (isSelected) {
                    klasses.push(settings.klass.selected);
                  }
                  if (isHighlighted) {
                    klasses.push(settings.klass.highlighted);
                  }
                  if (isDisabled) {
                    klasses.push(settings.klass.disabled);
                  }
                  return klasses.join(' ');
                })([settings.klass.day]), 'data-pick=' + targetDate.pick + ' ' + _.ariaAttr({
                  role: 'gridcell',
                  label: formattedDate,
                  selected: isSelected && calendar.$node.val() === formattedDate ? true : null,
                  activedescendant: isHighlighted ? true : null,
                  disabled: isDisabled ? true : null
                })), '', _.ariaAttr({role: 'presentation'})];
              }
            })];
          }
        })), settings.klass.table, 'id="' + calendar.$node[0].id + '_table' + '" ' + _.ariaAttr({
          role: 'grid',
          controls: calendar.$node[0].id,
          readonly: true
        })), settings.klass.calendar_container) + _.node('div', _.node('button', settings.today, "btn-flat picker__today", 'type=button data-pick=' + nowObject.pick + (isOpen && !calendar.disabled(nowObject) ? '' : ' disabled') + ' ' + _.ariaAttr({controls: calendar.$node[0].id})) + _.node('button', settings.clear, "btn-flat picker__clear", 'type=button data-clear=1' + (isOpen ? '' : ' disabled') + ' ' + _.ariaAttr({controls: calendar.$node[0].id})) + _.node('button', settings.close, "btn-flat picker__close", 'type=button data-close=true ' + (isOpen ? '' : ' disabled') + ' ' + _.ariaAttr({controls: calendar.$node[0].id})), settings.klass.footer);
      };
      DatePicker.defaults = (function(prefix) {
        return {
          labelMonthNext: 'Next month',
          labelMonthPrev: 'Previous month',
          labelMonthSelect: 'Select a month',
          labelYearSelect: 'Select a year',
          monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          weekdaysLetter: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          today: 'Today',
          clear: 'Clear',
          close: 'Close',
          format: 'd mmmm, yyyy',
          klass: {
            table: prefix + 'table',
            header: prefix + 'header',
            date_display: prefix + 'date-display',
            day_display: prefix + 'day-display',
            month_display: prefix + 'month-display',
            year_display: prefix + 'year-display',
            calendar_container: prefix + 'calendar-container',
            navPrev: prefix + 'nav--prev',
            navNext: prefix + 'nav--next',
            navDisabled: prefix + 'nav--disabled',
            month: prefix + 'month',
            year: prefix + 'year',
            selectMonth: prefix + 'select--month',
            selectYear: prefix + 'select--year',
            weekdays: prefix + 'weekday',
            day: prefix + 'day',
            disabled: prefix + 'day--disabled',
            selected: prefix + 'day--selected',
            highlighted: prefix + 'day--highlighted',
            now: prefix + 'day--today',
            infocus: prefix + 'day--infocus',
            outfocus: prefix + 'day--outfocus',
            footer: prefix + 'footer',
            buttonClear: prefix + 'button--clear',
            buttonToday: prefix + 'button--today',
            buttonClose: prefix + 'button--close'
          }
        };
      })(Picker.klasses().picker + '__');
      Picker.extend('pickadate', DatePicker);
    }));
    ;
    (function($) {
      $.fn.characterCounter = function() {
        return this.each(function() {
          var $input = $(this);
          var $counterElement = $input.parent().find('span[class="character-counter"]');
          if ($counterElement.length) {
            return;
          }
          var itHasLengthAttribute = $input.attr('length') !== undefined;
          if (itHasLengthAttribute) {
            $input.on('input', updateCounter);
            $input.on('focus', updateCounter);
            $input.on('blur', removeCounterElement);
            addCounterElement($input);
          }
        });
      };
      function updateCounter() {
        var maxLength = +$(this).attr('length'),
            actualLength = +$(this).val().length,
            isValidLength = actualLength <= maxLength;
        $(this).parent().find('span[class="character-counter"]').html(actualLength + '/' + maxLength);
        addInputStyle(isValidLength, $(this));
      }
      function addCounterElement($input) {
        var $counterElement = $input.parent().find('span[class="character-counter"]');
        if ($counterElement.length) {
          return;
        }
        $counterElement = $('<span/>').addClass('character-counter').css('float', 'right').css('font-size', '12px').css('height', 1);
        $input.parent().append($counterElement);
      }
      function removeCounterElement() {
        $(this).parent().find('span[class="character-counter"]').html('');
      }
      function addInputStyle(isValidLength, $input) {
        var inputHasInvalidClass = $input.hasClass('invalid');
        if (isValidLength && inputHasInvalidClass) {
          $input.removeClass('invalid');
        } else if (!isValidLength && !inputHasInvalidClass) {
          $input.removeClass('valid');
          $input.addClass('invalid');
        }
      }
      $(document).ready(function() {
        $('input, textarea').characterCounter();
      });
    }(jQuery));
    ;
    (function($) {
      var methods = {
        init: function(options) {
          var defaults = {
            time_constant: 200,
            dist: -100,
            shift: 0,
            padding: 0,
            full_width: false
          };
          options = $.extend(defaults, options);
          return this.each(function() {
            var images,
                offset,
                center,
                pressed,
                dim,
                count,
                reference,
                referenceY,
                amplitude,
                target,
                velocity,
                xform,
                frame,
                timestamp,
                ticker,
                dragged,
                vertical_dragged;
            var view = $(this);
            if (view.hasClass('initialized')) {
              return true;
            }
            if (options.full_width) {
              options.dist = 0;
              imageHeight = view.find('.carousel-item img').first().load(function() {
                view.css('height', $(this).height());
              });
            }
            view.addClass('initialized');
            pressed = false;
            offset = target = 0;
            images = [];
            item_width = view.find('.carousel-item').first().innerWidth();
            dim = item_width * 2 + options.padding;
            view.find('.carousel-item').each(function() {
              images.push($(this)[0]);
            });
            count = images.length;
            function setupEvents() {
              if (typeof window.ontouchstart !== 'undefined') {
                view[0].addEventListener('touchstart', tap);
                view[0].addEventListener('touchmove', drag);
                view[0].addEventListener('touchend', release);
              }
              view[0].addEventListener('mousedown', tap);
              view[0].addEventListener('mousemove', drag);
              view[0].addEventListener('mouseup', release);
              view[0].addEventListener('click', click);
            }
            function xpos(e) {
              if (e.targetTouches && (e.targetTouches.length >= 1)) {
                return e.targetTouches[0].clientX;
              }
              return e.clientX;
            }
            function ypos(e) {
              if (e.targetTouches && (e.targetTouches.length >= 1)) {
                return e.targetTouches[0].clientY;
              }
              return e.clientY;
            }
            function wrap(x) {
              return (x >= count) ? (x % count) : (x < 0) ? wrap(count + (x % count)) : x;
            }
            function scroll(x) {
              var i,
                  half,
                  delta,
                  dir,
                  tween,
                  el,
                  alignment,
                  xTranslation;
              offset = (typeof x === 'number') ? x : offset;
              center = Math.floor((offset + dim / 2) / dim);
              delta = offset - center * dim;
              dir = (delta < 0) ? 1 : -1;
              tween = -dir * delta * 2 / dim;
              if (!options.full_width) {
                alignment = 'translateX(' + (view[0].clientWidth - item_width) / 2 + 'px) ';
                alignment += 'translateY(' + (view[0].clientHeight - item_width) / 2 + 'px)';
              } else {
                alignment = 'translateX(0)';
              }
              el = images[wrap(center)];
              el.style[xform] = alignment + ' translateX(' + (-delta / 2) + 'px)' + ' translateX(' + (dir * options.shift * tween * i) + 'px)' + ' translateZ(' + (options.dist * tween) + 'px)';
              el.style.zIndex = 0;
              if (options.full_width) {
                tweenedOpacity = 1;
              } else {
                tweenedOpacity = 1 - 0.2 * tween;
              }
              el.style.opacity = tweenedOpacity;
              half = count >> 1;
              for (i = 1; i <= half; ++i) {
                if (options.full_width) {
                  zTranslation = options.dist;
                  tweenedOpacity = (i === half && delta < 0) ? 1 - tween : 1;
                } else {
                  zTranslation = options.dist * (i * 2 + tween * dir);
                  tweenedOpacity = 1 - 0.2 * (i * 2 + tween * dir);
                }
                el = images[wrap(center + i)];
                el.style[xform] = alignment + ' translateX(' + (options.shift + (dim * i - delta) / 2) + 'px)' + ' translateZ(' + zTranslation + 'px)';
                el.style.zIndex = -i;
                el.style.opacity = tweenedOpacity;
                if (options.full_width) {
                  zTranslation = options.dist;
                  tweenedOpacity = (i === half && delta > 0) ? 1 - tween : 1;
                } else {
                  zTranslation = options.dist * (i * 2 - tween * dir);
                  tweenedOpacity = 1 - 0.2 * (i * 2 - tween * dir);
                }
                el = images[wrap(center - i)];
                el.style[xform] = alignment + ' translateX(' + (-options.shift + (-dim * i - delta) / 2) + 'px)' + ' translateZ(' + zTranslation + 'px)';
                el.style.zIndex = -i;
                el.style.opacity = tweenedOpacity;
              }
              el = images[wrap(center)];
              el.style[xform] = alignment + ' translateX(' + (-delta / 2) + 'px)' + ' translateX(' + (dir * options.shift * tween) + 'px)' + ' translateZ(' + (options.dist * tween) + 'px)';
              el.style.zIndex = 0;
              if (options.full_width) {
                tweenedOpacity = 1;
              } else {
                tweenedOpacity = 1 - 0.2 * tween;
              }
              el.style.opacity = tweenedOpacity;
            }
            function track() {
              var now,
                  elapsed,
                  delta,
                  v;
              now = Date.now();
              elapsed = now - timestamp;
              timestamp = now;
              delta = offset - frame;
              frame = offset;
              v = 1000 * delta / (1 + elapsed);
              velocity = 0.8 * v + 0.2 * velocity;
            }
            function autoScroll() {
              var elapsed,
                  delta;
              if (amplitude) {
                elapsed = Date.now() - timestamp;
                delta = amplitude * Math.exp(-elapsed / options.time_constant);
                if (delta > 2 || delta < -2) {
                  scroll(target - delta);
                  requestAnimationFrame(autoScroll);
                } else {
                  scroll(target);
                }
              }
            }
            function click(e) {
              if (dragged) {
                e.preventDefault();
                e.stopPropagation();
                return false;
              } else if (!options.full_width) {
                var clickedIndex = $(e.target).closest('.carousel-item').index();
                var diff = (center % count) - clickedIndex;
                if (diff < 0) {
                  if (Math.abs(diff + count) < Math.abs(diff)) {
                    diff += count;
                  }
                } else if (diff > 0) {
                  if (Math.abs(diff - count) < diff) {
                    diff -= count;
                  }
                }
                if (diff < 0) {
                  $(this).trigger('carouselNext', [Math.abs(diff)]);
                } else if (diff > 0) {
                  $(this).trigger('carouselPrev', [diff]);
                }
              }
            }
            function tap(e) {
              pressed = true;
              dragged = false;
              vertical_dragged = false;
              reference = xpos(e);
              referenceY = ypos(e);
              velocity = amplitude = 0;
              frame = offset;
              timestamp = Date.now();
              clearInterval(ticker);
              ticker = setInterval(track, 100);
            }
            function drag(e) {
              var x,
                  delta,
                  deltaY;
              if (pressed) {
                x = xpos(e);
                y = ypos(e);
                delta = reference - x;
                deltaY = Math.abs(referenceY - y);
                if (deltaY < 30 && !vertical_dragged) {
                  if (delta > 2 || delta < -2) {
                    dragged = true;
                    reference = x;
                    scroll(offset + delta);
                  }
                } else if (dragged) {
                  e.preventDefault();
                  e.stopPropagation();
                  return false;
                } else {
                  vertical_dragged = true;
                }
              }
              if (dragged) {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }
            }
            function release(e) {
              pressed = false;
              clearInterval(ticker);
              target = offset;
              if (velocity > 10 || velocity < -10) {
                amplitude = 0.9 * velocity;
                target = offset + amplitude;
              }
              target = Math.round(target / dim) * dim;
              amplitude = target - offset;
              timestamp = Date.now();
              requestAnimationFrame(autoScroll);
              e.preventDefault();
              e.stopPropagation();
              return false;
            }
            xform = 'transform';
            ['webkit', 'Moz', 'O', 'ms'].every(function(prefix) {
              var e = prefix + 'Transform';
              if (typeof document.body.style[e] !== 'undefined') {
                xform = e;
                return false;
              }
              return true;
            });
            window.onresize = scroll;
            setupEvents();
            scroll(offset);
            $(this).on('carouselNext', function(e, n) {
              if (n === undefined) {
                n = 1;
              }
              target = offset + dim * n;
              if (offset !== target) {
                amplitude = target - offset;
                timestamp = Date.now();
                requestAnimationFrame(autoScroll);
              }
            });
            $(this).on('carouselPrev', function(e, n) {
              if (n === undefined) {
                n = 1;
              }
              target = offset - dim * n;
              if (offset !== target) {
                amplitude = target - offset;
                timestamp = Date.now();
                requestAnimationFrame(autoScroll);
              }
            });
          });
        },
        next: function(n) {
          $(this).trigger('carouselNext', [n]);
        },
        prev: function(n) {
          $(this).trigger('carouselPrev', [n]);
        }
      };
      $.fn.carousel = function(methodOrOptions) {
        if (methods[methodOrOptions]) {
          return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
          return methods.init.apply(this, arguments);
        } else {
          $.error('Method ' + methodOrOptions + ' does not exist on jQuery.carousel');
        }
      };
    }(jQuery));
    this["jQuery"] = jQuery;
    this["Vel"] = Vel;
  })();
  return _retrieveGlobal();
});

System.registerDynamic("npm:materialize-css@0.97.6.js", ["npm:materialize-css@0.97.6/dist/js/materialize.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:materialize-css@0.97.6/dist/js/materialize.js');
  return module.exports;
});

System.registerDynamic("client/js/src/core.js", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
  (function() {
    this["init"] = init;
    this["initSliderAtZero"] = initSliderAtZero;
    this["registerSliderListener"] = registerSliderListener;
    this["recursiveCheck"] = recursiveCheck;
    this["isSaneBrowser"] = isSaneBrowser;
    this["handleConversionToString"] = handleConversionToString;
    this["cropNumber"] = cropNumber;
    this["getFirstNumberAsPhraseBetween20and99"] = getFirstNumberAsPhraseBetween20and99;
    this["getSecondNumberAsPhraseBetween20and99"] = getSecondNumberAsPhraseBetween20and99;
    this["getTensPhrase"] = getTensPhrase;
    this["sendPhraseToView"] = sendPhraseToView;
    this["firstNineteen"] = firstNineteen;
    this["between20and99"] = between20and99;
    function init() {
      const rangeSlider = registerSliderListener("#numWords", handleConversionToString);
      initSliderAtZero("#numWords");
      handleConversionToString(0);
    }
    function initSliderAtZero(id) {
      $(id).val(0);
    }
    function registerSliderListener(id, handler) {
      const eventType = isSaneBrowser();
      $(id).on(eventType, function(event) {
        let current = $(id).val();
        current = parseInt(current);
        if (typeof handler !== "function") {
          console.log("computer says no");
          return;
        } else {
          handler(current);
        }
      });
    }
    function recursiveCheck(integer) {
      if (integer <= 19) {
        return firstNineteen(integer);
      } else if (integer >= 20 && integer <= 100) {
        return getTensPhrase(integer);
      } else if (integer >= 101 && integer <= 999) {
        let quantity = recursiveCheck(parseInt(integer / 100));
        if (integer % 100 === 0) {
          return quantity + " Hundred";
        } else {
          const tens = cropNumber(integer, 1);
          let tensAsPhrase = recursiveCheck(tens);
          return quantity + " Hundred and " + tensAsPhrase;
        }
      } else if (integer === 1000) {
        return "One Thousand :)";
      }
    }
    function isSaneBrowser() {
      let userAgent = navigator.userAgent;
      let isIE = userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident') !== -1;
      if (isIE) {
        return "change";
      } else {
        return "input";
      }
    }
    function handleConversionToString(integer) {
      const asString = integer.toString();
      const numberLength = asString.length;
      let FinalPhrase = recursiveCheck(integer);
      sendPhraseToView(FinalPhrase);
    }
    function cropNumber(integer, offset) {
      let asString = integer.toString();
      let secondNum = asString.substr(offset, asString.length);
      return parseInt(secondNum);
    }
    function getFirstNumberAsPhraseBetween20and99(integer) {
      let rootNum = parseInt(integer / 10);
      return between20and99(rootNum);
    }
    function getSecondNumberAsPhraseBetween20and99(integer, offset1, offset2) {
      let asString = integer.toString();
      let secondNum = asString.substr(offset1, offset2);
      return firstNineteen(secondNum);
    }
    function getTensPhrase(integer) {
      let firstNumberPhrase = getFirstNumberAsPhraseBetween20and99(integer);
      if (integer % 10 === 0) {
        return firstNumberPhrase;
      } else {
        let secondNumberPhrase = getSecondNumberAsPhraseBetween20and99(integer, 1, 2);
        let combined = firstNumberPhrase + "-" + secondNumberPhrase;
        return combined;
      }
    }
    function sendPhraseToView(phrase) {
      $(".phrase-output").html(phrase);
    }
    function firstNineteen(integer) {
      const arr = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
      return arr[integer];
    }
    function between20and99(integer) {
      const arr = [null, null, "Twenty", "Thirty", "Fourty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
      return arr[integer];
    }
  })();
  return _retrieveGlobal();
});

System.register("client/js/src/main.js", ["npm:jquery@2.2.4.js", "npm:materialize-css@0.97.6.js", "client/js/src/core.js"], function (_export) {
	"use strict";

	var jquery, material, bensCore;
	return {
		setters: [function (_npmJquery224Js) {
			jquery = _npmJquery224Js["default"];
		}, function (_npmMaterializeCss0976Js) {
			material = _npmMaterializeCss0976Js["default"];
		}, function (_clientJsSrcCoreJs) {
			bensCore = _clientJsSrcCoreJs["default"];
		}],
		execute: function () {

			$(document).ready(function () {

				init();
			});
		}
	};
});
System.register('npm:materialize-css@0.97.6/dist/css/materialize.css!github:systemjs/plugin-css@0.1.21.js', [], false, function() {});
(function(c){if (typeof document == 'undefined') return; var d=document,a='appendChild',i='styleSheet',s=d.createElement('style');s.type='text/css';d.getElementsByTagName('head')[0][a](s);s[i]?s[i].cssText=c:s[a](d.createTextNode(c));})
("/*!\n * Materialize v0.97.6 (http://materializecss.com)\n * Copyright 2014-2015 Materialize\n * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)\n */.materialize-red{background-color:#e51c23!important}.materialize-red-text{color:#e51c23!important}.materialize-red.lighten-5{background-color:#fdeaeb!important}.materialize-red-text.text-lighten-5{color:#fdeaeb!important}.materialize-red.lighten-4{background-color:#f8c1c3!important}.materialize-red-text.text-lighten-4{color:#f8c1c3!important}.materialize-red.lighten-3{background-color:#f3989b!important}.materialize-red-text.text-lighten-3{color:#f3989b!important}.materialize-red.lighten-2{background-color:#ee6e73!important}.materialize-red-text.text-lighten-2{color:#ee6e73!important}.materialize-red.lighten-1{background-color:#ea454b!important}.materialize-red-text.text-lighten-1{color:#ea454b!important}.materialize-red.darken-1{background-color:#d0181e!important}.materialize-red-text.text-darken-1{color:#d0181e!important}.materialize-red.darken-2{background-color:#b9151b!important}.materialize-red-text.text-darken-2{color:#b9151b!important}.materialize-red.darken-3{background-color:#a21318!important}.materialize-red-text.text-darken-3{color:#a21318!important}.materialize-red.darken-4{background-color:#8b1014!important}.materialize-red-text.text-darken-4{color:#8b1014!important}.red{background-color:#F44336!important}.red-text{color:#F44336!important}.red.lighten-5{background-color:#FFEBEE!important}.red-text.text-lighten-5{color:#FFEBEE!important}.red.lighten-4{background-color:#FFCDD2!important}.red-text.text-lighten-4{color:#FFCDD2!important}.red.lighten-3{background-color:#EF9A9A!important}.red-text.text-lighten-3{color:#EF9A9A!important}.red.lighten-2{background-color:#E57373!important}.red-text.text-lighten-2{color:#E57373!important}.red.lighten-1{background-color:#EF5350!important}.red-text.text-lighten-1{color:#EF5350!important}.red.darken-1{background-color:#E53935!important}.red-text.text-darken-1{color:#E53935!important}.red.darken-2{background-color:#D32F2F!important}.red-text.text-darken-2{color:#D32F2F!important}.red.darken-3{background-color:#C62828!important}.red-text.text-darken-3{color:#C62828!important}.red.darken-4{background-color:#B71C1C!important}.red-text.text-darken-4{color:#B71C1C!important}.red.accent-1{background-color:#FF8A80!important}.red-text.text-accent-1{color:#FF8A80!important}.red.accent-2{background-color:#FF5252!important}.red-text.text-accent-2{color:#FF5252!important}.red.accent-3{background-color:#FF1744!important}.red-text.text-accent-3{color:#FF1744!important}.red.accent-4{background-color:#D50000!important}.red-text.text-accent-4{color:#D50000!important}.pink{background-color:#e91e63!important}.pink-text{color:#e91e63!important}.pink.lighten-5{background-color:#fce4ec!important}.pink-text.text-lighten-5{color:#fce4ec!important}.pink.lighten-4{background-color:#f8bbd0!important}.pink-text.text-lighten-4{color:#f8bbd0!important}.pink.lighten-3{background-color:#f48fb1!important}.pink-text.text-lighten-3{color:#f48fb1!important}.pink.lighten-2{background-color:#f06292!important}.pink-text.text-lighten-2{color:#f06292!important}.pink.lighten-1{background-color:#ec407a!important}.pink-text.text-lighten-1{color:#ec407a!important}.pink.darken-1{background-color:#d81b60!important}.pink-text.text-darken-1{color:#d81b60!important}.pink.darken-2{background-color:#c2185b!important}.pink-text.text-darken-2{color:#c2185b!important}.pink.darken-3{background-color:#ad1457!important}.pink-text.text-darken-3{color:#ad1457!important}.pink.darken-4{background-color:#880e4f!important}.pink-text.text-darken-4{color:#880e4f!important}.pink.accent-1{background-color:#ff80ab!important}.pink-text.text-accent-1{color:#ff80ab!important}.pink.accent-2{background-color:#ff4081!important}.pink-text.text-accent-2{color:#ff4081!important}.pink.accent-3{background-color:#f50057!important}.pink-text.text-accent-3{color:#f50057!important}.pink.accent-4{background-color:#c51162!important}.pink-text.text-accent-4{color:#c51162!important}.purple{background-color:#9c27b0!important}.purple-text{color:#9c27b0!important}.purple.lighten-5{background-color:#f3e5f5!important}.purple-text.text-lighten-5{color:#f3e5f5!important}.purple.lighten-4{background-color:#e1bee7!important}.purple-text.text-lighten-4{color:#e1bee7!important}.purple.lighten-3{background-color:#ce93d8!important}.purple-text.text-lighten-3{color:#ce93d8!important}.purple.lighten-2{background-color:#ba68c8!important}.purple-text.text-lighten-2{color:#ba68c8!important}.purple.lighten-1{background-color:#ab47bc!important}.purple-text.text-lighten-1{color:#ab47bc!important}.purple.darken-1{background-color:#8e24aa!important}.purple-text.text-darken-1{color:#8e24aa!important}.purple.darken-2{background-color:#7b1fa2!important}.purple-text.text-darken-2{color:#7b1fa2!important}.purple.darken-3{background-color:#6a1b9a!important}.purple-text.text-darken-3{color:#6a1b9a!important}.purple.darken-4{background-color:#4a148c!important}.purple-text.text-darken-4{color:#4a148c!important}.purple.accent-1{background-color:#ea80fc!important}.purple-text.text-accent-1{color:#ea80fc!important}.purple.accent-2{background-color:#e040fb!important}.purple-text.text-accent-2{color:#e040fb!important}.purple.accent-3{background-color:#d500f9!important}.purple-text.text-accent-3{color:#d500f9!important}.purple.accent-4{background-color:#a0f!important}.purple-text.text-accent-4{color:#a0f!important}.deep-purple{background-color:#673ab7!important}.deep-purple-text{color:#673ab7!important}.deep-purple.lighten-5{background-color:#ede7f6!important}.deep-purple-text.text-lighten-5{color:#ede7f6!important}.deep-purple.lighten-4{background-color:#d1c4e9!important}.deep-purple-text.text-lighten-4{color:#d1c4e9!important}.deep-purple.lighten-3{background-color:#b39ddb!important}.deep-purple-text.text-lighten-3{color:#b39ddb!important}.deep-purple.lighten-2{background-color:#9575cd!important}.deep-purple-text.text-lighten-2{color:#9575cd!important}.deep-purple.lighten-1{background-color:#7e57c2!important}.deep-purple-text.text-lighten-1{color:#7e57c2!important}.deep-purple.darken-1{background-color:#5e35b1!important}.deep-purple-text.text-darken-1{color:#5e35b1!important}.deep-purple.darken-2{background-color:#512da8!important}.deep-purple-text.text-darken-2{color:#512da8!important}.deep-purple.darken-3{background-color:#4527a0!important}.deep-purple-text.text-darken-3{color:#4527a0!important}.deep-purple.darken-4{background-color:#311b92!important}.deep-purple-text.text-darken-4{color:#311b92!important}.deep-purple.accent-1{background-color:#b388ff!important}.deep-purple-text.text-accent-1{color:#b388ff!important}.deep-purple.accent-2{background-color:#7c4dff!important}.deep-purple-text.text-accent-2{color:#7c4dff!important}.deep-purple.accent-3{background-color:#651fff!important}.deep-purple-text.text-accent-3{color:#651fff!important}.deep-purple.accent-4{background-color:#6200ea!important}.deep-purple-text.text-accent-4{color:#6200ea!important}.indigo{background-color:#3f51b5!important}.indigo-text{color:#3f51b5!important}.indigo.lighten-5{background-color:#e8eaf6!important}.indigo-text.text-lighten-5{color:#e8eaf6!important}.indigo.lighten-4{background-color:#c5cae9!important}.indigo-text.text-lighten-4{color:#c5cae9!important}.indigo.lighten-3{background-color:#9fa8da!important}.indigo-text.text-lighten-3{color:#9fa8da!important}.indigo.lighten-2{background-color:#7986cb!important}.indigo-text.text-lighten-2{color:#7986cb!important}.indigo.lighten-1{background-color:#5c6bc0!important}.indigo-text.text-lighten-1{color:#5c6bc0!important}.indigo.darken-1{background-color:#3949ab!important}.indigo-text.text-darken-1{color:#3949ab!important}.indigo.darken-2{background-color:#303f9f!important}.indigo-text.text-darken-2{color:#303f9f!important}.indigo.darken-3{background-color:#283593!important}.indigo-text.text-darken-3{color:#283593!important}.indigo.darken-4{background-color:#1a237e!important}.indigo-text.text-darken-4{color:#1a237e!important}.indigo.accent-1{background-color:#8c9eff!important}.indigo-text.text-accent-1{color:#8c9eff!important}.indigo.accent-2{background-color:#536dfe!important}.indigo-text.text-accent-2{color:#536dfe!important}.indigo.accent-3{background-color:#3d5afe!important}.indigo-text.text-accent-3{color:#3d5afe!important}.indigo.accent-4{background-color:#304ffe!important}.indigo-text.text-accent-4{color:#304ffe!important}.blue{background-color:#2196F3!important}.blue-text{color:#2196F3!important}.blue.lighten-5{background-color:#E3F2FD!important}.blue-text.text-lighten-5{color:#E3F2FD!important}.blue.lighten-4{background-color:#BBDEFB!important}.blue-text.text-lighten-4{color:#BBDEFB!important}.blue.lighten-3{background-color:#90CAF9!important}.blue-text.text-lighten-3{color:#90CAF9!important}.blue.lighten-2{background-color:#64B5F6!important}.blue-text.text-lighten-2{color:#64B5F6!important}.blue.lighten-1{background-color:#42A5F5!important}.blue-text.text-lighten-1{color:#42A5F5!important}.blue.darken-1{background-color:#1E88E5!important}.blue-text.text-darken-1{color:#1E88E5!important}.blue.darken-2{background-color:#1976D2!important}.blue-text.text-darken-2{color:#1976D2!important}.blue.darken-3{background-color:#1565C0!important}.blue-text.text-darken-3{color:#1565C0!important}.blue.darken-4{background-color:#0D47A1!important}.blue-text.text-darken-4{color:#0D47A1!important}.blue.accent-1{background-color:#82B1FF!important}.blue-text.text-accent-1{color:#82B1FF!important}.blue.accent-2{background-color:#448AFF!important}.blue-text.text-accent-2{color:#448AFF!important}.blue.accent-3{background-color:#2979FF!important}.blue-text.text-accent-3{color:#2979FF!important}.blue.accent-4{background-color:#2962FF!important}.blue-text.text-accent-4{color:#2962FF!important}.light-blue{background-color:#03a9f4!important}.light-blue-text{color:#03a9f4!important}.light-blue.lighten-5{background-color:#e1f5fe!important}.light-blue-text.text-lighten-5{color:#e1f5fe!important}.light-blue.lighten-4{background-color:#b3e5fc!important}.light-blue-text.text-lighten-4{color:#b3e5fc!important}.light-blue.lighten-3{background-color:#81d4fa!important}.light-blue-text.text-lighten-3{color:#81d4fa!important}.light-blue.lighten-2{background-color:#4fc3f7!important}.light-blue-text.text-lighten-2{color:#4fc3f7!important}.light-blue.lighten-1{background-color:#29b6f6!important}.light-blue-text.text-lighten-1{color:#29b6f6!important}.light-blue.darken-1{background-color:#039be5!important}.light-blue-text.text-darken-1{color:#039be5!important}.light-blue.darken-2{background-color:#0288d1!important}.light-blue-text.text-darken-2{color:#0288d1!important}.light-blue.darken-3{background-color:#0277bd!important}.light-blue-text.text-darken-3{color:#0277bd!important}.light-blue.darken-4{background-color:#01579b!important}.light-blue-text.text-darken-4{color:#01579b!important}.light-blue.accent-1{background-color:#80d8ff!important}.light-blue-text.text-accent-1{color:#80d8ff!important}.light-blue.accent-2{background-color:#40c4ff!important}.light-blue-text.text-accent-2{color:#40c4ff!important}.light-blue.accent-3{background-color:#00b0ff!important}.light-blue-text.text-accent-3{color:#00b0ff!important}.light-blue.accent-4{background-color:#0091ea!important}.light-blue-text.text-accent-4{color:#0091ea!important}.cyan{background-color:#00bcd4!important}.cyan-text{color:#00bcd4!important}.cyan.lighten-5{background-color:#e0f7fa!important}.cyan-text.text-lighten-5{color:#e0f7fa!important}.cyan.lighten-4{background-color:#b2ebf2!important}.cyan-text.text-lighten-4{color:#b2ebf2!important}.cyan.lighten-3{background-color:#80deea!important}.cyan-text.text-lighten-3{color:#80deea!important}.cyan.lighten-2{background-color:#4dd0e1!important}.cyan-text.text-lighten-2{color:#4dd0e1!important}.cyan.lighten-1{background-color:#26c6da!important}.cyan-text.text-lighten-1{color:#26c6da!important}.cyan.darken-1{background-color:#00acc1!important}.cyan-text.text-darken-1{color:#00acc1!important}.cyan.darken-2{background-color:#0097a7!important}.cyan-text.text-darken-2{color:#0097a7!important}.cyan.darken-3{background-color:#00838f!important}.cyan-text.text-darken-3{color:#00838f!important}.cyan.darken-4{background-color:#006064!important}.cyan-text.text-darken-4{color:#006064!important}.cyan.accent-1{background-color:#84ffff!important}.cyan-text.text-accent-1{color:#84ffff!important}.cyan.accent-2{background-color:#18ffff!important}.cyan-text.text-accent-2{color:#18ffff!important}.cyan.accent-3{background-color:#00e5ff!important}.cyan-text.text-accent-3{color:#00e5ff!important}.cyan.accent-4{background-color:#00b8d4!important}.cyan-text.text-accent-4{color:#00b8d4!important}.teal{background-color:#009688!important}.teal-text{color:#009688!important}.teal.lighten-5{background-color:#e0f2f1!important}.teal-text.text-lighten-5{color:#e0f2f1!important}.teal.lighten-4{background-color:#b2dfdb!important}.teal-text.text-lighten-4{color:#b2dfdb!important}.teal.lighten-3{background-color:#80cbc4!important}.teal-text.text-lighten-3{color:#80cbc4!important}.teal.lighten-2{background-color:#4db6ac!important}.teal-text.text-lighten-2{color:#4db6ac!important}.teal.lighten-1{background-color:#26a69a!important}.teal-text.text-lighten-1{color:#26a69a!important}.teal.darken-1{background-color:#00897b!important}.teal-text.text-darken-1{color:#00897b!important}.teal.darken-2{background-color:#00796b!important}.teal-text.text-darken-2{color:#00796b!important}.teal.darken-3{background-color:#00695c!important}.teal-text.text-darken-3{color:#00695c!important}.teal.darken-4{background-color:#004d40!important}.teal-text.text-darken-4{color:#004d40!important}.teal.accent-1{background-color:#a7ffeb!important}.teal-text.text-accent-1{color:#a7ffeb!important}.teal.accent-2{background-color:#64ffda!important}.teal-text.text-accent-2{color:#64ffda!important}.teal.accent-3{background-color:#1de9b6!important}.teal-text.text-accent-3{color:#1de9b6!important}.teal.accent-4{background-color:#00bfa5!important}.teal-text.text-accent-4{color:#00bfa5!important}.green{background-color:#4CAF50!important}.green-text{color:#4CAF50!important}.green.lighten-5{background-color:#E8F5E9!important}.green-text.text-lighten-5{color:#E8F5E9!important}.green.lighten-4{background-color:#C8E6C9!important}.green-text.text-lighten-4{color:#C8E6C9!important}.green.lighten-3{background-color:#A5D6A7!important}.green-text.text-lighten-3{color:#A5D6A7!important}.green.lighten-2{background-color:#81C784!important}.green-text.text-lighten-2{color:#81C784!important}.green.lighten-1{background-color:#66BB6A!important}.green-text.text-lighten-1{color:#66BB6A!important}.green.darken-1{background-color:#43A047!important}.green-text.text-darken-1{color:#43A047!important}.green.darken-2{background-color:#388E3C!important}.green-text.text-darken-2{color:#388E3C!important}.green.darken-3{background-color:#2E7D32!important}.green-text.text-darken-3{color:#2E7D32!important}.green.darken-4{background-color:#1B5E20!important}.green-text.text-darken-4{color:#1B5E20!important}.green.accent-1{background-color:#B9F6CA!important}.green-text.text-accent-1{color:#B9F6CA!important}.green.accent-2{background-color:#69F0AE!important}.green-text.text-accent-2{color:#69F0AE!important}.green.accent-3{background-color:#00E676!important}.green-text.text-accent-3{color:#00E676!important}.green.accent-4{background-color:#00C853!important}.green-text.text-accent-4{color:#00C853!important}.light-green{background-color:#8bc34a!important}.light-green-text{color:#8bc34a!important}.light-green.lighten-5{background-color:#f1f8e9!important}.light-green-text.text-lighten-5{color:#f1f8e9!important}.light-green.lighten-4{background-color:#dcedc8!important}.light-green-text.text-lighten-4{color:#dcedc8!important}.light-green.lighten-3{background-color:#c5e1a5!important}.light-green-text.text-lighten-3{color:#c5e1a5!important}.light-green.lighten-2{background-color:#aed581!important}.light-green-text.text-lighten-2{color:#aed581!important}.light-green.lighten-1{background-color:#9ccc65!important}.light-green-text.text-lighten-1{color:#9ccc65!important}.light-green.darken-1{background-color:#7cb342!important}.light-green-text.text-darken-1{color:#7cb342!important}.light-green.darken-2{background-color:#689f38!important}.light-green-text.text-darken-2{color:#689f38!important}.light-green.darken-3{background-color:#558b2f!important}.light-green-text.text-darken-3{color:#558b2f!important}.light-green.darken-4{background-color:#33691e!important}.light-green-text.text-darken-4{color:#33691e!important}.light-green.accent-1{background-color:#ccff90!important}.light-green-text.text-accent-1{color:#ccff90!important}.light-green.accent-2{background-color:#b2ff59!important}.light-green-text.text-accent-2{color:#b2ff59!important}.light-green.accent-3{background-color:#76ff03!important}.light-green-text.text-accent-3{color:#76ff03!important}.light-green.accent-4{background-color:#64dd17!important}.light-green-text.text-accent-4{color:#64dd17!important}.lime{background-color:#cddc39!important}.lime-text{color:#cddc39!important}.lime.lighten-5{background-color:#f9fbe7!important}.lime-text.text-lighten-5{color:#f9fbe7!important}.lime.lighten-4{background-color:#f0f4c3!important}.lime-text.text-lighten-4{color:#f0f4c3!important}.lime.lighten-3{background-color:#e6ee9c!important}.lime-text.text-lighten-3{color:#e6ee9c!important}.lime.lighten-2{background-color:#dce775!important}.lime-text.text-lighten-2{color:#dce775!important}.lime.lighten-1{background-color:#d4e157!important}.lime-text.text-lighten-1{color:#d4e157!important}.lime.darken-1{background-color:#c0ca33!important}.lime-text.text-darken-1{color:#c0ca33!important}.lime.darken-2{background-color:#afb42b!important}.lime-text.text-darken-2{color:#afb42b!important}.lime.darken-3{background-color:#9e9d24!important}.lime-text.text-darken-3{color:#9e9d24!important}.lime.darken-4{background-color:#827717!important}.lime-text.text-darken-4{color:#827717!important}.lime.accent-1{background-color:#f4ff81!important}.lime-text.text-accent-1{color:#f4ff81!important}.lime.accent-2{background-color:#eeff41!important}.lime-text.text-accent-2{color:#eeff41!important}.lime.accent-3{background-color:#c6ff00!important}.lime-text.text-accent-3{color:#c6ff00!important}.lime.accent-4{background-color:#aeea00!important}.lime-text.text-accent-4{color:#aeea00!important}.yellow{background-color:#ffeb3b!important}.yellow-text{color:#ffeb3b!important}.yellow.lighten-5{background-color:#fffde7!important}.yellow-text.text-lighten-5{color:#fffde7!important}.yellow.lighten-4{background-color:#fff9c4!important}.yellow-text.text-lighten-4{color:#fff9c4!important}.yellow.lighten-3{background-color:#fff59d!important}.yellow-text.text-lighten-3{color:#fff59d!important}.yellow.lighten-2{background-color:#fff176!important}.yellow-text.text-lighten-2{color:#fff176!important}.yellow.lighten-1{background-color:#ffee58!important}.yellow-text.text-lighten-1{color:#ffee58!important}.yellow.darken-1{background-color:#fdd835!important}.yellow-text.text-darken-1{color:#fdd835!important}.yellow.darken-2{background-color:#fbc02d!important}.yellow-text.text-darken-2{color:#fbc02d!important}.yellow.darken-3{background-color:#f9a825!important}.yellow-text.text-darken-3{color:#f9a825!important}.yellow.darken-4{background-color:#f57f17!important}.yellow-text.text-darken-4{color:#f57f17!important}.yellow.accent-1{background-color:#ffff8d!important}.yellow-text.text-accent-1{color:#ffff8d!important}.yellow.accent-2{background-color:#ff0!important}.yellow-text.text-accent-2{color:#ff0!important}.yellow.accent-3{background-color:#ffea00!important}.yellow-text.text-accent-3{color:#ffea00!important}.yellow.accent-4{background-color:#ffd600!important}.yellow-text.text-accent-4{color:#ffd600!important}.amber{background-color:#ffc107!important}.amber-text{color:#ffc107!important}.amber.lighten-5{background-color:#fff8e1!important}.amber-text.text-lighten-5{color:#fff8e1!important}.amber.lighten-4{background-color:#ffecb3!important}.amber-text.text-lighten-4{color:#ffecb3!important}.amber.lighten-3{background-color:#ffe082!important}.amber-text.text-lighten-3{color:#ffe082!important}.amber.lighten-2{background-color:#ffd54f!important}.amber-text.text-lighten-2{color:#ffd54f!important}.amber.lighten-1{background-color:#ffca28!important}.amber-text.text-lighten-1{color:#ffca28!important}.amber.darken-1{background-color:#ffb300!important}.amber-text.text-darken-1{color:#ffb300!important}.amber.darken-2{background-color:#ffa000!important}.amber-text.text-darken-2{color:#ffa000!important}.amber.darken-3{background-color:#ff8f00!important}.amber-text.text-darken-3{color:#ff8f00!important}.amber.darken-4{background-color:#ff6f00!important}.amber-text.text-darken-4{color:#ff6f00!important}.amber.accent-1{background-color:#ffe57f!important}.amber-text.text-accent-1{color:#ffe57f!important}.amber.accent-2{background-color:#ffd740!important}.amber-text.text-accent-2{color:#ffd740!important}.amber.accent-3{background-color:#ffc400!important}.amber-text.text-accent-3{color:#ffc400!important}.amber.accent-4{background-color:#ffab00!important}.amber-text.text-accent-4{color:#ffab00!important}.orange{background-color:#ff9800!important}.orange-text{color:#ff9800!important}.orange.lighten-5{background-color:#fff3e0!important}.orange-text.text-lighten-5{color:#fff3e0!important}.orange.lighten-4{background-color:#ffe0b2!important}.orange-text.text-lighten-4{color:#ffe0b2!important}.orange.lighten-3{background-color:#ffcc80!important}.orange-text.text-lighten-3{color:#ffcc80!important}.orange.lighten-2{background-color:#ffb74d!important}.orange-text.text-lighten-2{color:#ffb74d!important}.orange.lighten-1{background-color:#ffa726!important}.orange-text.text-lighten-1{color:#ffa726!important}.orange.darken-1{background-color:#fb8c00!important}.orange-text.text-darken-1{color:#fb8c00!important}.orange.darken-2{background-color:#f57c00!important}.orange-text.text-darken-2{color:#f57c00!important}.orange.darken-3{background-color:#ef6c00!important}.orange-text.text-darken-3{color:#ef6c00!important}.orange.darken-4{background-color:#e65100!important}.orange-text.text-darken-4{color:#e65100!important}.orange.accent-1{background-color:#ffd180!important}.orange-text.text-accent-1{color:#ffd180!important}.orange.accent-2{background-color:#ffab40!important}.orange-text.text-accent-2{color:#ffab40!important}.orange.accent-3{background-color:#ff9100!important}.orange-text.text-accent-3{color:#ff9100!important}.orange.accent-4{background-color:#ff6d00!important}.orange-text.text-accent-4{color:#ff6d00!important}.deep-orange{background-color:#ff5722!important}.deep-orange-text{color:#ff5722!important}.deep-orange.lighten-5{background-color:#fbe9e7!important}.deep-orange-text.text-lighten-5{color:#fbe9e7!important}.deep-orange.lighten-4{background-color:#ffccbc!important}.deep-orange-text.text-lighten-4{color:#ffccbc!important}.deep-orange.lighten-3{background-color:#ffab91!important}.deep-orange-text.text-lighten-3{color:#ffab91!important}.deep-orange.lighten-2{background-color:#ff8a65!important}.deep-orange-text.text-lighten-2{color:#ff8a65!important}.deep-orange.lighten-1{background-color:#ff7043!important}.deep-orange-text.text-lighten-1{color:#ff7043!important}.deep-orange.darken-1{background-color:#f4511e!important}.deep-orange-text.text-darken-1{color:#f4511e!important}.deep-orange.darken-2{background-color:#e64a19!important}.deep-orange-text.text-darken-2{color:#e64a19!important}.deep-orange.darken-3{background-color:#d84315!important}.deep-orange-text.text-darken-3{color:#d84315!important}.deep-orange.darken-4{background-color:#bf360c!important}.deep-orange-text.text-darken-4{color:#bf360c!important}.deep-orange.accent-1{background-color:#ff9e80!important}.deep-orange-text.text-accent-1{color:#ff9e80!important}.deep-orange.accent-2{background-color:#ff6e40!important}.deep-orange-text.text-accent-2{color:#ff6e40!important}.deep-orange.accent-3{background-color:#ff3d00!important}.deep-orange-text.text-accent-3{color:#ff3d00!important}.deep-orange.accent-4{background-color:#dd2c00!important}.deep-orange-text.text-accent-4{color:#dd2c00!important}.brown{background-color:#795548!important}.brown-text{color:#795548!important}.brown.lighten-5{background-color:#efebe9!important}.brown-text.text-lighten-5{color:#efebe9!important}.brown.lighten-4{background-color:#d7ccc8!important}.brown-text.text-lighten-4{color:#d7ccc8!important}.brown.lighten-3{background-color:#bcaaa4!important}.brown-text.text-lighten-3{color:#bcaaa4!important}.brown.lighten-2{background-color:#a1887f!important}.brown-text.text-lighten-2{color:#a1887f!important}.brown.lighten-1{background-color:#8d6e63!important}.brown-text.text-lighten-1{color:#8d6e63!important}.brown.darken-1{background-color:#6d4c41!important}.brown-text.text-darken-1{color:#6d4c41!important}.brown.darken-2{background-color:#5d4037!important}.brown-text.text-darken-2{color:#5d4037!important}.brown.darken-3{background-color:#4e342e!important}.brown-text.text-darken-3{color:#4e342e!important}.brown.darken-4{background-color:#3e2723!important}.brown-text.text-darken-4{color:#3e2723!important}.blue-grey{background-color:#607d8b!important}.blue-grey-text{color:#607d8b!important}.blue-grey.lighten-5{background-color:#eceff1!important}.blue-grey-text.text-lighten-5{color:#eceff1!important}.blue-grey.lighten-4{background-color:#cfd8dc!important}.blue-grey-text.text-lighten-4{color:#cfd8dc!important}.blue-grey.lighten-3{background-color:#b0bec5!important}.blue-grey-text.text-lighten-3{color:#b0bec5!important}.blue-grey.lighten-2{background-color:#90a4ae!important}.blue-grey-text.text-lighten-2{color:#90a4ae!important}.blue-grey.lighten-1{background-color:#78909c!important}.blue-grey-text.text-lighten-1{color:#78909c!important}.blue-grey.darken-1{background-color:#546e7a!important}.blue-grey-text.text-darken-1{color:#546e7a!important}.blue-grey.darken-2{background-color:#455a64!important}.blue-grey-text.text-darken-2{color:#455a64!important}.blue-grey.darken-3{background-color:#37474f!important}.blue-grey-text.text-darken-3{color:#37474f!important}.blue-grey.darken-4{background-color:#263238!important}.blue-grey-text.text-darken-4{color:#263238!important}.grey{background-color:#9e9e9e!important}.grey-text{color:#9e9e9e!important}.grey.lighten-5{background-color:#fafafa!important}.grey-text.text-lighten-5{color:#fafafa!important}.grey.lighten-4{background-color:#f5f5f5!important}.grey-text.text-lighten-4{color:#f5f5f5!important}.grey.lighten-3{background-color:#eee!important}.grey-text.text-lighten-3{color:#eee!important}.grey.lighten-2{background-color:#e0e0e0!important}.grey-text.text-lighten-2{color:#e0e0e0!important}.grey.lighten-1{background-color:#bdbdbd!important}.grey-text.text-lighten-1{color:#bdbdbd!important}.grey.darken-1{background-color:#757575!important}.grey-text.text-darken-1{color:#757575!important}.grey.darken-2{background-color:#616161!important}.grey-text.text-darken-2{color:#616161!important}.grey.darken-3{background-color:#424242!important}.grey-text.text-darken-3{color:#424242!important}.grey.darken-4{background-color:#212121!important}.grey-text.text-darken-4{color:#212121!important}.shades.black{background-color:#000!important}.shades-text.text-black{color:#000!important}.shades.white{background-color:#FFF!important}.shades-text.text-white{color:#FFF!important}.shades.transparent{background-color:transparent!important}.shades-text.text-transparent{color:transparent!important}.black{background-color:#000!important}.black-text{color:#000!important}.white{background-color:#FFF!important}.white-text{color:#FFF!important}.transparent{background-color:transparent!important}.transparent-text{color:transparent!important}/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:700}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;box-sizing:content-box}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:700}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}html{box-sizing:border-box}*,:after,:before{box-sizing:inherit}ul{list-style-type:none}ul.browser-default{list-style-type:initial}a{color:#039be5;text-decoration:none;-webkit-tap-highlight-color:transparent}.valign-wrapper{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.valign-wrapper .valign{display:block}ul{padding:0}ul li{list-style-type:none}.clearfix{clear:both}.z-depth-0{box-shadow:none!important}.btn,.btn-floating,.btn-large,.card,.card-panel,.collapsible,.dropdown-content,.side-nav,.toast,.z-depth-1,nav{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}.btn-floating:hover,.btn-large:hover,.btn:hover,.z-depth-1-half{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)}.z-depth-2{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)}.z-depth-3{box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19)}.modal,.z-depth-4{box-shadow:0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)}.z-depth-5{box-shadow:0 27px 24px 0 rgba(0,0,0,.2),0 40px 77px 0 rgba(0,0,0,.22)}.hoverable{transition:box-shadow .25s;box-shadow:0}.hoverable:hover{transition:box-shadow .25s;box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)}.divider{height:1px;overflow:hidden;background-color:#e0e0e0}blockquote{margin:20px 0;padding-left:1.5rem;border-left:5px solid #ee6e73}i{line-height:inherit}i.left{float:left;margin-right:15px}i.right{float:right;margin-left:15px}i.tiny{font-size:1rem}i.small{font-size:2rem}i.medium{font-size:4rem}i.large{font-size:6rem}img.responsive-img,video.responsive-video{max-width:100%;height:auto}.pagination li{display:inline-block;font-size:1.2rem;padding:0 10px;line-height:30px;border-radius:2px;text-align:center}.pagination li a{color:#444}.pagination li.active a{color:#fff}.pagination li.active{background-color:#ee6e73}.pagination li.disabled a{cursor:default;color:#999}.pagination li i{font-size:2.2rem;vertical-align:middle}.pagination li.pages ul li{display:inline-block;float:none}@media only screen and (max-width:992px){.pagination{width:100%}.pagination li.next,.pagination li.prev{width:10%}.pagination li.pages{width:80%;overflow:hidden;white-space:nowrap}}.breadcrumb{font-size:18px;color:rgba(255,255,255,.7)}.breadcrumb [class*=mdi-],.breadcrumb [class^=mdi-],.breadcrumb i,.breadcrumb i.material-icons{display:inline-block;float:left;font-size:24px}.breadcrumb:before{content:'\\E5CC';color:rgba(255,255,255,.7);vertical-align:top;display:inline-block;font-family:'Material Icons';font-weight:400;font-style:normal;font-size:25px;margin:0 10px 0 8px;-webkit-font-smoothing:antialiased}.breadcrumb:first-child:before{display:none}.breadcrumb:last-child{color:#fff}.parallax-container{position:relative;overflow:hidden;height:500px}.parallax{position:absolute;top:0;left:0;right:0;bottom:0;z-index:-1}.parallax img{display:none;position:absolute;left:50%;bottom:0;min-width:100%;min-height:100%;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transform:translateX(-50%);transform:translateX(-50%)}.pin-bottom,.pin-top{position:relative}.pinned{position:fixed!important}ul.staggered-list li{opacity:0}.fade-in{opacity:0;-webkit-transform-origin:0 50%;transform-origin:0 50%}@media only screen and (max-width:600px){.hide-on-small-and-down,.hide-on-small-only{display:none!important}}@media only screen and (max-width:992px){.hide-on-med-and-down{display:none!important}}@media only screen and (min-width:601px){.hide-on-med-and-up{display:none!important}}@media only screen and (min-width:600px) and (max-width:992px){.hide-on-med-only{display:none!important}}@media only screen and (min-width:993px){.hide-on-large-only{display:none!important}}@media only screen and (min-width:993px){.show-on-large{display:block!important}}@media only screen and (min-width:600px) and (max-width:992px){.show-on-medium{display:block!important}}@media only screen and (max-width:600px){.show-on-small{display:block!important}}@media only screen and (min-width:601px){.show-on-medium-and-up{display:block!important}}@media only screen and (max-width:992px){.show-on-medium-and-down{display:block!important}}@media only screen and (max-width:600px){.center-on-small-only{text-align:center}}footer.page-footer{margin-top:20px;padding-top:20px;background-color:#ee6e73}footer.page-footer .footer-copyright{overflow:hidden;height:50px;line-height:50px;color:rgba(255,255,255,.8);background-color:rgba(51,51,51,.08)}table,td,th{border:none}table{width:100%;display:table}table.bordered>tbody>tr,table.bordered>thead>tr{border-bottom:1px solid #d0d0d0}table.striped>tbody>tr:nth-child(odd){background-color:#f2f2f2}table.striped>tbody>tr>td{border-radius:0}table.highlight>tbody>tr{transition:background-color .25s ease}table.highlight>tbody>tr:hover{background-color:#f2f2f2}table.centered tbody tr td,table.centered thead tr th{text-align:center}thead{border-bottom:1px solid #d0d0d0}td,th{padding:15px 5px;display:table-cell;text-align:left;vertical-align:middle;border-radius:2px}@media only screen and (max-width:992px){table.responsive-table{width:100%;border-collapse:collapse;border-spacing:0;display:block;position:relative}table.responsive-table td:empty:before{content:'\\00a0'}table.responsive-table td,table.responsive-table th{margin:0;vertical-align:top}table.responsive-table th{text-align:left}table.responsive-table thead{display:block;float:left}table.responsive-table thead tr{display:block;padding:0 10px 0 0}table.responsive-table thead tr th::before{content:\"\\00a0\"}table.responsive-table tbody{display:block;width:auto;position:relative;overflow-x:auto;white-space:nowrap}table.responsive-table tbody tr{display:inline-block;vertical-align:top}table.responsive-table th{display:block;text-align:right}table.responsive-table td{display:block;min-height:1.25em;text-align:left}table.responsive-table tr{padding:0 10px}table.responsive-table thead{border:0;border-right:1px solid #d0d0d0}table.responsive-table.bordered th{border-bottom:0;border-left:0}table.responsive-table.bordered td{border-left:0;border-right:0;border-bottom:0}table.responsive-table.bordered tr{border:0}table.responsive-table.bordered tbody tr{border-right:1px solid #d0d0d0}}.collection{margin:.5rem 0 1rem 0;border:1px solid #e0e0e0;border-radius:2px;overflow:hidden;position:relative}.collection .collection-item{background-color:#fff;line-height:1.5rem;padding:10px 20px;margin:0;border-bottom:1px solid #e0e0e0}.collection .collection-item.avatar{min-height:84px;padding-left:72px;position:relative}.collection .collection-item.avatar .circle{position:absolute;width:42px;height:42px;overflow:hidden;left:15px;display:inline-block;vertical-align:middle}.collection .collection-item.avatar i.circle{font-size:18px;line-height:42px;color:#fff;background-color:#999;text-align:center}.collection .collection-item.avatar .title{font-size:16px}.collection .collection-item.avatar p{margin:0}.collection .collection-item.avatar .secondary-content{position:absolute;top:16px;right:16px}.collection .collection-item:last-child{border-bottom:none}.collection .collection-item.active{background-color:#26a69a;color:#eafaf9}.collection .collection-item.active .secondary-content{color:#fff}.collection a.collection-item{display:block;transition:.25s;color:#26a69a}.collection a.collection-item:not(.active):hover{background-color:#ddd}.collection.with-header .collection-header{background-color:#fff;border-bottom:1px solid #e0e0e0;padding:10px 20px}.collection.with-header .collection-item{padding-left:30px}.collection.with-header .collection-item.avatar{padding-left:72px}.secondary-content{float:right;color:#26a69a}.collapsible .collection{margin:0;border:none}span.badge{min-width:3rem;padding:0 6px;text-align:center;font-size:1rem;line-height:inherit;color:#757575;position:absolute;right:15px;box-sizing:border-box}span.badge.new{font-weight:300;font-size:.8rem;color:#fff;background-color:#26a69a;border-radius:2px}span.badge.new:after{content:\" new\"}nav ul a span.badge{position:static;margin-left:4px;line-height:0}.video-container{position:relative;padding-bottom:56.25%;height:0;overflow:hidden}.video-container embed,.video-container iframe,.video-container object{position:absolute;top:0;left:0;width:100%;height:100%}.progress{position:relative;height:4px;display:block;width:100%;background-color:#acece6;border-radius:2px;margin:.5rem 0 1rem 0;overflow:hidden}.progress .determinate{position:absolute;top:0;left:0;bottom:0;background-color:#26a69a;transition:width .3s linear}.progress .indeterminate{background-color:#26a69a}.progress .indeterminate:before{content:'';position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;-webkit-animation:indeterminate 2.1s cubic-bezier(.65,.815,.735,.395) infinite;animation:indeterminate 2.1s cubic-bezier(.65,.815,.735,.395) infinite}.progress .indeterminate:after{content:'';position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;-webkit-animation:indeterminate-short 2.1s cubic-bezier(.165,.84,.44,1) infinite;animation:indeterminate-short 2.1s cubic-bezier(.165,.84,.44,1) infinite;-webkit-animation-delay:1.15s;animation-delay:1.15s}@-webkit-keyframes indeterminate{0%{left:-35%;right:100%}60%{left:100%;right:-90%}100%{left:100%;right:-90%}}@keyframes indeterminate{0%{left:-35%;right:100%}60%{left:100%;right:-90%}100%{left:100%;right:-90%}}@-webkit-keyframes indeterminate-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}100%{left:107%;right:-8%}}@keyframes indeterminate-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}100%{left:107%;right:-8%}}.hide{display:none!important}.left-align{text-align:left}.right-align{text-align:right}.center,.center-align{text-align:center}.left{float:left!important}.right{float:right!important}.no-select,input[type=range],input[type=range]+.thumb{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.circle{border-radius:50%}.center-block{display:block;margin-left:auto;margin-right:auto}.truncate{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.no-padding{padding:0!important}.material-icons{text-rendering:optimizeLegibility;-webkit-font-feature-settings:'liga';-moz-font-feature-settings:'liga';font-feature-settings:'liga'}.container{margin:0 auto;max-width:1280px;width:90%}@media only screen and (min-width:601px){.container{width:85%}}@media only screen and (min-width:993px){.container{width:70%}}.container .row{margin-left:-.75rem;margin-right:-.75rem}.section{padding-top:1rem;padding-bottom:1rem}.section.no-pad{padding:0}.section.no-pad-bot{padding-bottom:0}.section.no-pad-top{padding-top:0}.row{margin-left:auto;margin-right:auto;margin-bottom:20px}.row:after{content:\"\";display:table;clear:both}.row .col{float:left;box-sizing:border-box;padding:0 .75rem}.row .col[class*=push-],.row .col[class*=pull-]{position:relative}.row .col.s1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.s4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.s7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.s10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-s1{margin-left:8.3333333333%}.row .col.pull-s1{right:8.3333333333%}.row .col.push-s1{left:8.3333333333%}.row .col.offset-s2{margin-left:16.6666666667%}.row .col.pull-s2{right:16.6666666667%}.row .col.push-s2{left:16.6666666667%}.row .col.offset-s3{margin-left:25%}.row .col.pull-s3{right:25%}.row .col.push-s3{left:25%}.row .col.offset-s4{margin-left:33.3333333333%}.row .col.pull-s4{right:33.3333333333%}.row .col.push-s4{left:33.3333333333%}.row .col.offset-s5{margin-left:41.6666666667%}.row .col.pull-s5{right:41.6666666667%}.row .col.push-s5{left:41.6666666667%}.row .col.offset-s6{margin-left:50%}.row .col.pull-s6{right:50%}.row .col.push-s6{left:50%}.row .col.offset-s7{margin-left:58.3333333333%}.row .col.pull-s7{right:58.3333333333%}.row .col.push-s7{left:58.3333333333%}.row .col.offset-s8{margin-left:66.6666666667%}.row .col.pull-s8{right:66.6666666667%}.row .col.push-s8{left:66.6666666667%}.row .col.offset-s9{margin-left:75%}.row .col.pull-s9{right:75%}.row .col.push-s9{left:75%}.row .col.offset-s10{margin-left:83.3333333333%}.row .col.pull-s10{right:83.3333333333%}.row .col.push-s10{left:83.3333333333%}.row .col.offset-s11{margin-left:91.6666666667%}.row .col.pull-s11{right:91.6666666667%}.row .col.push-s11{left:91.6666666667%}.row .col.offset-s12{margin-left:100%}.row .col.pull-s12{right:100%}.row .col.push-s12{left:100%}@media only screen and (min-width:601px){.row .col.m1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.m4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.m7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.m10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-m1{margin-left:8.3333333333%}.row .col.pull-m1{right:8.3333333333%}.row .col.push-m1{left:8.3333333333%}.row .col.offset-m2{margin-left:16.6666666667%}.row .col.pull-m2{right:16.6666666667%}.row .col.push-m2{left:16.6666666667%}.row .col.offset-m3{margin-left:25%}.row .col.pull-m3{right:25%}.row .col.push-m3{left:25%}.row .col.offset-m4{margin-left:33.3333333333%}.row .col.pull-m4{right:33.3333333333%}.row .col.push-m4{left:33.3333333333%}.row .col.offset-m5{margin-left:41.6666666667%}.row .col.pull-m5{right:41.6666666667%}.row .col.push-m5{left:41.6666666667%}.row .col.offset-m6{margin-left:50%}.row .col.pull-m6{right:50%}.row .col.push-m6{left:50%}.row .col.offset-m7{margin-left:58.3333333333%}.row .col.pull-m7{right:58.3333333333%}.row .col.push-m7{left:58.3333333333%}.row .col.offset-m8{margin-left:66.6666666667%}.row .col.pull-m8{right:66.6666666667%}.row .col.push-m8{left:66.6666666667%}.row .col.offset-m9{margin-left:75%}.row .col.pull-m9{right:75%}.row .col.push-m9{left:75%}.row .col.offset-m10{margin-left:83.3333333333%}.row .col.pull-m10{right:83.3333333333%}.row .col.push-m10{left:83.3333333333%}.row .col.offset-m11{margin-left:91.6666666667%}.row .col.pull-m11{right:91.6666666667%}.row .col.push-m11{left:91.6666666667%}.row .col.offset-m12{margin-left:100%}.row .col.pull-m12{right:100%}.row .col.push-m12{left:100%}}@media only screen and (min-width:993px){.row .col.l1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.l4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.l7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.l10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-l1{margin-left:8.3333333333%}.row .col.pull-l1{right:8.3333333333%}.row .col.push-l1{left:8.3333333333%}.row .col.offset-l2{margin-left:16.6666666667%}.row .col.pull-l2{right:16.6666666667%}.row .col.push-l2{left:16.6666666667%}.row .col.offset-l3{margin-left:25%}.row .col.pull-l3{right:25%}.row .col.push-l3{left:25%}.row .col.offset-l4{margin-left:33.3333333333%}.row .col.pull-l4{right:33.3333333333%}.row .col.push-l4{left:33.3333333333%}.row .col.offset-l5{margin-left:41.6666666667%}.row .col.pull-l5{right:41.6666666667%}.row .col.push-l5{left:41.6666666667%}.row .col.offset-l6{margin-left:50%}.row .col.pull-l6{right:50%}.row .col.push-l6{left:50%}.row .col.offset-l7{margin-left:58.3333333333%}.row .col.pull-l7{right:58.3333333333%}.row .col.push-l7{left:58.3333333333%}.row .col.offset-l8{margin-left:66.6666666667%}.row .col.pull-l8{right:66.6666666667%}.row .col.push-l8{left:66.6666666667%}.row .col.offset-l9{margin-left:75%}.row .col.pull-l9{right:75%}.row .col.push-l9{left:75%}.row .col.offset-l10{margin-left:83.3333333333%}.row .col.pull-l10{right:83.3333333333%}.row .col.push-l10{left:83.3333333333%}.row .col.offset-l11{margin-left:91.6666666667%}.row .col.pull-l11{right:91.6666666667%}.row .col.push-l11{left:91.6666666667%}.row .col.offset-l12{margin-left:100%}.row .col.pull-l12{right:100%}.row .col.push-l12{left:100%}}nav{color:#fff;background-color:#ee6e73;width:100%;height:56px;line-height:56px}nav a{color:#fff}nav [class*=mdi-],nav [class^=mdi-],nav i,nav i.material-icons{display:block;font-size:2rem;height:56px;line-height:56px}nav .nav-wrapper{position:relative;height:100%}@media only screen and (min-width:993px){nav a.button-collapse{display:none}}nav .button-collapse{float:left;position:relative;z-index:1;height:56px}nav .button-collapse i{font-size:2.7rem;height:56px;line-height:56px}nav .brand-logo{position:absolute;color:#fff;display:inline-block;font-size:2.1rem;padding:0;white-space:nowrap}nav .brand-logo.center{left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}@media only screen and (max-width:992px){nav .brand-logo{left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}nav .brand-logo.left,nav .brand-logo.right{padding:0;-webkit-transform:none;transform:none}nav .brand-logo.left{left:.5rem}nav .brand-logo.right{right:.5rem;left:auto}}nav .brand-logo.right{right:.5rem;padding:0}nav ul{margin:0}nav ul li{transition:background-color .3s;float:left;padding:0}nav ul li.active{background-color:rgba(0,0,0,.1)}nav ul a{transition:background-color .3s;font-size:1rem;color:#fff;display:inline-block;padding:0 15px;cursor:pointer}nav ul a.btn,nav ul a.btn-flat,nav ul a.btn-floating,nav ul a.btn-large{margin-top:-2px;margin-left:15px;margin-right:15px}nav ul a:hover{background-color:rgba(0,0,0,.1)}nav ul.left{float:left}nav .input-field{margin:0}nav .input-field input{height:100%;font-size:1.2rem;border:none;padding-left:2rem}nav .input-field input:focus,nav .input-field input[type=date]:valid,nav .input-field input[type=email]:valid,nav .input-field input[type=password]:valid,nav .input-field input[type=text]:valid,nav .input-field input[type=url]:valid{border:none;box-shadow:none}nav .input-field label{top:0;left:0}nav .input-field label i{color:rgba(255,255,255,.7);transition:color .3s}nav .input-field label.active i{color:#fff}nav .input-field label.active{-webkit-transform:translateY(0);transform:translateY(0)}.navbar-fixed{position:relative;height:56px;z-index:998}.navbar-fixed nav{position:fixed}@media only screen and (min-width:601px){nav,nav .nav-wrapper i,nav a.button-collapse,nav a.button-collapse i{height:64px;line-height:64px}.navbar-fixed{height:64px}}@font-face{font-family:Roboto;src:local(Roboto Thin),url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Thin.eot);src:url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Thin.eot?#iefix) format(\"embedded-opentype\"),url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Thin.woff2) format(\"woff2\"),url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Thin.woff) format(\"woff\"),url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Thin.ttf) format(\"truetype\");font-weight:200}@font-face{font-family:Roboto;src:local(Roboto Light),url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Light.eot);src:url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Light.eot?#iefix) format(\"embedded-opentype\"),url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Light.woff2) format(\"woff2\"),url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Light.woff) format(\"woff\"),url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Light.ttf) format(\"truetype\");font-weight:300}@font-face{font-family:Roboto;src:local(Roboto Regular),url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Regular.eot);src:url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Regular.eot?#iefix) format(\"embedded-opentype\"),url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Regular.woff2) format(\"woff2\"),url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Regular.woff) format(\"woff\"),url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Regular.ttf) format(\"truetype\");font-weight:400}@font-face{font-family:Roboto;src:url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Medium.eot);src:url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Medium.eot?#iefix) format(\"embedded-opentype\"),url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Medium.woff2) format(\"woff2\"),url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Medium.woff) format(\"woff\"),url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Medium.ttf) format(\"truetype\");font-weight:500}@font-face{font-family:Roboto;src:url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Bold.eot);src:url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Bold.eot?#iefix) format(\"embedded-opentype\"),url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Bold.woff2) format(\"woff2\"),url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Bold.woff) format(\"woff\"),url(jspm_packages/npm/materialize-css@0.97.6/dist/fonts/roboto/Roboto-Bold.ttf) format(\"truetype\");font-weight:700}a{text-decoration:none}html{line-height:1.5;font-family:Roboto,sans-serif;font-weight:400;color:rgba(0,0,0,.87)}@media only screen and (min-width:0){html{font-size:14px}}@media only screen and (min-width:992px){html{font-size:14.5px}}@media only screen and (min-width:1200px){html{font-size:15px}}h1,h2,h3,h4,h5,h6{font-weight:400;line-height:1.1}h1 a,h2 a,h3 a,h4 a,h5 a,h6 a{font-weight:inherit}h1{font-size:4.2rem;line-height:110%;margin:2.1rem 0 1.68rem 0}h2{font-size:3.56rem;line-height:110%;margin:1.78rem 0 1.424rem 0}h3{font-size:2.92rem;line-height:110%;margin:1.46rem 0 1.168rem 0}h4{font-size:2.28rem;line-height:110%;margin:1.14rem 0 .912rem 0}h5{font-size:1.64rem;line-height:110%;margin:.82rem 0 .656rem 0}h6{font-size:1rem;line-height:110%;margin:.5rem 0 .4rem 0}em{font-style:italic}strong{font-weight:500}small{font-size:75%}.light,footer.page-footer .footer-copyright{font-weight:300}.thin{font-weight:200}.flow-text{font-weight:300}@media only screen and (min-width:360px){.flow-text{font-size:1.2rem}}@media only screen and (min-width:390px){.flow-text{font-size:1.224rem}}@media only screen and (min-width:420px){.flow-text{font-size:1.248rem}}@media only screen and (min-width:450px){.flow-text{font-size:1.272rem}}@media only screen and (min-width:480px){.flow-text{font-size:1.296rem}}@media only screen and (min-width:510px){.flow-text{font-size:1.32rem}}@media only screen and (min-width:540px){.flow-text{font-size:1.344rem}}@media only screen and (min-width:570px){.flow-text{font-size:1.368rem}}@media only screen and (min-width:600px){.flow-text{font-size:1.392rem}}@media only screen and (min-width:630px){.flow-text{font-size:1.416rem}}@media only screen and (min-width:660px){.flow-text{font-size:1.44rem}}@media only screen and (min-width:690px){.flow-text{font-size:1.464rem}}@media only screen and (min-width:720px){.flow-text{font-size:1.488rem}}@media only screen and (min-width:750px){.flow-text{font-size:1.512rem}}@media only screen and (min-width:780px){.flow-text{font-size:1.536rem}}@media only screen and (min-width:810px){.flow-text{font-size:1.56rem}}@media only screen and (min-width:840px){.flow-text{font-size:1.584rem}}@media only screen and (min-width:870px){.flow-text{font-size:1.608rem}}@media only screen and (min-width:900px){.flow-text{font-size:1.632rem}}@media only screen and (min-width:930px){.flow-text{font-size:1.656rem}}@media only screen and (min-width:960px){.flow-text{font-size:1.68rem}}@media only screen and (max-width:360px){.flow-text{font-size:1.2rem}}.card-panel{transition:box-shadow .25s;padding:20px;margin:.5rem 0 1rem 0;border-radius:2px;background-color:#fff}.card{position:relative;margin:.5rem 0 1rem 0;background-color:#fff;transition:box-shadow .25s;border-radius:2px}.card .card-title{font-size:24px;font-weight:300}.card .card-title.activator{cursor:pointer}.card.large,.card.medium,.card.small{position:relative}.card.large .card-image,.card.medium .card-image,.card.small .card-image{max-height:60%;overflow:hidden}.card.large .card-content,.card.medium .card-content,.card.small .card-content{max-height:40%;overflow:hidden}.card.large .card-action,.card.medium .card-action,.card.small .card-action{position:absolute;bottom:0;left:0;right:0}.card.small{height:300px}.card.medium{height:400px}.card.large{height:500px}.card .card-image{position:relative}.card .card-image img{display:block;border-radius:2px 2px 0 0;position:relative;left:0;right:0;top:0;bottom:0;width:100%}.card .card-image .card-title{color:#fff;position:absolute;bottom:0;left:0;padding:20px}.card .card-content{padding:20px;border-radius:0 0 2px 2px}.card .card-content p{margin:0;color:inherit}.card .card-content .card-title{line-height:48px}.card .card-action{position:relative;background-color:inherit;border-top:1px solid rgba(160,160,160,.2);padding:20px;z-index:2}.card .card-action a:not(.btn):not(.btn-large):not(.btn-floating){color:#ffab40;margin-right:20px;transition:color .3s ease;text-transform:uppercase}.card .card-action a:not(.btn):not(.btn-large):not(.btn-floating):hover{color:#ffd8a6}.card .card-action+.card-reveal{z-index:1;padding-bottom:64px}.card .card-reveal{padding:20px;position:absolute;background-color:#fff;width:100%;overflow-y:auto;top:100%;height:100%;z-index:3;display:none}.card .card-reveal .card-title{cursor:pointer;display:block}#toast-container{display:block;position:fixed;z-index:10000}@media only screen and (max-width:600px){#toast-container{min-width:100%;bottom:0}}@media only screen and (min-width:601px) and (max-width:992px){#toast-container{left:5%;bottom:7%;max-width:90%}}@media only screen and (min-width:993px){#toast-container{top:10%;right:7%;max-width:86%}}.toast{border-radius:2px;top:0;width:auto;clear:both;margin-top:10px;position:relative;max-width:100%;height:auto;min-height:48px;line-height:1.5em;word-break:break-all;background-color:#323232;padding:10px 25px;font-size:1.1rem;font-weight:300;color:#fff;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.toast .btn,.toast .btn-flat,.toast .btn-large{margin:0;margin-left:3rem}.toast.rounded{border-radius:24px}@media only screen and (max-width:600px){.toast{width:100%;border-radius:0}}@media only screen and (min-width:601px) and (max-width:992px){.toast{float:left}}@media only screen and (min-width:993px){.toast{float:right}}.tabs{display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative;overflow-x:auto;overflow-y:hidden;height:48px;background-color:#fff;margin:0 auto;width:100%;white-space:nowrap}.tabs .tab{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;display:block;float:left;text-align:center;line-height:48px;height:48px;padding:0;margin:0;text-transform:uppercase;text-overflow:ellipsis;overflow:hidden;letter-spacing:.8px;width:15%;min-width:80px}.tabs .tab a{color:#ee6e73;display:block;width:100%;height:100%;text-overflow:ellipsis;overflow:hidden;transition:color .28s ease}.tabs .tab a:hover{color:#f9c9cb}.tabs .tab.disabled a{color:#f9c9cb;cursor:default}.tabs .indicator{position:absolute;bottom:0;height:2px;background-color:#f6b2b5;will-change:left,right}.material-tooltip{padding:10px 8px;font-size:1rem;z-index:2000;background-color:transparent;border-radius:2px;color:#fff;min-height:36px;line-height:120%;opacity:0;display:none;position:absolute;text-align:center;max-width:calc(100% - 4px);overflow:hidden;left:0;top:0;pointer-events:none;will-change:top,left}.backdrop{position:absolute;opacity:0;display:none;height:7px;width:14px;border-radius:0 0 14px 14px;background-color:#323232;z-index:-1;-webkit-transform-origin:50% 10%;transform-origin:50% 10%;will-change:transform,opacity}.btn,.btn-flat,.btn-large{border:none;border-radius:2px;display:inline-block;height:36px;line-height:36px;outline:0;padding:0 2rem;text-transform:uppercase;vertical-align:middle;-webkit-tap-highlight-color:transparent}.btn-floating.disabled,.btn-floating:disabled,.btn-large.disabled,.btn-large:disabled .btn-large:disabled,.btn.disabled,.btn:disabled .btn-large:disabled,.disabled.btn-large{background-color:#DFDFDF!important;box-shadow:none;color:#9F9F9F!important;cursor:default}.btn-floating.disabled *,.btn-floating:disabled *,.btn-large.disabled *,.btn-large:disabled .btn-large:disabled *,.btn.disabled *,.btn:disabled .btn-large:disabled *,.disabled.btn-large *{pointer-events:none}.btn-floating.disabled:hover,.btn-floating:disabled:hover,.btn-large.disabled:hover,.btn-large:disabled .btn-large:disabled:hover,.btn.disabled:hover,.btn:disabled .btn-large:disabled:hover,.disabled.btn-large:hover{background-color:#DFDFDF!important;color:#9F9F9F!important}.btn i,.btn-flat i,.btn-floating i,.btn-large i{font-size:1.3rem;line-height:inherit}.btn,.btn-large{text-decoration:none;color:#fff;background-color:#26a69a;text-align:center;letter-spacing:.5px;transition:.2s ease-out;cursor:pointer}.btn-large:hover,.btn:hover{background-color:#2bbbad}.btn-floating{display:inline-block;color:#fff;position:relative;overflow:hidden;z-index:1;width:37px;height:37px;line-height:37px;padding:0;background-color:#26a69a;border-radius:50%;transition:.3s;cursor:pointer;vertical-align:middle}.btn-floating i{width:inherit;display:inline-block;text-align:center;color:#fff;font-size:1.6rem;line-height:37px}.btn-floating:hover{background-color:#26a69a}.btn-floating:before{border-radius:0}.btn-floating.btn-large{width:55.5px;height:55.5px}.btn-floating.btn-large i{line-height:55.5px}button.btn-floating{border:none}.fixed-action-btn{position:fixed;right:23px;bottom:23px;padding-top:15px;margin-bottom:0;z-index:998}.fixed-action-btn.active ul{visibility:visible}.fixed-action-btn.horizontal{padding:0 0 0 15px}.fixed-action-btn.horizontal ul{text-align:right;right:64px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);height:100%;left:auto;width:500px}.fixed-action-btn.horizontal ul li{display:inline-block;margin:15px 15px 0 0}.fixed-action-btn ul{left:0;right:0;text-align:center;position:absolute;bottom:64px;margin:0;visibility:hidden}.fixed-action-btn ul li{margin-bottom:15px}.fixed-action-btn ul a.btn-floating{opacity:0}.btn-flat{box-shadow:none;background-color:transparent;color:#343434;cursor:pointer}.btn-flat.disabled{color:#b3b3b3;cursor:default}.btn-large{height:54px;line-height:54px}.btn-large i{font-size:1.6rem}.btn-block{display:block}.dropdown-content{background-color:#fff;margin:0;display:none;min-width:100px;max-height:650px;overflow-y:auto;opacity:0;position:absolute;z-index:999;will-change:width,height}.dropdown-content li{clear:both;color:rgba(0,0,0,.87);cursor:pointer;min-height:50px;line-height:1.5rem;width:100%;text-align:left;text-transform:none}.dropdown-content li.active,.dropdown-content li.selected,.dropdown-content li:hover{background-color:#eee}.dropdown-content li.active.selected{background-color:#e1e1e1}.dropdown-content li.divider{min-height:0;height:1px}.dropdown-content li>a,.dropdown-content li>span{font-size:16px;color:#26a69a;display:block;line-height:22px;padding:14px 16px}.dropdown-content li>span>label{top:1px;left:3px;height:18px}.dropdown-content li>a>i{height:inherit;line-height:inherit}/*!\n * Waves v0.6.0\n * http://fian.my.id/Waves\n *\n * Copyright 2014 Alfiana E. Sibuea and other contributors\n * Released under the MIT license\n * https://github.com/fians/Waves/blob/master/LICENSE\n */.waves-effect{position:relative;cursor:pointer;display:inline-block;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;vertical-align:middle;z-index:1;will-change:opacity,transform;transition:all .3s ease-out}.waves-effect .waves-ripple{position:absolute;border-radius:50%;width:20px;height:20px;margin-top:-10px;margin-left:-10px;opacity:0;background:rgba(0,0,0,.2);transition:all .7s ease-out;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;-webkit-transform:scale(0);transform:scale(0);pointer-events:none}.waves-effect.waves-light .waves-ripple{background-color:rgba(255,255,255,.45)}.waves-effect.waves-red .waves-ripple{background-color:rgba(244,67,54,.7)}.waves-effect.waves-yellow .waves-ripple{background-color:rgba(255,235,59,.7)}.waves-effect.waves-orange .waves-ripple{background-color:rgba(255,152,0,.7)}.waves-effect.waves-purple .waves-ripple{background-color:rgba(156,39,176,.7)}.waves-effect.waves-green .waves-ripple{background-color:rgba(76,175,80,.7)}.waves-effect.waves-teal .waves-ripple{background-color:rgba(0,150,136,.7)}.waves-effect input[type=button],.waves-effect input[type=reset],.waves-effect input[type=submit]{border:0;font-style:normal;font-size:inherit;text-transform:inherit;background:0 0}.waves-notransition{transition:none!important}.waves-circle{-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-mask-image:-webkit-radial-gradient(circle,#fff 100%,#000 100%)}.waves-input-wrapper{border-radius:.2em;vertical-align:bottom}.waves-input-wrapper .waves-button-input{position:relative;top:0;left:0;z-index:1}.waves-circle{text-align:center;width:2.5em;height:2.5em;line-height:2.5em;border-radius:50%;-webkit-mask-image:none}.waves-block{display:block}a.waves-effect .waves-ripple{z-index:-1}.modal{display:none;position:fixed;left:0;right:0;background-color:#fafafa;padding:0;max-height:70%;width:55%;margin:auto;overflow-y:auto;border-radius:2px;will-change:top,opacity}@media only screen and (max-width:992px){.modal{width:80%}}.modal h1,.modal h2,.modal h3,.modal h4{margin-top:0}.modal .modal-content{padding:24px}.modal .modal-close{cursor:pointer}.modal .modal-footer{border-radius:0 0 2px 2px;background-color:#fafafa;padding:4px 6px;height:56px;width:100%}.modal .modal-footer .btn,.modal .modal-footer .btn-flat,.modal .modal-footer .btn-large{float:right;margin:6px 0}.lean-overlay{position:fixed;z-index:999;top:-100px;left:0;bottom:0;right:0;height:125%;width:100%;background:#000;display:none;will-change:opacity}.modal.modal-fixed-footer{padding:0;height:70%}.modal.modal-fixed-footer .modal-content{position:absolute;height:calc(100% - 56px);max-height:100%;width:100%;overflow-y:auto}.modal.modal-fixed-footer .modal-footer{border-top:1px solid rgba(0,0,0,.1);position:absolute;bottom:0}.modal.bottom-sheet{top:auto;bottom:-100%;margin:0;width:100%;max-height:45%;border-radius:0;will-change:bottom,opacity}.collapsible{border-top:1px solid #ddd;border-right:1px solid #ddd;border-left:1px solid #ddd;margin:.5rem 0 1rem 0}.collapsible-header{display:block;cursor:pointer;min-height:3rem;line-height:3rem;padding:0 1rem;background-color:#fff;border-bottom:1px solid #ddd}.collapsible-header i{width:2rem;font-size:1.6rem;line-height:3rem;display:block;float:left;text-align:center;margin-right:1rem}.collapsible-body{display:none;border-bottom:1px solid #ddd;box-sizing:border-box}.collapsible-body p{margin:0;padding:2rem}.side-nav .collapsible,.side-nav.fixed .collapsible{border:none;box-shadow:none}.side-nav .collapsible li,.side-nav.fixed .collapsible li{padding:0}.side-nav .collapsible-header,.side-nav.fixed .collapsible-header{background-color:transparent;border:none;line-height:inherit;height:inherit;padding:0 30px}.side-nav .collapsible-header:hover,.side-nav.fixed .collapsible-header:hover{background-color:rgba(0,0,0,.05)}.side-nav .collapsible-header i,.side-nav.fixed .collapsible-header i{line-height:inherit}.side-nav .collapsible-body,.side-nav.fixed .collapsible-body{border:0;background-color:#fff}.side-nav .collapsible-body li a,.side-nav.fixed .collapsible-body li a{padding:0 37.5px 0 45px}.collapsible.popout{border:none;box-shadow:none}.collapsible.popout>li{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);margin:0 24px;transition:margin .35s cubic-bezier(.25,.46,.45,.94)}.collapsible.popout>li.active{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);margin:16px 0}.chip{display:inline-block;height:32px;font-size:13px;font-weight:500;color:rgba(0,0,0,.6);line-height:32px;padding:0 12px;border-radius:16px;background-color:#e4e4e4}.chip img{float:left;margin:0 8px 0 -12px;height:32px;width:32px;border-radius:50%}.chip i.material-icons{cursor:pointer;float:right;font-size:16px;line-height:32px;padding-left:8px}.materialboxed{display:block;cursor:-webkit-zoom-in;cursor:zoom-in;position:relative;transition:opacity .4s}.materialboxed:hover{will-change:left,top,width,height}.materialboxed:hover:not(.active){opacity:.8}.materialboxed.active{cursor:-webkit-zoom-out;cursor:zoom-out}#materialbox-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background-color:#292929;z-index:1000;will-change:opacity}.materialbox-caption{position:fixed;display:none;color:#fff;line-height:50px;bottom:0;width:100%;text-align:center;padding:0 15%;height:50px;z-index:1000;-webkit-font-smoothing:antialiased}select:focus{outline:1px solid #c9f3ef}button:focus{outline:0;background-color:#2ab7a9}label{font-size:.8rem;color:#9e9e9e}::-webkit-input-placeholder{color:#d1d1d1}:-moz-placeholder{color:#d1d1d1}::-moz-placeholder{color:#d1d1d1}:-ms-input-placeholder{color:#d1d1d1}input:not([type]),input[type=date],input[type=datetime-local],input[type=datetime],input[type=email],input[type=number],input[type=password],input[type=search],input[type=tel],input[type=text],input[type=time],input[type=url],textarea.materialize-textarea{background-color:transparent;border:none;border-bottom:1px solid #9e9e9e;border-radius:0;outline:0;height:3rem;width:100%;font-size:1rem;margin:0 0 15px 0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s}input:not([type]):disabled,input:not([type])[readonly=readonly],input[type=date]:disabled,input[type=date][readonly=readonly],input[type=datetime-local]:disabled,input[type=datetime-local][readonly=readonly],input[type=datetime]:disabled,input[type=datetime][readonly=readonly],input[type=email]:disabled,input[type=email][readonly=readonly],input[type=number]:disabled,input[type=number][readonly=readonly],input[type=password]:disabled,input[type=password][readonly=readonly],input[type=search]:disabled,input[type=search][readonly=readonly],input[type=tel]:disabled,input[type=tel][readonly=readonly],input[type=text]:disabled,input[type=text][readonly=readonly],input[type=time]:disabled,input[type=time][readonly=readonly],input[type=url]:disabled,input[type=url][readonly=readonly],textarea.materialize-textarea:disabled,textarea.materialize-textarea[readonly=readonly]{color:rgba(0,0,0,.26);border-bottom:1px dotted rgba(0,0,0,.26)}input:not([type]):disabled+label,input:not([type])[readonly=readonly]+label,input[type=date]:disabled+label,input[type=date][readonly=readonly]+label,input[type=datetime-local]:disabled+label,input[type=datetime-local][readonly=readonly]+label,input[type=datetime]:disabled+label,input[type=datetime][readonly=readonly]+label,input[type=email]:disabled+label,input[type=email][readonly=readonly]+label,input[type=number]:disabled+label,input[type=number][readonly=readonly]+label,input[type=password]:disabled+label,input[type=password][readonly=readonly]+label,input[type=search]:disabled+label,input[type=search][readonly=readonly]+label,input[type=tel]:disabled+label,input[type=tel][readonly=readonly]+label,input[type=text]:disabled+label,input[type=text][readonly=readonly]+label,input[type=time]:disabled+label,input[type=time][readonly=readonly]+label,input[type=url]:disabled+label,input[type=url][readonly=readonly]+label,textarea.materialize-textarea:disabled+label,textarea.materialize-textarea[readonly=readonly]+label{color:rgba(0,0,0,.26)}input:not([type]):focus:not([readonly]),input[type=date]:focus:not([readonly]),input[type=datetime-local]:focus:not([readonly]),input[type=datetime]:focus:not([readonly]),input[type=email]:focus:not([readonly]),input[type=number]:focus:not([readonly]),input[type=password]:focus:not([readonly]),input[type=search]:focus:not([readonly]),input[type=tel]:focus:not([readonly]),input[type=text]:focus:not([readonly]),input[type=time]:focus:not([readonly]),input[type=url]:focus:not([readonly]),textarea.materialize-textarea:focus:not([readonly]){border-bottom:1px solid #26a69a;box-shadow:0 1px 0 0 #26a69a}input:not([type]):focus:not([readonly])+label,input[type=date]:focus:not([readonly])+label,input[type=datetime-local]:focus:not([readonly])+label,input[type=datetime]:focus:not([readonly])+label,input[type=email]:focus:not([readonly])+label,input[type=number]:focus:not([readonly])+label,input[type=password]:focus:not([readonly])+label,input[type=search]:focus:not([readonly])+label,input[type=tel]:focus:not([readonly])+label,input[type=text]:focus:not([readonly])+label,input[type=time]:focus:not([readonly])+label,input[type=url]:focus:not([readonly])+label,textarea.materialize-textarea:focus:not([readonly])+label{color:#26a69a}input:not([type]).valid,input:not([type]):focus.valid,input[type=date].valid,input[type=date]:focus.valid,input[type=datetime-local].valid,input[type=datetime-local]:focus.valid,input[type=datetime].valid,input[type=datetime]:focus.valid,input[type=email].valid,input[type=email]:focus.valid,input[type=number].valid,input[type=number]:focus.valid,input[type=password].valid,input[type=password]:focus.valid,input[type=search].valid,input[type=search]:focus.valid,input[type=tel].valid,input[type=tel]:focus.valid,input[type=text].valid,input[type=text]:focus.valid,input[type=time].valid,input[type=time]:focus.valid,input[type=url].valid,input[type=url]:focus.valid,textarea.materialize-textarea.valid,textarea.materialize-textarea:focus.valid{border-bottom:1px solid #4CAF50;box-shadow:0 1px 0 0 #4CAF50}input:not([type]).valid+label:after,input:not([type]):focus.valid+label:after,input[type=date].valid+label:after,input[type=date]:focus.valid+label:after,input[type=datetime-local].valid+label:after,input[type=datetime-local]:focus.valid+label:after,input[type=datetime].valid+label:after,input[type=datetime]:focus.valid+label:after,input[type=email].valid+label:after,input[type=email]:focus.valid+label:after,input[type=number].valid+label:after,input[type=number]:focus.valid+label:after,input[type=password].valid+label:after,input[type=password]:focus.valid+label:after,input[type=search].valid+label:after,input[type=search]:focus.valid+label:after,input[type=tel].valid+label:after,input[type=tel]:focus.valid+label:after,input[type=text].valid+label:after,input[type=text]:focus.valid+label:after,input[type=time].valid+label:after,input[type=time]:focus.valid+label:after,input[type=url].valid+label:after,input[type=url]:focus.valid+label:after,textarea.materialize-textarea.valid+label:after,textarea.materialize-textarea:focus.valid+label:after{content:attr(data-success);color:#4CAF50;opacity:1}input:not([type]).invalid,input:not([type]):focus.invalid,input[type=date].invalid,input[type=date]:focus.invalid,input[type=datetime-local].invalid,input[type=datetime-local]:focus.invalid,input[type=datetime].invalid,input[type=datetime]:focus.invalid,input[type=email].invalid,input[type=email]:focus.invalid,input[type=number].invalid,input[type=number]:focus.invalid,input[type=password].invalid,input[type=password]:focus.invalid,input[type=search].invalid,input[type=search]:focus.invalid,input[type=tel].invalid,input[type=tel]:focus.invalid,input[type=text].invalid,input[type=text]:focus.invalid,input[type=time].invalid,input[type=time]:focus.invalid,input[type=url].invalid,input[type=url]:focus.invalid,textarea.materialize-textarea.invalid,textarea.materialize-textarea:focus.invalid{border-bottom:1px solid #F44336;box-shadow:0 1px 0 0 #F44336}input:not([type]).invalid+label:after,input:not([type]):focus.invalid+label:after,input[type=date].invalid+label:after,input[type=date]:focus.invalid+label:after,input[type=datetime-local].invalid+label:after,input[type=datetime-local]:focus.invalid+label:after,input[type=datetime].invalid+label:after,input[type=datetime]:focus.invalid+label:after,input[type=email].invalid+label:after,input[type=email]:focus.invalid+label:after,input[type=number].invalid+label:after,input[type=number]:focus.invalid+label:after,input[type=password].invalid+label:after,input[type=password]:focus.invalid+label:after,input[type=search].invalid+label:after,input[type=search]:focus.invalid+label:after,input[type=tel].invalid+label:after,input[type=tel]:focus.invalid+label:after,input[type=text].invalid+label:after,input[type=text]:focus.invalid+label:after,input[type=time].invalid+label:after,input[type=time]:focus.invalid+label:after,input[type=url].invalid+label:after,input[type=url]:focus.invalid+label:after,textarea.materialize-textarea.invalid+label:after,textarea.materialize-textarea:focus.invalid+label:after{content:attr(data-error);color:#F44336;opacity:1}input:not([type]).validate+label,input[type=date].validate+label,input[type=datetime-local].validate+label,input[type=datetime].validate+label,input[type=email].validate+label,input[type=number].validate+label,input[type=password].validate+label,input[type=search].validate+label,input[type=tel].validate+label,input[type=text].validate+label,input[type=time].validate+label,input[type=url].validate+label,textarea.materialize-textarea.validate+label{width:100%;pointer-events:none}input:not([type])+label:after,input[type=date]+label:after,input[type=datetime-local]+label:after,input[type=datetime]+label:after,input[type=email]+label:after,input[type=number]+label:after,input[type=password]+label:after,input[type=search]+label:after,input[type=tel]+label:after,input[type=text]+label:after,input[type=time]+label:after,input[type=url]+label:after,textarea.materialize-textarea+label:after{display:block;content:\"\";position:absolute;top:65px;opacity:0;transition:.2s opacity ease-out,.2s color ease-out}.input-field{position:relative;margin-top:1rem}.input-field label{color:#9e9e9e;position:absolute;top:.8rem;left:.75rem;font-size:1rem;cursor:text;transition:.2s ease-out}.input-field label.active{font-size:.8rem;-webkit-transform:translateY(-140%);transform:translateY(-140%)}.input-field .prefix{position:absolute;width:3rem;font-size:2rem;transition:color .2s}.input-field .prefix.active{color:#26a69a}.input-field .prefix~input,.input-field .prefix~textarea{margin-left:3rem;width:92%;width:calc(100% - 3rem)}.input-field .prefix~textarea{padding-top:.8rem}.input-field .prefix~label{margin-left:3rem}@media only screen and (max-width:992px){.input-field .prefix~input{width:86%;width:calc(100% - 3rem)}}@media only screen and (max-width:600px){.input-field .prefix~input{width:80%;width:calc(100% - 3rem)}}.input-field input[type=search]{display:block;line-height:inherit;padding-left:4rem;width:calc(100% - 4rem)}.input-field input[type=search]:focus{background-color:#fff;border:0;box-shadow:none;color:#444}.input-field input[type=search]:focus+label i,.input-field input[type=search]:focus~.material-icons,.input-field input[type=search]:focus~.mdi-navigation-close{color:#444}.input-field input[type=search]+label{left:1rem}.input-field input[type=search]~.material-icons,.input-field input[type=search]~.mdi-navigation-close{position:absolute;top:0;right:1rem;color:transparent;cursor:pointer;font-size:2rem;transition:.3s color}textarea{width:100%;height:3rem;background-color:transparent}textarea.materialize-textarea{overflow-y:hidden;padding:1.6rem 0;resize:none;min-height:3rem}.hiddendiv{display:none;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;padding-top:1.2rem}[type=radio]:checked,[type=radio]:not(:checked){position:absolute;left:-9999px;opacity:0}[type=radio]:checked+label,[type=radio]:not(:checked)+label{position:relative;padding-left:35px;cursor:pointer;display:inline-block;height:25px;line-height:25px;font-size:1rem;transition:.28s ease;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[type=radio]+label:after,[type=radio]+label:before{content:'';position:absolute;left:0;top:0;margin:4px;width:16px;height:16px;z-index:0;transition:.28s ease}[type=radio].with-gap:checked+label:after,[type=radio].with-gap:checked+label:before,[type=radio]:checked+label:after,[type=radio]:checked+label:before,[type=radio]:not(:checked)+label:after,[type=radio]:not(:checked)+label:before{border-radius:50%}[type=radio]:not(:checked)+label:after,[type=radio]:not(:checked)+label:before{border:2px solid #5a5a5a}[type=radio]:not(:checked)+label:after{z-index:-1;-webkit-transform:scale(0);transform:scale(0)}[type=radio]:checked+label:before{border:2px solid transparent}[type=radio].with-gap:checked+label:after,[type=radio].with-gap:checked+label:before,[type=radio]:checked+label:after{border:2px solid #26a69a}[type=radio].with-gap:checked+label:after,[type=radio]:checked+label:after{background-color:#26a69a;z-index:0}[type=radio]:checked+label:after{-webkit-transform:scale(1.02);transform:scale(1.02)}[type=radio].with-gap:checked+label:after{-webkit-transform:scale(.5);transform:scale(.5)}[type=radio].tabbed:focus+label:before{box-shadow:0 0 0 10px rgba(0,0,0,.1)}[type=radio].with-gap:disabled:checked+label:before{border:2px solid rgba(0,0,0,.26)}[type=radio].with-gap:disabled:checked+label:after{border:none;background-color:rgba(0,0,0,.26)}[type=radio]:disabled:checked+label:before,[type=radio]:disabled:not(:checked)+label:before{background-color:transparent;border-color:rgba(0,0,0,.26)}[type=radio]:disabled+label{color:rgba(0,0,0,.26)}[type=radio]:disabled:not(:checked)+label:before{border-color:rgba(0,0,0,.26)}[type=radio]:disabled:checked+label:after{background-color:rgba(0,0,0,.26);border-color:#BDBDBD}form p{margin-bottom:10px;text-align:left}form p:last-child{margin-bottom:0}[type=checkbox]:checked,[type=checkbox]:not(:checked){position:absolute;left:-9999px;opacity:0}[type=checkbox]+label{position:relative;padding-left:35px;cursor:pointer;display:inline-block;height:25px;line-height:25px;font-size:1rem;-webkit-user-select:none;-moz-user-select:none;-khtml-user-select:none;-ms-user-select:none}[type=checkbox]+label:before,[type=checkbox]:not(.filled-in)+label:after{content:'';position:absolute;top:0;left:0;width:18px;height:18px;z-index:0;border:2px solid #5a5a5a;border-radius:1px;margin-top:2px;transition:.2s}[type=checkbox]:not(.filled-in)+label:after{border:0;-webkit-transform:scale(0);transform:scale(0)}[type=checkbox]:not(:checked):disabled+label:before{border:none;background-color:rgba(0,0,0,.26)}[type=checkbox].tabbed:focus+label:after{-webkit-transform:scale(1);transform:scale(1);border:0;border-radius:50%;box-shadow:0 0 0 10px rgba(0,0,0,.1);background-color:rgba(0,0,0,.1)}[type=checkbox]:checked+label:before{top:-4px;left:-5px;width:12px;height:22px;border-top:2px solid transparent;border-left:2px solid transparent;border-right:2px solid #26a69a;border-bottom:2px solid #26a69a;-webkit-transform:rotate(40deg);transform:rotate(40deg);-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform-origin:100% 100%;transform-origin:100% 100%}[type=checkbox]:checked:disabled+label:before{border-right:2px solid rgba(0,0,0,.26);border-bottom:2px solid rgba(0,0,0,.26)}[type=checkbox]:indeterminate+label:before{top:-11px;left:-12px;width:10px;height:22px;border-top:none;border-left:none;border-right:2px solid #26a69a;border-bottom:none;-webkit-transform:rotate(90deg);transform:rotate(90deg);-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform-origin:100% 100%;transform-origin:100% 100%}[type=checkbox]:indeterminate:disabled+label:before{border-right:2px solid rgba(0,0,0,.26);background-color:transparent}[type=checkbox].filled-in+label:after{border-radius:2px}[type=checkbox].filled-in+label:after,[type=checkbox].filled-in+label:before{content:'';left:0;position:absolute;transition:border .25s,background-color .25s,width .2s .1s,height .2s .1s,top .2s .1s,left .2s .1s;z-index:1}[type=checkbox].filled-in:not(:checked)+label:before{width:0;height:0;border:3px solid transparent;left:6px;top:10px;-webkit-transform:rotateZ(37deg);transform:rotateZ(37deg);-webkit-transform-origin:20% 40%;transform-origin:100% 100%}[type=checkbox].filled-in:not(:checked)+label:after{height:20px;width:20px;background-color:transparent;border:2px solid #5a5a5a;top:0;z-index:0}[type=checkbox].filled-in:checked+label:before{top:0;left:1px;width:8px;height:13px;border-top:2px solid transparent;border-left:2px solid transparent;border-right:2px solid #fff;border-bottom:2px solid #fff;-webkit-transform:rotateZ(37deg);transform:rotateZ(37deg);-webkit-transform-origin:100% 100%;transform-origin:100% 100%}[type=checkbox].filled-in:checked+label:after{top:0;width:20px;height:20px;border:2px solid #26a69a;background-color:#26a69a;z-index:0}[type=checkbox].filled-in.tabbed:focus+label:after{border-radius:2px;border-color:#5a5a5a;background-color:rgba(0,0,0,.1)}[type=checkbox].filled-in.tabbed:checked:focus+label:after{border-radius:2px;background-color:#26a69a;border-color:#26a69a}[type=checkbox].filled-in:disabled:not(:checked)+label:before{background-color:transparent;border:2px solid transparent}[type=checkbox].filled-in:disabled:not(:checked)+label:after{border-color:transparent;background-color:#BDBDBD}[type=checkbox].filled-in:disabled:checked+label:before{background-color:transparent}[type=checkbox].filled-in:disabled:checked+label:after{background-color:#BDBDBD;border-color:#BDBDBD}.switch,.switch *{-webkit-user-select:none;-moz-user-select:none;-khtml-user-select:none;-ms-user-select:none}.switch label{cursor:pointer}.switch label input[type=checkbox]{opacity:0;width:0;height:0}.switch label input[type=checkbox]:checked+.lever{background-color:#84c7c1}.switch label input[type=checkbox]:checked+.lever:after{background-color:#26a69a;left:24px}.switch label .lever{content:\"\";display:inline-block;position:relative;width:40px;height:15px;background-color:#818181;border-radius:15px;margin-right:10px;transition:background .3s ease;vertical-align:middle;margin:0 16px}.switch label .lever:after{content:\"\";position:absolute;display:inline-block;width:21px;height:21px;background-color:#F1F1F1;border-radius:21px;box-shadow:0 1px 3px 1px rgba(0,0,0,.4);left:-5px;top:-3px;transition:left .3s ease,background .3s ease,box-shadow .1s ease}input[type=checkbox]:checked:not(:disabled).tabbed:focus~.lever::after,input[type=checkbox]:checked:not(:disabled)~.lever:active::after{box-shadow:0 1px 3px 1px rgba(0,0,0,.4),0 0 0 15px rgba(38,166,154,.1)}input[type=checkbox]:not(:disabled).tabbed:focus~.lever::after,input[type=checkbox]:not(:disabled)~.lever:active:after{box-shadow:0 1px 3px 1px rgba(0,0,0,.4),0 0 0 15px rgba(0,0,0,.08)}.switch input[type=checkbox][disabled]+.lever{cursor:default}.switch label input[type=checkbox][disabled]+.lever:after,.switch label input[type=checkbox][disabled]:checked+.lever:after{background-color:#BDBDBD}select{display:none}select.browser-default{display:block}select{background-color:rgba(255,255,255,.9);width:100%;padding:5px;border:1px solid #f2f2f2;border-radius:2px;height:3rem}.select-label{position:absolute}.select-wrapper{position:relative}.select-wrapper input.select-dropdown{position:relative;cursor:pointer;background-color:transparent;border:none;border-bottom:1px solid #9e9e9e;outline:0;height:3rem;line-height:3rem;width:100%;font-size:1rem;margin:0 0 15px 0;padding:0;display:block}.select-wrapper span.caret{color:initial;position:absolute;right:0;top:16px;font-size:10px}.select-wrapper span.caret.disabled{color:rgba(0,0,0,.26)}.select-wrapper+label{position:absolute;top:-14px;font-size:.8rem}select:disabled{color:rgba(0,0,0,.3)}.select-wrapper input.select-dropdown:disabled{color:rgba(0,0,0,.3);cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;border-bottom:1px solid rgba(0,0,0,.3)}.select-wrapper i{color:rgba(0,0,0,.3)}.select-dropdown li.disabled,.select-dropdown li.disabled>span,.select-dropdown li.optgroup{color:rgba(0,0,0,.3);background-color:transparent}.prefix~.select-wrapper{margin-left:3rem;width:92%;width:calc(100% - 3rem)}.prefix~label{margin-left:3rem}.select-dropdown li img{height:40px;width:40px;margin:5px 15px;float:right}.select-dropdown li.optgroup{border-top:1px solid #eee}.select-dropdown li.optgroup.selected>span{color:rgba(0,0,0,.7)}.select-dropdown li.optgroup>span{color:rgba(0,0,0,.4)}.select-dropdown li.optgroup~li.optgroup-option{padding-left:1rem}.file-field{position:relative}.file-field .file-path-wrapper{overflow:hidden;padding-left:10px}.file-field input.file-path{width:100%}.file-field .btn,.file-field .btn-large{float:left;height:3rem;line-height:3rem}.file-field span{cursor:pointer}.file-field input[type=file]{position:absolute;top:0;right:0;left:0;bottom:0;width:100%;margin:0;padding:0;font-size:20px;cursor:pointer;opacity:0;filter:alpha(opacity=0)}.range-field{position:relative}input[type=range],input[type=range]+.thumb{cursor:pointer}input[type=range]{position:relative;background-color:transparent;border:none;outline:0;width:100%;margin:15px 0;padding:0}input[type=range]:focus{outline:0}input[type=range]+.thumb{position:absolute;border:none;height:0;width:0;border-radius:50%;background-color:#26a69a;top:10px;margin-left:-6px;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}input[type=range]+.thumb .value{display:block;width:30px;text-align:center;color:#26a69a;font-size:0;-webkit-transform:rotate(45deg);transform:rotate(45deg)}input[type=range]+.thumb.active{border-radius:50% 50% 50% 0}input[type=range]+.thumb.active .value{color:#fff;margin-left:-1px;margin-top:8px;font-size:10px}input[type=range]{-webkit-appearance:none}input[type=range]::-webkit-slider-runnable-track{height:3px;background:#c2c0c2;border:none}input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;border:none;height:14px;width:14px;border-radius:50%;background-color:#26a69a;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;margin:-5px 0 0 0;transition:.3s}input[type=range]:focus::-webkit-slider-runnable-track{background:#ccc}input[type=range]{border:1px solid #fff}input[type=range]::-moz-range-track{height:3px;background:#ddd;border:none}input[type=range]::-moz-range-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#26a69a;margin-top:-5px}input[type=range]:-moz-focusring{outline:1px solid #fff;outline-offset:-1px}input[type=range]:focus::-moz-range-track{background:#ccc}input[type=range]::-ms-track{height:3px;background:0 0;border-color:transparent;border-width:6px 0;color:transparent}input[type=range]::-ms-fill-lower{background:#777}input[type=range]::-ms-fill-upper{background:#ddd}input[type=range]::-ms-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#26a69a}input[type=range]:focus::-ms-fill-lower{background:#888}input[type=range]:focus::-ms-fill-upper{background:#ccc}.table-of-contents.fixed{position:fixed}.table-of-contents li{padding:2px 0}.table-of-contents a{display:inline-block;font-weight:300;color:#757575;padding-left:20px;height:1.5rem;line-height:1.5rem;letter-spacing:.4;display:inline-block}.table-of-contents a:hover{color:#a8a8a8;padding-left:19px;border-left:1px solid #ea4a4f}.table-of-contents a.active{font-weight:500;padding-left:18px;border-left:2px solid #ea4a4f}.side-nav{position:fixed;width:240px;left:0;top:0;margin:0;-webkit-transform:translateX(-100%);transform:translateX(-100%);height:100%;height:calc(100% + 60px);height:-moz-calc(100%);padding-bottom:60px;background-color:#fff;z-index:999;-webkit-backface-visibility:hidden;backface-visibility:hidden;overflow-y:auto;will-change:transform;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:translateX(-105%);transform:translateX(-105%)}.side-nav.right-aligned{right:0;-webkit-transform:translateX(105%);transform:translateX(105%);left:auto;-webkit-transform:translateX(100%);transform:translateX(100%)}.side-nav .collapsible{margin:0}.side-nav li{float:none;line-height:64px}.side-nav li.active{background-color:rgba(0,0,0,.05)}.side-nav a{color:#444;display:block;font-size:1rem;height:64px;line-height:64px;padding:0 30px}.side-nav a:hover{background-color:rgba(0,0,0,.05)}.side-nav a.btn,.side-nav a.btn-flat,.side-nav a.btn-floating,.side-nav a.btn-large{margin:10px 15px}.side-nav a.btn,.side-nav a.btn-floating,.side-nav a.btn-large{color:#fff}.side-nav a.btn-flat{color:#343434}.side-nav a.btn-large:hover,.side-nav a.btn:hover{background-color:#2bbbad}.side-nav a.btn-floating:hover{background-color:#26a69a}.drag-target{height:100%;width:10px;position:fixed;top:0;z-index:998}.side-nav.fixed a{display:block;padding:0 30px;color:#444}.side-nav.fixed{left:0;-webkit-transform:translateX(0);transform:translateX(0);position:fixed}.side-nav.fixed.right-aligned{right:0;left:auto}@media only screen and (max-width:992px){.side-nav.fixed{-webkit-transform:translateX(-105%);transform:translateX(-105%)}.side-nav.fixed.right-aligned{-webkit-transform:translateX(105%);transform:translateX(105%)}}.side-nav .collapsible-body li.active,.side-nav.fixed .collapsible-body li.active{background-color:#ee6e73}.side-nav .collapsible-body li.active a,.side-nav.fixed .collapsible-body li.active a{color:#fff}#sidenav-overlay{position:fixed;top:0;left:0;right:0;height:120vh;background-color:rgba(0,0,0,.5);z-index:997;will-change:opacity}.preloader-wrapper{display:inline-block;position:relative;width:48px;height:48px}.preloader-wrapper.small{width:36px;height:36px}.preloader-wrapper.big{width:64px;height:64px}.preloader-wrapper.active{-webkit-animation:container-rotate 1568ms linear infinite;animation:container-rotate 1568ms linear infinite}@-webkit-keyframes container-rotate{to{-webkit-transform:rotate(360deg)}}@keyframes container-rotate{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.spinner-layer{position:absolute;width:100%;height:100%;opacity:0;border-color:#26a69a}.spinner-blue,.spinner-blue-only{border-color:#4285f4}.spinner-red,.spinner-red-only{border-color:#db4437}.spinner-yellow,.spinner-yellow-only{border-color:#f4b400}.spinner-green,.spinner-green-only{border-color:#0f9d58}.active .spinner-layer.spinner-blue{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,blue-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,blue-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both}.active .spinner-layer.spinner-red{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,red-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,red-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both}.active .spinner-layer.spinner-yellow{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,yellow-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,yellow-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both}.active .spinner-layer.spinner-green{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,green-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both,green-fade-in-out 5332ms cubic-bezier(.4,0,.2,1) infinite both}.active .spinner-layer,.active .spinner-layer.spinner-blue-only,.active .spinner-layer.spinner-green-only,.active .spinner-layer.spinner-red-only,.active .spinner-layer.spinner-yellow-only{opacity:1;-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both}@-webkit-keyframes fill-unfill-rotate{12.5%{-webkit-transform:rotate(135deg)}25%{-webkit-transform:rotate(270deg)}37.5%{-webkit-transform:rotate(405deg)}50%{-webkit-transform:rotate(540deg)}62.5%{-webkit-transform:rotate(675deg)}75%{-webkit-transform:rotate(810deg)}87.5%{-webkit-transform:rotate(945deg)}to{-webkit-transform:rotate(1080deg)}}@keyframes fill-unfill-rotate{12.5%{-webkit-transform:rotate(135deg);transform:rotate(135deg)}25%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}37.5%{-webkit-transform:rotate(405deg);transform:rotate(405deg)}50%{-webkit-transform:rotate(540deg);transform:rotate(540deg)}62.5%{-webkit-transform:rotate(675deg);transform:rotate(675deg)}75%{-webkit-transform:rotate(810deg);transform:rotate(810deg)}87.5%{-webkit-transform:rotate(945deg);transform:rotate(945deg)}to{-webkit-transform:rotate(1080deg);transform:rotate(1080deg)}}@-webkit-keyframes blue-fade-in-out{from{opacity:1}25%{opacity:1}26%{opacity:0}89%{opacity:0}90%{opacity:1}100%{opacity:1}}@keyframes blue-fade-in-out{from{opacity:1}25%{opacity:1}26%{opacity:0}89%{opacity:0}90%{opacity:1}100%{opacity:1}}@-webkit-keyframes red-fade-in-out{from{opacity:0}15%{opacity:0}25%{opacity:1}50%{opacity:1}51%{opacity:0}}@keyframes red-fade-in-out{from{opacity:0}15%{opacity:0}25%{opacity:1}50%{opacity:1}51%{opacity:0}}@-webkit-keyframes yellow-fade-in-out{from{opacity:0}40%{opacity:0}50%{opacity:1}75%{opacity:1}76%{opacity:0}}@keyframes yellow-fade-in-out{from{opacity:0}40%{opacity:0}50%{opacity:1}75%{opacity:1}76%{opacity:0}}@-webkit-keyframes green-fade-in-out{from{opacity:0}65%{opacity:0}75%{opacity:1}90%{opacity:1}100%{opacity:0}}@keyframes green-fade-in-out{from{opacity:0}65%{opacity:0}75%{opacity:1}90%{opacity:1}100%{opacity:0}}.gap-patch{position:absolute;top:0;left:45%;width:10%;height:100%;overflow:hidden;border-color:inherit}.gap-patch .circle{width:1000%;left:-450%}.circle-clipper{display:inline-block;position:relative;width:50%;height:100%;overflow:hidden;border-color:inherit}.circle-clipper .circle{width:200%;height:100%;border-width:3px;border-style:solid;border-color:inherit;border-bottom-color:transparent!important;border-radius:50%;-webkit-animation:none;animation:none;position:absolute;top:0;right:0;bottom:0}.circle-clipper.left .circle{left:0;border-right-color:transparent!important;-webkit-transform:rotate(129deg);transform:rotate(129deg)}.circle-clipper.right .circle{left:-100%;border-left-color:transparent!important;-webkit-transform:rotate(-129deg);transform:rotate(-129deg)}.active .circle-clipper.left .circle{-webkit-animation:left-spin 1333ms cubic-bezier(.4,0,.2,1) infinite both;animation:left-spin 1333ms cubic-bezier(.4,0,.2,1) infinite both}.active .circle-clipper.right .circle{-webkit-animation:right-spin 1333ms cubic-bezier(.4,0,.2,1) infinite both;animation:right-spin 1333ms cubic-bezier(.4,0,.2,1) infinite both}@-webkit-keyframes left-spin{from{-webkit-transform:rotate(130deg)}50%{-webkit-transform:rotate(-5deg)}to{-webkit-transform:rotate(130deg)}}@keyframes left-spin{from{-webkit-transform:rotate(130deg);transform:rotate(130deg)}50%{-webkit-transform:rotate(-5deg);transform:rotate(-5deg)}to{-webkit-transform:rotate(130deg);transform:rotate(130deg)}}@-webkit-keyframes right-spin{from{-webkit-transform:rotate(-130deg)}50%{-webkit-transform:rotate(5deg)}to{-webkit-transform:rotate(-130deg)}}@keyframes right-spin{from{-webkit-transform:rotate(-130deg);transform:rotate(-130deg)}50%{-webkit-transform:rotate(5deg);transform:rotate(5deg)}to{-webkit-transform:rotate(-130deg);transform:rotate(-130deg)}}#spinnerContainer.cooldown{-webkit-animation:container-rotate 1568ms linear infinite,fade-out .4s cubic-bezier(.4,0,.2,1);animation:container-rotate 1568ms linear infinite,fade-out .4s cubic-bezier(.4,0,.2,1)}@-webkit-keyframes fade-out{from{opacity:1}to{opacity:0}}@keyframes fade-out{from{opacity:1}to{opacity:0}}.slider{position:relative;height:400px;width:100%}.slider.fullscreen{height:100%;width:100%;position:absolute;top:0;left:0;right:0;bottom:0}.slider.fullscreen ul.slides{height:100%}.slider.fullscreen ul.indicators{z-index:2;bottom:30px}.slider .slides{background-color:#9e9e9e;margin:0;height:400px}.slider .slides li{opacity:0;position:absolute;top:0;left:0;z-index:1;width:100%;height:inherit;overflow:hidden}.slider .slides li img{height:100%;width:100%;background-size:cover;background-position:center}.slider .slides li .caption{color:#fff;position:absolute;top:15%;left:15%;width:70%;opacity:0}.slider .slides li .caption p{color:#e0e0e0}.slider .slides li.active{z-index:2}.slider .indicators{position:absolute;text-align:center;left:0;right:0;bottom:0;margin:0}.slider .indicators .indicator-item{display:inline-block;position:relative;cursor:pointer;height:16px;width:16px;margin:0 12px;background-color:#e0e0e0;transition:background-color .3s;border-radius:50%}.slider .indicators .indicator-item.active{background-color:#4CAF50}.carousel{overflow:hidden;position:relative;width:100%;height:400px;-webkit-perspective:500px;perspective:500px;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-transform-origin:0 50%;transform-origin:0 50%}.carousel .carousel-item{width:200px;position:absolute;top:0;left:0}.carousel .carousel-item img{width:100%}.carousel.carousel-slider{top:0;left:0;height:0}.carousel.carousel-slider .carousel-item{width:100%;height:100%;position:absolute;top:0;left:0}.picker{font-size:16px;text-align:left;line-height:1.2;color:#000;position:absolute;z-index:10000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker__input{cursor:default}.picker__input.picker__input--active{border-color:#0089ec}.picker__holder{width:100%;overflow-y:auto;-webkit-overflow-scrolling:touch}/*!\n * Default mobile-first, responsive styling for pickadate.js\n * Demo: http://amsul.github.io/pickadate.js\n */.picker__frame,.picker__holder{bottom:0;left:0;right:0;top:100%}.picker__holder{position:fixed;transition:background .15s ease-out,top 0s .15s;-webkit-backface-visibility:hidden}.picker__frame{position:absolute;margin:0 auto;min-width:256px;width:300px;max-height:350px;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";filter:alpha(opacity=0);-moz-opacity:0;opacity:0;transition:all .15s ease-out}@media (min-height:28.875em){.picker__frame{overflow:visible;top:auto;bottom:-100%;max-height:80%}}@media (min-height:40.125em){.picker__frame{margin-bottom:7.5%}}.picker__wrap{display:table;width:100%;height:100%}@media (min-height:28.875em){.picker__wrap{display:block}}.picker__box{background:#fff;display:table-cell;vertical-align:middle}@media (min-height:28.875em){.picker__box{display:block;border:1px solid #777;border-top-color:#898989;border-bottom-width:0;border-radius:5px 5px 0 0;box-shadow:0 12px 36px 16px rgba(0,0,0,.24)}}.picker--opened .picker__holder{top:0;background:0 0;-ms-filter:\"progid:DXImageTransform.Microsoft.gradient(startColorstr=#1E000000,endColorstr=#1E000000)\";zoom:1;background:rgba(0,0,0,.32);transition:background .15s ease-out}.picker--opened .picker__frame{top:0;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";filter:alpha(opacity=100);-moz-opacity:1;opacity:1}@media (min-height:35.875em){.picker--opened .picker__frame{top:10%;bottom:auto}}.picker__input.picker__input--active{border-color:#E3F2FD}.picker__frame{margin:0 auto;max-width:325px}@media (min-height:38.875em){.picker--opened .picker__frame{top:10%;bottom:auto}}.picker__box{padding:0 1em}.picker__header{text-align:center;position:relative;margin-top:.75em}.picker__month,.picker__year{display:inline-block;margin-left:.25em;margin-right:.25em}.picker__select--month,.picker__select--year{height:2em;padding:0;margin-left:.25em;margin-right:.25em}.picker__select--month.browser-default{display:inline;background-color:#FFF;width:40%}.picker__select--year.browser-default{display:inline;background-color:#FFF;width:26%}.picker__select--month:focus,.picker__select--year:focus{border-color:rgba(0,0,0,.05)}.picker__nav--next,.picker__nav--prev{position:absolute;padding:.5em 1.25em;width:1em;height:1em;box-sizing:content-box;top:-.25em}.picker__nav--prev{left:-1em;padding-right:1.25em}.picker__nav--next{right:-1em;padding-left:1.25em}.picker__nav--disabled,.picker__nav--disabled:before,.picker__nav--disabled:before:hover,.picker__nav--disabled:hover{cursor:default;background:0 0;border-right-color:#f5f5f5;border-left-color:#f5f5f5}.picker__table{text-align:center;border-collapse:collapse;border-spacing:0;table-layout:fixed;font-size:1rem;width:100%;margin-top:.75em;margin-bottom:.5em}.picker__table td,.picker__table th{text-align:center}.picker__table td{margin:0;padding:0}.picker__weekday{width:14.285714286%;font-size:.75em;padding-bottom:.25em;color:#999;font-weight:500}@media (min-height:33.875em){.picker__weekday{padding-bottom:.5em}}.picker__day--today{position:relative;color:#595959;letter-spacing:-.3;padding:.75rem 0;font-weight:400;border:1px solid transparent}.picker__day--disabled:before{border-top-color:#aaa}.picker__day--infocus:hover{cursor:pointer;color:#000;font-weight:500}.picker__day--outfocus{display:none;padding:.75rem 0;color:#fff}.picker__day--outfocus:hover{cursor:pointer;color:#ddd;font-weight:500}.picker--focused .picker__day--highlighted,.picker__day--highlighted:hover{cursor:pointer}.picker--focused .picker__day--selected,.picker__day--selected,.picker__day--selected:hover{border-radius:50%;-webkit-transform:scale(.75);transform:scale(.75);background:#0089ec;color:#fff}.picker--focused .picker__day--disabled,.picker__day--disabled,.picker__day--disabled:hover{background:#f5f5f5;border-color:#f5f5f5;color:#ddd;cursor:default}.picker__day--highlighted.picker__day--disabled,.picker__day--highlighted.picker__day--disabled:hover{background:#bbb}.picker__footer{text-align:center;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.picker__button--clear,.picker__button--close,.picker__button--today{border:1px solid #fff;background:#fff;font-size:.8em;padding:.66em 0;font-weight:700;width:33%;display:inline-block;vertical-align:bottom}.picker__button--clear:hover,.picker__button--close:hover,.picker__button--today:hover{cursor:pointer;color:#000;background:#b1dcfb;border-bottom-color:#b1dcfb}.picker__button--clear:focus,.picker__button--close:focus,.picker__button--today:focus{background:#b1dcfb;border-color:rgba(0,0,0,.05);outline:0}.picker__button--clear:before,.picker__button--close:before,.picker__button--today:before{position:relative;display:inline-block;height:0}.picker__button--clear:before,.picker__button--today:before{content:\" \";margin-right:.45em}.picker__button--today:before{top:-.05em;width:0;border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker__button--clear:before{top:-.25em;width:.66em;border-top:3px solid #e20}.picker__button--close:before{content:\"\\D7\";top:-.1em;vertical-align:top;font-size:1.1em;margin-right:.35em;color:#777}.picker__button--today[disabled],.picker__button--today[disabled]:hover{background:#f5f5f5;border-color:#f5f5f5;color:#ddd;cursor:default}.picker__button--today[disabled]:before{border-top-color:#aaa}.picker__box{border-radius:2px;overflow:hidden}.picker__date-display{text-align:center;background-color:#26a69a;color:#fff;padding-bottom:15px;font-weight:300}.picker__nav--next:hover,.picker__nav--prev:hover{cursor:pointer;color:#000;background:#a1ded8}.picker__weekday-display{background-color:#1f897f;padding:10px;font-weight:200;letter-spacing:.5;font-size:1rem;margin-bottom:15px}.picker__month-display{text-transform:uppercase;font-size:2rem}.picker__day-display{font-size:4.5rem;font-weight:400}.picker__year-display{font-size:1.8rem;color:rgba(255,255,255,.4)}.picker__box{padding:0}.picker__calendar-container{padding:0 1rem}.picker__calendar-container thead{border:none}.picker__table{margin-top:0;margin-bottom:.5em}.picker__day--infocus{color:#595959;letter-spacing:-.3;padding:.75rem 0;font-weight:400;border:1px solid transparent}.picker__day.picker__day--today{color:#26a69a}.picker__day.picker__day--today.picker__day--selected{color:#fff}.picker__weekday{font-size:.9rem}.picker--focused .picker__day--selected,.picker__day--selected,.picker__day--selected:hover{border-radius:50%;-webkit-transform:scale(.9);transform:scale(.9);background-color:#26a69a;color:#fff}.picker--focused .picker__day--selected.picker__day--outfocus,.picker__day--selected.picker__day--outfocus,.picker__day--selected:hover.picker__day--outfocus{background-color:#a1ded8}.picker__footer{text-align:right;padding:5px 10px}.picker__close,.picker__today{font-size:1.1rem;padding:0 1rem;color:#26a69a}.picker__nav--next:before,.picker__nav--prev:before{content:\" \";border-top:.5em solid transparent;border-bottom:.5em solid transparent;border-right:.75em solid #676767;width:0;height:0;display:block;margin:0 auto}.picker__nav--next:before{border-right:0;border-left:.75em solid #676767}button.picker__clear:focus,button.picker__close:focus,button.picker__today:focus{background-color:#a1ded8}.picker__list{list-style:none;padding:.75em 0 4.2em;margin:0}.picker__list-item{border-bottom:1px solid #ddd;border-top:1px solid #ddd;margin-bottom:-1px;position:relative;background:#fff;padding:.75em 1.25em}@media (min-height:46.75em){.picker__list-item{padding:.5em 1em}}.picker__list-item:hover{cursor:pointer;color:#000;background:#b1dcfb;border-color:#0089ec;z-index:10}.picker__list-item--highlighted{border-color:#0089ec;z-index:10}.picker--focused .picker__list-item--highlighted,.picker__list-item--highlighted:hover{cursor:pointer;color:#000;background:#b1dcfb}.picker--focused .picker__list-item--selected,.picker__list-item--selected,.picker__list-item--selected:hover{background:#0089ec;color:#fff;z-index:10}.picker--focused .picker__list-item--disabled,.picker__list-item--disabled,.picker__list-item--disabled:hover{background:#f5f5f5;border-color:#f5f5f5;color:#ddd;cursor:default;border-color:#ddd;z-index:auto}.picker--time .picker__button--clear{display:block;width:80%;margin:1em auto 0;padding:1em 1.25em;background:0 0;border:0;font-weight:500;font-size:.67em;text-align:center;text-transform:uppercase;color:#666}.picker--time .picker__button--clear:focus,.picker--time .picker__button--clear:hover{color:#000;background:#b1dcfb;background:#e20;border-color:#e20;cursor:pointer;color:#fff;outline:0}.picker--time .picker__button--clear:before{top:-.25em;color:#666;font-size:1.25em;font-weight:700}.picker--time .picker__button--clear:focus:before,.picker--time .picker__button--clear:hover:before{color:#fff}.picker--time .picker__frame{min-width:256px;max-width:320px}.picker--time .picker__box{font-size:1em;background:#f2f2f2;padding:0}@media (min-height:40.125em){.picker--time .picker__box{margin-bottom:5em}}");
//# sourceMappingURL=bundleFinal.js.map