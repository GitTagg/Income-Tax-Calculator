const taxForm = document.querySelector("#taxForm");

taxForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const income = taxForm["incomeAmount"].value;
  const taxBasicRate = 0.2;
  const taxHigherRate = 0.4;
  const taxAdditionalRate = 0.45;

  //FUNCTION FOR YEARLY TAX CALCULATION

  function calculatorTax(income) {
    let taxableAmount = income - 12570;

    if (income < 12571) {
      return income;
    }

    //*--------------------- START CALCULATION-------------------------- *//

    // ------PERSONAL ALLOWANCE DOWN ABOVE £100,000 UP TO £125,140 e.g. £110,000 ------//

    if (income > 100000 && income < 125140) {
      let pA = income - 100000; //£10,000
      const newPersonalAllowance = pA / 2; //£5000

      const totalAllowance = 12570 - newPersonalAllowance; //£7570

      let resultAllowance = income - totalAllowance; //= £102,430
      const calcAllowance = resultAllowance - 37700; //£64730
      const totalPersCalc = calcAllowance * taxHigherRate; //£25,892
      const PersAllowanceAnswer = totalPersCalc + 7540; //33432
      return income - PersAllowanceAnswer; //76568
    }

    // ------TAX RATE 40% & 20% e.g. £60,000 & £35,000 AFTER £12,570 IS TAKEN ------//

    if (taxableAmount > 37700 && taxableAmount < 112300) {
      //£60,000 TAX CALCULATION @ 40%
      const highRate = taxableAmount - 37700; //9730
      let calc40 = taxHigherRate * highRate; //3892
      //THEN @ 20%
      let basicRate = taxableAmount - highRate; //37700
      let calc20 = basicRate * taxBasicRate; //7540
      //ADD THE TWO RESULTS TOGETHER
      let totalCalc = calc40 + calc20; //11432
      //RETURN INCOME - RESULTS
      return income - totalCalc;
    }
    //IF INCOME IS = OR UNDER £37,000 TAX WILL BE AT 20% ONLY
    else if (taxableAmount <= 37700) {
      //INCOME TAX @ 20%
      let totalBasic = taxableAmount * taxBasicRate; //4486
      let resultBasic = income - totalBasic; //30,514
      return resultBasic;
    }

    // ------NO PERSONAL ALLOWANCE ABOVE £125,140 e.g. £175,000 & £125,140 ------//
    if (income >= 125140) {
      let additionalRate = income - 37700; //87440

      if (additionalRate > 112300) {
        let addition = additionalRate - 112300; //25000
        let calc45 = addition * taxAdditionalRate; //11250
        const totalCalc = calc45 + 7540 + 44920; //63710
        return income - totalCalc; //111290
      } else {
        let totalAdditional = additionalRate * taxHigherRate; //34976

        let totalTaxAddition = totalAdditional + 7540; //42516
        return income - totalTaxAddition; //82624
      }
    }
  }

  //*--------------------- END CALCULATION-------------------------- *//

  //-------------------------* START EXECUTION OF CALCULATION*--------------------------//

  //FUNCTION FOR INCOME TAX YOU'LL PAY

  function incomeTaxPay(income) {
    let taxableAmount = income - 12570;
    //-------NO TAX
    if (income < 12571) {
      return 0;
    }

    // ------PERSONAL ALLOWANCE DOWN ABOVE £100,000 UP TO £125,140 e.g. £110,000 ------//
    if (income > 100000 && income < 125140) {
      let pA = income - 100000; //£10,000
      const newPersonalAllowance = pA / 2; //£5000

      const totalAllowance = 12570 - newPersonalAllowance; //£7570

      let resultAllowance = income - totalAllowance; //= £102,430
      const calcAllowance = resultAllowance - 37700; //£64730
      const totalPersCalc = calcAllowance * taxHigherRate; //£25,892
      const PersAllowanceAnswer = totalPersCalc + 7540; //33432
      return PersAllowanceAnswer.toLocaleString("en-US"); //76568
    }

    // ------TAX RATE 40% & 20% e.g. £60,000@40% & £35,000@20% AFTER £12,570 IS TAKEN ------//

    if (taxableAmount > 37700 && taxableAmount < 112300) {
      const highRate = taxableAmount - 37700; //9730
      let calc40 = taxHigherRate * highRate; //3892
      //THEN @ 20%
      let basicRate = taxableAmount - highRate; //37700
      let calc20 = basicRate * taxBasicRate; //7540
      //ADD THE TWO RESULTS TOGETHER
      let totalCalc = calc40 + calc20; //11432
      //RETURN INCOME - RESULTS
      return totalCalc.toLocaleString("en-US");
    } else if (taxableAmount <= 37700) {
      //INCOME TAX @ 20%
      let totalBasic = taxableAmount * taxBasicRate; //4486
      return totalBasic.toLocaleString("en-US");
    }

    // ------NO PERSONAL ALLOWANCE ABOVE £125,140 e.g. £175,000 & £125,140 ------//

    if (income >= 125140) {
      let additionalRate = income - 37700; //87440

      if (additionalRate > 112300) {
        let addition = additionalRate - 112300; //25000
        let calc45 = addition * taxAdditionalRate; //11250
        const totalCalc = calc45 + 7540 + 44920; //63710
        return totalCalc.toLocaleString("en-US"); //111290
      } else {
        let totalAdditional = additionalRate * taxHigherRate; //34976

        let totalTaxAddition = totalAdditional + 7540; //42516
        return totalTaxAddition.toLocaleString("en-US"); //82624
      }
    }
  }

  //-------------------------* START EXECUTION OF CALCULATION*--------------------------//

  //Manipulating the DOM to show result.
  //document.querySelector("#taxedAmount").innerHTML = calculatorTax(income);

  document.querySelector("#incomeTaxPay").innerHTML = incomeTaxPay(income);
});
