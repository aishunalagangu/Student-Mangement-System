from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models
import schemas

from database import engine, get_db


# Create database tables
models.Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Student Management System",
    description="Student Management System using FastAPI and MySQL",
    version="1.0"
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# HOME
@app.get("/")
def home():

    return {
        "message": "Student Management System API is running"
    }


# CREATE STUDENT
@app.post(
    "/students",
    response_model=schemas.StudentResponse,
    status_code=201
)
def create_student(
    student: schemas.StudentCreate,
    db: Session = Depends(get_db)
):

    existing_student = (
        db.query(models.Student)
        .filter(
            models.Student.email == student.email
        )
        .first()
    )

    if existing_student:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_student = models.Student(
        name=student.name,
        age=student.age,
        email=student.email,
        course=student.course
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return new_student


# GET ALL STUDENTS
@app.get(
    "/students",
    response_model=list[schemas.StudentResponse]
)
def get_students(
    db: Session = Depends(get_db)
):

    students = db.query(
        models.Student
    ).all()

    return students


# GET STUDENT BY ID
@app.get(
    "/students/{student_id}",
    response_model=schemas.StudentResponse
)
def get_student(
    student_id: int,
    db: Session = Depends(get_db)
):

    student = db.query(
        models.Student
    ).filter(
        models.Student.id == student_id
    ).first()

    if not student:

        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return student


# UPDATE STUDENT
@app.put(
    "/students/{student_id}",
    response_model=schemas.StudentResponse
)
def update_student(
    student_id: int,
    student_data: schemas.StudentCreate,
    db: Session = Depends(get_db)
):

    student = db.query(
        models.Student
    ).filter(
        models.Student.id == student_id
    ).first()

    if not student:

        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    duplicate_email = db.query(
        models.Student
    ).filter(
        models.Student.email == student_data.email,
        models.Student.id != student_id
    ).first()

    if duplicate_email:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    student.name = student_data.name
    student.age = student_data.age
    student.email = student_data.email
    student.course = student_data.course

    db.commit()
    db.refresh(student)

    return student


# DELETE STUDENT
@app.delete("/students/{student_id}")
def delete_student(
    student_id: int,
    db: Session = Depends(get_db)
):

    student = db.query(
        models.Student
    ).filter(
        models.Student.id == student_id
    ).first()

    if not student:

        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    db.delete(student)
    db.commit()

    return {
        "message": "Student deleted successfully"
    }


# SEARCH STUDENT
@app.get(
    "/students/search/{keyword}",
    response_model=list[schemas.StudentResponse]
)
def search_student(
    keyword: str,
    db: Session = Depends(get_db)
):

    students = db.query(
        models.Student
    ).filter(
        models.Student.name.contains(keyword)
    ).all()

    return students