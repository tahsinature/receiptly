import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Text } from '@/components/ui/text';

export default function SettingsScreen() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="text-2xl font-bold text-foreground">
        {t('settings.title')}
      </Text>
      <Text className="mt-2 text-muted-foreground">
        {t('settings.subtitle')}
      </Text>
    </View>
  );
}
