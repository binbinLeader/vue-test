
// 1. 使用commonjs的模块化规范
const {add} = require('./js/mathUtils')

console.log(add(10, 20));

// 2. 使用ES6的模块化规范
import {name, age} from "./js/info";

console.log(name, ':', age);

// 3. 依赖css文件, 这个文件只需要依赖, 不需要定义变量
require('./css/index.css');

// ES6转换成ES5
// npm install babel-loader@7 babel-core babel-preset-es2015 --save-dev