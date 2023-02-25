import httpUtil from "../utils/httpUtil";

/**
 * 问诊
 */
export function createInquiry(params) {
    return httpUtil.post("api/inquiry/create_inquiry", params);
}

export function deleteInquiry(params) {
    return httpUtil.post("api/inquiry/delete_inquiry", params);
}

export function uploadReplySuggestion(params) {
    return httpUtil.post("api/inquiry/upload_reply_suggestion", params);
}

export function findInquiryTitles(params) {
    return httpUtil.post("api/inquiry/find_inquiry_titles", params);
}

export function findInquiry(params) {
    return httpUtil.post("api/inquiry/find_inquiry", params);
}

export function findDoctorInquiries(params) {
    return httpUtil.post("api/inquiry/find_doctor_inquiries", params);
}

export function findUserInquiries(params) {
    return httpUtil.post("api/inquiry/find_user_inquiries", params);
}

export function findDoctorSuggestionInquiries(params) {
    return httpUtil.post("api/inquiry/find_doctor_suggestion_inquiries", params);
}