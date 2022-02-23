import React from 'react';
import { View, ActivityIndicator } from "react-native";

const MyActivityIndicator = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center"}}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    );
}

export default MyActivityIndicator;