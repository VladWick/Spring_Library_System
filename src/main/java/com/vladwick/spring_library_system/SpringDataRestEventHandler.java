package com.vladwick.spring_library_system;

import com.vladwick.spring_library_system.model.Book;
import com.vladwick.spring_library_system.model.User;
import com.vladwick.spring_library_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RepositoryEventHandler(Book.class)
public class SpringDataRestEventHandler {

	private final UserRepository userRepository;

	@Autowired
	public SpringDataRestEventHandler(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@HandleBeforeCreate
	@HandleBeforeSave
	public void applyUserInformationUsingSecurityContext(Book book) {
		String name = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = this.userRepository.findByName(name);
		if (user == null) {
			User newUser = new User();
			newUser.setName(name);
			newUser.setRole("ADMIN");
			user = this.userRepository.save(newUser);
		}
		book.setUser(user);
	}
}
