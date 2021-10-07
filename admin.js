
// GET field inputs
// Create an object that looks like the one received from the mock api
const nameInput = document.getElementById("product-name")
const priceInput = document.getElementById("product-price")
const stockInput = document.getElementById("product-stock")
const categoryInput = document.getElementById("product-category")
const imageInput = document.getElementById("product-image")
const descriptionInput = document.getElementById("product-description")

let isEditing = false;
let productId = null;

const addProductButton = document.getElementById("submit-button")
addProductButton.addEventListener("click", onClickAdd)

window.onload = function () {
    getProducts()
}

// UI Class: Handle UI Tasks
class UI {
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.product-container');
        const form = document.querySelector('.product-form');
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

// Function that is called when you click the add product button
function onClickAdd(e) {
    e.preventDefault()
    // Read all input fields and get their values

    if (!isEditing) {
        console.log("Add product called")
        const nameValue = nameInput.value
        const priceValue = priceInput.value
        const stockValue = stockInput.value
        const categoryValue = categoryInput.value
        const imageValue = imageInput.value
        const descriptionValue = descriptionInput.value

        if (nameValue && priceValue && stockValue && categoryValue && imageValue && descriptionValue) {
            const newProduct = {
                name: nameValue,
                image: imageValue,
                price: priceValue,
                description: descriptionValue,
                category: categoryValue,
                stock: stockValue,
            }

            fetch("https://61363d228700c50017ef54cf.mockapi.io/products", {
                method: 'POST',
                body: JSON.stringify(newProduct),
                headers: { 'Content-Type': 'application/json' },
            }).then(response => {
                // TODO show success message
                UI.showAlert('Product Added', 'success');
                nameInput.value = ''
                priceInput.value = ''
                stockInput.value = ''
                categoryInput.value = ''
                imageInput.value = ''
                descriptionInput.value = ''

                getProducts();
            }).catch(e => {
                // TODO show error message
                UI.showAlert('Something went wrong. The product was not saved', 'danger');
            })
        } else {
            UI.showAlert('Please fill in all fields', 'danger');
        }
    } else {
        const nameValue = nameInput.value
        const priceValue = priceInput.value
        const stockValue = stockInput.value
        const categoryValue = categoryInput.value
        const imageValue = imageInput.value
        const descriptionValue = descriptionInput.value

        if (nameValue && priceValue && stockValue && categoryValue && imageValue && descriptionValue) {
            const newProduct = {
                name: nameValue,
                image: imageValue,
                price: priceValue,
                description: descriptionValue,
                category: categoryValue,
                stock: stockValue,
            }

            fetch("https://61363d228700c50017ef54cf.mockapi.io/products/" + productId, {
                method: 'PUT',
                body: JSON.stringify(newProduct),
                headers: { 'Content-Type': 'application/json' },
            }).then(() => {
                getProducts()

                nameInput.value = ''
                priceInput.value = ''
                stockInput.value = ''
                categoryInput.value = ''
                imageInput.value = ''
                descriptionInput.value = ''

                document.getElementById('submit-button').innerHTML = 'Add Product';

                isEditing = false;
            })

        }
    }


}


// Get Products
function getProducts() {
    fetch("https://61363d228700c50017ef54cf.mockapi.io/products")
        .then(res => res.json())
        .then(data => {
            document.getElementById('output').innerHTML = '';

            data.forEach(product => {
                const tr = document.createElement('tr');

                const th = document.createElement('th');
                th.innerHTML = product.id;

                const tdName = document.createElement('td');
                tdName.innerHTML = product.name;

                const tdPrice = document.createElement('td');
                tdPrice.innerHTML = '$' + product.price;

                const tdStock = document.createElement('td');
                tdStock.innerHTML = product.stock;

                const tdCategory = document.createElement('td');
                tdCategory.innerHTML = product.category;

                const srcImage = document.createElement('img');
                srcImage.src = product.image;
                srcImage.className = 'img-fluid img-thumbnail';
                srcImage.style = 'width: 60%; height: 6vw; object-fit: cover'
                const tdImage = document.createElement('td');
                tdImage.appendChild(srcImage);

                const tdDescription = document.createElement('td');
                tdDescription.innerHTML = product.description;

                const linkEdit = document.createElement('a');
                linkEdit.id = 'edit-product';
                linkEdit.className = 'btn btn-dark';
                linkEdit.innerHTML = 'Edit';
                linkEdit.href = '#input-table';
                linkEdit.onclick = function () {
                    onClickEdit(product);
                }
                const tdEdit = document.createElement('td');
                tdEdit.appendChild(linkEdit);

                const linkDelete = document.createElement('a');
                linkDelete.id = 'delete-product';
                linkDelete.className = 'btn btn-dark';
                linkDelete.innerHTML = 'Delete';
                linkDelete.onclick = function () {
                    onClickDelete(product.id);
                }
                const tdDelete = document.createElement('td');
                tdDelete.appendChild(linkDelete);

                tr.appendChild(th);
                tr.appendChild(tdName);
                tr.appendChild(tdPrice);
                tr.appendChild(tdStock);
                tr.appendChild(tdCategory);
                tr.appendChild(tdImage);
                tr.appendChild(tdDescription);
                tr.appendChild(tdEdit);
                tr.appendChild(tdDelete);

                document.getElementById('output').appendChild(tr);
            })
        })
}

// PUT - edit existing product
function onClickEdit(product) {
    console.log('Edit called ' + JSON.stringify(product));

    nameInput.value = product.name;
    priceInput.value = product.price;
    stockInput.value = product.stock;
    categoryInput.value = product.category;
    imageInput.value = product.image;
    descriptionInput.value = product.description;

    isEditing = true;
    productId = product.id;

    document.getElementById('submit-button').innerHTML = 'Update Product';
}

// Delete Products
function onClickDelete(productId) {
    console.log('Delete called ' + productId)

    fetch(`https://61363d228700c50017ef54cf.mockapi.io/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

            if (data !== "Not found") {
                UI.showAlert('Product deleted successfully', 'success');
            } else {
                UI.showAlert('Product was not found', 'danger');
            }
            return getProducts();
        }).catch(() => {
            UI.showAlert('Something went wrong. The product was not deleted', 'danger');
        });
}

var global = "global";

function test() {
    if (!global) {
        console.log(global)
        var global = "local";
    }

    console.log(global);
}

test();