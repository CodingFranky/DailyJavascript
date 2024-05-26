async function fetchProducts() {

  const response = await fetch('https://dummyjson.com/products?limit=30&skip=30');
  const data = await response.json();
  return data.products;
}
let productsList = [];

(async () => {
  productsList = await fetchProducts();
  //console.log(products) //this will have values but will be displayed later in console due to async nature of the function
  getProducts()
})();
//console.log(products) //this will return [] because this will be executed first and hence []


function getProducts(params) {
  let products = productsList;
  let categories = products.map((item => item.category))
  categories = new Set(categories)
  let string = ''
  categories.forEach((item => {
    string = string + `<button class="category">${item}</button>`

  }))
  string = string + `<button class="clear">Clear Filter</button>`
  // console.log(params)
  if (params?.filter) {
    products = products.filter((product) => product.title.toLowerCase().includes(params.filter.toLowerCase()))
  }
  if (params?.category) {
    products = products.filter((product) => product.category.includes(params.category))
  }
  let htmlString = ''
  products.forEach((item) => {
    htmlString = htmlString + `<div class="product_card">
    <div class="prd_img">
      <img src=${item.thumbnail} alt="">
    </div>
      <p class="title"> ${item.title}</p>
    </div>`
  })


  document.querySelector(`.product_container`).innerHTML = htmlString
  document.querySelector(`.category_btn`).innerHTML = string

}


function searchProduct() {
  const filter = document.querySelector(".inputField").value
  getProducts({ filter: filter });

}

function searchCategory(e) {

  if (e.target.classList == 'category') {
    getProducts({ category: e.target.innerText })
  }
  if (e.target.classList == 'clear') {
    getProducts()
  }
}

function searchSuggestion() {
  let products = productsList;
  const search = document.querySelector(".inputField").value.toLowerCase();
  let string = '';
  if (search.length > 1) {
    const searched_items = products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
    searched_items.forEach((item) => {
      string = string + `<p id=search_name>${item.title}</p>`
    })
  }
  document.querySelector('.suggestion_box').innerHTML = string;

}



document.querySelector(".search").addEventListener("click", searchProduct)
document.querySelector(".category_btn").addEventListener("click", (e) => searchCategory(e))
document.querySelector(".inputField").addEventListener("input", searchSuggestion)
document.querySelector('.suggestion_box').addEventListener("click", (e) => {
  console.log(e.target.innerText);
  getProducts({ filter: e.target.innerText });
  document.querySelector('.suggestion_box').innerHTML = '';
})


