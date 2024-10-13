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
                         <div class="itemKey"> <span>${key}</span> </div>

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
function updateNum(key) {
    const div = document.getElementById(`${key}-num`);
    const item = JSON.parse(localStorage.getItem(key));
    if (item === null || item === undefined||!item.num) {
        const div = document.getElementById(`${key}`);
        if (div) {
            console.log(key);
             
            div.innerHTML="";
            div.remove();  // מוחק את האלמנט מה-DOM אם num אינו מוגדר
        }
        return;
    }
    div.innerHTML = `${item.num}`;
}

function addToCart(title, price) {
    console.log("addToCart");
    // updateNumberOfChosenProducts(1);

    if (localStorage.getItem(title) !== null) {
        localStorage.setItem(title, JSON.stringify({ "price": price, "num": JSON.parse(localStorage.getItem(title)).num + 1 }));
        console.log(JSON.parse(localStorage.getItem(title)).num);
    }
    else
        localStorage.setItem(title, JSON.stringify({ "price": price, "num": 1 }));
}

function deleteFromCard(title, price) {
    console.log("deleteFromCard");
    // updateNumberOfChosenProducts(-1);

    if (JSON.parse(localStorage.getItem(title)).num === 1) {
        localStorage.removeItem(title);
    }
    else
        localStorage.setItem(title, JSON.stringify({ "price": price, "num": JSON.parse(localStorage.getItem(title)).num - 1 }));
}

// function updateNumberOfChosenProducts(num) {
//     numberProductes += num;
//     // document.getElementById("numberOfChosenProducts").innerText = numberProductes;
// }
