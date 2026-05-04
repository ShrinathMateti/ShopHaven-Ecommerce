package com.ecom.shophaven.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundEx extends RuntimeException {
	
	private static final long serialVersionUID = 1L;
	
    public ResourceNotFoundEx(String s) {
        super(s);
    }

    public ResourceNotFoundEx(String s,Throwable cause){
        super(s,cause);
    }
}
