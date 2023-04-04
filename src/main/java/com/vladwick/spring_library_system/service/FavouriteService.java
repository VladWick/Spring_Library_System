package com.vladwick.spring_library_system.service;

import com.vladwick.spring_library_system.model.Book;
import com.vladwick.spring_library_system.model.Favourite;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FavouriteService {

    List<Favourite> findAll();

    Favourite save(Favourite favourite);

    List<Book> getAllFavourites();

    List<Book> getFavouritesBooksByUserId(Long userId);

}
