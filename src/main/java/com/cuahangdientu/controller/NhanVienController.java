package com.cuahangdientu.controller;

import com.cuahangdientu.model.NhanVien;
import com.cuahangdientu.service.NhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nhanvien")
@CrossOrigin(origins = "*") // Cho phép truy cập từ front-end
public class NhanVienController {
    @Autowired
    private NhanVienService nhanVienService;

    // Lấy danh sách tất cả nhân viên
    @GetMapping
    public List<NhanVien> getAllNhanVien() {
        return nhanVienService.getAllNhanVien();
    }

    // Thêm nhân viên mới
    @PostMapping("/them")
    public ResponseEntity<NhanVien> themNhanVien(@RequestBody NhanVien nhanVien) {
        NhanVien nhanVienMoi = nhanVienService.saveNhanVien(nhanVien);
        return ResponseEntity.status(HttpStatus.CREATED).body(nhanVienMoi);
    }

    // Xóa nhân viên theo ID
    @DeleteMapping("/xoa/{manv}")
    public ResponseEntity<String> xoaNhanVien(@PathVariable int manv) {
        if (!nhanVienService.existsById(manv)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nhân viên không tồn tại!");
        }
        nhanVienService.deleteNhanVien(manv);
        return ResponseEntity.ok("Xóa nhân viên thành công!");
    }

    // Cập nhật thông tin nhân viên
    @PutMapping("/sua/{manv}")
    public ResponseEntity<String> suaNhanVien(@PathVariable int manv, @RequestBody NhanVien updatedNhanVien) {
        boolean result = nhanVienService.updateNhanVien(manv, updatedNhanVien);
        if (result) {
            return ResponseEntity.ok("Cập nhật nhân viên thành công!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy nhân viên!");
        }
    }

    // Lấy chi tiết nhân viên theo mã nhân viên
    @GetMapping("/chitiet/{manv}")
    public ResponseEntity<NhanVien> getNhanVienById(@PathVariable int manv) {
        NhanVien nhanVien = nhanVienService.getNhanVienById(manv);
        if (nhanVien != null) {
            return ResponseEntity.ok(nhanVien);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
