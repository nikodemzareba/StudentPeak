import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: Dimensions.get('window').height -48,
    },
    video:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    uiContainer:{
        height: '90%',
        justifyContent: 'flex-end',

    },

    handle: {
        color: 'green',
        fontSize: 16,
        fontWeight: "500",
    },

    description:{
        color: 'green',
        fontSize: 16,
        fontWeight: "200",
        marginBottom: 10,
    },

    //right side for stats
    rightContainer:{
        alignSelf: 'flex-end',
        height: 300,
        justifyContent: 'space-between',
        marginRight: 5,
    },
    bottomContainer:{
        padding: 10,
    },
    profilePic:{
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'grey',
        alignItems: 'center'
    },
    iconContainer:{
        alignItems: 'center'
    },
    statsLabel:{
        color: 'green',
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: '500',
        marginTop: 5,
    }

})
export default styles;