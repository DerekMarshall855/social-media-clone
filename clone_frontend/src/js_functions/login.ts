// Simple authentication for lazy people

export const logIn = (name: string) => {
    localStorage.setItem('auth', 'true');
    localStorage.setItem('username', name);
    window.location.reload(false);
}

export const logOut = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    window.location.reload(false);
}
export const isLogin = () => {
    if (localStorage.getItem('auth')) {
        return true;
    }

    return false;
}