import React, { useEffect, useState } from 'react';
import { getQuestions, saveQuestions } from '../../services/indexedDB';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const loadQuestions = async () => {
      let localQuestions = await getQuestions();

      // Si no hay preguntas locales, buscar del backend y guardar local
      if (localQuestions.length === 0 && navigator.onLine) {
        try {
          const res = await fetch('http://localhost:3001/api/questions');
          const data = await res.json();
          await saveQuestions(data);
          localQuestions = data;
        } catch (err) {
          console.error('Error al cargar preguntas del backend:', err);
        }
      }

      setQuestions(localQuestions);
    };

    loadQuestions();
  }, []);

  if (questions.length === 0) {
    return <p>Cargando preguntas...</p>;
  }

  return (
    <div>
      <h3>Trivia</h3>
      {questions.map((q) => (
        <div key={q.id}>
          <p>{q.question}</p>
          <p><strong>Respuesta:</strong> {q.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default Quiz;
