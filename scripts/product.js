var productId, productName, productDiscription, productDiscountPrice, productActualPrice, productOffer, productImg, username, productQty

function getProductDetails(){
    product = localStorage.getItem("product");
    username = localStorage.getItem("username")
    product = JSON.parse(product)
    
    productName = product["productName"];
    productId = product["productId"]
    productDiscription = product["productDescription"];
    productDiscountPrice = product["productDiscountedPrice"];
    productActualPrice = product["productActualPrice"];
    productOffer = product["productOffer"];
    productImg = product["productImg"];      
    
    
}

function pageLoaded(){    
    getProductDetails();
    document.getElementById("productImg").src = productImg;
    document.getElementById("productName").innerHTML = productName;
    document.getElementById("productDiscription").innerHTML = productDiscription;
    document.getElementById("productDiscountPrice").innerHTML = productDiscountPrice;
    document.getElementById("productActualPrice").innerHTML = productActualPrice;
    document.getElementById("productOffer").innerHTML = productOffer;
    
    storedCart = JSON.parse(localStorage.getItem("cart"));
    
    
    if(storedCart){
        if(username in storedCart && storedCart[username][productId]){
            storedProductQty = storedCart[username][productId]["quantity"];
            if(storedProductQty > 0){
                document.getElementById("productQty").innerHTML = storedProductQty;
                document.getElementById("addToCartBtn").style.display = "none";
                document.getElementById("viewCartBtn").style.display = "block";
                document.getElementById("productDiv").style.display = "flex";
            }
        }
    }
    
}


cart = {}
storedCart = JSON.parse(localStorage.getItem("cart"));
    
if(storedCart != null){
    cart = storedCart; 
} 
var productQty, cartValue;

function addToCart(){
    document.getElementById("productDiv").style.display = "flex";
    document.getElementById("viewCartBtn").style.display = "block";
    document.getElementById("addToCartBtn").style.display = "none";
    document.getElementById("productQty").innerHTML = 1;   
    
    productQty = 1
    
    if (!cart[username])
    {
        cart[username]= {}
    }
    
    if(cart[username]["cartValue"]){
        cart[username]["cartValue"] = cart[username]["cartValue"] + parseInt(productDiscountPrice);
    }
    else{
        cart[username]["cartValue"] = parseInt(productDiscountPrice);
    }
    
    product["productQuantity"] = productQty
    cart[username][productId] = product
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
}


function plus(){
    productQty = document.getElementById("productQty").innerHTML;
    productQty++;
    document.getElementById("productQty").innerHTML = productQty;
    
    cart[username]["cartValue"] = cart[username]["cartValue"] + parseInt(productDiscountPrice);
    
    cart[username][productId]["productQuantity"] = productQty;
    
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
}


function minus(){
    productQty = document.getElementById("productQty").innerHTML;

    console.log(productQty)
    
    if(productQty >0){
        productQty--;
        document.getElementById("productQty").innerHTML = productQty;   
        
        cart[username][productId]["productQuantity"] = productQty;
        
        localStorage.setItem("cart", JSON.stringify(cart));
        
        cart[username]["cartValue"] = cart[username]["cartValue"] - parseInt(productDiscountPrice);
    
    if(productQty == 0){
        document.getElementById("addToCartBtn").style.display ="block";
        document.getElementById("viewCartBtn").style.display ="none";
        document.getElementById("productDiv").style.display ="none";
        delete cart[username][productId];
        localStorage.setItem("cart", JSON.stringify(cart));
        }
        
    }
    console.log(cart);
           
}


function viewCart(){
    location.replace("cart.html");
}