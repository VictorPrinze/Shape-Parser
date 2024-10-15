// Base class for shapes. A shape just holds a label.
class Shape {
    constructor(label) {
      this.label = label;
    }
  }
  
  // Square class - only accepts numeric labels and can nest other squares.
  class Square extends Shape {
    constructor(label) {
      if (!/^\d+$/.test(label)) {  // Ensure label is a number.
        throw new Error("Square label must be a number.");
      }
      super(label);  // Initialize label.
      this.innerSquares = [];  // Squares can hold other squares.
    }
  
    addInnerSquare(square) {
      if (!(square instanceof Square)) {
        throw new Error("Squares can only contain other squares.");
      }
      this.innerSquares.push(square);
    }
  }
  
  // Circle class - only accepts uppercase labels and can nest both squares and circles.
  class Circle extends Shape {
    constructor(label) {
      if (!/^[A-Z]+$/.test(label)) {  // Ensure label is uppercase letters.
        throw new Error("Circle label must be uppercase.");
      }
      super(label);  // Initialize label.
      this.innerShapes = [];  // Circles can hold squares or circles.
    }
  
    addInnerShape(shape) {
      if (!(shape instanceof Square || shape instanceof Circle)) {
        throw new Error("Circles can only contain squares or circles.");
      }
      this.innerShapes.push(shape);
    }
  }
  
  // Container class holds all the top-level shapes.
  class Container {
    constructor() {
      this.shapes = [];
    }
  
    addShape(shape) {
      this.shapes.push(shape);
    }
  }
  
  // Parser class to process input string and build shape objects.
  class ShapeParser {
    constructor() {
      this.index = 0;  // Tracks current position in the input string.
    }
  
    // Main function to parse a string and return a container of shapes.
    parse(inputString) {
      this.index = 0;  // Start from the beginning.
      const container = new Container();
  
      // Loop through the input string and parse shapes.
      while (this.index < inputString.length) {
        const char = inputString[this.index];
  
        if (char === '[') {
          container.addShape(this.parseSquare(inputString));
        } else if (char === '(') {
          container.addShape(this.parseCircle(inputString));
        } else {
          throw new Error(`Unexpected character: ${char}`);
        }
      }
  
      return container;  // Return the populated container.
    }
  
    // Parse a square shape, expects '[' as the current character.
    parseSquare(inputString) {
      this.index++;  // Skip '['.
      const label = this.parseLabel(inputString, true);
      const square = new Square(label);
  
      // Keep parsing inner squares until ']' is found.
      while (inputString[this.index] !== ']') {
        if (inputString[this.index] === '[') {
          square.addInnerSquare(this.parseSquare(inputString));
        } else {
          throw new Error("Invalid content inside square.");
        }
      }
  
      this.index++;  // Skip closing ']'.
      return square;
    }
  
    // Parse a circle shape, expects '(' as the current character.
    parseCircle(inputString) {
      this.index++;  // Skip '('.
      const label = this.parseLabel(inputString, false);
      const circle = new Circle(label);
  
      // Keep parsing inner shapes until ')' is found.
      while (inputString[this.index] !== ')') {
        if (inputString[this.index] === '[') {
          circle.addInnerShape(this.parseSquare(inputString));
        } else if (inputString[this.index] === '(') {
          circle.addInnerShape(this.parseCircle(inputString));
        } else {
          throw new Error("Invalid content inside circle.");
        }
      }
  
      this.index++;  // Skip closing ')'.
      return circle;
    }
  
    // Helper function to parse the label of a shape.
    parseLabel(inputString, isSquare) {
      const start = this.index;
  
      // Move through the string while it's alphanumeric.
      while (/^[a-zA-Z0-9]+$/.test(inputString[this.index])) {
        this.index++;
      }
  
      const label = inputString.slice(start, this.index);
  
      // Validate the label based on whether it's a square or circle.
      if (isSquare && !/^\d+$/.test(label)) {
        throw new Error("Square label must be numeric.");
      }
      if (!isSquare && !/^[A-Z]+$/.test(label)) {
        throw new Error("Circle label must be uppercase.");
      }
  
      return label;
    }
  }
  
  module.exports = { ShapeParser, Square, Circle };
  