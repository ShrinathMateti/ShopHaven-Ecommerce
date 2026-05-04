package com.ecom.shophaven.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.ecom.shophaven.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product,UUID>,JpaSpecificationExecutor<Product> {

	Product findBySlug(String slug);

}
