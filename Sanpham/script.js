
// SỰ KIỆN KHI THÊM SẢN PHẨM
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("add-product-form");
    const modalToggle = document.getElementById("modal-toggle");
    const huyButton = document.getElementById("huy");

    // Hàm kiểm tra xem các trường input có được điền đầy đủ không
    function validateForm() {
        const requiredFields = [
            "tensp", "loaisp", "soluongton", "thuonghieu", "congsuat",
            "baohanh", "xuatxu", "khuvuckho", "kichthuoc", "trongluong",
            "chatlieu", "doon", "mausac", "gianhap", "giaxuat", "congnghe"
        ];

        for (const field of requiredFields) {
            const value = document.getElementById(field).value.trim();
            if (!value) {
                alert("Vui lòng nhập đầy đủ thông tin!");
                return false; // Trả về false nếu có trường nào bị bỏ trống
            }
        }
        return true; // Trả về true nếu tất cả các trường đều được điền
    }

    // Khi ấn nút "Thêm"
    document.getElementById("them").addEventListener("click", function (event) {
        event.preventDefault();

        // Kiểm tra xem các trường input có được điền đầy đủ không
        if (!validateForm()) {
            return; // Dừng hàm nếu dữ liệu không hợp lệ
        }

        // Lấy giá trị từ form
        let sanPham = {
            tensp: document.getElementById("tensp").value,
            loaisp: document.getElementById("loaisp").value,
            soluongton: parseInt(document.getElementById("soluongton").value),
            thuonghieu: document.getElementById("thuonghieu").value,
            congsuat: parseFloat(document.getElementById("congsuat").value),
            baohanh: parseInt(document.getElementById("baohanh").value),
            xuatxu: document.getElementById("xuatxu").value,
            khuvuckho: document.getElementById("khuvuckho").value,
            kichthuoc: document.getElementById("kichthuoc").value,
            trongluong: parseFloat(document.getElementById("trongluong").value),
            chatlieu: document.getElementById("chatlieu").value,
            doon: document.getElementById("doon").value,
            mausac: document.getElementById("mausac").value,
            gianhap: parseFloat(document.getElementById("gianhap").value),
            giaxuat: parseFloat(document.getElementById("giaxuat").value),
            congnghe: document.getElementById("congnghe").value
        };

        // Gửi dữ liệu lên server
        fetch("http://localhost:8080/api/sanpham/them", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sanPham)
        })
        .then(response => response.json())
        .then(data => {
            alert("Thêm sản phẩm thành công!");
            modalToggle.checked = false; // Đóng modal
            form.reset(); // Reset form
            loadSanPham(); // Tải lại danh sách sản phẩm
        })
        .catch(error => console.error("Lỗi khi thêm sản phẩm:", error));
    });

    // Khi ấn nút "Hủy"
    huyButton.addEventListener("click", function () {
        modalToggle.checked = false; // Đóng modal
        form.reset(); // Reset form
    });

    // Hàm tải lại danh sách sản phẩm
    function loadSanPham() {
        fetch("http://localhost:8080/api/sanpham")
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector("#sanpham-list tbody");
                tableBody.innerHTML = '';
                data.forEach(sanpham => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${sanpham.masp}</td>
                        <td>${sanpham.tensp}</td>
                        <td>${sanpham.loaisp}</td>
                        <td>${sanpham.soluongton}</td>
                        <td>${sanpham.thuonghieu}</td>
                        <td>${sanpham.congsuat}</td>
                        <td>${sanpham.baohanh}</td>
                        <td>${sanpham.kichthuoc}</td>
                        <td>${sanpham.xuatxu}</td>
                        <td>${sanpham.khuvuckho}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
    }

    // Tải danh sách sản phẩm khi trang load
    loadSanPham();
});


