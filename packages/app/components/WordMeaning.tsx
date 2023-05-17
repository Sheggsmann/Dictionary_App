import { View, Dot } from 'app/design/view';
import { Text } from 'app/design/typography';
import { Row } from 'app/design/layout';

type WordMeaningProps = {
  meaning: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      synonyms?: string[];
      antonyms?: string[];
      example?: string;
    }[];
  };
};

export default function WordMeaning({ meaning }: WordMeaningProps) {
  const synonyms = meaning?.definitions.reduce((acc, curr) => {
    if (curr?.synonyms) acc.push(...curr.synonyms);
    return acc;
  }, [] as string[]);

  return (
    <View className="mb-8">
      <Row className="flex-1 items-center justify-between">
        <Text className="align-middle text-2xl font-bold italic dark:text-[#fff]">
          {meaning.partOfSpeech}
        </Text>
        <View className="w-[20px]"></View>
        <View className="h-[2px] w-[100%] bg-[#f4f4f4] dark:bg-[#3a3a3a]"></View>
      </Row>

      <Row className="my-4 items-center">
        <Text className="text-lg text-[#757575]">Meaning</Text>
      </Row>

      <View>
        {meaning.definitions.map((definition, index) => (
          <View key={index.toString()} className="mb-6">
            <Row className="items-start space-x-6">
              <Dot className="mt-3" />
              <Text className="m-0 p-0 text-lg dark:text-[#fff]">
                {definition.definition}
              </Text>
            </Row>
            {definition.example && (
              <Text className="ml-8 mt-3 text-base text-[#757575]">
                {definition.example}
              </Text>
            )}
          </View>
        ))}
      </View>

      {Boolean(synonyms.length) && (
        <Row className="mx-2">
          <Text className="text-lg text-[#757575]">Synonyms</Text>
          <View className="w-[20px]" />
          <View className="max-w-[70%] bg-red-100">
            <Row className="flex-1 flex-wrap items-center">
              {synonyms.map((synonym, index) => (
                <Text
                  key={index.toString()}
                  className="m-0 mb-1 mr-5 p-0 text-base text-[#a445ed]"
                >
                  {synonym}
                </Text>
              ))}
            </Row>
          </View>
        </Row>
      )}
    </View>
  );
}
