var base_url = "https://forkify-api.herokuapp.com/api";
var pizza_data = null;
var all_Queries = null;
var Query = "pizza";

function callAPI(text) {
  //   console.log(text);
  fetch(base_url + `/search?q=${text}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      pizza_data = data;
      fillAllData();
    });
}
fetch(".//API/queries.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    all_Queries = data;
    readAllQueries();
  });

function changeMainMenuStyle() {
  var menuBar = document.querySelector("#menu");
  if (menuBar.offsetLeft === 0) menuBar.style.left = "-100%";
  else {
    menuBar.style.left = "0";
  }
}
var mainmenuButton = document.querySelector("#control-menu");
mainmenuButton.onclick = () => {
  var menuBar = document.querySelector("#menu");
  if (menuBar.offsetLeft === 0) menuBar.style.left = "-100%";
  else {
    menuBar.style.left = "0";
  }
};
callAPI(Query);

function readAllQueries() {
  //   console.log(all_Queries);
  var queriesItems = document.querySelector("#list-Items");
  for (let i = 0; i < all_Queries.length; i++) {
    var item = document.createElement("li");
    item.className = "py-3 ps-3 border-bottom fs-3";
    item.id = all_Queries[i];
    item.onclick = () => {
      //   console.log(all_Queries[i]);
      changeMainMenuStyle();
      callAPI(all_Queries[i]);
    };
    item.innerHTML = `<span></span> <p>${all_Queries[i]}</p>`;
    queriesItems.appendChild(item);
  }
}

function fillAllData() {
  var recipeItem = document.querySelector("#resipes-container");
  recipeItem.innerHTML = "";
  for (let i = 0; i < pizza_data.recipes.length; i++) {
    var item = document.createElement("div");
    item.className = "col-md-4";
    item.id = pizza_data.recipes[i].recipe_id;
    var itemContainer = document.createElement("div");
    itemContainer.className =
      "resipe-box make-pointer bg-light shadow-lg border rounded";
    var itemImgContainer = document.createElement("div");
    itemImgContainer.className = "resipe-img";
    var itemImg = document.createElement("img");
    itemImg.src = pizza_data.recipes[i].image_url;
    itemImg.className = "w-100";
    itemImgContainer.appendChild(itemImg);
    itemContainer.appendChild(itemImgContainer);
    var itemContent = document.createElement("div");
    itemContent.className = "content px-2";
    var itemTitle = document.createElement("h3");
    itemTitle.className = "my-3";
    itemTitle.innerHTML = pizza_data.recipes[i].title;
    itemContent.appendChild(itemTitle);
    var itemAuthor = document.createElement("p");
    itemAuthor.innerHTML = pizza_data.recipes[i].publisher;
    itemContent.appendChild(itemAuthor);
    itemContainer.appendChild(itemContent);
    item.appendChild(itemContainer);
    recipeItem.appendChild(item);
    item.onclick = () => productItemGenerator(pizza_data.recipes[i].recipe_id);
  }
}

function productItemGenerator(id) {
  console.log(id);
  var productContainer = document.querySelector("#product-container");
  var productItem = document.querySelector("#product-item");
  // productItem.innerHTML = "";
  var itemData = null;
  fetch(base_url + `/get?rId=${id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      itemData = data;
      productContainer.classList.replace("d-none", "d-flex");
      productItem.innerHTML = "";
      var itemContainer = document.createElement("div");
      itemContainer.className = "card";
      itemContainer.style = "width: 18rem";
      var itemImgContainer = document.createElement("div");
      itemImgContainer.className = "itemImg";
      var itemImg = document.createElement("img");
      itemImg.src = itemData.recipe.image_url;
      itemImg.className = "card-img-top ";
      itemImg.alt = itemData.recipe.publisher;
      itemImgContainer.appendChild(itemImg);
      itemContainer.appendChild(itemImgContainer);
      var itemContent = document.createElement("div");
      itemContent.className = "card-body";
      var itemTitle = document.createElement("h5");
      itemTitle.className = "card-title";
      itemTitle.innerHTML = itemData.recipe.title;
      itemContent.appendChild(itemTitle);
      var itemText = document.createElement("p");
      itemText.className = "card-text";
      itemText.innerHTML = `Publisher: ${itemData.recipe.publisher}`;
      itemContent.appendChild(itemText);
      var itemRank = document.createElement("p");
      itemRank.className = "card-text";
      itemRank.innerHTML = `Social Rank: ${itemData.recipe.social_rank}`;
      itemContent.appendChild(itemRank);
      itemContainer.appendChild(itemContent);

      var itemListGroup = document.createElement("ul");
      itemListGroup.className = "list-group list-group-flush scrollable-list";
      itemListGroup.innerHTML = "";
      for (let i = 0; i < itemData.recipe.ingredients.length; i++) {
        var itemIngredient = document.createElement("li");
        itemIngredient.className = "list-group-item";
        itemIngredient.innerHTML = itemData.recipe.ingredients[i];
        itemListGroup.appendChild(itemIngredient);
      }

      itemContainer.appendChild(itemListGroup);
      var itemCardBody = document.createElement("div");
      itemCardBody.className = "card-body";
      var itemlink1 = document.createElement("a");
      itemlink1.className = "btn btn-primary";
      itemlink1.innerHTML = "Source";
      itemlink1.href = itemData.recipe.source_url;
      itemCardBody.appendChild(itemlink1);
      var itemlink2 = document.createElement("a");
      itemlink2.className = "btn btn-primary";
      itemlink2.innerHTML = "Publisher";
      itemlink2.href = itemData.recipe.publisher_url;
      itemCardBody.appendChild(itemlink2);
      itemContainer.appendChild(itemCardBody);
      // console.log(itemContainer);
      var itemButton = document.createElement("button");
      itemButton.className = "btn-close";
      itemButton.id = "product-close-button";
      productItem.appendChild(itemButton)
      productItem.appendChild(itemContainer);

      var closeButton = document.querySelector("#product-close-button");
      closeButton.onclick = () => {
        console.log(1);
        var productItem = document.querySelector("#product-container");
        console.log(productItem.className);
        productItem.classList.replace("d-flex", "d-none");
        console.log(productItem.className);
      };
    });
}

function p(callback){
  console.log(1);
  callback()
}

function p2(callback){
  console.log(2);
  callback();
}

function p3(){
  console.log(3);
}

p(()=>{p2(p3)})