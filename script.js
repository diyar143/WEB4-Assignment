const basicForm = document.getElementById('basicForm');
const basicStatus = document.getElementById('basicStatus');

basicForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!basicForm.checkValidity()) {
        basicForm.reportValidity();
        return;
    }
    basicStatus.textContent = 'Message sent successfully.';
    basicForm.reset();
});

function setupValidation(formId, statusId, successText) {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);
    const pass = document.getElementById('password');
    const confirmPass = document.getElementById('confirmPassword');

    const validatePasswords = () => {
        if (pass && confirmPass) {
            confirmPass.setCustomValidity(pass.value === confirmPass.value ? '' : 'Mismatch');
        }
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        validatePasswords();
        form.classList.add('was-validated');
        
        if (form.checkValidity()) {
            status.textContent = successText;
            form.reset();
            form.classList.remove('was-validated');
            form.querySelectorAll('.is-valid, .is-invalid').forEach(el => el.classList.remove('is-valid', 'is-invalid'));
            if (confirmPass) confirmPass.setCustomValidity('');
        } else {
            status.textContent = '';
        }
    });

    form.querySelectorAll('input, textarea, select').forEach(input => {
        ['input', 'change'].forEach(evt => {
            input.addEventListener(evt, () => {
                validatePasswords();
                if (form.classList.contains('was-validated')) {
                    input.classList.toggle('is-valid', input.checkValidity());
                    input.classList.toggle('is-invalid', !input.checkValidity());
                }
            });
        });
    });

    form.addEventListener('reset', () => {
        status.textContent = '';
        form.classList.remove('was-validated');
        form.querySelectorAll('.is-valid, .is-invalid').forEach(el => el.classList.remove('is-valid', 'is-invalid'));
        if (confirmPass) confirmPass.setCustomValidity('');
    });
}

setupValidation('bootstrapForm', 'bootstrapStatus', 'Your message is ready to send.');
setupValidation('registerForm', 'registerStatus', 'Registration completed successfully.');