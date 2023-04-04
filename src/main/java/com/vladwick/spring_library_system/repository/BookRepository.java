package com.vladwick.spring_library_system.repository;

import com.vladwick.spring_library_system.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

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
    List<Book> findBookByTitleAndAuthor(String word, String word2);


    /* Advanced Searching */
    List<Book> findBookByTitleOrderByDownloadCountAsc(String word);
    List<Book> findBookByTitleOrderByDownloadCountDesc(String word);
    List<Book> findBookByTitleOrderByIdAsc(String word);
    List<Book> findBookByTitleOrderByIdDesc(String word);

    List<Book> findBookByAuthorOrderByDownloadCountAsc(String word);
    List<Book> findBookByAuthorOrderByDownloadCountDesc(String word);
    List<Book> findBookByAuthorOrderByIdAsc(String word);
    List<Book> findBookByAuthorOrderByIdDesc(String word);

    List<Book> findBookByTitleOrAuthorOrderByDownloadCountAsc(String word, String word2);
    List<Book> findBookByTitleOrAuthorOrderByDownloadCountDesc(String word, String word2);
    List<Book> findBookByTitleOrAuthorOrderByIdAsc(String word, String word2);
    List<Book> findBookByTitleOrAuthorOrderByIdDesc(String word, String word2);

}
