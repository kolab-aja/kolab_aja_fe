export default function validatePassword(password) {
    // Check length
    if (password.length < 8) {
        return "Password harus memiliki minimal 8 karakter.";
    }

    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) {
        return "Password harus mengandung setidaknya satu huruf kapital.";
    }

    // Check for lowercase letter
    if (!/[a-z]/.test(password)) {
        return "Password harus mengandung setidaknya satu huruf kecil.";
    }

    // Check for digit
    if (!/\d/.test(password)) {
        return "Password harus mengandung setidaknya satu angka.";
    }

    // Optional: Check for special characters
    // Uncomment the lines below if you want to enforce special characters
    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    //     return "Password harus mengandung setidaknya satu karakter spesial.";
    // }

    // All checks passed
    return "Password valid";
}
