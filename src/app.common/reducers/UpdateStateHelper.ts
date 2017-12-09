export function updateState<T>(state: T, payload: Partial<T>): T {
    return Object.assign({}, state, payload);
}