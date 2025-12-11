package com.example.library_backend.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.library_backend.dto.BookRequest;
import com.example.library_backend.entity.Book;
import com.example.library_backend.service.BookService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {
	private final BookService bookService;

	public BookController(BookService bookService) {
		this.bookService = bookService;
	}

	@GetMapping // List all Books
	public List<Book> getAllBooks() {
		return bookService.getAllBooks();
	}

	@GetMapping("/{id}") // Get single book
	public Book getBook(@PathVariable Long id) {
		return bookService.getBook(id);
	}

	@PostMapping // Post a Book
	public ResponseEntity<Book> createBook(@Valid @RequestBody BookRequest bookRequest) {
		Book saved = bookService.createBook(bookRequest);
		return ResponseEntity.status(201).body(saved);
	}

	@PutMapping("/{id}") // Update a book by id
	public ResponseEntity<Book> updateBook(@PathVariable Long id, @Valid @RequestBody BookRequest bookRequest) {
		Book updated = bookService.updateBook(id, bookRequest);
		return ResponseEntity.ok(updated);
	}

	@DeleteMapping("/{id}") //Delete a book by id
	public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
		bookService.deleteBook(id);
		return ResponseEntity.noContent().build();
	}
}