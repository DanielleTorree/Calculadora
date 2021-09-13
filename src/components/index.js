import React from "react";
import {
    TouchableHighlight,
    Text
} from "react-native";

const Button = (props) => {
    return (
    <TouchableHighlight
        key={props.key}
        onPress={props.onEvent}
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: props.colorButton,
          justifyContent: "center",
          alignItems: "center"
        }}
        underlayColor="#ccc"
      >
        <Text
          style={{
            fontSize: 32,
            color: props.colorText
          }}
        >{props.symbol}</Text>
      </TouchableHighlight>
    );
}

export default Button;