package com.example.demo.controller;

import com.example.demo.dto.ProductStatsDTO;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.service.ProductService;
import com.example.demo.service.UserService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins="*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
private UserService userService;



    @GetMapping
    public List<Product> getAllProducts(
            @RequestParam String university) {
    
        return productService.getAllProducts(university);
    
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id,
            Authentication authentication) {
    
        String email = authentication.getName();
    
        productService.deleteProduct(id, email);
    
        return "Product deleted successfully";
    }
    @PostMapping
    public Product addProduct(
            @RequestBody Product product,
            Authentication authentication) {
    
        String email = authentication.getName();
    
        User user = userService.getUserByEmail(email);
    
        product.setOwner(user);
        product.setStatus("AVAILABLE");
    
        return productService.saveProduct(product);
    }

    @GetMapping("/user/{userId}")
public List<Product> getProductsByUser(
        @PathVariable Long userId){

    return productService.getProductsByUser(userId);

}
@PutMapping("/{id}")
public Product updateProduct(
        @PathVariable Long id,
        @RequestBody Product product,
        Authentication authentication){

    String email = authentication.getName();

    return productService.updateProduct(id, product, email);
}
@PutMapping("/{id}/rent")
public Product rentProduct(@PathVariable Long id) {
    return productService.rentProduct(id);
}

@PutMapping("/{id}/return")
public void returnProduct(
        @PathVariable Long id){

    productService.returnProduct(id);

}
@GetMapping("/stats")
public ProductStatsDTO getStats(
        @RequestParam String university){

    return productService.getStats(university);

}

}
