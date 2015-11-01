var updateFlg = false;
//console.log("hi");

$(function () {  
//    console.log("in");    
    updateInfo();
    updateRecord();
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
//        console.log(userDataInfo);
                userDataInfo.forEach(function(elemet){
         $('#whoBuy').append("<tr><td >"+elemet.Time+"</td> <td >"+elemet.Email+"</td> <td>"+elemet.Amount+"</td> </tr>");
        });
       
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