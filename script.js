document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn form gửi yêu cầu theo cách thông thường

    // Lấy giá trị từ các trường input
    const tendangnhap = document.getElementById('tendangnhap').value;
    const matkhau = document.getElementById('matkhau').value;

    // Gửi yêu cầu POST đến API đăng nhập
    fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `tendangnhap=${encodeURIComponent(tendangnhap)}&matkhau=${encodeURIComponent(matkhau)}`
    })
    .then(response => response.text()) // Đọc phản hồi từ server
    .then(data => {
        if (data.includes("Đăng nhập thành công")) {
            // Chuyển hướng đến trang chính sau khi đăng nhập thành công
            window.location.href = '../Trangchu/index.html';
        } else {
            // Hiển thị thông báo lỗi
            showErrorPopup("Sai tên đăng nhập hoặc mật khẩu!");
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
        showErrorPopup("Đã xảy ra lỗi khi đăng nhập!");
    });
});

// Hàm hiển thị thông báo lỗi giữa màn hình
function showErrorPopup(message) {
    // Xóa popup cũ nếu có
    const oldPopup = document.getElementById('errorPopup');
    if (oldPopup) oldPopup.remove();

    // Tạo popup mới
    const popup = document.createElement('div');
    popup.id = 'errorPopup';
    popup.innerText = message;
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'red';
    popup.style.color = 'white';
    popup.style.padding = '15px 30px';
    popup.style.borderRadius = '10px';
    popup.style.fontSize = '18px';
    popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    popup.style.zIndex = '1000';

    document.body.appendChild(popup);

    // Tự động ẩn sau 2 giây
    setTimeout(() => {
        popup.remove();
    }, 2000);
}
