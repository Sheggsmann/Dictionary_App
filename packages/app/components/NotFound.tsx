import { View } from 'app/design/view';
import { Text } from 'app/design/typography';

export default function NotFound() {
  return (
    <View className="flex-1 items-center pt-32">
      <Text className="mx-4 text-[60px]">🙁</Text>
      <Text className="mx-4 my-6 text-center text-lg dark:text-[#fff]">
        No Definitions Found
      </Text>
      <Text className="mx-4 text-center text-base text-[#757575]">
        {
          "Sorry pal, We couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead."
        }
      </Text>
    </View>
  );
}
