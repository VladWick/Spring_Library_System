package com.vladwick.spring_library_system.repository;

import com.vladwick.spring_library_system.model.User;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface UserRepository extends Repository<User, Long> {

    User save(@Param("user") User user);

    void deleteById(@Param("id") Long id);

    User findByName(String name);

}
