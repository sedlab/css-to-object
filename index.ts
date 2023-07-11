import { cssToObject } from "./dist";

const css = `
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
`;

console.log(cssToObject(css, { numbers: true, camel: true }));