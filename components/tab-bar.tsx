import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Home, Clock, Settings, type LucideIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { THEME } from '@/lib/theme';
import { cn } from '@/lib/utils';

const TAB_ICONS: Record<string, LucideIcon> = {
  index: Home,
  history: Clock,
  settings: Settings,
};

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const colors = THEME[colorScheme ?? 'light'];

  return (
    <View
      className="border-t border-border bg-card"
      style={{ paddingBottom: insets.bottom }}
    >
      <View className="flex-row items-end justify-around px-2 pt-2 pb-1">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const isFocused = state.index === index;
          const Icon = TAB_ICONS[route.name] ?? Home;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={label}
              className="flex-1 items-center py-1"
            >
              <Icon
                size={24}
                color={isFocused ? colors.foreground : colors.mutedForeground}
                strokeWidth={isFocused ? 2.25 : 1.75}
              />
              <Text
                className={cn(
                  'text-[10px] mt-1',
                  isFocused
                    ? 'text-foreground font-semibold'
                    : 'text-muted-foreground font-medium'
                )}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
