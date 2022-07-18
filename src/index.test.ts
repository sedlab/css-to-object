import { cssToObject } from "./index";

test("cssToObject", () => {
    expect(cssToObject("height: 800px;", { numbers: false })).toEqual({ height: "800px" });
    expect(cssToObject("height: 800px;", { numbers: true })).toEqual({ height: 800 });
    expect(cssToObject(`
        #1233 .class-name{
            height: 800px;
            background-color: #f6f4e6;
        }
    `, { numbers: false })).toEqual({ '#1233 .class-name': { height: "800px", 'background-color': '#f6f4e6' } });
    expect(cssToObject(`
        @media screen and (max-width: 1199px){
            #1233 .class-name{
                height: 800px;
                background-color: #f6f4e6;
            }
        }
        @media screen and (max-width: 1199px){
            #1234 .class-name{
                height: 800px;
                background-color: #f6f4e6;
            }
            #1234 .class-name{
                width: 100%;
            }
        }
    `, { numbers: true })).toEqual({
        '@media screen and (max-width: 1199px)': {
            '#1233 .class-name': { height: 800, 'background-color': '#f6f4e6' },
            '#1234 .class-name': { height: 800, 'background-color': '#f6f4e6', width: 100 }
        }
    });
});