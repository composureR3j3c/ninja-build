import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export function ScaleIn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scale = useSharedValue(0.9);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View className={className} style={animatedStyle}>
      {children}
    </Animated.View>
  );
}
