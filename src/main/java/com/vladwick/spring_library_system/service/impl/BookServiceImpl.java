package com.vladwick.spring_library_system.service.impl;

import com.vladwick.spring_library_system.model.Book;
import com.vladwick.spring_library_system.repository.BookRepository;
import com.vladwick.spring_library_system.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    BookRepository bookRepository;

    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public Book save(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public void delete(Book book) {
        bookRepository.delete(book);
    }

    @Override
    public Book getBookById(Long bookId) {
        return bookRepository.getBookById(bookId);
    }

    /* Sorting */

    @Override
    public List<Book> findByOrderByDownloadCountAsc() {
        return bookRepository.findByOrderByDownloadCountAsc();
    }

    @Override
    public List<Book> findByOrderByDownloadCountDesc() {
        return bookRepository.findByOrderByDownloadCountDesc();
    }

    @Override
    public List<Book> findByOrderByIdAsc() {
        return bookRepository.findByOrderByIdAsc();
    }

    @Override
    public List<Book> findByOrderByIdDesc() {
        return bookRepository.findByOrderByIdDesc();
    }

    /* Searching */

    @Override
    public List<Book> findBooksByTitle(String title) {
        List<Book> books = bookRepository.findAll();
        List<Book> foundBooks = new ArrayList<>();
        for(Book book : books) {
            String currentTitle = book.getTitle().toLowerCase();
            if(title.toLowerCase().contains(currentTitle) || currentTitle.contains(title.toLowerCase())) {
                foundBooks.add(book);
            }
        }
        return foundBooks;
    }

    @Override
    public List<Book> findBooksByAuthor(String author) {
        List<Book> books = bookRepository.findAll();
        List<Book> foundBooks = new ArrayList<>();
        for(Book book : books) {
            String currentAuthor = book.getAuthor().toLowerCase();
            if(author.toLowerCase().contains(currentAuthor) || currentAuthor.contains(author.toLowerCase())) {
                foundBooks.add(book);
            }
        }
        return foundBooks;
    }

    @Override
    public List<Book> findBooksByTitleAndAuthor(String word) {
        List<Book> books = bookRepository.findAll();
        List<Book> foundBooks = new ArrayList<>();
        for(Book book : books) {
            String currentTitle = book.getTitle().toLowerCase();
            if(word.toLowerCase().contains(currentTitle) || currentTitle.contains(word.toLowerCase())) {
                foundBooks.add(book);
            }
            String currentAuthor = book.getAuthor().toLowerCase();
            if(word.toLowerCase().contains(currentAuthor) || currentAuthor.contains(word.toLowerCase())) {
                foundBooks.add(book);
            }
        }
        return foundBooks;
    }

    /* Advanced  */
    public List<Book> findBooks(String word, String searchBy, String sortBy, String sortHow) {
        List<Book> foundBooks = new ArrayList<>();
        System.out.println("SearchBy: " + searchBy);
        if(searchBy.equals("title")) {
            if(sortBy.equals("popular")) {
                if(sortHow.equals("ascending") || sortHow.equals("descending")) {
                    foundBooks = orderByDownloadCount(findBooksByTitle(word), sortHow);
                } else {
                    System.out.println("Unsupported 'sortHow': " + "'"+ sortHow + "'");
                }
            } else if(sortBy.equals("latest")) {
                if(sortHow.equals("ascending") || sortHow.equals("descending")) {
                    foundBooks = orderById(findBooksByTitle(word), sortHow);
                } else {
                    System.out.println("Unsupported 'sortHow': " + "'"+ sortHow + "'");
                }
            } else {
                System.out.println("Unsupported 'sortBy': " + "'"+ sortBy + "'");
            }
        } else if(searchBy.equals("author")) {
            if(sortBy.equals("popular")) {
                if(sortHow.equals("ascending") || sortHow.equals("descending")) {
                    foundBooks = orderByDownloadCount(findBooksByAuthor(word), sortHow);
                } else {
                    System.out.println("Unsupported 'sortHow': " + "'"+ sortHow + "'");
                }
            } else if(sortBy.equals("latest")) {
                if(sortHow.equals("ascending") || sortHow.equals("descending")) {
                    foundBooks = orderById(findBooksByAuthor(word), sortHow);
                } else {
                    System.out.println("Unsupported 'sortHow': " + "'"+ sortHow + "'");
                }
            } else {
                System.out.println("Unsupported 'sortBy': " + "'"+ sortBy + "'");
            }
        } else if(searchBy.equals("all")) {
            if(sortBy.equals("popular")) {
                if(sortHow.equals("ascending") || sortHow.equals("descending")) {
                    foundBooks = orderByDownloadCount(findBooksByTitleAndAuthor(word), sortHow);
                } else {
                    System.out.println("Unsupported 'sortHow': " + "'"+ sortHow + "'");
                }
            } else if(sortBy.equals("latest")) {
                if(sortHow.equals("ascending") || sortHow.equals("descending")) {
                    foundBooks = orderById(findBooksByTitleAndAuthor(word), sortHow);
                } else {
                    System.out.println("Unsupported 'sortHow': " + "'"+ sortHow + "'");
                }
            } else {
                System.out.println("Unsupported 'sortBy': " + "'"+ sortBy + "'");
            }
        } else {
            System.out.println("Unsupported 'searchBy': " + "'"+ searchBy + "'");
        }
        return foundBooks;
    }

    public List<Book> orderByDownloadCount(List<Book> books, String sortHow) {
        List<Long> downloadCounts = new ArrayList<>();
        for(int i = 0 ; i < books.size(); ++i) {
            downloadCounts.add(books.get(i).getDownloadCount());
        }

        if(sortHow.equals("ascending")) {
            Collections.sort(downloadCounts);
        } else {
            Collections.sort(downloadCounts, Collections.reverseOrder());
        }

        List<Book> sortedBooks = new ArrayList<>();
        for(int i = 0 ; i < books.size(); ++i) {
            for(int j = 0 ; j < books.size(); ++j) {
                if(books.get(j).getDownloadCount() == downloadCounts.get(i)) {
                    sortedBooks.add(books.get(j));
                }
            }
        }
        return sortedBooks;
    }

    public List<Book> orderById(List<Book> books, String sortHow) {
        List<Long> ids = new ArrayList<>();
        for(int i = 0 ; i < books.size(); ++i) {
            ids.add(books.get(i).getId());
        }

        if(sortHow.equals("ascending")) {
            Collections.sort(ids);
        } else {
            Collections.sort(ids, Collections.reverseOrder());
        }

        List<Book> sortedBooks = new ArrayList<>();
        for(int i = 0 ; i < books.size(); ++i) {
            for(int j = 0 ; j < books.size(); ++j) {
                if(books.get(j).getId() == ids.get(i)) {
                    sortedBooks.add(books.get(j));
                }
            }
        }
        return sortedBooks;
    }

    /* Analyze */

    public List<String> getAllLanguages() {
        List<String> languages = new ArrayList<>();

        List<Book> books = bookRepository.findAll();
        for(Book book: books) {
            String lg = book.getLanguage();
            if(isUnique(lg, languages)) {
                languages.add(lg);
            }
        }
        return languages;
    }

    public boolean isUnique(String language, List<String> array) {
        for(String str: array) {
            if(str.equals(language)) {
                return false;
            }
        }
        return true;
    }

    public Map<String, Integer> analyzeLanguages() {
        List<Book> books = bookRepository.findAll();

        List<String> languages = getAllLanguages();
        List<Integer> amount = new ArrayList<>();

        for(int j = 0; j < languages.size(); ++j) {
            amount.add(0);
        }

        for(int i = 0 ; i < books.size(); ++i) {
            String lg = books.get(i).getLanguage();
            for(int j = 0; j < languages.size(); ++j) {
                if(lg.equals(languages.get(j))) {
                    amount.set(j, amount.get(j) + 1);
                }
            }
        }
        HashMap<String, Integer> map = new HashMap<>();
        for(int i = 0 ; i < languages.size(); ++i) {
            map.put(languages.get(i), amount.get(i));
        }
        return map;
    }

    public List<Integer> amountOfLanguages() {
        Map<String, Integer> map = analyzeLanguages();
        List<Integer> amount = new ArrayList<>();
        List<String> keys = new ArrayList<>(map.keySet());
        for(int i = 0 ; i < keys.size(); ++i) {
            amount.add(map.get(keys.get(i)));
        }
        return amount;
    }

    public List<HashMap<String, String>> mapOfLanguages() {
        List<HashMap<String, String>> list = new ArrayList<>();

        Map<String, Integer> data = analyzeLanguages();
        List<String> keys = new ArrayList<>(data.keySet());

        for(int i = 0 ; i < keys.size(); ++i) {
            HashMap<String, String> map = new HashMap<>();
            map.put("language", keys.get(i));
            map.put("amount", data.get(keys.get(i)).toString());
            list.add(map);
        }

        return list;
    }

    public HashMap<String, Integer> mapOfTextAvailable() {
        List<Book> books = bookRepository.findAll();
        HashMap<String, Integer> map = new HashMap<>();
        int available = 0;
        int not_available = 0;
        for(Book book: books) {
            if(book.getLink_to_the_text() == null || book.getLink_to_the_text().isEmpty()) {
                not_available++;
            } else {
                available++;
            }
        }
        map.put("available", available);
        map.put("not_available", not_available);
        return map;
    }

    /* Utils */

    public void printArrayString(List<String> array) {
        for(String str: array) {
            System.out.print(str + " ");
        }
        System.out.println();
    }

    public void printArrayInteger(List<Integer> array) {
        for(Integer number: array) {
            System.out.print(number + " ");
        }
        System.out.println();
    }
}
