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
  // let sliced = liftMovingOrder.slice(-2);
  // console.log("latest movement to be done", sliced[0], sliced[1]);
  let stationaryLift = [...liftsSection.childNodes].find(
    (lift) => lift.dataset.status === "free"
  );
  console.log(stationaryLift);
  // for (let i = 0; i < liftMovingOrder.length - 1; i++) {
  if (Number(stationaryLift.dataset.current) === position) {
    console.log(" open and close doors!");
    // let staticLift = [...liftsSection.childNodes].find(
    //   (lift) => Number(lift.dataset.current) === position
    // );

    doorsMovement(stationaryLift, position);
  } else {
    liftMovement(stationaryLift, position);
    doorsMovement(stationaryLift, position);
  }
  // }
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

      const buttonUp = document.createElement("button");
      buttonUp.className = "button-up";
      buttonUp.innerText = "UP";
      buttonUp.addEventListener("click", () => {
        handleLiftAvailability(i);
      });

      const buttonDown = document.createElement("button");
      buttonDown.className = "button-down";
      buttonDown.innerText = "DOWN";
      buttonDown.addEventListener("click", () => {
        handleLiftAvailability(i);
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
function handleLiftAvailability(position) {
  // console.log(
  //   [...liftsSection.childNodes].find((lift) => lift.dataset.status === "free")
  // );
  if (
    [...liftsSection.childNodes].find((lift) => lift.dataset.status === "free")
  ) {
    moveLiftInOrder(position);
  } else {
    storeLiftRequest(position);
  }
}
function doorsMovement(staticLift, position) {
  staticLift.setAttribute("data-status", "busy");
  setTimeout(() => {
    const leftDoor = staticLift.childNodes[0];
    const rightDoor = staticLift.childNodes[1];
    leftDoor.style.transition = "width 2.5s";
    rightDoor.style.transition = "width 2.5s";
    leftDoor.style.width = "0px";
    rightDoor.style.width = "0px";
    console.log("doors opening");
  }, Math.abs(Number(staticLift.dataset.current) - position) * 1000);
  setTimeout(() => {
    const leftDoor = staticLift.childNodes[0];
    const rightDoor = staticLift.childNodes[1];
    leftDoor.style.transition = "width 5s";
    rightDoor.style.transition = "width 5s";
    leftDoor.style.width = `${window.innerWidth / 6.98}px`;
    rightDoor.style.width = `${window.innerWidth / 6.98}px`;
    console.log("doors closing");
    staticLift.setAttribute("data-status", "free");
    staticLift.setAttribute("data-current", position);
  }, Math.abs(Number(staticLift.dataset.current) - position) * 4000);
}
function liftMovement(stationaryLift, position) {
  console.log(" now move lift to that floor");
  stationaryLift.setAttribute("data-status", "busy");

  stationaryLift.style.transition = `bottom ${
    Math.abs(Number(stationaryLift.dataset.current) - position) * 2
  }s`;

  stationaryLift.style.bottom = `${
    (window.innerWidth / 6.98) * position +
    (position - 1 * (window.innerWidth / 153.6)) +
    position * (window.innerWidth / 153.6) -
    window.innerWidth / 7.31 -
    window.innerWidth / 139.6
  }px`;
  doorsMovement(stationaryLift, position);
  // setTimeout(() => {
  //   const leftDoor = stationaryLift.childNodes[0];
  //   const rightDoor = stationaryLift.childNodes[1];
  //   leftDoor.style.transition = "width 2.5s";
  //   rightDoor.style.transition = "width 2.5s";
  //   leftDoor.style.width = "0px";
  //   rightDoor.style.width = "0px";
  // }, Math.abs(position - Number(stationaryLift.dataset.current)) * 2000 + 1000);
  // setTimeout(() => {
  //   const leftDoor = stationaryLift.childNodes[0];
  //   const rightDoor = stationaryLift.childNodes[1];
  //   leftDoor.style.transition = "width 5s";
  //   rightDoor.style.transition = "width 5s";
  //   leftDoor.style.width = `${window.innerWidth / 6.98}px`;
  //   rightDoor.style.width = `${window.innerWidth / 6.98}px`;
  //   stationaryLift.setAttribute("data-status", "free");
  //   stationaryLift.setAttribute("data-current", position);

  //   console.log(
  //     "moved lift updated current value",
  //     stationaryLift.getAttribute("data-current")
  //   );
  //   console.log("lift is now", stationaryLift.dataset.status);
  // }, Math.abs(position - Number(stationaryLift.dataset.current)) * 2000 + 6000);
}
