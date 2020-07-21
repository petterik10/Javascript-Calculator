import React, { useState } from "react";
import Header from "./Header";


function App() {

  const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
  const arithmeticOperations = ["/", "*", "-", "=", "+", ".", "AC"];

  const [currentCalculation, setCurrentCalculation] = useState("0");
  const [operator, setOperator] = useState(false);
  const [dotOperator, setDotOperator] = useState(false);
  const [nullOperator, setNullOperator] = useState(false);

  const handleClick = (event) => {
    const { innerText } = event.target;

    switch (innerText) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        // to check the current status of the calculation: 
        // if currentcalculation is 0, it should change it to pressed number
        // if nullOperator has been pressed, the pressed number should not be added to the currentcalculation
        // Otherwise the pressed number should be added to the currentcalculation
        if (currentCalculation === "0") {
          setCurrentCalculation(innerText);
        } else if (nullOperator) {
          setCurrentCalculation(currentCalculation);
        } else {
          setCurrentCalculation(currentCalculation + innerText);
        }
        setOperator(false);
        setDotOperator(false);
        break;

      case "0":
        // nullOperator:
        // if currentCalculation is 0, the currentCalculation should be changed to the pressed number
        // otherwise to check if nullOperator is set to false and operator has been pressed, add 0 to the end of the calculation
        // set nullOperator to true so that it can not be added twice
        if (currentCalculation === "0") {
          setCurrentCalculation(innerText);
        } else if (!nullOperator && operator) {
          setCurrentCalculation(currentCalculation + innerText);
          setNullOperator(true);

        } else if (nullOperator) {
          setCurrentCalculation(currentCalculation);
          setOperator(true);
        } else {
          setCurrentCalculation(currentCalculation + innerText);
        }
        setDotOperator(false);
        break;

      case "AC":
        // set variables to the initial state
        setCurrentCalculation("0");
        setOperator(false);
        setDotOperator(false);
        setNullOperator(false);
        break;

      case ".":
        // setting up the currentCalculation so that two dots can not be in a row. 
        if (!dotOperator) {
          setCurrentCalculation(currentCalculation + innerText);
          setDotOperator(true);
        }
        setOperator(true);
        setNullOperator(false);
        break;

      case '/':
      case '+':
      case '-':
      case '*':
        // setting up the currentCalculation so that two operators can not be in a row. 
        if (!operator) {
          setCurrentCalculation(currentCalculation + innerText);
          setOperator(true);
        }
        setDotOperator(true);
        setNullOperator(false);
        break;

      case "=":
        // if the last pressed button is either operator or dot, it will be ignored in evaluation. 
        setCurrentCalculation(eval(currentCalculation.match(/[+/*]?-?\d+\.?\d*/g).join('')));
        setDotOperator(false);
        setOperator(false);
        
    }
  }

  return (
    <div>
      <Header />
      <div className="calculator">
        <div id="display" className="display">{currentCalculation}</div>
        <div className="number-container">
          {numbers.map((number, index) => {
            return (
              <button
                className=
                {
                  `${number === "0" && "null"}`
                }
                onClick={handleClick} key={index}>{number}</button>
            );
          })}
        </div>

        <div className="operator-container">
          {arithmeticOperations.map((operator, index) => {
            return (
              <button
                className={
                  `${operator === "=" && "eval"} 
                   ${operator === "." && "dot"}
                   ${operator === "+" && "addition"}
                   ${operator === "AC" && "ac"}
                   ${operator === "/" && "divide"}
                   ${operator === "*" && "multiply"}
                   ${operator === "-" && "substraction"}
                   `
                }
                onClick={handleClick} key={index}>{operator}</button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
