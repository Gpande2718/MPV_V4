// pages/index.js
import { useState } from 'react';
import axios from 'axios';
import FileUpload from '../components/FileUpload';
import GradeResult from '../components/GradeResult';

export default function Home() {
  const [assignmentText, setAssignmentText] = useState('');
  const [questionPaper, setQuestionPaper] = useState('');
  const [correctSolutions, setCorrectSolutions] = useState('');
  const [rubric, setRubric] = useState('');
  const [modelAnswer, setModelAnswer] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/grade', {
        assignmentText,
        questionPaper,
        correctSolutions,
        rubric,
        modelAnswer,
      });
      setResult(response.data.result);
    } catch (error) {
      console.error("Error grading assignment:", error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Assignment Grader</h1>
      <form onSubmit={handleSubmit}>
        <FileUpload label="Assignment File" onFileRead={setAssignmentText} />
        <FileUpload label="Question Paper" onFileRead={setQuestionPaper} />
        <FileUpload label="Correct Solutions" onFileRead={setCorrectSolutions} />
        <FileUpload label="Rubric (Optional)" onFileRead={setRubric} />
        <FileUpload label="Model Answer (Optional)" onFileRead={setModelAnswer} />
        <button type="submit" style={{ marginTop: '1rem' }}>Grade Assignment</button>
      </form>
      {result && <GradeResult data={result} />}
    </div>
  );
}
