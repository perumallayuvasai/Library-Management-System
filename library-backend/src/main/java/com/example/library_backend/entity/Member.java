package com.example.library_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "members", uniqueConstraints = { @UniqueConstraint(columnNames = { "email" }) })
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	@Column(unique = true)
	private String email;

	private String phone;

	private LocalDate membershipDate;

	public Member() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public LocalDate getMembershipDate() {
		return membershipDate;
	}

	public void setMembershipDate(LocalDate membershipDate) {
		this.membershipDate = membershipDate;
	}

}
