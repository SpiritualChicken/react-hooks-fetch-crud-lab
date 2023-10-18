import React from "react";

function QuestionItem({ question, onQuestionDelete, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete () {
    fetch(`http://127.0.0.1:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => onQuestionDelete(question.id))
    .catch((error) => {
      console.error("Error while deleting question:", error);
    });
  }
  function handlePatch (event) {
    fetch(`http://127.0.0.1:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: event.target.value }),
    })
      .then((r) => r.json())
      .then((updatedAnswer) => onUpdateQuestion(updatedAnswer))
      .catch((error) => {
        console.error("Error while updating question:", error);
      });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handlePatch}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
