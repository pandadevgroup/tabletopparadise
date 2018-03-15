/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/styles/cards/index.scss":
/*!********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/styles/cards/index.scss ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var escape = __webpack_require__(/*! ../../../node_modules/css-loader/lib/url/escape.js */ \"./node_modules/css-loader/lib/url/escape.js\");\nexports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".deck {\\n  width: 125px;\\n  height: 175px;\\n  background-image: url(\" + escape(__webpack_require__(/*! ../../assets/cards/card_back.png */ \"./src/assets/cards/card_back.png\")) + \");\\n  background-size: cover;\\n  background-repeat: no-repeat;\\n  background-position: center;\\n  user-select: none;\\n  -webkit-user-drag: none;\\n  position: relative; }\\n  .deck.actionable {\\n    cursor: pointer;\\n    box-shadow: 0 0 25px lightblue; }\\n    .deck.actionable:hover {\\n      box-shadow: 0 0 20px 5px lightblue; }\\n\\n.card {\\n  width: 125px;\\n  height: 175px;\\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);\\n  position: absolute;\\n  transform-style: preserve-3d; }\\n  .card.actionable {\\n    cursor: pointer;\\n    box-shadow: 0 0 25px lightblue; }\\n    .card.actionable:hover {\\n      box-shadow: 0 0 20px 5px lightblue; }\\n  .card .card__front {\\n    position: absolute;\\n    width: 125px;\\n    height: 175px;\\n    user-select: none;\\n    -webkit-user-drag: none;\\n    backface-visibility: hidden; }\\n  .card .card__back {\\n    position: absolute;\\n    width: 125px;\\n    height: 175px;\\n    transform: rotateX(180deg);\\n    user-select: none;\\n    -webkit-user-drag: none;\\n    backface-visibility: hidden; }\\n  .card--hidden {\\n    display: none; }\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/styles/cards/index.scss?./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/styles/index.scss":
/*!**************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/styles/index.scss ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".gameboard {\\n  width: 100%;\\n  height: 100%;\\n  background-image: radial-gradient(50% 38%, #53c230, #138300); }\\n\\nhtml, body {\\n  height: 100%; }\\n\\nbody {\\n  margin: 0; }\\n\\n.hidden {\\n  /*keep space for debugging. In production, use display:none; */\\n  visibility: hidden; }\\n\\n#info-tray {\\n  position: fixed;\\n  bottom: 0;\\n  right: 0; }\\n  #info-tray #info-tray-body {\\n    padding: 10px; }\\n    #info-tray #info-tray-body a.icon-link {\\n      color: #000000; }\\n    #info-tray #info-tray-body a.icon-link:hover {\\n      color: #262626; }\\n    #info-tray #info-tray-body a:not(.icon-link) {\\n      color: #007bff;\\n      text-decoration: none;\\n      background-color: transparent;\\n      -webkit-text-decoration-skip: objects; }\\n    #info-tray #info-tray-body a:not(.icon-link):hover {\\n      color: #0056b3;\\n      text-decoration: underline; }\\n    #info-tray #info-tray-body span, #info-tray #info-tray-body p, #info-tray #info-tray-body a {\\n      font-family: Arial, Helvetica, sans-serif; }\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/styles/index.scss?./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js");

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function(useSourceMap) {\n\tvar list = [];\n\n\t// return the list of modules as css string\n\tlist.toString = function toString() {\n\t\treturn this.map(function (item) {\n\t\t\tvar content = cssWithMappingToString(item, useSourceMap);\n\t\t\tif(item[2]) {\n\t\t\t\treturn \"@media \" + item[2] + \"{\" + content + \"}\";\n\t\t\t} else {\n\t\t\t\treturn content;\n\t\t\t}\n\t\t}).join(\"\");\n\t};\n\n\t// import a list of modules into the list\n\tlist.i = function(modules, mediaQuery) {\n\t\tif(typeof modules === \"string\")\n\t\t\tmodules = [[null, modules, \"\"]];\n\t\tvar alreadyImportedModules = {};\n\t\tfor(var i = 0; i < this.length; i++) {\n\t\t\tvar id = this[i][0];\n\t\t\tif(typeof id === \"number\")\n\t\t\t\talreadyImportedModules[id] = true;\n\t\t}\n\t\tfor(i = 0; i < modules.length; i++) {\n\t\t\tvar item = modules[i];\n\t\t\t// skip already imported module\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\n\t\t\t//  when a module is imported multiple times with different media queries.\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\n\t\t\t\tif(mediaQuery && !item[2]) {\n\t\t\t\t\titem[2] = mediaQuery;\n\t\t\t\t} else if(mediaQuery) {\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\n\t\t\t\t}\n\t\t\t\tlist.push(item);\n\t\t\t}\n\t\t}\n\t};\n\treturn list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n\tvar content = item[1] || '';\n\tvar cssMapping = item[3];\n\tif (!cssMapping) {\n\t\treturn content;\n\t}\n\n\tif (useSourceMap && typeof btoa === 'function') {\n\t\tvar sourceMapping = toComment(cssMapping);\n\t\tvar sourceURLs = cssMapping.sources.map(function (source) {\n\t\t\treturn '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'\n\t\t});\n\n\t\treturn [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n\t}\n\n\treturn [content].join('\\n');\n}\n\n// Adapted from convert-source-map (MIT)\nfunction toComment(sourceMap) {\n\t// eslint-disable-next-line no-undef\n\tvar base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n\tvar data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n\n\treturn '/*# ' + data + ' */';\n}\n\n\n//# sourceURL=webpack:///./node_modules/css-loader/lib/css-base.js?");

/***/ }),

