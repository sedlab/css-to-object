import { compile } from 'stylis';

const parseUnit = (value, returnValue = true, returnUnit = false) => {
  const match = value.match(/^(0?[-.]?\d+)(r?e[m|x]|v[h|w|min|max]+|p[x|t|c]|[c|m]m|%|s|in|ch)$/);
  const res = match ? { value: parseFloat(match[1]) || match[1], unit: match[2] } : { value, unit: void 0 };
  return returnValue ? res.value : returnUnit ? res.unit : res;
};
const parseToCamel = (value) => value.replace(/(-[a-z])/g, (x) => x.toUpperCase()).replace(/-/g, "");
const parse = (opts) => (rules, result = {}) => {
  rules.forEach((rule) => {
    if (Array.isArray(rule.children)) {
      let [key] = rule.props;
      if (rule.type.includes("@media")) {
        key = `@media ${key}`;
      }
      const value = parse(opts)(rule.children);
      if (Object.keys(result).includes(key)) {
        Object.assign(result[key], value);
      } else {
        result[key] = value;
      }
    } else {
      const key = opts?.camel ? parseToCamel(rule.props) : rule.props;
      const value = opts?.numbers ? parseUnit(rule.children) : rule.children;
      if (Object.keys(result).includes(key)) {
        Object.assign({ ...result[key] }, value);
      } else {
        Object.assign(result, { [key]: value });
      }
    }
  });
  return result;
};
const cssToObject = (css, opts) => {
  try {
    const wrapped = compile(css);
    const obj = parse(opts)(wrapped);
    return obj;
  } catch (err) {
    console.error("lib css-to-object: ", err);
    return {};
  }
};

export { cssToObject };
