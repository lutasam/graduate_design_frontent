import httpUtil from "../utils/httpUtil";

/**
 * 医生
 */
export function takeDoctorInfo(params) {
    return httpUtil.post("api/doctor/take_doctor_info", params);
}

export function updateDoctorInfo(params) {
    return httpUtil.post("api/doctor/update_doctor_info", params);
}

export function findDoctors(params) {
    return httpUtil.post("api/doctor/find_doctors", params);
}

export function deleteDoctor(params) {
    return httpUtil.post("api/doctor/delete_doctor", params);
}

export function activeDoctor(params) {
    return httpUtil.post("api/doctor/active_doctor", params);
}

export function findHospitalDoctors(params) {
    return httpUtil.post("api/doctor/find_hospital_doctors", params);
}