import {StyleSheet} from "react-native"

export const feedStyles = StyleSheet.create({

    stories: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 0,
        marginBottom: 10,
        width: 60, height: 60
    },
    video: (width, height) => ({
        alignSelf: 'center',
        width: width,
        height: height,
        borderBottom:20,
        padding:20
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
    commentsAndLikesCircle: (position) => ({
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
        position: position,
        width: 150,
        height: 40,



        textAlign: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    }),
    likeAndCommentsBTN_View:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding:4
    },
    trendingTopics:{
        flexDirection:"row",
        alignContent:"center",

        alignSelf: 'flex-start',



        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,

        height: 60,

        textAlign:"center",
        alignItems: 'center',
        backgroundColor: 'white',
        padding:5,

    },
    trendingNumber:{

        flexDirection:"row",
        alignContent:"center",

        alignSelf: 'flex-start',


        height: 45,
        borderRadius: 45,
        // textAlign: 'center',
        alignItems:"center",
        backgroundColor:"black",
        paddingRight:10


    }

});