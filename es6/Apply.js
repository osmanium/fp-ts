import { tuple, pipe } from './function';
function curried(f, n, acc) {
    return function (x) {
        var combined = acc.concat([x]);
        return n === 0 ? f.apply(null, combined) : curried(f, n - 1, combined);
    };
}
var tupleConstructors = {};
function getTupleConstructor(len) {
    if (!tupleConstructors.hasOwnProperty(len)) {
        tupleConstructors[len] = curried(tuple, len - 1, []);
    }
    return tupleConstructors[len];
}
export function sequenceT(F) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var len = args.length;
        var f = getTupleConstructor(len);
        var fas = pipe(args[0], F.map(f));
        for (var i = 1; i < len; i++) {
            fas = pipe(fas, F.ap(args[i]));
        }
        return fas;
    };
}
function getRecordConstructor(keys) {
    var len = keys.length;
    return curried(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var r = {};
        for (var i = 0; i < len; i++) {
            r[keys[i]] = args[i];
        }
        return r;
    }, len - 1, []);
}
export function sequenceS(F) {
    return function (r) {
        var keys = Object.keys(r);
        var len = keys.length;
        var f = getRecordConstructor(keys);
        var fr = pipe(r[keys[0]], F.map(f));
        for (var i = 1; i < len; i++) {
            fr = pipe(fr, F.ap(r[keys[i]]));
        }
        return fr;
    };
}
/* tslint:enable:readonly-array */