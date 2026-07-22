package com.example.demo.service;

import com.example.demo.dto.ProductStatsDTO;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.RentalRequestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
   

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private RentalRequestRepository rentalRequestRepository;

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts(String university) {

        return productRepository.findByOwnerUniversity(university);
    
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public void deleteProduct(Long id, String email) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found."));
    
        if (!product.getOwner().getEmail().equals(email)) {
            throw new RuntimeException("You are not allowed to delete this product.");
        }
    
        rentalRequestRepository.deleteByProductId(id);
    
        productRepository.deleteById(id);
    }

    public List<Product> getProductsByUser(Long userId){
        return productRepository.findByOwnerId(userId);
    }

    public Product updateProduct(
        Long id,
        Product updatedProduct,
        String email) {

    Product product = productRepository.findById(id).orElse(null);

    if(product == null){
        return null;
    }

    if(!product.getOwner().getEmail().equals(email)){
        throw new RuntimeException("You are not allowed to edit this product.");
    }

    product.setTitle(updatedProduct.getTitle());
    product.setDescription(updatedProduct.getDescription());
    product.setPrice(updatedProduct.getPrice());
    product.setCategory(updatedProduct.getCategory());
    product.setType(updatedProduct.getType());
    product.setImageUrl(updatedProduct.getImageUrl());

    return productRepository.save(product);
}
    public Product rentProduct(Long id) {

        Product product =
                productRepository.findById(id)
                .orElseThrow();
    
        product.setStatus("RENTED");
    
        return productRepository.save(product);
    }
    public void returnProduct(Long productId){

        Product product = productRepository
                .findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found."));
    
        product.setStatus("AVAILABLE");
    
        productRepository.save(product);
    
    }
    public ProductStatsDTO getStats(String university){

        List<Product> products =
                productRepository.findByOwnerUniversity(university);
    
        long total = products.size();
    
        long available = products.stream()
                .filter(p -> p.getStatus().equals("AVAILABLE"))
                .count();
    
        long rented = products.stream()
                .filter(p -> p.getStatus().equals("RENTED"))
                .count();
    
        long categories = products.stream()
                .map(Product::getCategory)
                .distinct()
                .count();
    
        return new ProductStatsDTO(
                total,
                available,
                rented,
                categories
        );
    
    }
   
}