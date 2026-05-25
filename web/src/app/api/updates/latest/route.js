import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const [latestUpdate] = await sql`
      SELECT * FROM app_updates 
      ORDER BY release_date DESC 
      LIMIT 1
    `;

    const currentVersion = "1.1.0"; // Current installed version (можно брать из параметра)

    const hasUpdate = latestUpdate && latestUpdate.version !== currentVersion;

    return Response.json({
      current_version: currentVersion,
      latest_version: latestUpdate?.version,
      has_update: hasUpdate,
      update: latestUpdate,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching updates:", error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
