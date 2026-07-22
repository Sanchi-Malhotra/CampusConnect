document.getElementById("registerForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("registerEmail").value,
        password: document.getElementById("registerPassword").value,
        university: document.getElementById("university").value
    };
    showSpinner()
    try{

        const response = await fetch(
            "http://localhost:8080/auth/register",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(user)
            }
        );

        const data = await response.text();

        if(response.ok){

            showToast("✅ " + data);

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);

        }else{

            showToast("❌ " + data, "error");

        }

    }catch(error){
        showToast("⚠️ Server not reachable", "error");

    }
    finally{
        hideSpinner();
    }

});