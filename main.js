// Course catalogue data: [name, description, ages[], area]
const AREA_COLOR = {
  "Creative Science": "#1B998B",
  "Engineering & Robotics": "#d9a400",
  "Coding": "#8E1F3F",
  "Creative Tech": "#6b3fa0",
  "Creative Design": "#0F2B4A",
};
const COURSES = [
  ["KideScience Stories", "Interactive science storytelling adventures.", ["3-5"], "Creative Science"],
  ["Creative Science Experiments", "The experiments that need an apron — reactions, bubbles, slime, and the questions that follow.", ["3-5", "6-9"], "Creative Science"],
  ["Science meets Art", "Colour, texture and chemistry together. The science is real; the work goes home on the fridge.", ["3-5"], "Creative Science"],
  ["Maths Whizz", "Number sense built through objects children can hold, sort and count.", ["3-5"], "Creative Science"],
  ["MakerSpace Science Lab", "A working lab session — hypothesis, experiment, result, and what to try differently next time.", ["6-9"], "Creative Science"],
  ["Maths Through Making", "Measurement, geometry and fractions discovered while building something that has to fit.", ["6-9"], "Creative Science"],
  ["Climate Science", "How the planet works and what is changing it, through experiments children run themselves using Forward Education Climate Kits.", ["6-9", "10-13"], "Creative Science"],
  ["MakerSpace Science and Electronics Lab", "Longer-form investigation, with circuits, sensors and components.", ["10-13"], "Creative Science"],

  ["BricksBot Builds", "Design and bring LEGO® robots to life.", ["3-5"], "Engineering & Robotics"],
  ["TLE Robotics Challenge", "Code and control robots in team competitions.", ["6-9", "10-13"], "Engineering & Robotics"],
  ["Strawbees Builders", "Wild inventions from colourful connectors and straws.", ["3-5", "6-9"], "Engineering & Robotics"],
  ["LEGO® Bricks 4 Kidz", "Build towers, bridges, race cars and more using customised Lego kits.", ["6-9", "10-13"], "Engineering & Robotics"],
  ["Snap Circuits", "Hands-on circuit building with snap-together components.", ["6-9"], "Engineering & Robotics"],
  ["Electronics Mini-Lab", "Real electronics with no soldering. Build a working circuit, break it, and work out why.", ["6-9", "10-13"], "Engineering & Robotics"],
  ["Drone Tech", "How drones fly, and flying one — pre-flight checks, control, and the physics underneath.", ["6-9", "10-13"], "Engineering & Robotics"],
  ["Engineering Design Thinking", "The method rather than the subject: define a real problem, prototype, test, fail and improve.", ["10-13", "14-16"], "Engineering & Robotics"],

  ["Non-Screen Coding Games", "Unplugged activities that introduce coding logic using the game puzzle platform Scottie GO!.", ["3-5", "6-9"], "Coding"],
  ["Game Design Studio: CodeCombat", "Real programming taught as a game, moving children from blocks towards written syntax with Python or JavaScript.", ["6-9", "10-13"], "Coding"],
  ["Gaming Quest", "Learn the logic and creativity behind the games children love to play.", ["10-13"], "Coding"],
  ["Junior Data Scientist", "Ask questions of data and find the answers.", ["10-13"], "Coding"],
  ["Computer Science", "Programming taught properly: data structures, algorithms, and how a machine actually executes what you wrote. The foundation for a computer science degree or a first developer job.", ["10-13", "14-16"], "Coding"],
  ["Game Design", "Mechanics, level design, playtesting and iteration. Students design a game, watch people fail at it, and fix what they got wrong.", ["14-16"], "Coding"],

  ["2D and 3D Animation", "Create digital characters and short animations.", ["6-9", "10-13"], "Creative Tech"],
  ["Sound and Technology", "Acoustics, recording, production and the maths underneath — where physics, music and software meet, on Soundtrap by Spotify.", ["6-9", "10-13", "14-16"], "Creative Tech"],
  ["AI Makers Lab", "Make images, music and stories with AI tools, and understand what the machine is actually doing.", ["6-9", "10-13"], "Creative Tech"],
  ["Podcast and Audio Storytelling", "Script, record, edit and publish. Children leave with something other people can listen to.", ["6-9", "10-13"], "Creative Tech"],
  ["Digital Film and Video Creation", "Plan, shoot and edit short films.", ["10-13"], "Creative Tech"],

  ["UX and App Design", "Design an app for someone who isn’t you. Children interview a real user, sketch screens and test them.", ["6-9", "10-13"], "Creative Design"],
  ["Product Design and 3D Printing", "From sketch to CAD to a printed object they can hold.", ["6-9", "10-13"], "Creative Design"],
  ["3D Design and Modelling", "Industry tools and industry thinking — model to specification, consider manufacture, and produce files that could actually be made.", ["14-16"], "Creative Design"],
];

