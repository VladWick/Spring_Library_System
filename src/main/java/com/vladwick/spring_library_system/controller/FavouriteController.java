package com.vladwick.spring_library_system.controller;

import com.vladwick.spring_library_system.model.Book;
import com.vladwick.spring_library_system.model.Favourite;
import com.vladwick.spring_library_system.service.FavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class FavouriteController {

    @Autowired
    private FavouriteService favouriteService;

    @GetMapping("/books/favourites")
    public List<Book> getFavouritesBooks() {
        return favouriteService.getAllFavourites();
    }

    @GetMapping("/books/favourites/{userId}")
    public List<Book> getFavouritesBooksByUserId(@PathVariable Long userId) {
        return favouriteService.getFavouritesBooksByUserId(userId);
    }

    @PostMapping("/books/favourites")
    public Favourite createBook(@RequestBody Favourite favourite) {
        return favouriteService.save(favourite);
    }

}
