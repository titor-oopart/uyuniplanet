import { pool } from '@/lib/db';
import { updatePlaceService } from "@/services/place.service";

export async function GET(request, { params }) {
  const { id } = await params;
  const result = await pool.query(
    'SELECT * FROM places WHERE id = $1',
    [id]
  );
  if (result.rows.length === 0) {
    return Response.json(
      { message: `Place not found ${id}` },
      { status: 404 }
    );
  }
  return Response.json(result.rows[0]);
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const result = await pool.query(
      `DELETE FROM places
    WHERE id = $1
    RETURNING *`, [id]
    )
    if (result.rows.length === 0) {
      return Response.json(
        { message: `Element with id: ${id} does not exist.` },
        { status: 404 }
      );
    }
    return Response.json(null, { status: 204 });
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
      return Response.json(
        { error: "Bad request." },
        { status: 400 }
      );
    }

    if (error.message === "NOT_FOUND") {
      return Response.json(
        { error: "Place no encontrado" },
        { status: 404 }
      );
    }

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

