---
##title:React入门Demo-title
##introduction: 从一步步的开发中你会发现React的组件化思想在实际开发中的巧妙之处-introduction
##time:2018-03-21-time
##cover:https://raw.githubusercontent.com/hongxinzz/blog/master/assets/img/reactdom.png-cover
##tags:React-tags
---
##content
现在可以把我们所学到的内容应用于实战当中。
这里给大家提供一个实战的案例：一个评论功能。效果如下：

发评论和记录当前 
发布时间以及发布人
在鼠标移入到列表时，删除按钮出现，
并且点击删除此条目。

![](https://github.com/hongxinzz/React-demo/blob/master/message.gif)

这里的话我们设计成三个组件，刚刚我们说到的React组件化就体现出来了。

![](https://raw.githubusercontent.com/hongxinzz/blog/master/assets/img/demo1.png)

好的，那我们接下来开始动手吧！
首先我们创建第一个组件。
这个组件是图中的发布组件。React不像JQ一直频繁的去对页面进行Dom操作。
而是提供了很多on方法让我们去使用，接下我们我们用onChang去获取Value值。
```Html
<div className='comment-input'>
   <div className='comment-field'>
     <span className='comment-field-name'>用户名：</span>
     <div className='comment-field-input'>
       <input
         value={this.state.username}
         onChange={this.handleUsernameChange.bind(this)}/>
     </div>
   </div>
   <div className='comment-field'>
     <span className='comment-field-name'>评论内容：</span>
     <div className='comment-field-input'>
       <textarea
         value={this.state.content}
         onChange={this.handleContentChange.bind(this)} />
     </div>
   </div>
   <div className='comment-field-button'>
     <button
       onClick={this.handleSubmit.bind(this)}>
       发布
     </button>
   </div>
 </div>   
 ``` 
 我们在组件的构造函数中初始化一个 state 来保存这两个状态：
 ```Javascript
 constructor(){
     super();
     this.state = {
         username:'',
         content:''
     }
 }
 ```
 可以看到接受用户名输入的input和接受用户评论内容的 textarea的 value值
 分别由state.username 和 state.content 控制。这时候你到浏览器里面去输入内容看看，
 你会发现你什么都输入不了。

 这是为什么呢？React.js 认为所有的状态都应该由 React.js 的 state 控制，只要
 类似于 input 、textarea、select 这样的输入控件被设置了 value 值，
 那么它们的值永远以被设置的值为准。值不变，value 就不会变化。

 例如，上面设置了 input 的 value 为 this.state.username，username 在 
 constructor 中被初始化为空字符串。即使用户在输入框里面尝试输入内容了，
 还是没有改变 this.state.username 是空字符串的事实。

 所以应该怎么做才能把用户内容输入更新到输入框当中呢？在 React.js 当中
 必须要用 setState 才能更新组件的内容，所以我们需要做的就是：监听输入
 框的 onChange 事件，然后获取到用户输入的内容，再通过 setState 的方式更新 
 state 中的 username，这样 input 的内容才会更新。

 获取用户输入的用户名
 ```Javascript
 handleUsernameChange(event){
    this.setState({
     username:event.target.value
    })
 }
 ```
获取用户输入的留言内容
```Javascript
handleContentChange(event){
    this.setState({
    content:event.target.value
   })
}
```
这两个方法很简单就不一一介绍了
再发布的时候我们简单做了下判断以及发布时间。
然后接下来就是将这里的name text time 的值传递给父级了。
```Javascript
handleSubmit(){
    let name = this.state.username;
    let text = this.state.content;
    let time = new Date().toLocaleString();
    if (this.state.username!=''&&this.state.content!='') {
        this.props.addMessage({name,text,time})
    };
    this.setState({
      content:''
    })
}
```
## 向父级传递
在图片上说过，大的父级包含我们2个组件，这里涉及到一个我就先说一个组件。
```Html
<div className="wrapper">
 <Commont addMessage={this.addMessage.bind(this)}/>
</div>
```
在子组建中我们通过props把三个值通过addMessage传递给了父组件
所以我们父组件现在所要做的就是把值存起来(state状态),然后动态
渲染我们的子组件。
```Javascript
constructor(){
    super();
    this.state = {
        message:[]
    }
}
```
我们在状态中弄了一个message的数组去储存，然后在用一个addMessage去获取
子组件传来的值。
这里用了解构的方式，待会我们进行删除，增加时这个解构就可以帮我们解决
数据的处理。
```Javascript
addMessage(message){
    let messages = [...this.state.message,message];
    this.setState({
        message:messages
    })
}
```
到这里，我们已经完成了发布的组件，并且传递到父组件，现在我们就要处理数据
来进行对数据的渲染。我们创建一个列表组件。并且它的数据就是来源于state的message中的

![](https://raw.githubusercontent.com/hongxinzz/blog/master/assets/img/list.PNG)

```Html
 <CommontList message={this.state.message}/>
```
现在子组件就可以通过props来获取到父组件给的值
```Javascript
<div>
    {
        this.props.message.map((com,index)=>(
        <div className='comment' key={index}>
            <div className='comment-user'>
              <span>{com.name} </span>：
            </div>
            <p> {com.text}</p>
            <span className='comment-createdtime'>
              {com.time}
            </span>
            <span className='comment-delete'>
              删除
            </span>
        </div>
        ))
    }
</div>
```

![](https://raw.githubusercontent.com/hongxinzz/blog/master/assets/img/list2.PNG)

到现在我们可以成功渲染出数据了，我们在删除添加一个父级的onClick的方法，
子组件的点击方法主要是给父级传我们点击的条目索引值。
```Javascript
<div>
    {
        this.props.message.map((com,index)=>(
        <div className='comment' key={index}>
            <div className='comment-user'>
              <span>{com.name} </span>：
            </div>
            <p> {com.text}</p>
            <span className='comment-createdtime'>
              {com.time}
            </span>
            <span className='comment-delete' onClick={()=>this.props.handelDelete(index)}>
              删除
            </span>
        </div>
        ))
    }
</div>
```
```Html
<CommontList message={this.state.message} handelDelete={this.handelDelete.bind(this)}/>
```
接下来我们要写一下这个删除的逻辑了。
```Javascript
handelDelete(index){
  const msg = this.state.message;
    msg.splice(index,1);
    this.setState({
        message:[...msg]
    })
}
```
其实就是一个简单的数组去除再重新更新一下我们state中message的状态就好了。

这里的话就完成了我们以上的功能。
-content
