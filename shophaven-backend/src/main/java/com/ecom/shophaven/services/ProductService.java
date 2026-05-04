package com.ecom.shophaven.services;

import java.util.List;
import java.util.UUID;

import com.ecom.shophaven.dto.ProductDto;
import com.ecom.shophaven.entities.Product;

public interface ProductService {
	
	 public Product addProduct(ProductDto productDto);
	 
	 public List<ProductDto> getAllProducts(UUID categoryId, UUID typeId);

	 public ProductDto getProductBySlug(String slug);
	 
	 ProductDto getProductById(UUID id);

	 public Product updateProduct(ProductDto productDto, UUID id);
	 
	 Product fetchProductById(UUID uuid) throws Exception;

}
