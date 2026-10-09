// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8080/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });


// // =========================
// // AUTH
// // =========================

// export const authApi = {
//   login: (data) => api.post("/auth/login", data),
//   register: (data) => api.post("/auth/register", data),
// };


// // =========================
// // EMPLOYEE
// // =========================

// export const employeeApi = {
//   getAll: () => api.get("/employees"),

//   getById: (id) =>
//     api.get(`/employees/${id}`),

//   add: (data) =>
//     api.post("/employees", data),

//   update: (id, data) =>
//     api.put(`/employees/${id}`, data),

//   delete: (id) =>
//     api.delete(`/employees/${id}`),
// };


// // =========================
// // DEPARTMENT
// // =========================

// export const departmentApi = {

//   getAll: () =>
//     api.get("/departments/getalldep"),

//   add: (data) =>
//     api.post("/departments/addDep", data),

//   update: (id, data) =>
//     api.put(`/departments/editby/${id}`, data),

//   delete: (id) =>
//     api.delete(`/departments/deleteby/${id}`),

// };


// // =========================
// // ATTENDANCE
// // =========================

// export const attendanceApi = {

//   getAll: () =>
//     api.get("/attendance"),

//   getByEmployee: (id) =>
//     api.get(`/attendance/employee/${id}`),

//   mark: (id, status = "PRESENT") =>
//     api.post(
//       `/attendance/mark/${id}?status=${status}`
//     ),

// };


// // =========================
// // LEAVE
// // =========================

// export const leaveApi = {

//   getAll: () =>
//     api.get("/leaves"),

//   getByEmployee: (id) =>
//     api.get(`/leaves/employee/${id}`),

//   apply: (data) =>
//     api.post("/leaves", data),

//   decision: (id, status, remark = "") =>
//     api.put(
//       `/leaves/${id}/decision?status=${status}&remark=${encodeURIComponent(remark)}`
//     ),

//   delete: (id) =>
//     api.delete(`/leaves/${id}`),

// };


// // =========================
// // TASK
// // =========================

// export const taskApi = {

//   getAll: () =>
//     api.get("/tasks"),

//   getByEmployee: (id) =>
//     api.get(`/tasks/employee/${id}`),

//   add: (data) =>
//     api.post("/tasks", data),

//   updateStatus: (id, status) =>
//     api.put(`/tasks/${id}/status?status=${status}`),

//   delete: (id) =>
//     api.delete(`/tasks/${id}`),

// };


// // =========================
// // SALARY
// // =========================

// export const salaryApi = {

//   getAll: () =>
//     api.get("/salary"),

//   getByEmployee: (id) =>
//     api.get(`/salary/employee/${id}`),

//   generate: (employeeId, params) =>
//     api.post(
//       `/salary/generate/${employeeId}`,
//       null,
//       { params }
//     ),

// };


// export default api;


//from chatgpt


import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});


// =========================
// JWT INTERCEPTOR
// =========================

api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// =========================
// AUTH
// =========================

export const authApi = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
};


// =========================
// EMPLOYEE
// =========================

// export const employeeApi = {
//   getAll: () => api.get("/employees"),

//   getById: (id) =>
//     api.get(`/employees/${id}`),

//   add: (data) =>
//     api.post("/employees", data),

//   update: (id, data) =>
//     api.put(`/employees/${id}`, data),

//   delete: (id) =>
//     api.delete(`/employees/${id}`),
// };

//for pagignation
export const employeeApi = {
  getAll: () => api.get("/employees"),

  getPaginated: (page, size) =>
    api.get(`/employees/paginated?page=${page}&size=${size}`),

  getById: (id) =>
    api.get(`/employees/${id}`),

  add: (data) =>
    api.post("/employees", data),

  update: (id, data) =>
    api.put(`/employees/${id}`, data),

  delete: (id) =>
    api.delete(`/employees/${id}`),
};

// =========================
// DEPARTMENT
// =========================

export const departmentApi = {

  getAll: () =>
    api.get("/departments/getalldep"),

  add: (data) =>
    api.post("/departments/addDep", data),

  update: (id, data) =>
    api.put(`/departments/editby/${id}`, data),

  delete: (id) =>
    api.delete(`/departments/deleteby/${id}`),

};


// =========================
// ATTENDANCE
// =========================

export const attendanceApi = {

  getAll: () =>
    api.get("/attendance"),

  getByEmployee: (id) =>
    api.get(`/attendance/employee/${id}`),

  mark: (id, status = "PRESENT") =>
    api.post(
      `/attendance/mark/${id}?status=${status}`
    ),

};


// =========================
// LEAVE
// =========================

export const leaveApi = {

  getAll: () =>
    api.get("/leaves"),

  getByEmployee: (id) =>
    api.get(`/leaves/employee/${id}`),

  apply: (data) =>
    api.post("/leaves", data),

  decision: (id, status, remark = "") =>
    api.put(
      `/leaves/${id}/decision?status=${status}&remark=${encodeURIComponent(remark)}`
    ),

  delete: (id) =>
    api.delete(`/leaves/${id}`),

};


// =========================
// TASK
// =========================

export const taskApi = {

  getAll: () =>
    api.get("/tasks"),

  getByEmployee: (id) =>
    api.get(`/tasks/employee/${id}`),

  add: (data) =>
    api.post("/tasks", data),

  updateStatus: (id, status) =>
    api.put(`/tasks/${id}/status?status=${status}`),

  delete: (id) =>
    api.delete(`/tasks/${id}`),

};


// =========================
// SALARY
// =========================

export const salaryApi = {

  getAll: () =>
    api.get("/salary"),

  getByEmployee: (id) =>
    api.get(`/salary/employee/${id}`),

  generate: (employeeId, params) =>
    api.post(
      `/salary/generate/${employeeId}`,
      null,
      { params }
    ),

};


export default api;