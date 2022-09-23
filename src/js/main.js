const liftCount = document.querySelector(".lift-count");
const floorCount = document.querySelector(".floor-count");
const generateBtn = document.querySelector("#generate-btn");
const liftSpace = document.querySelector(".lift-space");
const alertSpace = document.querySelector(".alert");
const liftsSection = document.createElement("div");
liftsSection.className = "lifts-section";

const lifts = liftsSection.childNodes;

let liftMovingOrder = [];

function storeLiftRequest(position) {
  liftMovingOrder.push(position);
}
function moveLiftInOrder(position) {
  let stationaryLift = [...liftsSection.childNodes].find(
    (lift) => lift.dataset.status === "free"
  );
  if (Number(stationaryLift.dataset.current) === position) {
    doorsMovement(stationaryLift, position);
  } else {
    liftMovement(stationaryLift, position);
    doorsMovement(stationaryLift, position);
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
      buttonUp.innerText = "🔺";
      buttonUp.addEventListener("click", () => {
        handleLiftAvailability(i);
      });

      const buttonDown = document.createElement("button");
      buttonDown.className = "button-down";
      buttonDown.innerText = "🔻";
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

      const rightDoor = document.createElement("div");
      rightDoor.className = "right-door";

      const lift = document.createElement("div");
      lift.setAttribute("data-status", "free");
      lift.setAttribute("data-current", 1);
      lift.className = "lift";

      lift.append(leftDoor, rightDoor);
      const liftsSection = document.querySelector(".lifts-section");
      liftsSection.append(lift);
      let numberOfFloors = liftSpace.childNodes.length;
      liftSpace.childNodes[numberOfFloors - 1].append(liftsSection);
    }
  } else {
    liftSpace.innerHTML = `<p>Please Enter valid lift input Value</p>`;
  }
}
function showEmptyError() {
  if (Number(floorCount.value) < 2 || Number(liftCount.value) < 1) {
    liftSpace.innerHTML = `<p>Please Enter valid input Values</p>`;
  }
}
function handleLiftAvailability(position) {
  if (
    [...liftsSection.childNodes].find((lift) => lift.dataset.status === "free")
  ) {
    moveLiftInOrder(position);
  } else {
    storeLiftRequest(position);
  }
}
function doorsMovement(lift, position) {
  lift.setAttribute("data-status", "busy");
  let distance = Math.abs(Number(lift.dataset.current) - position);
  setTimeout(() => {
    const leftDoor = lift.childNodes[0];
    const rightDoor = lift.childNodes[1];
    leftDoor.style.transition = "width 2.5s";
    rightDoor.style.transition = "width 2.5s";
    leftDoor.style.width = "0px";
    rightDoor.style.width = "0px";
  }, distance * 1000 + 1800);
  setTimeout(() => {
    const leftDoor = lift.childNodes[0];
    const rightDoor = lift.childNodes[1];
    leftDoor.style.transition = "width 2.3s";
    rightDoor.style.transition = "width 2.3s";
    leftDoor.style.width = "50px";
    rightDoor.style.width = "50px";
    lift.setAttribute("data-status", "free");
    lift.setAttribute("data-current", position);
  }, distance * 1000 + 5200);
}
function liftMovement(lift, position) {
  let distance = Math.abs(Number(lift.dataset.current) - position);
  console.log(distance);
  lift.setAttribute("data-status", "busy");

  lift.style.transition = `bottom ${distance * 2}s`;
  lift.style.bottom = `${170 * (position - 1)}px`;
  console.log(lift.style.bottom);
  doorsMovement(lift, position);
  console.log(liftMovingOrder);
  setTimeout(() => {
    if (liftMovingOrder.length > 0) {
      liftMovement(lift, liftMovingOrder[0]);
      liftMovingOrder.shift();
    }
  }, distance * 1000 + 6800);
}
