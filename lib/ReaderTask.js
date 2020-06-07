"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monadTaskReaderTask = exports.monadIOReaderTask = exports.monadReaderTask = exports.applicativeReaderTaskSeq = exports.applicativeReaderTaskPar = exports.applyReaderTask = exports.functorReaderTask = exports.map = exports.flatten = exports.chainFirst = exports.chain = exports.apSecond = exports.apFirst = exports.ap = exports.chainTaskK = exports.fromTaskK = exports.chainIOK = exports.fromIOK = exports.asks = exports.ask = exports.getMonoid = exports.getSemigroup = exports.of = exports.fromIO = exports.fromReader = exports.fromTask = exports.URI = void 0;
var function_1 = require("./function");
var R = require("./Reader");
var T = require("./Task");
/**
 * @since 2.3.0
 */
exports.URI = 'ReaderTask';
/**
 * @since 2.3.0
 */
exports.fromTask = 
/*#__PURE__*/
R.of;
/**
 * @since 2.3.0
 */
exports.fromReader = function (ma) { return function_1.flow(ma, T.of); };
/**
 * @since 2.3.0
 */
function fromIO(ma) {
    return exports.fromTask(T.fromIO(ma));
}
exports.fromIO = fromIO;
/**
 * @since 2.3.0
 */
exports.of = function (a) { return function () { return T.of(a); }; };
/**
 * @since 2.3.0
 */
function getSemigroup(S) {
    return R.getSemigroup(T.getSemigroup(S));
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.3.0
 */
function getMonoid(M) {
    return {
        concat: getSemigroup(M).concat,
        empty: exports.of(M.empty)
    };
}
exports.getMonoid = getMonoid;
/**
 * @since 2.3.0
 */
exports.ask = function () { return T.of; };
/**
 * @since 2.3.0
 */
exports.asks = function (f) { return function (r) { return function_1.pipe(T.of(r), T.map(f)); }; };
/**
 * @since 2.4.0
 */
function fromIOK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromIO(f.apply(void 0, a));
    };
}
exports.fromIOK = fromIOK;
/**
 * @since 2.4.0
 */
exports.chainIOK = function (f) {
    return exports.chain(function (a) { return fromIO(f(a)); });
};
/**
 * @since 2.4.0
 */
function fromTaskK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return exports.fromTask(f.apply(void 0, a));
    };
}
exports.fromTaskK = fromTaskK;
/**
 * @since 2.4.0
 */
exports.chainTaskK = function (f) {
    return exports.chain(function (a) { return exports.fromTask(f(a)); });
};
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @since 2.3.0
 */
exports.ap = function (fa) { return function (fab) { return function (r) { return function_1.pipe(fab(r), T.ap(fa(r))); }; }; };
/**
 * @since 2.3.0
 */
exports.apFirst = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function (a) { return function (_) { return a; }; }), exports.ap(fb));
}; };
/**
 * @since 2.3.0
 */
exports.apSecond = function (fb) { return function (fa) {
    return function_1.pipe(fa, exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
}; };
/**
 * @since 2.3.0
 */
exports.chain = function (f) { return function (fa) { return function (r) {
    return function_1.pipe(fa(r), T.chain(function (a) { return f(a)(r); }));
}; }; };
/**
 * @since 2.3.0
 */
exports.chainFirst = function (f) {
    return exports.chain(function (a) {
        return function_1.pipe(f(a), exports.map(function () { return a; }));
    });
};
/**
 * @since 2.3.0
 */
exports.flatten = exports.chain(function_1.identity);
/**
 * @since 2.3.0
 */
exports.map = function (f) { return function (fa) {
    return function_1.flow(fa, T.map(f));
}; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @since 3.0.0
 */
exports.functorReaderTask = {
    URI: exports.URI,
    map: exports.map
};
/**
 * @since 3.0.0
 */
exports.applyReaderTask = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap
};
/**
 * @category instances
 * @since 3.0.0
 */
exports.applicativeReaderTaskPar = {
    URI: exports.URI,
    map: exports.map,
    ap: exports.ap,
    of: exports.of
};
/**
 * @category instances
 * @since 3.0.0
 */
exports.applicativeReaderTaskSeq = {
    URI: exports.URI,
    map: exports.map,
    of: exports.of,
    ap: function (fa) { return function (fab) {
        return function_1.pipe(fab, exports.chain(function (f) { return function_1.pipe(fa, exports.map(f)); }));
    }; }
};
/**
 * @since 3.0.0
 */
exports.monadReaderTask = {
    URI: exports.URI,
    map: exports.map,
    of: exports.of,
    chain: exports.chain
};
/**
 * @since 3.0.0
 */
exports.monadIOReaderTask = {
    URI: exports.URI,
    map: exports.map,
    of: exports.of,
    chain: exports.chain,
    fromIO: fromIO
};
/**
 * @since 3.0.0
 */
exports.monadTaskReaderTask = {
    URI: exports.URI,
    map: exports.map,
    of: exports.of,
    chain: exports.chain,
    fromIO: fromIO,
    fromTask: exports.fromTask
};