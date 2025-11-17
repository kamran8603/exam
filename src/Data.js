 export const questions = [
  {
    id: 1,
    question: "Which keyword declares a variable that must be initialized at the time of declaration?",
    options: ["var", "let", "const", "static"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "What is the default value of an uninitialized var variable?",
    options: ["null", "undefined", "0", "false"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What will be the output? console.log(typeof NaN);",
    options: ["number", "string", "undefined", "object"],
    correctAnswer: 0
  },
  {
    id: 4,
    question: "Which statement best describes hoisting?",
    options: [
      "JavaScript deletes unused variables",
      "JavaScript moves declarations to the top",
      "JavaScript optimizes the code",
      "JavaScript converts var into let"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Which of the following will NOT be hoisted?",
    options: ["var", "function", "let", "function declaration"],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "What is the correct syntax for setTimeout?",
    options: [
      "setTimeout(delay, function)",
      "setTimeout(function, delay)",
      "timeout(function, delay)",
      "runAfter(function, delay)"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "What will happen? const x = 10; x = 20;",
    options: [
      "x becomes 20",
      "No error occurs",
      "TypeError: Assignment to constant variable",
      "Code stops without error"
    ],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "Which of the following creates a block scope?",
    options: ["if{}", "for{}", "{}", "All of the above"],
    correctAnswer: 3
  },
  {
    id: 9,
    question: "Which timer runs continuously until manually stopped?",
    options: ["setSpeed()", "setInterval()", "setTimeout()", "runTimer()"],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "Which method stops a setTimeout before it executes?",
    options: ["stopTimeout()", "clear()", "cancel()", "clearTimeout()"],
    correctAnswer: 3
  },
  {
    id: 11,
    question: "Which operator checks both value and type?",
    options: ["=", "==", "===", "!="],
    correctAnswer: 2
  },
  {
    id: 12,
    question: "What will be the output? console.log(5 + '5');",
    options: ["10", "55", "Error", "undefined"],
    correctAnswer: 1
  },
  {
    id: 13,
    question: "What does the break statement do?",
    options: [
      "Exits from a loop",
      "Skips one iteration",
      "Stops JavaScript engine",
      "Breaks a variable"
    ],
    correctAnswer: 0
  },
  {
    id: 14,
    question: "Which loop will run at least once, even if condition is false?",
    options: ["for", "while", "do-while", "forEach"],
    correctAnswer: 2
  },
  {
    id: 15,
    question: "Which of these is NOT a primitive type?",
    options: ["number", "string", "boolean", "array"],
    correctAnswer: 3
  },
  {
    id: 16,
    question: "What will be the result of: Boolean('')?",
    options: ["true", "false", "undefined", "0"],
    correctAnswer: 1
  },
  {
    id: 17,
    question: "What is the output? console.log(2 == '2');",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0
  },
  {
    id: 18,
    question: "What is the output? console.log(2 === '2');",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 1
  },
  {
    id: 19,
    question: "Which function converts a string into an integer?",
    options: ["parseInt()", "toInt()", "Number.int()", "convert()"],
    correctAnswer: 0
  },
  {
    id: 20,
    question: "Which keyword is used to return a value from a function?",
    options: ["give", "send", "return", "output"],
    correctAnswer: 2
  },

   {
    id: 21,
    question: "What will be the output? console.log(typeof []);",
    options: ["object", "array", "list", "undefined"],
    correctAnswer: 0
  },
  {
    id: 22,
    question: "Which keyword is used to declare a variable inside a block scope?",
    options: ["var", "block", "let", "static"],
    correctAnswer: 2
  },
  {
    id: 23,
    question: "Which loop is best for iterating over array elements?",
    options: ["for", "while", "forEach", "switch"],
    correctAnswer: 2
  },
  {
    id: 24,
    question: "What is the output? console.log(3 * '3');",
    options: ["9", "33", "Error", "undefined"],
    correctAnswer: 0
  },
  {
    id: 25,
    question: "Which of the following is used to convert a string to a number?",
    options: ["Number()", "toNumber()", "convertNum()", "stringToNum()"],
    correctAnswer: 0
  },
  {
    id: 26,
    question: "What will be the output? console.log('5' - 2);",
    options: ["52", "3", "Error", "undefined"],
    correctAnswer: 1
  },
  {
    id: 27,
    question: "Which symbol is used for template literals?",
    options: ["'", "\"", "`", "~"],
    correctAnswer: 2
  },
  {
    id: 28
,
    question: "What is the purpose of break inside a switch statement?",
    options: [
      "To exit from the switch block",
      "To pause execution",
      "To skip a case",
      "To restart the switch"
    ],
    correctAnswer: 0
  },
  {
    id: 29,
    question: "Which operator is used to check if two values are NOT equal?",
    options: ["!=", "!==", "not()", "!== and !="],
    correctAnswer: 3
  },
  {
    id: 30,
    question: "What will be the output? console.log(true + 1);",
    options: ["true1", "2", "true", "Error"],
    correctAnswer: 1
  },
  {
    id: 31,
    question: "Which of these is NOT a comparison operator?",
    options: ["==", "<=", "++", "!="],
    correctAnswer: 2
  },
  {
    id: 32,
    question: "Which statement is true about const variables?",
    options: [
      "It cannot be reassigned",
      "It cannot store objects",
      "It behaves same as var",
      "It cannot be used in loops"
    ],
    correctAnswer: 0
  },
  {
    id: 33,
    question: "Which error occurs when accessing a variable before it is declared with let?",
    options: ["Syntax Error", "Type Error", "Reference Error (TDZ)", "Range Error"],
    correctAnswer: 2
  },
  {
    id: 34,
    question: "Which function repeats execution after a fixed time?",
    options: ["setDelay()", "repeat()", "setInterval()", "intervalRun()"],
    correctAnswer: 2
  },
  {
    id: 35,
    question: "What does clearTimeout() require as an argument?",
    options: ["delay time", "timer ID", "function name", "timeout reference"],
    correctAnswer: 1
  },
  {
    id: 36,
    question: "What will be the output? console.log('10' + 5);",
    options: ["15", "105", "Error", "undefined"],
    correctAnswer: 1
  },
  {
    id: 37,
    question: "Which operator is used to concatenate strings?",
    options: ["+", "&", "concat()", "#"],
    correctAnswer: 0
  },
  {
    id: 38,
    question: "What will be the output? console.log(10 % 3);",
    options: ["1", "3", "0", "Error"],
    correctAnswer: 0
  },
  {
    id: 39,
    question: "Which of the following creates an infinite loop?",
    options: [
      "for(let i=0; i<5; i++)",
      "while(true)",
      "for(let i=1; i>=0; i--)",
      "Both B and C"
    ],
    correctAnswer: 3
  },
  {
    id: 40,
    question: "Which operator checks only value but not type?",
    options: ["==", "===", "!=", "!=="],
    correctAnswer: 0
  },
   {
    id: 41,
    question: "Which method removes the last element from an array?",
    options: ["shift()", "pop()", "remove()", "delete()"],
    correctAnswer: 1
  },
  {
    id: 42,
    question: "Which method adds one or more elements to the end of an array?",
    options: ["push()", "append()", "add()", "extend()"],
    correctAnswer: 0
  },
  {
    id: 43,
    question: "What will be the output? console.log(null == undefined);",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0
  },
  {
    id: 44,
    question: "What will be the output? console.log(null === undefined);",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 1
  },
  {
    id: 45,
    question: "Which method converts an array to a string?",
    options: ["join()", "stringify()", "toText()", "convert()"],
    correctAnswer: 0
  },
  {
    id: 46,
    question: "What will be the output? console.log(typeof function(){});",
    options: ["object", "function", "method", "undefined"],
    correctAnswer: 1
  },
  {
    id: 47,
    question: "Which of the following is NOT a looping statement?",
    options: ["for", "while", "repeat", "do-while"],
    correctAnswer: 2
  },
  {
    id: 48,
    question: "Which method is used to stop setInterval?",
    options: ["stopInterval()", "clear()", "clearInterval()", "endInterval()"],
    correctAnswer: 2
  },
  {
    id: 49,
    question: "What will be the output? console.log(!!'text');",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0
  },
  {
    id: 50,
    question: "Which method returns the length of an array?",
    options: ["size()", "count()", "length", "len()"],
    correctAnswer: 2
  },
  {
    id: 51,
    question: "Which operator returns the remainder of a division?",
    options: ["**", "%", "//", "mod"],
    correctAnswer: 1
  },
  {
    id: 52,
    question: "Which value is considered falsy in JavaScript?",
    options: ["'hello'", "5", "0", "[]"],
    correctAnswer: 2
  },
  {
    id: 53,
    question: "What type of error occurs when calling a non-existing function?",
    options: ["Syntax Error", "Type Error", "Reference Error", "Range Error"],
    correctAnswer: 2
  },
  {
    id: 54,
    question: "Which array method returns a new array without modifying the original?",
    options: ["push()", "filter()", "pop()", "sort()"],
    correctAnswer: 1
  },
  {
    id: 55,
    question: "What is the output? console.log(typeof NaN);",
    options: ["number", "NaN", "undefined", "object"],
    correctAnswer: 0
  },
  {
    id: 56,
    question: "Which value is NOT a primitive data type?",
    options: ["string", "number", "object", "boolean"],
    correctAnswer: 2
  },
  {
    id: 57,
    question: "Which keyword ends a function and sends back a value?",
    options: ["return", "send", "output", "break"],
    correctAnswer: 0
  },
  {
    id: 58,
    question: "Which built-in method converts JSON into a JavaScript object?",
    options: ["JSON.parse()", "JSON.decode()", "JSON.convert()", "JSON.read()"],
    correctAnswer: 0
  },
  {
    id: 59,
    question: "Which built-in method converts a JavaScript object into JSON?",
    options: ["JSON.stringify()", "JSON.encode()", "JSON.write()", "JSON.objectToJson()"],
    correctAnswer: 0
  },
  {
    id: 60,
    question: "What will be the output? console.log(1 + true);",
    options: ["1", "2", "true", "Error"],
    correctAnswer: 1
  }

];
