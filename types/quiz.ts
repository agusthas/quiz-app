export interface APIResponse {
  response_code: number;
  results: Question[];
}

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
