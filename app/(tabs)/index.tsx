import AsyncStorage from '@react-native-async-storage/async-storage';
import { File, Paths } from 'expo-file-system';
import { useShareIntentContext } from 'expo-share-intent';
import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const STORAGE_KEY = 'shared-receipt-image';
const SAVED_FILENAME = 'last-shared-receipt.jpg';

export default function HomeScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { hasShareIntent, shareIntent, resetShareIntent } =
    useShareIntentContext();
  const insets = useSafeAreaInsets();

  // Load saved image on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((uri) => {
      if (uri) setImageUri(uri);
    });
  }, []);

  // Handle incoming share intent
  useEffect(() => {
    if (!hasShareIntent || !shareIntent?.files?.length) return;

    const file = shareIntent.files[0];

    (async () => {
      try {
        const source = new File(file.path);
        const destination = new File(Paths.document, SAVED_FILENAME);

        // Delete previous file if it exists
        if (destination.exists) {
          destination.delete();
        }

        source.copy(destination);

        await AsyncStorage.setItem(STORAGE_KEY, destination.uri);
        setImageUri(destination.uri);
      } catch (e) {
        console.error('Failed to save shared image:', e);
      } finally {
        resetShareIntent();
      }
    })();
  }, [hasShareIntent, shareIntent]);

  return (
    <View
      className="flex-1 bg-background"
      style={{ paddingTop: insets.top }}
    >
      <View className="px-6 pt-6 pb-4">
        <Text className="text-3xl font-bold text-foreground">receiptly</Text>
        <Text className="mt-1 text-muted-foreground">Scan. Track. Save.</Text>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        {imageUri ? (
          <View className="w-full items-center gap-4">
            <View className="w-full overflow-hidden rounded-2xl border border-border bg-card">
              <Image
                source={{ uri: imageUri }}
                className="aspect-[3/4] w-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-sm text-muted-foreground">
              Last shared receipt
            </Text>
          </View>
        ) : (
          <View className="w-full items-center">
            <Text className="text-lg text-muted-foreground text-center">
              No receipt yet
            </Text>
            <Text className="mt-2 text-sm text-muted-foreground text-center">
              Share an image from your gallery to get started
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
