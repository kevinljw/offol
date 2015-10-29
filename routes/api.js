var needForPeople = 3333;
var joinP = 10;

exports.getInfo = function(req, res) {
    console.log("u back!");
    
    var sendInfo = {
        'NeedForPeople': needForPeople,
        'NowJoined': joinP
    }
    res.send(sendInfo);
}
exports.buyInfo = function(req, res) {
    console.log("buy!");
    var parameters = req.body;
    
    var thisGuysEmail = parameters.email;
    var thisGuysBuyNum = parseInt(parameters.number);
    if(thisGuysEmail.indexOf("@")<0){
        thisGuysEmail = thisGuysEmail+"@ntu.edu.tw";
    }
    console.log(thisGuysEmail);
    console.log(thisGuysBuyNum);
    if(joinP+thisGuysBuyNum<=needForPeople){
        joinP+=thisGuysBuyNum;
    }
    console.log("Now JoinP:"+joinP);
//    res.send(sendInfo);
}