/***/ "./node_modules/css-loader/lib/url/escape.js":
/*!***************************************************!*\
  !*** ./node_modules/css-loader/lib/url/escape.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function escape(url) {\n    if (typeof url !== 'string') {\n        return url\n    }\n    // If url is already wrapped in quotes, remove them\n    if (/^['\"].*['\"]$/.test(url)) {\n        url = url.slice(1, -1);\n    }\n    // Should url be wrapped?\n    // See https://drafts.csswg.org/css-values-3/#urls\n    if (/[\"'() \\t\\n]/.test(url)) {\n        return '\"' + url.replace(/\"/g, '\\\\\"').replace(/\\n/g, '\\\\n') + '\"'\n    }\n\n    return url\n}\n\n\n//# sourceURL=webpack:///./node_modules/css-loader/lib/url/escape.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getTarget = function (target) {\n  return document.querySelector(target);\n};\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(target) {\n                // If passing function in options, then use it for resolve \"head\" element.\n                // Useful for Shadow Root style i.e\n                // {\n                //   insertInto: function () { return document.querySelector(\"#foo\").shadowRoot }\n                // }\n                if (typeof target === 'function') {\n                        return target();\n                }\n                if (typeof memo[target] === \"undefined\") {\n\t\t\tvar styleTarget = getTarget.call(this, target);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[target] = styleTarget;\n\t\t}\n\t\treturn memo[target]\n\t};\n})();\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== \"boolean\") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n        if (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === \"object\" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertInto + \" \" + options.insertAt.before);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error(\"[Style Loader]\\n\\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\\n Must be 'top', 'bottom', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\toptions.attrs.type = \"text/css\";\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\toptions.attrs.type = \"text/css\";\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = options.transform(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/|\\s*$)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/urls.js?");

/***/ }),

/***/ "./src/assets/cards/card_back.png":
/*!****************************************!*\
  !*** ./src/assets/cards/card_back.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"257e812611d1030aa4246c59e4961a06.png\";\n\n//# sourceURL=webpack:///./src/assets/cards/card_back.png?");

/***/ }),

