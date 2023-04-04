package com.vladwick.spring_library_system.service.impl;

import com.vladwick.spring_library_system.model.Book;
import com.vladwick.spring_library_system.model.Favourite;
import com.vladwick.spring_library_system.repository.BookRepository;
import com.vladwick.spring_library_system.repository.FavouriteRepository;
import com.vladwick.spring_library_system.service.FavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavouriteServiceImpl implements FavouriteService {

    @Autowired
    BookRepository bookRepository;
    @Autowired
    FavouriteRepository favouriteRepository;

    public List<Favourite> findAll() {
        return favouriteRepository.findAll();
    }

    public Favourite save(Favourite favourite) {
        return favouriteRepository.save(favourite);
    }

    public List<Book> getAllFavourites() {
        List<Book> favouriteBooks = new ArrayList<>();
        List<Favourite> favourites = favouriteRepository.findAll();
        for(Favourite f: favourites) {
            favouriteBooks.add(bookRepository.getBookById(f.getBookId()));
        }
        return favouriteBooks;
    }

    public List<Book> getFavouritesBooksByUserId(Long userId) {
        List<Book> favouriteBooks = new ArrayList<>();
        List<Favourite> favourites = favouriteRepository.findAll();
        for(Favourite f: favourites) {
            if(userId == f.getUserId()) {
                favouriteBooks.add(bookRepository.getBookById(f.getBookId()));
            }
        }
        return favouriteBooks;
    }
}
