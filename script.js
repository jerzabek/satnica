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

  document.getElementById('tjedno').onclick = function() {
    var label = document.getElementById('labelin');
    label.innerHTML = 'Broj odrađenih sati u tjednu'
  }

  document.getElementById('mjesecno').onclick = function() {
    var label = document.getElementById('labelin');
    label.innerHTML = 'Broj odrađenih sati u mjesecu'
  }
}

function add(){
  var imefield = document.getElementById('ime-polje');
  var tjednofield = document.getElementById('tjedni-polje');
  var dnevnofield = document.getElementById('dnevni-polje');

  if(imefield.value.trim() === '' || tjednofield.value.trim() === '' || dnevnofield.value.trim() === ''){
    return;
  }
  if(!(tjednofield.value == parseInt(tjednofield.value) && dnevnofield.value == parseInt(dnevnofield.value))){
    return;
  }

  var zaposlenici = document.getElementById('zaposlenici-grupa');
  var novi = document.createElement('div');

  novi.setAttribute('class', 'zaposlenik');
  novi.setAttribute('id', 'zaposlenik-broj-' + zaposlenici.childElementCount);

  var h4 = document.createElement('h4');
  h4.setAttribute('class', 'ime-zaposlenika');
  h4.innerHTML = imefield.value;

  var p1 = document.createElement('p');
  p1.setAttribute('class', 'dnevna-satnica');
  p1.innerHTML = dnevnofield.value;

  var p2 = document.createElement('p');
  var tj = document.getElementById('tjedno')
  var mj = document.getElementById('mjesecno')
  var str = ''

  if(tj.checked){
    str = 'tjedna-satnica'
  }else if(mj.checked){
    str = 'mjesecna-satnica'
  }

  p2.setAttribute('class', str);
  p2.innerHTML = tjednofield.value;

  var p3 = document.createElement('p');
  p3.setAttribute('class', 'delta');
  if(tj.checked){
    p3.innerHTML = parseInt(dnevnofield.value)*5 - parseInt(tjednofield.value);
  }else if(mj.checked){
    p3.innerHTML = parseInt(dnevnofield.value)*5*4 - parseInt(tjednofield.value);
  }

  if(parseInt(p3.innerHTML) < 0){
    p3.className += ' visak-sati';
    p3.innerHTML = Math.abs(parseInt(p3.innerHTML));
  }else if(parseInt(p3.innerHTML) > 0){
    p3.className += ' manjak-sati';
  }else{
    p3.innerHTML = 'Potpuna satnica';
  }

  var cb = document.createElement('input');
  cb.setAttribute('style', 'width: 16px;');
  cb.setAttribute('type', 'checkbox');
  cb.setAttribute('name', 'ukljucen');
  cb.setAttribute('id', 'checkbox-broj-' + zaposlenici.childElementCount);
  cb.addEventListener( 'change', function() {
    if(this.checked === false){
      drawVisualization();
      return;
    }
    var brZaposlenika = document.getElementById('zaposlenici-grupa').childElementCount;

    for(var i = 0; i < brZaposlenika; i++){
      var aid = 'checkbox-broj-' + i;
      var checkCount = 0;
      if(document.getElementById(aid).checked === true){
        checkCount += 1;
      }

      if(checkCount < 5){
        drawVisualization();
      }else {
        alert('Dozvoljeno je maksimalno 5 zaposlenika na grafu radi preglednosti.');
        drawVisualization();
      }
    }
  });
  var ppp = document.createElement('p');
  ppp.innerHTML = 'Ukljuci u graf';

  var divv = document.createElement('div');
  divv.appendChild(cb);
  divv.appendChild(ppp);
  divv.setAttribute('style', 'display: -webkit-inline-box;')

  novi.appendChild(h4);
  novi.appendChild(p1);
  novi.appendChild(p2);
  novi.appendChild(p3);
  novi.appendChild(divv);
  novi.onclick = function() {
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
  }

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
    var tjednofield = document.getElementById('tjedni-polje');

    imefield.value = this.parentNode.getElementsByTagName('h4')[0].innerHTML
    dnevnofield.value = this.parentNode.getElementsByTagName('p')[0].innerHTML

    var mjtj = this.parentNode.getElementsByTagName('p')[1];
    tjednofield.value = mjtj.innerHTML

    var tj = document.getElementById('tjedno')
    var mj = document.getElementById('mjesecno')

    if(mjtj.className.includes('tjedna-satnica')){
      tj.checked = true
    }else if(mjtj.className.includes('mjesecna-satnica')){
      mj.checked = true;
    }
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
}
