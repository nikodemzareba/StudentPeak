import * as React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Linking} from 'react-native';

export default function Tickets({tickets}) {

    const areYouSure = (link) => {
        const msg = "Are you sure you want to open the third party link, the safety of this link is unknown?";
        let activated = false;

        alert(msg);
        Alert.alert('Error', msg, [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    console.log('OK Pressed');
                    Linking.openURL(link);
                    activated = true;
                }
            },
        ]);

        {/*
        Option alerts don't exist on web so just open the link
        If the link has already been opened, exit
        */}
        if(activated)
        {
            return;
        }

        Linking.openURL(link);
    }

    return (
        <View style={styles.tickets}>
            {/* <Text style={styles.ticketText}>Tickets Available At:   </Text> */}
            {tickets.map((ticket, i) => {
                return (
                    <View key={ticket.source} style={styles.ticket}>
                        <Text style={styles.ticketText} onPress={() =>areYouSure(ticket.link)}>
                            {ticket.source}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tickets: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 4,
    },
    ticket: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderWidth: 1,
        borderRadius: 14,
        borderColor: '#ccc',
        marginRight: 4,
        marginBottom: 4,
    },
    ticketText: {
        fontSize: 15,
        opacity: 0.4
    }
});