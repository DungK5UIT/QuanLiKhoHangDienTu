package com.cuahangdientu.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="nhanvien")
public class NhanVien {
		
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int manv;
		private String hoten;
		private String gioitinh;
		
		 @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
		    private LocalDate ngaysinh;
	
		public LocalDate getNgaysinh() {
			return ngaysinh;
		}
		public void setNgaysinh(LocalDate ngaysinh) {
			this.ngaysinh = ngaysinh;
		}
		private String sdt;
		public int getManv() {
			return manv;
		}
		public void setManv(int manv) {
			this.manv = manv;
		}
		public String getHoten() {
			return hoten;
		}
		public void setHoten(String hoten) {
			this.hoten = hoten;
		}
		public String getGioitinh() {
			return gioitinh;
		}
		public void setGioitinh(String gioitinh) {
			this.gioitinh = gioitinh;
		}
		public String getSdt() {
			return sdt;
		}
		public void setSdt(String sdt) {
			this.sdt = sdt;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		private String email;
}
