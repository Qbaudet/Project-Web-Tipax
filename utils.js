//Function to calculate the final amount after adding the tax to the base price
function calculateFinalAmount(checkBasePrice, taxRate, tipRate) {
    const finalAmount = checkBasePrice + (checkBasePrice * (taxRate / 100)) + (checkBasePrice * (tipRate / 100));
    return finalAmount;
}

module.exports = calculateFinalAmount;