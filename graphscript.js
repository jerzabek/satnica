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
  prvi = ['Legenda', 'Radna norma', 'Ostvarena satnica'];

  var zapgr = document.getElementById('zaposlenici-grupa')
  var brZaposlenika = zapgr.childElementCount;

  for(var i = 0; i < brZaposlenika; i++){
    var aa1 = zapgr.childNodes[i+1];
    var aa2 = aa1.getElementsByTagName('input')[0];
    if(aa2.checked === true){
      var bid = 'zaposlenik-broj-' + i;
      pravi.push(zapgr.childNodes[i+1]);
    }
  }

  if(pravi.length === 0){
    document.getElementById('ggraph').innerHTML = 'Nema zaposlenika za prikaz grafa.';
    return;
  }else {
    document.getElementById('ggraph').innerHTML = '';
  }

  var tj = document.getElementById('tjedno')
  var mj = document.getElementById('mjesecno')

  mydata.push(prvi);
  for(var i = 0; i < pravi.length; i++){
    temp = [];

    // temp.push(pravi[i].getElementsByTagName('h4')[0].innerHTML);

    var tjmj = pravi[i].childNodes[2].className

    if(tjmj.includes('tjedna-satnica')){
      temp.push(pravi[i].getElementsByTagName('h4')[0].innerHTML + ' (tjedno)');
      temp.push(parseInt(pravi[i].getElementsByTagName('p')[0].innerHTML)*5);
    }else if(tjmj.includes('mjesecna-satnica')){
      temp.push(pravi[i].getElementsByTagName('h4')[0].innerHTML + ' (mjesečno)');
      temp.push(parseInt(pravi[i].getElementsByTagName('p')[0].innerHTML)*5*4);
    }

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
