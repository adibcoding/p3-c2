import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#32302A",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Kompres",
          }}
        />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </>
  );
}
