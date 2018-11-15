---
##title:argument  进阶总结-title
##introduction:argument 根据输入的参数拼接字符串-introduction
##time:2018-02-27-time
##cover:http://static.runoob.com/images/mix/code-wallpaper-18.png-cover
##tags:javaScript-tags
---
##content

上个文章我们有说到，Arguments在函数中的作用
也说明了Arguments是一个对象，且是一个类数组有lenght属性，
缺点不要多用，影响代码的可读性，试想你一个argument[0]
谁知道这个参数是什么呢？
适合在动态场景使用具体看上篇文章
## 小练习

创建一个函数 announce, 需要完成以下要求：
函数可接受不定数目的参数
拼接所有参数成一句完整的字符串
最终返回拼接好的字符串
如下所示：

```JavaScript

var resultStr = announce('Tom', 'Jack', 'Mike');
console.log(resultStr);  
// 获得本次大会第一名的共有3人，分别是Tom、Jack、Mike。

```
如上面代码中，传入参数 Tom，Jack，Mike，便输出下面的话。
### 方法一

我们可以在函数内通过 arguments 获取函数所有参数。具体过程如下：
通过 arguments.length 可以获取参数的个数
拼接参数，以 、 作为连接符
 ```JavaScript
 
 //常见的字符串拼接
 function announce() {
   var i = 0;
   // 获取参数数目
   var length = arguments.length;
   var result = '获得本次大会第一名的共有' + length + '人，分别是';
   for (; i < length; i++) {
     // 如果不是第一个，则需要增加连接符
     if (i !== 0) {
       result += '、';
     }
     result += arguments[i];
   }
   result += '。';
   return result;
 }
 
```
### 方法二

借用数组的 join 方法
由于 arguments 是一个类数组，所以并没有数组对象的 join 方法。但我们可以通过使用 Array.prototype.join.call(...) 的方式来借用数组的方法。这样写起来更为简洁优雅。
参考代码如下：

```JavaScript

function announce() {
  var i = 0;
  // 获取参数数目
  var length = arguments.length;
  var result = '获得本次大会第一名的共有' + length + '人，分别是';
  // 通过 call 借用方法
  result += Array.prototype.join.call(arguments, '、');
  result += '。';
  return result;
}

```
content
