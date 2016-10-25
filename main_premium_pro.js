$(function() {

  model = {
    currentCat: null,
    cats: [
      {
        id: 0,
        name: 'Bublik',
        url: 'ex_3/cat_picture1.jpg',
        clicks: 0
      },
      {
        id: 1,
        name: 'Doplik',
        url: 'ex_3/cat_picture2.jpeg',
        clicks: 0
      },
      {
        id: 2,
        name: 'Rublik',
        url: 'ex_3/cat_picture3.jpeg',
        clicks: 0
      },
      {
        id: 3,
        name: 'Musya',
        url: 'ex_3/cat_picture4.jpeg',
        clicks: 0
      },
      {
        id: 4,
        name: 'Busya',
        url: 'ex_3/cat_picture5.jpeg',
        clicks: 0
      },
      {
        id: 5,
        name: 'Burulkin',
        url: 'http://i1036.photobucket.com/albums/a444/Peter_Krevenets/bublik_zpsjqu3uydh.jpg',
        clicks: 0
      }
    ],
    showAdmin: false,
    init: function() {
      if (!localStorage.cats) {
        localStorage.cats = JSON.stringify(this.cats);
      }
    },
    getCats: function() {
      return JSON.parse(localStorage.cats);
    },
    setCurrentCat: function(id) {
      var cats = JSON.parse(localStorage.cats);
      // save current cat if it exists

      if (this.currentCat) {
        var currentCat = this.currentCat,
            newCats = cats;

        newCats = cats.map(function(cat) {
          if (cat.id === currentCat.id) {
            return currentCat;
          } else {
            return cat;
          }
        });

        // save updated cats into localStorage
        localStorage.cats = JSON.stringify(newCats);
        cats = newCats;
      }
      // set a new current cat
      this.currentCat = cats.filter(function(cat) {
        return cat.id === id;
      })[0];
    }
  };

  octopus = {
    init: function() {
      model.init();
      model.setCurrentCat(0);
      catView.init();
      catListView.init();
      adminView.init();
    },
    getCats: function() {
      return model.getCats();
    },
    getCurrentCat: function() {
      return model.currentCat;
    },
    selectCat: function(id) {
      model.setCurrentCat(id);
      catView.render();
      adminView.render();
    },
    counter: function() {
      model.currentCat.clicks += 1;

      catView.render();
      adminView.render();
    },
    toggleAdminView: function() {
      model.showAdmin = !model.showAdmin;
      adminView.render();
    },
    adminViewDisplayed: function() {
      return model.showAdmin;
    },
    changeCatDetails: function() {
      var cat = {},
          newValue = event.target.value;

      if (event.target.id === "form-name") {
        model.currentCat.name = newValue;
      } else if (event.target.id === "form-url") {
        model.currentCat.url = newValue;
      } else if (event.target.id === "form-clicks") {
        model.currentCat.clicks = newValue;
      }

      catView.render();
      adminView.render();
    }
  };

  catView = {
    init: function() {
      this.catElement = document.getElementById("cat");
      this.catNameElement = document.getElementById("cat-name");
      this.catImageElement = document.getElementById("cat-image");
      this.catCountElement = document.getElementById("cat-count");

      this.catImageElement.addEventListener("click", function() {
        octopus.counter();
      });

      this.render();
    },
    render: function() {
      var currentCat = octopus.getCurrentCat();

      this.catNameElement.textContent = currentCat.name;
      this.catImageElement.src = currentCat.url;
      this.catCountElement.textContent = currentCat.clicks;
    }
  };

  catListView = {
    init: function() {
      this.catListElement = document.getElementById("cat-list");

      this.render();
    },
    render: function() {
      var cats = octopus.getCats();

      // create a list of cats
      this.catListElement.innerHTML = "";
      for (var i = 0, len = cats.length; i < len; i++) {
        var catItem = document.createElement("div");

        catItem.classList.add("col-xs-2", "cat-image");
        catItem.innerHTML = cats[i].name;
        catItem.addEventListener("click", (function(catCopy) {
          return function() {
            octopus.selectCat(catCopy);
          };
        })(cats[i].id));
        this.catListElement.appendChild(catItem);
      }
    }
  };

  adminView = {
    init: function() {
      this.adminButtonElement = document.getElementById("admin-button");
      this.adminViewElement = document.getElementById("admin-view");
      this.formNameElement = document.getElementById("form-name");
      this.formUrlElement = document.getElementById("form-url");
      this.formClicksElement = document.getElementById("form-clicks");

      this.adminButtonElement.addEventListener("click", function() {
        octopus.toggleAdminView();
      });
      this.formNameElement.addEventListener("keyup", function() {
        octopus.changeCatDetails();
      });

      this.render();
    },
    render: function() {
      var currentCat = octopus.getCurrentCat();

      this.formNameElement.value = currentCat.name;
      this.formUrlElement.value = currentCat.url;
      this.formClicksElement.value = currentCat.clicks;

      if (octopus.adminViewDisplayed()) {
        this.adminViewElement.style.opacity = 1;
      } else {
        this.adminViewElement.style.opacity = 0;
      }

    }
  }

  octopus.init();

}());
