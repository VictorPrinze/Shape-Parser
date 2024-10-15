# Shape Parser

A JavaScript parser that processes a custom shape syntax and builds an object representation.

## Description

This parser handles two types of shapes: squares and circles, with specific rules for nesting and labeling. Each shape must have a valid label according to the rules below.

## Shape Rules

- **Square `[]`**
  - Must have numeric labels only
  - Can only contain other squares

- **Circle `()`**
  - Must have uppercase letter labels only
  - Can contain both squares and circles

## Valid Examples

- `[13]` Simple square
- `(DOG)` Simple circle
- `(DOG[15])` Circle containing square
- `[12] (ABC) [34]` Multiple shapes
- `[12[34[56]]]` Nested squares
- `(ABC(DEF)12)` Complex circle nesting

## Invalid Examples

- `$@#` Invalid characters
- `[13)` Mismatched brackets
- `[72(HELLO)]` Square containing circle (not allowed)
- `[allow]` Square with non-numeric label
- `(dog)` Circle with lowercase label
- `[12 34]` Spaces in labels
- `[]` Empty label

## Usage

```javascript
const { ShapeParser } = require('./shapesParser');

// Create parser instance
const parser = new ShapeParser();

// Parse a string of shapes
const container = parser.parse("[12](DOG)");

// Access the parsed shapes
const shapes = container.shapes;  // Array of Shape objects



```
## Running Tests

To run the tests for the Shape Parser, use the following command:
```
npm test
```
## Error Handling

The Shape Parser provides detailed error messages for various scenarios:

- Empty Input: If the input string is empty, the parser will throw an error indicating that the input is empty.

- Invalid Characters: If the input contains invalid characters, such as special characters or symbols, the parser will throw an error specifying that the input contains invalid characters.

- Mismatched Brackets/Parentheses: If the input has mismatched brackets or parentheses, the parser will throw an error indicating that the brackets or parentheses are not properly balanced.

- Invalid Label Format: If a shape has an invalid label format, such as a square with a non-numeric label or a circle with a lowercase label, the parser will throw an error specifying that the label format is invalid.

- Invalid Nesting Rules: If the nesting rules for shapes are violated, such as a square containing a circle (which is not allowed), the parser will throw an error indicating that the nesting rules are invalid.


