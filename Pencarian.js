const style = document.createElement('style');
style.innerHTML = `
.gsc-input input.gsc-input {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.075);
  box-sizing: border-box;
  width: 100%;
}
.gsc-input input.gsc-input:focus {
  border-color: #66afe9;
  outline: 0;
  box-shadow:
    inset 0 1px 1px rgba(0,0,0,.075),
    0 0 8px rgba(102,175,233,.6);
}
.gsc-search-button {
  display: none;
}
.autocomplete-suggestions {
  position: absolute;
  background-color: white;
  box-shadow: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 9999;
}
.autocomplete-suggestions div {
  padding: 8px 12px;
  cursor: pointer;
  white-space: nowrap;
}
.autocomplete-suggestions div:hover {
  background-color: #f0f0f0;
}
`;
document.head.appendChild(style);

const input = document.querySelector(".gsc-input");
const suggestionBox = document.getElementById("suggestions");
let suggestions = [];

fetch("https://alcygo.github.io/autocomplete-pencarian-blog/suggestions.json")
  .then(res => res.json())
  .then(data => suggestions = data);

function showSuggestions(value) {
  suggestionBox.innerHTML = '';
  if (!value) return;
  const filtered = suggestions.filter(item =>
  item.toLowerCase().includes(value.toLowerCase())
);
  filtered.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item;
    div.addEventListener('click', () => {
      input.value = item;
      suggestionBox.innerHTML = '';
    });
    suggestionBox.appendChild(div);
  });
}

function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

input.addEventListener("input", debounce(function(e) {
  showSuggestions(e.target.value);
}, 300));

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("gsc-input")) {
    suggestionBox.innerHTML = '';
  }
});
