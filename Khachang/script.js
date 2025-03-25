document.addEventListener("DOMContentLoaded", function () {
    // Các phần tử DOM chính
    const tableBody = document.querySelector("#khachhang-list tbody");
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
    const themForm = document.getElementById('them-khachhang-form');
    
    // Các phần tử cho modal sửa
    const editModalCheckbox = document.getElementById("sua-modal-toggle");
    const editForm = document.getElementById("sua-khachhang-form");
    const editLuuButton = document.getElementById("sua-luu");
    const editHuyButton = document.getElementById("sua-huy");

    // Các phần tử cho modal chi tiết
    const detailModalCheckbox = document.getElementById("chitiet-modal-toggle");
    const detailContainer = document.getElementById("chitiet-container");
    const detailHuyButton = document.getElementById("chitiet-huy");
    
    // Biến lưu trữ dữ liệu
    let selectedCustomerId = null;
    let allCustomers = [];
    
    // Thêm CSS cho hàng được chọn
    const style = document.createElement('style');
    document.head.appendChild(style);

    // ===== CHỨC NĂNG HIỂN THỊ VÀ CHỌN HÀNG =====
    
    // Hàm highlight hàng được chọn và lưu ID khách hàng
    function selectRow(row, makh) {
        // Bỏ highlight tất cả các hàng khác
        tableBody.querySelectorAll("tr").forEach(r => r.classList.remove("selected-row"));
        
        // Highlight hàng được chọn
        row.classList.add("selected-row");
        selectedCustomerId = makh;
        console.log("Đã chọn khách hàng ID:", makh);
    }
    
    // Sự kiện click vào hàng trong bảng
    tableBody.addEventListener("click", function (event) {
        const row = event.target.closest("tr");
        if (row) {
            const makh = row.querySelector("td").innerText;
            selectRow(row, makh);
        }
    });
    
    // Hàm hiển thị thông báo khi chưa chọn khách hàng
    function showAlert() {
        alert("Vui lòng chọn khách hàng!");
        location.reload();
    }
    
    // Hàm tải danh sách khách hàng
    function loadKhachHang() {
        fetch("http://localhost:8080/api/khachhang")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Không thể tải dữ liệu");
                }
                return response.json();
            })
            .then(data => {
                allCustomers = data; // Lưu lại toàn bộ danh sách
                renderTable(data);
                console.log("Đã tải danh sách khách hàng:", data.length, "bản ghi");
            })
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu:', error);
                tableBody.innerHTML = '<tr><td colspan="4">Không thể tải dữ liệu. Vui lòng thử lại sau.</td></tr>';
            });
    }
    
    // Hàm hiển thị danh sách khách hàng trong bảng
    function renderTable(data) {
        tableBody.innerHTML = ''; // Xóa nội dung cũ
        data.forEach(kh => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${kh.makh}</td>
                <td>${kh.tenkhachhang}</td>
                <td>${kh.diachi}</td>
                <td>${kh.sdt}</td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    // ===== CHỨC NĂNG TÌM KIẾM =====
    
    // Hàm tìm kiếm khách hàng
    function searchCustomers(keyword) {
        const filteredCustomers = allCustomers.filter(customer => {
            return (
                (customer.tenkhachhang && customer.tenkhachhang.toLowerCase().includes(keyword.toLowerCase())) ||
                (customer.diachi && customer.diachi.toLowerCase().includes(keyword.toLowerCase())) ||
                (customer.sdt && customer.sdt.toLowerCase().includes(keyword.toLowerCase()))
            );
        });
        renderTable(filteredCustomers);
    }
    
    // Sự kiện khi người dùng nhập nội dung tìm kiếm
    if (searchInput) {
        searchInput.addEventListener("input", function (event) {
            const keyword = event.target.value.trim();
            if (keyword) {
                searchCustomers(keyword);
            } else {
                renderTable(allCustomers);
            }
        });
    }
    
    // Sự kiện khi nhấn nút làm mới
    if (refreshButton) {
        refreshButton.addEventListener("click", function () {
            location.reload();
        });
    }
    
    // ===== CHỨC NĂNG THÊM KHÁCH HÀNG =====
    
    // Hàm kiểm tra dữ liệu form thêm
    function kiemTraDuLieu(form) {
        const tenKhachHang = form.querySelector('[id$="tenkhachhang"]').value.trim();
        const diaChi = form.querySelector('[id$="diachi"]').value.trim();
        const sdt = form.querySelector('[id$="sdt"]').value.trim();
    
        if (!tenKhachHang || !diaChi || !sdt) {
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

            const tenKhachHang = document.getElementById('them-tenkhachhang').value;
            const diaChi = document.getElementById('them-diachi').value;
            const sdt = document.getElementById('them-sdt').value;

            const khachHang = {
                tenkhachhang: tenKhachHang,
                diachi: diaChi,
                sdt: sdt
            };
            
            console.log("Dữ liệu gửi lên server:", JSON.stringify(khachHang));
            
            fetch("http://localhost:8080/api/khachhang/them", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(khachHang)
            })
            .then(response => {
                console.log("Response status:", response.status);
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then(data => {
                alert('Khách hàng đã được thêm thành công!');
                loadKhachHang();
                themModalToggle.checked = false;
                themForm.reset();
            })
            .catch(error => {
                console.error('Lỗi từ server:', error);
                alert('Có lỗi xảy ra khi thêm khách hàng. Kiểm tra console để biết chi tiết.');
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
    
    // ===== CHỨC NĂNG SỬA KHÁCH HÀNG =====
    
    // Sự kiện khi nhấn nút Sửa
    if (editButton) {
        editButton.addEventListener("click", function () {
            if (!selectedCustomerId) {
                showAlert();
                return;
            }

            fetch(`http://localhost:8080/api/khachhang/chitiet/${selectedCustomerId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Không thể lấy thông tin khách hàng");
                    }
                    return response.json();
                })
                .then(data => {
                    document.getElementById("sua-tenkhachhang").value = data.tenkhachhang || "";
                    document.getElementById("sua-diachi").value = data.diachi || "";
                    document.getElementById("sua-sdt").value = data.sdt || "";
                    document.getElementById("sua-khachhang-id").value = selectedCustomerId;
                    editModalCheckbox.checked = true;
                })
                .catch(error => {
                    console.error("Lỗi khi lấy thông tin khách hàng:", error);
                    alert("Không thể lấy thông tin khách hàng. Vui lòng thử lại sau.");
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

            const updatedCustomer = {
                tenkhachhang: document.getElementById("sua-tenkhachhang").value,
                diachi: document.getElementById("sua-diachi").value,
                sdt: document.getElementById("sua-sdt").value
            };

            fetch(`http://localhost:8080/api/khachhang/sua/${selectedCustomerId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedCustomer)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Không thể cập nhật khách hàng");
                }
                return response.text();
            })
            .then(() => {
                alert("Cập nhật khách hàng thành công!");
                editModalCheckbox.checked = false;
                loadKhachHang();
                location.reload();
            })
            .catch(error => {
                console.error("Lỗi khi cập nhật khách hàng:", error);
                alert("Không thể cập nhật khách hàng. Vui lòng thử lại sau.");
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
    
    // ===== CHỨC NĂNG XÓA KHÁCH HÀNG =====
    
    // Hàm xóa khách hàng
    function deleteKhachHang(makh) {
        if (!makh) {
            showAlert();
            return;
        }

        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa khách hàng này?");
        if (!confirmDelete) {
            return;
        }

        fetch(`http://localhost:8080/api/khachhang/xoa/${makh}`, {
            method: "DELETE"
        })
        .then(response => {
            console.log("HTTP Status:", response.status);
            return response.text();
        })
        .then(data => {
            console.log("API Response:", data);
            alert(data);
            loadKhachHang();
            selectedCustomerId = null;
        })
        .catch(error => {
            console.error("Lỗi khi xóa khách hàng:", error);
            alert("Không thể xóa khách hàng. Kiểm tra console để biết thêm chi tiết.");
        });
    }
    
    // Sự kiện khi nhấn nút Xóa
    if (deleteButton) {
        deleteButton.addEventListener("click", function () {
            deleteKhachHang(selectedCustomerId);
        });
    }

    // ===== CHỨC NĂNG XEM CHI TIẾT =====
    if (detailButton) {
        detailButton.addEventListener("click", function () {
            if (!selectedCustomerId) {
                showAlert();
                return;
            }
            fetch(`http://localhost:8080/api/khachhang/chitiet/${selectedCustomerId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Không thể lấy thông tin khách hàng");
                    }
                    return response.json();
                })
                .then(data => {
                    document.getElementById("chitiet-tenkhachhang").value = data.tenkhachhang || "";
                    document.getElementById("chitiet-diachi").value = data.diachi || "";
                    document.getElementById("chitiet-sdt").value = data.sdt || "";
                    document.getElementById("chitiet-khachhang-id").value = selectedCustomerId;
                    detailModalCheckbox.checked = true;
                })
                .catch(error => {
                    console.error("Lỗi khi lấy thông tin khách hàng:", error);
                    alert("Không thể lấy thông tin khách hàng. Vui lòng thử lại sau.");
                });
        });
    }
    
    if (detailHuyButton) {
        detailHuyButton.addEventListener("click", function (e) {
            e.preventDefault();
            detailModalCheckbox.checked = false;
        });
    }

    // Tải danh sách khách hàng khi trang load
    loadKhachHang();
});