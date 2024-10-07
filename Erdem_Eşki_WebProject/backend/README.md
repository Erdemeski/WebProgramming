API JSON design:
    https://opentdb.com/api.php?amount=10

  "response_code": 0,
  "results": [
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Science: Gadgets",
      "question": "What is the most significant side venture the popular firearms company, Remington, has pursued?",
      "correct_answer": "Typewriters",
      "incorrect_answers": [
        "Blenders",
        "Ceiling Fans",
        "Door Knobs"
      ]
    },
    ...
    ],


question:
type:String,
difficulty: String,
category: String,
question: String,
correct_answer: String,
incorrect_answers: array -> this is wrong so change it.

quiz:
question_number: number,
current_question: number -> düzelt ve object yap.
list of questions -> 
question_list: array,
score: number,



TODOLIST: 
Get API and connect to the database.