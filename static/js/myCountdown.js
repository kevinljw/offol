$(document).ready(function(){
  countdown();
  setInterval(countdown, 30);
});
 
function countdown()
{ //Start und Ende (Datum und Zeit) 
  var startDateTime = moment();
  var endDateTime = moment('2015-11-03 20:30:00');
 
  //Differenz in Millisekunden zwischen Start und Ende berechnen
  var timeLeft = endDateTime.diff(startDateTime, 'milliseconds', true);
 
  //Anzahl Jahre in der Differenz
//  var years = Math.floor(moment.duration(timeLeft).asYears());
 
  //ermittelte Jahre vom Ende abziehen und neue Differenz in Millisekunden berechnen
//  endDateTime = endDateTime.subtract(years, 'years'); 
//  timeLeft = endDateTime.diff(startDateTime, 'milliseconds', true);
 
  //Anzahl Monate in der Differenz
//  var months = Math.floor(moment.duration(timeLeft).asMonths());
 
  //ermittelte Monate vom Ende abziehen und neue Differenz in Millisekunden berechnen 
//  endDateTime = endDateTime.subtract(months, 'months');
//  timeLeft = endDateTime.diff(startDateTime, 'milliseconds', true);
 
  //Anzahl Tage in der Differenz
//  var days = Math.floor(moment.duration(timeLeft).asDays());
 
  //ermittelte Tage vom Ende abziehen und neue Differenz in Millisekunden berechnen
//  endDateTime = endDateTime.subtract(days, 'days');
//  timeLeft = endDateTime.diff(startDateTime, 'milliseconds', true);
 
  //Anzahl Stunden in der Differenz
  var hours = Math.floor(moment.duration(timeLeft).asHours());
 
  //ermittelte Stunden vom Ende abziehen und neue Differenz in Millisekunden berechnen
  endDateTime = endDateTime.subtract(hours, 'hours');
  timeLeft = endDateTime.diff(startDateTime, 'milliseconds', true);
 
  //Anzahl Minuten in der Differenz
  var minutes = Math.floor(moment.duration(timeLeft).asMinutes());
 
  //ermittelte Minuten vom Ende abziehen und neue Differenz in Millisekunden berechnen
  endDateTime = endDateTime.subtract(minutes, 'minutes');
  timeLeft = endDateTime.diff(startDateTime, 'milliseconds', true);
 
  //Anzahl Sekunden in der Differenz
  var seconds = Math.floor(moment.duration(timeLeft).asSeconds());
 
    endDateTime = endDateTime.subtract(seconds, 'seconds');
  timeLeft = endDateTime.diff(startDateTime, 'milliseconds', true);
    var mSeconds = Math.floor(moment.duration(timeLeft).asMilliseconds()/10);
    
    
  //Ergebnis
  $("#myCountdown").text('倒數 '+pad(hours,2)+' 小時 '+ pad(minutes,2)+' 分 '+ pad(seconds,2)+' 秒 '+pad(mSeconds,2));  
//  console.log(years+'y', months+'m', days+'d', hours+'h', minutes+'i', seconds+'s');
}

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}