package com.example.library_backend.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.library_backend.dto.MemberRequest;
import com.example.library_backend.entity.Member;
import com.example.library_backend.exception.DuplicateEmailException;
import com.example.library_backend.exception.ResourceNotFoundException;
import com.example.library_backend.repository.MemberRepository;
import com.example.library_backend.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;

	public MemberServiceImpl(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}

	@Override
	public Member createMember(MemberRequest req) {

		memberRepository.findByEmail(req.getEmail()).ifPresent(m -> {
			throw new DuplicateEmailException("Email already exists: " + req.getEmail());
		});

		Member member = new Member();
		member.setName(req.getName());
		member.setEmail(req.getEmail());
		member.setPhone(req.getPhone());
		member.setMembershipDate(LocalDate.now());

		return memberRepository.save(member);
	}

	@Override
	public List<Member> getAllMembers() {
		return memberRepository.findAll();
	}

	@Override
	public Member getMemberById(Long id) {
		return memberRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Member not found: " + id));
	}

	@Override
	public Member updateMember(Long id, MemberRequest req) {
		Member existing = getMemberById(id);

		// Email changed → check duplicate
		if (!existing.getEmail().equals(req.getEmail())) {
			memberRepository.findByEmail(req.getEmail()).ifPresent(m -> {
				throw new DuplicateEmailException("Email already exists: " + req.getEmail());
			});
		}

		existing.setName(req.getName());
		existing.setEmail(req.getEmail());
		existing.setPhone(req.getPhone());

		return memberRepository.save(existing);
	}

	@Override
	public void deleteMember(Long id) {
		Member existing = getMemberById(id);

		// later: check if member has issued books → then block deletion

		memberRepository.delete(existing);
	}
}
