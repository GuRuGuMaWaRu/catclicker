
$(document).ready(function() {
  var currentCat = document.getElementById('display-cat'),
      cats = [
    {
      name: 'Doplik',
      url: 'ex_3/cat_picture1.jpg',
      clicks: 0
    },
    {
      name: 'Bublik',
      url: 'http://i1036.photobucket.com/albums/a444/Peter_Krevenets/bublik_zpsjqu3uydh.jpg',
      clicks: 0
    },
    {
      name: 'Rublik',
      url: 'ex_3/cat_picture2.jpg',
      clicks: 0
    },
    {
      name: 'Musya',
      url: 'ex_3/cat_picture3.jpg',
      clicks: 0
    },
    {
      name: 'Busya',
      url: 'ex_3/cat_picture4.jpg',
      clicks: 0
    },
    {
      name: 'Burulkin',
      url: 'ex_3/cat_picture5.jpg',
      clicks: 0
    }
  ];

  // function to display a cat
  function displayCat(cat) {
    currentCat.querySelector('h3').innerHTML = cat.name;
    currentCat.querySelector('img').setAttribute('src', cat.url);
    currentCat.querySelector('div').innerHTML = cat.clicks;
  }

  // set initially displayed cat
  displayCat(cats[0]);

  // count clicks
  currentCat.querySelector('img').addEventListener('click', function() {
    var catName = currentCat.querySelector('h3').innerHTML;

    for (var j = 0; j < cats.length; j++) {
      if (cats[j].name === catName) {
        cats[j].clicks += 1;
        currentCat.querySelector('div').innerHTML = cats[j].clicks;
      }
    }
  }, false);

  // iterate through cats and add them to the list
  for (var i = 0, len = cats.length; i < len; i++) {
    var element = document.createElement('div'),
        title = document.createElement('h3');

    title.innerHTML = cats[i].name;
    title.classList.add('cat');
    element.appendChild(title);
    element.classList.add('col-xs-2', 'cat-image');
    element.addEventListener('click', function() {
      var catObj = {},
          clickedCat = this.childNodes[0].innerHTML;

      for (var j = 0; j < cats.length; j++) {
        if (cats[j].name === clickedCat) {
          catObj = cats[j];
        }
      }

      // display a clicked cat
      displayCat(catObj);
    });

    document.getElementById('cat-list').appendChild(element);
  }

})