// SỰ KIỆN KHI ẤN NÚT CHI TIẾT
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#sanpham-list tbody");
    let selectedRow = null; // Biến lưu trữ hàng được chọn
    let selectedProductId = null; // Biến lưu trữ ID sản phẩm được chọn

    // Hàm highlight hàng được chọn
    function selectRow(row, masp) {
        // Bỏ highlight tất cả các hàng khác
        tableBody.querySelectorAll("tr").forEach(r => r.classList.remove("selected-row"));

        // Highlight hàng được chọn
        row.classList.add("selected-row");
        selectedRow = row;
        selectedProductId = masp; // Lưu ID sản phẩm được chọn
    }

    // Thêm sự kiện click vào các hàng trong bảng
    tableBody.addEventListener("click", function (event) {
        const row = event.target.closest("tr");
        if (row) {
            const masp = row.querySelector("td").innerText; // Lấy mã sản phẩm từ cột đầu tiên
            selectRow(row, masp);
        }
    });

    // Hàm hiển thị thông báo khi chưa chọn sản phẩm
    function showAlert() {
        alert("Vui lòng chọn sản phẩm!");
        location.reload();
    }

    // Xử lý sự kiện khi ấn nút "Chi tiết"
    document.querySelector(".chitiet").addEventListener("click", function (event) {
        if (!selectedProductId) {
            showAlert(); // Hiển thị thông báo nếu chưa chọn sản phẩm
            return; // Dừng hàm và không làm gì thêm
        }

        // Nếu đã chọn sản phẩm, gọi API để lấy chi tiết sản phẩm
        fetch(`http://localhost:8080/api/sanpham/chitiet/${selectedProductId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Không tìm thấy sản phẩm");
                }
                return response.json();
            })
            .then(data => {
                if (!data || Object.keys(data).length === 0) {
                    throw new Error("Dữ liệu sản phẩm trống");
                }
                // Hiển thị thông tin chi tiết trong modal
                document.getElementById("tensp-chitiet").innerText = data.tensp || "N/A";
                document.getElementById("loaisp-chitiet").innerText = data.loaisp || "N/A";
                document.getElementById("soluongton-chitiet").innerText = data.soluongton || "N/A";
                document.getElementById("thuonghieu-chitiet").innerText = data.thuonghieu || "N/A";
                document.getElementById("congsuat-chitiet").innerText = data.congsuat || "N/A";
                document.getElementById("baohanh-chitiet").innerText = data.baohanh ? `${data.baohanh} tháng` : "N/A";
                document.getElementById("xuatxu-chitiet").innerText = data.xuatxu || "N/A";
                document.getElementById("khuvuckho-chitiet").innerText = data.khuvuckho || "N/A";
                document.getElementById("kichthuoc-chitiet").innerText = data.kichthuoc || "N/A";
                document.getElementById("trongluong-chitiet").innerText = data.trongluong ? `${data.trongluong} kg` : "N/A";
                document.getElementById("chatlieu-chitiet").innerText = data.chatlieu || "N/A";
                document.getElementById("doon-chitiet").innerText = data.doon ? `${data.doon} dB` : "N/A";
                document.getElementById("mausac-chitiet").innerText = data.mausac || "N/A";
                document.getElementById("gianhap-chitiet").innerText = data.gianhap ? `${data.gianhap.toLocaleString()} VND` : "N/A";
                document.getElementById("giaxuat-chitiet").innerText = data.giaxuat ? `${data.giaxuat.toLocaleString()} VND` : "N/A";
                document.getElementById("congnghe-chitiet").innerText = data.congnghe || "N/A";

                // Mở modal chi tiết
                document.getElementById("modal-chitiet-toggle").checked = true;
            })
            .catch(error => {
                console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
                alert("Không thể lấy thông tin sản phẩm. Vui lòng thử lại sau.");
            });
    });
});

// SỰ KIỆN KHI ẤN NÚT TÌM KIẾM VÀ LÀM MỚI

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-input"); // Ô tìm kiếm
    const refreshButton = document.querySelector(".refresh-button"); // Nút làm mới
    const tableBody = document.querySelector("#sanpham-list tbody"); // Phần tbody của bảng
    let allProducts = []; // Biến lưu trữ toàn bộ danh sách sản phẩm

    // Hàm tải lại danh sách sản phẩm
    function loadSanPham() {
        fetch("http://localhost:8080/api/sanpham")
            .then(response => response.json())
            .then(data => {
                allProducts = data; // Lưu toàn bộ danh sách sản phẩm
                renderTable(data); // Hiển thị danh sách sản phẩm
            })
            .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
    }

    // Hàm hiển thị danh sách sản phẩm trong bảng
    function renderTable(data) {
        tableBody.innerHTML = ''; // Xóa nội dung cũ
        data.forEach(sanpham => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${sanpham.masp}</td>
                <td>${sanpham.tensp}</td>
                <td>${sanpham.loaisp}</td>
                <td>${sanpham.soluongton}</td>
                <td>${sanpham.thuonghieu}</td>
                <td>${sanpham.congsuat}</td>
                <td>${sanpham.baohanh}</td>
                <td>${sanpham.kichthuoc}</td>
                <td>${sanpham.xuatxu}</td>
                <td>${sanpham.khuvuckho}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Hàm tìm kiếm sản phẩm
    function searchProducts(keyword) {
        const filteredProducts = allProducts.filter(product => {
            // Tìm kiếm theo tên sản phẩm, loại sản phẩm, thương hiệu, xuất xứ, v.v.
            return (
                product.tensp.toLowerCase().includes(keyword.toLowerCase()) ||
                product.loaisp.toLowerCase().includes(keyword.toLowerCase()) ||
                product.thuonghieu.toLowerCase().includes(keyword.toLowerCase()) ||
                product.xuatxu.toLowerCase().includes(keyword.toLowerCase())
            );
        });
        renderTable(filteredProducts); // Hiển thị kết quả tìm kiếm
    }

    // Sự kiện khi người dùng nhập nội dung tìm kiếm
    searchInput.addEventListener("input", function (event) {
        const keyword = event.target.value.trim(); // Lấy nội dung tìm kiếm
        if (keyword) {
            searchProducts(keyword); // Tìm kiếm sản phẩm
        } else {
            renderTable(allProducts); // Hiển thị lại toàn bộ danh sách nếu ô tìm kiếm trống
        }
    });

    // Sự kiện khi nhấn nút "Làm mới"
    refreshButton.addEventListener("click", function () {
        searchInput.value = ""; // Xóa nội dung tìm kiếm
        location.reload(); // Reload trang
    });

    // Tải danh sách sản phẩm khi trang load
    loadSanPham();
});

// SỰ KIỆN KHI ẤN NÚT XÓA
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#sanpham-list tbody"); // Phần tbody của bảng
    const deleteButton = document.querySelector(".xoa"); // Nút xóa
    let selectedProductId = null; // Biến lưu trữ ID sản phẩm được chọn

    // Hàm highlight hàng được chọn và lưu ID sản phẩm
    function selectRow(row, masp) {
        // Bỏ highlight tất cả các hàng khác
        tableBody.querySelectorAll("tr").forEach(r => r.classList.remove("selected-row"));

        // Highlight hàng được chọn
        row.classList.add("selected-row");
        selectedProductId = masp; // Lưu ID sản phẩm được chọn
    }

    // Thêm sự kiện click vào các hàng trong bảng
    tableBody.addEventListener("click", function (event) {
        const row = event.target.closest("tr");
        if (row) {
            const masp = row.querySelector("td").innerText; // Lấy mã sản phẩm từ cột đầu tiên
            selectRow(row, masp);
        }
    });

    // Hàm hiển thị thông báo khi chưa chọn sản phẩm
    function showAlert() {
        alert("Vui lòng chọn sản phẩm!");
    }

    // Hàm xóa sản phẩm
    function deleteProduct(masp) {
        if (!masp) {
            showAlert(); // Hiển thị thông báo nếu chưa chọn sản phẩm
            return;
        }

        // Xác nhận trước khi xóa
        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        if (!confirmDelete) {
            return; // Dừng nếu người dùng không xác nhận
        }

        // Gọi API xóa sản phẩm
        fetch(`http://localhost:8080/api/sanpham/xoa/${masp}`, {
            method: "DELETE"
        })
        .then(response => {
            console.log("HTTP Status:", response.status);
            return response.text(); // Chuyển từ .json() sang .text()
        })
        .then(data => {
            console.log("API Response:", data);
            alert(data); // Hiển thị thông báo từ API
            loadSanPham(); // Load lại danh sách sản phẩm
            selectedProductId = null;
        })
        .catch(error => {
            console.error("Lỗi khi xóa sản phẩm:", error);
            alert("Không thể xóa sản phẩm. Kiểm tra console để biết thêm chi tiết.");
        });
    }

    // Sự kiện khi nhấn nút "Xóa"
    deleteButton.addEventListener("click", function () {
        deleteProduct(selectedProductId); // Gọi hàm xóa sản phẩm
    });

    // Hàm tải lại danh sách sản phẩm
    function loadSanPham() {
        fetch("http://localhost:8080/api/sanpham")
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = ''; // Xóa nội dung cũ
                data.forEach(sanpham => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${sanpham.masp}</td>
                        <td>${sanpham.tensp}</td>
                        <td>${sanpham.loaisp}</td>
                        <td>${sanpham.soluongton}</td>
                        <td>${sanpham.thuonghieu}</td>
                        <td>${sanpham.congsuat}</td>
                        <td>${sanpham.baohanh}</td>
                        <td>${sanpham.kichthuoc}</td>
                        <td>${sanpham.xuatxu}</td>
                        <td>${sanpham.khuvuckho}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
    }

    // Tải danh sách sản phẩm khi trang load
    loadSanPham();
});



