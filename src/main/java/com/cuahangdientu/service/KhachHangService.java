package com.cuahangdientu.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuahangdientu.model.KhachHang;
import com.cuahangdientu.reposistory.KhachHangRepository;

import jakarta.transaction.Transactional;

@Service
public class KhachHangService {

    @Autowired
    private KhachHangRepository khachHangRepository;

    // Lấy tất cả khách hàng
    public List<KhachHang> getAllKhachHang() {
        return khachHangRepository.findAll();
    }

    // Lưu khách hàng mới vào database
    @Transactional
    public KhachHang saveKhachHang(KhachHang khachHang) {
        return khachHangRepository.save(khachHang);
    }

    // Lấy khách hàng theo ID
    public KhachHang getKhachHangById(int makh) {
        Optional<KhachHang> khachHang = khachHangRepository.findById(makh);
        return khachHang.orElse(null);
    }

    // Kiểm tra khách hàng có tồn tại không
    public boolean existsById(int makh) {
        return khachHangRepository.existsById(makh);
    }

    // Xóa khách hàng
    public void deleteKhachHang(int makh) {
        khachHangRepository.deleteById(makh);
    }

    // Cập nhật thông tin khách hàng
    @Transactional
    public boolean updateKhachHang(int makh, KhachHang updatedKhachHang) {
        Optional<KhachHang> existingKhachHangOptional = khachHangRepository.findById(makh);
        if (existingKhachHangOptional.isPresent()) {
            KhachHang existingKhachHang = existingKhachHangOptional.get();

            // Cập nhật thông tin khách hàng
            existingKhachHang.setTenkhachhang(updatedKhachHang.getTenkhachhang());
            existingKhachHang.setDiachi(updatedKhachHang.getDiachi());
            existingKhachHang.setSdt(updatedKhachHang.getSdt());

            // Lưu thông tin đã cập nhật
            khachHangRepository.save(existingKhachHang);
            return true;
        } else {
            return false; // Không tìm thấy khách hàng
        }
    }
}
