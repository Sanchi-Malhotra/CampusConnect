package com.example.demo.repository;

import com.example.demo.entity.Product;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByOwnerId(Long userId);
    List<Product> findByOwnerUniversity(String university);
  
}