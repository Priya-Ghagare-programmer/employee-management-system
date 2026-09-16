// =========================
// LOGOUT
// =========================

export function logout() {
    localStorage.clear();
    window.location.href = "/login";
}


// =========================
// ADMIN
// =========================

export function getAdminName() {
    return localStorage.getItem("adminName");
}

export function getAdminEmail() {
    return localStorage.getItem("adminEmail");
}

export function getAdminRole() {
    return localStorage.getItem("adminRole");
}


// =========================
// EMPLOYEE
// =========================

export function getEmployeeDbId() {
    return localStorage.getItem("employeeDbId");
}

// export function getBusinessEmployeeId() {
//     return localStorage.getItem("employeeBusinessId");
// }

export function getBusinessEmployeeId() {
    return localStorage.getItem("employeeBusinessId");
}

export function getEmployeeName() {
    return localStorage.getItem("employeeName");
}

export function getEmployeeEmail() {
    return localStorage.getItem("employeeEmail");
}