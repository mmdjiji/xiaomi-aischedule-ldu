// scheduleHtmlProvider.js
// Author: mmdjiji
// GitHub: https://github.com/mmdjiji/xiaomi-aischedule-ldu
// All rights reserved.

function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
  alert('(*╹▽╹*) 嘤嘤嘤\n欢迎使用吉吉适配的课程导入功能！\n\n使用流程:\n→登录\n→本学期课表\n→一键导入\n\n完成之后别忘了给个好评，祝您使用愉快！\n\n有任何问题可以练习我: i@mmdjiji.com\n\nGitHub: https://github.com/mmdjiji/xiaomi-aischedule-ldu');
  const innerDom = dom.getElementsByName('bottomFrame')[0].contentWindow[2].document;
  const originTable = innerDom.getElementsByClassName('titleTop2')[1].innerHTML;
  return originTable.replace(/[\r\n\s+]/g,'').replace(/&nbsp;/ig,'').split('</thead>')[1];
}