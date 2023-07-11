# css-to-object

Библиотека для конвертирования CSS в объект JS.

## Установка

`npm install sedlab/css-to-object#latest --save` или `yarn add sedlab/css-to-object#latest`

## Использование

> ES6

```js
import { cssToObject } from "css-to-object";
```

> ES5

```js
const { cssToObject } = require("css-to-object");
```

## Пример

```js
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
`, { numbers: true, camel: true });
```

Результат:

```JSON
{
  "height": 800,
  "backgroundColor": "#f6f4e6",
  "#1233 .class-name": { "height": 800, "backgroundColor": "#f6f4e6" },
  "@media screen and (max-width: 1199px)": {
    "#1233 .class-name": { "height": 800, "backgroundColor": "#f6f4e6" },
    "#1234 .class-name": { "height": 800, "backgroundColor": "#f6f4e6", "width": 100 }
  }
}
```