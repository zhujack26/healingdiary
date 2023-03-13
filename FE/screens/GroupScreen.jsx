import { useWindowDimensions, View, ScrollView, Text, StyleSheet } from "react-native";
import GroupList from "../components/group/GroupList";
import GroupList2 from "../components/group/GroupList2";
import GroupList3 from "../components/group/GroupList3";
import * as React from "react";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { GlobalColors } from "../constants/color";

const GroupScreen = () => {
  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: GlobalColors.colors.background500 }}>
    < GroupList/>
    </View>
  );
  
  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: GlobalColors.colors.background500 }}>
    < GroupList2/>
    </View>
  );

  const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: GlobalColors.colors.background500 }}>
    < GroupList3/>
    </View>
  );
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute
  });
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "전체" },
    { key: "second", title: "내 소모임" },
    { key: "third", title: "추천 소모임" }
  ]);



  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{
            backgroundColor: "rgb(240, 80, 20)",
            borderRadius: 20,
            width: 50,
            height: 50,
          }}
          style={{
            backgroundColor: GlobalColors.colors.gray400,
            shadowColor: "transparent"
          }}
          pressColor={"transparent"}
        />
      )}
    />

  );
};

const styles = StyleSheet.create({});

export default GroupScreen;


