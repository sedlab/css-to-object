"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssToObject = exports.parseUnit = void 0;
const stylis_1 = require("stylis");
const parseUnit = (value, returnValue = true, returnUnit = false) => {
    const match = value.match(/^(0?[-.]?\d+)(r?e[m|x]|v[h|w|min|max]+|p[x|t|c]|[c|m]m|%|s|in|ch)$/);
    const res = match
        ? { value: (parseFloat(match[1]) || match[1]), unit: match[2] }
        : { value, unit: undefined };
    return returnValue ? res.value : returnUnit ? res.unit : res;
};
exports.parseUnit = parseUnit;
const parse = (opts) => (rules, result = {}) => {
    rules.forEach((rule) => {
        if (Array.isArray(rule.children)) {
            let [key] = rule.props;
            if (rule.type.includes("@media"))
                key = `@media ${key}`;
            const value = parse(opts)(rule.children);
            if (Object.keys(result).includes(key))
                Object.assign(result[key], value);
            else
                result[key] = value;
        }
        else {
            const key = rule.props;
            const value = rule.children;
            if (Object.keys(result).includes(key))
                Object.assign(result[key], opts?.numbers ? (0, exports.parseUnit)(value) : value);
            else
                Object.assign(result, { [key]: opts?.numbers ? (0, exports.parseUnit)(value) : value });
        }
    });
    return result;
};
const cssToObject = (css, opts) => {
    try {
        const wrapped = (0, stylis_1.compile)(css);
        const obj = parse(opts)(wrapped);
        return obj;
    }
    catch (err) {
        console.error("lib css-to-object: ", err);
        return {};
    }
};
exports.cssToObject = cssToObject;
