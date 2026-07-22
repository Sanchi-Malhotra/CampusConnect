let allProducts = [];

let selectedCategory = "ALL";
let searchKeyword = "";
let sortOption = "default";
let selectedType = "ALL";


async function loadStats(){

   
    const user = JSON.parse(localStorage.getItem("user"));
    const university = user.university;
    showSpinner()
    try{
    const response = await fetch(
        `http://localhost:8080/products/stats?university=${encodeURIComponent(university)}`,
        {
            headers: getAuthHeaders()
        }
    );

    const stats = await response.json();
    document.getElementById("totalProducts").innerText =
        stats.totalProducts;

    document.getElementById("availableProducts").innerText =
        stats.availableProducts;

    document.getElementById("rentedProducts").innerText =
        stats.rentedProducts;

    document.getElementById("categoriesCount").innerText =
        stats.categories;

}
catch(error){

    showToast("⚠️ Server not reachable", "error");

}
finally {
    hideSpinner()
}
}
async function loadProducts() {

    const user = JSON.parse(localStorage.getItem("user"));
    const university = user.university;
    showSpinner()
    try{
        const response = await fetch(
            `http://localhost:8080/products?university=${encodeURIComponent(university)}`,
            {
                headers: getAuthHeaders()
            }
        );
    allProducts = await response.json();

    applyFilters(); 
}
catch(error){
    showToast("⚠️ Server not reachable", "error");

}
finally {
    hideSpinner()
}}
function displayProducts(products){

    document.getElementById("productCount").innerText =
        `${products.length} Products Found`;

    const container =
        document.getElementById("productsContainer");

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `

<div class="product-card">

    <img
        src="${product.imageUrl}"
        class="product-img">

    <div class="badge-row">

        <span class="status-badge ${
            product.status === "AVAILABLE"
            ? "available"
            : "rented"
        }">

            ${
                product.status === "AVAILABLE"
                ? "🟢 Available"
                : "🔴 Rented"
            }

        </span>

        <span class="type-badge">
            ${product.type}
        </span>

    </div>

    <h3>${product.title}</h3>

    <p class="desc">
        ${product.description}
    </p>

    <div class="category">
        📚 ${product.category}
    </div>

    <div class="price">
        ₹${product.price}
    </div>

    <button
        class="btn"
        onclick="window.location.href='product-details.html?id=${product.id}'">

        👁 View Details

    </button>

</div>

`;

    });

}

document.getElementById("searchInput")
.addEventListener("input", function(){

    searchKeyword = this.value.toLowerCase();

    applyFilters();

});

function applyFilters(){

    const filtered = allProducts.filter(product =>

      

        (
            selectedCategory === "ALL" ||
            product.category.toUpperCase().trim() === selectedCategory.toUpperCase()
        )
        
        &&  
        
        (
            selectedType === "ALL" ||
            product.type.toUpperCase() === selectedType
        ) &&

        (
            product.title.toLowerCase().includes(searchKeyword) ||
            (product.description || "").toLowerCase().includes(searchKeyword) ||
            product.category.toLowerCase().includes(searchKeyword)
        )

    );

    if(sortOption === "lowToHigh"){

        filtered.sort((a,b) => a.price - b.price);

    }
    else if(sortOption === "highToLow"){

        filtered.sort((a,b) => b.price - a.price);

    }

    displayProducts(filtered);

}
document.getElementById("sortSelect")
.addEventListener("change", function(){

    sortOption = this.value;

    applyFilters();

});
document.getElementById("logoutBtn").onclick = async function () {

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

};

function filterCategory(category){

    selectedCategory = category;

    applyFilters();

}
function filterType(type){

    selectedType = type;

    applyFilters();

}
window.addEventListener("pageshow", function () {

    loadStats();

    loadProducts();

});