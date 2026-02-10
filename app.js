const API = "https://bible-api.com/";

const bookSelect = document.getElementById("book");
const chapterSelect = document.getElementById("chapter");
const verseSelect = document.getElementById("verse");
const verseBox = document.getElementById("verseBox");
const searchInput = document.getElementById("searchInput");
const bookmarksList = document.getElementById("bookmarks");

const books = [
  "Genesis","Exodus","Leviticus","Numbers","Deuteronomy",
  "Joshua","Judges","Ruth","1 Samuel","2 Samuel",
  "Matthew","Mark","Luke","John","Acts",
  "Romans","1 Corinthians","2 Corinthians",
  "Galatians","Ephesians","Philippians","Colossians",
  "1 Thessalonians","2 Thessalonians","Revelation"
];

// Load books
books.forEach(b => {
  const opt = document.createElement("option");
  opt.value = b;
  opt.textContent = b;
  bookSelect.appendChild(opt);
});

// Chapters
for (let i = 1; i <= 50; i++) {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = `Chapter ${i}`;
  chapterSelect.appendChild(opt);
}

// Verses
for (let i = 1; i <= 176; i++) {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = `Verse ${i}`;
  verseSelect.appendChild(opt);
}

async function loadVerse(ref) {
  const res = await fetch(API + ref);
  const data = await res.json();
  verseBox.textContent = data.text || "Verse not found 😭";
}

function updateVerse() {
  const ref = `${bookSelect.value} ${chapterSelect.value}:${verseSelect.value}`;
  loadVerse(ref);
}

bookSelect.onchange = updateVerse;
chapterSelect.onchange = updateVerse;
verseSelect.onchange = updateVerse;

// Search
document.getElementById("searchBtn").onclick = () => {
  loadVerse(searchInput.value);
};

// Dark mode
const themeToggle = document.getElementById("themeToggle");
document.body.classList.toggle(localStorage.theme || "");

themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.theme = document.body.classList.contains("dark") ? "dark" : "";
};

// Bookmarks
function loadBookmarks() {
  bookmarksList.innerHTML = "";
  const saved = JSON.parse(localStorage.bookmarks || "[]");
  saved.forEach(v => {
    const li = document.createElement("li");
    li.textContent = v;
    li.onclick = () => loadVerse(v);
    bookmarksList.appendChild(li);
  });
}

document.getElementById("bookmarkBtn").onclick = () => {
  const ref = `${bookSelect.value} ${chapterSelect.value}:${verseSelect.value}`;
  const saved = JSON.parse(localStorage.bookmarks || "[]");
  if (!saved.includes(ref)) {
    saved.push(ref);
    localStorage.bookmarks = JSON.stringify(saved);
    loadBookmarks();
  }
};

loadBookmarks();

// Verse of the Day
loadVerse("John 3:16");
