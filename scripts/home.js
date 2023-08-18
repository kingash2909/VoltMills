function redirectToCategory(categoryName){
    localStorage.setItem('categoryName', categoryName);
    location.replace("category.html");
}