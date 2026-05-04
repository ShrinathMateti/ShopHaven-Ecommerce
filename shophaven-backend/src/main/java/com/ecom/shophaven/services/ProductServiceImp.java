package com.ecom.shophaven.services;

import java.util.List;
import java.util.UUID;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.ecom.shophaven.dto.ProductDto;
import com.ecom.shophaven.entities.Product;
import com.ecom.shophaven.exceptions.ResourceNotFoundEx;
import com.ecom.shophaven.mapper.ProductMapper;
import com.ecom.shophaven.repositories.ProductRepository;
import com.ecom.shophaven.specification.ProductSpecification;

@Service
public class ProductServiceImp implements ProductService{
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
    private CategoryService categoryService;
	
	@Autowired
	private ProductMapper productMapper;

	@Override
	public Product addProduct(ProductDto productDto) {
		Product product = productMapper.mapToProductEntity(productDto);
		return productRepository.save(product);
	}
	
	public List<ProductDto> getAllProducts(UUID categoryId, UUID typeId) {
	    Specification<Product> spec = (root, query, cb) -> cb.conjunction();

	    if (categoryId != null) {
	        spec = spec.and(ProductSpecification.hasCategoryId(categoryId));
	    }
	    if (typeId != null) {
	        spec = spec.and(ProductSpecification.hasCategoryTypeId(typeId));
	    }

	    return productMapper.getProductDtos(productRepository.findAll(spec));
	}

	@Override
	public ProductDto getProductBySlug(String slug) {
		Product product= productRepository.findBySlug(slug);
        if(null == product){
            throw new ResourceNotFoundEx("Product Not Found!");
        }
        ProductDto productDto = productMapper.mapProductToDto(product);
        productDto.setCategoryId(product.getCategory().getId());
        productDto.setCategoryTypeId(product.getCategoryType().getId());
        productDto.setVariants(productMapper.mapProductVariantListToDto(product.getProductVariants()));
        productDto.setProductResources(productMapper.mapProductResourcesListDto(product.getResources()));
        return productDto;
	}

	@Override
    public ProductDto getProductById(UUID id) {
        Product product= productRepository.findById(id).orElseThrow(()-> new ResourceNotFoundEx("Product Not Found!"));
        ProductDto productDto = productMapper.mapProductToDto(product);
        productDto.setCategoryId(product.getCategory().getId());
        productDto.setCategoryTypeId(product.getCategoryType().getId());
        productDto.setVariants(productMapper.mapProductVariantListToDto(product.getProductVariants()));
        productDto.setProductResources(productMapper.mapProductResourcesListDto(product.getResources()));
        return productDto;
    }

	@Override
	public Product updateProduct(ProductDto productDto, UUID id) {
		Product product= productRepository.findById(id).orElseThrow(()-> new ResourceNotFoundEx("Product Not Found!"));
        productDto.setId(product.getId());
        return productRepository.save(productMapper.mapToProductEntity(productDto));
	}

	@Override
    public Product fetchProductById(UUID id) throws Exception {
        return productRepository.findById(id).orElseThrow(BadRequestException::new);
    }
}
