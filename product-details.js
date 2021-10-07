window.onload = function () {
    getProduct()
}

let product = null;

const addToCartBtn = document.getElementById('add-cart-btn');
addToCartBtn.addEventListener('click', addProductToCart);

// Get Products
function getProduct() {
    let searchParamString = window.location.search;
    console.log(window.location)

    const searchParam = new URLSearchParams(searchParamString);

    console.log(searchParam.get('id'));
    const id = searchParam.get('id');

    fetch(`https://61363d228700c50017ef54cf.mockapi.io/products/${id}`)
        .then(res => res.json())
        .then(data => {
            product = data;

            console.log(data)

            document.getElementById('product-title').innerHTML = data.name;
            document.getElementById('product-price').innerHTML = "$" + data.price;
            document.getElementById('product-description').innerHTML = 'Description: ' + data.description;
            document.getElementById('product-stock').innerHTML = data.stock;
            document.getElementById('product-image-details').src = data.image;

            getRelatedProducts(data);

        })

}

function addProductToCart() {

    let cartList;

    if (localStorage.getItem('cartProducts') === null) {
        cartList = [];
    } else {
        cartList = JSON.parse(localStorage.getItem('cartProducts'));
    }

    let foundIt = false;
    cartList.forEach(element => {
        if (element.id === product.id) {
            foundIt = true;
        }
    })

    product.quantity = 1;

    if (!foundIt) {
        cartList.push(product);
    }

    localStorage.setItem('cartProducts', JSON.stringify(cartList));

    showAlertAddToCart();
}

function getRelatedProducts(initialProduct) {
    fetch("https://61363d228700c50017ef54cf.mockapi.io/products")
        .then(res => res.json())
        .then(data => {
            let output = ``;
            data.forEach(element => {
                if (element.category === initialProduct.category && element.id !== initialProduct.id) {
                    output += `
                        <div class="card-goup" style="width: 18rem; height: auto">
                        <div class="card border-0">
                            <a class="text-dark" style="text-decoration: none" href="product_details.html?id=${element.id}">
                                <img
                                class="card-img-top img-fluid"
                                style="width: 100%; height: 24rem; object-fit: cover"
                                src="${element.image}"
                                alt="Card image cap"
                                />
                                <p class="card-text text-center pt-2">
                                ${element.name} <br />
                                <small>${element.price}</small>
                                </p>
                            </a>
                        </div>
                    </div>
                    `
                }

            });
            document.getElementById('related-products-container').innerHTML = output;
        })
}

function showAlertAddToCart() {
    const div = document.createElement('div');
    div.style.width = '80%'
    div.style.margin = 'auto'
    div.style.marginBottom = '20px'
    div.className = 'alert alert-success';
    div.appendChild(document.createTextNode('Product Added to Cart Succesfully!'));
    const container = document.querySelector('.product-container');
    const form = document.querySelector('.product-details');
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);

}