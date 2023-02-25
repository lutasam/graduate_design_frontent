const WEBSOCKET_PREFIX = "ws://localhost:8081/talk/ws/";
export function getWebSocketUrl(fromid, toid) {
    let minid = Math.min(fromid, toid);
    let maxid = Math.max(fromid, toid);
    return WEBSOCKET_PREFIX + minid + "_" + maxid;
}