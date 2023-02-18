package com.vladwick.spring_library_system;

import static com.vladwick.spring_library_system.WebSocketConfiguration.*;

import com.vladwick.spring_library_system.model.Book;
import com.vladwick.spring_library_system.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.server.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RepositoryEventHandler(Book.class)
public class EventHandler {

	private final SimpMessagingTemplate websocket;

	private final EntityLinks entityLinks;

	@Autowired
	public EventHandler(SimpMessagingTemplate websocket, EntityLinks entityLinks) {
		this.websocket = websocket;
		this.entityLinks = entityLinks;
	}

	@HandleAfterCreate
	public void newBook(Book book) {
		this.websocket.convertAndSend(
				MESSAGE_PREFIX + "/newBook", getPath(book));
	}

	@HandleAfterDelete
	public void deleteBook(Book book) {
		this.websocket.convertAndSend(
				MESSAGE_PREFIX + "/deleteBook", getPath(book));
	}

	@HandleAfterSave
	public void updateBook(Book book) {
		this.websocket.convertAndSend(
				MESSAGE_PREFIX + "/updateBook", getPath(book));
	}

	/**
	 * Take an {@link Employee} and get the URI using Spring Data REST's {@link EntityLinks}.
	 *
	 * @param book
	 */
	private String getPath(Book book) {
		return this.entityLinks.linkForItemResource(book.getClass(),
				book.getId()).toUri().getPath();
	}

}
