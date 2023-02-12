const cols = document.querySelectorAll(".col");
setRandomColors(true);

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code === "Space") setRandomColors();
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;
  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClipboard(event.target.textContent);
  }
});

function setRandomColors(isInitial) {
  const colors = isInitial ? parseLocationHash() : [];
  cols.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    let color;
    const text = col.querySelector("h2");
    const lock = col.querySelector("button");
    if (isInitial && colors) color = colors[index];
    else color = chroma.random();

    if (!isLocked) {
      if (!isInitial) colors.push(color);
      col.style.background = color;
      text.textContent = color;
      setTextColor(text, color);
      setTextColor(lock, color);
    } else if (!isInitial) colors.push(text.textContent);
    return;
  });

  setLocationHash(colors);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

function setLocationHash(colors = []) {
  document.location.hash = colors.join("-");
}

function parseLocationHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash.split("-");
  }
  return;
}

// function generateColor() {
//   const hexCodes = "0123456789ABCDEF";
//   let color = "";

//   for (let i = 0; i < 6; i++) {
//     color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
//   }

//   return "#" + color;
// }