// SỰ KIỆN KHI ẤN NÚT SỬA
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#sanpham-list tbody");
    const editButton = document.querySelector(".sua");
    const editModal = document.getElementById("edit-modal-toggle");
    const editForm = document.getElementById("edit-product-form");
    const editLuuButton = document.getElementById("edit-luu");
    const editHuyButton = document.getElementById("edit-huy");
    let selectedProductId = null;

    // Hàm highlight hàng được chọn và lưu ID sản phẩm
    function selectRow(row, masp) {
        tableBody.querySelectorAll("tr").forEach(r => r.classList.remove("selected-row"));
        row.classList.add("selected-row");
        selectedProductId = masp;
    }

    // Sự kiện click vào hàng trong bảng
    tableBody.addEventListener("click", function (event) {
        const row = event.target.closest("tr");
        if (row) {
            const masp = row.querySelector("td").innerText;
            selectRow(row, masp);
        }
    });

    // Hàm hiển thị thông báo khi chưa chọn sản phẩm
    function showAlert() {
        alert("Vui lòng chọn sản phẩm!");
        location.reload();
    }

    // Sự kiện nút "Sửa"
    editButton.addEventListener("click", function () {
        if (!selectedProductId) {
            showAlert();
            return;
        }

        fetch(`http://localhost:8080/api/sanpham/chitiet/${selectedProductId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Không thể lấy thông tin sản phẩm");
                }
                return response.json();
            })
            .then(data => {
                document.getElementById("edit-tensp").value = data.tensp || "";
                document.getElementById("edit-loaisp").value = data.loaisp || "";
                document.getElementById("edit-soluongton").value = data.soluongton || "";
                document.getElementById("edit-thuonghieu").value = data.thuonghieu || "";
                document.getElementById("edit-congsuat").value = data.congsuat || "";
                document.getElementById("edit-baohanh").value = data.baohanh || "";
                document.getElementById("edit-xuatxu").value = data.xuatxu || "";
                document.getElementById("edit-khuvuckho").value = data.khuvuckho || "";
                document.getElementById("edit-kichthuoc").value = data.kichthuoc || "";
                document.getElementById("edit-trongluong").value = data.trongluong || "";
                document.getElementById("edit-chatlieu").value = data.chatlieu || "";
                document.getElementById("edit-doon").value = data.doon || "";
                document.getElementById("edit-mausac").value = data.mausac || "";
                document.getElementById("edit-gianhap").value = data.gianhap || "";
                document.getElementById("edit-giaxuat").value = data.giaxuat || "";
                document.getElementById("edit-congnghe").value = data.congnghe || "";
                editModal.checked = true;
            })
            .catch(error => {
                console.error("Lỗi khi lấy thông tin sản phẩm:", error);
                alert("Không thể lấy thông tin sản phẩm. Vui lòng thử lại sau.");
                location.reload();
            });
    });
    function clearModalDetails() {
        document.getElementById("tensp-chitiet").innerText = "N/A";
        document.getElementById("loaisp-chitiet").innerText = "N/A";
        document.getElementById("soluongton-chitiet").innerText = "N/A";
        document.getElementById("thuonghieu-chitiet").innerText = "N/A";
        document.getElementById("congsuat-chitiet").innerText = "N/A";
        document.getElementById("baohanh-chitiet").innerText = "N/A";
        document.getElementById("xuatxu-chitiet").innerText = "N/A";
        document.getElementById("khuvuckho-chitiet").innerText = "N/A";
        document.getElementById("kichthuoc-chitiet").innerText = "N/A";
        document.getElementById("trongluong-chitiet").innerText = "N/A";
        document.getElementById("chatlieu-chitiet").innerText = "N/A";
        document.getElementById("doon-chitiet").innerText = "N/A";
        document.getElementById("mausac-chitiet").innerText = "N/A";
        document.getElementById("gianhap-chitiet").innerText = "N/A";
        document.getElementById("giaxuat-chitiet").innerText = "N/A";
        document.getElementById("congnghe-chitiet").innerText = "N/A";
    }
    
    // Sự kiện nút "Lưu"
    editLuuButton.addEventListener("click", function (event) {
        event.preventDefault();

        const updatedProduct = {
            tensp: document.getElementById("edit-tensp").value,
            loaisp: document.getElementById("edit-loaisp").value,
            soluongton: parseInt(document.getElementById("edit-soluongton").value) || 0,
            thuonghieu: document.getElementById("edit-thuonghieu").value,
            congsuat: parseFloat(document.getElementById("edit-congsuat").value) || 0,
            baohanh: parseInt(document.getElementById("edit-baohanh").value) || 0,
            xuatxu: document.getElementById("edit-xuatxu").value,
            khuvuckho: document.getElementById("edit-khuvuckho").value,
            kichthuoc: document.getElementById("edit-kichthuoc").value,
            trongluong: parseFloat(document.getElementById("edit-trongluong").value) || 0,
            chatlieu: document.getElementById("edit-chatlieu").value,
            doon: document.getElementById("edit-doon").value,
            mausac: document.getElementById("edit-mausac").value,
            gianhap: parseFloat(document.getElementById("edit-gianhap").value) || 0,
            giaxuat: parseFloat(document.getElementById("edit-giaxuat").value) || 0,
            congnghe: document.getElementById("edit-congnghe").value
        };

        fetch(`http://localhost:8080/api/sanpham/sua/${selectedProductId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Không thể cập nhật sản phẩm");
            }
            // Kiểm tra xem response có trả về JSON không (tuỳ thuộc backend của bạn)
            return response.text(); // Sử dụng text() thay vì json() nếu backend không trả về JSON
        })
        .then(() => {
            alert("Cập nhật sản phẩm thành công!");
            editModal.checked = false; // Đóng modal
            loadSanPham(); // Tải lại danh sách sản phẩm
            clearModalDetails();
            location.reload();
        })
        .catch(error => {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
            alert("Không thể cập nhật sản phẩm. Vui lòng thử lại sau.");
        });
    });

    // Sự kiện nút "Hủy"
    editHuyButton.addEventListener("click", function () {
        editModal.checked = false;
    });

    // Hàm tải danh sách sản phẩm
    function loadSanPham() {
        fetch("http://localhost:8080/api/sanpham")
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = '';
                data.forEach(sanpham => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${sanpham.masp}</td>
                        <td>${sanpham.tensp}</td>
                        <td>${sanpham.loaisp}</td>
                        <td>${sanpham.soluongton}</td>
                        <td>${sanpham.thuonghieu}</td>
                        <td>${sanpham.congsuat}</td>
                        <td>${sanpham.baohanh}</td>
                        <td>${sanpham.kichthuoc}</td>
                        <td>${sanpham.xuatxu}</td>
                        <td>${sanpham.khuvuckho}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
    }

    // Tải danh sách sản phẩm khi trang load
    loadSanPham();
});