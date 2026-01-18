import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export function FadeIn({ children, delay = 0, className }: Props) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 }, undefined);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View className={className} style={animatedStyle}>
      {children}
    </Animated.View>
  );
}
