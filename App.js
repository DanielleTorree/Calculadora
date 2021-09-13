import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from "react-native";
import { Icon } from "react-native-elements";

const App = () => {

  const button = ["AC", "DEL", "%", "/", 7, 8, 9, "X", 4, 5, 6, "-", 1, 2, 3, "+", "+/-", 0, ".", "="];
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");
  const {width, height} = Dimensions.get("window"); 

  console.log("height", height)

  console.log("currentNumber::: ", currentNumber)
  console.log("typeof::: ", typeof currentNumber)

  const calculator = () => {
    const splitNumber = currentNumber.split(" ");
    let firstNumber = splitNumber[0];
    let operator = splitNumber[1];
    let secondNumber = splitNumber[2];
    let result = 0

    switch(operator){
      case "/":
        setLastNumber(currentNumber);
        result = parseFloat(firstNumber) / parseFloat(secondNumber);
        setCurrentNumber(result.toString());
        break;
      case "X":
        setLastNumber(currentNumber);
        result = parseFloat(firstNumber) * parseFloat(secondNumber);
        setCurrentNumber(result.toString());
        break;
      case "-":
        setLastNumber(currentNumber);
        result = parseFloat(firstNumber) - parseFloat(secondNumber);
        setCurrentNumber(result.toString());
        break;
      case "+":
        setLastNumber(currentNumber);
        result = parseFloat(firstNumber) + parseFloat(secondNumber);
        setCurrentNumber(result.toString());
      break;
      default:
        setLastNumber(firstNumber)
        setCurrentNumber(firstNumber)
    }
  }

  const changeSignal = () => {
    const splitNumber = currentNumber.split(" ");
    let firstNumber = splitNumber[0];
    let operator = splitNumber[1];
    let secondNumber = splitNumber[2];

    if(firstNumber != ""){
      setCurrentNumber(currentNumber * (-1))  ;
    }

    if(operator != undefined && secondNumber != undefined){
      setCurrentNumber(firstNumber + " " + operator + " " + secondNumber * (-1));
    }
  }

  const handleInput = (btn) => {
    if(btn == "/" || btn == "X" || btn == "-" || btn =="+"){
      setCurrentNumber(currentNumber + " " + btn + " ");
      return;
    }

    setCurrentNumber(currentNumber + btn);

    switch(btn){
      case "AC":
        setCurrentNumber("");
        setLastNumber("");
        break;

      case "DEL":
        setCurrentNumber(currentNumber.substr(0, currentNumber.length - 1));
        break;

      case "%":
        setLastNumber(currentNumber + "%");
        setCurrentNumber(currentNumber / 100);
        break;

      case "=":
        setCurrentNumber(currentNumber + "=");
        calculator();
        break;

      case "+/-":
        changeSignal();
        break;
    }
    
  }

  return (
    <View style={{ flex: 1, backgroundColor: !darkMode ? "#ffffff" : "#56626b", width: "100%", height:"100%" }}>
      <StatusBar barStyle={!darkMode ? "dark-content" : "light-content"} backgroundColor={!darkMode ? "#fff3" : "#56626b"} />
      <View
        style={{
          justifyContent:"center",
          alignItems:"flex-start",
          marginVertical: 10,
          marginHorizontal: 32,
          width: "100%"
        }}
      >
        <TouchableOpacity
          onPress={() => setDarkMode(!darkMode)}
           style={{
            backgroundColor:!darkMode ?  "#708090" : "#ffffff33",
            width: 48, 
            height: 48,
            borderRadius: 24,
            justifyContent: "center",
            alignItems:"center",
            marginVertical: 10,
            marginHorizontal: 10
          }}
        >
          <Icon
            name={!darkMode ? 'sun' : 'moon'} 
            type='feather'
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "flex-end", 
          alignItems: "flex-end",
          paddingRight: 50,
          marginTop: height < 685 ? -5 : 90 
        }}
      >
        <Text style={{ fontSize: 32 }}>{lastNumber}</Text>
        <Text style={{ fontSize: 32, marginVertical: 20 }}> {currentNumber} </Text>
      </View>
      
      <View 
        style={{
          width: "100%",
          height: 1,
          backgroundColor: !darkMode ? "#ccc" : "#ccc3",
        }}
      ></View>
      <View style={{ justifyContent: "flex-end", alignItems: "flex-end"}}>
        <View 
          style={{
            flexWrap: "wrap",
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end"
          }}
        >
          {button.map((btn) => (
            btn === "=" ? (
              <TouchableOpacity
                key={btn}
                onPress ={() => handleInput(btn)}
                style={{
                  backgroundColor:"#00a000",
                  width: 70, 
                  height: 70,
                  borderRadius: 35,
                  justifyContent: "center",
                  alignItems:"center",
                  marginVertical: 10,
                  marginHorizontal: 10
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    fontSize: 16
                  }}
                >{btn}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={btn}
                onPress ={() => handleInput(btn)}
                style={{
                  backgroundColor:"#ccc3",
                  width: 70, 
                  height: 70,
                  borderRadius: 35,
                  justifyContent: "center",
                  alignItems:"center",
                  marginVertical: 10,
                  marginHorizontal: 10
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "bold",        
                    // var cargo = salario <= 1000 ? 'junior' : salario <= 5000 ? 'senior' : 'diretor';
                    color:  btn === "AC" || btn === "DEL" ? "#f08080" : typeof(btn) !== "number" ? "#00a000" : darkMode ? "#FFF" : "#000"
                  }}
                >{btn}</Text>
              </TouchableOpacity>
            )
          ))}
        </View>

      </View>      
    </View>
  );
}

export default App;