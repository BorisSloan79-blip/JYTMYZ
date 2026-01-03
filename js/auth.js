/* js/auth.js */

const CONFIG = {
    // 这里设置你们的专属暗号，可修改
    PASSCODE: "5201314",
    KEY: "love_space_logged_in"
};

function checkLogin() {
    // 如果在主页但没登录，踢回 index.html
    const isLoginPage = window.location.pathname.endsWith('index.html') |

| window.location.pathname.endsWith('/');
    const isLoggedIn = localStorage.getItem(CONFIG.KEY) === 'true';

    if (!isLoggedIn &&!isLoginPage) {
        window.location.href = 'index.html';
    } else if (isLoggedIn && isLoginPage) {
        window.location.href = 'app.html';
    }
}

function login(code) {
    if (code === CONFIG.PASSCODE) {
        localStorage.setItem(CONFIG.KEY, 'true');
        return true;
    }
    return false;
}

// 页面加载即检查
checkLogin();