import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";



function QuestionList() {
const [questions, setQuestions] = useState([])

useEffect(() => {
  fetch("http://localhost:4000/questions")
  .then((resp) => resp.json())
  .then((data) => setQuestions(data))
  
}, [])

function handleDelete(deletedItem) {
  const updatedQuestions = questions.filter((question) => question.id !== deletedItem)
  setQuestions(updatedQuestions)
}

function handleUpdate (updatedAnswer) {
  const updatedAnswers = questions.map((question) => {
    if (question.id === updatedAnswer.id) {
      return updatedAnswer
    } else {
      return question
    }
  })
  setQuestions(updatedAnswers)
}


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => (
        <QuestionItem key={question.id} question={question} onQuestionDelete={handleDelete} onUpdateQuestion={handleUpdate}/>
      ))}</ul> 
    </section>
  );
}

export default QuestionList;
