import React from "react";
import Navigation from "./src/navigation/index"
import CommonAlert from "./src/components/CommonAlert";
import { constants } from "./src/constants/variables";
import { SafeAreaView } from "react-native"
import { Provider } from "react-redux";
import store from "./src/redux";

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigation />
        <CommonAlert
          ref={ref => {
            constants.commonAlert = ref;
          }}
        />
      </SafeAreaView>
    </Provider>

  )
}

export default App