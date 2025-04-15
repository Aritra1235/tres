import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function TabLayout() {
    return (
        <Tabs
      screenOptions={{
        tabBarBackground: () => (
          <BlurView tint="light" intensity={50} style={{ flex: 1 }} />
        ),
        headerBackground: () => (
          <BlurView tint="light" intensity={50} style={{ flex: 1 }} />
        ),
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
        },
        headerStyle: {
          backgroundColor: 'transparent',
        },
      }}
      >
        <Tabs.Screen
        name="(home)/home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(library)/library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="library-music" color={color} />,        }}
      />
      <Tabs.Screen
        name="(search)/search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="search1" color={color} />,        }}
      />

      </Tabs>
    )
}