const user = JSON.parse(localStorage.getItem("user"));

if (user) {

    document.getElementById("avatar").innerHTML =
        user.name.charAt(0).toUpperCase();

    document.getElementById("name").innerHTML =
        user.name;

    document.getElementById("email").innerHTML =
        "📧 " + user.email;

    document.getElementById("college").innerHTML =
        "🎓 " + user.university;

    document.getElementById("role").innerHTML =
        "👤 Role : " + localStorage.getItem("role");

    loadProfileStats();
}

async function loadProfileStats() {

    const userId = user.id;

    showSpinner();

    try{

        // Products Listed
        const productResponse = await fetch(
            `http://localhost:8080/products/user/${userId}`,
            {
                headers: getAuthHeaders()
            }
        );
        const products = await productResponse.json();

        document.getElementById("listedCount").innerText =
            products.length;

        // Rental Requests
        const requestResponse = await fetch(
            "http://localhost:8080/requests/seller/pending",
            {
                headers: getAuthHeaders()
            }
        );

        const requests = await requestResponse.json();

        document.getElementById("requestCount").innerText =
            requests.length;

    }catch(error){
        showToast("⚠️ Server not reachable", "error");

    }finally{

        hideSpinner();

    }
}
async function logout() {

    const result = await Swal.fire({
        title: "Logout?",
        text: "You will need to login again.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Yes, Logout",
        cancelButtonText: "Cancel"
    });

    if(result.isConfirmed){

        localStorage.clear();

        showToast("👋 Logged out successfully");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);

    }

}