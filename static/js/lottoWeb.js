var updateFlg = false;
var isFocusFlg = false;
var collapseFlg = true;
var collapseNum = 20;
//var historyNum = 0;
//console.log("hi");

$(function () {  
//    console.log("in");    
    updateInfo();
    updateRecord();
    $("#btnColla").click(function() {
        if(collapseFlg){
            $("#btnColla").text("Collapse");
        }
        else{
            $("#btnColla").text("Show All");
        }
        
        colla();
    });
});

$(document).ready(function(){
//  setInterval(updateRecord, 5000);
    setInterval( CheckPageFocus, 200 );
});

function logResponse(response) {
  if (typeof console !== 'undefined')
    console.log('The response was', response);
}
function updateRecord(){
    if (updateFlg)
        return;
//    logResponse("[updateInfo] get my info.");
    $.ajax({
        url: '/readData'
    }).success(function (response) {
//        console.log(response);
        var userDataInfo = response;
        var dataLen = userDataInfo.length-1;
        $('#whoBuy').empty(); 
//        console.log(userDataInfo);
        if(collapseFlg){
//            $('#whoBuy').empty();
            
            for(var i=dataLen;i>dataLen-collapseNum;i--){
                $('#whoBuy').append("<tr><td>#"+i+"</td><td >"+userDataInfo[i].Time+"</td> <td >"+userDataInfo[i].Email+"</td> <td>"+userDataInfo[i].Amount+"</td> </tr>");
            
            }
            if(dataLen>collapseNum){
            $('#whoBuy').append("<tr><td>...</td><td>...</td><td>...</td><td>...</td> </tr><tr><td>#0</td><td >"+userDataInfo[0].Time+"</td> <td >"+userDataInfo[0].Email+"</td> <td>"+userDataInfo[0].Amount+"</td> </tr>");
            }
        }else{
            
            for(var i=dataLen;i>=0;i--){
                $('#whoBuy').append("<tr><td>#"+i+"</td><td >"+userDataInfo[i].Time+"</td> <td >"+userDataInfo[i].Email+"</td> <td>"+userDataInfo[i].Amount+"</td> </tr>");
            
            }

            //userDataInfo.forEach(function(elemet,index){
//
//             $('#whoBuy').append("<tr><td>"+index+"</td><td >"+elemet.Time+"</td> <td >"+elemet.Email+"</td> <td>"+elemet.Amount+"</td> </tr>");
//            });
        }
    
       
    }).error(function (err) {
//        logResponse("Error fetching myInfo data.");
    });
}
               
               
function updateInfo(){
    if (updateFlg)
        return;
//    logResponse("[updateInfo] get my info.");
    $.ajax({
        url: '/getInfo'
    }).success(function (response) {
//        console.log(response.NeedForPeople);
var nowProgress = Math.ceil(response.NowJoined/response.NeedForPeople*100);  
//logResponse("[updateInfo] progress:"+nowProgress);
        $('#needForP').html(response.NeedForPeople);
        $('#joinP').html(response.NowJoined+"<br>已參與");
$('#joinP_R').html(response.NeedForPeople-response.NowJoined+"<br>元剩餘"); 
        
$('#nowPdtBar').css('width', nowProgress+'%').attr('aria-valuenow', nowProgress);
        
    }).error(function (err) {
        logResponse("Error fetching myInfo data.");
    });
}
function CheckPageFocus() {
  if ( document.hasFocus()) {
    if(!isFocusFlg){
        isFocusFlg = true;
        updateRecord();
    }
  }else{
    isFocusFlg = false;
  }
}
function colla(){
    
    collapseFlg = !collapseFlg;
    updateRecord();
//    console.log("colla");
//    alert("colla");
}