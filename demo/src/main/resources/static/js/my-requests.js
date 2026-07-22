
async function loadMyRequests(){
    showSpinner();
    try{
        const response = await fetch(
            "http://localhost:8080/requests/buyer",
            {
                headers: getAuthHeaders()
            }
        );
        


    const requests = await response.json();

    const container =
    document.getElementById("requestsContainer");

    container.innerHTML = "";

    if(requests.length === 0){

        container.innerHTML =
        "<h3>You haven't requested any products yet.</h3>";

        return;

    }

    requests.forEach(request =>{

        let color = "orange";

        if(request.status === "APPROVED"){
            color = "green";
        }
        else if(request.status === "REJECTED"){
            color = "red";
        }

        container.innerHTML += `

        <div class="product-card">

            <img
            src="http://localhost:8080${request.product.imageUrl}"
            style="
                width:100%;
                height:180px;
                object-fit:cover;
                border-radius:12px;
            ">

            <h2>${request.product.title}</h2>

            <p>${request.product.description}</p>

            <p><b>Price:</b> ₹${request.product.price}</p>

            <p><b>Seller:</b> ${request.seller.name}</p>

            <p style="color:${color};font-weight:bold;">
                ${request.status}
            </p>

        </div>

        `;

    });}
    catch(error){

        showToast("⚠️ Server not reachable", "error");

    }
    finally {
        hideSpinner()
    }

}
window.addEventListener("pageshow", function () {
    loadMyRequests();
});

