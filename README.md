\# Student Management System



A full-stack Student Management System developed using \*\*Python, FastAPI, MySQL, HTML, CSS, and JavaScript\*\*. The application provides REST APIs for managing student records and a simple web-based frontend.



\## Features



\* Add new students

\* View all students

\* View a student by ID

\* Update student details

\* Delete student records

\* Search students by keyword

\* Email validation

\* Input validation

\* MySQL database integration

\* RESTful API development

\* Interactive API documentation using Swagger UI

\* CORS support for frontend-backend communication



\## Technologies Used



\### Backend



\* Python

\* FastAPI

\* SQLAlchemy

\* Pydantic

\* Uvicorn



\### Database



\* MySQL



\### Frontend



\* HTML5

\* CSS3

\* JavaScript



\### Tools



\* Visual Studio Code

\* Git

\* GitHub

\* MySQL Workbench



\## Project Structure



```text

Student\_Management\_System/

│

├── backend/

│   ├── main.py

│   ├── database.py

│   ├── models.py

│   └── schemas.py

│

├── frontend/

│   ├── index.html

│   ├── style.css

│   └── script.js

│

├── .gitignore

└── README.md

```



\## API Endpoints



| Method | Endpoint                     | Description       |

| ------ | ---------------------------- | ----------------- |

| GET    | `/`                          | Check API status  |

| POST   | `/students`                  | Add a student     |

| GET    | `/students`                  | Get all students  |

| GET    | `/students/{id}`             | Get student by ID |

| PUT    | `/students/{id}`             | Update student    |

| DELETE | `/students/{id}`             | Delete student    |

| GET    | `/students/search/{keyword}` | Search students   |



\## How to Run



\### 1. Clone the Repository



```bash

git clone https://github.com/aishunalagangu/Student-Mangement-System.git

```



\### 2. Open the Project



```bash

cd Student-Mangement-System

```



\### 3. Create and Activate Virtual Environment



Windows PowerShell:



```powershell

python -m venv venv

.\\venv\\Scripts\\Activate.ps1

```



\### 4. Install Dependencies



```powershell

pip install fastapi uvicorn sqlalchemy pymysql email-validator

```



\### 5. Configure MySQL



Create a MySQL database:



```sql

CREATE DATABASE student\_management;

```



Update the database connection details in:



```text

backend/database.py

```



Do not upload your real MySQL password to GitHub.



\### 6. Start the FastAPI Server



From the `backend` folder:



```powershell

cd backend

uvicorn main:app --reload

```



The API will run at:



```text

http://127.0.0.1:8000

```



\### 7. Open Swagger Documentation



Open:



```text

http://127.0.0.1:8000/docs

```



FastAPI provides an interactive Swagger UI where you can test the APIs.



\## Example Student



```json

{

&#x20;   "name": "Aiswarya",

&#x20;   "age": 22,

&#x20;   "email": "aiswarya@example.com",

&#x20;   "course": "Python"

}

```



\## Learning Outcomes



Through this project, I gained practical experience in:



\* Python backend development

\* FastAPI REST API development

\* CRUD operations

\* SQLAlchemy ORM

\* MySQL database integration

\* Pydantic data validation

\* API testing with Swagger UI

\* Frontend-backend integration

\* Git and GitHub version control



\## Future Improvements



\* User authentication and authorization

\* JWT-based security

\* Student login system

\* Pagination

\* Advanced filtering and sorting

\* Deployment to a cloud platform

\* Improved responsive UI



\## Author



\*\*Aiswarya Nalagangu\*\*



Entry-Level IT Professional | Java | Python | SQL | FastAPI



