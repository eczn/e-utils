const fs = require('fs'); 

module.exports = dir => {
	try {
		fs.mkdirSync(dir);
	} catch (e){
		// 忽略错误的 mkdir
	}
}
