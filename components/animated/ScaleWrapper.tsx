import { Animated } from "react-native";
import { useEffect, useRef } from "react";

type ScaleWrapperProps = {
  active: boolean;
  children: React.ReactNode;
};

export function ScaleWrapper({ active, children }: ScaleWrapperProps) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: active ? 1.08 : 1,
      useNativeDriver: true,
      friction: 6,
    }).start();
  }, [active]);

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
      }}
    >
      {children}
    </Animated.View>
  );
}
