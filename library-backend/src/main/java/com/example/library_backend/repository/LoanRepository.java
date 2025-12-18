package com.example.library_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.library_backend.entity.Loan;

public interface LoanRepository extends JpaRepository<Loan, Long> {
	List<Loan> findByMemberId(Long memberId);

	List<Loan> findByBookId(Long bookId);

	List<Loan> findByStatus(String status);
}
