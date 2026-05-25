import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get("genre");
    const bpm_min = searchParams.get("bpm_min");
    const bpm_max = searchParams.get("bpm_max");
    const key = searchParams.get("key");
    const search = searchParams.get("search");

    let query = `SELECT * FROM tracks WHERE 1=1`;
    const params = [];

    if (genre) {
      params.push(genre);
      query += ` AND genre = $${params.length}`;
    }

    if (bpm_min) {
      params.push(parseInt(bpm_min));
      query += ` AND bpm >= $${params.length}`;
    }

    if (bpm_max) {
      params.push(parseInt(bpm_max));
      query += ` AND bpm <= $${params.length}`;
    }

    if (key) {
      params.push(key);
      query += ` AND key = $${params.length}`;
    }

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (LOWER(title) LIKE LOWER($${params.length}) OR LOWER(artist) LIKE LOWER($${params.length}))`;
    }

    query += ` ORDER BY created_at DESC LIMIT 100`;

    const tracks = await sql(query, params);

    return Response.json({ tracks, success: true });
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, artist, bpm, key, duration, genre, file_url, energy } = body;

    const [track] = await sql`
      INSERT INTO tracks (title, artist, bpm, key, duration, genre, file_url, energy)
      VALUES (${title}, ${artist}, ${bpm}, ${key}, ${duration}, ${genre}, ${file_url}, ${energy})
      RETURNING *
    `;

    return Response.json({ track, success: true });
  } catch (error) {
    console.error("Error creating track:", error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
