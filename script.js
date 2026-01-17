const inputName = document.querySelector("#input-name");
const inputPrice = document.querySelector("#input-price");
const inputQuality = document.querySelector("#input-quality");
const submit = document.querySelector(".btn");
const searchData = document.querySelector(".search-data");
const searchProducting = document.querySelector("#search-product");

const dateDisplay = document.querySelector("#data-display");


let products = JSON.parse(localStorage.getItem("products")) || [];
let subTotal = 0;

const total = document.querySelector("#total");

submit.addEventListener("click", () => {
     const productName = String(inputName.value).trim();
     const productPrice = Number(inputPrice.value);
     const productQuality = Number(inputQuality.value);

     const itemsTotal = productPrice * productQuality;
     
     const product = {
          name : productName,
          price : productPrice,
          quality : productQuality,
          total : itemsTotal
     }
     productValid (productName, productPrice, productQuality);
     products.push(product);
     renderTable();
     calculateProduct ();
     saveToLocalStorage();
     dateYearDisplay(dateDisplay);

     inputName.value = "";
     inputPrice.value = "";
     inputQuality.value = "";
});

function productValid (productName, productPrice, productQuality) {

     if (!productName || productPrice <= 0 || productQuality <= 0) {
          alert("You Didn't Enter the value Please Enter First.");
          return;
     };
}

function renderTable () {
     searchData.innerHTML = "";

     products.forEach((product, index) => {
          const tableRow = document.createElement('tr');
          
          tableRow.innerHTML = `
               <td>${product.name}</td>
               <td>${product.price}</td>
               <td>${product.quality}</td>
               <td><button class="delete-btn" onclick="deleteProduct(${index})">DELETE</button></td>
          `;

          searchData.appendChild(tableRow);
     });
}

function renderFilteredTable (filteredProduct) {
     searchData.innerHTML = "";

     filteredProduct.forEach((product, index) => {
          const tableRow = document.createElement('tr');
          
          tableRow.innerHTML = `
               <td>${product.name}</td>
               <td>${product.price}</td>
               <td>${product.quality}</td>
               <td><button class="delete-btn" onclick="deleteProduct(${index})">DELETE</button></td>
          `;

          searchData.appendChild(tableRow);
     });
}

function deleteProduct (index) {
     products.splice(index, 1);
     saveToLocalStorage();
     renderTable();
     calculateProduct();
}

function calculateProduct () {
     subTotal = products.reduce((sum, item) => sum + item.total, 0);
     const tax = subTotal * 0.09;
     const finalTotal = subTotal + tax;

     total.textContent = Number(finalTotal).toLocaleString("en-IN", {
          style : "currency",
          currency : "INR"
     });
}

function saveToLocalStorage () {
     localStorage.setItem(`products`, JSON.stringify(products));
}

function dateYearDisplay (dateDisplay) {
     const date = new Date();
     const dateYears = date.getFullYear();
     dateDisplay.textContent = dateYears
}

searchProducting.addEventListener("keyup", () => {
     const searchValue = searchProducting.value.toLowerCase();

     const filteredProducts = products.filter((product) => 
          product.name.toLowerCase().includes(searchValue)
     );

     renderFilteredTable(filteredProducts);
})

renderTable();
calculateProduct();