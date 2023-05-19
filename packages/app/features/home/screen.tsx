import { useState } from 'react';
import { useQuery } from 'react-query';
import { ScrollView, Keyboard } from 'react-native';
import { A, H1, Text } from 'app/design/typography';
import { View } from 'app/design/view';
import Header from 'app/components/Header';
import SearchBar from 'app/components/SearchBar';
import WordMeaning from 'app/components/WordMeaning';
import NotFound from 'app/components/NotFound';
import PlayButton from 'app/components/PlayButton';

import { useSafeArea } from 'app/provider/safe-area/use-safe-area';
import { getWordMeaning } from 'app/api/wordMeaning';

export type IMeaning = {
  partOfSpeech: string;
  definitions: {
    definition: string;
    synonyms: string[];
    antonyms?: string[];
    example?: string;
  }[];
};

type IWordResponse = {
  word: string;
  phonetic: string;
  phonetics: { text: string; audio: string }[];
  meanings: IMeaning[];
  sourceUrls: string[];
}[];

export function HomeScreen() {
  const insets = useSafeArea();
  const [word, setWord] = useState('');

  const { data, error, isLoading, refetch } = useQuery<
    IWordResponse | null,
    { message?: string }
  >(['wordMeaning', word], () => getWordMeaning(word), {
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const onSearch = () => {
    if (word.length) {
      refetch();
      Keyboard.dismiss();
    }
  };

  const getSoundUri = (data: IWordResponse): string => {
    if (!data || !data[0]?.phonetics) return '';

    let soundUri = '';
    for (const phonetic of data[0].phonetics) {
      if (phonetic?.audio) {
        soundUri = phonetic?.audio;
        break;
      }
    }

    return soundUri;
  };

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="flex-1 items-center bg-[#fff] dark:bg-[#050505]"
    >
      <View className="w-[100%] flex-1 md:w-[736px]">
        <Header />

        <SearchBar
          isLoading={isLoading}
          word={word}
          onChangeText={setWord}
          onSearch={onSearch}
        />

        <View className="web:px-4 h-[100%] w-[100%] flex-1 md:px-4">
          {isLoading || error ? (
            isLoading ? (
              <Text className="mx-4 text-base dark:text-[#fff]">
                Loading...
              </Text>
            ) : (
              <NotFound />
            )
          ) : data ? (
            <ScrollView
              className="bg-red-100 px-4"
              keyboardDismissMode="on-drag"
            >
              <View className="mt-2 flex-row items-center justify-between md:mt-8">
                <View>
                  <H1>{data[0]?.word}</H1>
                  <Text className="text-lg text-[#a445ed]">{`${
                    data[0]?.phonetic ? data[0]?.phonetic : ''
                  }`}</Text>
                </View>

                <PlayButton soundUri={getSoundUri(data)} />
              </View>

              <View className="h-[32px]" />

              {data[0]?.meanings.map((meaning: IMeaning, index) => (
                <WordMeaning meaning={meaning} key={index.toString()} />
              ))}

              <View className="mb-8 h-[2px] w-[100%] bg-[#f4f4f4] dark:bg-[#3a3a3a]"></View>

              <View className="h-[50px]">
                <Text className="text-base text-[#757575] underline">
                  Source
                </Text>
                <A
                  href={data[0]?.sourceUrls[0]}
                  hrefAttrs={{
                    target: '_blank',
                    rel: 'noreferrer',
                  }}
                  className="dark:text-[#fff]"
                >
                  {data[0]?.sourceUrls[0]}
                </A>
              </View>

              <View className="h-[50px]" />
            </ScrollView>
          ) : (
            <View />
          )}
        </View>
      </View>
    </View>
  );
}
