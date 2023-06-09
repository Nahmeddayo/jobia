import { createStackNavigator } from "@react-navigation/stack";
import Home from "../containers/app/Home";
import JobDetails from "../containers/app/JobDetails/index";
import Profile from "../containers/app/Profile";

const AppStack = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator
            initialRouteName="Home"
        >
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="JobDetails" component={JobDetails} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default AppStack