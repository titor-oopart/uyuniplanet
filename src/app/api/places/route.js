import { pool } from '@/lib/db';

import { postPlaceService } from "@/services/place.service";

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM places ORDER BY id ASC'
    )
    return Response.json(result.rows)
  } catch (error) {
    console.log(error)
    return Response.json({ error: 'Database error' }, { status: 500 })
  }
}

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

