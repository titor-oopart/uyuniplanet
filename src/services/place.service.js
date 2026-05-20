import { updatePlace, postPlace } from "@/repositories/place.repository";
import { validatePlaceFields } from "@/validators/place.validator";

export async function updatePlaceService(id, body) {
  const isValid = validatePlaceFields(body);
  if (!isValid) {
    throw new Error("BAD_REQUEST");
  }
  const place = await updatePlace(id, body);
  if (!place) {
    throw new Error("NOT_FOUND");
  }
  return place;
}

export async function postPlaceService(body) {
  const isValid = validatePlaceFields(body);
  if (!isValid) {
    throw new Error("BAD_REQUEST")
  }
  const place = await postPlace(body);
  if (!place) {
    throw new Error("NOT_FOUND");
  }
  return place;
}
