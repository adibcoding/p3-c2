import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MainStack from "./MainStack";
const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => {
          return {
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Dashboard") {
                iconName = focused ? "ios-home" : "ios-home-outline";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={"teal"} />;
            },
            // tabBarLabelStyle: { color: "teal" },
            tabBarActiveTintColor: "teal",
            tabBarInactiveTintColor: "gray",
          };
        }}
      >
        <Tab.Screen
          name="Dashboard"
          // component={Home}
          component={MainStack} // nested navigator
        />
      </Tab.Navigator>
    </>
  );
};
