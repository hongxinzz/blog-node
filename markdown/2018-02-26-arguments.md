---
##title:函数参数与强大的Arguments-title
##introduction:arguments对象是所有（非箭头）函数中都可用的局部变量。你可以使用arguments对象在函数中引用函数的参数。-introduction
##time:2018-02-26-time
##cover:http://static.runoob.com/images/mix/rfwDB3L.png-cover
##tags:javaScript-tags
---

##content:
arguments对象是所有（非箭头）函数中都可用的局部变量。
你可以使用arguments对象在函数中引用函数的参数。

### 对参数使用 typeof
```JavaScript
console.log(typeof arguments);    // 'object'
// arguments 对象只能在函数内使用
function test(a){
    console.log(a,Object.prototype.toString.call(arguments));
    console.log(arguments[0],arguments[1]);
    console.log(typeof arguments[0]);
}
test(1);
/*
1 "[object Arguments]"
1 undefined
number
*/
```
arguments对象不是一个 Array 。它类似于Array，
但除了length属性和索引元素之外没有任何Array属性。
例如，它没有 pop 方法。但是它可以被转换为一个真正的Array：

 ```JavaScript
// 函数参数
function add(a,b){   //相当于创建了 var a 和 var b
    console.log(a+b);
}
add(1,2); //3
add(1);  // NaN 相当于给函数var a = 1；var b定义没赋值1+undefind = NaN
add(2,2,3); // 前两个数传值进去 第三个直接抛弃输出 4
// 函数参数匹配
function fn2(a,b){// a,b 形参
  console.log('fn2长度',fn2.length); // 函数形参的个数
  console.log('arguments长度',arguments.length);// 得到实参的个数
  if(fn2.length == arguments.length ){
    console.log(a+b);
  }else{
    console.error("你输入的参数有错，请输入"+fn2.length + '参数');
 }
}
fn2(1,2);//实参
fn2(1,2,3);
````
### 例子
遍历参数求和

```JavaScript
//当形参很多时可以通过arguments去处理

function superAdd(){
   var sum =0,
       len = arguments.length;
   for(var i=0; i<len; i++){
    sum += arguments[i];
    }
    return sum;
}
superAdd(1,2,3,4);//10
superAdd(1,2,3,4,5)//15
superAdd(1,2,3,4,123,343,547,894)//1917
```
content
