# Shape Parser

A Python parser that processes a custom shape syntax and builds an object representation.

## Description

This parser handles two types of shapes: squares and circles, with specific rules for nesting and labeling. Each shape must have a valid label according to the rules below.

## Shape Rules

* **Square `[]`**
  * Must have numeric labels only
  * Can only contain other squares

* **Circle `()`**
  * Must have uppercase letter labels only
  * Can contain both squares and circles

## Valid Examples
```
[13]                    # Simple square
(DOG)                   # Simple circle
(DOG[15])              # Circle containing square
[12] (ABC) [34]        # Multiple shapes
[12[34[56]]]           # Nested squares
(ABC(DEF)[12](GHI))    # Complex circle nesting
```

## Invalid Examples
```
$@#                     # Invalid characters
[13)                   # Mismatched brackets
[72(HELLO)]            # Square containing circle (not allowed)
[allow]                # Square with non-numeric label
(dog)                  # Circle with lowercase label
[12 34]                # Spaces in labels
[]                     # Empty label
```

## Usage

```python
from shapes_parser import ShapeParser

# Create parser instance
parser = ShapeParser()

# Parse a string of shapes
container = parser.parse("[12](DOG)")

# Access the parsed shapes
shapes = container.shapes  # List of Shape objects
```

## Running Tests

```bash
python3 -m unittest test_shapes_parser.py
```

## Error Handling

The parser will raise `ValueError` with descriptive messages for:
* Empty input
* Invalid characters
* Mismatched brackets/parentheses
* Invalid label format
* Invalid nesting rules# Shape-Parser
