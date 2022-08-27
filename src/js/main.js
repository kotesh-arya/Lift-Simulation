const liftCount = document.querySelector(".lift-count");
const floorCount = document.querySelector(".floor-count");
const generateBtn = document.querySelector("#generate-btn");
const liftSpace = document.querySelector(".lift-space");
const alertSpace = document.querySelector(".alert");
const liftsSection = document.createElement("div");
liftsSection.className = "lifts-section";

function handleButton(position) {
  let liftsSectionArray = [...liftsSection.childNodes];
  let movableLift = liftsSectionArray
    .filter((lift) => lift.hasAttribute("data-status"))
    .filter((toBeMoved) => toBeMoved.dataset.status === "free")[0];

  liftsSection.childNodes.forEach((element) => {
    if (Number(element.dataset.current) === position) {
      console.log(
        "bhai same floor pe click kiya doors animation karr chup chaap!"
      );
      setTimeout(() => {
        const leftDoor = element.childNodes[0];
        const rightDoor = element.childNodes[1];
        leftDoor.style.transition = "width 2.5s";
        rightDoor.style.transition = "width 2.5s";
        leftDoor.style.width = "0px";
        rightDoor.style.width = "0px";
        console.log("door opened");
      }, 0);
      setTimeout(() => {
        const leftDoor = element.childNodes[0];
        const rightDoor = element.childNodes[1];

        leftDoor.style.transition = "width 2.5s";
        rightDoor.style.transition = "width 2.5s";
        leftDoor.style.width = "50px";
        rightDoor.style.width = "50px";
        console.log("door closed");
      }, 3000);

      element.setAttribute("data-current", position);
      return;
    } else {
      console.log(
        "now you should move the lift to particular button clicked floor "
      );
      // -------------------------lift moving logic------------

      movableLift.setAttribute("data-status", "busy");
      movableLift.style.transition = `bottom ${position * 2}s`;
      movableLift.style.bottom = `${
        220 * position + (position - 1 * 10) + position * 10 - 210 - 11
      }px`;

      // -------------------------doors transition logic------------
      setTimeout(() => {
        const leftDoor = movableLift.childNodes[0];
        const rightDoor = movableLift.childNodes[1];
        leftDoor.style.transition = "width 2.5s";
        rightDoor.style.transition = "width 2.5s";
        leftDoor.style.width = "0px";
        rightDoor.style.width = "0px";
      }, position * 2000);
      setTimeout(() => {
        const leftDoor = movableLift.childNodes[0];
        const rightDoor = movableLift.childNodes[1];

        leftDoor.style.transition = "width 2.5s";
        rightDoor.style.transition = "width 2.5s";
        leftDoor.style.width = "50px";
        rightDoor.style.width = "50px";
      }, position * 2000 + 3000);
      // ---------------------------------------

      // ----------------lift status setting--------------
      setTimeout(() => {
        movableLift.setAttribute("data-status", "free");
        console.log(movableLift.getAttribute("data-status"));
      }, position * 2000 + 6000);
     
      movableLift.setAttribute("data-current", position);
    }
  });

  // for (let i = 0; i < liftsSection.childNodes.length; i++) {
  //   if (position === Number(liftsSection.childNodes[i].dataset.current)) {
  //     console.log(
  //       "bhai same floor pe click kiya doors animation karr chup chaap!"
  //     );
  //     // doors animation logic here
  //     console.log(position);

  //     let staticLift = liftsSectionArray.find(
  //       (lift) => Number(lift.dataset.current) === position
  //     );

  //     setTimeout(() => {
  //       console.log(staticLift.childNodes[0]);
  //       const leftDoor = staticLift.childNodes[0];
  //       const rightDoor = staticLift.childNodes[1];
  //       leftDoor.style.transition = "width 2.5s";
  //       rightDoor.style.transition = "width 2.5s";
  //       leftDoor.style.width = "0px";
  //       rightDoor.style.width = "0px";
  //       console.log("door opened");
  //     }, 0);
  //     setTimeout(() => {
  //       console.log(staticLift.childNodes[0]);
  //       const leftDoor = staticLift.childNodes[0];
  //       const rightDoor = staticLift.childNodes[1];

  //       leftDoor.style.transition = "width 2.5s";
  //       rightDoor.style.transition = "width 2.5s";
  //       leftDoor.style.width = "50px";
  //       rightDoor.style.width = "50px";
  //       console.log("door closed");
  //     }, 3000);

  //     staticLift.setAttribute("data-current", position);
  //     // --------------------

  //     return;
  //   } else {
  //     console.log(
  //       "now you should move the lift to particular button clicked floor "
  //     );
  //     // -------------------- lift-transition logic----------------

  //     // if (position === 1) {
  //     movableLift.style.transition = `bottom ${2}s`;

  //     movableLift.style.bottom = "0px";

  //     // } else {
  //     movableLift.setAttribute("data-status", "busy");
  //     movableLift.style.transition = `bottom ${position * 2}s`;
  //     movableLift.style.bottom = `${
  //       220 * position + (position - 1 * 10) + position * 10 - 210 - 11
  //     }px`;
  //     // }

  //     // -------------------------doors transition logic------------
  //     setTimeout(() => {
  //       const leftDoor = movableLift.childNodes[0];
  //       const rightDoor = movableLift.childNodes[1];
  //       leftDoor.style.transition = "width 2.5s";
  //       rightDoor.style.transition = "width 2.5s";
  //       leftDoor.style.width = "0px";
  //       rightDoor.style.width = "0px";
  //     }, position * 2000);
  //     setTimeout(() => {
  //       const leftDoor = movableLift.childNodes[0];
  //       const rightDoor = movableLift.childNodes[1];

  //       leftDoor.style.transition = "width 2.5s";
  //       rightDoor.style.transition = "width 2.5s";
  //       leftDoor.style.width = "50px";
  //       rightDoor.style.width = "50px";
  //     }, position * 2000 + 3000);
  //     // ---------------------------------------

  //     // ----------------lift status setting--------------
  //     setTimeout(() => {
  //       movableLift.setAttribute("data-status", "free");
  //       console.log(movableLift.getAttribute("data-status"));
  //     }, position * 2000 + 6000);
  //     // ------------------------------

  //     // -------------------
  //     movableLift.setAttribute("data-current", position);
  //   }
  // }

  console.log("button clicked at:", position);
}
const generateFloorsWithLifts = () => {
  liftSpace.innerHTML = "";
  liftsSection.innerHTML = "";
  alertSpace.style.color = "white";

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
          handleButton(i);
        });

        const buttonDown = document.createElement("div");
        buttonDown.className = "button-down";
        buttonDown.innerText = "DOWN";
        buttonDown.addEventListener("click", () => {
          handleButton(i);
        });

        buttons.append(buttonUp, buttonDown);

        floorSingle.append(buttons, liftsSection);
      }
    } else {
      alertSpace.innerHTML = `<p>Please Enter valid floor input Value</p>`;
    }
  }
  setFloors();

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
      console.log("please add more than 0 floors");
    }
  }
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
  function showEmptyError() {
    if (Number(floorCount.value) < 2 || Number(liftCount.value) < 1) {
      liftSpace.innerHTML = `<p>Please Enter valid input Values</p>`;
    }
  }
  showEmptyError();
};
generateBtn.addEventListener("click", generateFloorsWithLifts);
