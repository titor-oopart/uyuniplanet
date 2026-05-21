import { updatePlace, postPlace, deletePlaceById } from "@/repositories/place.repository";
import { validatePlaceFields, validateId } from "@/validators/place.validator";

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

export async function removePlace(id) {
  validateId(id);

  const deletedPlace = await deletePlaceById(id);

  if (!deletedPlace) {
    return {
      success: false,
      status: 404,
      message: `Element with id: ${id} does not exist.`,
    };
  }

  return {
    success: true,
    status: 204,
  };
}
