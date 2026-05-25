import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const agents = await sql`
      SELECT * FROM agents 
      WHERE is_global = true 
      ORDER BY id ASC
    `;

    return Response.json({ agents, success: true });
  } catch (error) {
    console.error("Error fetching agents:", error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      specialty,
      color,
      bpm_min,
      bpm_max,
      skills,
      personality,
      system_prompt,
      is_global,
    } = body;

    const [agent] = await sql`
      INSERT INTO agents (name, specialty, color, bpm_min, bpm_max, skills, personality, system_prompt, is_global)
      VALUES (${name}, ${specialty}, ${color}, ${bpm_min}, ${bpm_max}, ${JSON.stringify(skills)}, ${personality}, ${system_prompt}, ${is_global ?? true})
      RETURNING *
    `;

    return Response.json({ agent, success: true });
  } catch (error) {
    console.error("Error creating agent:", error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
