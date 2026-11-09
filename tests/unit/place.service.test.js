import { describe, test, expect } from "vitest";
import { validatePlaceFields, validateId } from "../../src/validators/place.validator";

describe("Place validators", () => {
  describe("validatePlaceFields", () => {
    test("should accept valid place fields", () => {
      const place = {
        name: "Salar de Uyuni",
        description: "Largest salt flat in the world",
      };

      expect(validatePlaceFields(place)).toBe(true);
    });

    test("should reject unknown fields", () => {
      const place = {
        name: "Salar de Uyuni",
        unknownField: "Invalid field",
      };

      expect(() => validatePlaceFields(place)).toThrow("BAD_REQUEST");
    });
  });

  describe("validateId", () => {
    test("should accept a valid ID", () => {
      expect(validateId(1)).toBeUndefined();
    });

    test("should reject an empty ID", () => {
      expect(() => validateId(null)).toThrow("Id is required");
    });

    test("should reject a non-numeric ID", () => {
      expect(() => validateId("abc")).toThrow("Id must be a number");
    });
  });
});
