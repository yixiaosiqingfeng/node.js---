'use strict';
const nodemailer = require('nodemailer');

// nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'qq',//邮箱的服务商
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
             user: "2250241473@qq.com", // 默认邮箱
            pass: 'kwqnsytltsmteade' // //smtp 授权码
        }
    });




    function sendmail(mail,msg){
        return new Promise((resolve,reject)=>{
                // 发送邮件相关信息
                console.log(mail);
            let mailOptions = {
               from: '2250241473@qq.com', // sender address
                to: mail, // list of receivers
                subject: 'xx管理系统邮箱验证', // Subject line
                text:msg // plain text body
                //html: '<b>Hello world?</b>' // html body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                	console.log(error);
                	reject(error);
                	}
                resolve('ok')
            })
        })
    }
//     sendmail('2250241473@qq.com','123')
    module.exports={sendmail};//抛出验证码模块
// });