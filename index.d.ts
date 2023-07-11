type TOpts = {
    numbers?: boolean;
    camel?: boolean;
} | null;

declare const cssToObject: (css: string, opts: TOpts) => Record<string, any>;

export { cssToObject };
