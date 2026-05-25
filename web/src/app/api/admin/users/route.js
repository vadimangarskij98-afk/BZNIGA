import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const plan = searchParams.get("plan");

    let query = `
      SELECT 
        u.id, u.email, u.name, u.plan, u.language, u.is_admin, u.created_at,
        COUNT(DISTINCT s.id) as session_count
      FROM users u
      LEFT JOIN sessions s ON u.id = s.user_id
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (LOWER(u.email) LIKE LOWER($${params.length}) OR LOWER(u.name) LIKE LOWER($${params.length}))`;
    }

    if (plan) {
      params.push(plan);
      query += ` AND u.plan = $${params.length}`;
    }

    query += ` GROUP BY u.id ORDER BY u.created_at DESC`;

    const users = await sql(query, params);

    return Response.json({ users, success: true });
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, plan, is_admin } = body;

    const updates = [];
    const params = [];

    if (plan !== undefined) {
      params.push(plan);
      updates.push(`plan = $${params.length}`);
    }

    if (is_admin !== undefined) {
      params.push(is_admin);
      updates.push(`is_admin = $${params.length}`);
    }

    if (updates.length === 0) {
      return Response.json(
        { error: "No fields to update", success: false },
        { status: 400 },
      );
    }

    params.push(id);
    const query = `UPDATE users SET ${updates.join(", ")} WHERE id = $${params.length} RETURNING *`;

    const [user] = await sql(query, params);

    return Response.json({ user, success: true });
  } catch (error) {
    console.error("Error updating user:", error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
