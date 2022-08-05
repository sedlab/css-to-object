import { compile } from "stylis";
import { TOpts, TRule, TRules } from "./type";

const parseUnit = (value: string, returnValue: boolean = true, returnUnit: boolean = false) => {
    const match = value.match(/^(0?[-.]?\d+)(r?e[m|x]|v[h|w|min|max]+|p[x|t|c]|[c|m]m|%|s|in|ch)$/);
    const res = match
        ? { value: (parseFloat(match[1]) || match[1]), unit: match[2] }
        : { value, unit: undefined };
    return returnValue ? res.value : returnUnit ? res.unit : res;
};

const parseToCamel = (value: string) => value
  .replace(/(-[a-z])/g, x => x.toUpperCase())
  .replace(/-/g, '');

const parse = (opts: TOpts) => (rules: TRules, result: { [key: string]: any } = {}) => {
    rules.forEach((rule: TRule) => {
        if (Array.isArray(rule.children)) {
            let [key] = rule.props;
            if (rule.type.includes("@media"))
                key = `@media ${key}`;
            const value = parse(opts)(rule.children);
            if (Object.keys(result).includes(key))
                Object.assign(result[key], value);
            else
                result[key] = value;
        } else {
            const key = opts?.camel ? parseToCamel(rule.props) : rule.props;
            const value = opts?.numbers ? parseUnit(rule.children) : rule.children;
            if (Object.keys(result).includes(key))
                Object.assign({ ...result[key] }, value);
            else
                Object.assign(result, { [key]: value });
        }
    });
    return result;
}

export const cssToObject = (css: string, opts: TOpts) => {
    try {
        const wrapped = compile(css);
        const obj = parse(opts)(wrapped);
        return obj;
    } catch (err) {
        console.error("lib css-to-object: ", err);
        return {};
    }
}
