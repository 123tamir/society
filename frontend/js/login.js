document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };

  const res = await fetch('http://localhost:5000/api/users/login', {
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
