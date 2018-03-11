# wait 

延迟函数, 执行它会返回一个 Promise 

``` js
const E = require('eczn-utils'); 

E.wait(300).then(ok => {
    // 300ms 之后 

    return wait(1000); 
}).then(ok => {
    // 在上面 300ms 的基础上 再加个 1000ms 
}); 

// 不指定参数的时候默认为 300 
wait()
```

