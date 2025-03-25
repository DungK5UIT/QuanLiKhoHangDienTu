package com.cuahangdientu.controller;

import com.cuahangdientu.model.TaiKhoan;
import com.cuahangdientu.reposistory.TaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class TaiKhoanController {

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @PostMapping("/login")
    public String login(@RequestParam String tendangnhap, @RequestParam String matkhau) {
    	  	System.out.println("Tên đăng nhập: " + tendangnhap);
    	    System.out.println("Mật khẩu: " + matkhau);
        TaiKhoan taiKhoan = taiKhoanRepository.findByTendangnhapAndMatkhau(tendangnhap, matkhau);
        if (taiKhoan != null) {
            return "Đăng nhập thành công!";
        } else {
            return "Sai tên đăng nhập hoặc mật khẩu!";
        }
    }
}