export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePassword = (password: string): boolean => {
    const re = /^(?=.*[A-Za-z])/;
    return re.test(String(password));
};