var fs = require('fs');
var md5 = require('md5');
var moment = require('moment');
var needForPeople = 4000;
var addNullNum = 10000000;
var joinP = 0;
var NowAllData = [];
var ticketBuyArr = new Array(needForPeople);


iniLoadFile();

function iniLoadFile() {
    for (var i = 0; i < ticketBuyArr.length; ++i) { ticketBuyArr[i] = false; }
    
    fs.readFile('data1.json', 'utf8', function (err,data) {
        NowAllData = JSON.parse(data);
//        console.log("Load Complete:\n"+JSON.stringify(NowAllData));
        if(NowAllData.length>0){
        NowAllData.forEach(function(eachItem){
            joinP+=eachItem.Amount;
        })
        };
        var SerialChkSum = 0;
        var SerialChkSumAll = 0;
    NowAllData.forEach(function(element){
            element.Serial.forEach(function(eachSerial){
                if(ticketBuyArr[eachSerial-addNullNum]===false){
                    ticketBuyArr[eachSerial-addNullNum]=true;
                    SerialChkSum++;
                }
                SerialChkSumAll++;
            });
            
        });
        console.log("SerialChkSum="+SerialChkSum+"/"+SerialChkSumAll);
    });
    
    
//    console.log(ticketBuyArr);
}

exports.getInfo = function(req, res) {
    console.log("u back!");
    
    var sendInfo = {
        'NeedForPeople': needForPeople,
        'NowJoined': joinP
    }
    res.send(sendInfo);
}
exports.readData = function(req, res) {
    console.log("read Data!");
    
      var thisData = NowAllData;
      var cullingData = [];
      for (var i = 0, len = thisData.length; i < len; i++) {
        var thisGuysSerial = "";
        thisData[i].Serial.forEach(function(element,index){
            if(index%5==0){
                thisGuysSerial+="<br />";
            }
            thisGuysSerial+=element+",";
        });
        
        var thisItem ={
            'Email': thisData[i].Email.substr(0,5)+"*"+thisData[i].Email.substr(6),
            'Amount':thisData[i].Amount,
            'Time': moment(thisData[i].Time).utcOffset(8).format("YYYY-MM-DD HH:mm:ss"),
            'Serial': thisGuysSerial.substr(0,thisGuysSerial.length-1)
        };      
        cullingData.push(thisItem);
      
//      console.log(data);
        }
//        var readyToSendData = JSON.stringify(cullingData);
//        console.log(cullingData);
        res.send(cullingData);
}
exports.buyInfo = function(req, res) {
    console.log("buy!");
    var parameters = req.body;
    
    var thisGuysEmail = parameters.email;
    var thisGuysBuyNum = parseInt(parameters.number);
    var thisGuySendEmailFlg = (parameters.sendOrNot === 'true');
    if(thisGuysEmail.indexOf("@")<0){
        thisGuysEmail = thisGuysEmail+"@ntu.edu.tw";
    }
    console.log(thisGuysEmail);
    console.log(thisGuysBuyNum);
    if(joinP+thisGuysBuyNum<=needForPeople){
        joinP+=thisGuysBuyNum;
        console.log("Now JoinP:"+joinP);
        
        serialGenerate(thisGuysEmail,thisGuysBuyNum,function(allSeriels){
            
            
//            console.log(allSeriels);
            console.log(thisGuySendEmailFlg);
            
            if(thisGuySendEmailFlg){
                console.log("SendEmail");
                eMai(allSeriels,thisGuysEmail);
            }
            var pushItem = {
                'Email' : thisGuysEmail,
                'Amount' : thisGuysBuyNum,
                'Serial': allSeriels,
                'Time': moment()
            }
            NowAllData.push(pushItem);
            console.log(pushItem);
            fs.writeFile("data1.json", JSON.stringify(NowAllData), function(err) {
            if(err){
                return console.log(err);
            }
            console.log("The file was saved!");
            }); 
            
        });
        var returnItem ={
            'info': "Success E:"+thisGuySendEmailFlg
        }
        res.send(returnItem);
    }
    else{
        console.log("Full!");
    }
    
//    res.send(sendInfo);
}
function serialGenerate(thisEmail, thisNum, callback){
    
    var allSerials = [];
   for(var i=0; i<thisNum;i++){
        allSerials.push(eachSerial(thisEmail,i));
   } 
    callback(allSerials);
//    callback();
}
function eachSerial(thisEmail, nowNum){
    
    var tmpEnN = thisEmail+nowNum;
//    console.log(tmpEnN);
    var getThisGuysMd5 = md5(tmpEnN);
    var thisGuysMd5cutInt =  parseInt(getThisGuysMd5.substr(23),16);
    
//   console.log(thisGuysMd5cutInt);
    thisGuysMd5cutInt = thisGuysMd5cutInt%needForPeople;
//     console.log(thisEmail+"->"+thisGuysMd5cutInt);
    for(var i=0; i<needForPeople;i++){
        if(ticketBuyArr[(thisGuysMd5cutInt+i)%needForPeople]==false){
            ticketBuyArr[(thisGuysMd5cutInt+i)%needForPeople]=true;
            return addNullNum+(thisGuysMd5cutInt+i)%needForPeople;
        }
    }
    console.log("something wrong!");
}

function eMai(ToBeSavedJsonSting,toMail){
  libMai = {
    nodemailer: require('nodemailer'),
    externalip: require('externalip')
  }
  var transporter = libMai.nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'crawl.jw+loffo@gmail.com',
        pass: 'crawljw1414'
    }
  });
      libMai.externalip(function (err, ip) {

      console.log('SMTPc');

        // Message object
        var message = {

            // sender info
            from: 'Loffo 集資透 <loffoYou@loffo.com>',

            // Comma separated list of recipients
            to: '"HEY" <'+toMail+'>',

            // Subject of the message
            subject: "【 LOFFO 集資透 — Lotto for Fund 】No.1", //

            headers: {
                'X-Laziness-level': 1000
            },

            // plaintext body
            text: 'LOFFO 集資透',

            // HTML body
            html:
            '親愛的Loffo集資友您好:<br /><br />&nbsp;&nbsp;&nbsp;&nbsp; 關於您參與此次集資之需求，已為Loffo接受且確認成立。以下為您參與此次活動之'+ToBeSavedJsonSting.length+'組序號：<br /><br />&nbsp;&nbsp;&nbsp;&nbsp; '+ToBeSavedJsonSting+'<br /><br />&nbsp;&nbsp;&nbsp;&nbsp; 謝謝您，參與此次活動，我們會在11/3晚間開出一位幸運兒！為了兌獎方便，系統也將自動通知中獎者。也歡迎邀請朋友關注此活動，給我們更多動力能設計更多趣味的抽獎活動，推出更對味的獎品。<br /> <br />&nbsp;&nbsp;&nbsp;&nbsp; 再次謝謝各位朋友們的支持，也期待您能抽中本次的大獎！<br /><br />Loffo 集資透 敬上<br /><br />--------------------<br />活動專頁：http://on.fb.me/1Q51GD7'
      };
      console.log('sMai');
      transporter.sendMail(message, function(error, info) {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');
        console.log('Server responded with %s', info.response);
      });
    });
}
