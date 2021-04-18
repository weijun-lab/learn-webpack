/*
    1.运行指令
    开发环境：webpack ./src/index.js -o ./build --mode=development;
    生产环境：webpack ./src/index.js -o ./build --mode=production;
    webpack会以./src/index.js为入口文件开始打包，打包后输出到./build/built.js，
    生产环境会将代码压缩，开发环境会格式化代码

    2.webpack可以处理js/json，不能处理css/img等其他资源
*/
import data from "./data.json";
console.log(data)
function add(x,y){
    return x+y;
};
console.log(add(1,2));