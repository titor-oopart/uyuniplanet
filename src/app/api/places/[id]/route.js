import { updatePlaceService, removePlace, fetchPlaceByIdService } from "@/services/place.service";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const result = await removePlace(id);

    if (!result.success) {
      return Response.json({ message: result.message }, { status: result.status });
    }

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    const body = await request.json();

    const place = await updatePlaceService(id, body);

    return Response.json(place);
  } catch (error) {
    if (error.message === "BAD_REQUEST") {
      return Response.json({ error: "Bad request." }, { status: 400 });
    }

    if (error.message === "NOT_FOUND") {
      return Response.json({ error: "Place no encontrado" }, { status: 404 });
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const place = await fetchPlaceByIdService(id);

    return Response.json(place);
  } catch (error) {
    if (error.message === "BAD_REQUEST") {
      return Response.json({ error: "Bad request." }, { status: 400 });
    }

    if (error.message === "NOT_FOUND") {
      return Response.json({ error: "Place not found." }, { status: 404 });
    }

    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
