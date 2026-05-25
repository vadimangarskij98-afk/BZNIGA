import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");
    const status = searchParams.get("status");

    let query = "SELECT * FROM support_tickets WHERE 1=1";
    const params = [];

    if (userId) {
      params.push(parseInt(userId));
      query += ` AND user_id = $${params.length}`;
    }

    if (status) {
      params.push(status);
      query += ` AND status = $${params.length}`;
    }

    query += " ORDER BY created_at DESC";

    const tickets = await sql(query, params);

    return Response.json({ tickets, success: true });
  } catch (error) {
    console.error("Error fetching support tickets:", error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { user_id, subject, message } = body;

    if (!subject || !message) {
      return Response.json(
        { error: "Subject and message required", success: false },
        { status: 400 },
      );
    }

    const [ticket] = await sql`
      INSERT INTO support_tickets (user_id, subject, message, status)
      VALUES (${user_id || 1}, ${subject}, ${message}, 'open')
      RETURNING *
    `;

    return Response.json({ ticket, success: true });
  } catch (error) {
    console.error("Error creating support ticket:", error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status, admin_reply } = body;

    const updates = [];
    const params = [];

    if (status) {
      params.push(status);
      updates.push(`status = $${params.length}`);
    }

    if (admin_reply) {
      params.push(admin_reply);
      updates.push(`admin_reply = $${params.length}`);
    }

    params.push("NOW()");
    updates.push(`updated_at = $${params.length}`);

    params.push(id);
    const query = `UPDATE support_tickets SET ${updates.join(", ")} WHERE id = $${params.length} RETURNING *`;

    const [ticket] = await sql(query, params);

    return Response.json({ ticket, success: true });
  } catch (error) {
    console.error("Error updating support ticket:", error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
