import { TOpts } from "./type";
export declare const parseUnit: (value: string, returnValue?: boolean, returnUnit?: boolean) => string | number | {
    value: string | number;
    unit: string;
} | {
    value: string;
    unit: undefined;
} | undefined;
export declare const cssToObject: (css: string, opts: TOpts) => {
    [key: string]: any;
};
