package com.ecom.shophaven.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.shophaven.entities.Category;

public interface CategoryRepository extends JpaRepository<Category,UUID>  {

}
