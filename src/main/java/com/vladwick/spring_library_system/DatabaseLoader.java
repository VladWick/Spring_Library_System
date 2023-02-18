package com.vladwick.spring_library_system;

import com.vladwick.spring_library_system.model.Book;
import com.vladwick.spring_library_system.model.User;
import com.vladwick.spring_library_system.repository.BookRepository;
import com.vladwick.spring_library_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

	private UserRepository users;

	private BookRepository books;

	@Autowired
	public DatabaseLoader(UserRepository usersRepository,
						  BookRepository booksRepository) {

		this.users = usersRepository;
		this.books = booksRepository;
	}

	@Override
	public void run(String... strings) {

		User vladwick = this.users.save(new User("vlad", "wick", "vladwick@gmail.com", "asd", "ADMIN"));
		this.users.save(vladwick);

		SecurityContextHolder.getContext().setAuthentication(
				new UsernamePasswordAuthenticationToken("vladwick", "doesn't matter",
						AuthorityUtils.createAuthorityList("ADMIN")));

		//this.books.save(new Book("Frodo", "Baggins", "ring bearer", "1293", vladwick));
		//this.books.save(new Book("Bilbo", "Baasdggins", "burglar", "1213", vladwick));
		//this.books.save(new Book("Gandalf", "the Grey", "wizard", "1253", vladwick));

		SecurityContextHolder.clearContext();
	}
}
