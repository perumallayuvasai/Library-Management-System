package com.example.library_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.library_backend.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
