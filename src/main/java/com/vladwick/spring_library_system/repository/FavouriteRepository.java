package com.vladwick.spring_library_system.repository;

import com.vladwick.spring_library_system.model.Book;
import com.vladwick.spring_library_system.model.Favourite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouriteRepository extends JpaRepository<Favourite, Long> {

    List<Favourite> findAll();
    Favourite save(Favourite favourite);
    void delete(@Param("favourite") Favourite favourite);
    Favourite getFavouritesByBookId(Long bookId);
}
