window.onload = function () {
    getProducts()
}

// Get Category Links
const sofaLink = document.getElementById('sofa');
const chairLink = document.getElementById('chair');
const lightsLink = document.getElementById('lights');
const decorLink = document.getElementById('decor');
const allLink = document.getElementById('all');

allLink.addEventListener('click', function () {
    categoryFilter("All")
});

sofaLink.addEventListener('click', function () {
    categoryFilter("Sofa")
});
chairLink.addEventListener('click', function () {
    categoryFilter("Chair")
});
lightsLink.addEventListener('click', function () {
    categoryFilter("Light")
});
decorLink.addEventListener('click', function () {
    categoryFilter("Decor")
});

let allProducts = [];

// Get Products
function getProducts() {
    fetch("https://61363d228700c50017ef54cf.mockapi.io/products")
        .then(res => res.json())
        .then(data => {
            allProducts = data

            const output = renderProducts(data)

            document.getElementById('products').innerHTML = output;
        })
}

function renderProducts(data) {
    let output = ``;

    let counter = 0;

    data.forEach((product, index) => {
        if (counter < 4) {
            counter++
        } else {
            counter = 1;
        }

        if (counter === 1) {
            output += `<div
                    class="d-flex row justify-content-center mb-3"
                    id="all-products-placeholder"
                  >`
        }

        output += `
                <div class="card-goup mt-2" style="width: 20rem; height: auto">
                <div class="card border-0">
                  <a
                    class="text-dark"
                    style="text-decoration: none"
                    href="product_details.html?id=${product.id}"
                  >
                    <img
                      class="card-img-top img-fluid"
                      style="width: 100%; height: 24rem; object-fit: cover"
                      src="${product.image}"
                      alt="Card image cap"
                    />
                    <p class="card-text text-center pt-2">${product.name}</p>
                    <p class="card-text text-center">$${product.price}</p>
                  </a>
                </div>
              </div>
                `

        if (index === data.length - 1 || counter == 4) {
            output += `</div>`
        }

    })

    return output
}



// Filter Categories
function categoryFilter(category) {
    const data = allProducts
        .filter(product => {
            if (category === "All" || product.category === category) {
                return true
            } else {
                return false
            }
        })

    const output = renderProducts(data)

    document.getElementById('products').innerHTML = output;
}