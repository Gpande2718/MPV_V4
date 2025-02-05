// pages/api/grade.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { assignmentText, questionPaper, correctSolutions, rubric, modelAnswer } = req.body;

  // Build the prompt similar to your Python version.
  const prompt = `
You are a strict teaching assistant. Follow the rubric and correct solutions exactly.
Few-shot examples:
Example 1:
Question: Solve 2x + 3 = 7
Rubric: (same as provided)
Correct Solution: x = 2
Student's Answer: "x=2"
Grade: 10/10
Chain-of-thought: The student met every criterion.
Example 2:
Question: Solve 2x + 3 = 7
Rubric: (same as provided)
Correct Solution: x = 2
Student's Answer: "x=5"
Grade: 3/10
Chain-of-thought: The final answer is wrong.
---
Context:
Question Paper: ${questionPaper}
Correct Solutions: ${correctSolutions}
Rubric: ${rubric}
Model Answer Sheet: ${modelAnswer}

Student's full assignment answer:
${assignmentText}

Instructions: Provide an overall grade in "x/total" format, a confidence_score (0-1), a chain_of_thought explanation, and per-question feedback as valid JSON.
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4", // or gpt-4o-mini if you prefer
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 1200,
      }),
    });

    const data = await response.json();
    // Here we simply return the API response.
    return res.status(200).json({ result: data });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
