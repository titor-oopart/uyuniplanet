import pool from '@/lib/db';


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
