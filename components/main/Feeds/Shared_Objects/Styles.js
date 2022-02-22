import {StyleSheet} from "react-native"

export const feedStyles = StyleSheet.create({
    video: (width, height) => ({
        alignSelf: 'center',
        width: width,
        height: height
    }),
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    controlsContainer: {
        position: 'absolute',
        bottom: 10,
        padding: 30,
    },
    post: {
        flex: 1, marginBottom: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    screenBackground: {
        flex: 1,
        marginBottom: 20,
        backgroundColor: "black"
    },
    commentsAndLikesCircle: {
        flexDirection: 'row',
        // backgroundColor: "red",
        backgroundColor: 'rgba(52, 52, 52, 0.8)',

        zIndex: 999,
        bottom: 0,
        paddingLeft: 20,
        paddingBottom: 30,
        paddingRight: 10,

        justifyContent: 'space-between',
        alignItems: 'flex-start',
        position: 'absolute',
        //width: 150,
        height: 40,



        textAlign: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    likeAndCommentsBTN_View:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding:4
    },

});