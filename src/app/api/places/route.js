import pool from '@/lib/db';
import { Ojuju } from 'next/font/google';


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
    const { name, description, location, image_url } = body;
    const allowedData = [
      'name', 'description', 'location', 'image_url'
    ]

    const invalidField = Object.keys(body).filter(
      (element) => !allowedData.includes(element)
    );

    if (invalidField.length > 0) {
      return Response.json({ error: "Bad request" }, { status: 400 })
    }

    const result = await pool.query(
      `INSERT INTO places(
      name,
      description,
      location,
      image_url
      )
      VALUES(
      $1,$2,$3,$4
      )
      RETURNING *
      `, [name, description, location, image_url]
    )
    return Response.json(result.rows[0], { status: 201 })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

