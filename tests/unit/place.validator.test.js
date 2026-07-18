import { describe, test, expect } from "vitest";
import { validatePlaceFields, validateId } from "../../src/validators/place.validator";

describe("validatePlaceFields", () => {
  test("should accept valid place fields", () => {
    const body = {
      name: "Salar de Uyuni",
      description: "Lugar turístico",
      location: "Uyuni",
      image_url: "image.jpg",
    };
    expect(() => validatePlaceFields(body)).not.toThrow();
  });

  test("should reject unknown fields", () => {
    const body = {
      name: "Salar de Uyuni",
      country: "Bolivia",
    };
    expect(() => validatePlaceFields(body)).toThrow("BAD_REQUEST");
  });
});

describe("validateId", () => {
  test("should accept valid id", () => {
    expect(() => validateId(1)).not.toThrow();
  });

  test("should reject empty id", () => {
    expect(() => validateId()).toThrow("Id is required");
  });

  test("should reject non numeric id", () => {
    expect(() => validateId("abc")).toThrow("Id must be a number");
  });
});
