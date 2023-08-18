function pageLoaded(){
    username = localStorage.getItem("username");
    if(username){
        
        orderHistory = JSON.parse(localStorage.getItem("orderHistory"));
        allOrdersDiv = document.getElementById("orders");
        noOrdersDiv = document.getElementById("no-orders");
        
        for(orderId in orderHistory){
            noOrdersDiv.setAttribute("class", "d-none");
            orderElement = updateOrderDetails(orderHistory[orderId], orderId)
            allOrdersDiv.appendChild(orderElement);
        }
    }
    else{
        alert("please first login");
        location.replace("signup.html");                
    }
}

function updateOrderDetails(order, orderId){
    
    orderIdDiv = document.createElement("div");
    orderIdDiv.setAttribute("class", "lead fw-normal");
    orderIdDiv.innerHTML = "Order ID: #" + orderId
        
    allProductsDiv = document.createElement("div");
    
    
    orderTotalDiv = document.createElement("div");
    orderTotalDiv.setAttribute("class", "m-2 p-2 bg-warning border-1 rounded-3 fw-bold text-center lead");
    
    for(productId in order){  
        if(productId == "cartValue"){
            
            orderTotalDiv.innerHTML = "Order Total: " + order["cartValue"];
            
        }
        else if(productId == "buyer"){
            
        }
        else{
            product = order[productId]; 
            productDiv = createdProductDiv(product);  
            allProductsDiv.appendChild(productDiv);
        }
    }
    
    orderDiv = document.createElement("div");
    orderDiv.setAttribute("class", " p-3 mt-2");
    
    orderDiv.appendChild(orderIdDiv);
    orderDiv.appendChild(allProductsDiv);
    orderDiv.appendChild(orderTotalDiv);
    
    return orderDiv;
}


function createdProductDiv(product){
  
    productImageElement = document.createElement("img");
    productImageElement.setAttribute("class", "img-fluid rounded-3");
    productImageElement.setAttribute("src", product["productImg"]);
    
    productNameElement = document.createElement("p");
    productNameElement.setAttribute("class", "lead mb-2 fw-normal");
    productNameElement.innerHTML = product["productName"]
        
    productQuantityElement = document.createElement("p");
    productQuantityElement.setAttribute("class", "mb-1 text-muted");
    productQuantityElement.innerHTML = "Quantity: " + product["productQuantity"]
        
    productPriceElement = document.createElement("p");
    productPriceElement.setAttribute("class", "mb-1 text-muted");
    productPriceElement.innerHTML = "Price: " + product["productDiscountedPrice"];
        
    columnElement1 = document.createElement("div");
    columnElement1.setAttribute("class", "col-sm-4");
    
    columnElement2 = document.createElement("div");
    columnElement2.setAttribute("class", "col-sm-6");
    
    columnElement3 = document.createElement("div");
    columnElement3.setAttribute("class", "col-sm-2 fw-bold text-end");
    
    columnElement1.appendChild(productImageElement);
    
    columnElement2.appendChild(productNameElement);
    columnElement2.appendChild(productQuantityElement);
    columnElement2.appendChild(productPriceElement);
    
    columnElement3.innerHTML = "Total Price: " + product["productDiscountedPrice"] * product["productQuantity"];
    
    productRowElement = document.createElement("div");
    productRowElement.setAttribute("class", "row align-items-center g-4 border border-1 m-2 pt-0 rounded-1 bg-white");
    
    productRowElement.appendChild(columnElement1);
    productRowElement.appendChild(columnElement2);
    productRowElement.appendChild(columnElement3);
    
    return productRowElement;
    
}