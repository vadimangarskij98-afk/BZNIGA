import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");

    const [user] = await sql`SELECT * FROM users WHERE id = ${userId || 1}`;

    if (!user) {
      return Response.json(
        { error: "User not found", success: false },
        { status: 404 },
      );
    }

    let trialStatus = {
      active: false,
      days_remaining: 0,
      expired: false,
    };

    if (user.trial_started_at && user.trial_expires_at) {
      const now = new Date();
      const expiresAt = new Date(user.trial_expires_at);
      const msRemaining = expiresAt - now;
      const daysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));

      trialStatus = {
        active: daysRemaining > 0,
        days_remaining: Math.max(0, daysRemaining),
        expired: daysRemaining <= 0,
        started_at: user.trial_started_at,
        expires_at: user.trial_expires_at,
      };
    }

    return Response.json({
      trial: trialStatus,
      user: {
        plan: user.plan,
        sessions_quota: user.sessions_quota,
        sessions_used: user.sessions_used,
        hours_quota: user.hours_quota,
        hours_used: parseFloat(user.hours_used),
      },
      success: true,
    });
  } catch (error) {
    console.error("Error fetching trial status:", error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
