import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {colors} from '../../constants/colors';
import DrawerContent from './DrawerContent';
import AppStack from '../AppStack';
const DrawerScreen = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        overlayColor: 'transparent',
        drawerType: 'slide',
        drawerStyle: {
          flex: 1,
          backgroundColor: colors.primary,
        },
        headerShown: false,
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen options={{}} name="HomeScreen" component={AppStack} />
    </Drawer.Navigator>
  );
};

export default DrawerScreen;
