
const API_URL = "http://127.0.0.1:8000";


document.addEventListener(
    "DOMContentLoaded",
    getStudents
);


const form =
    document.getElementById("studentForm");


form.addEventListener(
    "submit",
    saveStudent
);


async function saveStudent(event) {

    event.preventDefault();


    const id =
        document.getElementById("studentId").value;


    const student = {

        name:
            document.getElementById("name").value,

        age:
            Number(
                document.getElementById("age").value
            ),

        email:
            document.getElementById("email").value,

        course:
            document.getElementById("course").value
    };


    try {

        let response;


        if (id) {

            response = await fetch(
                `${API_URL}/students/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(student)
                }
            );

        } else {

            response = await fetch(
                `${API_URL}/students`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(student)
                }
            );
        }


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.detail ||
                "Something went wrong"
            );

            return;
        }


        alert(
            id
                ? "Student updated successfully"
                : "Student added successfully"
        );


        clearForm();

        getStudents();

    } catch (error) {

        console.error(error);

        alert(
            "Cannot connect to backend"
        );
    }
}


async function getStudents() {

    try {

        const response =
            await fetch(
                `${API_URL}/students`
            );


        const students =
            await response.json();


        displayStudents(students);

    } catch (error) {

        console.error(error);

        alert(
            "Backend server is not running"
        );
    }
}


function displayStudents(students) {

    const table =
        document.getElementById(
            "studentTable"
        );


    table.innerHTML = "";


    students.forEach(student => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.age}</td>

            <td>${student.email}</td>

            <td>${student.course}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick='editStudent(${JSON.stringify(student)})'
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})"
                >
                    Delete
                </button>

            </td>

        `;


        table.appendChild(row);
    });
}


function editStudent(student) {

    document.getElementById(
        "studentId"
    ).value = student.id;


    document.getElementById(
        "name"
    ).value = student.name;


    document.getElementById(
        "age"
    ).value = student.age;


    document.getElementById(
        "email"
    ).value = student.email;


    document.getElementById(
        "course"
    ).value = student.course;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


async function deleteStudent(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/students/${id}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.detail ||
                "Delete failed"
            );

            return;
        }


        alert(
            "Student deleted successfully"
        );


        getStudents();

    } catch (error) {

        console.error(error);

        alert(
            "Cannot connect to backend"
        );
    }
}


async function searchStudents() {

    const keyword =
        document.getElementById(
            "search"
        ).value.trim();


    if (!keyword) {

        getStudents();

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/students/search/${encodeURIComponent(keyword)}`
            );


        const students =
            await response.json();


        displayStudents(students);

    } catch (error) {

        console.error(error);

        alert(
            "Search failed"
        );
    }
}


function clearForm() {

    document.getElementById(
        "studentForm"
    ).reset();


    document.getElementById(
        "studentId"
    ).value = "";
}


function cancelUpdate() {

    clearForm();
}