/***/ "./src/card-game/card.ts":
/*!*******************************!*\
  !*** ./src/card-game/card.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Card = /** @class */ (function () {\n    function Card(domHelper, parent, number, suit, index, visible) {\n        if (visible === void 0) { visible = true; }\n        this.domHelper = domHelper;\n        this.parent = parent;\n        this.number = number;\n        this.suit = suit;\n        this.index = index;\n        this.visible = visible;\n        this.$card = domHelper.createCardFrag(this.getImgName(), visible);\n    }\n    Card.prototype.resize = function () {\n        var positionInfo = this.parent.getCardPosition(this.index);\n        this.domHelper.resizeEl(this.$card, {\n            translateX: positionInfo.translateX,\n            translateY: positionInfo.translateY\n        });\n        this.domHelper.setElStyles(this.$card, {\n            zIndex: positionInfo.zIndex,\n            rotateX: positionInfo.rotateX\n        });\n    };\n    Card.prototype.setParent = function (parent) {\n        this.parent = parent;\n    };\n    Card.prototype.setVisible = function (visible) {\n        this.visible = visible;\n        if (this.visible)\n            this.$card.removeClass(\"card--hidden\");\n        else\n            this.$card.addClass(\"card--hidden\");\n    };\n    Card.prototype.getImgName = function () {\n        if (this.number <= 10) {\n            return this.suit + \"s/\" + this.number + this.suit[0];\n        }\n        else {\n            var names = [\"j\", \"q\", \"k\"];\n            return this.suit + \"s/\" + names[this.number - 11] + this.suit[0];\n        }\n    };\n    Card.prototype.toString = function () {\n        return this.number + \" of \" + this.suit + \"s\";\n    };\n    //constants for better readibility\n    Card.ACE = 1;\n    Card.JACK = 11;\n    Card.QUEEN = 12;\n    Card.KING = 13;\n    Card.faceCards = [Card.JACK, Card.QUEEN, Card.KING];\n    Card.CLUB = \"club\";\n    Card.DIAMOND = \"diamond\";\n    Card.HEART = \"heart\";\n    Card.SPADE = \"spade\";\n    Card.suits = [Card.CLUB, Card.DIAMOND, Card.HEART, Card.SPADE];\n    return Card;\n}());\nexports.Card = Card;\n\n\n//# sourceURL=webpack:///./src/card-game/card.ts?");

/***/ }),

/***/ "./src/card-game/deck.ts":
/*!*******************************!*\
  !*** ./src/card-game/deck.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar card_1 = __webpack_require__(/*! ./card */ \"./src/card-game/card.ts\");\nvar Deck = /** @class */ (function () {\n    function Deck(domHelper, game, visible) {\n        this.domHelper = domHelper;\n        this.game = game;\n        this.visible = visible;\n        this.clickListeners = [];\n        this._actionable = false;\n        this.initialize();\n    }\n    Object.defineProperty(Deck.prototype, \"actionable\", {\n        get: function () {\n            return this._actionable;\n        },\n        set: function (actionable) {\n            this._actionable = actionable;\n            if (actionable && this.$deck)\n                this.$deck.addClass(\"actionable\");\n            else if (this.$deck)\n                this.$deck.removeClass(\"actionable\");\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Deck.prototype, \"cards\", {\n        get: function () {\n            return this._cards;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Deck.prototype.get = function (numCards) {\n        if (numCards > this.cards.length)\n            throw \"Not enough cards in deck\";\n        return this._cards.splice(0, numCards);\n    };\n    Deck.prototype.getCardPosition = function (index) {\n        return {\n            translateX: Math.round(this.game.tabletop.width / 2 - this.game.layoutOpts.cardWidth / 2),\n            translateY: Math.round(this.game.tabletop.height / 2 - this.game.layoutOpts.cardHeight / 2),\n            rotateX: 180,\n            zIndex: undefined\n        };\n    };\n    Deck.prototype.shuffle = function (algorithm) {\n        if (algorithm === void 0) { algorithm = function (array) {\n            // Fisher-yates shuffle\n            // based on algorithm(them minified) from: https://bost.ocks.org/mike/shuffle/ | https://web.archive.org/web/20180311033149/https://bost.ocks.org/mike/shuffle/\n            for (var t, i, m = array.length; m;)\n                (i = Math.floor(Math.random() * m--)), (t = array[m]), (array[m] = array[i]), (array[i] = t);\n            return array;\n        }; }\n        this._cards = algorithm(this._cards);\n        return this;\n    };\n    Deck.prototype.resize = function () {\n        this.domHelper.resizeEl(this.$deck, this.getCardPosition());\n        this._cards.forEach(function (card) { return card.resize(); });\n        return this;\n    };\n    Deck.prototype.onClick = function (callback) {\n        this.clickListeners.push(callback);\n        return this;\n    };\n    Deck.prototype.initialize = function () {\n        var _this = this;\n        this._cards = [];\n        for (var i = 0; i < 13; i++) {\n            this._cards.push(new card_1.Card(this.domHelper, this, i + 1, \"club\", this._cards.length, false));\n            this._cards.push(new card_1.Card(this.domHelper, this, i + 1, \"diamond\", this._cards.length, false));\n            this._cards.push(new card_1.Card(this.domHelper, this, i + 1, \"heart\", this._cards.length, false));\n            this._cards.push(new card_1.Card(this.domHelper, this, i + 1, \"spade\", this._cards.length, false));\n        }\n        if (this.visible) {\n            this.$deck = this.domHelper.createDeckFrag();\n            this.$deck.click(function () { return _this.actionable\n                ? _this.clickListeners.forEach(function (listener) { return listener(); })\n                : undefined; });\n        }\n        return this;\n    };\n    return Deck;\n}());\nexports.Deck = Deck;\n\n\n//# sourceURL=webpack:///./src/card-game/deck.ts?");

