function pageLoaded(){
    storedCart = JSON.parse(localStorage.getItem("cart"));
    username = localStorage.getItem("username");
    
    if(storedCart !=null && storedCart[username]){
        lengthOfStoredCart = Object.keys(storedCart[username]).length;

        if(lengthOfStoredCart > 1){
            document.getElementById("cartNote").style.display = "none";
            document.getElementById("billingDetails").style.display = "block";
        }
    }
    else{
        document.getElementById("cartNote").style.display = "flex";
        document.getElementById("billingDetails").style.display = "none";
    }
    
    cartValue = storedCart[username]["cartValue"];
    delete storedCart["cartvalue"];
        
    for (productId in storedCart[username]) {
        if(productId != "cartValue"){
            storedProductQty = storedCart[username][productId]["productQty"];
            
            var productCard = document.createElement("div");
            productCard.setAttribute("id","product-" + productId);
            productCard.setAttribute("class","card mt-2 p-3");
            
            var row = document.createElement("div");
            row.setAttribute("class", "row g-3 align-items-center");
            
            var col1 = document.createElement("div");
            col1.setAttribute("class", "col-sm-4");
            
            var col2 = document.createElement("div");
            col2.setAttribute("class", "col-sm-6 p-4");
            
            var col3 = document.createElement("div");
            col3.setAttribute("class", "col-sm-2  text-center");
            
            var productImg = document.createElement("img");
            productImg.setAttribute("src",storedCart[username][productId]["productImg"]);
            productImg.setAttribute("id","productImg-"+productId);
            productImg.setAttribute("class","img-fluid rounded-3");
            
            var productName = document.createElement("span");
            productName.setAttribute("class","fs-5 fw-normal");
            productName.innerHTML = storedCart[username][productId]["productName"];
            productName.setAttribute("id","productName-"+productId);

            var productDescription = document.createElement("p");
            productDescription.innerHTML = storedCart[username][productId]["productDescription"];
            
            var productPrice = document.createElement("span");
            productPrice.setAttribute("class", "lead fs-6 fw-normal")
            productPrice.innerHTML = storedCart[username][productId]["productDiscountedPrice"];
            productPrice.setAttribute("id","productPrice-"+productId);
            
            var productQuantityElement = document.createElement("div");
            productQuantityElement.setAttribute("class", "d-flex");
            
            var minusButton = document.createElement("button");
            minusButton.innerHTML = "-";
            minusButton.setAttribute("value", productId);
            minusButton.setAttribute("id","productMinusBtn-"+productId);
            minusButton.setAttribute("onclick","minus(this.value);minusBtnUpdate(this.value)");
            
            var productQuantity = document.createElement("span");
            productQuantity.innerHTML = storedCart[username][productId]["productQuantity"];
            productQuantity.setAttribute("class","px-2");
            productQuantity.setAttribute("id","productQty-"+productId);

            var plusButton = document.createElement("button");
            plusButton.innerHTML = "+";
            plusButton.setAttribute("value",productId);
            plusButton.setAttribute("id","productplusBtn-"+productId);
            plusButton.setAttribute("onclick","plus(this.value);plusBtnUpdate(this.value)");
            
            var productTotalPrice = document.createElement("span");
            productTotalPrice.setAttribute("class", "lead mb-2 fw-normal");
            productTotalPrice.innerHTML = storedCart[username][productId]["productQuantity"] * storedCart[username][productId]["productDiscountedPrice"];
            productTotalPrice.setAttribute("id","productTotalPrice-"+productId);    
            
            productQuantityElement.appendChild(minusButton)
            productQuantityElement.appendChild(productQuantity)
            productQuantityElement.appendChild(plusButton)
            
            col3.appendChild(productTotalPrice)
            col2.appendChild(productName)
            col2.appendChild(productDescription)
            col2.appendChild(productQuantityElement)
            col2.appendChild(productPrice)
            col1.appendChild(productImg)
            
            row.appendChild(col1)
            row.appendChild(col2)
            row.appendChild(col3)
            
            productCard.appendChild(row)
            
            var productMainDiv = document.getElementById("product-main-div");
            productMainDiv.appendChild(productCard);  
                        
        }
        else{
            updateTotalAmount();
        }
    }
    
}



function plusBtnUpdate(productId){
    storedCart = JSON.parse(localStorage.getItem("cart"));
    username = localStorage.getItem("username");
    
    productTotalPriceId = "productTotalPrice-" + productId;
    document.getElementById(productTotalPriceId).innerHTML = storedCart[username][productId]["productQuantity"] * storedCart[username][productId]["productDiscountedPrice"];
    
    updateTotalAmount();
}


function minusBtnUpdate(productId){
    storedCart = JSON.parse(localStorage.getItem("cart"));
    username = localStorage.getItem("username");
    
    if(!storedCart[username][productId]){
        var products = document.getElementById("product-" + productId);
        products.remove();
    }
    else{
        productTotalPriceId = "productTotalPrice-" + productId;
        document.getElementById(productTotalPriceId).innerHTML = storedCart[username][productId]["productQuantity"] * storedCart[username][productId]["productDiscountedPrice"];
    }
    updateTotalAmount();
    
    lengthOfStoredCart = Object.keys(storedCart[username]).length;
    if(lengthOfStoredCart < 2){
        document.getElementById("billingDetails").style.display = "none";
        document.getElementById("cartNote").style.display = "block";
    }
}

function updateTotalAmount(){
    storedCart = JSON.parse(localStorage.getItem("cart"));
    username = localStorage.getItem("username");
    cartValue = storedCart[username]["cartValue"];
    document.getElementById("cartValue").innerHTML = cartValue;
}

function placeOrder(){
    username = localStorage.getItem("username");
    var completeOrderHistory = {};
    var userSpecificOrderHistory = {};
    if(username){
        storedCart = JSON.parse(localStorage.getItem("cart"));
        orderHistory = JSON.parse(localStorage.getItem("orderHistory"));
        if(orderHistory)
        {
           lastOrderId = Object.keys(orderHistory).pop();
           newOrderId = parseInt(lastOrderId) + 1;
         }
        else{
                orderHistory = {}
                newOrderId = 1
        }
                storedCart[username]["buyer"] = username;
                orderHistory[newOrderId] = storedCart[username];
                
                localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
            
        alert("Order Placed");
        delete cart[username];
        localStorage.setItem("cart", cart);
        location.replace("orders.html");
    }
    else{
        alert("please first login");
        location.replace("signup.html");
    }
    
}
