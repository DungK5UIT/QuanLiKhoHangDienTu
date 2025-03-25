document.addEventListener("DOMContentLoaded", function () {
    // Các phần tử DOM chính
    const tableBody = document.querySelector("#nhanvien-list tbody");
    const searchInput = document.querySelector(".search-input");
    const refreshButton = document.querySelector(".refresh-button");
    const deleteButton = document.querySelector(".xoa");
    const editButton = document.querySelector(".sua");
    const addButton = document.querySelector(".them");
    const detailButton = document.querySelector(".chitiet");
    
    // Các phần tử cho modal thêm mới
    const themModalToggle = document.getElementById('them-modal-toggle');
    const themLuuButton = document.getElementById('them-luu');
    const themHuyButton = document.getElementById('them-huy');
    const themForm = document.getElementById('them-nhanvien-form');
    
    // Các phần tử cho modal sửa
    const editModalCheckbox = document.getElementById("sua-modal-toggle");
    const editForm = document.getElementById("sua-nhanvien-form");
    const editLuuButton = document.getElementById("sua-luu");
    const editHuyButton = document.getElementById("sua-huy");

    // Các phần tử cho modal chi tiết
    const detailModalCheckbox = document.getElementById("chitiet-modal-toggle");
    const detailContainer = document.getElementById("chitiet-container");
    const detailHuyButton = document.getElementById("chitiet-huy");
    
    // Biến lưu trữ dữ liệu
    let selectedEmployeeId = null;
    let allEmployees = [];
    
    // Thêm CSS cho hàng được chọn
    const style = document.createElement('style');
    document.head.appendChild(style);

    // ===== CHỨC NĂNG HIỂN THỊ VÀ CHỌN HÀNG =====
    
    // Hàm highlight hàng được chọn và lưu ID nhân viên
    function selectRow(row, manv) {
        // Bỏ highlight tất cả các hàng khác
        tableBody.querySelectorAll("tr").forEach(r => r.classList.remove("selected-row"));
        
        // Highlight hàng được chọn
        row.classList.add("selected-row");
        selectedEmployeeId = manv;
        console.log("Đã chọn nhân viên ID:", manv);
    }
    
    // Sự kiện click vào hàng trong bảng
    tableBody.addEventListener("click", function (event) {
        const row = event.target.closest("tr");
        if (row) {
            const manv = row.querySelector("td").innerText;
            selectRow(row, manv);
        }
    });
    
    // Hàm hiển thị thông báo khi chưa chọn nhân viên
    function showAlert() {
        alert("Vui lòng chọn nhân viên!");
        location.reload();
    }
    
    // Hàm tải danh sách nhân viên
    function loadNhanVien() {
        fetch("http://localhost:8080/api/nhanvien")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Không thể tải dữ liệu");
                }
                return response.json();
            })
            .then(data => {
                allEmployees = data; // Lưu lại toàn bộ danh sách
                renderTable(data);
                console.log("Đã tải danh sách nhân viên:", data.length, "bản ghi");
            })
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu:', error);
                tableBody.innerHTML = '<tr><td colspan="6">Không thể tải dữ liệu. Vui lòng thử lại sau.</td></tr>';
            });
    }
    
    // Hàm hiển thị danh sách nhân viên trong bảng
    function renderTable(data) {
        tableBody.innerHTML = ''; // Xóa nội dung cũ
        data.forEach(nv => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${nv.manv}</td>
                <td>${nv.hoten}</td>
                <td>${nv.gioitinh}</td>
                <td>${nv.ngaysinh}</td>
                <td>${nv.sdt}</td>
                <td>${nv.email}</td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    // ===== CHỨC NĂNG TÌM KIẾM =====
    
    // Hàm tìm kiếm nhân viên
    function searchEmployees(keyword) {
        const filteredEmployees = allEmployees.filter(employee => {
            return (
                (employee.hoten && employee.hoten.toLowerCase().includes(keyword.toLowerCase())) ||
                (employee.gioitinh && employee.gioitinh.toLowerCase().includes(keyword.toLowerCase())) ||
                (employee.ngaysinh && employee.ngaysinh.toLowerCase().includes(keyword.toLowerCase())) ||
                (employee.sdt && employee.sdt.toLowerCase().includes(keyword.toLowerCase())) ||
                (employee.email && employee.email.toLowerCase().includes(keyword.toLowerCase()))
            );
        });
        renderTable(filteredEmployees);
    }
    
    // Sự kiện khi người dùng nhập nội dung tìm kiếm
    if (searchInput) {
        searchInput.addEventListener("input", function (event) {
            const keyword = event.target.value.trim();
            if (keyword) {
                searchEmployees(keyword);
            } else {
                renderTable(allEmployees);
            }
        });
    }
    
    // Sự kiện khi nhấn nút làm mới
    if (refreshButton) {
        refreshButton.addEventListener("click", function () {
            location.reload();
        });
    }
    
    // ===== CHỨC NĂNG THÊM NHÂN VIÊN =====
    
    // Hàm kiểm tra dữ liệu form thêm
    function kiemTraDuLieu(form) {
        const hoTen = form.querySelector('[id$="hoten"]').value.trim();
        const gioiTinh = form.querySelector('[id$="gioitinh"]').value.trim();
        const ngaySinh = form.querySelector('[id$="ngaysinh"]').value.trim();
        const sdt = form.querySelector('[id$="sdt"]').value.trim();
        const email = form.querySelector('[id$="email"]').value.trim();
    
        if (!hoTen || !gioiTinh || !ngaySinh || !sdt || !email) {
            alert("Vui lòng nhập đủ thông tin!");
            return false;
        }
        return true;
    }

   // ====== SỰ KIỆN KHI NHẤN NÚT THÊM - LƯU ======
if (themLuuButton) {
    themLuuButton.addEventListener('click', function (e) {
        e.preventDefault();

        if (!kiemTraDuLieu(themForm)) return;

        const hoTen = document.getElementById('them-hoten').value;
        const gioiTinh = document.getElementById('them-gioitinh').value;
        const ngaySinh = document.getElementById('them-ngaysinh').value;
        const sdt = document.getElementById('them-sdt').value;
        const email = document.getElementById('them-email').value;

        const nhanVien = {
            hoten: hoTen,
            gioitinh: gioiTinh,
            ngaysinh: ngaySinh,
            sdt: sdt,
            email: email
        };
        
        console.log("Dữ liệu gửi lên server:", JSON.stringify(nhanVien));
        
        fetch("http://localhost:8080/api/nhanvien/them", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nhanVien)
        })
        .then(response => {
            console.log("Response status:", response.status);
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            alert('Nhân viên đã được thêm thành công!');
            loadNhanVien();
            themModalToggle.checked = false;
            themForm.reset();
        })
        .catch(error => {
            console.error('Lỗi từ server:', error);
            alert('Có lỗi xảy ra khi thêm nhân viên. Kiểm tra console để biết chi tiết.');
        });
        
    });
}
    
    // Sự kiện khi nhấn nút Thêm - Hủy
    if (themHuyButton) {
        themHuyButton.addEventListener('click', function (e) {
            e.preventDefault();
            themModalToggle.checked = false;
            themForm.reset();
        });
    }
    
    // ===== CHỨC NĂNG SỬA NHÂN VIÊN =====
    
    // Sự kiện khi nhấn nút Sửa
    if (editButton) {
        editButton.addEventListener("click", function () {
            if (!selectedEmployeeId) {
                showAlert();
                return;
            }

            fetch(`http://localhost:8080/api/nhanvien/chitiet/${selectedEmployeeId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Không thể lấy thông tin nhân viên");
                    }
                    return response.json();
                })
                .then(data => {
                    document.getElementById("sua-hoten").value = data.hoten || "";
                    document.getElementById("sua-gioitinh").value = data.gioitinh || "";
                    document.getElementById("sua-ngaysinh").value = data.ngaysinh || "";
                    document.getElementById("sua-sdt").value = data.sdt || "";
                    document.getElementById("sua-email").value = data.email || "";
                    document.getElementById("sua-nhanvien-id").value = selectedEmployeeId;
                    editModalCheckbox.checked = true;
                })
                .catch(error => {
                    console.error("Lỗi khi lấy thông tin nhân viên:", error);
                    alert("Không thể lấy thông tin nhân viên. Vui lòng thử lại sau.");
                });
        });
    }
    
    // Sự kiện khi nhấn nút Sửa - Lưu
    if (editLuuButton) {
        editLuuButton.addEventListener("click", function (event) {
            event.preventDefault();
            
            if (!kiemTraDuLieu(editForm)) {
                return;
            }

            const updatedEmployee = {
                hoten: document.getElementById("sua-hoten").value,
                gioitinh: document.getElementById("sua-gioitinh").value,
                ngaysinh: document.getElementById("sua-ngaysinh").value,
                sdt: document.getElementById("sua-sdt").value,
                email: document.getElementById("sua-email").value
            };

            fetch(`http://localhost:8080/api/nhanvien/sua/${selectedEmployeeId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedEmployee)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Không thể cập nhật nhân viên");
                }
                return response.text();
            })
            .then(() => {
                alert("Cập nhật nhân viên thành công!");
                editModalCheckbox.checked = false;
                loadNhanVien();
                location.reload();
            })
            .catch(error => {
                console.error("Lỗi khi cập nhật nhân viên:", error);
                alert("Không thể cập nhật nhân viên. Vui lòng thử lại sau.");
            });
        });
    }
    
    // Sự kiện khi nhấn nút Sửa - Hủy
    if (editHuyButton) {
        editHuyButton.addEventListener("click", function (e) {
            e.preventDefault();
            editModalCheckbox.checked = false;
        });
    }
    
    // ===== CHỨC NĂNG XÓA NHÂN VIÊN =====
    
    // Hàm xóa nhân viên
    function deleteNhanVien(manv) {
        if (!manv) {
            showAlert();
            return;
        }

        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa nhân viên này?");
        if (!confirmDelete) {
            return;
        }

        fetch(`http://localhost:8080/api/nhanvien/xoa/${manv}`, {
            method: "DELETE"
        })
        .then(response => {
            console.log("HTTP Status:", response.status);
            return response.text();
        })
        .then(data => {
            console.log("API Response:", data);
            alert(data);
            loadNhanVien();
            selectedEmployeeId = null;
        })
        .catch(error => {
            console.error("Lỗi khi xóa nhân viên:", error);
            alert("Không thể xóa nhân viên. Kiểm tra console để biết thêm chi tiết.");
        });
    }
    
    // Sự kiện khi nhấn nút Xóa
    if (deleteButton) {
        deleteButton.addEventListener("click", function () {
            deleteNhanVien(selectedEmployeeId);
        });
    }

    // ===== CHỨC NĂNG XEM CHI TIẾT =====
    if (detailButton) {
        detailButton.addEventListener("click", function () {
            if (!selectedEmployeeId) {
                showAlert();
                return;
            }
            fetch(`http://localhost:8080/api/nhanvien/chitiet/${selectedEmployeeId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Không thể lấy thông tin nhân viên");
                    }
                    return response.json();
                })
                .then(data => {
                    document.getElementById("chitiet-hoten").value = data.hoten || "";
                    document.getElementById("chitiet-gioitinh").value = data.gioitinh || "";
                    document.getElementById("chitiet-ngaysinh").value = data.ngaysinh || "";
                    document.getElementById("chitiet-sdt").value = data.sdt || "";
                    document.getElementById("chitiet-email").value = data.email || "";
                    document.getElementById("chitiet-nhanvien-id").value = selectedEmployeeId;

                })
                .catch(error => {
                    console.error("Lỗi khi lấy thông tin nhân viên:", error);
                    alert("Không thể lấy thông tin nhân viên. Vui lòng thử lại sau.");
                });
        });
    }
    if (detailHuyButton) {
        detailHuyButton.addEventListener("click", function (e) {
            e.preventDefault();
            detailModalCheckbox.checked = false;
        });
    }

    // Tải danh sách nhân viên khi trang load
    loadNhanVien();
});