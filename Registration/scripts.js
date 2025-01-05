
document.getElementById("registration-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let emailError = document.getElementById("email-error");
    let passwordStrength = document.getElementById("password-strength");

    // ელ. ფოსტის შემოწმება
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
        emailError.textContent = "შეიყვანეთ სწორი ელ. ფოსტა (უნდა შეიცავდეს @ და . სიმბოლოებს).";
        return;
    } else {
        emailError.textContent = "";
    }

    // პაროლის სიძლიერის შემოწმება
    let passwordStrengthValue = checkPasswordStrength(password);
    passwordStrength.textContent = passwordStrengthValue.message;
    if (passwordStrengthValue.strength === 'weak') {
        passwordStrength.style.color = 'red';
        return;
    } else if (passwordStrengthValue.strength === 'medium') {
        passwordStrength.style.color = 'orange';
    } else {
        passwordStrength.style.color = 'green';
    }

    // პაროლების შეხამება
    if (password !== confirmPassword) {
        alert("პაროლი დაადასტურეთ სწორად.");
        return;
    }

    alert("რეგისტრაცია წარმატებით განხორციელდა!");
    document.getElementById("registration-form").reset();
});

// პაროლის სიძლიერის შემოწმების ფუნქცია
document.getElementById("password").addEventListener("input", function() {
    let password = document.getElementById("password").value;
    let passwordStrength = document.getElementById("password-strength");

    let passwordStrengthValue = checkPasswordStrength(password);
    passwordStrength.textContent = passwordStrengthValue.message;

    if (passwordStrengthValue.strength === 'weak') {
        passwordStrength.style.color = 'red';
    } else if (passwordStrengthValue.strength === 'medium') {
        passwordStrength.style.color = 'orange';
    } else {
        passwordStrength.style.color = 'green';
    }
});

// პაროლის სიძლიერის შეფასება
function checkPasswordStrength(password) {
    let strength = 'weak';
    let message = "პაროლი სუსტი";

    if (password.length >= 8) {
        if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password)) {
            strength = 'strong';
            message = "პაროლი ძლიერია";
        } else if (/[a-z]/.test(password) || /[A-Z]/.test(password) || /\d/.test(password)) {
            strength = 'medium';
            message = "პაროლი საშუალო სიმძლავრისაა";
        }
    }

    return {strength, message};
}


