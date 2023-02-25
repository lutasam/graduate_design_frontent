import httpUtil from "../utils/httpUtil";

/**
 * 医院
 */
export function takeHospitalInfo(params) {
    return httpUtil.post("api/hospital/take_hospital_info", params);
}

export function findHospitals(params) {
    return httpUtil.post("api/hospital/find_hospitals", params);
}

export function findHospitalDepartmentNames(params) {
    return httpUtil.post("api/hospital/find_hospital_department_names", params);
}