# css-to-object

Библиотека для конвертирования CSS в объект JS.

## Установка
> YARN

	yarn add dsedinkin/css-to-object#latest
> NPM

	npm i -s dsedinkin/css-to-object#latest

## Использование

> **es6**

```ts
import { cssToObject } from "css-to-object";

cssToObject(`
    height: 800px;
    background-color: #f6f4e6;
    #1233 .class-name {
        height: 800px;
        background-color: #f6f4e6;
    }
    @media screen and (max-width: 1199px) {
        #1233 .class-name {
            height: 800px;
            background-color: #f6f4e6;
        }
    }
    @media screen and (max-width: 1199px) {
        #1234 .class-name {
            height: 800px;
            background-color: #f6f4e6;
        }
        #1234 .class-name {
            width: 100%;
        }
    }
`, { numbers: true });
/*
{
  height: 800,
  'background-color': '#f6f4e6',
  '#1233 .class-name': { height: 800, 'background-color': '#f6f4e6' },
  '@media screen and (max-width: 1199px)': {
    '#1233 .class-name': { height: 800, 'background-color': '#f6f4e6' },
    '#1234 .class-name': { height: 800, 'background-color': '#f6f4e6', width: 100 }
  }
}
*/

```

> **es5**

```js
const { cssToObject } = require("css-to-object");

cssToObject(`
    height: 800px;
    background-color: #f6f4e6;
    #1233 .class-name {
        height: 800px;
        background-color: #f6f4e6;
    }
    @media screen and (max-width: 1199px) {
        #1233 .class-name {
            height: 800px;
            background-color: #f6f4e6;
        }
    }
    @media screen and (max-width: 1199px) {
        #1234 .class-name {
            height: 800px;
            background-color: #f6f4e6;
        }
        #1234 .class-name {
            width: 100%;
        }
    }
`, { numbers: true });
/*
{
  height: 800,
  'background-color': '#f6f4e6',
  '#1233 .class-name': { height: 800, 'background-color': '#f6f4e6' },
  '@media screen and (max-width: 1199px)': {
    '#1233 .class-name': { height: 800, 'background-color': '#f6f4e6' },
    '#1234 .class-name': { height: 800, 'background-color': '#f6f4e6', width: 100 }
  }
}
*/
```
