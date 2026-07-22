

async function loadRequests(){
    showSpinner()
    try{
        const response = await fetch(
            "http://localhost:8080/requests/seller",
            {
                headers: getAuthHeaders()
            }
        );
        
     

    const requests = await response.json();

    const container =
    document.getElementById("requestsContainer");

    container.innerHTML = "";

    if(requests.length === 0){

        container.innerHTML = `
            <div style="
                text-align:center;
                padding:50px;
                color:gray;
            ">
                📩 No rental requests yet.
            </div>
        `;
    
        return;
    }

    requests.forEach(request =>{

        container.innerHTML += `
        <div style="
            background:white;
            padding:20px;
            border-radius:15px;
            box-shadow:0 5px 15px rgba(0,0,0,0.08);
        ">
        
            <img
                src="${request.product.imageUrl}"
                style="
                    width:120px;
                    height:120px;
                    object-fit:cover;
                    border-radius:10px;
                "
            >
        
            <h2>${request.product.title}</h2>
        
            <p>
                <b>Buyer:</b>
                ${request.buyer.name}
            </p>
        
            <p>
                <b>Email:</b>
                ${request.buyer.email}
            </p>
        
            <p>
                <b>Price:</b>
                ₹${request.product.price}
            </p>
        
            <p>
                <b>Requested On:</b>
                ${request.requestDate}
            </p>
        
            <p>
                <b>Status:</b>
        
                ${
                    request.status === "PENDING"
                    ?
                    "<span style='color:orange;font-weight:bold;'>🟡 PENDING</span>"
                    :
                    request.status === "APPROVED"
                    ?
                    "<span style='color:green;font-weight:bold;'>🟢 APPROVED</span>"
                    :
                    "<span style='color:red;font-weight:bold;'>🔴 REJECTED</span>"
                }
            </p>
        
            ${
                request.status === "PENDING"
                ?
                `
                <button
                    onclick="acceptRequest(${request.id})"
                    class="btn"
                    style="background:green;">
                    Accept
                </button>
        
                <button
                    onclick="rejectRequest(${request.id})"
                    class="btn"
                    style="background:red;">
                    Reject
                </button>
                `
                :
                ""
            }
        
        </div>
        `;

    });

}
catch(error){
    showToast("⚠️ Server not reachable", "error");

}
finally {
    hideSpinner()
}}

async function acceptRequest(requestId){
    showSpinner()
    try{
        const response = await fetch(
            `http://localhost:8080/requests/${requestId}/accept`,
            {
                method: "PUT",
                headers: getAuthHeaders()
            }   
        );

    if(response.ok){

        showToast("✅ Request Accepted Successfully!");
    
        loadRequests();
    
    }else{
    
        const message = await response.text();
    
        showToast(message, "error");
    
    }
    }
    catch(error){
        showToast("⚠️ Server not reachable", "error");

    }
    finally {
        hideSpinner()
    }}


async function rejectRequest(requestId){    
     showSpinner()
     try{
        const response = await fetch(
            `http://localhost:8080/requests/${requestId}/reject`,
            {
                method: "PUT",
                headers: getAuthHeaders()
            }
        );

    if(response.ok){

        showToast("✅ Request Rejected Successfully!");
    
        loadRequests();
    
    }else{
    
        const message = await response.text();
    
        showToast(message, "error");
    
    }

}
catch(error){
    showToast("⚠️ Server not reachable", "error");

}
finally {
    hideSpinner()
}}
window.addEventListener("pageshow", function () {
    loadRequests();
});

