//1:加载模块 express pool
const express = require("express");
const pool = require("./pool");
const bodyParser=require('body-parser');
const session=require('express-session');
//2:创建express对象
var app = express();
//2.1:加载跨域访问组件
const cors = require("cors");
//2.2:配置允许脚手架访问程序
app.use(cors({
    origin:["http://127.0.0.1:3001",
    "http://localhost:3001"],
    credentials:true
}));

//配置body-parser模块
app.use(bodyParser.urlencoded({
	extended:false
}))
//对模块进行配置
app.use(session({
	secret:'128位随机字符',
	resave:false,
	saveUninitialized:true,
	cookie:{
		maxAge:1000 * 60 *60*24	
	}//这部分的值是控制cookie存活的时间
}))

//3:指定监听端口3000
app.listen(3000);
//4:指定静态目录 public
// __dirname 当前程序所属目录绝对路径 
//app.js vue_app_server
app.use(express.static(__dirname+"/public"))


//功能一:首页轮播图
app.get("/imagelist",(req,res)=>{
   var obj = [
     {id:1,img_url:"http://127.0.0.1:3000/img/new1.jpg"},
     {id:2,img_url:"http://127.0.0.1:3000/img/new2.jpg"},
     {id:3,img_url:"http://127.0.0.1:3000/img/new3.jpg"},
   ];
   res.send(obj);
});

app.get('/newslist_point',(req,res)=>{
	var point=req.query.point;
	var id=req.query.point;
	var sql='update xz_news set point=? where id=?'
	pool.query(sql,[point,id],(err,result)=>{
		if(err) throw err;
		res.send({code:1,msg:'修改成功'})
	})
})

//功能二:新闻分页显示
app.get("/newslist",(req,res)=>{
 //1:获取参数
 var pno = req.query.pno;
 var pageSize = req.query.pageSize;
 //2:设置默认值 1 7
 if(!pno){pno = 1}
 if(!pageSize){pageSize=7}
 //3:创建正则表达式验证用户输入验证
 var reg = /^[0-9]{1,3}$/;
 //4:如果错出停止函数运行
 if(!reg.test(pno)){
    res.send({code:-1,msg:"页编格式不正确"});
    return;
 }
 if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
 }

 var progress = 0;
 var obj = {code:1};
 //5:创建sql1 查询总记录数   严格区分大小写
 var sql = "SELECT count(id) AS c FROM xz_news";
 pool.query(sql,(err,result)=>{
   if(err)throw err;
   var pageCount = Math.ceil(result[0].c/pageSize);
   progress+=50;
   obj.pageCount = pageCount;
   if(progress==100){
     res.send(obj);
   }
 });
 //6:创建sql2 查询当前页内容 严格区分大小写
 var sql =" SELECT id,title,ctime,img_url,";
     sql+=" point,content";
     sql+=" FROM xz_news ";
     sql+=" LIMIT ?,?";
 var offset = parseInt((pno-1)*pageSize);
 pageSize=parseInt(pageSize);
 pool.query(sql,[offset,pageSize],(err,result)=>{
   if(err)throw err;
   progress+=50;
   obj.data=result;
   if(progress==100){
     res.send(obj);
   }
 })
 //7:返回结果
});  

//功能三：查找一条新闻详细信息
app.get('/NewsInfo',(req,res)=>{
	var id=req.query.id;
	var sql='select id,title,content,point,ctime from xz_news where id=?';
	pool.query(sql,[id],(err,result)=>{
		if(err) throw err
		res.send({code:1,data:result})	
	})
})

//功能四：分页查找指定新闻下评论列表
app.get('/getcomment',(req,res)=>{
	var pno = req.query.pno;//页码
 var pageSize = req.query.pageSize;//页大小
 var nid=req.query.nid;//新闻id
 //2:设置默认值 1 7
 if(!pno){pno = 1}
 if(!pageSize){pageSize=7}
 //3:创建正则表达式验证用户输入验证
 var reg = /^[0-9]{1,3}$/;
 //4:如果错出停止函数运行
 if(!reg.test(pno)){
    res.send({code:-1,msg:"页编格式不正确"});
    return;
 }
 if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
 }

 var progress = 0;
 var obj = {code:1};
 obj.name=req.session.data;
 //obj.uname=req.session.data;
 //5:创建sql1 查询总记录数   严格区分大小写
 var sql = "SELECT count(id) AS c FROM xz_comment where nid=?";
 nid=parseInt(nid);
 pool.query(sql,[nid],(err,result)=>{
   if(err)throw err;
   var pageCount = Math.ceil(result[0].c/pageSize);
   progress+=50;
   obj.pageCount = pageCount;
   if(progress==100){
     res.send(obj);
   }
	})//6:创建sql2 查询当前页内容 严格区分大小写
 var sql =" SELECT id,user_name,ctime,";
     sql+=" content";
     sql+=" FROM xz_comment";
		 sql+=' where nid=?';
		 sql+=' order by id desc';
     sql+=" LIMIT ?,?";
 var offset = parseInt((pno-1)*pageSize);
 pageSize=parseInt(pageSize);
 pool.query(sql,[nid,offset,pageSize],(err,result)=>{
   if(err)throw err;
   progress+=50;
   obj.data=result;
   if(progress==100){
     res.send(obj);
   }
 })
});

//功能五：发表评论
app.post('/addComment',(req,res)=>{
	var nid=parseInt(req.body.nid);
	var content=req.body.content;
	var user_name=req.session.data;
	var sql='insert into xz_comment (id,nid,user_name,ctime,content) values (null,?,?,now(),?)';
	pool.query(sql,[nid,user_name,content],(err,result)=>{
		if(err) throw err;
		res.send({code:1,msg:'评论发表成功'})
	})
})

//功能六：查询商品列表
app.get('/goodsList',(req,res)=>{
	var obj=[];
	obj.push({id:1,title:'小辣椒',old:1999,now:99,img_url:'img/banner1.png'});
	obj.push({id:2,title:'中辣椒',old:2999,now:199,img_url:'img/banner2.png'});
	obj.push({id:3,title:'大辣椒',old:3999,now:299,img_url:'img/banner3.png'});
	res.send(obj);
})

//加载第三方的模块，

app.get('/Login',(req,res)=>{
	var uname=req.query.uname;
	var upwd=req.query.upwd;
	var sql='select count(id) as c,id from xz_login where uname=? and upwd=md5(?)';
	pool.query(sql,[uname,upwd],(err,result)=>{
		if(err) throw err;
		var obj=result[0].c;
		if(obj==1){
			//将用户名保存session对象中
			req.session.data=uname;
			req.session.uid=result[0].id;
			console.log(req.session.uid)
			res.send({code:1,msg:'登录成功'})
		}
		else
		  res.send({code:0,msg:'登录失败'})
	})
})

//功能十一：搜索商品
app.get('/search',(req,res)=>{
	var keyword=req.query.keyword;
	var sql='select lid,lname,price from xz_laptop where lname like ?';
	pool.query(sql,[`%${keyword}%`],(err,result)=>{
		if(err) throw err;
		if(result.length==0)
			res.send({code:-1,msg:'您搜索的商品不存在呦'})
		else
			res.send({code:1,msg:result})
	})
})