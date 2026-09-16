# Employee Management System - React Frontend

## Technology
- React
- Vite
- Axios
- Bootstrap 5
- Bootstrap Icons
- Sass / SCSS
- React Router
- jsPDF

## Run

1. Make sure the Spring Boot backend is running on:
   http://localhost:8080

2. Open this frontend folder in VS Code.

3. Run:
   npm install

4. Then:
   npm run dev

5. Open the Vite URL shown in the terminal.

## Pages

### Admin
- Dashboard
- Employees
- Departments
- Attendance
- Leave Requests
- Tasks
- Salary & Payroll

### Employee
- Dashboard
- My Profile
- My Attendance
- My Tasks
- Apply Leave
- My Leaves
- My Salary
- Download Salary Slip PDF

## Login
The frontend uses the role returned by:
POST /api/auth/login

ADMIN -> /admin/dashboard
EMPLOYEE -> /employee/dashboard

## Important
This frontend is designed for the matching beginner Spring Boot backend ZIP. Make sure the backend is running before testing API pages.
