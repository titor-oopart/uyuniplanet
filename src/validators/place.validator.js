export function validatePlaceFields(body) {
  const allowedFields = [
    "name",
    "description",
    "location",
    "image_url"
  ];

  const bodyFields = Object.keys(body);

  for (const field of bodyFields) {
    if (!allowedFields.includes(field)) {
      return false;
    }
  }

  return true;
}

export function validateId(id) {
  if (!id) {
    throw new Error('Id is required');
  }

  if (isNaN(id)) {
    throw new Error('Id must be a number');
  }
}
