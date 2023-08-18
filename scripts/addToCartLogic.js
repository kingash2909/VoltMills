cart = {}
storedCart = JSON.parse(localStorage.getItem("cart"));
    
if(storedCart != null){
    cart = storedCart;        
} 
var productDivId, addToCartBtnId, productImgId, productNameId, productPriceId, productQtyId, productImg, productName, productPrice, productQty, cartValue;

function getProductDetails(productId){
    productDivId = "productDiv-" + productId;
    addToCartBtnId = "addToCartBtn-" + productId;     
    productImgId = "productImg-" + productId;
    productNameId = "productName-" + productId;
    productPriceId = "productPrice-" + productId;
    productQtyId = "productQty-" + productId;

    productImg = document.getElementById(productImgId).src;
    productName = document.getElementById(productNameId).innerHTML;
    productPrice = document.getElementById(productPriceId).innerHTML;
    productQty = document.getElementById(productQtyId).innerHTML;
}

function plus(productId){
    getProductDetails(productId);
    username = localStorage.getItem("username");
    productQty++;
    
    document.getElementById(productQtyId).innerHTML = productQty;
    
    cart[username]["cartValue"] = cart[username]["cartValue"] + parseInt(productPrice);
    
    cart[username][productId]["productQuantity"] = productQty
    
    localStorage.setItem("cart", JSON.stringify(cart));
}

function minus(productId){
    getProductDetails(productId);
    username = localStorage.getItem("username");
    
    if(productQty >1){
        productQty--;
        document.getElementById(productQtyId).innerHTML = productQty;   
        
        cart[username]["cartValue"] = cart[username]["cartValue"] - parseInt(productPrice);
        cart[username][productId]["productQuantity"] = productQty
        
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    else{

        delete cart[username][productId];
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}
