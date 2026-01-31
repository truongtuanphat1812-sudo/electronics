// Auth logic - dùng localStorage để lưu users
const STORAGE_KEY = 'electronics_users';
const ADMIN_USER = { username: 'admin', password: 'admin123', isAdmin: true };

function getUsers() {
    let users = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!users) {
        users = [ADMIN_USER];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
    return users;
}

function findUser(username, password) {
    const users = getUsers();
    return users.find(u => u.username === username && u.password === password);
}

function register(username, password) {
    const users = getUsers();
    if (users.some(u => u.username === username)) {
        return { success: false, message: 'Tên đăng nhập đã tồn tại!' };
    }
    users.push({ username, password, isAdmin: false });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return { success: true };
}

function login(username, password) {
    const user = findUser(username, password);
    if (!user) {
        return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng!' };
    }
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true, isAdmin: user.isAdmin };
}

function logout() {
    sessionStorage.removeItem('currentUser');
}

function getCurrentUser() {
    const data = sessionStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
}

function requireAuth(requireAdmin = false) {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'dangnhap.html';
        return null;
    }
    if (requireAdmin && !user.isAdmin) {
        window.location.href = 'menu.html';
        return null;
    }
    return user;
}
