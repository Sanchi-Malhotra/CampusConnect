const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

async function loadProduct() {

    const loggedInUserId = getUserId();
    showSpinner()
    try{
        const response = await fetch(
            `http://localhost:8080/products/${productId}`,
            {
                headers: getAuthHeaders()
            }
        );

    const product = await response.json();

    document.getElementById("title").innerText =
        product.title;

    document.getElementById("price").innerText =
        `₹${product.price}`;

    document.getElementById("description").innerText =
        product.description;

    document.getElementById("category").innerText =
        product.category;

    document.getElementById("type").innerText =
        product.type;

    document.getElementById("status").innerHTML =
        product.status === "AVAILABLE"
            ? "<span style='color:green;font-weight:bold;'>🟢 AVAILABLE</span>"
            : "<span style='color:red;font-weight:bold;'>🔴 RENTED</span>";

    document.getElementById("productImage").src =
        product.imageUrl;

    if (product.owner) {

        document.getElementById("sellerName").innerText =
            product.owner.name;

        document.getElementById("sellerEmail").innerText =
            product.owner.email;

            document.getElementById("sellerUniversity").innerText =
            product.owner.university;

        document.getElementById("contactBtn").onclick = function () {

            navigator.clipboard.writeText(product.owner.email);

            showToast("📋 Seller email copied to clipboard!");

        };

    }

    // Hide button if seller is viewing own product
 // Seller View
if (product.owner.id == loggedInUserId) {

    document.getElementById("rentBtn").style.display = "none";

    if(product.status === "RENTED"){

        document.getElementById("returnBtn").style.display = "inline-block";

    }

}

    // Disable if already rented
    if (product.status === "RENTED") {

        const rentBtn =
            document.getElementById("rentBtn");

        rentBtn.innerText = "Already Rented";

        rentBtn.disabled = true;

        rentBtn.style.background = "#94a3b8";

        rentBtn.style.cursor = "not-allowed";

        document.getElementById("contactBtn").style.display = "none";

    }
    else {

        // Request to Rent
        document.getElementById("rentBtn").onclick = async function () {

            const buyerId = getUserId();
            showSpinner()
            try{
                const response = await fetch(
                    `http://localhost:8080/requests?productId=${product.id}&buyerId=${buyerId}`,
                    {
                        method: "POST",
                        headers: getAuthHeaders()
                    }
                );

            if (response.ok) {

                showToast("✅ Rental request sent successfully!");

                const rentBtn =
                    document.getElementById("rentBtn");

                rentBtn.innerText = "Request Sent";

                rentBtn.disabled = true;

                rentBtn.style.background = "#94a3b8";

                rentBtn.style.cursor = "not-allowed";

            }
            else {

                const message = await response.text();

                showToast(message, "error");

            }

        }
        catch(error){

            showToast("⚠️ Server not reachable", "error");
    
        }
        finally {
            hideSpinner()
        }
    }

    }
    // Return Product
    document.getElementById("returnBtn").onclick = async function(){

        const result = await Swal.fire({
            title: "Return Product?",
            text: "Mark this product as returned?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, Return",
            cancelButtonText: "Cancel"
        });
    
        if(!result.isConfirmed){
            return;
        }
    
        showSpinner();
    
        try{
    
            const response = await fetch(
                `http://localhost:8080/products/${product.id}/return`,
                {
                    method: "PUT",
                    headers: getAuthHeaders()
                }
            );
    
            if(response.ok){
    
                showToast("✅ Product returned successfully!");
    
                setTimeout(() => {
                    location.reload();
                }, 1500);
    
            }else{
    
                showToast("❌ Failed to return product", "error");
    
            }
    
        }catch(error){
    
            showToast("⚠️ Server not reachable", "error");
    
        }finally{
    
            hideSpinner();
    
        }
    
    };

}
catch(error){
    showToast("⚠️ Server not reachable", "error");

}
finally {
    hideSpinner()
}
}
window.addEventListener("pageshow", function () {
    loadProduct();
});