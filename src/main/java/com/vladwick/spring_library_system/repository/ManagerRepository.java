package com.vladwick.spring_library_system.repository;

import com.vladwick.spring_library_system.model.Manager;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface ManagerRepository extends Repository<Manager, Long> {

	Manager save(Manager manager);

	Manager findByName(String name);

}
