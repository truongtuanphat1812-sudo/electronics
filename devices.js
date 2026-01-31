// Lưu và tải danh sách thiết bị
const DEVICES_KEY = 'electronics_devices';

function getDevices() {
    const data = localStorage.getItem(DEVICES_KEY);
    return data ? JSON.parse(data) : [];
}

function saveDevices(devices) {
    localStorage.setItem(DEVICES_KEY, JSON.stringify(devices));
}

function formatPrice(price) {
    return Number(price).toLocaleString("vi-VN");
}
