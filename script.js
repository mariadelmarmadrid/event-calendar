const events = [
  { day: 2, month: "OCT", title: "Málaga Tech Meetup #42", place: "The Green Ray · 19:00", type: "meetup", label: "Meetup", color: "var(--blue)" },
  { day: 8, month: "OCT", title: "Workshop: IA generativa desde cero", place: "La Farola · 18:30", type: "workshop", label: "Workshop", color: "var(--purple)" },
  { day: 15, month: "OCT", title: "South Summit Málaga", place: "Palacio de Ferias · 09:00", type: "conference", label: "Conferencia", color: "var(--orange)" },
  { day: 22, month: "OCT", title: "Networking & Beers", place: "La Fábrica · 20:00", type: "networking", label: "Networking", color: "var(--green)" },
  { day: 29, month: "OCT", title: "Frontend Friends Málaga", place: "Málaga TechPark · 18:00", type: "meetup", label: "Meetup", color: "var(--blue)" },
];

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const state = { year: 2025, month: 9, filter: "all" };
const calendarDays = document.querySelector("#calendar-days");
const monthLabel = document.querySelector("#month-label");
const eventList = document.querySelector("#event-list");

function renderCalendar() {
  const firstDay = new Date(state.year, state.month, 1);
  const daysInMonth = new Date(state.year, state.month + 1, 0).getDate();
  const mondayIndex = (firstDay.getDay() + 6) % 7;
  const visibleEvents = events.filter((event) => state.filter === "all" || event.type === state.filter);
  calendarDays.innerHTML = "";
  monthLabel.innerHTML = `${monthNames[state.month]} <span>${state.year}</span>`;

  for (let i = 0; i < mondayIndex; i += 1) {
    calendarDays.insertAdjacentHTML("beforeend", '<div class="calendar-day empty"></div>');
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const dayEvents = visibleEvents.filter((event) => event.day === day && state.month === 9);
    const isToday = day === 7 && state.month === 9 && state.year === 2025;
    const markers = dayEvents.map((event) => `<i class="event-marker" style="background:${event.color}" title="${event.label}"></i>`).join("");
    calendarDays.insertAdjacentHTML("beforeend", `
      <div class="calendar-day ${isToday ? "today selected-day" : ""}">
        <span>${day}</span>
        ${markers ? `<div class="event-markers">${markers}</div>` : ""}
      </div>
    `);
  }
}

function renderEvents() {
  const filtered = events.filter((event) => state.filter === "all" || event.type === state.filter);
  eventList.innerHTML = filtered.slice(0, 4).map((event) => `
    <article class="event-item">
      <div class="event-date"><strong>${event.day}</strong>${event.month}</div>
      <div><h4>${event.title}</h4><p>${event.place}</p><span class="event-tag"><i class="dot" style="background:${event.color}"></i>${event.label}</span></div>
    </article>
  `).join("") || '<p class="event-tag">No hay eventos con este filtro todavía.</p>';
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    button.classList.add("active");
    state.filter = button.dataset.filter;
    renderCalendar();
    renderEvents();
  });
});

document.querySelector("#previous-month").addEventListener("click", () => {
  state.month -= 1;
  if (state.month < 0) { state.month = 11; state.year -= 1; }
  renderCalendar();
});
document.querySelector("#next-month").addEventListener("click", () => {
  state.month += 1;
  if (state.month > 11) { state.month = 0; state.year += 1; }
  renderCalendar();
});
document.querySelector("#today-button").addEventListener("click", () => {
  state.year = 2025;
  state.month = 9;
  renderCalendar();
});
document.querySelector("#theme-toggle").addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme === "dark";
  document.documentElement.dataset.theme = isDark ? "light" : "dark";
  localStorage.setItem("techpulse-theme", isDark ? "light" : "dark");
});

const savedTheme = localStorage.getItem("techpulse-theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
renderCalendar();
renderEvents();
