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

import com.example.library_backend.dto.MemberRequest;
import com.example.library_backend.entity.Member;
import com.example.library_backend.service.MemberService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:5173")
public class MemberController {

	private final MemberService memberService;

	public MemberController(MemberService memberService) {
		this.memberService = memberService;
	}

	@GetMapping
	public List<Member> all() {
		return memberService.getAllMembers();
	}

	@GetMapping("/{id}")
	public Member get(@PathVariable Long id) {
		return memberService.getMemberById(id);
	}

	@PostMapping
	public ResponseEntity<Member> create(@Valid @RequestBody MemberRequest req) {
		Member saved = memberService.createMember(req);
		return ResponseEntity.status(201).body(saved);
	}

	@PutMapping("/{id}")
	public Member update(@PathVariable Long id, @Valid @RequestBody MemberRequest req) {
		return memberService.updateMember(id, req);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		memberService.deleteMember(id);
		return ResponseEntity.noContent().build();
	}
}
