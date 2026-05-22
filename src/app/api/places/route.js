import { postPlaceService, fetchPlaceService } from "@/services/place.service";


export async function POST(req) {
  try {
    const body = await req.json();
    const place = await postPlaceService(body)

    return Response.json(place);

  } catch (error) {
    console.log(error)
    return Response.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const result = await fetchPlaceService();
    if (result.length === 0) {
      return Response.json({ message: "Place not found." }, { status: 404 })
    }
    return Response.json(result)
  } catch (error) {
    return Response.json({ error: 'Database error' }, { status: 500 })
  }
}
