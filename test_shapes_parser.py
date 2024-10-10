import unittest
from shapes_parser import ShapeParser, Square, Circle

# Unit tests for the ShapeParser.
class TestShapeParser(unittest.TestCase):
    def setUp(self):
        self.parser = ShapeParser()  

    # Test a valid square.
    def test_valid_square(self):
        container = self.parser.parse("[13]")
        self.assertEqual(len(container.shapes), 1)
        # Check the shape is a square.
        self.assertIsInstance(container.shapes[0], Square)  
         # Check the label.
        self.assertEqual(container.shapes[0].label, '13') 

    # Test a valid circle.
    def test_valid_circle(self):
        container = self.parser.parse("(DOG)")
        self.assertEqual(len(container.shapes), 1)
         # Check the shape is a circle.
        self.assertIsInstance(container.shapes[0], Circle) 
        # Check the label.
        self.assertEqual(container.shapes[0].label, 'DOG')  

    # Test a circle containing a square.
    def test_circle_with_square(self):
        container = self.parser.parse("(DOG[15])")
        circle = container.shapes[0]
        # Check the inner shape count.
        self.assertEqual(len(circle.inner_shapes), 1)  
         # Check the inner shape is a square.
        self.assertIsInstance(circle.inner_shapes[0], Square) 
         # Check the inner square label.
        self.assertEqual(circle.inner_shapes[0].label, '15') 

    # Test an invalid input.
    def test_invalid_input(self):
        with self.assertRaises(ValueError):
            self.parser.parse("$@#")

    # Test a malformed input with mismatched brackets.
    def test_malformed_input(self):
        with self.assertRaises(ValueError):
            self.parser.parse("[13)")

    # Test an invalid inner shape (square containing a circle).
    def test_invalid_inner_shape(self):
        with self.assertRaises(ValueError):
            self.parser.parse("[72(HELLO)]")

    # Test an invalid square label (non-numeric).
    def test_invalid_label_lower_case(self):
        with self.assertRaises(ValueError):
            self.parser.parse("[allow]")

if __name__ == '__main__':
    unittest.main()  
