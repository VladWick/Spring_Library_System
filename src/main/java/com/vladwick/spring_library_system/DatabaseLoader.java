package com.vladwick.spring_library_system;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vladwick.spring_library_system.model.Book;
import com.vladwick.spring_library_system.model.User;
import com.vladwick.spring_library_system.service.BookService;
import com.vladwick.spring_library_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
public class DatabaseLoader implements CommandLineRunner {

	@Autowired
	private UserService userService;

	@Autowired
	private BookService bookService;

	@Override
	public void run(String... strings) {

		boolean isPopulateUsers = false;
		if(isPopulateUsers) {
			populateUsers(userService);
		}

		boolean isPopulateBooks = false;
		if(isPopulateBooks) {
			populateBooks(bookService);
		}

	}

	static void populateUsers(UserService userService) {
		User user1 = new User("Kara", "Evans", "asd1@email.com", "asd", "USER");
		User user2 = new User("Gerard", "Winter", "asd2@email.com", "asd", "USER");
		User user3 = new User("Rayhan", "Mccoy", "asd3@email.com", "asd", "USER");
		User user4 = new User("Jade", "Munoz", "asd4@email.com", "asd", "USER");
		User user5 = new User("Fleur", "Hatfield", "asd5@email.com", "asd", "USER");
		User user6 = new User("Owais", "Long", "asd6@email.com", "asd", "USER");
		User user7 = new User("Blake", "Campbell", "asd7@email.com", "asd", "USER");
		User user8 = new User("Karl", "Cummings", "asd8@email.com", "asd", "USER");
		User user9 = new User("Ashwin", "Floyd", "asd9@email.com", "asd", "USER");
		User user10 = new User("Salman", "Brooks", "asd10@email.com", "asd", "USER");
		User user11 = new User("Albert", "Church", "asd@11email.com", "asd", "USER");
		User user12 = new User("Isabelle", "Greene", "asd12@email.com", "asd", "USER");
		User user13 = new User("Wiktor", "Connor", "asd13@email.com", "asd", "USER");

		userService.saveUser(user1);
		userService.saveUser(user2);
		userService.saveUser(user3);
		userService.saveUser(user4);
		userService.saveUser(user5);
		userService.saveUser(user6);
		userService.saveUser(user7);
		userService.saveUser(user8);
		userService.saveUser(user9);
		userService.saveUser(user10);
		userService.saveUser(user11);
		userService.saveUser(user12);
		userService.saveUser(user13);
	}

	static void populateBooks(BookService bookService) {
		ObjectMapper mapper = new ObjectMapper();
		TypeReference<List<Book>> typeReference = new TypeReference<List<Book>>(){};
		InputStream inputStream = TypeReference.class.getResourceAsStream("/books.json");
		try {
			List<Book> books = mapper.readValue(inputStream, typeReference);

			for(Book book : books) {
				//book.setUser(adminUser);
				bookService.save(book);
			}
			System.out.println("All books Saved!");
		} catch (IOException e){
			System.out.println("Unable to save books: " + e.getMessage());
		}
	}
}
