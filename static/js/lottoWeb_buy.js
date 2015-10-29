$(function () {  
//    console.log("in");    
    // updateInfo();
    $("#submitBuyBtn").click(function() {
            var inputEmail = $("#exampleInputEmail").val();
            var inputNum = $("#exampleInputNum").val();
            
            if(validateForm()){    
                var thisMsg={
                            'email': inputEmail,
                            'number': inputNum
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