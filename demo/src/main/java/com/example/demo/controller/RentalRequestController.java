package com.example.demo.controller;

import com.example.demo.entity.RentalRequest;
import com.example.demo.entity.User;
import com.example.demo.service.RentalRequestService;
import com.example.demo.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication; 


@RestController
@CrossOrigin("*")
@RequestMapping("/requests")
public class RentalRequestController {

    @Autowired
    private RentalRequestService rentalRequestService;

 @Autowired
private UserService userService;

@PostMapping
public RentalRequest createRequest(
        @RequestParam Long productId,
        Authentication authentication) {

    String email = authentication.getName();

    User buyer = userService.getUserByEmail(email);

    return rentalRequestService.createRequest(
            productId,
            buyer.getId()
    );
}
@GetMapping("/seller")
public List<RentalRequest> getSellerRequests(
        Authentication authentication){

    String email = authentication.getName();

    User seller = userService.getUserByEmail(email);

    return rentalRequestService.getSellerRequests(seller.getId());

}
@PutMapping("/{requestId}/accept")
public void acceptRequest(
        @PathVariable Long requestId,
        Authentication authentication){

    String email = authentication.getName();

    rentalRequestService.acceptRequest(requestId, email);
}
@PutMapping("/{requestId}/reject")
public void rejectRequest(
        @PathVariable Long requestId,
        Authentication authentication){

    String email = authentication.getName();

    rentalRequestService.rejectRequest(requestId, email);
}
@GetMapping("/buyer")
public List<RentalRequest> getBuyerRequests(
        Authentication authentication){

    String email = authentication.getName();

    User buyer = userService.getUserByEmail(email);

    return rentalRequestService.getBuyerRequests(buyer.getId());

}
@GetMapping("/seller/pending")
public List<RentalRequest> getPendingSellerRequests(
        Authentication authentication){

    String email = authentication.getName();

    User seller = userService.getUserByEmail(email);

    return rentalRequestService.getPendingSellerRequests(seller.getId());

}
}