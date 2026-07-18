export function validatePlaceFields(body) {
  const allowedFields = ["name", "description", "location", "image_url"];

  const bodyFields = Object.keys(body);

  for (const field of bodyFields) {
    if (!allowedFields.includes(field)) {
      throw new Error("BAD_REQUEST");
    }
  }
  return true;
}

export function validateId(id) {
  if (!id) {
    throw new Error("Id is required");
  }
  if (Number.isNaN(Number(id))) {
    throw new Error("Id must be a number");
  }
}
