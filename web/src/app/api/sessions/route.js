import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "active";

    const sessions = await sql`
      SELECT s.*, u.name as user_name
      FROM sessions s
      LEFT JOIN users u ON s.user_id = u.id
      WHERE s.status = ${status}
      ORDER BY s.started_at DESC
      LIMIT 50
    `;

    return Response.json({ sessions, success: true });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, agent_ids, user_id } = body;

    const [session] = await sql`
      INSERT INTO sessions (name, agent_ids, user_id, status)
      VALUES (${name}, ${JSON.stringify(agent_ids)}, ${user_id || 1}, 'active')
      RETURNING *
    `;

    // Log session start event
    for (const agentId of agent_ids) {
      await sql`
        INSERT INTO session_events (session_id, agent_id, event_type, payload)
        VALUES (${session.id}, ${agentId}, 'session_started', ${JSON.stringify({ session_name: name })})
      `;
    }

    return Response.json({ session, success: true });
  } catch (error) {
    console.error("Error creating session:", error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
