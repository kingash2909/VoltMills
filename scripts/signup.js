function formSubmit(type){
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    if(username == ""){
        document.getElementById("error").innerHTML = "Please enter correct details";
        document.getElementById("error").style.display = "block";
        document.getElementById("username").style.borderColor = "red";
    }
    else if(password == ""){
        document.getElementById("error").innerHTML = "Please enter correct details";
        document.getElementById("password").style.borderColor = "red";
        document.getElementById("username").style.borderColor = "green";
    }
    else{
        if(type==1){
            allUsers = JSON.parse(localStorage.getItem("allUsers"));
        }
        else if(type==2){
            allUsers = JSON.parse(localStorage.getItem("allVendors"));
        }
        
        if(!allUsers)
        {
            allUsers = {}
        }
        
        if(type==1){
            allUsers[username] = password;
            localStorage.setItem("allUsers", JSON.stringify(allUsers));
            localStorage.setItem("username", username);
            location.replace("index.html");
        }
        else if(type==2){
            allUsers[username] = {"password": password}
            localStorage.setItem("allVendors", JSON.stringify(allUsers));
            localStorage.setItem("vendorname", username);
            location.replace("vendorAccount.html");
        }
        
           
    }
}
