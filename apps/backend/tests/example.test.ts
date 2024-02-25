function sum(a: number, b: number) {
  return a + b;
}

describe("sum", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("adds 2 + 2 to equal 4", () => {
    expect(sum(2, 2)).toBe(4);
  });
});

describe("TestSomething", () => {
  test("test_a_behavior should pass if 1 equals 1", () => {
    expect(1).toBe(1);
  });
});