/***/ }),

/***/ "./src/card-game/dom-helper.ts":
/*!*************************************!*\
  !*** ./src/card-game/dom-helper.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = Object.setPrototypeOf ||\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar dom_helper_1 = __webpack_require__(/*! ../tabletop/dom-helper */ \"./src/tabletop/dom-helper.ts\");\nvar CardGameDomHelper = /** @class */ (function (_super) {\n    __extends(CardGameDomHelper, _super);\n    function CardGameDomHelper() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    CardGameDomHelper.prototype.createDeckFrag = function () {\n        var $deck = $(\"\\n\\t\\t\\t<div class=\\\"deck\\\"></div>\\n\\t\\t\");\n        this.$frag.append($deck);\n        return $deck;\n    };\n    CardGameDomHelper.prototype.createCardFrag = function (cardImgUrl, visible) {\n        var $card = $(\"\\n\\t\\t\\t<div class=\\\"card \" + (visible ? \"\" : \"card--hidden\") + \"\\\">\\n\\t\\t\\t\\t<img class=\\\"card__front\\\" src=\\\"/assets/cards/\" + cardImgUrl + \".svg\\\">\\n\\t\\t\\t\\t<img class=\\\"card__back\\\" src=\\\"/assets/cards/card_back.png\\\">\\n\\t\\t\\t</div>\\n\\t\\t\");\n        this.$frag.append($card);\n        return $card;\n    };\n    return CardGameDomHelper;\n}(dom_helper_1.DomHelper));\nexports.CardGameDomHelper = CardGameDomHelper;\n\n\n//# sourceURL=webpack:///./src/card-game/dom-helper.ts?");

/***/ }),

/***/ "./src/card-game/index.ts":
/*!********************************!*\
  !*** ./src/card-game/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar tabletop_1 = __webpack_require__(/*! ../tabletop */ \"./src/tabletop/index.ts\");\nvar player_1 = __webpack_require__(/*! ./player */ \"./src/card-game/player.ts\");\nvar deck_1 = __webpack_require__(/*! ./deck */ \"./src/card-game/deck.ts\");\n__webpack_require__(/*! ../styles/cards/index.scss */ \"./src/styles/cards/index.scss\");\nvar dom_helper_1 = __webpack_require__(/*! ./dom-helper */ \"./src/card-game/dom-helper.ts\");\nvar CardGame = /** @class */ (function () {\n    function CardGame($container, opts) {\n        this.$container = $container;\n        this.opts = opts;\n        this.layoutOpts = {\n            cardWidth: 125,\n            cardHeight: 175,\n            playerPadding: 20,\n            cardSpacing: 30\n        };\n        this.domHelper = new dom_helper_1.CardGameDomHelper(this.$container);\n        this.tabletop = new tabletop_1.Tabletop($container, {\n            players: opts.players\n        }, this.domHelper);\n        this.initializeDom();\n        this.initializePlayers();\n        this.initializeDeck();\n        this.resize();\n        this.domHelper.renderFrag();\n        this.startGame();\n    }\n    CardGame.prototype.initializeDom = function () {\n        var _this = this;\n        var debounce;\n        $(window).resize(function () {\n            clearTimeout(debounce);\n            debounce = setTimeout(function () { return _this.resize(); }, 200);\n        });\n    };\n    CardGame.prototype.initializeDeck = function () {\n        var _this = this;\n        this.deck = new deck_1.Deck(this.domHelper, this, this.opts.showDeck);\n        if (this.opts.shuffle !== false)\n            this.deck.shuffle(typeof this.opts.shuffle === \"boolean\" ? undefined : this.opts.shuffle);\n        this.dealInitialCards();\n        if (this.opts.showDeck)\n            this.deck.actionable = true;\n        this.deck.onClick(function () { return _this.onDeckClick(); });\n    };\n    CardGame.prototype.resize = function () {\n        this.tabletop.resize();\n        if (this.opts.showDeck)\n            this.deck.resize();\n        this.players.forEach(function (player) { return player.resize(); });\n    };\n    CardGame.prototype.dealInitialCards = function () {\n        var _this = this;\n        this.players.forEach(function (player) { return player.addCards(_this.deck.get(_this.opts.initialHandSize)); });\n    };\n    CardGame.prototype.initializePlayers = function () {\n        this.players = [];\n        for (var i = 0; i < this.opts.players; i++) {\n            this.players.push(new player_1.CardGamePlayer(this.domHelper, this, \"Player \" + (i + 1)));\n        }\n    };\n    CardGame.prototype.drawCard = function (player) {\n        player.addCards(this.deck.get(1));\n        if (this.deck.cards.length === 0)\n            this.deck.actionable = false;\n        player.resize();\n    };\n    CardGame.prototype.onDeckClick = function () { };\n    return CardGame;\n}());\nexports.CardGame = CardGame;\n__export(__webpack_require__(/*! ./card */ \"./src/card-game/card.ts\"));\n__export(__webpack_require__(/*! ./deck */ \"./src/card-game/deck.ts\"));\n__export(__webpack_require__(/*! ./player */ \"./src/card-game/player.ts\"));\n\n\n//# sourceURL=webpack:///./src/card-game/index.ts?");

