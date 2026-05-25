import sql from "@/app/api/utils/sql";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const events = await sql`
      SELECT 
        se.*,
        a.name as agent_name,
        a.color as agent_color
      FROM session_events se
      LEFT JOIN agents a ON se.agent_id = a.id
      WHERE se.session_id = ${id}
      ORDER BY se.timestamp DESC
      LIMIT 100
    `;

    return Response.json({ events, success: true });
  } catch (error) {
    console.error("Error fetching session events:", error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
