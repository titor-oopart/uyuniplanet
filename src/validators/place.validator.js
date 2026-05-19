export function validateUpdatePlace(body) {
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

