import { useEffect } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
} from 'react-native-reanimated';

export default function AnimatedBackground() {
  const { height } = useWindowDimensions();

  const top1 = useSharedValue(0.3 * height);
  const top2 = useSharedValue(0.5 * height);
  const top3 = useSharedValue(0.7 * height);

  useEffect(() => {
  const options = {
    duration: 4000,
    easing: Easing.bezier(0.5, 0, 0.5, 1),
  };

  top1.value = withRepeat(withTiming(0.2 * height, options), -1, true);
  top2.value = withDelay(
    1000,
    withRepeat(withTiming(0.4 * height, options), -1, true)
  );
  top3.value = withDelay(
    2000,
    withRepeat(withTiming(0.6 * height, options), -1, true)
  );
}, [height]);

  const style1 = useAnimatedStyle(() => ({
  transform: [{ translateY: top1.value }],
  width: height * 2,
  height: height * 2,
  borderRadius: height,
  opacity: 0.15,
}));

const style2 = useAnimatedStyle(() => ({
  transform: [{ translateY: top2.value }],
  width: height * 2,
  height: height * 2,
  borderRadius: height,
  opacity: 0.2,
}));

const style3 = useAnimatedStyle(() => ({
  transform: [{ translateY: top3.value }],
  width: height * 2,
  height: height * 2,
  borderRadius: height,
  opacity: 0.25,
}));


  return (
    <View className="absolute top-0 bottom-0 left-0 right-0 items-center">
      {/* circles */}
      <Animated.View  
        className="absolute bg-primary-soft"
        style={style1}
      />
      <Animated.View
        className="absolute bg-primary"
        style={style2}
      />
      <Animated.View
        className="absolute bg-primary-dark"
        style={style3}
      />
    </View>
  );
}
