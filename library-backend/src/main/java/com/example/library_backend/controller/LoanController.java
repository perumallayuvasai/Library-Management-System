package com.example.library_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.library_backend.dto.LoanRequest;
import com.example.library_backend.entity.Loan;
import com.example.library_backend.service.LoanService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/loans")
@CrossOrigin(origins = "http://localhost:5173")
public class LoanController {

	private final LoanService loanService;

	public LoanController(LoanService loanService) {
		this.loanService = loanService;
	}

	@PostMapping("/issue")
	public ResponseEntity<Loan> issue(@Valid @RequestBody LoanRequest req) {
		Loan loan = loanService.issueBook(req);
		return ResponseEntity.status(201).body(loan);
	}

	@GetMapping
	public List<Loan> all() {
		return loanService.getAllLoans();
	}
}
