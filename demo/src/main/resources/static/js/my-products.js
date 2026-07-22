const userId = getUserId();

async function loadMyProducts(){
    showSpinner()
    try{
        const response = await fetch(
            `http://localhost:8080/products/user/${userId}`,
            {
                headers: getAuthHeaders()
            }
        );

    const products = await response.json();

    const container =
    document.getElementById("productsContainer");

    container.innerHTML = "";
    if (products.length === 0) {

        container.innerHTML = `
            <div style="
                text-align:center;
                padding:50px;
                color:gray;
            ">
                📦 You haven't listed any products yet.
            </div>
        `;
    
        return;
    }

    products.forEach(product=>{

        container.innerHTML += `

        <div class="product-card">

            <img
            src="http://localhost:8080${product.imageUrl}">

            <h3>${product.title}</h3>

            <p>${product.description}</p>

            <p class="price">₹${product.price}</p>

            <button
            class="btn edit"
            onclick="window.location.href='add-product.html?id=${product.id}'">
            
            Edit
            
            </button>

            <button
            class="btn delete"
            onclick="deleteProduct(${product.id})">
            Delete
            </button>

        </div>

        `;

    });}
    catch(error){

        showToast("⚠️ Server not reachable", "error");

    }
   finally{
    hideSpinner();
   }

}
async function deleteProduct(id){

    const result = await Swal.fire({
        title: "Delete Product?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Yes, delete it!"
    });
    
    if(!result.isConfirmed){
        return;
    }
    showSpinner()
    try{

        const response = await fetch(
            `http://localhost:8080/products/${id}`,
            {
                method: "DELETE",
                headers: getAuthHeaders()
            }
        );

        if(response.ok){

            showToast("✅ Product deleted successfully");

            await loadMyProducts();

        }else{

            const message = await response.text();
showToast(message, "error");

        }

    }catch(error){

        showToast("⚠️ Server not reachable", "error");

    }
    finally{
        hideSpinner()
    }

}
window.addEventListener("pageshow", function () {
    loadMyProducts();
});