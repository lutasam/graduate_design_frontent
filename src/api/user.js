import httpUtil from "../utils/httpUtil";

/**
 * 用户
 */
export function updateUserInfo(params) {
    return httpUtil.post("api/user/update_user_info", params);
}

export function takeUserInfo(params) {
    return httpUtil.post("api/user/take_user_info", params);
}

export function findUsers(params) {
    return httpUtil.post("api/user/find_users", params);
}

export function deleteUser(params) {
    return httpUtil.post("api/user/delete_user", params);
}