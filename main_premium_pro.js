$(function() {

  model = {
    currentCat: null,
    cats: [
      {
        name: 'Bublik',
        url: 'ex_3/cat_picture1.jpg',
        clicks: 0
      },
      {
        name: 'Doplik',
        url: 'ex_3/cat_picture2.jpeg',
        clicks: 0
      },
      {
        name: 'Rublik',
        url: 'ex_3/cat_picture3.jpeg',
        clicks: 0
      },
      {
        name: 'Musya',
        url: 'ex_3/cat_picture4.jpeg',
        clicks: 0
      },
      {
        name: 'Busya',
        url: 'ex_3/cat_picture5.jpeg',
        clicks: 0
      },
      {
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
    setCurrentCat: function(catname) {
      var cats = JSON.parse(localStorage.cats),
          currentCat = this.currentCat;
      // save current cat if it exists
      if (currentCat) {
        cats.map(function(cat) {
          // console.log("cat.name:", cat.name);
          // console.log("currentCat.name:", currentCat.name);
          // console.log("cat.name === currentCat.name:", cat.name === currentCat.name);
          if (cat.name === currentCat.name) {
            console.log("cat:", cat);
            console.log("currentCat:", currentCat);
            cat = currentCat;
            console.log("cat:", cat);
            console.log("currentCat:", currentCat);
          }
        });
        // save updated cats into localStorage
        localStorage.cats = JSON.stringify(cats);
      }
      // set a new current cat
      this.currentCat = cats.filter(function(cat) {
        return cat.name === catname;
      })[0];
    }
    // saveCurrentCat: function() {
    //   var cats = JSON.parse(localStorage.cats),
    //       currentCat = this.currentCat;
    //
    //   cats.map(function(cat) {
    //     if (cat.name === currentCat.name) {
    //       cat = currentCat;
    //     }
    //   });
    //
    //   localStorage.cats = JSON.stringify(cats);
    // }
  };

  octopus = {
    init: function() {
      model.init();
      model.setCurrentCat('Bublik');
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
    selectCat: function(catName) {
      model.setCurrentCat(catName);
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
        cat.name = newValue;
      } else if (event.target.id === "form-url") {
        cat.url = newValue;
      } else if (event.target.id === "form-clicks") {
        cat.clicks = newValue;
      }

      model.setCurrentCat = cat;
      model.saveCurrentCat();
      catView.render();
      catListView.render();
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
        })(cats[i].name));
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
