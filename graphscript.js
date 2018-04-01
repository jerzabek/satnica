google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawVisualization);

function drawVisualization() {
  if(document.getElementById('zaposlenici-grupa').childElementCount === 0){
    document.getElementById('ggraph').innerHTML = 'Nema zaposlenika za prikaz grafa.';
    return;
  }else {
    document.getElementById('ggraph').innerHTML = '';
  }

  mydata = [];
  pravi = [];
  prvi = ['Legenda', 'Radna norma', 'Stvarna satnica'];

  var brZaposlenika = document.getElementById('zaposlenici-grupa').childElementCount;

  for(var i = 0; i < brZaposlenika; i++){
    var aid = 'checkbox-broj-' + i;
    console.log(aid);
    if(document.getElementById(aid).checked === true){
      var bid = 'zaposlenik-broj-' + i;
      pravi.push(document.getElementById(bid));
    }
  }

  if(pravi.length === 0){
    document.getElementById('ggraph').innerHTML = 'Nema zaposlenika za prikaz grafa.';
    return;
  }else {
    document.getElementById('ggraph').innerHTML = '';
  }

  mydata.push(prvi);
  for(var i = 0; i < pravi.length; i++){
    temp = [];

    temp.push(pravi[i].getElementsByTagName('h4')[0].innerHTML);
    temp.push(parseInt(pravi[i].getElementsByTagName('p')[0].innerHTML)*5);
    temp.push(parseInt(pravi[i].getElementsByTagName('p')[1].innerHTML));
    mydata.push(temp);
  }
  console.log(mydata);
  var data = google.visualization.arrayToDataTable(mydata);

  var options = {
  title : 'Radni sati zaposlenika',
  vAxis: {title: 'Radni sati'},
  hAxis: {title: 'Zaposlenici'},
  seriesType: 'bars',
  // series: {1: {type: 'line'}}
  };

  var chart = new google.visualization.ComboChart(document.getElementById('ggraph'));
  chart.draw(data, options);
}
