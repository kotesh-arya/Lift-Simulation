const liftCount = document.querySelector(".lift-count");
const floorCount = document.querySelector(".floor-count");
const generateBtn = document.querySelector("#generate-btn");
const liftSpace = document.querySelector(".lift-space");
const alertSpace = document.querySelector(".alert");
const liftsSection = document.createElement("div");
liftsSection.className = "lifts-section";

const windowSpace = document.getElementById("window");
windowSpace.innerHTML = window.innerWidth;

function resizeElements() {
  const floors = [...document.querySelectorAll(".floor")];
  floors.map((floor) => {
    floor.style.height = `${window.innerWidth / 6.98}px`;
    const buttons = [...floor.childNodes[0].childNodes];
    buttons.map((button) => {
      button.style.width = `${window.innerWidth / 19.2}px`;
      button.style.height = `${window.innerWidth / 19.2}px`;
      button.style.fontSize = `${window.innerWidth / 96}px`;
    });
  });
  const lifts = [...document.querySelectorAll(".lift")];
  lifts.map((lift) => {
    lift.style.width = `${window.innerWidth / 15.36}px`;
    lift.childNodes[0].style.height = `${window.innerWidth / 7.68}px`;
    lift.childNodes[1].style.height = `${window.innerWidth / 7.68}px`;

    lift.style.height = `${window.innerWidth / 7.68}px`;
  });
  const leftDoor = document.querySelector(".left-door");
  const rightDoor = document.querySelector(".right-door");

  leftDoor.style.height = `${window.innerWidth / 7.68}px`;

  rightDoor.style.height = `${window.innerWidth / 7.68}px`;

  windowSpace.innerHTML = window.innerWidth;
}
window.addEventListener("resize", resizeElements);

const lifts = liftsSection.childNodes;

let liftMovingOrder = [1];
let sliced = liftMovingOrder.slice(-2);
// console.log(sliced);

function storeLiftRequest(position) {
  liftMovingOrder = [...liftMovingOrder, position];
  console.log(liftMovingOrder);
}
function moveLiftInOrder(position) {
  let sliced = liftMovingOrder.slice(-2);
  console.log("latest movement to be done", sliced[0], sliced[1]);
  for (let i = 0; i < liftMovingOrder.length - 1; i++) {
    if (sliced[0] === sliced[1]) {
      console.log("as both are same open and close doors!");
      // let staticLift = [...liftsSection.childNodes].find(
      //   (lift) => Number(lift.dataset.current) === position
      // );
      // staticLift.setAttribute("data-status", "busy");
    } else {
      console.log("as both are different now move lift to that floor");
      // let movingLift = [...liftsSection.childNodes].filter(
      //   (lift) => lift.dataset.status === "free"
      // )[0];
      // movingLift.setAttribute("data-status", "busy");
    }
  }
}

const generateFloorsWithLifts = () => {
  liftSpace.innerHTML = "";
  liftsSection.innerHTML = "";
  alertSpace.style.color = "white";

  setFloors();

  setLifts();

  const buttonUp = document.createElement("button");
  buttonUp.innerText = "UP";
  buttonUp.style.width = "5rem";
  buttonUp.style.height = "3rem";
  buttonUp.style.padding = "10px";
  const removableDownBtn = liftSpace.childNodes[0].childNodes[0].childNodes[1];
  liftSpace.childNodes[0].childNodes[0].removeChild(removableDownBtn);
  let floorNum = liftSpace.childNodes.length;
  const removableUpBtn =
    liftSpace.childNodes[floorNum - 1].childNodes[0].childNodes[0];
  liftSpace.childNodes[floorNum - 1].childNodes[0].removeChild(removableUpBtn);

  showEmptyError();
  const lifts = [...document.querySelectorAll(".lift")];
  lifts.map((lift) => {
    lift.style.width = `${window.innerWidth / 15.36}px`;
  });
  const floors = [...document.querySelectorAll(".floor")];
  floors.map((floor) => {
    floor.style.height = `${window.innerWidth / 6.98}px`;
    const buttons = [...floor.childNodes[0].childNodes];
    buttons.map((button) => {
      button.style.width = `${window.innerWidth / 19.2}px`;
      button.style.height = `${window.innerWidth / 19.2}px`;
      button.style.fontSize = `${window.innerWidth / 96}px`;
    });
  });
};
generateBtn.addEventListener("click", generateFloorsWithLifts);
function setFloors() {
  if (floorCount.value && Number(floorCount.value) >= 2) {
    for (let i = 1; i < Number(floorCount.value) + 1; i++) {
      const floorSingle = document.createElement("div");
      floorSingle.className = "floor";

      liftSpace.prepend(floorSingle);

      const buttons = document.createElement("div");
      buttons.className = "buttons";

      const buttonUp = document.createElement("div");
      buttonUp.className = "button-up";
      buttonUp.innerText = "UP";
      buttonUp.addEventListener("click", () => {
        storeLiftRequest(i);
        moveLiftInOrder(i);
        // if( there is any lift with status free){
        //   then trigger the moveLiftInOrder(i);
        // }else{
        // store the coming request in an array(the "i")
        // }
      });

      const buttonDown = document.createElement("div");
      buttonDown.className = "button-down";
      buttonDown.innerText = "DOWN";
      buttonDown.addEventListener("click", () => {

        storeLiftRequest(i);
        moveLiftInOrder(i);
      });

      buttons.append(buttonUp, buttonDown);

      floorSingle.append(buttons, liftsSection);
    }
  } else {
    alertSpace.innerHTML = `<p>Please Enter valid floor input Value</p>`;
  }
}

