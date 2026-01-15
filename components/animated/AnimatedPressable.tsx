import { Pressable, PressableProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { useEffect } from "react";

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

type Props = PressableProps & {
  delay?: number;
  active?: boolean;
};

export function AnimatedPressable({
  children,
  delay = 0,
  active = false,
  ...props
}: Props) {
  const scale = useSharedValue(0.95);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
    scale.value = withSpring(1, { damping: 12 });
  }, []);

  useEffect(() => {
    if (active) {
      scale.value = withRepeat(
        withTiming(1.03, { duration: 1000 }),
        -1,
        true
      );
    } else {
      scale.value = withSpring(1);
    }
  }, [active]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <AnimatedPressableBase
      {...props}
      style={animatedStyle}
      onPressIn={() => {
        scale.value = withSpring(0.96);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
    >
      {children}
    </AnimatedPressableBase>
  );
}
