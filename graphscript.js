google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(drawVisualization);

function drawVisualization() {
  if(document.getElementById('zaposlenici-grupa').childElementCount === 0){
    document.getElementById('ggraph').innerHTML = 'Nema zaposlenika za prikaz grafa.';
    return;
  }else {
    document.getElementById('ggraph').innerHTML = '';
  }

  var placas = document.getElementById('placa');
  var sats = document.getElementById('satnice');

  if(placas.checked){
    place();
  }else if(sats.checked){
    satnice();
  }
}

function place(){
  mydata = [];
  pravi = [];
  prvi = ['Legenda', 'Plaća za broj odrađenih sati'];

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

  var min = parseInt(pravi[0].getElementsByTagName('p')[3].innerHTML)*parseInt(pravi[0].getElementsByTagName('p')[0].innerHTML);
  var max = 0;

  mydata.push(prvi);
  for(var i = 0; i < pravi.length; i++){
    temp = [];
    temp.push(pravi[i].getElementsByTagName('h4')[0].innerHTML);
    temp.push(parseInt(pravi[i].getElementsByTagName('p')[3].innerHTML)*parseInt(pravi[i].getElementsByTagName('p')[0].innerHTML));

    if(parseInt(pravi[i].getElementsByTagName('p')[3].innerHTML)*parseInt(pravi[i].getElementsByTagName('p')[0].innerHTML) < min){
      min = parseInt(pravi[i].getElementsByTagName('p')[3].innerHTML)*parseInt(pravi[i].getElementsByTagName('p')[0].innerHTML)
    }

    if(parseInt(pravi[i].getElementsByTagName('p')[3].innerHTML)*parseInt(pravi[i].getElementsByTagName('p')[0].innerHTML) > max){
      max = parseInt(pravi[i].getElementsByTagName('p')[3].innerHTML)*parseInt(pravi[i].getElementsByTagName('p')[0].innerHTML);
    }
    mydata.push(temp);
  }

  var data = google.visualization.arrayToDataTable(mydata);

  var rrr = min - parseInt(0.1*(max - min))


  if(max === min){
    rrr = parseInt(0.95*min)
  }

  var options = {
    height: 400,
    title : 'Plaće zaposlenika',
    subtitle: 'Plaće u HRK za odrađenu satnicu u jednom mjesecu (4 tjedna)',
    vAxis: {title: 'Plaća', format: 'decimal', baseline: rrr, gridlines: { count: 10 }},
    hAxis: {title: 'Zaposlenici'},
    seriesType: 'bars',
    // series: {1: {type: 'line'}}
  };

  var chart = new google.charts.Bar(document.getElementById('ggraph'));
  chart.draw(data, google.charts.Bar.convertOptions(options));
}

function satnice(){
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

  min = 999999
  max = 0
  mydata.push(prvi);
  for(var i = 0; i < pravi.length; i++){
    temp = [];
    temp.push(pravi[i].getElementsByTagName('h4')[0].innerHTML); //Ime zaposlenika

    var satnica = parseInt(pravi[i].getElementsByTagName('p')[1].innerHTML)
    var daniutj = parseInt(pravi[i].getElementsByTagName('p')[2].innerHTML)
    var odr = parseInt(pravi[i].getElementsByTagName('p')[3].innerHTML)

    temp.push(satnica * daniutj * 4)
    temp.push(odr)

    if(satnica * daniutj * 4 < min){
      min = satnica * daniutj * 4
    }
    if(satnica * daniutj * 4 > max){
      max = satnica * daniutj * 4;
    }

    if(odr < min){
      min = odr;
    }
    if(odr > max){
      max = odr;
    }

    mydata.push(temp);
  }

  var data = google.visualization.arrayToDataTable(mydata);
  var rrr = min - 0.1*(max - min)
  if(max === min){
    rrr = parseInt(0.9*min)
  }
  var options = {
    height: 400,
    width: '100%',
    subtitle: 'Broj radnih sati u jednom mjesecu (4 tjedna)',
    title : 'Radni sati zaposlenika',
    vAxis: {title: 'Radni sati', format: 'decimal', baseline: rrr},
    hAxis: {title: 'Zaposlenici'},
    seriesType: 'bars',
    // series: {1: {type: 'line'}}
  };

  var chart = new google.charts.Bar(document.getElementById('ggraph'));
  chart.draw(data, google.charts.Bar.convertOptions(options));
}
