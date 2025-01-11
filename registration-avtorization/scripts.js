document.getElementById("registration-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    const emailError = document.getElementById("email-error");
    const passwordStrength = document.getElementById("password-strength");

    // ელ. ფოსტა ვალიდაცია
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
        emailError.textContent = "შეიყვანეთ სწორი ელ. ფოსტა (უნდა შეიცავდეს @ და . სიმბოლოებს).";
        emailError.style.color = "red";
        return;
    } else {
        emailError.textContent = "";
    }

    // პაროლების შეხამება
    if (password !== confirmPassword) {
        alert("პაროლი დაადასტურეთ სწორად.");
        return;
    }

    alert("რეგისტრაცია წარმატებით განხორციელდა!");
    document.getElementById("registration-form").reset();
});

// პაროლის სიძლიერის შეფასება
function checkPasswordStrength(password) {
    let strength = "weak";
    let message = "სუსტი";

    if (password.length >= 8) {
        if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password)) {
            strength = "strong";
            message = "ძლიერია";
        } else if (/[a-z]/.test(password) || /[A-Z]/.test(password) || /\d/.test(password)) {
            strength = "medium";
            message = "საშუალო";
        }
    }

    return { strength, message };
}

// პაროლის სიძლიერის ავტომატური შემოწმება
document.getElementById("password").addEventListener("input", function () {
    const password = this.value;
    const passwordStrength = document.getElementById("password-strength");
    const passwordStrengthValue = checkPasswordStrength(password);

    passwordStrength.textContent = passwordStrengthValue.message;

    if (passwordStrengthValue.strength === "weak") {
        passwordStrength.style.color = "red";
    } else if (passwordStrengthValue.strength === "medium") {
        passwordStrength.style.color = "orange";
    } else {
        passwordStrength.style.color = "green";
    }
});

// მობილურის ნომერში მხოლოდ რიცხვების ჩაწერა
document.getElementById("phone").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
});