/***/ }),

/***/ "./src/card-game/player.ts":
/*!*********************************!*\
  !*** ./src/card-game/player.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar utils_1 = __webpack_require__(/*! ./utils */ \"./src/card-game/utils.ts\");\nvar CardGamePlayer = /** @class */ (function () {\n    function CardGamePlayer(domHelper, game, name) {\n        this.domHelper = domHelper;\n        this.game = game;\n        this.name = name;\n        this.cards = [];\n    }\n    CardGamePlayer.prototype.resize = function () {\n        this.cards.forEach(function (card) { return card.resize(); });\n    };\n    CardGamePlayer.prototype.getCardPosition = function (index) {\n        var tbl = this.game.tabletop;\n        var opts = this.game.layoutOpts;\n        var left = Math.round(tbl.width / 2 - opts.cardWidth / 2 - (opts.cardSpacing * (this.cards.length - 1)) / 2);\n        return {\n            translateX: left + opts.cardSpacing * index,\n            translateY: tbl.height - opts.cardHeight - opts.playerPadding,\n            rotateX: 0,\n            zIndex: index\n        };\n    };\n    CardGamePlayer.prototype.addCards = function (cards) {\n        var _this = this;\n        this.cards = this.cards.concat(cards);\n        utils_1.CardUtils.sortCards(this.cards);\n        this.cards.forEach(function (card, i) {\n            card.index = i;\n            card.setParent(_this);\n            card.setVisible(true);\n        });\n    };\n    return CardGamePlayer;\n}());\nexports.CardGamePlayer = CardGamePlayer;\n\n\n//# sourceURL=webpack:///./src/card-game/player.ts?");

/***/ }),

/***/ "./src/card-game/utils.ts":
/*!********************************!*\
  !*** ./src/card-game/utils.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar card_1 = __webpack_require__(/*! ./card */ \"./src/card-game/card.ts\");\nvar CardUtils = /** @class */ (function () {\n    function CardUtils() {\n    }\n    CardUtils.sortCards = function (cards, compare, suitValueSystem, numberValueSystem) {\n        if (suitValueSystem === void 0) { suitValueSystem = CardUtils.DEFUALT_SUIT_VALUE_SYSTEM; }\n        if (numberValueSystem === void 0) { numberValueSystem = CardUtils.DEFUALT_NUMBER_VALUE_SYSTEM; }\n        if (typeof compare == \"function\") {\n            // Use given function\n            cards.sort(compare);\n        }\n        else if (compare == CardUtils.COMPARE_BY_SUIT) {\n            // Sort cards based on suit, then value\n            cards.sort(function (a, b) {\n                if (a.suit == b.suit) {\n                    // if a is higher, return a negative number\n                    // if a and b are equal, return 0\n                    // if b is higher, return a positive number\n                    return numberValueSystem.indexOf(b.number) - numberValueSystem.indexOf(a.number);\n                }\n                else {\n                    return suitValueSystem.indexOf(b.suit) - suitValueSystem.indexOf(a.suit);\n                }\n            });\n        }\n        else {\n            // Sort cards based on numbers, then suit\n            cards.sort(function (a, b) {\n                if (a.number == b.number) {\n                    return suitValueSystem.indexOf(b.suit) - suitValueSystem.indexOf(a.suit);\n                }\n                else {\n                    return numberValueSystem.indexOf(b.number) - numberValueSystem.indexOf(a.number);\n                }\n            });\n        }\n    };\n    // (group by suit -- lowest to highest: clubs, diamonds, hearts, spades), then group by number within suits\n    CardUtils.COMPARE_BY_SUIT = \"suit\";\n    // (group by number -- lowest to highest: 2, 3 ... 10, j, q, k, ace/1), then group by suit within numbers\n    CardUtils.COMPARE_BY_VALUE = \"value\";\n    CardUtils.DEFUALT_SUIT_VALUE_SYSTEM = [card_1.Card.CLUB, card_1.Card.DIAMOND, card_1.Card.HEART, card_1.Card.SPADE];\n    CardUtils.DEFUALT_NUMBER_VALUE_SYSTEM = [2, 3, 4, 5, 6, 7, 8, 9, 10, card_1.Card.JACK, card_1.Card.QUEEN, card_1.Card.KING, card_1.Card.ACE];\n    return CardUtils;\n}());\nexports.CardUtils = CardUtils;\n\n\n//# sourceURL=webpack:///./src/card-game/utils.ts?");

