// 1. 导入的是{} 定义的变量
import {flag} from "./aaa.js";

if (flag) {
  console.log('mmm.js 导入了flag')
}

// 2. 直接导入export定义的变量
import {height} from "./aaa.js";

console.log(height);

// 3. 导出函数/类
import {Person} from "./aaa.js";

// 4. 导入export default中的内容
import movie from './aaa.js';

console.log(movie);



// 5. 统一全部导入
import * as bbb from './aaa.js'

console.log(bbb.name);