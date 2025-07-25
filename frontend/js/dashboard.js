window.onload = async () => {
  const token = localStorage.getItem('token');
  if (!token) return window.location.href = 'login.html';

  const res = await fetch('http://localhost:5000/api/users/bills', {
    headers: { 'Authorization': 'Bearer ' + token }
  });

  const bills = await res.json();
  const container = document.getElementById('billContainer');
  if (res.ok) {
    container.innerHTML = bills.map(bill => `
      <p>Month: ${bill.month}, Amount: ₹${bill.amount}</p>
    `).join('');
  } else {
    alert(bills.message || 'Failed to load bills.');
  }
};

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}
