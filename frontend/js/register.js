document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    flat_no: document.getElementById('flat_no').value
  };

  const res = await fetch('http://localhost:5000/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  if (res.ok) {
    localStorage.setItem('token', result.token);
    window.location.href = 'dashboard.html';
  } else {
    alert(result.message);
  }
});
