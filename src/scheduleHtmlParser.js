// scheduleHtmlParser.js
// Author: mmdjiji
// GitHub: https://github.com/mmdjiji/xiaomi-aischedule-ldu
// All rights reserved.

function weekParser(weekStr) {
  let result = [];
  if(weekStr == '全周上课') {
    for(let i=1; i<=20; ++i) {
      result.push(i);
    }
  } else if(weekStr  == '单周上课') {
    for(let i=1; i<=20; i+=2) {
      result.push(i);
    }
  } else if(weekStr == '双周上课') {
    for(let i=2; i<=20; i+=2) {
      result.push(i);
    }
  } else {
    let src = weekStr.split('周上')[0];
    if(src.indexOf(',') > -1) {
      let dst = src.split(',');
      for(i of dst) {
        if(i.indexOf('-') > -1) {
          let final = i.split('-');
          for(let j=~~final[0]; j<=~~final[1]; ++j) {
            result.push(j);
          }
        }else {
          result.push(~~i);
        }
      }
    } else if(i.indexOf('-') > -1) {
      let final = src.split('-');
      for(let j=~~final[0]; j<=~~final[1]; ++j) {
        result.push(j);
      }
    }else {
      result.push(~~i);
    }

  }
  return result;
}

function sectionCount(n, m) {
  let retval = [];
  for(let i=n; i<n+m; i++)
    retval.push({"section": i});
  return retval;
}

function scheduleHtmlParser(html) {
  // Generate LDU section time table
  let sectionTime = [];
  const startTime = ["08:00", "09:00", "10:10", "11:10", "14:00", "15:00", "16:10", "17:10", "19:00", "20:00", "21:30", "22:30"];
  const endTime   = ["08:50", "09:50", "11:00", "12:00", "14:50", "15:50", "17:00", "18:00", "19:50", "20:50", "22:20", "23:20"];
  for(let i=0; i<12; i++){
    sectionTime.push({
      "section": i + 1,
      "startTime": startTime[i],
      "endTime": endTime[i]
    });
  }

  // Parse html
  let result = [];
  let queue = html.split('</tr>');
  let lastAns = {};
  let arrangeTime = 0;
  
  for(i of queue) {
    if(arrangeTime) {
      let courses = i.split('</td>');
      // console.log(courses);
      let ans = JSON.parse(JSON.stringify(lastAns));
      ans.weeks = weekParser(courses[0].split('<td>')[1]);
      ans.day = ~~courses[1].split('>')[1];
      ans.sections = sectionCount(~~courses[2].split('>')[1], ~~courses[3].split('>')[1]);
      console.log(ans);
      result.push(ans);
      arrangeTime--;
    }else if(i.indexOf('rowspan') > -1) {
      let courses = i.split('</td>');
      // console.log(courses);
      let ans = {};
      ans.name = courses[2].split('>')[1];
      ans.teacher = courses[7].split('>')[1];
      ans.weeks = weekParser(courses[11].split('>')[1]);
      ans.day = ~~courses[12].split('>')[1];
      ans.sections = sectionCount(~~courses[13].split('>')[1], ~~courses[14].split('>')[1]);
      ans.position = courses[16].split('>')[1];
      if(ans.position != '无需地点') {
        ans.position += ' ' + courses[17].split('>')[1];
      }
      arrangeTime = ~~courses[1].split('rowspan="')[1].split('"')[0] - 1;
      
      console.log(ans);
      result.push(ans);
      lastAns = ans;
    }
  }
  return {
    courseInfos: result,
    sectionTimes: sectionTime
  }
}