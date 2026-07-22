package com.example.demo.repository;

import com.example.demo.entity.RentalRequest;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RentalRequestRepository extends JpaRepository<RentalRequest, Long> {

    List<RentalRequest> findByProductIdAndBuyerIdAndStatus(
        Long productId,
        Long buyerId,
        String status
);
List<RentalRequest> findBySellerId(Long sellerId);
List<RentalRequest> findByProductIdAndStatus(Long productId, String status);
List<RentalRequest> findByBuyerId(Long buyerId);
List<RentalRequest> findBySellerIdAndStatus(
    Long sellerId,
    String status
);
@Transactional
@Modifying
@Query("DELETE FROM RentalRequest r WHERE r.product.id = :productId")
void deleteByProductId(@Param("productId") Long productId);
RentalRequest findById(long id);
}