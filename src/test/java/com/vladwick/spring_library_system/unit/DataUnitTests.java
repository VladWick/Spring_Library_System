package com.vladwick.spring_library_system.unit;

import com.vladwick.spring_library_system.model.Book;
import com.vladwick.spring_library_system.model.User;
import com.vladwick.spring_library_system.repository.BookRepository;
import com.vladwick.spring_library_system.repository.UserRepository;
import com.vladwick.spring_library_system.service.impl.BookServiceImpl;
import com.vladwick.spring_library_system.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DataUnitTests {

    @Mock
    private UserRepository userRepository;
    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private UserServiceImpl userService;
    @InjectMocks
    private BookServiceImpl bookService;

    @Test
    public void addUserTest() {
        User user = new User("example", "example", "example@email.com", "example", "USER");

        when(userRepository.save(Mockito.any(User.class))).thenReturn(user);

        User savedUser = userService.saveUser(user);

        assertThat(savedUser).isNotNull();
    }

    @Test
    public void addBookTest() {
        Book book = new Book("Romeo and Juliet"
                , "Shakespeare, William"
                , "https://www.gutenberg.org/cache/epub/1513/pg1513.cover.medium.jpg"
                ,198216L);

        when(bookRepository.save(Mockito.any(Book.class))).thenReturn(book);

        Book savedBook = bookService.save(book);
        assertThat(savedBook).isNotNull();
    }

}
