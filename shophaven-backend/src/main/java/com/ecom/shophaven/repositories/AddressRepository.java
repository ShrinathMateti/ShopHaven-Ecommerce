package com.ecom.shophaven.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecom.shophaven.entities.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, UUID> {
}
