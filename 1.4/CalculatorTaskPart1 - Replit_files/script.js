//add function: this should add two numbers (parameters) and return the sum
function add(num1, num2){
  return num1 + num2;
}
//subtract function: this should subtract the second number from the first number and return the difference
function subtract(num1, num2){
  return num1 - num2;
}
//multiply function: this should multiply two numbers and return the product
function multiply(num1, num2){
  return num1 * num2;
}
//divide function: this should divide the first number by the second number and return the quotient; however, if the divisor is equal to zero, the function should return the text “Not Allowed”
function divide(num1 , num2){
  if(num2 === 0){
    return "Not Allowed"
  }else{
    return num1 / num2;
  } 
}