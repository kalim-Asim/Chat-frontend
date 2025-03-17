export let UserCount: number = 0;
export function incrementUserCount() {
    UserCount = UserCount + 1;
}
export const allsockets: WebSocket[] = [];