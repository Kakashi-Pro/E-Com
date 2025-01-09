document.getElementById('payButton').addEventListener('click', function() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';

    // Optional: Add a bounce effect to the icon
    const successIcon = document.getElementById('successIcon');
    successIcon.classList.add('animate');

    // Reset the icon after a few seconds
    setTimeout(() => {
        successIcon.classList.remove('animate');
    }, 3000);
});