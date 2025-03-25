package com.cuahangdientu.reposistory;

import com.cuahangdientu.model.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Integer> {
    TaiKhoan findByTendangnhapAndMatkhau(String tendangnhap, String matkhau);
}