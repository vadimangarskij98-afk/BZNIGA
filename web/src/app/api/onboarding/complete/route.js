import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { user_id, language, venue_type } = body;

    const [user] = await sql`
      UPDATE users 
      SET 
        onboarding_completed = true,
        language = ${language || "ru"},
        venue_type = ${venue_type || "club"}
      WHERE id = ${user_id || 1}
      RETURNING *
    `;

    return Response.json({ user, success: true });
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
