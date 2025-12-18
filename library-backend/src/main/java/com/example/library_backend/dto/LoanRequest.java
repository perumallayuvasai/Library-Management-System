package com.example.library_backend.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class LoanRequest {

	@NotNull
	private Long bookId;

	@NotNull
	private Long memberId;

	@NotNull
	private LocalDate dueDate;

	public LoanRequest() {
		super();
	}

	public Long getBookId() {
		return bookId;
	}

	public void setBookId(Long bookId) {
		this.bookId = bookId;
	}

	public Long getMemberId() {
		return memberId;
	}

	public void setMemberId(Long memberId) {
		this.memberId = memberId;
	}

	public LocalDate getDueDate() {
		return dueDate;
	}

	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}

}
