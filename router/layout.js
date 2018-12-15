const express = require('express');
const Router = express.Router();

const layoutModel = require('../model/layoutModel.js');
const mail = require('../mailer.js');
const util = require('../utils/util.js');
//foodlist 显示最新10条数据信息
/**
 * @api {post} /api/layout/ layoutlist
 * @apiName layoutlist
 * @apiGroup layout
 *
 * @apiParam {String} total layouts unique ID.
 * @apiParam {String} page layouts unique ID.
 * @apiParam {String} qty layouts unique ID.
 * @apiParam {String} type layouts unique ID.
 *
 * @apiSuccess {String} err Firstname of the test.
 * @apiSuccess {String} msg  Lastname of the test.
 */
Router.post('/layoutlist', (req, res) => {
	let total = 0;
	let page=Number(req.body.page);//页数
	let qty=Number(req.body.qty);//一页几条数据
	let type=req.body.name;//type接收前端穿回来的name值，用来分类查询
	let sear=req.body.sear;
//	console.log(sear);
//	console.log(type);
	let otype=[];
	if(type && !sear){//如果type存在（即前端name不为空）
		layoutModel.find()//分类名称相等时
		.then((res) => {
			console.log(res);
			total = res.length;
			otype.push(res.name);
//			console.log(otype);
//			console.log(total);
			return layoutModel.find({'name':type}).sort({'updateTime':-1}).limit(qty).skip((page - 1) * qty)
		})
		.then((data) => {
			let array={total:total,odata:data};//用odata去接data
			res.send(util.sendData(0, '请求ok', array))//把array传过去
		})
		.catch((err) => {
			res.send(util.sendData(-1, '请求错误', null))
		})

	}
	else if(!type && sear ){//如果type存在（即前端name不为空）
		layoutModel.find({$or:[{name:{$regex:sear}},{desc:{$regex:sear}},{info:{$regex:sear}}]})//分类名称相等时
		.then((res) => {
//			console.log(res);
			total = res.length;
//			console.log(total);
			return layoutModel.find({$or:[{name:{$regex:sear}},{desc:{$regex:sear}},{info:{$regex:sear}}]}).sort({'updateTime':-1}).limit(qty).skip((page - 1) * qty)//模糊查询
		})
		.then((data) => {
			let array={total:total,odata:data};//用odata去接data
			res.send(util.sendData(0, '请求ok', array))//把array传过去
		})
		.catch((err) => {
			res.send(util.sendData(-1, '请求错误', null))
		})

	}
	else{//前端name为空时
		layoutModel.find()
		.then((res) => {
			total = res.length;
			otype.push(res.name);
//			console.log(otype);
//			console.log(total);
			return layoutModel.find().sort({'updateTime':-1}).limit(qty).skip((page - 1) * qty)
		})
		.then((data) => {
			let array={total:total,odata:data};//用odata去接data
			res.send(util.sendData(0, '请求ok', array))//把array传过去
		})
		.catch((err) => {
			res.send(util.sendData(-1, '请求错误', null))
		})
	}
	
})

/**
 * @api {post} /api/layout/ addclassify
 * @apiName addclassify
 * @apiGroup layout
 *
 * @apiParam {String} name layouts unique ID.
 * @apiParam {String} img layouts unique ID.
 * @apiParam {String} desc layouts unique ID.
 * @apiParam {String} info layouts unique ID.
 *
 * @apiSuccess {String} err Firstname of the test.
 * @apiSuccess {String} msg  Lastname of the test.
 */
//添加分类
Router.post('/addclassify', (req, res) => {
	let {name,img,desc,info} = req.body;
	//	let insertData={name:'肉类',img:'img/1.jpg',desc:'营养丰富',info:'肉类含有丰富的食物蛋白'};
	layoutModel.insertMany({name,img,desc,info})
		//  layoutModel.insertMany(insertData)
		.then((data) => {
			res.send(util.sendData(0, '添加分类信息成功', data))
		})
		.catch((err) => {
			console.log(err);
			res.send(util.sendData(-1, '添加分类信息不成功', null))
		})
})

/**
 * @api {post} /api/layout/ dellayout
 * @apiName dellayout
 * @apiGroup layout
 *
 * @apiParam {String} id layouts unique ID.
 *
 * @apiSuccess {String} err Firstname of the test.
 * @apiSuccess {String} msg  Lastname of the test.
 */
////删除某一菜品信息
Router.post('/dellayout', (req, res) => {
	let id = req.body.id;
//	console.log(id);
	if(!id) {
		res.send(util.sendData(-1, '参数错误', null))
	}
	layoutModel.deleteOne({
			_id: id
		})
		.then((data) => {
			res.send(util.sendData(0, '删除成功', data))
		})
		.catch((err) => {
			console.log(err);
			res.send(util.sendData(-1, '删除失败', null))
		})
})

/**
 * @api {post} /api/layout/ edit
 * @apiName edit
 * @apiGroup layout
 *
 * @apiParam {String} id layouts unique ID.
 *
 * @apiSuccess {String} err Firstname of the test.
 * @apiSuccess {String} msg  Lastname of the test.
 */
//update页面获取数据(此接口用来查询数据，渲染在update页面上)
Router.post('/edit', (req, res) => {
	let id=req.body.id;
//	console.log(id);
//	console.log(req.body);
	if(!id) {
		res.send(util.sendData(-1, '参数错误', null))
	}
	layoutModel.find({_id: id})
		.then((data) => {
			res.send(util.sendData(0, '修改成功', data))
		})
		.catch((err) => {
			console.log(err);
			res.send(util.sendData(-1, '修改失败', null))
		})
})

/**
 * @api {post} /api/layout/ update
 * @apiName update
 * @apiGroup layout
 *
 * @apiParam {String} id layouts unique ID.
 * @apiParam {String} name layouts unique ID.
 * @apiParam {String} img layouts unique ID.
 * @apiParam {String} desc layouts unique ID.
 * @apiParam {String} info layouts unique ID.
 *
 * @apiSuccess {String} err Firstname of the test.
 * @apiSuccess {String} msg  Lastname of the test.
 */
//修改分类并更新
Router.post('/update', (req, res) => {
	let {id,name,img,desc,info} = req.body;
//	console.log(req.body);
	layoutModel.updateOne({_id: id},{name,img,desc,info})
		.then((data) => {
			res.send(util.sendData(0, '修改成功', data))
		})
		.catch((err) => {
			console.log(err);
			res.send(util.sendData(-1, '修改失败', null))
		})
})
module.exports = Router;