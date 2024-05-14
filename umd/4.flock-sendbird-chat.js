/*!
 * flock-sendbird-chat v0.0.1
 * MIT Licensed
 */
(window["webpackJsonpFlockChat"] = window["webpackJsonpFlockChat"] || []).push([[4],{

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "xmlHttpRequest", function() { return i; });
/* harmony import */ var _bundle_0b1520ed_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
var i=function(i,u){return new Promise((function(p,c){if("undefined"!=typeof XMLHttpRequest){var f=_bundle_0b1520ed_js__WEBPACK_IMPORTED_MODULE_0__[/* V */ "w"].of(i),l=f.dispatcher,h=f.logger,q=u.requestId,g=u.method,v=u.url,w=u.headers,b=void 0===w?{}:w,m=u.data,E=void 0===m?"":m,y=u.uploadProgressHandler,H=!1,S=new XMLHttpRequest;S.open(g,v),Object.keys(b).forEach((function(e){S.setRequestHeader(e,b[e])})),y&&S.upload.addEventListener("progress",(function(e){e.lengthComputable?y(q,e.loaded,e.total):h.debug("Progress computing failed: `Content-Length` header is not given.")})),S.onabort=function(){c(_bundle_0b1520ed_js__WEBPACK_IMPORTED_MODULE_0__[/* s */ "vc"].requestCanceled)},S.onerror=function(e){c(_bundle_0b1520ed_js__WEBPACK_IMPORTED_MODULE_0__[/* s */ "vc"].networkError)},S.onreadystatechange=function(){if(S.readyState===XMLHttpRequest.DONE&&!H)if(0===S.status||S.status>=200&&S.status<400)try{var e=JSON.parse(S.responseText);p(new _bundle_0b1520ed_js__WEBPACK_IMPORTED_MODULE_0__[/* h */ "kc"](i,e))}catch(u){c(_bundle_0b1520ed_js__WEBPACK_IMPORTED_MODULE_0__[/* s */ "vc"].networkError)}else try{var d=JSON.parse(S.responseText);if(d){var u=new _bundle_0b1520ed_js__WEBPACK_IMPORTED_MODULE_0__[/* s */ "vc"](d);if(u.isSessionExpiredError){if(l.dispatch(new _bundle_0b1520ed_js__WEBPACK_IMPORTED_MODULE_0__[/* M */ "n"]({reason:u.code})),!(S instanceof _bundle_0b1520ed_js__WEBPACK_IMPORTED_MODULE_0__[/* bo */ "dc"])){var f=new _bundle_0b1520ed_js__WEBPACK_IMPORTED_MODULE_0__[/* aw */ "Eb"];return l.dispatch(new _bundle_0b1520ed_js__WEBPACK_IMPORTED_MODULE_0__[/* bp */ "ec"]({request:S,deferred:f,error:u})),f.promise}}else u.isSessionInvalidatedError&&l.dispatch(new _bundle_0b1520ed_js__WEBPACK_IMPORTED_MODULE_0__[/* M */ "n"]({reason:u.code}));c(u)}else c(_bundle_0b1520ed_js__WEBPACK_IMPORTED_MODULE_0__[/* s */ "vc"].requestFailed)}catch(u){c(_bundle_0b1520ed_js__WEBPACK_IMPORTED_MODULE_0__[/* s */ "vc"].requestFailed)}},l.on((function(e){e instanceof _bundle_0b1520ed_js__WEBPACK_IMPORTED_MODULE_0__[/* au */ "Cb"]&&(e.requestId&&e.requestId!==q||(H=!0,S.abort()))})),S.send(E)}else c(_bundle_0b1520ed_js__WEBPACK_IMPORTED_MODULE_0__[/* s */ "vc"].xmlHttpRequestNotSupported)}))};


/***/ })

}]);