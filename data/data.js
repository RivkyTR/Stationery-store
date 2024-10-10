import products from "./data.json" with {type: 'json'}


function Notebook(){
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
        <button class="add_to_cart" onclick="addToCart(${l.title}, '${l.price}')">add to cart</button>
        <span>${l.price} ש"ח</span>
    </div>`
        div.insertAdjacentHTML("beforeend", html);
    }
    
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
        document.getElementById(`${l.catalogId}`).addEventListener("click", function() {
            addToCart(l.title, l.price);
        });
    }
}

window.onload = (event) => {
    writingTools();
    document.getElementById("writingTools").addEventListener("click", writingTools);
    document.getElementById("notebook").addEventListener("click", Notebook);
  };


function addToCart(title, price){
    console.log("addToCart");
    if (localStorage.getItem(title)!==null){
        localStorage.setItem(title,{"price":price, "num":localStorage.getItem(title).num + 1});
    }
    else
        localStorage.setItem(title, {"price": price, "num": 1});
}
