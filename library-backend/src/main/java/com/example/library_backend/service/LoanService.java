package com.example.library_backend.service;

import java.util.List;

import com.example.library_backend.dto.LoanRequest;
import com.example.library_backend.entity.Loan;

public interface LoanService {
	Loan issueBook(LoanRequest req);

	List<Loan> getAllLoans();
}
	