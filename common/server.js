const server = {
  domain: 'https://yiliao.wufen21.com',
}
module.exports = server;

/* 
投递个人简历
{{base}}/api/job/submitResume.json?sessionId=c888b2cc12c3077eb7d8ee584a2aa175&positionId=9
positionId  sessionId 
 
 
 查看简历
 {{base}}/api/job/findResume.json?sessionId=c888b2cc12c3077eb7d8ee584a2aa175
 sid
 
 修改简历
 {{base}}/api/job/editResume.json?sessionId=c888b2cc12c3077eb7d8ee584a2aa175&name=我是谁1&sex=2&price=1.4k以上&education=高中&year=3.1年&telephone=1232992333&skill=1、跳 2、rap  3、唱歌 4、打篮球&id=1
 
 
 填写个人简历
 {{base}}/api/job/fillResume.json?sessionId=c888b2cc12c3077eb7d8ee584a2aa175&name=我是谁&sex=1&price=1.4k以上&education=高中&year=3年&telephone=123299233&skill=1、跳 2、rap  3、唱歌
 
 
 编辑职位信息
 {{base}}/api/job/editPosition.json?levelId=1&maxPrice=123&minPrice=12&education=学历&year=2&telephone=12312&address=xxx地址&content=工作内容&company=公司名称&userId=2&sex=2&id=3
 
 
 
 {{base}}/api/job/delPosition.json?id=4
 */