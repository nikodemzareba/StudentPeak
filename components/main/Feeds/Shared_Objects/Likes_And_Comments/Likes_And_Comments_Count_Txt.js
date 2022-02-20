import {Text} from "react-native";
import React from "react";
import {B} from "../Bold";

export default function Likes_And_Comments_Count_Txt(props) {

    const splitNumberByCommas = (value) =>{

        console.log(`\nLikePost Value: ${value}`)

        const stringVal = `${value}`;
        const txt_Split = Array.from(stringVal);
        const txtLength = txt_Split.length;

        let  result = "";
        let count = 0;

        for (let i = txtLength-1; i >= 0; i--) {

            console.log(`\nChar: ${txt_Split[i]}`)
            if(count!== 0 && count % 3 === 0)
            {
                result = "," +result;
            }
            result = `${txt_Split[i]}`+result;
            count++;
        }
        return result;
    }
    return (
        <Text style={{marginLeft: 10, color: 'white', fontSize: 15, fontWeight: 'bold', paddingRight:10}}
              onPress={() => {
                  if(props.use === "like")
                  {
                      console.log(`\n\nGo to Likes Count Page`)
                      // props.navigation.navigate("PublicProfile", {uid: props.userID})
                  }
                  else if(props.use === "comment")
                  {
                      console.log(`\n\nGo to Likes Comments Page`)
                      // props.navigation.navigate("PublicProfile", {uid: props.userID})
                  }
              }
              }>
           <B>{splitNumberByCommas(props.count)}</B></Text>
    )
}