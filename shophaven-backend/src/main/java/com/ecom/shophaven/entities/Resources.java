package com.ecom.shophaven.entities;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product_resources")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resources {
	
	    @Id
	    @GeneratedValue
	    private UUID id;

	    @Column(nullable = false)
	    private String name;

	    @Column(nullable = false)
	    private String url;

	    @Column(nullable = false)
	    private Boolean isPrimary;

	    @Column(nullable = false)
	    private String type;

	    @ManyToOne
	    @JoinColumn(name = "product_id",nullable = false)
	    @JsonIgnore
	    private Product product;

}
