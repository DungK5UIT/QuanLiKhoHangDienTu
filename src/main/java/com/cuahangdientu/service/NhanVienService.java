package com.cuahangdientu.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuahangdientu.model.NhanVien;
import com.cuahangdientu.reposistory.NhanVienRepository;

import jakarta.transaction.Transactional;

@Service
public class NhanVienService {

    @Autowired
    private NhanVienRepository nhanVienRepository;

    // Lấy tất cả nhân viên
    public List<NhanVien> getAllNhanVien() {
        return nhanVienRepository.findAll();
    }

    // Lưu nhân viên mới vào database
    @Transactional
    public NhanVien saveNhanVien(NhanVien nhanVien) {
        return nhanVienRepository.save(nhanVien);
    }

    // Lấy nhân viên theo ID
    public NhanVien getNhanVienById(int manv) {
        Optional<NhanVien> nhanVien = nhanVienRepository.findById(manv);
        return nhanVien.orElse(null);
    }

    // Kiểm tra nhân viên có tồn tại không
    public boolean existsById(int manv) {
        return nhanVienRepository.existsById(manv);
    }

    // Xóa nhân viên
    public void deleteNhanVien(int manv) {
        nhanVienRepository.deleteById(manv);
    }

    // Cập nhật nhân viên
    @Transactional
    public boolean updateNhanVien(int manv, NhanVien updatedNhanVien) {
        Optional<NhanVien> existingNhanVienOptional = nhanVienRepository.findById(manv);
        if (existingNhanVienOptional.isPresent()) {
            NhanVien existingNhanVien = existingNhanVienOptional.get();

            // Cập nhật thông tin nhân viên
            existingNhanVien.setHoten(updatedNhanVien.getHoten());
            existingNhanVien.setGioitinh(updatedNhanVien.getGioitinh());
            existingNhanVien.setNgaysinh(updatedNhanVien.getNgaysinh());
            existingNhanVien.setSdt(updatedNhanVien.getSdt());
            existingNhanVien.setEmail(updatedNhanVien.getEmail());

            // Lưu thông tin đã cập nhật
            nhanVienRepository.save(existingNhanVien);
            return true;
        } else {
            return false; // Không tìm thấy nhân viên
        }
    }
}
