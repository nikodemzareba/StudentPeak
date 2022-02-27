export const isUserNameTooLong = (username, maxUsernameLengthForDisplay ) => {
    if (username.length > maxUsernameLengthForDisplay) {
        return username.slice(0, maxUsernameLengthForDisplay) + "..."
    }
    return username;
}