# Shape is a base class for all shape types. It just holds a label.
class Shape:
    def __init__(self, label):
        self.label = label

# Square class - only accepts numeric labels and can nest other squares.
class Square(Shape):
    def __init__(self, label):
        if not label.isdigit():  # Quick check that the label is a number.
            raise ValueError("Square label must be a number.")
        super().__init__(label)
        self.inner_squares = []  # Squares can only hold more squares.

    def add_inner_square(self, square):
        # Only allow other squares to be added.
        if not isinstance(square, Square):
            raise ValueError("Squares can only contain other squares.")
        self.inner_squares.append(square)

# Circle class - only accepts uppercase letter labels and can hold both squares and circles.
class Circle(Shape):
    def __init__(self, label):
        if not label.isupper():  # Ensure circle labels are uppercase.
            raise ValueError("Circle label must be uppercase.")
        super().__init__(label)
        self.inner_shapes = []  # Circles can hold squares or circles.

    def add_inner_shape(self, shape):
        # Allow either squares or circles inside.
        if not isinstance(shape, (Square, Circle)):
            raise ValueError("Circles can only contain squares or circles.")
        self.inner_shapes.append(shape)

# Container class to hold all top-level shapes.
class Container:
    def __init__(self):
        self.shapes = []

    def add_shape(self, shape):
        self.shapes.append(shape)

# The parser that processes the string input and builds shape objects.
class ShapeParser:
    def __init__(self):
        self.index = 0  # Tracks the current position in the input string.

    # Main parsing function. Takes a string and returns a Container of shapes.
    def parse(self, input_string):
        self.index = 0  # Start at the beginning.
        container = Container()

        # Loop through the input and parse shapes.
        while self.index < len(input_string):
            char = input_string[self.index]

            if char == '[':
                container.add_shape(self.parse_square(input_string))
            elif char == '(':
                container.add_shape(self.parse_circle(input_string))
            else:
                raise ValueError(f"Unexpected character: {char}")
        
        return container  # Return the populated container.

    # Parses a square, expects the current character to be '['.
    def parse_square(self, input_string):
        self.index += 1  # Skip the '['.
        label = self.parse_label(input_string, is_square=True)
        square = Square(label)

        # Loop until we find the closing ']'.
        while input_string[self.index] != ']':
            if input_string[self.index] == '[':
                square.add_inner_square(self.parse_square(input_string))
            else:
                raise ValueError("Invalid content inside square.")
        
        self.index += 1  # Skip the closing ']'.
        return square

    # Parses a circle, expects the current character to be '('.
    def parse_circle(self, input_string):
        self.index += 1  # Skip the '('.
        label = self.parse_label(input_string, is_square=False)
        circle = Circle(label)

        # Loop until we find the closing ')'.
        while input_string[self.index] != ')':
            if input_string[self.index] == '[':
                circle.add_inner_shape(self.parse_square(input_string))
            elif input_string[self.index] == '(':
                circle.add_inner_shape(self.parse_circle(input_string))
            else:
                raise ValueError("Invalid content inside circle.")
        
        self.index += 1  # Skip the closing ')'.
        return circle

    # Helper function to parse the label of a shape.
    def parse_label(self, input_string, is_square):
        start = self.index

        # Move through the string while the character is alphanumeric.
        while input_string[self.index].isalnum():
            self.index += 1

        label = input_string[start:self.index]

        # Label validation depends on whether it's for a square or circle.
        if is_square and not label.isdigit():
            raise ValueError("Square label must be numeric.")
        if not is_square and not label.isupper():
            raise ValueError("Circle label must be uppercase.")
        
        return label
