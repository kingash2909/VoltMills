
function redirectToProduct(id){
    selectedProduct = products[id]
    selectedProduct = JSON.stringify(selectedProduct)
    localStorage.setItem("product", selectedProduct);
    location.replace("product.html");
}


function pageLoader(){
    categoryName = localStorage.getItem('categoryName');
    products = getProducts()
    
    allProducts = document.getElementById("allProducts");
    
    for(productId in products){
        if(products[productId]["productCategory"] == categoryName)
        {   productName = products[productId]["productName"]
            productVendor = products[productId]["productVendor"]
            productDescription = products[productId]["productDescription"]
            productImg = products[productId]["productImg"]
            productActualPrice = products[productId]["productActualPrice"]
            productDiscountPrice = products[productId]["productDiscountedPrice"]
            productOffer = products[productId]["productOffer"]
            productRating = "4.8 | 88 reviews"

            console.log(productVendor)
            var productImgElement = document.createElement("img");
            productImgElement.setAttribute("class", "img-fluid shadow");
            productImgElement.setAttribute("src", productImg);

            var starElement = document.createElement("i");
            starElement.setAttribute("class", "bi-star-fill text-warning");

            var ratingElement = document.createElement("span");
            ratingElement.setAttribute("class", "text-muted");
            ratingElement.innerHTML = productRating;

            var hrElement = document.createElement("hr");
            hrElement.setAttribute("class", "m-1");

            var productNameElement = document.createElement("p");
            productNameElement.setAttribute("class", "lead m-0 mt-2");
            productNameElement.innerHTML = productName;

            var productVendorElement = document.createElement("p");
            productVendorElement.setAttribute("class", "fs-6 text-muted m-0 mb-3");
            productVendor = productVendor.charAt(0).toUpperCase() + productVendor.slice(1);
            productVendorElement.innerHTML = "by " + productVendor;

            var bestDealLableElement = document.createElement("span");
            bestDealLableElement.setAttribute("class", "bg-new p-1 rounded text-white");
            bestDealLableElement.innerHTML = "Best Deal";

            var brElement = document.createElement("br");

            var productDiscountPriceElement = document.createElement("span");
            productDiscountPriceElement.setAttribute("class","text-success fs-5");
            productDiscountPriceElement.innerHTML = "$"+productDiscountPrice+" ";

            var productActualiPriceElement = document.createElement("del");
            productActualiPriceElement.setAttribute("class", "text-danger");
            productActualiPriceElement.innerHTML = "$"+productActualPrice+" ";

            var productOfferElement = document.createElement("span");
            productOfferElement.setAttribute("class", "text-muted");
            productOfferElement.innerHTML = " ("+productOffer+"%)";

            var productDescriptionElement = document.createElement("p");
            productDescriptionElement.setAttribute("class", "text-muted");
            productDescriptionElement.innerHTML = productDescription;

         
            var productImgCol = document.createElement("div");
            productImgCol.setAttribute("class","col-lg-6 d-flex align-items-center");
            productImgCol.appendChild(productImgElement);
            
            var productDescriptionCol = document.createElement("div")
            productDescriptionCol.setAttribute("class","col-lg-6 ps-3");
            
            productDescriptionCol.appendChild(starElement);
            productDescriptionCol.appendChild(ratingElement);
            productDescriptionCol.appendChild(hrElement);
            productDescriptionCol.appendChild(bestDealLableElement);
            productDescriptionCol.appendChild(productNameElement);
            productDescriptionCol.appendChild(productVendorElement);
            productDescriptionCol.appendChild(productDiscountPriceElement);
            productDescriptionCol.appendChild(productActualiPriceElement);
            productDescriptionCol.appendChild(productOfferElement);
            productDescriptionCol.appendChild(brElement);
            productDescriptionCol.appendChild(productDescriptionElement);

            var product = document.createElement("div");
            product.setAttribute("class","row py-3 border bg-white");
            product.appendChild(productImgCol);
            product.appendChild(productDescriptionCol);     
         
            var productCol = document.createElement("div");
            productCol.setAttribute("class","col-md-6 p-4");
            productCol.setAttribute("id", productId);
            productCol.setAttribute("onclick", "redirectToProduct(this.id)");
         
            productCol.appendChild(product);
         
            allProducts.appendChild(productCol);
        }
    }
   
}

function getProducts(){
    allProducts = JSON.parse(localStorage.getItem("allProducts"));
    storedProducts = productDetails
    
    try{
        if(allProducts["product101"]){
            
        }
        else{
             allProducts = {...storedProducts , ...allProducts}     
        
            localStorage.setItem("allProducts", JSON.stringify(allProducts));
        }
        
    }catch(error){
      
        allProducts = {...storedProducts , ...allProducts}     
        
        localStorage.setItem("allProducts", JSON.stringify(allProducts));
        return allProducts
    }  
    
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
    return allProducts
}