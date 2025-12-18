package com.example.library_backend.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.library_backend.dto.LoanRequest;
import com.example.library_backend.entity.Book;
import com.example.library_backend.entity.Loan;
import com.example.library_backend.entity.Member;
import com.example.library_backend.exception.BadRequestException;
import com.example.library_backend.exception.ResourceNotFoundException;
import com.example.library_backend.repository.BookRepository;
import com.example.library_backend.repository.LoanRepository;
import com.example.library_backend.repository.MemberRepository;
import com.example.library_backend.service.LoanService;

@Service
public class LoanServiceImpl implements LoanService {

	private final BookRepository bookRepository;
	private final MemberRepository memberRepository;
	private final LoanRepository loanRepository;

	public LoanServiceImpl(BookRepository bookRepository, MemberRepository memberRepository,
			LoanRepository loanRepository) {
		this.bookRepository = bookRepository;
		this.memberRepository = memberRepository;
		this.loanRepository = loanRepository;
	}

	@Override
	public Loan issueBook(LoanRequest req) {

		Book book = bookRepository.findById(req.getBookId())
				.orElseThrow(() -> new ResourceNotFoundException("Book not found"));

		if (book.getAvailableCopies() <= 0) {
			throw new BadRequestException("No available copies for this book");
		}

		Member member = memberRepository.findById(req.getMemberId())
				.orElseThrow(() -> new ResourceNotFoundException("Member not found"));

		// Create loan object
		Loan loan = new Loan();
		loan.setBook(book);
		loan.setMember(member);
		loan.setIssueDate(LocalDate.now());
		loan.setDueDate(req.getDueDate());
		loan.setStatus("ISSUED");

		// Update book availability
		book.setAvailableCopies(book.getAvailableCopies() - 1);
		bookRepository.save(book);

		return loanRepository.save(loan);
	}

	@Override
	public List<Loan> getAllLoans() {
		return loanRepository.findAll();
	}
}
