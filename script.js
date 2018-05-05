window.onload=function(){
  var polje1 = document.getElementById('ime-polje');
  polje1.addEventListener('keypress', function(event) {
  	if (event.keyCode == 13) {
  		add();
  	}
  });

  var polje2 = document.getElementById('tjedni-polje');
  polje2.addEventListener('keypress', function(event) {
  	if (event.keyCode == 13) {
  		add();
  	}
  });

  var polje3 = document.getElementById('dnevni-polje');
  polje3.addEventListener('keypress', function(event) {
  	if (event.keyCode == 13) {
  		add();
  	}
  });

  var polje4 = document.getElementById('placa-polje');
  polje4.addEventListener('keypress', function(event) {
  	if (event.keyCode == 13) {
  		add();
  	}
  });

  var rdl1 = document.getElementById('placa')
  rdl1.onchange = function(){
    drawVisualization();
  }

  var rdl1 = document.getElementById('satnice')
  rdl1.onchange = function(){
    drawVisualization();
  }

  // document.getElementById('tjedno').onclick = function() {
  //   var label = document.getElementById('labelin');
  //   label.innerHTML = 'Broj odrađenih sati u tjednu'
  // }
  //
  // document.getElementById('mjesecno').onclick = function() {
  //   var label = document.getElementById('labelin');
  //   label.innerHTML = 'Broj odrađenih sati u mjesecu'
  // }
}

function add(){
  var imefield = document.getElementById('ime-polje');
  var tjednofield = document.getElementById('tjedni-polje');
  var dnevnofield = document.getElementById('dnevni-polje');
  var placafield = document.getElementById('placa-polje');
  var odstupanjafield = document.getElementById('odstupanja-polje');

  if(imefield.value.trim() === '' || tjednofield.value.trim() === '' || dnevnofield.value.trim() === '' || placafield.value.trim() === ''){
    return;
  }
  if(!(tjednofield.value == parseInt(tjednofield.value) && dnevnofield.value == parseInt(dnevnofield.value) && placafield.value == parseInt(placafield.value))){
    return;
  }

  var zaposlenici = document.getElementById('zaposlenici-grupa');
  var novi = document.createElement('div');

  novi.setAttribute('class', 'zaposlenik');
  novi.setAttribute('id', 'zaposlenik-broj-' + zaposlenici.childElementCount);

  var h4 = document.createElement('h4');
  h4.setAttribute('class', 'ime-zaposlenika');
  h4.innerHTML = imefield.value;

  var pp = document.createElement('p');
  pp.setAttribute('class', 'placa');
  pp.innerHTML = placafield.value;

  var p1 = document.createElement('p');
  p1.setAttribute('class', 'dnevna-satnica');
  p1.innerHTML = dnevnofield.value;

  var p2 = document.createElement('p');

  p2.setAttribute('class', 'dani-u-tjednu');
  p2.innerHTML = tjednofield.value;

  var p3 = document.createElement('p');
  p3.setAttribute('class', 'delta');
  p3.innerHTML = parseInt(dnevnofield.value)*parseInt(tjednofield.value)*4 + parseInt(odstupanjafield.value);


  var cb = document.createElement('input');
  cb.setAttribute('style', 'width: 16px;');
  cb.setAttribute('type', 'checkbox');
  cb.setAttribute('name', 'ukljucen');
  cb.setAttribute('id', 'checkbox-broj-' + zaposlenici.childElementCount);
  var onchngfnc = function() {
    cb.checked = !cb.checked;

    if(this.checked === false){
      drawVisualization();
      return;
    }
    var brZaposlenika = document.getElementById('zaposlenici-grupa').childElementCount;

    for(var i = 0; i < brZaposlenika; i++){
      var checkCount = 0;
      if(this.getElementsByTagName('input')[0].checked === true){
        checkCount += 1;
      }

      drawVisualization();
    }
  };

  cb.onclick = onchngfnc;

  var ppp = document.createElement('p');
  ppp.innerHTML = 'Ukljuci u graf';

  var divv = document.createElement('div');
  divv.appendChild(cb);
  divv.appendChild(ppp);
  divv.setAttribute('style', 'display: -webkit-inline-box;')

  novi.appendChild(h4);
  novi.appendChild(pp);
  novi.appendChild(p1);
  novi.appendChild(p2);
  novi.appendChild(p3);
  novi.appendChild(divv);
  novi.onclick = onchngfnc;

  var delet = document.createElement('button')
  delet.setAttribute('type', 'button')
  delet.setAttribute('name', 'delete')
  delet.setAttribute('class', 'addbutton')
  delet.innerHTML = 'Ukloni'
  delet.onclick = function() {
    this.parentNode.parentNode.removeChild(this.parentNode);
    drawVisualization();
  }

  var urd = document.createElement('button')
  urd.setAttribute('type', 'button')
  urd.setAttribute('name', 'urde')
  urd.setAttribute('class', 'addbutton')
  urd.innerHTML = 'Uredi'
  urd.onclick = function() {
    var imefield = document.getElementById('ime-polje');
    var dnevnofield = document.getElementById('dnevni-polje');
    var odstupanjafield = document.getElementById('odstupanja-polje');
    var tjednofield = document.getElementById('tjedni-polje');
    var satnicafield = document.getElementById('placa-polje');

    imefield.value = this.parentNode.getElementsByTagName('h4')[0].innerHTML
    satnicafield.value = this.parentNode.getElementsByTagName('p')[0].innerHTML
    dnevnofield.value = this.parentNode.getElementsByTagName('p')[1].innerHTML
    tjednofield.value = this.parentNode.getElementsByTagName('p')[2].innerHTML

    var tjednasat = parseInt(this.parentNode.getElementsByTagName('p')[3].innerHTML)

    odstupanjafield.value = tjednasat - parseInt(dnevnofield.value)*parseInt(tjednofield.value)*4

    this.parentNode.parentNode.removeChild(this.parentNode);
    // drawVisualization();
  }

  novi.appendChild(document.createElement('br'))
  novi.appendChild(delet);
  novi.appendChild(urd)
  zaposlenici.appendChild(novi);

  imefield.value = '';
  dnevnofield.value = '';
  tjednofield.value = '';
  placafield.value = '';
  odstupanjafield.value = '';
}
