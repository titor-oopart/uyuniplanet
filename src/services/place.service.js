import { updatePlace } from "@/repositories/place.repository";
import { validateUpdatePlace } from "@/validators/place.validator";

export async function updatePlaceService(id, body) {

  const isValid = validateUpdatePlace(body);

  if (!isValid) {
    throw new Error("BAD_REQUEST");
  }

  const place = await updatePlace(id, body);

  if (!place) {
    throw new Error("NOT_FOUND");
  }

  return place;
}
