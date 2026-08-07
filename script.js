// 1. Fixed: Added quotes around 'sbmt'
const form = document.getElementById('sbmt');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const fullName = document.getElementById('full-name').value.trim();
  const branch = document.getElementById('branch').value;
  const email = document.getElementById('email').value.trim();
  const num_val = document.getElementById('num').value.trim();
  const pass_val = document.getElementById('pass').value;

  if (pass_val.length < 8) {
    alert('Password is too short');
    return;
  }

  if (num_val === "") {
    alert('Please enter a mobile number');
    return;
  }

  const payload = { fullName, branch, email, number: num_val, password: pass_val };

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
