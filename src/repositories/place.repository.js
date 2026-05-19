import { pool } from "@/lib/db";

export async function updatePlace(id, data) {
  const { name, description, location, image_url } = data;

  const result = await pool.query(
    `
    UPDATE places
    SET
      name = COALESCE($1, name),
      description = COALESCE($2, description),
      location = COALESCE($3, location),
      image_url = COALESCE($4, image_url)
    WHERE id = $5
    RETURNING *;
    `,
    [name, description, location, image_url, id]
  );

  return result.rows[0];
}

