package com.cuahangdientu.reposistory;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cuahangdientu.model.SanPham;

public interface SanPhamRepository extends JpaRepository<SanPham, Integer> {
}