function setLifts() {
  if (liftCount.value && Number(liftCount.value) > 0) {
    for (let i = 1; i < Number(liftCount.value) + 1; i++) {
      const leftDoor = document.createElement("div");
      leftDoor.className = "left-door";
      leftDoor.style.height = `${window.innerWidth / 7.68}px`;
      leftDoor.style.width = `${window.innerWidth / 6.98}px`;

      const rightDoor = document.createElement("div");
      rightDoor.className = "right-door";
      rightDoor.style.height = `${window.innerWidth / 7.68}px`;
      rightDoor.style.width = `${window.innerWidth / 6.98}px`;

      const lift = document.createElement("div");
      lift.setAttribute("data-status", "free");
      lift.setAttribute("data-current", 1);
      lift.className = "lift";

      lift.style.width = `${window.innerWidth / 15.36}px`;
      lift.style.height = `${window.innerWidth / 7.68}px`;
      lift.style.marginRight = `${window.innerWidth / 51.2}px`;
      lift.style.marginTop = `${window.innerWidth / 153.6}px`;

      lift.append(leftDoor, rightDoor);
      const liftsSection = document.querySelector(".lifts-section");
      liftsSection.append(lift);
      let numberOfFloors = liftSpace.childNodes.length;
      liftSpace.childNodes[numberOfFloors - 1].append(liftsSection);
    }
  } else {
    liftSpace.innerHTML = `<p>Please Enter valid lift input Value</p>`;
    console.log("please add more than 0 floors");
  }
}
function showEmptyError() {
  if (Number(floorCount.value) < 2 || Number(liftCount.value) < 1) {
    liftSpace.innerHTML = `<p>Please Enter valid input Values</p>`;
  }
}

function doorsMovement() {
  setTimeout(() => {
    const leftDoor = staticLift.childNodes[0];
    const rightDoor = staticLift.childNodes[1];
    leftDoor.style.transition = "width 2.5s";
    rightDoor.style.transition = "width 2.5s";
    leftDoor.style.width = "0px";
    rightDoor.style.width = "0px";
  }, 0);
  setTimeout(() => {
    const leftDoor = staticLift.childNodes[0];
    const rightDoor = staticLift.childNodes[1];
    leftDoor.style.transition = "width 5s";
    rightDoor.style.transition = "width 5s";
    leftDoor.style.width = `${window.innerWidth / 6.98}px`;
    rightDoor.style.width = `${window.innerWidth / 6.98}px`;
    staticLift.setAttribute("data-status", "free");
    console.log(
      staticLift.dataset.status,
      "is",
      typeof staticLift.dataset.status
    );
    staticLift.setAttribute("data-current", position);
  }, 3000);
}
function liftMovement() {
  movingLift.style.transition = `bottom ${
    Math.abs(sliced[0] - sliced[1]) * 2
  }s`;

  movingLift.style.bottom = `${
    (window.innerWidth / 6.98) * sliced[1] +
    (sliced[1] - 1 * (window.innerWidth / 153.6)) +
    sliced[1] * (window.innerWidth / 153.6) -
    window.innerWidth / 7.31 -
    window.innerWidth / 139.6
  }px`;
  setTimeout(() => {
    const leftDoor = movingLift.childNodes[0];
    const rightDoor = movingLift.childNodes[1];
    leftDoor.style.transition = "width 2.5s";
    rightDoor.style.transition = "width 2.5s";
    leftDoor.style.width = "0px";
    rightDoor.style.width = "0px";
  }, Math.abs(sliced[1] - sliced[0]) * 2000);
  setTimeout(() => {
    const leftDoor = movingLift.childNodes[0];
    const rightDoor = movingLift.childNodes[1];
    leftDoor.style.transition = "width 5s";
    rightDoor.style.transition = "width 5s";
    leftDoor.style.width = `${window.innerWidth / 6.98}px`;
    rightDoor.style.width = `${window.innerWidth / 6.98}px`;
  }, Math.abs(sliced[1] - sliced[0]) * 2000 + 3000);

  setTimeout(() => {
    movingLift.setAttribute("data-status", "free");
    movingLift.setAttribute("data-current", sliced[1]);

    console.log(
      "moved lift updated current value",
      movingLift.getAttribute("data-current")
    );
    console.log("lift is now", movingLift.dataset.status);
  }, Math.abs(sliced[1] - sliced[0]) * 2000 + 6000);
}
