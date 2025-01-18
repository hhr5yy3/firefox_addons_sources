class SnuDraggableMarker extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
    * {
    margin: 0px;
  }
  
  .draggable {
    position: fixed;
    /* right: 5%; Set initial position to the right */
    right: 0px;
    bottom: 70%; /* Adjust bottom position to around 70% */
    background-color: #4caf50; /* Default color */
    color: white;
    padding: 5px;
    cursor: pointer;
    z-index: 1000;
    /* min-width: 100px; */
    /* width: fit-content; Adjust width to fit the content */
    text-align: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: small;
  }
  
  .f {
    display: flex;
    flex-direction: row;
  }
  .f.btm {
    flex-direction: column;
  }
  
  /* Default border radius */
  .draggable.normal {
    border-radius: 5px;
  }
  
  /* Left side border radius */
  .draggable.left {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  
  /* Right side border radius */
  .draggable.right {
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  
  .draggable.bottom {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  
  .drag-handle {
    cursor: move;
    user-select: none;
  }
  
  .vertical {
    transform: rotate(90deg); /* Rotate the button for vertical orientation */
  }
  
  /* #buttonText {
    font-size: 64px;
  } */
  
  .vertical #buttonText {
    display: block; /* Make text stack vertically */
  }
       
        `;
    shadow.appendChild(style);

    // Add your HTML structure here
    const container = document.createElement('div');
    container.innerHTML = `
        <div id="snuInstanceButton" class="draggable">
        <div class="f">
          <div class="drag-handle">
            ​
            <svg
              width="15px"
              height="15px"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17C10.3284 17 11 17.6716 11 18.5ZM15.5 8C16.3284 8 17 7.32843 17 6.5C17 5.67157 16.3284 5 15.5 5C14.6716 5 14 5.67157 14 6.5C14 7.32843 14.6716 8 15.5 8ZM17 12.5C17 13.3284 16.3284 14 15.5 14C14.6716 14 14 13.3284 14 12.5C14 11.6716 14.6716 11 15.5 11C16.3284 11 17 11.6716 17 12.5ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z"
                fill="#ffffff"
              />
            </svg>
          </div>
            <svg
              id="cog"
              fill="#ffffff"
              width="15px"
              height="15px"
              viewBox="0 0 24 24"
              version="1.2"
              baseProfile="tiny"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.387 17.548l.371 1.482c.133.533.692.97 1.242.97h1c.55 0 1.109-.437 1.242-.97l.371-1.482c.133-.533.675-.846 1.203-.694l1.467.42c.529.151 1.188-.114 1.462-.591l.5-.867c.274-.477.177-1.179-.219-1.562l-1.098-1.061c-.396-.383-.396-1.008.001-1.39l1.096-1.061c.396-.382.494-1.084.22-1.561l-.501-.867c-.275-.477-.933-.742-1.461-.591l-1.467.42c-.529.151-1.07-.161-1.204-.694l-.37-1.48c-.133-.532-.692-.969-1.242-.969h-1c-.55 0-1.109.437-1.242.97l-.37 1.48c-.134.533-.675.846-1.204.695l-1.467-.42c-.529-.152-1.188.114-1.462.59l-.5.867c-.274.477-.177 1.179.22 1.562l1.096 1.059c.395.383.395 1.008 0 1.391l-1.098 1.061c-.395.383-.494 1.085-.219 1.562l.501.867c.274.477.933.742 1.462.591l1.467-.42c.528-.153 1.07.16 1.203.693zm2.113-7.048c1.104 0 2 .895 2 2 0 1.104-.896 2-2 2s-2-.896-2-2c0-1.105.896-2 2-2z"
              />
            </svg>
          <span id="buttonText"> InstanceName</span>
        </div>
      </div>
      `;

// debugger;
    shadow.appendChild(container);

    // JavaScript for functionality

    // Configuration object (can be replaced with a JSON object)
    const buttonConfig = {
      text: "InstanceName",
      color: "#4CAF50",
    };

    let actualButtonWidth = shadow.getElementById("snuInstanceButton").clientWidth;

    // Update button properties based on configuration
    function updateButtonProperties() {
      const buttonText = shadow.getElementById("buttonText");
      window.snuInstanceButton.style.backgroundColor = buttonConfig.color;
      buttonText.textContent = buttonConfig.text;
      actualButtonWidth = button.clientWidth;
    }

    // Initialize and handle dragging
    window.snuInstanceButton = shadow.getElementById("snuInstanceButton");
    const dragHandle = window.snuInstanceButton.querySelector(".drag-handle");

    dragHandle.addEventListener("mousedown", function (e) {
      window.snuIsDragging = true;
      e.preventDefault(); // Prevents unwanted text selection
    });

    shadow.querySelector("#cog").addEventListener("click", function () {
      alert("Todo: Do something cool onclick");
    });





    // Load position from localStorage and handle window resize
    // Load position from localStorage and handle window resize
    window.onload = window.onresize = function () {
      let savedPosition = JSON.parse(localStorage.getItem("buttonPosition"));
      const viewportHeight = document.documentElement.clientHeight - 100;
      if (savedPosition) {
        window.snuInstanceButton.style.right = "auto";
        window.snuInstanceButton.style.left = savedPosition.left;

        let x = viewportHeight - parseFloat(savedPosition.bottom);
        if (parseFloat(savedPosition.bottom) <= 0) {
          localStorage.setItem(
            "buttonPosition",
            JSON.stringify({
              left: window.snuInstanceButton.style.left,
              bottom: parseFloat(savedPosition.bottom) + x + "px",
            })
          );
        } else {
          localStorage.setItem(
            "buttonPosition",
            JSON.stringify({
              left: window.snuInstanceButton.style.left,
              bottom: parseFloat(savedPosition.bottom) + "px",
            })
          );
        }

        savedPosition = JSON.parse(localStorage.getItem("buttonPosition"));
        if (parseFloat(savedPosition.bottom) <= 45) {
          localStorage.setItem(
            "buttonPosition",
            JSON.stringify({
              left: window.snuInstanceButton.style.left,
              bottom: "45px",
            })
          );
          savedPosition = JSON.parse(localStorage.getItem("buttonPosition"));
        }

        window.snuInstanceButton.style.bottom = savedPosition.bottom;
        snapToEdge(
          parseInt(savedPosition.left, 10),
          parseInt(savedPosition.bottom, 10)
        );
      } else {
        // Set initial position on the right
        window.snuInstanceButton.style.right = "0px";
        window.snuInstanceButton.style.bottom = "30%"; // Adjust as needed
      }

      updateButtonProperties();
      snapToEdge(
        window.snuInstanceButton.getBoundingClientRect().left,
        window.snuInstanceButton.getBoundingClientRect().bottom
      );
    };

    // Update snapToEdge function
    // Update snapToEdge function
    // Update snapToEdge function
    function snapToEdge(clientX, clientY) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const shouldSnapLeft = clientX < windowWidth / 2;
      const shouldSnapBottom = windowHeight - clientY < 200;
      var snuInstanceButtonHeight = window.snuInstanceButton.clientHeight;

      // console.log(snuInstanceButtonHeight);
      let pos = Math.round(1.4375 * snuInstanceButtonHeight);
      console.log(actualButtonWidth);

      if (shouldSnapLeft && !shouldSnapBottom) {
        window.snuInstanceButton.style.left = `-${actualButtonWidth / 2 - 10}px`; // Snap to the left edge based on height
        window.snuInstanceButton.style.right = "auto";
        window.snuInstanceButton.classList.add("vertical", "left"); // Add left class
        window.snuInstanceButton.classList.remove("right", "normal"); // Remove right and normal classes
        rotateText(0); // Rotate text to 0 degrees
      } else if (!shouldSnapBottom) {
        window.snuInstanceButton.style.right = `-${actualButtonWidth / 2 - 10}px`; // Snap to the right edge based on height
        window.snuInstanceButton.style.left = "auto";
        window.snuInstanceButton.classList.add("vertical", "right"); // Add right class
        window.snuInstanceButton.classList.remove("left", "normal"); // Remove left and normal classes
        rotateText(-180); // Rotate text to -180 degrees
      }

      let x = shadow.querySelector(".f");
      if (shouldSnapLeft && !shouldSnapBottom) {
        x.style.flexDirection = "row";
        // } else if (!shouldSnapLeft && !shouldSnapBottom) {
        //   x.style.flexDirection = "column-reverse";
      } else {
        x.style.flexDirection = "row";
        rotateText(0);
      }

      if (shouldSnapBottom) {
        window.snuInstanceButton.style.right = "auto";
        if (parseFloat(window.snuInstanceButton.style.left) < 0) {
          window.snuInstanceButton.style.left = "25px";
        }

        window.snuInstanceButton.style.left = clientX + "px";
        // Fix for Bottom Right overflow
        if (windowWidth - clientX <= 64) {
          window.snuInstanceButton.style.left = clientX - 64 + "px";
        }

        window.snuInstanceButton.style.bottom = "0px";
        window.snuInstanceButton.classList.add("bottom");
        window.snuInstanceButton.classList.remove("left", "normal");
        window.snuInstanceButton.classList.remove("right", "normal");
        window.snuInstanceButton.classList.remove("vertical");
      }

      if (window.innerWidth - parseFloat(window.snuInstanceButton.style.left) <= 45) {
        window.snuInstanceButton.style.left = "auto";
        window.snuInstanceButton.style.right = "45px";
      }
    }

    // Update rotateText function
    function rotateText(degrees) {
      const buttonText = shadow.getElementById("buttonText");
      buttonText.style.transform = `rotate(${degrees}deg)`;
    }

    this.initializeDraggable();
  }

  initializeDraggable() {

  }
}

window.snuIsDragging = false;
if (window.self === window.top){
  customElements.define('snu-draggable-marker', SnuDraggableMarker);
  document.body.appendChild(document.createElement('snu-draggable-marker'));
}
else {


}

document.addEventListener("mousemove", function (e) {
  console.log(e);
  if (window.snuIsDragging) {
    // Calculate new position
    let x = e.clientX;
    let y = e.clientY;

    // Get window dimensions
    const windowWidth = window.top.document.documentElement.clientWidth;
    const viewportHeight = window.top.document.documentElement.clientHeight - 100;
    // Limit x to be within the window bounds
    x = Math.max(0, Math.min(x, windowWidth - window.snuInstanceButton.offsetWidth));

    // Limit y to be within the window bounds and stay above the top boundary
    y = Math.max(0, Math.min(y, viewportHeight - window.snuInstanceButton.offsetHeight));

    // Update button position
    window.snuInstanceButton.style.left = x + "px";
    window.snuInstanceButton.style.bottom = viewportHeight - y + "px";

    // Snap to edge while dragging
    snapToEdge(x, y);
  }
});

document.addEventListener("mouseup", function () {
  console.log("mouseup");
  if (window.snuIsDragging) {
    window.snuIsDragging = false;
    localStorage.setItem(
      "buttonPosition",
      JSON.stringify({
        left: window.snuInstanceButton.style.left,
        bottom: window.snuInstanceButton.style.bottom,
      })
    );
  }
});

