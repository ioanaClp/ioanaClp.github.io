window.onload = function () {
    cartUI()
}

const checkoutBtn = document.getElementById('proceed-checkout');
checkoutBtn.addEventListener('click', deleteCart);

function cartUI() {
    let localStorageProducts = localStorage.getItem('cartProducts')
    localStorageProducts = JSON.parse(localStorageProducts);

    document.getElementById('output').innerHTML = '';

    let sum = 0;

    if (localStorageProducts != null) {
        localStorageProducts.forEach(product => {
            const tr = document.createElement('tr');

            const srcImage = document.createElement('img');
            srcImage.src = product.image;
            srcImage.className = 'img-fluid img-thumbnail';
            srcImage.style = 'width: 60%; height: 6vw; object-fit: cover'
            const tdImage = document.createElement('td');
            tdImage.appendChild(srcImage);

            const linkToProduct = document.createElement('a')
            linkToProduct.textContent = product.name
            linkToProduct.style.textDecoration = 'none'
            linkToProduct.style.color = 'black'
            linkToProduct.href = `product_details.html?id=${product.id}`
            const tdName = document.createElement('td');
            tdName.appendChild(linkToProduct)

            const tdPrice = document.createElement('td');
            tdPrice.innerHTML = '$' + product.price;

            const minusBtn = document.createElement('button');
            minusBtn.innerHTML = '<i class="fa fa-minus"></i>';
            minusBtn.className = 'btn btn-dark';
            minusBtn.onclick = function () {
                changeQuantity(product.id, false)
            }
            const plusBtn = document.createElement('button');
            plusBtn.innerHTML = '<i class="fa fa-plus"></i>';
            plusBtn.className = 'btn btn-dark';
            plusBtn.onclick = function () {
                changeQuantity(product.id, true)
            }
            const quantitySpan = document.createElement('span');
            quantitySpan.innerHTML = product.quantity;
            quantitySpan.style.padding = '16px'
            const tdQuantity = document.createElement('td');
            tdQuantity.appendChild(minusBtn);
            tdQuantity.appendChild(quantitySpan);
            tdQuantity.appendChild(plusBtn);


            const tdTotalPrice = document.createElement('td');
            tdTotalPrice.innerHTML = '$' + (product.price * product.quantity).toFixed(2);

            const linkDelete = document.createElement('a');
            linkDelete.id = 'delete-product';
            linkDelete.className = 'btn btn-dark';
            linkDelete.innerHTML = 'Delete';
            linkDelete.onclick = function () {
                deleteProduct(product.id)
            }
            const tdDelete = document.createElement('td');
            tdDelete.appendChild(linkDelete);

            tr.appendChild(tdImage);
            tr.appendChild(tdName);
            tr.appendChild(tdPrice);
            tr.appendChild(tdQuantity);
            tr.appendChild(tdTotalPrice);
            tr.appendChild(tdDelete);

            document.getElementById('output').appendChild(tr);

            sum += Number(product.price * product.quantity);
        });
    }

    let totalPrice = document.getElementById('total-price');
    totalPrice.innerHTML = '$' + sum.toFixed(2);
}

function deleteProduct(id) {
    const cartList = JSON.parse(localStorage.getItem('cartProducts'));
    console.log(cartList);

    let list = [];

    cartList.forEach(product => {
        if (product.id !== id) {
            list.push(product);
        }
    })


    console.log("id", id)
    console.log("carList", cartList)

    localStorage.setItem('cartProducts', JSON.stringify(list));

    cartUI()
}

function changeQuantity(id, isIncremeting) {
    const cartList = JSON.parse(localStorage.getItem('cartProducts'));

    let toBeDeleted = false // flag that indicates if product has to be removed from list because quantity is 0
    cartList.forEach(product => {
        if (product.id === id) {
            if (isIncremeting) {
                product.quantity = product.quantity + 1

            } else {
                product.quantity = product.quantity - 1

                if (product.quantity === 0) {
                    toBeDeleted = true
                }
            }
        }
    })

    // If toBeDeleted is true, meaning that product has quantity 0 we just remove the product from the list    
    if (toBeDeleted) {
        deleteProduct(id)

        // Otherwise we save the list with quantity modified
    } else {
        localStorage.setItem('cartProducts', JSON.stringify(cartList));
        cartUI()
    }
}

function deleteCart() {
    console.log('here')
    localStorage.removeItem('cartProducts');
    cartUI();

    const div = document.createElement('div');
    div.style.width = '100%'
    div.style.margin = 'auto'
    div.style.margin = '30px 0px 10px 0px'
    div.className = 'alert alert-success';
    div.appendChild(document.createTextNode('Thank You for your order!'));
    const container = document.querySelector('.container');
    const title = document.querySelector('#cart-title');
    container.insertBefore(div, title);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}