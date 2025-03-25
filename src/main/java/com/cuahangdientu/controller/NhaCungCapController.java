package com.cuahangdientu.controller;

import com.cuahangdientu.model.NhaCungCap;
import com.cuahangdientu.service.NhaCungCapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nhacungcap")
@CrossOrigin(origins = "*") // Cho phép truy cập từ front-end
public class NhaCungCapController {
    @Autowired
    private NhaCungCapService nhaCCservice;

    @GetMapping
    public List<NhaCungCap> getAll() {
        return nhaCCservice.getAllNhaCungCap();
    }
    
    // Thêm nhà cung cấp mới
    @PostMapping("/them")
    public ResponseEntity<NhaCungCap> themNhaCungCap(@RequestBody NhaCungCap nhaCungCap) {
        NhaCungCap nhaCungCapMoi = nhaCCservice.saveNhaCungCap(nhaCungCap);
        return ResponseEntity.status(HttpStatus.CREATED).body(nhaCungCapMoi);
    }
    
    @DeleteMapping("/xoa/{mancc}")
    public ResponseEntity<String> xoaSanPham(@PathVariable int mancc) {
        if (!nhaCCservice.existsById(mancc)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nhà cung cấp không tồn tại!");
        }
        nhaCCservice.deleteNhaCungCap(mancc);
        return ResponseEntity.ok("Xóa thành công!");
    }
 // Cập nhật thông tin nhà cung cấp
    @PutMapping("/sua/{mancc}")
    public ResponseEntity<String> suaNhaCungCap(@PathVariable int mancc, @RequestBody NhaCungCap updatedNhaCungCap) {
        boolean result = nhaCCservice.updateNhaCungCap(mancc, updatedNhaCungCap);
        if (result) {
            return ResponseEntity.ok("Cập nhật nhà cung cấp thành công!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy nhà cung cấp!");
        }
    }
    
 // Lấy chi tiết nhà cung cấp theo mã nhà cung cấp
    @GetMapping("/chitiet/{mancc}")
    public ResponseEntity<NhaCungCap> getNhaCungCapById(@PathVariable int mancc) {
        NhaCungCap nhaCungCap = nhaCCservice.getNhaCungCapById(mancc); // Sử dụng service để lấy thông tin nhà cung cấp
        if (nhaCungCap != null) {
            return ResponseEntity.ok(nhaCungCap); // Trả về thông tin nhà cung cấp nếu tìm thấy
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Trả về 404 nếu không tìm thấy
        }
    }

}
