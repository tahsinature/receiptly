import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Text } from '@/components/ui/text';

export default function HistoryScreen() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="text-2xl font-bold text-foreground">
        {t('history.title')}
      </Text>
      <Text className="mt-2 text-muted-foreground">
        {t('history.empty')}
      </Text>
    </View>
  );
}
