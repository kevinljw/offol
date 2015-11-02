$(function () {  
//    console.log("in");    
    // updateInfo();
    $("#submitBuyBtn").click(function() {
            var inputEmail = $("#exampleInputEmail").val();
            var inputNum = $("#exampleInputNum").val();
            console.log(document.forms["myForm"]["seChk"].checked);
            if(validateForm()){    
                var thisMsg={
                            'email': inputEmail,
                            'number': inputNum,
                            'sendOrNot':
document.forms["myForm"]["seChk"].checked
                }
                submitBuyInfo(thisMsg);
            }
            
    });
});

function logResponse(response) {
  if (typeof console !== 'undefined')
    console.log('The response was', response);
}
function submitBuyInfo(submitMsg){

    logResponse("[submitBuyInfo] submit");
    
    $.ajax({
        url: '/buyInfo',
        type: 'post',
        data: submitMsg
    }).success(function (response) {
        alert(response.info);
    }).error(function (err) {
        logResponse("Error fetching myInfo data.");
    });
}

function validateForm() {
    var x = document.forms["myForm"]["Email"].value;
    var y = document.forms["myForm"]["Num"].value;
    var z = document.forms["myForm"]["Chk"].checked;
    
//    console.log(z);
    if (z==false || x == null || x == "" || y == null || y == ""  ) {
        alert("All must be filled out");
        return false;
    }
    else{
        return true;
    }
}