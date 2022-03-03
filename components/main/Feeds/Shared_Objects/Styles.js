import {Dimensions, StyleSheet} from "react-native"

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
        flex: 1,
        marginBottom: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    screenBackground: {
       flex: 1,
       paddingTop:20,
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
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    commentsContainer: {
        width: Dimensions.get('window').width,
        position: 'absolute',
        zIndex: 999,
        bottom: 0,
        paddingLeft: 20,
        paddingBottom: 20,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'}
    ,
    actionButton: {
        paddingBottom: 16
    },
    actionButtonText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 4
    },
    showCommentContainer: {
        padding: 20,
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#363434'
    },
    containerText: {
        marginHorizontal: 14
    },
    displayName: {
        color: 'gray',
        fontSize: 13
    },
    textInput: {
        borderColor: 'lightgray',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingVertical: 5,

    },
    avatarSmall: {
        height: 32,
        width: 32,
        borderRadius: 16
    },

    TextInputContainer :{

        justifyContent: 'flex-end',
        flex: 1
    },
    containerInput: {
        padding: 10,
        flexDirection: 'row'

    },
    input: {
        backgroundColor: 'lightgrey',
        borderRadius: 4,
        flex: 1,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        color: 'black',
    }

});