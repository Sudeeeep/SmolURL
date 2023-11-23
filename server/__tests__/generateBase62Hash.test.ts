import { generateBase62Hash } from "../src/utils/generateBase62Hash";

describe("Base62Hash", () => {
  it("should return 7-digit hash", () => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const hash = generateBase62Hash(randomNumber);

    expect(typeof hash).toBe("string");
    expect(hash).toHaveLength(7);
  });

  it("should be unique", () => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const hashOne = generateBase62Hash(randomNumber);
    const hashTwo = generateBase62Hash(randomNumber + 1);

    expect(typeof hashOne).toBe("string");
    expect(hashOne).toHaveLength(7);

    expect(typeof hashTwo).toBe("string");
    expect(hashTwo).toHaveLength(7);

    expect(hashOne).not.toEqual(hashTwo);
  });
});
