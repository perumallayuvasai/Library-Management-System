package com.example.library_backend.service.impl;

import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.example.library_backend.dto.BookRequest;
import com.example.library_backend.entity.Book;
import com.example.library_backend.exception.DuplicateIsbnException;
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

	@Override
	public Book createBook(BookRequest req) {
		if (req.getIsbn() != null && !req.getIsbn().isBlank()) {
			bookRepository.findByIsbn(req.getIsbn()).ifPresent(b -> {
				throw new DuplicateIsbnException("ISBN already exists: " + req.getIsbn());
			});
		}

		Book book = new Book();
		book.setTitle(req.getTitle());
		book.setAuthor(req.getAuthor());
		book.setCategory(req.getCategory());
		book.setIsbn(req.getIsbn());
		book.setTotal_copies(req.getTotalCopies());
		book.setAvailable_copies(req.getTotalCopies());

		try {
			return bookRepository.save(book);
		} catch (DataIntegrityViolationException ex) {
			throw new DuplicateIsbnException("ISBN already exists or violates constraint.");
		}
	}

}
