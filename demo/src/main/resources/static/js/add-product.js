const params = new URLSearchParams(window.location.search);

const productId = params.get("id");
let existingImageUrl ="";
async function loadProductForEdit(){

    if(!productId){
        return;
    }
    showSpinner();
    try{
    const response = await fetch(
        `http://localhost:8080/products/${productId}`,
        {
            headers: getAuthHeaders()
        }
    );

    const product = await response.json();

    document.getElementById("title").value =
        product.title;

    document.getElementById("description").value =
        product.description;

    document.getElementById("price").value =
        product.price;

    document.getElementById("category").value =
        product.category;

    document.getElementById("type").value =
        product.type;
        existingImageUrl = product.imageUrl;
    }
    catch(error){
        showToast("⚠️ Failed to load product", "error");
    
    }
    finally{
        hideSpinner()
    }
}
document.getElementById("productForm")
.addEventListener("submit", async function(e){

    e.preventDefault();
    showSpinner();
    try{
  

    const imageFile =
    document.getElementById("image").files[0];

    let imageUrl = existingImageUrl;

    if(imageFile){

        const formData = new FormData();

        formData.append("image", imageFile);

        const imageResponse = await fetch(
            "http://localhost:8080/upload",
            {
                method: "POST",
                headers: getAuthHeaders(false),
                body: formData
            }
        );

        imageUrl = await imageResponse.text();
    }

    const product = {

        title:
        document.getElementById("title").value,

        description:
        document.getElementById("description").value,

        price:
        document.getElementById("price").value,

        category:
        document.getElementById("category").value,

        type:
        document.getElementById("type").value,

        imageUrl:imageUrl
    };

    let url;
    let method;
    
    if(productId){
    
        url = `http://localhost:8080/products/${productId}`;
        method = "PUT";
    
    }else{
    
        url = "http://localhost:8080/products";
        method = "POST";
    
    }
    
    const response = await fetch(
        url,
        {
            method: method,
            headers: getAuthHeaders(),
            body: JSON.stringify(product)
        }
    );

    if(response.ok){

        showToast(
            productId
                ? "✅ Product Updated Successfully"
                : "✅ Product Added Successfully"
        );
    
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1500);
    
    }else{
    
        showToast("❌ Failed to add/update product", "error");
    
    }
}
catch(error){


    showToast("⚠️ Failed to load product", "error");

}
finally{
    hideSpinner();
}
});
window.addEventListener("pageshow", function () {
    loadProductForEdit();
});
