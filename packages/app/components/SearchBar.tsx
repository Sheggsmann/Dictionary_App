import { useState, useEffect, useContext } from 'react';
import { View } from 'app/design/view';
import { TextInput, Platform } from 'react-native';
import { SolitoImage } from 'solito/image';
import { Button } from 'app/design/button';
import { Text } from 'app/design/typography';

import Colors from 'app/design/colors';
import ThemeContext from 'app/provider/theme';

const searchIcon = require('../assets/images/search.png');

type SearchBarProps = {
  isLoading: boolean;
  word: string;
  onSearch: () => void;
  onChangeText: (text: string) => void;
};

export default function SearchBar({
  isLoading,
  word,
  onSearch,
  onChangeText,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const { mode } = useContext(ThemeContext);

  const [error, setError] = useState(false);

  useEffect(() => {
    if (word.length) {
      setError(false);
    }
  }, [word]);

  const handleSearch = () => {
    if (!word.length) {
      setError(true);
      return;
    }

    onSearch();
  };

  return (
    <View>
      <View
        className="mx-4 mb-4 h-[60px] w-[screen] flex-row items-center justify-center overflow-hidden rounded-[15px] md:my-2"
        style={[
          {
            borderWidth: 1,
            borderColor: 'transparent',
            backgroundColor: mode === 'light' ? '#f4f4f4' : Colors.black_500,
          },
          focused && { borderColor: Colors.purple },
          error && { borderColor: Colors.red },
        ]}
      >
        <TextInput
          autoCorrect={false}
          style={[
            Platform.OS === 'web' && {
              outlineStyle: 'none',
              flex: 1,
              paddingHorizontal: 20,
              fontSize: 16,
              fontWeight: 'bold',
            },
            {
              color: mode === 'light' ? '#000' : '#fff',
              height: '100%',
            },
          ]}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={word}
          onChangeText={(text) => onChangeText(text)}
          className="flex-1 rounded-[15px] p-4 text-sm"
          placeholder="Search for any word..."
          placeholderTextColor={'#757575'}
        />

        <Button
          className="right-3 h-[40px] w-[40px] items-center justify-center"
          activeOpacity={0.7}
          onPress={handleSearch}
          disabled={isLoading}
        >
          <SolitoImage
            src={searchIcon}
            alt="Search Icon"
            width={17}
            height={17}
            resizeMode="contain"
          />
        </Button>
      </View>

      {error && (
        <View className="mx-4 mt-[-4]">
          <Text
            style={{ color: Colors.red }}
          >{`Whoops, can't be empty...`}</Text>
        </View>
      )}
    </View>
  );
}
