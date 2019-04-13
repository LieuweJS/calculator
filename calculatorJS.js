function setup() {
  createCanvas(400, 400);
  sum = [];
  //setup of all buttons.
  //numbers
  calc_number_1 = createButton('1');
  calc_number_2 = createButton('2');
  calc_number_3 = createButton('3');
  calc_number_4 = createButton('4');
  calc_number_5 = createButton('5');
  calc_number_6 = createButton('6');
  calc_number_7 = createButton('7');
  calc_number_8 = createButton('8');
  calc_number_9 = createButton('9');
  calc_number_0 = createButton('0');
  //operations
  calc_operation_addition = createButton('+');
  calc_operation_minus = createButton('-');
  calc_operation_multiply = createButton('*');  
  calc_operation_divide = createButton('÷');
  calc_operation_sqrt = createButton('√');  
  calc_operation_square = createButton('²');
  calc_operation_equals = createButton('=');

  //functions
  calc_function_clear = createButton('C');  
  
  //onclicks of all buttons.
  calc_number_1.mousePressed(function() { addToSum(1);});
  calc_number_2.mousePressed(function() { addToSum(2);});
  calc_number_3.mousePressed(function() { addToSum(3);});
  calc_number_4.mousePressed(function() { addToSum(4);});
  calc_number_5.mousePressed(function() { addToSum(5);});
  calc_number_6.mousePressed(function() { addToSum(6);});
  calc_number_7.mousePressed(function() { addToSum(7);});
  calc_number_8.mousePressed(function() { addToSum(8);});
  calc_number_9.mousePressed(function() { addToSum(9);});
  calc_number_0.mousePressed(function() { addToSum(0);});
  //operations
  calc_operation_addition.mousePressed(function() { addToSum('+');});
  calc_operation_minus.mousePressed(function() { addToSum('-');});
  calc_operation_multiply.mousePressed(function() { addToSum('x');});
  calc_operation_divide.mousePressed(function() { addToSum('/');});
  calc_operation_sqrt.mousePressed(function() { addToSum('sqrt');}); 
  calc_operation_square.mousePressed(function() { addToSum('square');});
  calc_operation_equals.mousePressed(calculate);
  //functions
  calc_function_clear.mousePressed(clearSum);
}

function addToSum(addition) {
  sum.push(addition); 
}

function calculate() {

  if(sum.length > 0) {
    var errorFound = 0;
    clear();    
    improveArray();
    try {
      divideIntoCalculations(0);
    }
    catch(err) {
      text('the sum you have entered is not a valid sum, please try again.',10,200);
      console.log('error ' + err.message);
      errorFound = 1;
    } 
    if(errorFound === 0) {
       text('the answer is: ' + sum,200,200);
    }
  } else {
     text('you have not filled in a sum yet, please do this.', 200,200); 
  }
}

function clearSum() {
  sum = [];
}

function numberCheck(potentialNumber) {
  if(potentialNumber % 1 === 0 || potentialNumber === 0) {
    return 1; 
  } else {
    return 0;
  }
}

function improveArray() {
  this.sumLen = sum.length;
  for(var i = 0; i < this.sumLen; i++) {
    var number1 = numberCheck(sum[i]);
    var number2 = numberCheck(sum[i+1]);
    if (number1 === 1 && number2 === 1) {
      var newNumberTemp = sum[i] + '' + sum[i+1];
      var newNumber = parseInt(newNumberTemp, 10)
      sum[i] = newNumber;
      sum.splice(i+1, 1);
      i = i - 1;
    } 
  } 
}


