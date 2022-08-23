const liftCount = document.querySelector(".lift-count");
const floorCount = document.querySelector(".floor-count");
const generateBtn = document.querySelector("#generate-btn");
const liftSpace = document.querySelector(".lift-space");
const alertSpace = document.querySelector(".alert");
console.log(liftSpace.childNodes);



const generateFloorsWithLifts = () => {
  alertSpace.style.color = "white";

  function setFloors ()  {
    for (let i = 1; i < Number(floorCount.value) + 1; i++) {
      if (floorCount.value && Number(floorCount.value) >= 2) {
        const floorSingle = document.createElement("div");
        floorSingle.className = "floor";

        liftSpace.prepend(floorSingle);

        const buttons = document.createElement("div");
        buttons.className = "buttons";

        const buttonUp = document.createElement("button");
        buttonUp.className = "button-up";
        buttonUp.innerText = "UP";
       

        const buttonDown = document.createElement("button");
        buttonDown.className = "button-down";
        buttonDown.innerText = "DOWN";
       

        buttons.append(buttonUp, buttonDown);

        floorSingle.append(buttons);
      } else {
        alertSpace.innerText = "Please Enter valid input Values";
      }
    }

    generateBtn.style.backgroundColor = "rgba(255, 68, 0, 0.332)";
    generateBtn.style.color = "Black";
    console.log(generateBtn);
  };
  setFloors();
  function setLifts ()  {
    for (let i = 1; i < Number(liftCount.value) + 1; i++) {
      if (liftCount.value && Number(liftCount.value) >= 1) {
        const leftDoor = document.createElement("div");
        leftDoor.className = "left-door";

        const rightDoor = document.createElement("div");
        rightDoor.className = "right-door";

        const lift = document.createElement("div");
        lift.setAttribute("data-previous", "floor-index");
        lift.setAttribute("data-busy", false);
        lift.setAttribute("data-current", "floor-index");
        lift.className = "lift";
        lift.style.transition = "bottom 4s";

        console.log(leftDoor, rightDoor);
        lift.append(leftDoor, rightDoor);
        let floorNum = liftSpace.childNodes.length;
        liftSpace.childNodes[floorNum - 1].append(lift);

        setTimeout(() => {
          leftDoor.style.width = "0px";
          rightDoor.style.width = "0px";
        }, 2000);
        setTimeout(() => {
          leftDoor.style.transition = "width 9s";
          rightDoor.style.transition = "width 9s";
          leftDoor.style.width = "200px";
          rightDoor.style.width = "200px";
        }, 6000);
        // };
      } else {
        alertSpace.innerText = "Please Enter valid input Values";
      }
    }
  };
  setLifts();

  const buttonUp = document.createElement("button");
  buttonUp.innerText = "UP";
  buttonUp.style.width = "5rem";
  buttonUp.style.height = "3rem";
  buttonUp.style.padding = "10px";
  console.log(liftSpace.childNodes[0].childNodes[0].childNodes[1]);
  const removableDownBtn = liftSpace.childNodes[0].childNodes[0].childNodes[1];
  liftSpace.childNodes[0].childNodes[0].removeChild(removableDownBtn);
  let floorNum = liftSpace.childNodes.length;
  const removableUpBtn =
    liftSpace.childNodes[floorNum - 1].childNodes[0].childNodes[0];
  liftSpace.childNodes[floorNum - 1].childNodes[0].removeChild(removableUpBtn);
  function showElementReferences ()  {
    const leftDoor = document.querySelector(".left-door");
    console.log(leftDoor);
    const buttonUp = document.querySelector(".button-up");
    console.log(buttonUp);
  };
  showElementReferences();
};
generateBtn.addEventListener("click", generateFloorsWithLifts);