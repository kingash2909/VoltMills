function formSubmit(type){
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    if(username == ""){
        document.getElementById("error").style.display = "block";
        document.getElementById("username").style.borderColor = "red";
        document.getElementById("error").innerHTML = "Please enter correct details";
    }
    else if(password == ""){
        document.getElementById("error").style.display = "block";        
        document.getElementById("error").innerHTML = "Please enter correct details";
        document.getElementById("password").style.borderColor = "red";
        document.getElementById("username").style.borderColor = "green";
    }
    else{
        document.getElementById("password").style.borderColor = "unset";
        document.getElementById("username").style.borderColor = "unset";
        if(type==1)
        {
            storedUsers = JSON.parse(localStorage.getItem("allUsers"));    
        }
        else if(type==2){
            storedUsers = JSON.parse(localStorage.getItem("allVendors"));   
        }
        
        if(username in storedUsers){
            
            
            storedPassword = null;
            
             if(type==1){
                 storedPassword = storedUsers[username];
             }
            if(type==2){
                storedPassword = storedUsers[username]["password"];
            }
            
            if(storedPassword == password){
                if(type==1){
                    
                   localStorage.setItem("username", username);
                   location.replace("index.html");    
                }
                else if(type==2){
                   localStorage.setItem("vendorname", username);
                   location.replace("vendorAccount.html");    
                }
                
            }
            else{
                document.getElementById("error").innerHTML = "Incorrect Login details";
            }
        }
        else{
                document.getElementById("error").innerHTML = "Username not found please sign up";
        }    
    }
}


