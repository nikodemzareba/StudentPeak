import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';



export default function Events() {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    console.log("\n\nData"+data);

    useEffect(() => {
        fetch('/api/googleEvents/Clubbing%20In%20Canterbury/United%20Kingdom')
            .then((response) => response.json())
            .then(async (json) => {
                await setData(json);
                console.log(`\n\nResults \n${json}`);
                console.log(`\n\nTitle 1\n${json[0].title}`);
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setLoading(false)
               });



        }, []);

    return (

        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? <Text>Loading...</Text> :
                ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
                        <Text style={{ fontSize: 18, color: 'green', textAlign: 'center'}}>{data.title}</Text>
                        <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>Articles:</Text>

                    </View>
                )}
        </View>
    );
};
