// --- ELEMENTS ---
const sidebar = document.getElementById('sidebar');
const menuIcon = document.getElementById('menu-icon');
const closeBtn = document.getElementById('close-btn');

const containerMovements = document.querySelector('.movements-list');

const containerMain = document.querySelector('.container-main');
const topBar = document.querySelector('.topbar');


const inputUser = document.querySelector('.input');
const inputPin = document.querySelector('.input_pin');
const btnLogin = document.querySelector('.login_btn');
const loginButton = document.querySelector('.login-btn');
const loginLayout = document.querySelector('.login-layout');



const labelBalance = document.querySelector('.balance-amount');
const labelUser = document.querySelector('.user');
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelheading = document.querySelector('.heading');




// - Accounts -
const account1 = {
  owner: 'Abenezer Tekalign',
  movements: [8000, 450, -400, 3000, -650, -1300, 70, 13000],
  interestRate: 1.3,
  pin: 1111,
};

const account2 = {
  owner: 'Abrham Tekalign',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};
const account3 = {
  owner: 'Abeje Goshu',
  movements: [7000, 3500, -1500, 700, -3210, -1400, 5000, -900],
  interestRate : 1.2,
  pin: 3333,
};
const account4 = {
  owner: 'Nathan kaleb',
  movements: [6000, 3500, -500, 700, -3200, -1200, 5000, -1000],
  interestRate: 1.3,
  pin: 4444,
};
const accounts = [account1, account2, account3, account4];

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
function handleLogin() {
  const userValue = inputUser.value.toLowerCase();
  const pinValue = Number(inputPin.value);
  
  currentAccount = accounts.find(
    acc => acc.owner.split(' ')[0].toLowerCase() === userValue
  );

  if (currentAccount?.pin === pinValue) {
    const firstName = currentAccount.owner.split(' ')[0];
    labelUser.textContent = `Hello, ${firstName}`;
    labelheading.textContent = `Welcome back, ${firstName}`;

    containerMain.classList.remove('hidden');
    containerMain.classList.add('visible');
    topBar.classList.remove('hidden');
    sidebar.classList.remove('sidebar-hidden');
    loginLayout.classList.add('hidden');


    displayMovements(currentAccount.movements);
    calcDisplayBalance(currentAccount.movements);

    inputUser.value = inputPin.value = '';
    inputPin.blur();
  } else {
    alert('Wrong login!');
  }
}

// Attach to both buttons
loginButton.addEventListener('click', function(e) {
  e.preventDefault();
  handleLogin();
});

btnLogin.addEventListener('click', function(e) {
  e.preventDefault();
  handleLogin();
});
const calcDisplaySummary = function (movements) {
  const incomes = movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `$${incomes}`;

  const outcome = movements.filter(mov => mov < 0).reduce((acc, mov) => acc +mov, 0);
  labelSumOut.textContent=`$${Math.abs(outcome)}`;
  
  const interest = movements.filter(mov => mov > 0).map(deposit => (deposit * account1.interestRate) / 100)
  .filter((int, i, arr) => {
   
    return int >= 1;
      }).reduce((acc, int) => acc + int, 0);
        labelSumInterest.textContent = `$${interest}`;


}

calcDisplaySummary(account1.movements);


