import { View } from 'react-native';

import { Text } from '@/components/ui/text';

export default function HistoryScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="text-2xl font-bold text-foreground">aHistoryv3</Text>
      <Text className="mt-2 text-muted-foreground">
        Your scanned receipts will appear here
      </Text>
    </View>
  );
}
