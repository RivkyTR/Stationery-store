import products from "./data.json" with {type: 'json'}


function Notebook(){
    console.log("notebook");
    for (let l of products.notebooks) {
        const div = document.getElementById("items");
        let html = `<div class="item_">
    <div class="itemName">
        <span>${l.title}</span>
    </div>
    <div class="itemImg">
        <img class="logoItem" src="..${l.image}">
    </div>
    <div class="priceAndAdd">
        <button class="add_to_cart">add to cart</button>
        <span>8 ש"ח</span>
    </div>`
        div.insertAdjacentHTML("beforeend", html);
    }
    
}
function writingTools(){
    console.log("dfghj");
    for (let l of products.craft) {
        const div = document.getElementById("items");
        let html = `<div class="item_">
    <div class="itemName">
        <span>${l.title}</span>
    </div>
    <div class="itemImg">
        <img class="logoItem" src="..${l.image}
    </div>
    <div class="priceAndAdd">
        <button class="add_to_cart" onclick="addToCart(${l.title}, ${l.price})">add to cart</button>
        <span>8 ש"ח</span>
    </div>`
        div.insertAdjacentHTML("beforeend", html);
    }
}

window.onload = (event) => {
    writingTools();
    document.getElementById("writingTools").addEventListener("click", writingTools);
    document.getElementById("notebook").addEventListener("click", Notebook);
  };


function addToCart(title, price){
    if (localStorage.getItem(title)!==null){
        localStorage.setItem(title,{"price":price, "num":localStorage.getItem(title).num + 1});
    }
    else
        localStorage.setItem(title, {"price": price, "num": 1});
}
