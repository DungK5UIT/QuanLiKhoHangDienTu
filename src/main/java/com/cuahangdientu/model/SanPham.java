package com.cuahangdientu.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "sanpham")
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int masp;
    
    private String tensp;
    private String loaisp;
    private int soluongton;
    private String thuonghieu;
    private float congsuat;
    private int baohanh;
    private String xuatxu;
    private String khuvuckho;
    private String kichthuoc;
    private float trongluong;
    private String chatlieu;
    private int doon;
    private String mausac;
    private float gianhap;
    public int getMasp() {
		return masp;
	}
	public void setMasp(int masp) {
		this.masp = masp;
	}
	public String getTensp() {
		return tensp;
	}
	public void setTensp(String tensp) {
		this.tensp = tensp;
	}
	public String getLoaisp() {
		return loaisp;
	}
	public void setLoaisp(String loaisp) {
		this.loaisp = loaisp;
	}
	public int getSoluongton() {
		return soluongton;
	}
	public void setSoluongton(int soluongton) {
		this.soluongton = soluongton;
	}
	public String getThuonghieu() {
		return thuonghieu;
	}
	public void setThuonghieu(String thuonghieu) {
		this.thuonghieu = thuonghieu;
	}
	public float getCongsuat() {
		return congsuat;
	}
	public void setCongsuat(float congsuat) {
		this.congsuat = congsuat;
	}
	public int getBaohanh() {
		return baohanh;
	}
	public void setBaohanh(int baohanh) {
		this.baohanh = baohanh;
	}
	public String getXuatxu() {
		return xuatxu;
	}
	public void setXuatxu(String xuatxu) {
		this.xuatxu = xuatxu;
	}
	public String getKhuvuckho() {
		return khuvuckho;
	}
	public void setKhuvuckho(String khuvuckho) {
		this.khuvuckho = khuvuckho;
	}
	public String getKichthuoc() {
		return kichthuoc;
	}
	public void setKichthuoc(String kichthuoc) {
		this.kichthuoc = kichthuoc;
	}
	public float getTrongluong() {
		return trongluong;
	}
	public void setTrongluong(float trongluong) {
		this.trongluong = trongluong;
	}
	public String getChatlieu() {
		return chatlieu;
	}
	public void setChatlieu(String chatlieu) {
		this.chatlieu = chatlieu;
	}
	public int getDoon() {
		return doon;
	}
	public void setDoon(int doon) {
		this.doon = doon;
	}
	public String getMausac() {
		return mausac;
	}
	public void setMausac(String mausac) {
		this.mausac = mausac;
	}
	public float getGianhap() {
		return gianhap;
	}
	public void setGianhap(float gianhap) {
		this.gianhap = gianhap;
	}
	public float getGiaxuat() {
		return giaxuat;
	}
	public void setGiaxuat(float giaxuat) {
		this.giaxuat = giaxuat;
	}
	public String getCongnghe() {
		return congnghe;
	}
	public void setCongnghe(String congnghe) {
		this.congnghe = congnghe;
	}
	private float giaxuat;
    private String congnghe;
}
