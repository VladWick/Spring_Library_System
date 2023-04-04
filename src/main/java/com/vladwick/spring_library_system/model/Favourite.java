package com.vladwick.spring_library_system.model;

import javax.persistence.*;

@Entity
@Table(name = "favourites")
public class Favourite {

    @Id
    @Column(name = "bookId")
    private long bookId;

    @Column(name = "userId")
    private long userId;

    public Favourite() {

    }

    public Favourite(long userId) {
        this.userId = userId;
    }

    public long getBookId() {
        return bookId;
    }

    public void setBookId(long bookId) {
        this.bookId = bookId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }
}
