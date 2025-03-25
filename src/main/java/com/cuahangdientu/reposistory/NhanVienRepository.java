package com.cuahangdientu.reposistory;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cuahangdientu.model.NhanVien;

public interface NhanVienRepository extends JpaRepository<NhanVien, Integer> {
}
