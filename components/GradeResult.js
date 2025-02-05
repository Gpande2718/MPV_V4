// components/GradeResult.js
export default function GradeResult({ data }) {
  return (
    <div style={{ marginTop: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
      <h2>Grading Result</h2>
      <p><strong>Overall Grade:</strong> {data.overall_grade || 'N/A'}</p>
      <p><strong>Confidence Score:</strong> {data.confidence_score || 'N/A'}</p>
      <p><strong>Chain-of-Thought:</strong> {data.chain_of_thought || 'N/A'}</p>
      {data.questions && data.questions.length > 0 && (
        <div>
          <h3>Question Feedback</h3>
          <ul>
            {data.questions.map((q, idx) => (
              <li key={idx}>
                <strong>Q{q.question_number}: </strong>{q.question_text} <br />
                Max Marks: {q.max_marks}, Obtained: {q.obtained_marks} <br />
                Feedback: {q.feedback}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
