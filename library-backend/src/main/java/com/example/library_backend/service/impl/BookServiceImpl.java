package com.example.library_backend.service.impl;

import java.util.List;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import com.example.library_backend.dto.BookRequest;
import com.example.library_backend.entity.Book;
import com.example.library_backend.exception.BadRequestException;
import com.example.library_backend.exception.DuplicateIsbnException;
import com.example.library_backend.exception.ResourceNotFoundException;
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
	public Book getBook(Long id) { 
		return bookRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
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
		book.setTotalCopies(req.getTotalCopies());
		book.setAvailableCopies(req.getTotalCopies());
		try {
			return bookRepository.save(book);
		} catch (DataIntegrityViolationException ex) {
			throw new DuplicateIsbnException("ISBN already exists or violates constraint.");
		}
	}

	@Override
	public Book updateBook(Long id, BookRequest req) {
		Book existing = bookRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
		// If isbn changed and non-blank, ensure uniqueness
		if (req.getIsbn() != null && !req.getIsbn().isBlank()
				&& (existing.getIsbn() == null || !existing.getIsbn().equals(req.getIsbn()))) {
			bookRepository.findByIsbn(req.getIsbn()).ifPresent(b -> {
				throw new DuplicateIsbnException("ISBN already exists: " + req.getIsbn());
			});
		}
		// business: ensure totalCopies not less than copies already issued
		// issuedCopies = totalCopies - availableCopies (before update)
		int issuedCopies = existing.getTotalCopies() - existing.getAvailableCopies(); // Updated
		if (req.getTotalCopies() < issuedCopies) {
			throw new BadRequestException(
					"Total copies cannot be less than currently issued copies (" + issuedCopies + ")");
		}
		// update fields
		existing.setTitle(req.getTitle());
		existing.setAuthor(req.getAuthor());
		existing.setCategory(req.getCategory());
		existing.setIsbn(req.getIsbn());
		// adjust availableCopies relative to change in total copies
		int diff = req.getTotalCopies() - existing.getTotalCopies(); // Updated
		existing.setTotalCopies(req.getTotalCopies()); // Updated
		existing.setAvailableCopies(existing.getAvailableCopies() + diff); // Updated
		return bookRepository.save(existing);
	}

	@Override
	public void deleteBook(Long id) {
		Book existing = bookRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
		// if some copies are issued, do not allow delete (issuedCopies > 0)
		int issuedCopies = existing.getTotalCopies() - existing.getAvailableCopies(); // Updated
		if (issuedCopies > 0) {
			throw new BadRequestException("Cannot delete book. There are " + issuedCopies + " issued copies.");
		}
		bookRepository.delete(existing);
	}
}