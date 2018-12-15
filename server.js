const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const db=require('./dbconnect/dbconnect.js');//引入数据库
const path=require('path');

//post参数解析
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//静态文件开启
app.use(express.static(path.join(__dirname,'./public')));
//开启admin 静态文件
app.use('/admin',express.static(path.join(__dirname,'./admin')));


//引用路由
const user=require('./router/user.js');
const layout=require('./router/layout.js');
const upload=require('./router/upload.js');

//调用路由
app.use('/api/user',user);
app.use('/api/layout',layout);
app.use('/api/upload',upload);

app.listen(3008,()=>{
	console.log('服务器启动');
})
