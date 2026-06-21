/* ###################### CART ###################### */

function displayItems(){
    var cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
}

/* Checkout Message */
function checkout() {
    var total = document.getElementById("totalCost").innerHTML;
    alert("Thank you for your purchase! \nYour total is: " + total);
    window.location.href = "product-evaluation.html";
}

/* Quantity Buttons */
// Decrease 
function decrease(button) {
    var parent = button.parentNode;
    var quant = parseInt(parent.querySelector(".quantity").value);
    if (quant > 1) {
        parent.querySelector(".quantity").value = quant - 1;
        var price = parseInt(parent.parentNode.querySelector(".price").innerHTML.replace("$", ""));
        var subTotal = (quant - 1) * price;
        parent.parentNode.querySelector(".subtotal").innerHTML = "$" + subTotal;
    }
    else {
        parent.parentNode.parentNode.remove(); 
    }
    updatePrice();
}

// Increase 
function increase(button) {
    var parent = button.parentNode;
    var quant = parseInt(parent.querySelector(".quantity").value) + 1;
    parent.querySelector(".quantity").value = quant;
    var price = parseInt(parent.parentNode.querySelector(".price").innerHTML.replace("$", ""));
    var subTotal = quant * price;
    parent.parentNode.querySelector(".subtotal").innerHTML = "$" + subTotal;
    updatePrice();
}

/* Remove */
function removeItem(button) {
    button.parentNode.parentNode.parentNode.remove();
    var items = document.getElementsByClassName("item");
    if (items.length == 0){
        document.getElementById("shippingCost").innerHTML = "$0";
    }
    updatePrice();
}

/* Empty Cart */
function empty() {
    var cart = document.getElementById("cart");
    var items = cart.getElementsByClassName("item");
    for (var i = items.length - 1; i >= 0; i--) {
        items[i].remove();
    }
    document.getElementById("shippingCost").innerHTML = "$0";
    updatePrice();
}

/* Update total price */
function updatePrice(){
    var subTotal = 0;
    var total = 0;
    var items = document.getElementsByClassName("item");
    for (var i = items.length - 1; i >= 0; i--){
        subTotal += parseInt(items[i].querySelector(".subtotal").innerHTML.replace("$","")
);        total += parseInt(items[i].querySelector(".subtotal").innerHTML.replace("$","")
);
    }
    total += parseInt(document.getElementById("shippingCost").innerHTML.replace("$","")
);
    document.getElementById("finalSubtotal").innerHTML = "$" + subTotal;
    document.getElementById("totalCost").innerHTML = "$" + total;
}

/* Continue Shopping */
function shop(){
    window.location.href = "index.html";
}

/* ###################### Sorting Logic ###################### */  
document.addEventListener("DOMContentLoaded", () => {
    const filterDropdown = document.getElementById("filter");
    const productGrid = document.querySelector(".product-grid");
    
    if (filterDropdown && productGrid) {
        const products = Array.from(productGrid.children);
        
        filterDropdown.addEventListener("change" , () => {
            const selectedOption = filterDropdown.value;
            let sortedProducts;
            
            if (selectedOption == "order2") {
                // High to Low
                sortedProducts = products.sort((a, b) => getPrice(b) - getPrice(a));
            } else if (selectedOption == "order3") {
                // Low to High
                sortedProducts = products.sort((a, b) => getPrice(a) - getPrice(b));
            } else if (selectedOption == "A to Z") {
                // A to Z
                sortedProducts = products.sort((a, b) => getName(a).localeCompare(getName(b)));
            } else if (selectedOption == "Z to A") {
                // Z to A
                sortedProducts = products.sort((a, b) => getName(b).localeCompare(getName(a)));
            }
            
            productGrid.innerHTML = "";
            sortedProducts.forEach(product => productGrid.appendChild(product));
        });
    }

    function getPrice(product){
        const priceText = product.querySelector("p").textContent;
        return parseFloat(priceText.match(/(\d+)/)[0]);
    }

    function getName(product){
        return product.querySelector("h4").textContent.trim();
    }
});

/* ###################### Themes ###################### */
window.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle'); 
    const body = document.body;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const themeIcon = document.getElementById("theme-icon");

    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'night') {
            body.classList.add('night-mode');
            if(header) header.classList.add('night-mode');
            if(footer) footer.classList.add('night-mode');
            if(themeIcon) themeIcon.src = "images/theme-toggle0.png"; 
        }

        function toggleTheme() {
            body.classList.toggle('night-mode');
            if(header) header.classList.toggle('night-mode');
            if(footer) footer.classList.toggle('night-mode');

            if (body.classList.contains('night-mode')) {
                if(themeIcon) themeIcon.src = "images/theme-toggle0.png";
                localStorage.setItem('theme', 'night'); 
            } else {
                if(themeIcon) themeIcon.src = "images/theme-toggle1.png";
                localStorage.setItem('theme', 'day');
            }
        }
        themeToggle.addEventListener('click', toggleTheme);
    }
});

/* ###################### Stars Rating ###################### */
document.addEventListener("DOMContentLoaded", () => {
    const stars1 = document.querySelectorAll("#Stars1 .stars1 i");
    const stars2 = document.querySelectorAll("#Stars2 .stars2 i");

    let rating1 = 0;
    let rating2 = 0;

    stars1.forEach((star, index1) => {
        star.addEventListener("click", () => {
            rating1 = index1 + 1;
            stars1.forEach((s, index2) => {
                if (index1 >= index2) s.classList.add("active");
                else s.classList.remove("active");
            });
        });
    });

    stars2.forEach((star, index2) => {
        star.addEventListener("click", () => {
            rating2 = index2 + 1;
            stars2.forEach((s, index3) => {
                if (index2 >= index3) s.classList.add("active");
                else s.classList.remove("active");
            });
        });
    });

    const submitButton1 = document.querySelector("#reviewForm1 .review-btn input[type='submit']");
    if (submitButton1) {
        submitButton1.addEventListener("click", (event) => {
            event.preventDefault();
            const selectedOrder = document.getElementById("order-select").value;
            if (!selectedOrder || rating1 === 0) {
                alert("Please choose an order and rate the product!");
                return;
            }
            alert(`Thank you for your feedback!\nProduct 1: ${rating1} stars`);
            window.location.href = "index.html";
        });
    }

    const submitButton2 = document.querySelector("#reviewForm2 .review-btn input[type='submit']");
    if (submitButton2) {
        submitButton2.addEventListener("click", (event) => {
            event.preventDefault();
            const selectedOrder = document.getElementById("order-select").value;
            if (!selectedOrder || rating2 === 0) {
                alert("Please choose an order and rate the product!");
                return;
            }
            alert(`Thank you for your feedback!\nProduct 2: ${rating2} stars`);
            window.location.href = "index.html";
        });
    }
});