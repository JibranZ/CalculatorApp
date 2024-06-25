document.addEventListener("DOMContentLoaded", function () {
  const displayElement = document.querySelector(".output");
  const clear = document.querySelector(".clear");

  clear.addEventListener("click", function () {
    outputElement.textContent = "";
  });
  document.querySelector(".container").addEventListener("click", function (e) {
    if (e.target.classList.contains("num")) {
      handleInput(e.target.textContent);
    }
  });
  document.addEventListener("keyup", function (e) {
    const key = e.key;
    if (isValidKey(key)) {
      e.preventDefault(); // Prevent default browser behavior for certain keys
      handleKeyboardInput(key);
    }
  });

  function isValidKey(key) {
    return (
      (key >= "0" && key <= "9") || // Numbers 0-9
      key === "." || // Decimal point
      key === "+" || // Addition
      key === "-" || // Subtraction
      key === "*" || // Multiplication
      key === "/" || // Division
      key === "Enter" || // Enter key
      key === "Backspace" || // Backspace key
      key === "Escape" // Escape key
    );
  }

  function handleInput(buttonText) {
    if (buttonText === "=") {
      try {
        displayElement.textContent = eval(
          displayElement.textContent.replace("x", "*")
        );
      } catch {
        displayElement.textContent = "Error";
      }
    } else if (buttonText === "CL" || buttonText === "Escape") {
      displayElement.textContent = "";
    } else {
      if (displayElement.textContent === "0") {
        displayElement.textContent = buttonText;
      } else if (buttonText === "Backspace") {
        if (displayElement.textContent.length >= 1) {
          displayElement.textContent = displayElement.textContent.slice(0, -1);
        } else {
          displayElement.textContent = "";
        }
      } else {
        displayElement.textContent += buttonText;
      }
    }
  }

  function handleKeyboardInput(key) {
    if (key === "Enter") {
      handleInput("=");
    } else if (key === "Backspace" || key === "Escape") {
      handleInput(key);
    } else {
      handleInput(key === "*" ? "x" : key);
    }
  }
});
