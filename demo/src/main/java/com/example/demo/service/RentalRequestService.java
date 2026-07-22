package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.entity.RentalRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.RentalRequestRepository;
import com.example.demo.repository.UserRepository;

import java.time.LocalDateTime;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class RentalRequestService {

    @Autowired
    private RentalRequestRepository rentalRequestRepository;

    @Autowired
private ProductRepository productRepository;

@Autowired
private UserRepository userRepository;

public RentalRequest createRequest(Long productId, Long buyerId) {

    Product product =
            productRepository.findById(productId).orElseThrow();

    User buyer =
            userRepository.findById(buyerId).orElseThrow();

    User seller = product.getOwner();

    if(product.getOwner().getId().equals(buyerId)){
        throw new RuntimeException("You cannot request your own product.");
    }

    List<RentalRequest> existingRequests =
    rentalRequestRepository.findByProductIdAndBuyerIdAndStatus(
            productId,
            buyerId,
            "PENDING"
    );

if(!existingRequests.isEmpty()){
throw new ResponseStatusException(
        HttpStatus.CONFLICT,
        "You have already requested this product."
);
}

    RentalRequest request = new RentalRequest();

    request.setProduct(product);
    request.setBuyer(buyer);
    request.setSeller(seller);
    request.setStatus("PENDING");
    request.setRequestDate(LocalDateTime.now());

    return rentalRequestRepository.save(request);
}
public List<RentalRequest> getSellerRequests(Long sellerId){

    return rentalRequestRepository.findBySellerId(sellerId);

}
public void acceptRequest(Long requestId, String email){

    RentalRequest request = rentalRequestRepository
            .findById(requestId)
            .orElseThrow(() ->
                    new RuntimeException("Request not found."));

    if(!request.getSeller().getEmail().equals(email)){
        throw new RuntimeException(
                "You are not allowed to accept this request."
        );
    }

    request.setStatus("APPROVED");

    rentalRequestRepository.save(request);

    Product product = request.getProduct();

    product.setStatus("RENTED");

    productRepository.save(product);

    List<RentalRequest> pendingRequests =
            rentalRequestRepository.findByProductIdAndStatus(
                    product.getId(),
                    "PENDING"
            );

    for(RentalRequest r : pendingRequests){

        if(!r.getId().equals(requestId)){

            r.setStatus("REJECTED");

            rentalRequestRepository.save(r);

        }

    }

}

public void rejectRequest(Long requestId, String email){

    RentalRequest request = rentalRequestRepository
            .findById(requestId)
            .orElseThrow(() ->
                    new RuntimeException("Request not found."));

    if(!request.getSeller().getEmail().equals(email)){
        throw new RuntimeException(
                "You are not allowed to reject this request."
        );
    }

    request.setStatus("REJECTED");

    rentalRequestRepository.save(request);

}
public List<RentalRequest> getBuyerRequests(Long buyerId){

    return rentalRequestRepository.findByBuyerId(buyerId);

}
public List<RentalRequest> getPendingSellerRequests(Long sellerId){

    return rentalRequestRepository
            .findBySellerIdAndStatus(
                    sellerId,
                    "PENDING"
            );

}

}