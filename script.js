// --- ELEMENTS ---
const sidebar = document.getElementById('sidebar');
const menuIcon = document.getElementById('menu-icon');
const closeBtn = document.getElementById('close-btn');

const containerMovements = document.querySelector('.movements-list');
const labelBalance = document.querySelector('.balance-amount');
const containerMain = document.querySelector('.container-main');

const inputUser = document.querySelector('.input');
const inputPin = document.querySelector('.input_pin');
const btnLogin = document.querySelector('.login_btn');
const labelUser = document.querySelector('.user');

// - Accounts -
const account1 = {
  owner: 'Abenezer Tekalign',
  movements: [8000, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1111,
};

const account2 = {
  owner: 'Abrham Tekalign',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 2222,
};

const accounts = [account1, account2];
let currentAccount;

// - SIDEBAR -
menuIcon.addEventListener('click', () => sidebar.classList.add('active'));
closeBtn.addEventListener('click', () => sidebar.classList.remove('active'));


const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(mov => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <li class="${type}">
        ${type}
        <span>${mov > 0 ? '+' : '-'}$${Math.abs(mov)}</span>
      </li>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// - CALCULATE BALANCE -
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `$${balance}`;
};

// - LOGIN -
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.owner.split(' ')[0].toLowerCase() === inputUser.value.toLowerCase()
  );

  if (currentAccount?.pin === Number(inputPin.value)) {
    labelUser.textContent = `Hello, ${currentAccount.owner.split(' ')[0]}`;

    containerMain.classList.remove('hidden');
    containerMain.classList.add('visible');

    displayMovements(currentAccount.movements);
    calcDisplayBalance(currentAccount.movements);

    inputUser.value = inputPin.value = '';
  } else {
    alert('Wrong login!');
  }
});
