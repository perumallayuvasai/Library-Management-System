package com.example.library_backend.service;

import java.util.List;

import com.example.library_backend.dto.MemberRequest;
import com.example.library_backend.entity.Member;

public interface MemberService {
	Member createMember(MemberRequest request);

	List<Member> getAllMembers();

	Member updateMember(Long id, MemberRequest request);

	void deleteMember(Long id);

	Member getMemberById(Long id);
}
