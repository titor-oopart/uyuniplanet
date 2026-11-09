import { fetchPlaceByIdService } from "@/services/place.service";
import { notFound } from "next/navigation";

export default async function PlaceDetailPage({ params }) {
  const { id } = await params;

  let place;

  try {
    place = await fetchPlaceByIdService(id);
  } catch (error) {
    if (error.message === "NOT_FOUND" || error.message === "BAD_REQUEST") {
      notFound();
    }

    throw error;
  }

  return (
    <main>
      <h1>{place.name}</h1>

      <p>{place.description}</p>

      <p>
        <strong>Location:</strong> {place.location || "Not specified"}
      </p>

      {place.image_url && <img src={place.image_url} alt={place.name} />}

      <p>
        <strong>Created:</strong>{" "}
        {place.created_at ? new Date(place.created_at).toLocaleDateString() : "N/A"}
      </p>
    </main>
  );
}
