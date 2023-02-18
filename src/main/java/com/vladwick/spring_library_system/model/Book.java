package com.vladwick.spring_library_system.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
//@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", columnDefinition="text")
    private String name;

    @Column(name = "author", columnDefinition="text")
    private String author;

    @Column(name = "image", columnDefinition="text")
    private String image;

    @Column(name = "download_count")
    private String download_count;

    @Column(name = "language")
    private String language;

    @Column(name = "link_to_the_text", columnDefinition="text")
    private String link_to_the_text;

    //@Column(name = "user_who_added", columnDefinition="text")
    //@JsonIgnore
    private @ManyToOne User user;

    public Book() {

    }

    public Book(String name, String author, String image, String download_count, User user) {
        this.name = name;
        this.author = author;
        this.image = image;
        this.download_count = download_count;
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return name;
    }

    public void setTitle(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDownload_count() {
        return download_count;
    }

    public void setDownload_count(String download_count) {
        this.download_count = download_count;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getLink_to_the_text() {
        return link_to_the_text;
    }

    public void setLink_to_the_text(String link_to_the_text) {
        this.link_to_the_text = link_to_the_text;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
