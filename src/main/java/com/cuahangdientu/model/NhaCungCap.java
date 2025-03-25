package com.cuahangdientu.model;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name="nhacungcap")
public class NhaCungCap {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int mancc;
	
	private String tenncc;
	private String diachi;
	private String email;
	private String sdt;
	public int getMancc() {
		return mancc;
	}
	public void setMancc(int mancc) {
		this.mancc = mancc;
	}

	public String getTenncc() {
		return tenncc;
	}
	public void setTenncc(String tenncc) {
		this.tenncc = tenncc;
	}
	public String getDiachi() {
		return diachi;
	}
	public void setDiachi(String diachi) {
		this.diachi = diachi;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSdt() {
		return sdt;
	}
	public void setSdt(String sdt) {
		this.sdt = sdt;
	}
	
}
