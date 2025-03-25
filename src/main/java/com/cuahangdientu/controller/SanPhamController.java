package com.cuahangdientu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.cuahangdientu.model.SanPham;
import com.cuahangdientu.service.SanPhamService;

@CrossOrigin("*") // Cho phép Front-end truy cập API
@RestController
@RequestMapping("/api/sanpham")
public class SanPhamController {

    @Autowired
    private SanPhamService sanPhamService;

    // Lấy danh sách tất cả sản phẩm
    @GetMapping
    public ResponseEntity<List<SanPham>> getSanPham() {
        List<SanPham> danhSachSanPham = sanPhamService.getAllSanPham();
        return ResponseEntity.ok(danhSachSanPham);
    }

    // Thêm sản phẩm mới
    @PostMapping("/them")
    public ResponseEntity<SanPham> themSanPham(@RequestBody SanPham sanPham) {
        SanPham sanPhamMoi = sanPhamService.saveSanPham(sanPham);
        return ResponseEntity.status(HttpStatus.CREATED).body(sanPhamMoi);
    }

    // Lấy chi tiết sản phẩm theo mã sản phẩm
    @GetMapping("/chitiet/{masp}")
    public ResponseEntity<SanPham> getSanPhamById(@PathVariable int masp) {
        SanPham sanPham = sanPhamService.getSanPhamById(masp);
        if (sanPham != null) {
            return ResponseEntity.ok(sanPham);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Xóa sản phẩm theo mã sản phẩm
    @DeleteMapping("/xoa/{masp}")
    public ResponseEntity<String> xoaSanPham(@PathVariable int masp) {
        if (!sanPhamService.existsById(masp)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sản phẩm không tồn tại!");
        }
        sanPhamService.deleteSanPham(masp);
        return ResponseEntity.ok("Xóa sản phẩm thành công!");
    }

    // Cập nhật thông tin sản phẩm
    @PutMapping("/sua/{masp}")
    public ResponseEntity<String> suaSanPham(@PathVariable int masp, @RequestBody SanPham updatedSanPham) {
        boolean result = sanPhamService.updateSanPham(masp, updatedSanPham);
        if (result) {
            return ResponseEntity.ok("Cập nhật sản phẩm thành công!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy sản phẩm!");
        }
    }
}