const card = ([name, desc, ages, area]) => `
  <article class="course" style="--t:${AREA_COLOR[area]}">
    <span class="tag">${area}</span>
    <h4>${name}</h4>
    <p>${desc}</p>
    <p class="ages">Ages ${ages.join(", ").replace(/-/g, "–")}</p>
  </article>`;

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function renderAge(age) {
  $("#courseGrid").innerHTML = COURSES.filter(c => c[2].includes(age)).map(card).join("");
}
function renderArea(area) {
  const list = area === "All" ? COURSES
    : COURSES.filter(c => c[3] === area);
  $("#areaGrid").innerHTML = list.map(card).join("");
}
function activate(group, btn) {
  $$(".tab", group).forEach(b => b.classList.toggle("active", b === btn));
}

$("#ageTabs").addEventListener("click", e => {
  const b = e.target.closest(".tab"); if (!b) return;
  activate($("#ageTabs"), b); renderAge(b.dataset.age);
});
$("#areaTabs").addEventListener("click", e => {
  const b = e.target.closest(".tab"); if (!b) return;
  activate($("#areaTabs"), b); renderArea(b.dataset.area);
});
renderAge("3-5");
renderArea("All");

// Programme audience tabs
function showPanel(id) {
  $$(".panel").forEach(p => p.classList.toggle("active", p.id === id));
  $$("[data-tab]").forEach(b => b.classList.toggle("active", b.dataset.tab === id));
}
$$("[data-tab]").forEach(b => b.addEventListener("click", () => showPanel(b.dataset.tab)));

// Links that point at a panel (nav, footer) open that panel first
$$('a[href="#parents"],a[href="#schools"],a[href="#corporates"],a[href="#csr"]').forEach(a => {
  a.addEventListener("click", e => {
    const id = a.getAttribute("href").slice(1);
    const target = id === "csr" ? "corporates" : id;
    showPanel(target);
    e.preventDefault();
    const el = id === "csr" ? $("#csr") : $("#programmes");
    el.scrollIntoView({ behavior: "smooth" });
    closeMenu();
  });
});

// Mobile menu
const menu = $("#menu"), toggle = $(".nav-toggle");
function closeMenu() { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
$$("#menu a").forEach(a => a.addEventListener("click", closeMenu));

// Impact counters (animate once when visible)
const fmt = n => n.toLocaleString("en-US");
const suffix = { 12: "+", 40000: "+", 2000: "+", 1000: "+", 9: "" };
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    io.disconnect();
    $$("[data-count]").forEach(el => {
      const end = +el.dataset.count, t0 = performance.now(), dur = 1400;
      const tick = t => {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = fmt(Math.round(end * (1 - Math.pow(1 - p, 3)))) + (p === 1 ? suffix[end] : "");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  });
}, { threshold: 0.4 });
io.observe($("#stats"));

// Contact form -> mailto
$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = `Name: ${f.get("name")}\nI am a: ${f.get("who")}\nChild's age: ${f.get("age") || "-"}\n\n${f.get("msg")}`;
  location.href = `mailto:contact@stem-mets.com?subject=${encodeURIComponent("Website enquiry from " + f.get("name"))}&body=${encodeURIComponent(body)}`;
});

$("#yr").textContent = new Date().getFullYear();
