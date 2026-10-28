const events = [
  { date: "2026-10-27T20:00:00+02:00", title: "Tech and beers v2 (MALAGA) - Summer Edition — We Don't Byte!", place: "El Rincón del Cervecero · 20:00", url: "https://www.meetup.com/startup-oasis/events/316851857/", type: "meetup", label: "Meetup", color: "var(--blue)" },
  { date: "2026-10-27T22:00:00+02:00", title: "Mundo Lingo Malaga", place: "Bakkano 2.0 · 22:00", url: "https://www.meetup.com/mundo-lingo-malaga/events/316886937/", type: "meetup", label: "Meetup", color: "var(--blue)" },
  { date: "2026-10-28T20:00:00+02:00", title: "Practice public speaking - PowerTalks Málaga \"Open House\"", place: "Innovation Campus · 20:00", url: "https://www.meetup.com/malaga-speaking-with-confidence-and-enthusiasm-meetup-group/events/316459977/", type: "meetup", label: "Meetup", color: "var(--blue)" },
  { date: "2026-10-28T20:00:00+02:00", title: "Practical Philosophy Meetup - Málaga", place: "Plaza de la Merced, 21 · 20:00", url: "https://www.meetup.com/practical-philosophy-club-malaga/events/316777246/", type: "meetup", label: "Meetup", color: "var(--blue)" },
  { date: "2026-10-29T18:00:00+01:00", title: "CLARIDAD BAJO PRESIÓN: Conversaciones difíciles, decisiones que se retrasan", place: "NIAGE GARAGE · 18:00", url: "https://www.meetup.com/shewins-es/events/316907658/", type: "meetup", label: "Meetup", color: "var(--blue)" },
  { date: "2026-10-29T18:00:00+01:00", title: "CHANGE OF TIME! Free yoga and meditation lesson for beginners", place: "Parque de Huelin · 18:00", url: "https://www.meetup.com/malaga-free-yoga-classes/events/316794725/", type: "meetup", label: "Meetup", color: "var(--blue)" },
  { date: "2026-10-29T20:45:00+02:00", title: "Social Board and Role Games!", place: "No Piqui · 20:45", url: "https://www.meetup.com/malaga-weekend-weekday-and-evening-adventures-meetup-group/events/317052798/", type: "meetup", label: "Meetup", color: "var(--blue)" },
  { date: "2026-10-30T22:00:00+02:00", title: "Mundo Lingo Halloween Party", place: "Pub Camden Lock · 22:00", url: "https://www.meetup.com/mundo-lingo-malaga/events/317076012/", type: "meetup", label: "Meetup", color: "var(--blue)" },
  { date: "2026-10-30T19:00:00+01:00", title: "Malaga Friday Club", place: "La Taberna De P · 19:00", url: "https://www.meetup.com/malaga-friday-club/events/316944710/", type: "meetup", label: "Meetup", color: "var(--blue)" },
  { date: "2026-10-30T22:00:00+02:00", title: "Social Fridays", place: "La Terraza de San Telmo · 22:00", url: "https://www.meetup.com/malaga-social/events/316927030/", type: "meetup", label: "Meetup", color: "var(--blue)" },
  { date: "2026-10-31T22:30:00+02:00", title: "Saturday International Meetup", place: "Terraza de San Telmo · 22:30", url: "https://www.meetup.com/malagastyle/events/316745877/", type: "meetup", label: "Meetup", color: "var(--blue)" },
  { date: "2026-11-01T18:00:00+01:00", title: "Speed Friending - One-to-One with Language Exchange", place: "CasaAmigos Málaga Centro · 18:00", url: "https://www.meetup.com/excursiones-exchange-actividades-meetup-group/events/316950476/", type: "meetup", label: "Meetup", color: "var(--blue)" },
  { date: "2026-11-05T18:00:00+01:00", title: "Discovery ProductTank Málaga", place: "Calle Molina Lario, 13 · 18:00", url: "https://www.meetup.com/producttank-malaga/events/317079324/", type: "meetup", label: "Meetup", color: "var(--blue)" },
  { date: "2026-11-11T19:00:00+01:00", title: "Practice public speaking - PowerTalks Málaga \"Open House\"", place: "Innovation Campus · 19:00", url: "https://www.meetup.com/malaga-speaking-with-confidence-and-enthusiasm-meetup-group/events/316459997/", type: "meetup", label: "Meetup", color: "var(--blue)" },
  { date: "2026-11-12T18:00:00+01:00", title: "I LOVE SELLING! How to shift what is holding you back when you sell?", place: "Innovation Campus · 18:00", url: "https://www.meetup.com/shewins-es/events/317143607/", type: "meetup", label: "Meetup", color: "var(--blue)" },
];

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const state = { year: 2026, month: 9, filter: "all" };
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
    const dayEvents = visibleEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === state.year
        && eventDate.getMonth() === state.month
        && eventDate.getDate() === day;
    });
    const isToday = day === 27 && state.month === 9 && state.year === 2026;
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
      <div class="event-date"><strong>${new Date(event.date).getDate()}</strong>${monthNames[new Date(event.date).getMonth()].slice(0, 3).toUpperCase()}</div>
      <div><h4><a href="${event.url}" target="_blank" rel="noreferrer">${event.title}</a></h4><p>${event.place}</p><span class="event-tag"><i class="dot" style="background:${event.color}"></i>${event.label}</span></div>
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
  state.year = 2026;
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
