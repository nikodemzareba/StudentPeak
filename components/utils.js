function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return 'Now';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
        return Math.round(elapsed / msPerYear) + ' years ago';
    }
}

export { timeDifference };

const colors = {
    tealGreen: "#083835",
    tealGreenDark: "#566765",
    green: "#d3d9d5",
    lime: "#6f756a",
    skyblue: "#34b7f1",
    smokeWhite: "#ece5dd",
    white: "white",
    gray: "#3C3C3C",
    lightGray: "#757575",
    iconGray: "#717171",
};

export const theme = {
    colors: {
        background: colors.smokeWhite,
        foreground: colors.tealGreenDark,
        primary: colors.tealGreen,
        tertiary: colors.lime,
        secondary: colors.green,
        white: colors.white,
        text: colors.gray,
        secondaryText: colors.lightGray,
        iconGray: colors.iconGray,
    },
};