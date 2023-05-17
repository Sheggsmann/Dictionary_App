import { useContext, useState } from 'react';
import { Switch } from 'react-native';
import { View } from 'app/design/view';
import { Text } from 'app/design/typography';
import { SolitoImage } from 'solito/image';

import Colors from 'app/design/colors';
import ThemeContext from 'app/provider/theme';

const book = require('../assets/images/book.png');
const moon = require('../assets/images/moon.png');
const moon_light = require('../assets/images/moon_light.png');

export default function Header() {
  const { mode, setMode } = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(mode === 'light' ? false : true);

  const handleToggle = () => {
    setDarkMode((prev) => !prev);
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  return (
    <View className="flex-row items-center justify-between px-4 py-4">
      <SolitoImage
        src={book}
        height={32}
        width={32}
        resizeMode="contain"
        alt="dictionary image"
      />

      <View className="flex-row items-center">
        {/* Implement drop down */}
        {/* <View className="flex-row items-center">
          <Text className="dark:text-[#fff]">Sans Serif</Text>
        </View> */}

        {/* <View className="mx-4 h-[32px] w-[1px] bg-[#000] dark:bg-[#fff]"></View> */}

        <View className="flex-row items-center space-x-4">
          <Switch
            trackColor={{ false: Colors.black_100, true: Colors.purple }}
            thumbColor={'white'}
            value={darkMode}
            onValueChange={handleToggle}
          />
          <SolitoImage
            resizeMode="contain"
            src={mode === 'light' ? moon_light : moon}
            height={20}
            width={20}
            alt="moon image"
            style={{ tintColor: darkMode ? Colors.purple : 'gray' }}
          />
        </View>
      </View>
    </View>
  );
}
