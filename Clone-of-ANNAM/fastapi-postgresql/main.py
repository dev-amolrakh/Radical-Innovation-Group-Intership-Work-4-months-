from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from . import models, schemas, database

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

@app.post("/questions/", response_model=schemas.Question)
async def create_question(question: schemas.QuestionCreate, db: AsyncSession = Depends(database.get_db)):
    new_question = models.Question(question_text=question.question_text)
    db.add(new_question)
    await db.commit()
    await db.refresh(new_question)
    return new_question

@app.get("/questions/", response_model=list[schemas.Question])
async def read_questions(skip: int = 0, limit: int = 10, db: AsyncSession = Depends(database.get_db)):
    result = await db.execute(select(models.Question).offset(skip).limit(limit))
    questions = result.scalars().all()
    return questions