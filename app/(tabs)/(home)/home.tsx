import {
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  Text,
  Animated,
} from "react-native";
import { BlurView } from 'expo-blur';
import { useRef } from 'react';

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 60],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={{
        height: headerHeight,
        justifyContent: 'flex-end',
        padding: 16,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0, left: 0, right: 0,
        zIndex: 10,
      }}>
        <BlurView tint="light" intensity={50} style={{ ...StyleSheet.absoluteFillObject }} />
        <Animated.Text style={{ fontSize: 32, opacity: titleOpacity }}>
          Home
        </Animated.Text>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: 130 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Fake content */}
        {[...Array(30)].map((_, i) => (
          <View key={i} style={{ padding: 24 }}>
            <Text>Item {i + 1}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}
  