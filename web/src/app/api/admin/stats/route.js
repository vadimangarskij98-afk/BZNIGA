import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    // Базовая статистика
    const [stats] = await sql`
      SELECT 
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '30 days') as new_users_30d,
        (SELECT COUNT(*) FROM sessions) as total_sessions,
        (SELECT COUNT(*) FROM sessions WHERE status = 'active') as active_sessions,
        (SELECT COUNT(*) FROM tracks) as total_tracks,
        (SELECT COUNT(*) FROM agents WHERE is_global = true) as global_agents
    `;

    // Распределение по планам
    const plans = await sql`
      SELECT plan, COUNT(*) as count
      FROM users
      GROUP BY plan
      ORDER BY count DESC
    `;

    // Активность по жанрам
    const genres = await sql`
      SELECT genre, COUNT(*) as count
      FROM tracks
      WHERE genre IS NOT NULL
      GROUP BY genre
      ORDER BY count DESC
      LIMIT 10
    `;

    // Последние сессии
    const recentSessions = await sql`
      SELECT 
        s.id, s.name, s.started_at, s.status,
        u.name as user_name,
        jsonb_array_length(s.agent_ids) as agent_count
      FROM sessions s
      LEFT JOIN users u ON s.user_id = u.id
      ORDER BY s.started_at DESC
      LIMIT 10
    `;

    return Response.json({
      stats,
      plans,
      genres,
      recentSessions,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
