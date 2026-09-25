const status = document.querySelector("#status");
const incrementButton = document.querySelector("#increment");
const resetButton = document.querySelector("#reset");

let count = 0;

function formatCount(value) {
  return `Count: ${value}`;
}

function render(message) {
  status.innerHTML = `
    <strong>${formatCount(count)}</strong>
    <span>${message}</span>
  `;
}

incrementButton.addEventListener("click", () => {
  count += 1;
  render("This is still one classic script. Soon we will split it apart.");
});

resetButton.addEventListener("click", () => {
  count = 0;
  render("Reset complete. The app is small enough that one file still feels okay.");
});

render("Open AGENTS.md to see how a coding agent should teach the next steps.");
