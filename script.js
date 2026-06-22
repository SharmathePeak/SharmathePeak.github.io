// year in footer
document.getElementById("yr").textContent = new Date().getFullYear();

// cursor glow follows mouse
const glow = document.getElementById("cursor-glow");
document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// scroll progress bar
const bar = document.getElementById("progress");
window.addEventListener("scroll", () => {
  const pct =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  bar.style.width = pct + "%";
});

// fade in sections on scroll
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".fade-in").forEach((el) => obs.observe(el));

// project card radial gradient follows cursor
document.querySelectorAll(".proj-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty(
      "--mx",
      ((e.clientX - r.left) / r.width) * 100 + "%",
    );
    card.style.setProperty(
      "--my",
      ((e.clientY - r.top) / r.height) * 100 + "%",
    );
  });
});

// terminal typewriter
const termBody = document.getElementById("term-body");
const lines = [
  { type: "out", text: "" },
  { type: "out", text: "  name    :  Vikram Aditya", hl: true },
  { type: "out", text: "  status  :  Studying @ BITS Hyderabad" },
  { type: "out", text: "  focus   :  Systems programming, low-level C/C++" },
  { type: "out", text: "  hobbies :  Linux ricing, drawing, game dev" },
  {
    type: "out",
    text: "  vibes   :  Good Night Eri, Steins;Gate, Chainsaw Man",
  },
  { type: "out", text: "  author  :  Tatsuki Fujimoto", hl: true },
  { type: "out", text: "" },
  { type: "prompt", cmd: "echo $LEARNING_PATH" },
  {
    type: "out",
    text: '  <span style="color:#22c55e">Python</span> → <span style="color:#22c55e">C++</span> → <span style="color:#eab308">C</span> → <span style="color:#eab308">Zig</span> → <span style="color:#6b6b7e">Rust</span> → <span style="color:#6b6b7e">Assembly</span>',
  },
  { type: "out", text: "" },
  { type: "prompt", cmd: "", cursor: true },
];

let i = 0;
function addLine() {
  if (i >= lines.length) return;
  const l = lines[i++];
  const div = document.createElement("div");
  if (l.type === "prompt") {
    div.className = "term-line";
    div.innerHTML = `<span class="term-prompt">~$</span><span class="term-cmd"> ${l.cmd || ""}</span>${l.cursor ? '<span class="cursor-blink"></span>' : ""}`;
  } else {
    div.className = "term-line";
    div.innerHTML = `<span class="term-out${l.hl ? " highlight" : ""}">${l.text || "&nbsp;"}</span>`;
  }
  termBody.appendChild(div);
  setTimeout(addLine, l.text === "" ? 60 : l.type === "prompt" ? 300 : 80);
}

// kick off typewriter when about section enters view
const aboutSec = document.getElementById("about");
const termObs = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(addLine, 400);
      termObs.disconnect();
    }
  },
  { threshold: 0.3 },
);
termObs.observe(aboutSec);

