from pydantic import BaseModel

class QuestionCreate(BaseModel):
    question_text: str

class Question(BaseModel):
    id: int
    question_text: str

    class Config:
        orm_mode = True