/***/ }),

/***/ "./src/games/drawing-cards/index.ts":
/*!******************************************!*\
  !*** ./src/games/drawing-cards/index.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = Object.setPrototypeOf ||\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar card_game_1 = __webpack_require__(/*! ../../card-game */ \"./src/card-game/index.ts\");\nvar DrawingCardsGame = /** @class */ (function (_super) {\n    __extends(DrawingCardsGame, _super);\n    function DrawingCardsGame(container) {\n        var _this = _super.call(this, container, {\n            players: 1,\n            initialHandSize: 13,\n            showDeck: true\n        }) || this;\n        _this.container = container;\n        return _this;\n    }\n    DrawingCardsGame.prototype.onDeckClick = function () {\n        this.drawCard(this.players[0]);\n    };\n    DrawingCardsGame.prototype.startGame = function () {\n        this.deck.actionable = true;\n    };\n    return DrawingCardsGame;\n}(card_game_1.CardGame));\nexports.DrawingCardsGame = DrawingCardsGame;\n\n\n//# sourceURL=webpack:///./src/games/drawing-cards/index.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar drawing_cards_1 = __webpack_require__(/*! ./games/drawing-cards */ \"./src/games/drawing-cards/index.ts\");\nvar tabletop = new drawing_cards_1.DrawingCardsGame($(\"#game\"));\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/styles/cards/index.scss":
/*!*************************************!*\
  !*** ./src/styles/cards/index.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./index.scss */ \"./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/styles/cards/index.scss\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/styles/cards/index.scss?");

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/sass-loader/lib/loader.js!./index.scss */ \"./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/styles/index.scss\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/styles/index.scss?");

/***/ }),

/***/ "./src/tabletop/dom-helper.ts":
/*!************************************!*\
  !*** ./src/tabletop/dom-helper.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || Object.assign || function(t) {\n    for (var s, i = 1, n = arguments.length; i < n; i++) {\n        s = arguments[i];\n        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n            t[p] = s[p];\n    }\n    return t;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar DomHelper = /** @class */ (function () {\n    function DomHelper($container) {\n        this.$container = $container;\n        this.$frag = $(document.createDocumentFragment());\n    }\n    DomHelper.prototype.resizeEl = function ($el, options) {\n        var defaultOpts = {\n            translateZ: 0,\n        };\n        $el.velocity(__assign({}, defaultOpts, options), {\n            duration: 200\n        });\n    };\n    DomHelper.prototype.setElStyles = function ($el, styles) {\n        $el.css(styles);\n    };\n    DomHelper.prototype.renderFrag = function () {\n        this.$container.append(this.$frag);\n    };\n    return DomHelper;\n}());\nexports.DomHelper = DomHelper;\n\n\n//# sourceURL=webpack:///./src/tabletop/dom-helper.ts?");

/***/ }),

/***/ "./src/tabletop/index.ts":
/*!*******************************!*\
  !*** ./src/tabletop/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! ../styles/index.scss */ \"./src/styles/index.scss\");\nvar TabletopOptions = /** @class */ (function () {\n    function TabletopOptions() {\n    }\n    return TabletopOptions;\n}());\nexports.TabletopOptions = TabletopOptions;\nvar Tabletop = /** @class */ (function () {\n    function Tabletop($container, opts, domHelper) {\n        this.$container = $container;\n        this.opts = opts;\n        this.domHelper = domHelper;\n        this.width = 1080;\n        this.height = 720;\n    }\n    Tabletop.prototype.resize = function () {\n        this.width = this.$container.width(),\n            this.height = this.$container.height();\n    };\n    return Tabletop;\n}());\nexports.Tabletop = Tabletop;\n\n\n//# sourceURL=webpack:///./src/tabletop/index.ts?");

/***/ })

/******/ });