package com.example.demo.dto;

public class ProductStatsDTO {

    private long totalProducts;
    private long availableProducts;
    private long rentedProducts;
    private long categories;

    public ProductStatsDTO(long totalProducts,
                           long availableProducts,
                           long rentedProducts,
                           long categories) {

        this.totalProducts = totalProducts;
        this.availableProducts = availableProducts;
        this.rentedProducts = rentedProducts;
        this.categories = categories;
    }

    public long getTotalProducts() {
        return totalProducts;
    }

    public long getAvailableProducts() {
        return availableProducts;
    }

    public long getRentedProducts() {
        return rentedProducts;
    }

    public long getCategories() {
        return categories;
    }
}