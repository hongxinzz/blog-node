---
##title:浅谈异步callback。-title
##introduction:callback举例以及应用。-introduction
##time:2018-12-05-time
##cover:https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543555608105&di=2c626d0963249618ed520b35b9f1fb9e&imgtype=0&src=http%3A%2F%2Fp0.qhimg.com%2Ft01d33574ff8f0f445c.gif-cover
##tags:javaScript-tags
---
##content:
## 异步
- 同步代码是一次执行，异步就是在同步之后执行的代码。
## 聊聊callback
- 解决异步的一种方式
- 常见的有ajax
- setTimeout
## 高阶函数
- 函数可以接受一个函数
- 函数返回一个函数
```js
function after(times,callback){
	return function(){
		if(--times === 0){
			callback()
		}
	}
}

let fn = after(3,function(){
	console.log('我被调用三次了')
})
fn();
fn();
fn();//我被调用三次了
```
- after接收一个参数和一个函数，并返回一个函数。
-  接受的函数通过条件选择执行这个函数。
-  `--time`而不是`time--`不然函数运行就会少执行一次。
> 实现一个函数， 3s后才能获取结果
```js
function run(){
	setTimeout(()=>{
		let text = 'runing'
		//return
	},3000)
}

run()
```
> 我们发现在异步环境中 调用函数根本读取不到值，使用 `return`也是同样的效果
> 所以解决异步 我们就要通过传函数的方式来执行
```js
function run(callback){
	setTimeout(()=>{
		let text = 'runing'
		//return
		callback(text)
	},3000)
}
run(function(text){
	console.log(text) //running
})
```
> 从两个例子中我们发现，每一次的执行callback，函数就要传参一个函数，从而会导致这样
```js
function run(callback){
	setTimeout(()=>{
		let text = 'runing'
		//return
		callback(text)
	},3000)
}

run(function(text){
	console.log(text) //running
	run(function(text){
		console.log(text+'2') //running2
		run(function(text){
			console.log(text+'3') //running3
		})
	})
})
```
> 在执行一次之后我还想在执行一次函数，就会出现多层嵌套（回调地狱），代码不美观，且如果当中一环出现了异常，我们也不好捕获异常
### 多个异步同时执行，在某一时刻拿到最终结果
```js
let numList = [];
function run(num){
	setTimeout(()=>{
		numList.push(num)
	},3000)
}
run(1)
run(2)
console.log(numList) //输出[]
```
>  我们发现最后结果为空数组，因为两次的调用都是为异步
>  现在我们进行修改一下
```js
let numList = [];
function after(times,callback){
	return function(){
		if(--times === 0){
			callback(numList)
		}
	}
}
let fn = after(2,function(data){
	console.log(data)
})
function run(num){
	setTimeout(()=>{
		numList.push(num)
		fn();
	},3000)
}
run(1)
run(2)
```
> 我们发现 在`numList.length === 2` 中2不能手动配置，假如我有一百个方法执行，那么就要去改
> 一旦基数不准，这个方法就挂了
> 所以可以借鉴我们之前写的`after`方法
```js
let numList = [];
function after(times,callback){
	return function(){
		if(--times === 0){
			callback(numList)
		}
	}
}
let fn = after(2,function(data){
	console.log(data)
})
function run1(num){
	setTimeout(()=>{
		numList.push(num)
		fn();
	},3000)
}
function run2(num){
	setTimeout(()=>{
		numList.push(num)
		fn();
	},3000)
}
run1(1)
run2(2)
```
> 我们写了一个方法，统一收集异步结果的逻辑
> 但是我们代码写的不是很美观
### 发布订阅
```js
let numList = [];
let Dep = {
	arr:[],
	on(fn){
		this.arr.push(fn)
	},
	emit(){
		if(numList.length === 2){
			this.arr.forEach(function(fn){
				fn();
			})
		}
	}
}
Dep.on(function(){
	console.log(numList) //[1,2]
})
Dep.on(function(){
	console.log('代码执行结束了')
})
function run1(num){
	setTimeout(()=>{
		numList.push(num)
		Dep.emit();
	},3000)
}
function run2(num){
	setTimeout(()=>{
		numList.push(num)
		Dep.emit();
	},3000)
}
run1(1)
run2(2)
```
> 上面逻辑 我们完成了 将需要发布的内容保存到队列里
> 在发布时让数组中的函数依次执行
-content