function divideIntoCalculations(i) {
  if(sum.length !== 1) {
    item = sum[i];
    if(item !== 0 || item % 1 !== 0) {
      //if item isn't a number, check for what kind of operation it is.
      if(item === '+') { 
        if(sum[i+1] === '-') {
          var newNumber = sum[i+1] + sum[i+2];
          sum[i+2] = parseInt(newNumber,10);
          sum.splice(i+1,1);
          divideIntoCalculations(i);
        } else {
          var plusReturn = plus(i);
          sum[i] = plusReturn;
          sum.splice(i-1, 1);
          sum.splice(i, 1);
          i = i - 1;
          divideIntoCalculations(i);
        }
      }
      else if(item === '-') {
        if(i === 0) {
          var newNumber = sum[i]+sum[i+1];
          sum[i] = parseInt(newNumber);
          sum.splice(i+1,1);
        } else {
          var minusReturn = minus(i); 
          sum[i] = minusReturn;
          sum.splice(i-1, 1);
          sum.splice(i, 1);
          i = i - 1;
          divideIntoCalculations(i);
        }
      }
      else if(item === 'x') {
        if(sum[i+1] === '-') {
          var newNumber = sum[i+1] + sum[i+2];
          sum[i+2] = parseInt(newNumber,10);
          sum.splice(i+1,1);
          divideIntoCalculations(i);
        } else {
          var multiplyReturn = multiply(i);
          sum[i] = multiplyReturn;
          sum.splice(i-1, 1);
          sum.splice(i, 1);
          i = i - 1;
          divideIntoCalculations(i);
        }
      }
      else if(item === '/') {
        if(sum[i+1] === '-') {
          var newNumber = sum[i+1] + sum[i+2];
          sum[i+2] = parseInt(newNumber,10);
          sum.splice(i+1,1);
          divideIntoCalculations(i);
        } else {
          var divideReturn = divide(i);
          sum[i] = divideReturn;
          sum.splice(i-1, 1);
          sum.splice(i, 1);
          i = i - 1;
          divideIntoCalculations(i);
        }
      } 
      
      else if(item === 'sqrt') {
        if(sum[i+1] === '-') {
          var newNumber = sum[i+1] + sum[i+2];
          sum[i+2] = parseInt(newNumber,10);
          sum.splice(i+1,1);
          divideIntoCalculations(i);
        } else {
          var sqrt_Return = sqrt_(i);
          sum[i] = sqrt_Return;
          sum.splice(i+1, 1);
          divideIntoCalculations(i);
        }
      }
      else if(item === 'square') {
       if(sum[i+1] === '-') {
          var newNumber = sum[i+1] + sum[i+2];
          sum[i+2] = parseInt(newNumber,10);
          sum.splice(i+1,1);
          divideIntoCalculations(i);
        } else {
          var square_Return = square_(i);
          sum[i] = square_Return;
          sum.splice(i-1, 1);
          divideIntoCalculations(i);
        }
      } divideIntoCalculations(i + 1);
    } 
  } 
}

function plus(plusLocator) {
  //grab all relevant numbers.
  var firstNumber = sum[plusLocator - 1];
  var secondNumber = sum[plusLocator + 1];
  
  return firstNumber + secondNumber;
}

function minus(minusLocator) {
  //grab all relevant numbers.
  var firstNumber = sum[minusLocator - 1];
  var secondNumber = sum[minusLocator + 1];
  var answer = firstNumber - secondNumber;
  
  return answer;
 
}

function multiply(multiplyLocator) {
  //grab all relevant numbers.
  var firstNumber = sum[multiplyLocator - 1];
  var secondNumber = sum[multiplyLocator + 1];
  
  return firstNumber * secondNumber;
}

function divide(divideLocator) {
  //grab all relevant numbers.
  var firstNumber = sum[divideLocator - 1];
  var secondNumber = sum[divideLocator + 1];
  
  return firstNumber / secondNumber;
}

function sqrt_(sqrtLocator) {
  var sqrtNumber = sum[sqrtLocator + 1];
  
  return sqrt(sqrtNumber);
}

function square_(squareLocator) {
  var squareNumber = sum[squareLocator - 1];
  
  return squareNumber * squareNumber;
}
