// index.js
// 七牛文档参阅 https://developer.qiniu.com/kodo/sdk/1289/nodejs 
const qiniu = require('qiniu')
	, config = new qiniu.conf.Config()
	, wait = require('../wait')

let QINIU_DOMAIN = 'http://喵啦.com'
	, accessKey = '***  deseczn  ***'
	, secretKey = '***  deswan   ***'
	, mac = null
	// , bucketManager = new qiniu.rs.BucketManager(mac, config)
	, bucketManager = null
	, opt = {
		scope: '喵',
		bucket: '啦', 
		expires: 1200, 
	}

// Set Zone 华南区
// 其他的地区 
// https://developer.qiniu.com/kodo/manual/1671/region-endpoint
config.zone = qiniu.zone.Zone_z2; 

/**
 * @description 基本配置 
 * @param { String } _accessKey 
 * @param { String } _secretKey 
 * @param { String } _domain 
 * @param { String } bucket 
 */
function init(_accessKey, _secretKey, _domain, bucket){
	// set ak sk 
	accessKey = _accessKey; 
	secretKey = _secretKey; 

	// scope 
	opt.scope = bucket; 
	opt.bucket = bucket;

	// qiniu domain 
	QINIU_DOMAIN = _domain;

	// mac & bucketManager
	mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
	bucketManager = new qiniu.rs.BucketManager(mac, config)
}

function key2url(key){
	return bucketManager.publicDownloadUrl(QINIU_DOMAIN, key); 
} 

function qiniuToken(){
	let putPolicy = new qiniu.rs.PutPolicy(opt);
	let uploadToken = putPolicy.uploadToken(mac);

	return uploadToken; 
}

/**
 * @description 从本地上传文件 
 * @param { String } localFile 本地文件地址
 * @param { String } key       七牛文件 key 
 * @returns { Promise<Object> } 结果
 */
function upload(localFile, key){
	let token = qiniuToken(); 
	let putExtra = new qiniu.form_up.PutExtra();
	let formUploader = new qiniu.form_up.FormUploader(config);

	return new Promise((res, rej) => {
		formUploader.putFile(
			token, key,
			localFile, putExtra,
			(respErr, respBody, respInfo) => {
				if (respErr) {
					rej(respErr); 
					return ; 
				}

				if (respInfo.statusCode == 200) {
					respBody.url = key2url(respBody.key); 
					res(respBody); 
				} else {
					rej(respBody); 
				}
			}
		);
	})
}

/**
 * @description net 文件抓取 
 * @param { String } target_url 
 * @param { String } key 
 */
function fetch(target_url, key){
	console.log('[ ToFetch ]', target_url); 
	return new Promise((res, rej) => {
		bucketManager.fetch(
			target_url,
			opt.bucket,
			key,
			function(err, respBody, respInfo) {
				if (err) {
					console.log('[ ERROR ] qnx', err);
					rej(err); 
				} else {
					if (respInfo.statusCode === 200) {
						respBody.url = key2url(respBody.key);
					}

					res(respBody); 
				}
			});
	})
}

module.exports = {
	qiniuToken: qiniuToken, 
	upload: upload, 
	fetch: fetch,
	init: init
}
