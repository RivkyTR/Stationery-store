import products from "./data.json" with {type: 'json'}
var numberProductes = 0;

function notebook() {
    console.log("notebook");
    const div = document.getElementById("items");
    div.innerHTML = "";
    for (let l of products.notebooks) {
        let html = `<div class="item_">
    <div class="itemName">
        <span>${l.title}</span>
    </div>
    <div class="itemImg">
        <img class="logoItem" src="..${l.image}">
    </div>
    <div class="priceAndAdd">
        <button class="add_to_cart" id='${l.catalogId}'>add to cart</button>
        <span>${l.price} ש"ח</span>
    </div>`
        div.insertAdjacentHTML("beforeend", html);
        document.getElementById(`${l.catalogId}`).addEventListener("click", function () {
            addToCart(l.title, l.price);
        });
    }

    hideShoppingCart();
}
function writingTools() {
    console.log("dfghj");
    const div = document.getElementById("items");
    div.innerHTML = "";

    for (let l of products.craft) {
        let html = `<div class="item_">
            <div class="itemName">
                <span>${l.title}</span>
            </div>
            <div class="itemImg">
                <img class="logoItem" src="..${l.image}">
            </div>
            <div class="priceAndAdd">
                <button class="add_to_cart" id='${l.catalogId}'>add to cart</button>
                <span>${l.price} ש"ח</span>
            </div>
        </div>`;

        // Insert HTML into the div first
        div.insertAdjacentHTML("beforeend", html);

        // Then attach the event listener
        document.getElementById(`${l.catalogId}`).addEventListener("click", function () {
            addToCart(l.title, l.price);
        });
    }
    hideShoppingCart();
}

window.onload = (event) => {
    writingTools();
    document.getElementById("writingTools").addEventListener("click", writingTools);
    document.getElementById("notebook").addEventListener("click", notebook);
    const selectDropdown = document.querySelector('select');
    selectDropdown.addEventListener('change', function (e) {
        const selectedOption = e.target.value;
        console.log(e.target.value);

        if (selectedOption === "writingTools") {
            writingTools();
        } else {
            notebook();
        }
    });
    document.getElementById('shoppingCart').addEventListener("click", shoppingCart);
    Object.entries(localStorage).forEach(([key, value]) => {
        numberProductes += JSON.parse(localStorage.getItem(key)).num;
    });
    document.getElementById("numberOfChosenProducts").innerText = numberProductes;
};


function addToCart(title, price) {
    console.log("addToCart");
    updateNumberOfChosenProducts(1);

    if (localStorage.getItem(title) !== null) {
        localStorage.setItem(title, JSON.stringify({ "price": price, "num": JSON.parse(localStorage.getItem(title)).num + 1 }));
        console.log(JSON.parse(localStorage.getItem(title)).num);
    }
    else
        localStorage.setItem(title, JSON.stringify({ "price": price, "num": 1 }));
}

function deleteFromCard(title, price) {
    console.log("deleteFromCard");
    updateNumberOfChosenProducts(-1);

    if (JSON.parse(localStorage.getItem(title)).num === 1) {
        localStorage.removeItem(title);
    }
    else
        localStorage.setItem(title, JSON.stringify({ "price": price, "num": JSON.parse(localStorage.getItem(title)).num - 1 }));
}

function updateNumberOfChosenProducts(num) {
    numberProductes += num;
    document.getElementById("numberOfChosenProducts").innerText = numberProductes;
}

function shoppingCart() {
    console.log("shoppingCart");
    document.getElementById("center-page1").style.display = "none";
    document.getElementById("center-page2").style.display = "flex";
    showProducts();
}

function hideShoppingCart() {
    console.log("hideShoppingCart");
    document.getElementById("center-page1").style.display = "block";
    document.getElementById("center-page2").style.display = "none";
}

function showProducts() {
    document.getElementById("orderd_items").innerHTML = "";
    let html = `
    <div class="orderd_items">
                        <div class="changeAmaunt"><span class="space"> </span></div>
                        <div> <span>מחיר</span> </div>
                        <div class="itemKey"> <span>שם המוצר</span></div>
                    </div>`;
    const div = document.getElementById("orderd_items");
    div.insertAdjacentHTML("beforeend", html);
    Object.entries(localStorage).forEach(([key, value]) => {
        let num = JSON.parse(localStorage.getItem(key)).num;
        let price = JSON.parse(localStorage.getItem(key)).price;
        const div = document.getElementById("orderd_items");
        let html = `<div class="orderd_items" id="${key}">
                            <div class="changeAmaunt">
                            <button id="${key}-add">+</button>
                              <span id="${key}-num">${num}</span>  
                            <button id="${key}-remove">-</button>
                            </div>
                            <div> <span>${price}</span></div>
                             <div> <span>${key}</span> </div>
    
                        </div>`
        div.insertAdjacentHTML("beforeend", html);
        console.log(key, value);
        // Then attach the event listener
        document.getElementById(`${key}-add`).addEventListener("click", function () {
            addToCart(key, price);
            updateNum(key);
        });
        document.getElementById(`${key}-remove`).addEventListener("click", function () {
            deleteFromCard(key, price);
            updateNum(key);
        });
    });
}

function updateNum(key) {
    const div = document.getElementById(`${key}-num`);
    const item = JSON.parse(localStorage.getItem(key));
    if (item === null || item === undefined || !item.num) {
        const div = document.getElementById(`${key}`);
        if (div) {
            console.log(key);

            div.innerHTML = "";
            div.remove();  // מוחק את האלמנט מה-DOM אם num אינו מוגדר
        }
        return;
    }
    div.innerHTML = `${item.num}`;
}