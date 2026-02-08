import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { CourseBlueprint } from "@/types";

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey === "sk-your-api-key-here") {
    return NextResponse.json(
      { error: "OpenAI API key non configurata. Aggiungi OPENAI_API_KEY nel file .env.local" },
      { status: 500 }
    );
  }

  const openai = new OpenAI({ apiKey });

  try {
    const { blueprint } = (await request.json()) as { blueprint: CourseBlueprint };

    const systemPrompt = `Sei un Architetto dell'Apprendimento esperto in progettazione didattica basata sul framework Understanding by Design (UbD).
Il tuo compito è arricchire un blueprint di corso di formazione con contenuti dettagliati e pronti per l'implementazione.

Devi rispondere ESCLUSIVAMENTE in formato JSON valido, senza markdown, senza commenti, senza testo aggiuntivo.

Per ogni modulo del corso, genera:
- "title": titolo del modulo (puoi migliorarlo)
- "objective": obiettivo specifico e operazionale
- "duration": durata stimata
- "content": contenuto dettagliato del modulo (3-5 paragrafi) in formato testo, con concetti chiave, esempi pratici e punti di discussione
- "activities": array di 3-5 attività didattiche specifiche e dettagliate
- "assessment": descrizione dettagliata della modalità di valutazione
- "speakerNotes": note per il facilitatore/docente (consigli pratici, tempi, transizioni)

Il tono deve essere: ${blueprint.toneOfVoice}.
La strategia didattica dominante è: ${blueprint.teachingStrategy}.

IMPORTANTE: Rispondi SOLO con un oggetto JSON con questa struttura:
{
  "title": "titolo migliorato del corso",
  "modules": [{ "number": 1, "title": "...", "objective": "...", "duration": "...", "content": "...", "activities": ["..."], "assessment": "...", "speakerNotes": "..." }]
}`;

    const userPrompt = `Ecco il blueprint del corso da arricchire:

TITOLO: ${blueprint.title}
OBIETTIVO DI TRASFERIMENTO: ${blueprint.transferObjective}
OBIETTIVO DI BUSINESS: ${blueprint.businessObjective}
LIVELLO DI APPROFONDIMENTO: ${blueprint.depthLevel}
MODALITA DI VALUTAZIONE: ${blueprint.assessmentMethods.join(", ")}
KPI BREVE TERMINE: ${blueprint.shortTermKPI}
KPI LUNGO TERMINE: ${blueprint.longTermKPI}
PROFILO LEARNER: ${blueprint.learnerProfile}
RESISTENZE ATTESE: ${blueprint.resistanceReasons}
SCENARI REALI: ${blueprint.scenarios}
CONTENUTI ESCLUSI: ${blueprint.excludedContent}
DOCUMENTI INCLUSI: ${blueprint.includedReferences}
DOCUMENTI DA CITARE: ${blueprint.citedReferences}
DURATA TOTALE: ${blueprint.duration}
TONO: ${blueprint.toneOfVoice}
STRATEGIA DIDATTICA: ${blueprint.teachingStrategy}

MODULI ATTUALI:
${blueprint.modules.map((m) => `- Modulo ${m.number}: ${m.title} (${m.duration}) — ${m.objective}`).join("\n")}

${blueprint.uploadedDocuments && blueprint.uploadedDocuments.length > 0 ? `\nDOCUMENTI CARICATI: ${blueprint.uploadedDocuments.flatMap(d => d.files.map(f => f.name)).join(", ")}` : ""}

Genera i contenuti dettagliati per ogni modulo. Mantieni lo stesso numero di moduli. Rispondi SOLO in JSON.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "Nessuna risposta dall'AI" },
        { status: 500 }
      );
    }

    const aiContent = JSON.parse(content);
    return NextResponse.json(aiContent);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Errore sconosciuto";
    console.error("OpenAI API error:", message);
    return NextResponse.json(
      { error: `Errore nella generazione AI: ${message}` },
      { status: 500 }
    );
  }
}
