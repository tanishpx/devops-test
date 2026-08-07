// 1. Fixed: Added quotes around 'sbmt'
const form = document.getElementById('sbmt');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const fullName = document.getElementById('full-name').value.trim();
  const branch = document.getElementById('branch').value;
  const email = document.getElementById('email').value.trim();
  const number = document.getElementById('num').value.trim();
  const password = document.getElementById('pass').value;

  if (password.length < 8) {
    alert('Password is too short');
    return;
  }

  if (!number) {
    alert('Please enter a mobile number');
    return;
  }

  const payload = { fullName, branch, email, number, password };

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.success) {
      alert('Form submitted successfully!');
      form.reset();
    } else {
      alert(result.message || 'Unable to save registration');
    }
  } catch (error) {
    alert('Error submitting form.');
  }
});
