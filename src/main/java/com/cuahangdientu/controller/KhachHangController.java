package com.cuahangdientu.controller;

import com.cuahangdientu.model.KhachHang;
import com.cuahangdientu.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/khachhang")
@CrossOrigin(origins = "*") // Cho phép truy cập từ front-end
public class KhachHangController {

    @Autowired
    private KhachHangService khachHangService;

    // Lấy danh sách tất cả khách hàng
    @GetMapping
    public List<KhachHang> getAllKhachHang() {
        return khachHangService.getAllKhachHang();
    }

    // Thêm khách hàng mới
    @PostMapping("/them")
    public ResponseEntity<KhachHang> themKhachHang(@RequestBody KhachHang khachHang) {
        KhachHang khachHangMoi = khachHangService.saveKhachHang(khachHang);
        return ResponseEntity.status(HttpStatus.CREATED).body(khachHangMoi);
    }

    // Xóa khách hàng theo ID
    @DeleteMapping("/xoa/{makh}")
    public ResponseEntity<String> xoaKhachHang(@PathVariable int makh) {
        if (!khachHangService.existsById(makh)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Khách hàng không tồn tại!");
        }
        khachHangService.deleteKhachHang(makh);
        return ResponseEntity.ok("Xóa khách hàng thành công!");
    }

    // Cập nhật thông tin khách hàng
    @PutMapping("/sua/{makh}")
    public ResponseEntity<String> suaKhachHang(@PathVariable int makh, @RequestBody KhachHang updatedKhachHang) {
        boolean result = khachHangService.updateKhachHang(makh, updatedKhachHang);
        if (result) {
            return ResponseEntity.ok("Cập nhật khách hàng thành công!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy khách hàng!");
        }
    }

    // Lấy chi tiết khách hàng theo mã khách hàng
    @GetMapping("/chitiet/{makh}")
    public ResponseEntity<KhachHang> getKhachHangById(@PathVariable int makh) {
        KhachHang khachHang = khachHangService.getKhachHangById(makh);
        if (khachHang != null) {
            return ResponseEntity.ok(khachHang);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
