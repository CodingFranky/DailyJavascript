const  products = async()=>{
    const response = await fetch('https://dummyjson.com/products?limit=10&skip=10')
    const data = await response.json()
    // console.log(data)
    return data;
  };

