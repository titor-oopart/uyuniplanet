import pool from '@/lib/db';

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
    const allowedField = [
      "name", "description", "location", "image_url"
    ]
    const bodyArray = Object.keys(body);
    for (let i = 0; i < bodyArray.length; i++) {
      let userBody = bodyArray[i]
      if (!allowedField.includes(userBody)) {
        return Response.json({ error: "Bad request." }, { status: 400 })
      }
    }
    const { name, description, location, image_url } = body;
    const result = await pool.query(
      `UPDATE places
      SET name = COALESCE($1, name),
      description = COALESCE($2, description),
      location = COALESCE($3, location),
      image_url = COALESCE($4, image_url)
      WHERE id = $5
      RETURNING *;
      `, [name, description, location, image_url, id]
    )
    if (result.rows.length === 0) {
      return Response.json(
        { error: "Place no encontrado" },
        { status: 404 }
      );
    }
    return Response.json(result.rows[0])
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

