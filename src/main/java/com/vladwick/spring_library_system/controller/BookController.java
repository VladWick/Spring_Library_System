package com.vladwick.spring_library_system.controller;

import com.vladwick.spring_library_system.model.Book;
import com.vladwick.spring_library_system.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/books")
    public List<Book> getAllBooks(){
        return bookService.findAll();
    }

    @PostMapping("/books")
    public Book createBook(@RequestBody Book book) {
        return bookService.save(book);
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }

    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        Book book = bookService.getBookById(id);

        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setImage(bookDetails.getImage());
        book.setDownloadCount(bookDetails.getDownloadCount());
        book.setLanguage(bookDetails.getLanguage());
        book.setLink_to_the_text(bookDetails.getLink_to_the_text());

        Book updatedBook = bookService.save(book);
        return ResponseEntity.ok(updatedBook);
    }

    @DeleteMapping("/books/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteBook(@PathVariable Long id) {
        Book book = bookService.getBookById(id);

        bookService.delete(book);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    /* Sorting */

    @GetMapping("/books/unpopular")
    public List<Book> getLeastPopularBooks() {
        return bookService.findByOrderByDownloadCountAsc();
    }

    @GetMapping("/books/popular")
    public List<Book> getMostPopularBooks() {
        return bookService.findByOrderByDownloadCountDesc();
    }

    @GetMapping("/books/latest")
    public List<Book> getLatestBooks() {
        return bookService.findByOrderByIdDesc();
    }

    @GetMapping("/books/earliest")
    public List<Book> getEarliestBooks() {
        return bookService.findByOrderByIdAsc();
    }

    /* Searching */

    @GetMapping("/books/search/title/{title}")
    public List<Book> searchByTitle(@PathVariable String title) {
        return bookService.findBooksByTitle(title);
    }

    @GetMapping("/books/search/author/{author}")
    public List<Book> searchByAuthor(@PathVariable String author) {
        return bookService.findBooksByAuthor(author);
    }

    @GetMapping("/books/search/all/{word}")
    public List<Book> searchByTitleAndAuthor(@PathVariable String word) {
        return bookService.findBooksByTitleAndAuthor(word);
    }

    /* Advanced searching */
    @GetMapping("/books/search/{word}")
    public List<Book> search(@PathVariable String word,
                             @RequestParam String searchBy,
                             @RequestParam String sortBy,
                             @RequestParam String sortHow) {
        return bookService.findBooks(word, searchBy, sortBy, sortHow);
    }


    /* Analyze */
    @GetMapping("/books/languages/unique")
    public List<String> getUniqueLanguages() {
        return bookService.getAllLanguages();
    }

    @GetMapping("/books/languages/languages_amount")
    public Map<String, Integer> getUniqueLanguagesAndAmount() {
        return bookService.analyzeLanguages();
    }

    @GetMapping("/books/languages/amount")
    public List<Integer> getAmountOfLanguages() {
        return bookService.amountOfLanguages();
    }

    @GetMapping("/books/languages/map")
    public List<HashMap<String, String>> mapOfLanguages() {
        return bookService.mapOfLanguages();
    }

    @GetMapping("/books/available")
    public HashMap<String, Integer> mapOfTextAvailable() {
        return bookService.mapOfTextAvailable();
    }

}
