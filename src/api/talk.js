import httpUtil from "../utils/httpUtil";

/**
 * 通讯
 */
export function getTalkedUsers(params) {
    return httpUtil.post("api/talk/get_talked_users", params);
}

export function addTalkedUser(params) {
    return httpUtil.post("api/talk/add_talked_user", params);
}