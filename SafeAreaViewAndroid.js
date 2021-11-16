import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: "pink",
        paddingTop: Platform.OS === 'android' ? 50 : 0
    },
});