document.addEventListener("DOMContentLoaded", function () {
  const billInput = document.getElementById("bill");
  const peopleInput = document.getElementById("people");
  const customTipInput = document.getElementById("custom-tip");
  const tipAmountDisplay = document.getElementById("tip-amount");
  const totalAmountDisplay = document.getElementById("total-amount");
  const resetBtn = document.getElementById("reset-btn");
  const tipBtns = document.querySelectorAll(".tip-btn");
  const errorMsg = document.querySelector(".error-msg");
  const peopleFormGroup = document.querySelector(".form-group:last-child");

  let billValue = 0;
  let peopleValue = 1;
  let tipValue = 0;

  billInput.addEventListener("input", calculateTip);
  peopleInput.addEventListener("input", calculateTip);
  customTipInput.addEventListener("input", handleCustomTip);
  resetBtn.addEventListener("click", resetCalculator);

  tipBtns.forEach((btn) => {
    btn.addEventListener("click", handleTipBtnClick);
  });

  // For each Tip button to have hover and click effects and go back to its original state
  function handleTipBtnClick(e) {
    tipBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    e.target.classList.add("active");
    customTipInput.value = "";
    tipValue = parseInt(e.target.value);
    calculateTip();
  }

  function handleCustomTip() {
    tipBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    tipValue = parseInt(customTipInput.value) || 0;
    calculateTip();
  }

  // To calculate the tip
  function calculateTip() {
    billValue = parseFloat(billInput.value) || 0;
    peopleValue = parseInt(peopleInput.value) || 0;

    if (peopleValue === 0) {
      peopleFormGroup.classList.add("error");
      errorMsg.style.display = "block";
      return;
    } else {
      peopleFormGroup.classList.remove("error");
      errorMsg.style.display = "none";
    }

    const tipAmount = (billValue * tipValue) / 100 / peopleValue;
    const totalAmount =
      (billValue + (billValue * tipValue) / 100) / peopleValue;

    tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
    totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;

    if (billValue > 0 || tipValue > 0 || peopleValue > 0) {
      resetBtn.disabled = false;
    } else {
      resetBtn.disabled = true;
    }
  }

  // In order to reset the calculator into empty values
  function resetCalculator() {
    billInput.value = "";
    peopleInput.value = "";
    customTipInput.value = "";
    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";
    resetBtn.disabled = true;

    tipBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    billValue = 0;
    peopleValue = 1;
    tipValue = 0;
    peopleFormGroup.classList.remove("error");
    errorMsg.style.display = "none";
  }
});
