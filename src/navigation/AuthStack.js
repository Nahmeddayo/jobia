import { createStackNavigator } from '@react-navigation/stack';
import ForgotPassword from '../containers/auth/ForgotPassword';
import Login from '../containers/auth/Login';
import NewPassword from '../containers/auth/NewPassword';
import Register from '../containers/auth/Register';
import VerifyCode from '../containers/auth/VerifyCode';
const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
      <Stack.Screen name="NewPassword" component={NewPassword} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
export default AuthStack