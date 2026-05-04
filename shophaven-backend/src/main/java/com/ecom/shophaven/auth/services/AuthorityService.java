package com.ecom.shophaven.auth.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ecom.shophaven.auth.entities.Authority;
import com.ecom.shophaven.auth.repositories.AuthorityRepository;

@Service
public class AuthorityService {

    @Autowired
    private AuthorityRepository authorityRepository;

    public List<Authority> getUserAuthority() {
        Authority authority = authorityRepository.findByRoleCode("USER");
        if (authority == null) {
            authority = createAuthority("USER", "Default user role");
        }
        return List.of(authority);
    }
    
//    public List<Authority> getUserAuthority() {
//        Authority user = authorityRepository.findByRoleCode("USER");
//        if (user == null) {
//            user = createAuthority("USER", "Default user role");
//        }
//
//        Authority admin = authorityRepository.findByRoleCode("ADMIN");
//        if (admin == null) {
//            admin = createAuthority("ADMIN", "Administrator role");
//        }
//
//        return List.of(user, admin);
//    }

    public Authority createAuthority(String role, String description) {
        Authority authority = Authority.builder()
                .roleCode(role)
                .roleDescription(description)
                .build();
        return authorityRepository.save(authority);
    }
}