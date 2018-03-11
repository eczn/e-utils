# mkdir 

就 mkdir 创建文件夹 

以下是源码 

``` js
const fs = require('fs'); 

module.exports = dir => {
	try {
		fs.mkdirSync(dir);
	} catch (e){
		// 忽略错误的 mkdir
	}
}
```
