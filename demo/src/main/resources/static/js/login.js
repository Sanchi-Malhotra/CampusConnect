
document.getElementById("loginForm")
.addEventListener("submit", async function(e){

    e.preventDefault();
    showSpinner();
    const user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    try{

        const response = await fetch(
            "http://localhost:8080/auth/login",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(user)
            }
        );

        const data = await response.json();

        if(data && data.token){ 
        
            saveToken(data.token);
        
            saveUser(data.user);
        
            showToast("✅ Login Successful");
        
            setTimeout(() => {
                window.location.href = "role.html";
            },1500);
        
        }else{
        
            showToast("❌ Invalid Credentials","error");
        
        }

    }catch(error){

        showToast("⚠️ Server not reachable", "error");

    }
    finally{
       hideSpinner(); 
    }

});