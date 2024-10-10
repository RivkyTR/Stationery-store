import products from "./data.json" with {type: 'json'}
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
for (let l of products.craft) {
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

