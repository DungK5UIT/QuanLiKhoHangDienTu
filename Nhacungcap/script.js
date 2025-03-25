document.addEventListener("DOMContentLoaded", function () {
    // Các phần tử DOM chính
    const tableBody = document.querySelector("#nhacungcap-list tbody");
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
    const themForm = document.getElementById('them-nhacungcap-form');
    
    // Các phần tử cho modal sửa
    const editModalCheckbox = document.getElementById("sua-modal-toggle");
    const editForm = document.getElementById("sua-nhacungcap-form");
    const editLuuButton = document.getElementById("sua-luu");
    const editHuyButton = document.getElementById("sua-huy");


     // Các phần tử cho modal chi tiết
     const detailModalCheckbox = document.getElementById("chitiet-modal-toggle");
     const detailContainer = document.getElementById("chitiet-container");
     const detailHuyButton = document.getElementById("chitiet-huy");
    
     // Biến lưu trữ dữ liệu
    let selectedSupplierId = null;
    let allSuppliers = [];
    
    // Thêm CSS cho hàng được chọn
    const style = document.createElement('style');
    document.head.appendChild(style);

    // ===== CHỨC NĂNG HIỂN THỊ VÀ CHỌN HÀNG =====
    
    // Hàm highlight hàng được chọn và lưu ID nhà cung cấp
    function selectRow(row, mancc) {
        // Bỏ highlight tất cả các hàng khác
        tableBody.querySelectorAll("tr").forEach(r => r.classList.remove("selected-row"));
        
        // Highlight hàng được chọn
        row.classList.add("selected-row");
        selectedSupplierId = mancc;
        console.log("Đã chọn nhà cung cấp ID:", mancc);
    }
    
    // Sự kiện click vào hàng trong bảng
    tableBody.addEventListener("click", function (event) {
        const row = event.target.closest("tr");
        if (row) {
            const mancc = row.querySelector("td").innerText;
            selectRow(row, mancc);
        }
    });
    
    // Hàm hiển thị thông báo khi chưa chọn nhà cung cấp
    function showAlert() {
        alert("Vui lòng chọn nhà cung cấp!");
        location.reload();
    }
    
    // Hàm tải danh sách nhà cung cấp
    function loadNhaCungCap() {
        fetch("http://localhost:8080/api/nhacungcap")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Không thể tải dữ liệu");
                }
                return response.json();
            })
            .then(data => {
                allSuppliers = data; // Lưu lại toàn bộ danh sách
                renderTable(data);
                console.log("Đã tải danh sách nhà cung cấp:", data.length, "bản ghi");
            })
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu:', error);
                tableBody.innerHTML = '<tr><td colspan="5">Không thể tải dữ liệu. Vui lòng thử lại sau.</td></tr>';
            });
    }
    
    // Hàm hiển thị danh sách nhà cung cấp trong bảng
    function renderTable(data) {
        tableBody.innerHTML = ''; // Xóa nội dung cũ
        data.forEach(ncc => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${ncc.mancc}</td>
                <td>${ncc.tenncc}</td>
                <td>${ncc.diachi}</td>
                <td>${ncc.email}</td>
                <td>${ncc.sdt}</td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    // ===== CHỨC NĂNG TÌM KIẾM =====
    
    // Hàm tìm kiếm nhà cung cấp
    function searchSuppliers(keyword) {
        const filteredSuppliers = allSuppliers.filter(supplier => {
            return (
                (supplier.tenncc && supplier.tenncc.toLowerCase().includes(keyword.toLowerCase())) ||
                (supplier.diachi && supplier.diachi.toLowerCase().includes(keyword.toLowerCase())) ||
                (supplier.email && supplier.email.toLowerCase().includes(keyword.toLowerCase())) ||
                (supplier.sdt && supplier.sdt.toLowerCase().includes(keyword.toLowerCase()))
            );
        });
        renderTable(filteredSuppliers);
    }
    
    // Sự kiện khi người dùng nhập nội dung tìm kiếm
    if (searchInput) {
        searchInput.addEventListener("input", function (event) {
            const keyword = event.target.value.trim();
            if (keyword) {
                searchSuppliers(keyword);
            } else {
                renderTable(allSuppliers);
            }
        });
    }
    
    // Sự kiện khi nhấn nút làm mới
    if (refreshButton) {
        refreshButton.addEventListener("click", function () {
            location.reload();
        });
    }
    
    // ===== CHỨC NĂNG THÊM NHÀ CUNG CẤP =====
    
    // Hàm kiểm tra dữ liệu form thêm
    function kiemTraDuLieu(form) {
        const tenNhaCungCap = form.querySelector('[id$="tennhacungcap"]').value.trim();
        const diaChi = form.querySelector('[id$="diachi"]').value.trim();
        const email = form.querySelector('[id$="email"]').value.trim();
        const sdt = form.querySelector('[id$="sdt"]').value.trim();

        if (!tenNhaCungCap || !diaChi || !email || !sdt) {
            alert("Vui lòng nhập đủ thông tin!");
            return false;
        }
        return true;
    }
    
    // Sự kiện khi nhấn nút Thêm - Lưu
    if (themLuuButton) {
        themLuuButton.addEventListener('click', function (e) {
            e.preventDefault();
            
            if (!kiemTraDuLieu(themForm)) {
                return;
            }

            const tenNhaCungCap = document.getElementById('them-tennhacungcap').value;
            const diaChi = document.getElementById('them-diachi').value;
            const email = document.getElementById('them-email').value;
            const sdt = document.getElementById('them-sdt').value;

            const nhaCungCap = {
                tenncc: tenNhaCungCap,
                diachi: diaChi,
                email: email,
                sdt: sdt
            };

            fetch("http://localhost:8080/api/nhacungcap/them", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nhaCungCap)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Lỗi khi gửi dữ liệu lên server');
                }
                return response.json();
            })
            .then(data => {
                alert('Nhà cung cấp đã được thêm thành công!');
                loadNhaCungCap();
                themModalToggle.checked = false;
                themForm.reset();
            })
            .catch(error => {
                console.error('Lỗi:', error);
                alert('Có lỗi xảy ra khi thêm nhà cung cấp. Vui lòng thử lại.');
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
    
    // ===== CHỨC NĂNG SỬA NHÀ CUNG CẤP =====
    
    // Sự kiện khi nhấn nút Sửa
    if (editButton) {
        editButton.addEventListener("click", function () {
            if (!selectedSupplierId) {
                showAlert();
                return;
            }

            fetch(`http://localhost:8080/api/nhacungcap/chitiet/${selectedSupplierId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Không thể lấy thông tin nhà cung cấp");
                    }
                    return response.json();
                })
                .then(data => {
                    document.getElementById("sua-tennhacungcap").value = data.tenncc || "";
                    document.getElementById("sua-diachi").value = data.diachi || "";
                    document.getElementById("sua-email").value = data.email || "";
                    document.getElementById("sua-sdt").value = data.sdt || "";
                    document.getElementById("sua-nhacungcap-id").value = selectedSupplierId;
                    editModalCheckbox.checked = true;
                })
                .catch(error => {
                    console.error("Lỗi khi lấy thông tin nhà cung cấp:", error);
                    alert("Không thể lấy thông tin nhà cung cấp. Vui lòng thử lại sau.");
                }) ;
        });
    }
    
    // Sự kiện khi nhấn nút Sửa - Lưu
    if (editLuuButton) {
        editLuuButton.addEventListener("click", function (event) {
            event.preventDefault();
            
            if (!kiemTraDuLieu(editForm)) {
                return;
            }

            const updatedSupplier = {
                tenncc: document.getElementById("sua-tennhacungcap").value,
                diachi: document.getElementById("sua-diachi").value,
                email: document.getElementById("sua-email").value,
                sdt: document.getElementById("sua-sdt").value
            };

            fetch(`http://localhost:8080/api/nhacungcap/sua/${selectedSupplierId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedSupplier)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Không thể cập nhật nhà cung cấp");
                }
                return response.text();
            })
            .then(() => {
                alert("Cập nhật nhà cung cấp thành công!");
                editModalCheckbox.checked = false;
                loadNhaCungCap();
                location.reload();
            })
            .catch(error => {
                console.error("Lỗi khi cập nhật nhà cung cấp:", error);
                alert("Không thể cập nhật nhà cung cấp. Vui lòng thử lại sau.");
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
    
    // ===== CHỨC NĂNG XÓA NHÀ CUNG CẤP =====
    
    // Hàm xóa nhà cung cấp
    function deleteNhaCungCap(mancc) {
        if (!mancc) {
            showAlert();
            return;
        }

        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này?");
        if (!confirmDelete) {
            return;
        }

        fetch(`http://localhost:8080/api/nhacungcap/xoa/${mancc}`, {
            method: "DELETE"
        })
        .then(response => {
            console.log("HTTP Status:", response.status);
            return response.text();
        })
        .then(data => {
            console.log("API Response:", data);
            alert(data);
            loadNhaCungCap();
            selectedSupplierId = null;
        })
        .catch(error => {
            console.error("Lỗi khi xóa nhà cung cấp:", error);
            alert("Không thể xóa nhà cung cấp. Kiểm tra console để biết thêm chi tiết.");
        });
    }
    
    // Sự kiện khi nhấn nút Xóa
    if (deleteButton) {
        deleteButton.addEventListener("click", function () {
            deleteNhaCungCap(selectedSupplierId);
        });
    }




     // ===== CHỨC NĂNG XEM CHI TIẾT =====
if (detailButton) {
    detailButton.addEventListener("click", function () {
        if (!selectedSupplierId) {
            showAlert();
            return;
        }
        fetch(`http://localhost:8080/api/nhacungcap/chitiet/${selectedSupplierId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Không thể lấy thông tin nhà cung cấp");
                }
                return response.json();
            })
            .then(data => {
                document.getElementById("chitiet-tennhacungcap").value = data.tenncc || "";
                document.getElementById("chitiet-diachi").value = data.diachi || "";
                document.getElementById("chitiet-email").value = data.email || "";
                document.getElementById("chitiet-sdt").value = data.sdt || "";
                document.getElementById("chitiet-nhacungcap-id").value = selectedSupplierId;

                // Thiết lập readonly để không cho chỉnh sửa
                document.getElementById("chitiet-tennhacungcap").readOnly = true;
                document.getElementById("chitiet-diachi").readOnly = true;
                document.getElementById("chitiet-email").readOnly = true;
                document.getElementById("chitiet-sdt").readOnly = true;
            })
            .catch(error => {
                console.error("Lỗi khi lấy thông tin nhà cung cấp:", error);
                alert("Không thể lấy thông tin nhà cung cấp. Vui lòng thử lại sau.");
            });
    });
}
if (detailHuyButton) {
    detailHuyButton.addEventListener("click", function (e) {
        e.preventDefault();
        detailModalCheckbox.checked = false;
    });
}

    // Tải danh sách nhà cung cấp khi trang load
    loadNhaCungCap();
});




