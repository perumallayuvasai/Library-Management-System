package com.example.library_backend.service;

import java.util.List;

import com.example.library_backend.dto.BookRequest;
import com.example.library_backend.entity.Book;

public interface BookService {

	List<Book> getAllBooks();

	Book createBook(BookRequest req);
}
