package com.cuahangdientu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cuahangdientu.model.SanPham;
import com.cuahangdientu.reposistory.SanPhamRepository;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SanPhamService {
    @Autowired
    private SanPhamRepository sanPhamRepository;

    public List<SanPham> getAllSanPham() {
        return sanPhamRepository.findAll();
    }

   
    public SanPham getSanPhamById(int masp) {
        Optional<SanPham> sanPham = sanPhamRepository.findById(masp);
        return sanPham.orElse(null);
    }
    
    public boolean existsById(int masp) {
        return sanPhamRepository.existsById(masp);
    }

    public void deleteSanPham(int masp) {
        sanPhamRepository.deleteById(masp);
    }
    
    @Transactional
    public SanPham saveSanPham(SanPham sanPham) {
        return sanPhamRepository.save(sanPham);
    }
    @Transactional
    public boolean updateSanPham(int masp, SanPham updatedSanPham) {
        Optional<SanPham> existingSanPhamOptional = sanPhamRepository.findById(masp);
        if (existingSanPhamOptional.isPresent()) {
            SanPham existingSanPham = existingSanPhamOptional.get();

            // Cập nhật thông tin sản phẩm
            existingSanPham.setLoaisp(updatedSanPham.getTensp());
            existingSanPham.setLoaisp(updatedSanPham.getLoaisp());
            existingSanPham.setSoluongton(updatedSanPham.getSoluongton());
            existingSanPham.setThuonghieu(updatedSanPham.getThuonghieu());
            existingSanPham.setCongsuat(updatedSanPham.getCongsuat());
            existingSanPham.setBaohanh(updatedSanPham.getBaohanh());
            existingSanPham.setXuatxu(updatedSanPham.getXuatxu());
            existingSanPham.setKhuvuckho(updatedSanPham.getKhuvuckho());
            existingSanPham.setKichthuoc(updatedSanPham.getKichthuoc());
            existingSanPham.setTrongluong(updatedSanPham.getTrongluong());
            existingSanPham.setChatlieu(updatedSanPham.getChatlieu());
            existingSanPham.setDoon(updatedSanPham.getDoon());
            existingSanPham.setMausac(updatedSanPham.getMausac());
            existingSanPham.setGianhap(updatedSanPham.getGianhap());
            existingSanPham.setGiaxuat(updatedSanPham.getGiaxuat());
            existingSanPham.setCongnghe(updatedSanPham.getCongnghe());

            // Lưu thông tin đã cập nhật
            sanPhamRepository.save(existingSanPham);
            return true;
        } else {
            return false; // Không tìm thấy sản phẩm
        }
    }
    
}

