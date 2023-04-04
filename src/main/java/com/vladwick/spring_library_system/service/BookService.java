package com.vladwick.spring_library_system.service;

import com.vladwick.spring_library_system.model.Book;
import com.vladwick.spring_library_system.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public interface BookService {

    List<Book> findAll();
    Book save(Book book);

    void delete(@Param("book") Book book);

    Book getBookById(Long bookId);

    /* Sorting */

    List<Book> findByOrderByDownloadCountAsc();

    List<Book> findByOrderByDownloadCountDesc();

    List<Book> findByOrderByIdAsc();

    List<Book> findByOrderByIdDesc();

    /* Searching */

    List<Book> findBooksByTitle(String title);

    List<Book> findBooksByAuthor(String author);

    List<Book> findBooksByTitleAndAuthor(String word);


    /* Advanced Searching */

    List<Book> findBooks(String word, String searchBy, String sortBy, String sortHow);


    /* Analyze */

    List<String> getAllLanguages();

    Map<String, Integer> analyzeLanguages();

    List<Integer> amountOfLanguages();

    List<HashMap<String, String>> mapOfLanguages();

    HashMap<String, Integer> mapOfTextAvailable();


}
