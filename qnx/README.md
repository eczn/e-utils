# qnx 

简单的封装了一些七牛服务。 

1. 上传文件 
2. 文件远程抓取

# Usage 


## qnx.init(AK, SK, DOMAIN, BUCKET)

使用前，应该进行 init 初始化 

``` js
const E = require('eczn-utils'); 
    , { qnx } = E


let ak = 'xxxx';
let sk = 'xxxx'; 
let domain = 'xxxx.cloundcnd.com'; 
let bucket = 'my-bucket'; 

// 初始化 
E.init(ak, sk, domain, bucket); 

```

## qnx.upload(localFile, key) 

该函数上传文件到对象存储空间中（使用前应该先 init）

localFile 为本地文件路径
key 为该文件再对象存储空间的路径 


``` js
// 已经完成了初始化 
let uploading = qnx.upload('./README.md', 'my/readme.md'); 

uploading.then(res => {
    let { hash, key, url } = res; 
    // hash 是文件 hash 
    // key  是文件 key，与 upload 函数的第二个参数一致
    // url  是文件的 url
}); 
```

## qnx.fetch(target_url, key) 

抓取 target_url 到自己的对象存储中。 

target_url 远程文件URL 
key 该文件再对象存储空间的路径

``` js
// 已经完成了初始化 
let fetching = qnx.fetch('https://github.com', 'fetch/github.index.html'); 

fetching.then(res => {
    let { hash, key, url } = res; 
    // hash 是文件 hash 
    // key  是文件 key，与 upload 函数的第二个参数一致
    // url  是文件的 url
}); 
```
