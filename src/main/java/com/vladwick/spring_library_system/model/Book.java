package com.vladwick.spring_library_system.model;

import javax.persistence.*;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "title", columnDefinition="text")
    private String title;

    @Column(name = "author", columnDefinition="text")
    private String author;

    @Column(name = "image", columnDefinition="text")
    private String image;

    @Column(name = "downloadCount")
    private Long downloadCount;

    @Column(name = "language")
    private String language;

    @Column(name = "link_to_the_text", columnDefinition="text")
    private String link_to_the_text;

    public Book() {

    }

    public Book(String title, String author, String image, Long downloadCount) {
        this.title = title;
        this.author = author;
        this.image = image;
        this.downloadCount = downloadCount;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String name) {
        this.title = name;
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

    public Long getDownloadCount() {
        return downloadCount;
    }

    public void setDownloadCount(Long download_count) {
        this.downloadCount = download_count;
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

}
