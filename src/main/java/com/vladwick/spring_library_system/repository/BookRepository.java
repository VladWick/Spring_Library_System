package com.vladwick.spring_library_system.repository;

import com.vladwick.spring_library_system.model.Book;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasRole('ADMIN')")
public interface BookRepository extends PagingAndSortingRepository<Book, Long> {

    Book save(Book book);

    Book findByName(String name);

    void delete(@Param("book") Book book);
}
