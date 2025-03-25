package com.cuahangdientu.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuahangdientu.model.NhaCungCap;
import com.cuahangdientu.reposistory.NhaCungCapReposistory;

import jakarta.transaction.Transactional;

@Service

public class NhaCungCapService {
	
	@Autowired
	private NhaCungCapReposistory nhaCungCapreposistory;
	
	 public List<NhaCungCap> getAllNhaCungCap() {
	        return nhaCungCapreposistory.findAll(); 
	    }
	 
	// Lưu nhà cung cấp mới vào database
	    @Transactional
	    public NhaCungCap saveNhaCungCap(NhaCungCap nhaCungCap) {
	        return nhaCungCapreposistory.save(nhaCungCap);
	    }

	    public NhaCungCap getNhaCungCapById(int mancc) {
	        Optional<NhaCungCap> NhaCungCap = nhaCungCapreposistory.findById(mancc);
	        return NhaCungCap.orElse(null);
	    }
	    public boolean existsById(int mancc) {
	        return nhaCungCapreposistory.existsById(mancc);
	    }
	    
	    public void deleteNhaCungCap(int mancc) {
	    	nhaCungCapreposistory.deleteById(mancc);
	    }
	    
	    @Transactional
	    public boolean updateNhaCungCap(int mancc, NhaCungCap updatedNhaCungCap) {
	        Optional<NhaCungCap> existingNhaCungCapOptional = nhaCungCapreposistory.findById(mancc);
	        if (existingNhaCungCapOptional.isPresent()) {
	            NhaCungCap existingNhaCungCap = existingNhaCungCapOptional.get();

	            // Cập nhật thông tin nhà cung cấp
	            existingNhaCungCap.setTenncc(updatedNhaCungCap.getTenncc());
	            existingNhaCungCap.setDiachi(updatedNhaCungCap.getDiachi());
	            existingNhaCungCap.setEmail(updatedNhaCungCap.getEmail());
	            existingNhaCungCap.setSdt(updatedNhaCungCap.getSdt());

	            // Lưu thông tin đã cập nhật
	            nhaCungCapreposistory.save(existingNhaCungCap);
	            return true;
	        } else {
	            return false; // Không tìm thấy nhà cung cấp
	        }
	    }

	    
}
