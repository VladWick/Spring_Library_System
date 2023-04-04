package com.vladwick.spring_library_system;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vladwick.spring_library_system.model.Book;
import com.vladwick.spring_library_system.model.User;
import com.vladwick.spring_library_system.repository.BookRepository;
import com.vladwick.spring_library_system.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

/**
*
* @author: VladWick
*
* */
@SpringBootApplication
public class SpringLibrarySystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringLibrarySystemApplication.class, args);
    }

}
