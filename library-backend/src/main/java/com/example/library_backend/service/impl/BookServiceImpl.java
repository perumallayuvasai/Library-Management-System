package com.example.library_backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.library_backend.entity.Book;
import com.example.library_backend.repository.BookRepository;
import com.example.library_backend.service.BookService;

@Service
public class BookServiceImpl implements BookService {

	private final BookRepository bookRepository;

	public BookServiceImpl(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}

	@Override
	public List<Book> getAllBooks() {
		return bookRepository.findAll();
	}

}
