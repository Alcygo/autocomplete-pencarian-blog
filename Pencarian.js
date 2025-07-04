const style = document.createElement('style');
style.innerHTML = `
.gsc-input input.gsc-input {
  border: 1px solid #ddd;
  border-radius: 20px;
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
  max-height: none !important;
  overflow: hidden !important;
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
.autocomplete-suggestions div.selected {
  background-color: #e0e0e0;
  font-weight: bold;
}
`;
document.head.appendChild(style);
const input = document.querySelector(".gsc-input");
const suggestionBox = document.getElementById("suggestions");
let suggestions = [];
let selectedIndex = -1;
fetch("https://alcygo.github.io/autocomplete-pencarian-blog/suggestions.json")
  .then(res => res.json())
  .then(data => suggestions = data);
function showSuggestions(value) {
  suggestionBox.innerHTML = '';
  if (!value) return;
  const filtered = suggestions
    .filter(item => item.toLowerCase().includes(value.toLowerCase()))
    .slice(0, 5);
  filtered.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item;
    div.addEventListener('click', () => {
      input.value = item;
      suggestionBox.innerHTML = '';
      input.form.submit();
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
input.addEventListener('keydown', (e) => {
  const items = suggestionBox.querySelectorAll('div');
  if (e.key === 'ArrowDown') {
    selectedIndex = (selectedIndex + 1) % items.length;
    updateSelection(items);
    e.preventDefault();
  } else if (e.key === 'ArrowUp') {
    selectedIndex = (selectedIndex - 1 + items.length) % items.length;
    updateSelection(items);
    e.preventDefault();
  } else if (e.key === 'Enter' && selectedIndex >= 0) {
    items[selectedIndex].click();
    e.preventDefault();
  }
});
function updateSelection(items) {
  items.forEach((item, i) => {
    item.classList.toggle('selected', i === selectedIndex);
  });
}
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("gsc-input")) {
    suggestionBox.innerHTML = '';
  }
});
