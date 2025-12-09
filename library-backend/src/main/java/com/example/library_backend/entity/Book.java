package com.example.library_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "books")
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;
	private String author;
	private String isbn;
	private String category;
	private Integer total_copies;
	private Integer available_copies;

	public Book() {
	}

	public Book(Long id, String title, String author, String isbn, String category, int total_copies,
			int available_copies) {
		super();
		this.id = id;
		this.title = title;
		this.author = author;
		this.isbn = isbn;
		this.category = category;
		this.total_copies = total_copies;
		this.available_copies = available_copies;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Integer getTotal_copies() {
		return total_copies;
	}

	public void setTotal_copies(Integer total_copies) {
		this.total_copies = total_copies;
	}

	public Integer getAvailable_copies() {
		return available_copies;
	}

	public void setAvailable_copies(Integer available_copies) {
		this.available_copies = available_copies;
	}

}
