const { ShapeParser, Square, Circle } = require('./shapesParser');

// Unit tests for the ShapeParser class.
describe('ShapeParser', () => {
  let parser;

  beforeEach(() => {
    parser = new ShapeParser();
  });

  test('parses a valid square', () => {
    const container = parser.parse("[13]");
    expect(container.shapes.length).toBe(1);
    expect(container.shapes[0]).toBeInstanceOf(Square);
    expect(container.shapes[0].label).toBe("13");
  });

  test('parses a valid circle', () => {
    const container = parser.parse("(DOG)");
    expect(container.shapes.length).toBe(1);
    expect(container.shapes[0]).toBeInstanceOf(Circle);
    expect(container.shapes[0].label).toBe("DOG");
  });

  test('parses a circle with a square inside', () => {
    const container = parser.parse("(DOG[15])");
    const circle = container.shapes[0];
    expect(circle.innerShapes.length).toBe(1);
    expect(circle.innerShapes[0]).toBeInstanceOf(Square);
    expect(circle.innerShapes[0].label).toBe("15");
  });

  test('throws error on invalid input', () => {
    expect(() => parser.parse("$@#")).toThrow(Error);
  });

  test('throws error on malformed input', () => {
    expect(() => parser.parse("[13)")).toThrow(Error);
  });

  test('throws error for invalid inner shape', () => {
    expect(() => parser.parse("[72(HELLO)]")).toThrow(Error);
  });

  test('throws error for invalid square label', () => {
    expect(() => parser.parse("[allow]")).toThrow(Error);
  });
});
