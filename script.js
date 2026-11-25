
// 1. SELECT HTML ELEMENTS

const studentForm = document.getElementById("studentForm");
const studentName = document.getElementById("name");
const studentEmail = document.getElementById("email");
const studentMobile = document.getElementById("mobile");
const studentCourse = document.getElementById("course");
const studentTableBody = document.getElementById("studentTableBody");
const toggleRecordsBtn = document.getElementById("toggleRecordsBtn");
const recordsSection = document.getElementById("recordsSection");
const searchInput = document.getElementById("search");


// 2. STUDENT DATA

let students = [];
let nextId = 1;
let editStudentId = null;


// 3. VIEW / HIDE STUDENT RECORDS

toggleRecordsBtn.addEventListener("click", function () {

    if (recordsSection.hidden) {
        recordsSection.hidden = false;
        toggleRecordsBtn.textContent = "Hide Records";
    } else {
        recordsSection.hidden = true;
        toggleRecordsBtn.textContent = "View Records";
    }

});


// 4. ADD / UPDATE STUDENT

studentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const student = {
        name: studentName.value.trim(),
        email: studentEmail.value.trim(),
        mobile: studentMobile.value.trim(),
        course: studentCourse.value
    };

    if (editStudentId === null) {

        // Add new student
        student.id = nextId++;
        students.push(student);

    } else {

        // Update existing student
        const index = students.findIndex(function (s) {
            return s.id === editStudentId;
        });

        students[index] = {
            id: editStudentId,
            ...student
        };

        editStudentId = null;

        studentForm.querySelector("button[type='submit']").textContent = "Add Student";

    }

    displayStudents();
    studentForm.reset();

});  // IMPORTANT: Close the submit event here


// 5. DISPLAY STUDENTS

function displayStudents(studentList = students) {

    studentTableBody.innerHTML = "";
    document.getElementById("studentCount").textContent = "Total Students: " + students.length;

    studentList.forEach(function (student) {

        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const emailCell = document.createElement("td");
        const mobileCell = document.createElement("td");
        const courseCell = document.createElement("td");
        const actionCell = document.createElement("td");

        // Insert student details
        idCell.textContent = student.id;
        nameCell.textContent = student.name;
        emailCell.textContent = student.email;
        mobileCell.textContent = student.mobile;
        courseCell.textContent = student.course;


        // EDIT BUTTON

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";
        editButton.type = "button";
        editButton.classList.add("edit-btn");

        editButton.addEventListener("click", function () {

            const selectedStudent = students.find(function (s) {
                return s.id === student.id;
            });

            studentName.value = selectedStudent.name;
            studentEmail.value = selectedStudent.email;
            studentMobile.value = selectedStudent.mobile;
            studentCourse.value = selectedStudent.course;

            editStudentId = selectedStudent.id;

            studentForm.querySelector("button[type='submit']").textContent = "Update Student";

        });


        // DELETE BUTTON

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        deleteButton.classList.add("delete-btn");

        deleteButton.addEventListener("click", function () {

            students = students.filter(function (s) {
                return s.id !== student.id;
            });

            displayStudents();

        });


        // Add buttons to Action Cell
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);


        // Add cells to row
        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(mobileCell);
        row.appendChild(courseCell);
        row.appendChild(actionCell);

        studentTableBody.appendChild(row);

    });

}


// 6. SEARCH STUDENT

searchInput.addEventListener("input", function () {

    const searchValue = searchInput.value.toLowerCase().trim();

    const filteredStudents = students.filter(function (student) {

        return student.name.toLowerCase().includes(searchValue);

    });

    displayStudents(filteredStudents);

});
