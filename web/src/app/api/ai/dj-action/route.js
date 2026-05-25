import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      session_id,
      agent_id,
      current_track,
      deck_tracks,
      available_tracks,
      user_command,
      context,
    } = body;

    // Получить агента из БД
    const [agent] = await sql`SELECT * FROM agents WHERE id = ${agent_id}`;

    if (!agent) {
      return Response.json(
        { error: "Agent not found", success: false },
        { status: 404 },
      );
    }

    // Построить контекст для AI
    const systemPrompt =
      agent.system_prompt ||
      `Ты профессиональный DJ с 30-летним опытом. Специализация: ${agent.specialty}.`;

    const userPrompt = `
ТЕКУЩАЯ СИТУАЦИЯ:
- Сейчас играет: ${current_track?.title || "Ничего"} ${current_track ? `(${current_track.bpm} BPM, ${current_track.key})` : ""}
- Деки: A: ${deck_tracks?.a?.title || "пусто"}, B: ${deck_tracks?.b?.title || "пусто"}
- Доступные треки: ${available_tracks
      ?.slice(0, 5)
      .map(
        (t) => `${t.title} — ${t.artist} (${t.bpm} BPM, ${t.key}, ${t.genre})`,
      )
      .join("; ")}

${user_command ? `КОМАНДА ПОЛЬЗОВАТЕЛЯ: ${user_command}` : ""}

${context ? `КОНТЕКСТ: ${context}` : ""}

ЗАДАЧА:
Как профессиональный DJ, определи СЛЕДУЮЩЕЕ ДЕЙСТВИЕ и объясни своё решение. Учитывай:
1. Harmonic mixing (Camelot wheel) для совместимости тональностей
2. Разницу в BPM (лучше ±2-4 BPM для плавного перехода)
3. Энергетическую кривую сета
4. Подходящую технику перехода (blend, cut, echo out, filter sweep)

Верни JSON с:
- action: тип действия (load_track / apply_effect / adjust_eq / crossfade / wait)
- details: детали действия (какой трек / эффект / параметры)
- reasoning: детальное объяснение решения (почему именно это)
- planning: что планируешь делать через 30 сек, 1 мин, 5 мин
- next_track_suggestion: предложение следующего трека с обоснованием
`;

    // Запрос к ChatGPT
    const aiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_CREATE_APP_URL || "http://localhost:3000"}/integrations/chat-gpt/conversationgpt4`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          json_schema: {
            name: "dj_action",
            schema: {
              type: "object",
              properties: {
                action: {
                  type: "string",
                  enum: [
                    "load_track",
                    "apply_effect",
                    "adjust_eq",
                    "crossfade",
                    "wait",
                  ],
                },
                details: {
                  type: "object",
                  properties: {
                    track_id: { type: ["number", "null"] },
                    deck: { type: ["string", "null"] },
                    effect: { type: ["string", "null"] },
                    parameters: { type: ["object", "null"] },
                  },
                  required: ["track_id", "deck", "effect", "parameters"],
                  additionalProperties: false,
                },
                reasoning: { type: "string" },
                planning: {
                  type: "object",
                  properties: {
                    in_30_sec: { type: "string" },
                    in_1_min: { type: "string" },
                    in_5_min: { type: "string" },
                  },
                  required: ["in_30_sec", "in_1_min", "in_5_min"],
                  additionalProperties: false,
                },
                next_track_suggestion: {
                  type: "object",
                  properties: {
                    track_title: { type: "string" },
                    reason: { type: "string" },
                  },
                  required: ["track_title", "reason"],
                  additionalProperties: false,
                },
              },
              required: [
                "action",
                "details",
                "reasoning",
                "planning",
                "next_track_suggestion",
              ],
              additionalProperties: false,
            },
          },
        }),
      },
    );

    const aiData = await aiResponse.json();
    const decision = JSON.parse(aiData.choices[0].message.content);

    // Логировать решение агента
    await sql`
      INSERT INTO agent_logs (agent_id, session_id, action, reasoning)
      VALUES (${agent_id}, ${session_id}, ${JSON.stringify(decision)}, ${decision.reasoning})
    `;

    // Создать событие сессии
    await sql`
      INSERT INTO session_events (session_id, agent_id, event_type, payload)
      VALUES (${session_id}, ${agent_id}, 'dj_action', ${JSON.stringify(decision)})
    `;

    return Response.json({
      decision,
      agent_name: agent.name,
      success: true,
    });
  } catch (error) {
    console.error("Error in AI DJ action:", error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
