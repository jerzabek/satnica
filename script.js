window.onload=function(){
  var fack1 = document.getElementById('ime-polje');
  fack1.addEventListener('keypress', function(event) {
  	if (event.keyCode == 13) {
  		add();
  	}
  });

  var fack2 = document.getElementById('tjedni-polje');
  fack2.addEventListener('keypress', function(event) {
  	if (event.keyCode == 13) {
  		add();
  	}
  });

  var fack3 = document.getElementById('dnevni-polje');
  fack3.addEventListener('keypress', function(event) {
  	if (event.keyCode == 13) {
  		add();
  	}
  });
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
  p2.setAttribute('class', 'tjedna-satnica');
  p2.innerHTML = tjednofield.value;

  var p3 = document.createElement('p');
  p3.setAttribute('class', 'delta');
  p3.innerHTML = parseInt(dnevnofield.value)*5 - parseInt(tjednofield.value);

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

  zaposlenici.appendChild(novi);

  imefield.value = '';
  dnevnofield.value = '';
  tjednofield.value = '';
}
