/* =========================================================
   Mini Wallet (TRABAJO EN GRUPOS - TODO)
   (Se mantiene simple para que ellos lo programen.)
========================================================= */

let currentBalance = 0;
let movementList = [];
let currentHistoryFilter = "ALL";

function formatCurrencyCLP(valueNumber) {
  return "$ " + valueNumber.toLocaleString("es-CL");
}

function renderBalanceText() {
  $("#balanceText").text(formatCurrencyCLP(currentBalance));
}

function showAnimatedFeedback(messageText, feedbackType) {
  const $feedbackElement = $("#feedback");
  $feedbackElement.removeClass("alert-success alert-danger alert-warning alert-info");
  $feedbackElement.addClass(`alert-${feedbackType}`);
  $feedbackElement.text(messageText);
  $feedbackElement.stop(true, true).hide().slideDown(200);
  setTimeout(() => $feedbackElement.slideUp(200), 2000);
}

function validateAmountFromInput() {
  const amountInputValue = $("#amountInput").val();
  const amountNumber = Number(amountInputValue);

  if (!amountInputValue || Number.isNaN(amountNumber)) {
    return { isValid: false, errorMessage: "Ingresa un número válido." };
  }
  if (amountNumber <= 0) {
    return { isValid: false, errorMessage: "El monto debe ser mayor que 0." };
  }
  return { isValid: true, amountNumber };
}

function handleDepositClick() {
  const validationResult = validateAmountFromInput();
  if (!validationResult.isValid) return showAnimatedFeedback(validationResult.errorMessage, "warning");

  currentBalance += validationResult.amountNumber;

  movementList.unshift({
    movementType: "DEPOSIT",
    movementAmount: validationResult.amountNumber,
    movementDate: new Date().toLocaleString(),
  });

  renderBalanceText();
  $("#amountInput").val("");
  showAnimatedFeedback("Depósito realizado ✅", "success");

  // TODO: renderHistoryList();
}

function handleWithdrawClick() {
  const validationResult = validateAmountFromInput();
  if (!validationResult.isValid) return showAnimatedFeedback(validationResult.errorMessage, "warning");

  if (validationResult.amountNumber > currentBalance) {
    return showAnimatedFeedback("No puedes retirar más que tu saldo.", "danger");
  }

  currentBalance -= validationResult.amountNumber;

  movementList.unshift({
    movementType: "WITHDRAW",
    movementAmount: validationResult.amountNumber,
    movementDate: new Date().toLocaleString(),
  });

  renderBalanceText();
  $("#amountInput").val("");
  showAnimatedFeedback("Retiro realizado ✅", "info");

  // TODO: renderHistoryList();
}

// TODO: renderHistoryList(), delete (delegación), toggle, reset, filtros...

$(document).ready(function () {
  renderBalanceText();
  $("#depositBtn").on("click", handleDepositClick);
  $("#withdrawBtn").on("click", handleWithdrawClick);
});
