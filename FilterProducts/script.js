async function fetchProducts(url) {

  const response = await fetch(url);
  const data = await response.json();
  return data.products;
}

async function getProducts(params) {
  let products = await fetchProducts('https://dummyjson.com/products?limit=30&skip=30');
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
getProducts()

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
document.querySelector(".search").addEventListener("click", searchProduct)
document.querySelector(".category_btn").addEventListener("click", (e) => searchCategory(e))
