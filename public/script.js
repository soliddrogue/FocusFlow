
let tab1Next = document.getElementById('tab1-next');
let tab2Next = document.getElementById('tab2-next');
let tab2Previous = document.getElementById('tab2-previous');

let tab3Previous = document.getElementById('tab3-previous');

let tab1 = document.getElementById('tab-1-section');
let tab2 = document.getElementById('tab-2-section');
let tab3 = document.getElementById('tab-3-section');

let tab1Header = document.getElementById('tab-1-btn');
let tab2Header = document.getElementById('tab-2-btn');
let tab3Header = document.getElementById('tab-3-btn');



tab1Next.onclick = function() {
    tab1.style.display = 'none';
    tab1Header.classList.remove('active');
    tab2Header.classList = "active";
    tab2.style.display = 'block';
}

tab2Next.onclick = function() {
    tab2.style.display = 'none';
    tab2Header.classList.remove('active');
    tab3Header.classList = "active";
    tab3.style.display = 'block';

    let location = document.querySelector('input:checked');
    let name = document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value;
    let email = document.getElementById('email').value;

  if (location) {
    location = location.value;
  } else {
    location = '';
  }
    document.getElementById('location-confirm').innerHTML = '<strong>Location: </strong>' + location;
    document.getElementById('name-confirm').innerHTML = '<strong>Name: </strong>' + name;
    document.getElementById('email-confirm').innerHTML = '<strong>Email: </strong>' + email;
}

tab2Previous.onclick = function() {
    tab2.style.display = 'none';
    tab2Header.classList.remove('active');
    tab1Header.classList = 'active';
    tab1.style.display = 'block';
}

tab3Previous.onclick = function() {
    tab3.style.display = 'none';
    tab3Header.classList.remove('active');
    tab2Header.classList = 'active';
    tab2.style.display = 'block';
}

