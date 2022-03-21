import React, {Component, useContext} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import Context from "./context/Context";
import {Grid, Col, Row} from 'react-native-easy-grid'
import Avatar from "./Avatar"


export default function ListItem(
    {type, user, description, style, time, room, image}
){
    const navigation = useNavigation()
    const {theme: {colors},} = useContext(Context)
    return(
        <TouchableOpacity
            style ={{height: 80, ...style}}
            //on press send to the room with user
            onPress={() => navigation.navigate("ChatWindow",{user, room, image})}
        >
            <Grid style={{maxHeight: 80}}>

                <Col style={{width: 80, allignItems: "center", justifyContent: "center"}} >
                    <Avatar user={user}
                            size={type === 'contacts' ? 40 : 65}/>
                </Col>
                <Col style={{marginLeft: 10}}>
                    <Row style={{allignItems: "center"}}>
                        <Col>
                            <Text style={{fontWheight: "bold", fontSize: 16, color: colors.text}}>
                                {user.username || user.firstName}
                            </Text>
                        </Col>
                        {time &&( // if we have time, then display it
                            <Col style={{alignItems: "flex-end"}}>
                                <Text style={{color: colors.secondaryText, fontSize: 11}}>
                                    {new Date(time.seconds * 1000).toLocaleDateString()}
                                </Text>
                            </Col>
                        )}
                    </Row>
                    {description && //if we have description, then display it
                        <Row style={{marginTop: -5}}>
                            <Text style={{color: colors.secondaryText, fontSize: 13}}>{description}</Text>
                        </Row>
                    }
                </Col>
            </Grid>
        </TouchableOpacity>
    )
}
