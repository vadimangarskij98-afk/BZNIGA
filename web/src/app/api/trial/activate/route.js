import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { user_id } = body;

    // Check if user already has trial
    const [user] = await sql`SELECT * FROM users WHERE id = ${user_id}`;

    if (!user) {
      return Response.json(
        { error: "User not found", success: false },
        { status: 404 },
      );
    }

    if (user.trial_started_at) {
      return Response.json(
        { error: "Trial already activated", success: false },
        { status: 400 },
      );
    }

    // Activate 3-day trial
    const [updated] = await sql`
      UPDATE users 
      SET 
        trial_started_at = NOW(),
        trial_expires_at = NOW() + INTERVAL '3 days',
        plan = 'professional'
      WHERE id = ${user_id}
      RETURNING *
    `;

    return Response.json({
      user: updated,
      trial_days_remaining: 3,
      success: true,
    });
  } catch (error) {
    console.error("Error activating trial:", error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
