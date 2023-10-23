const calendar = document.getElementById('calendar');
const monthYearElement = document.getElementById('month-year');
let currentYear, currentMonth;

function createCalendar(year, month) {
  calendar.innerHTML = '';

  const currentDate = new Date();  
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  const numDays = endDate.getDate();
  const firstDayIndex = startDate.getDay();

  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];

  monthYearElement.textContent = `${getMonthName(month)} ${year}`;
  

  for (let day of days) {
    const dayHeader = document.createElement('div');
    dayHeader.classList.add('day');
    dayHeader.innerText = day;
    calendar.appendChild(dayHeader);
  }

  for (let i = 0; i < firstDayIndex; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('day', 'empty');
    calendar.appendChild(emptyDay);
  }

  let selectedDay = null;

  for (let i = 1; i <= numDays; i++) {
    const day = document.createElement('div');
    day.classList.add('day');

    // Marcamos el día actual
    if (year === currentYear && month === currentMonth && i === currentDay) {
      day.classList.add('selected');
      selectedDay = day;
    }

    const dayName = days[(firstDayIndex + i - 1) % 7];

    if (dayName === 'Dom' || (year < currentYear || (year === currentYear && month < currentMonth) || 
    (year === currentYear && month === currentMonth && i < currentDay))) {
      day.classList.add('disabled');
    } else {
      day.addEventListener('click', () => {
        if (selectedDay) {
          selectedDay.classList.remove('selected');
        }

        day.classList.add('selected');
        selectedDay = day;

        const selectedDate = new Date(year, month, i);
        const formattedDate = obtenerFechaFormateada(selectedDate);

        const divContenedor = document.querySelector('.fechaE__titulo');
        divContenedor.innerHTML = `<h2 class="fechaE__titulo">${formattedDate}</h2>`;

        const selectedDateElement = document.getElementById('selectedDate');
        selectedDateElement.textContent = formattedDate;

        alert(`Se seleccionó el día ${i}`);
      });
    }

    day.innerText = i;
    calendar.appendChild(day);
  }
  
  const formattedDate = obtenerFechaFormateada(currentDate);
  const divContenedor = document.querySelector('.fechaE__titulo');
  divContenedor.innerHTML = `<h2 class="fechaE__titulo">${formattedDate}</h2>`;
}

function getMonthName(month) {
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return monthNames[month];
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  createCalendar(currentYear, currentMonth);
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  createCalendar(currentYear, currentMonth);
}

const currentDate = new Date();
currentYear = currentDate.getFullYear();
currentMonth = currentDate.getMonth();

createCalendar(currentYear, currentMonth);


// Dia

function obtenerFechaFormateada(fecha) {
  const mesesAbreviados = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const diaSemana = dias[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = mesesAbreviados[fecha.getMonth()];
  const año = fecha.getFullYear();

  return `${diaSemana}, ${mes} ${dia}, ${año}`;
}

// Hora

let selectedButton = null;

// function selectHour(hourNumber) {
//   const buttons = document.querySelectorAll('.hour-button');
  
//   if (selectedButton) {
//     selectedButton.classList.remove('selected');
//   }

//   const clickedButton = buttons[hourNumber - 1];
//   clickedButton.classList.add('selected');
//   selectedButton = clickedButton;

//   document.getElementById('selected-hour').innerText = clickedButton.innerText;

//   showMessage(clickedButton.innerText);
// }

// function showMessage(hour) {
//   console.log('Hora Seleccionada:', hour);
// }


function selectHour(hourNumber) {
  const buttons = document.querySelectorAll('.hour-button');

  if (selectedButton) {
    selectedButton.classList.remove('selected');
  }

  const clickedButton = buttons[hourNumber - 1];
  clickedButton.classList.add('selected');
  selectedButton = clickedButton;

  const selectedHourElement = document.getElementById('selectedHour');
  const selectedHour = clickedButton.innerText;
  selectedHourElement.textContent = selectedHour;

  const selectedDateElement = document.getElementById('selectedDate');
  const selectedDate = obtenerFechaFormateada(new Date(currentYear, currentMonth, selectedDay.innerText));
  const selectedDateTime = `${selectedDate}, ${currentYear} a las ${selectedHour}`;
  selectedDateElement.textContent = selectedDateTime;

  showMessage(selectedHour);
}