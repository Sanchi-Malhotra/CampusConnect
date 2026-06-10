package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private Double price;

    private String category;

    private String type;


    //eg product
    // {
    //     "title":"Engineering Mathematics",
    //     "description":"2nd year book",
    //     "price":50,
    //     "category":"BOOK",
    //     "type":"RENT"
    //   }


// category:
// BOOK
// NOTES
// CALCULATOR
// CYCLE
// LAPTOP
// HOSTEL_ITEM

// type:
// RENT
// SELL
// EXCHANGE
}