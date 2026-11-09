import { fetchPlaceService } from "@/services/place.service";

const headers = ["ID", "Name", "Description", "Location", "Image", "Date"];

export default async function PlacesPage() {
  const places = await fetchPlaceService();

  return (
    <main>
      <h1>Places</h1>

      {places.length === 0 ? (
        <p>No places found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {places.map((place) => (
              <tr key={place.id}>
                <td>{place.id}</td>
                <td>{place.name}</td>
                <td>{place.description}</td>
                <td>{place.location || "N/A"}</td>
                <td>{place.image_url || "N/A"}</td>
                <td>
                  {place.created_at ? new Date(place.created_at).toLocaleDateString() : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
