import { useRef } from 'react';
import { Platform } from 'react-native';
import { Button } from 'app/design/button';
import { SolitoImage } from 'solito/image';
import Colors from 'app/design/colors';

const play_light = require('../assets/images/play_light.png');

export default function PlayButton() {
  const ref = useRef();

  return (
    <Button
      onPress={() => console.log('Pressed')}
      activeOpacity={0.7}
      className="h-[60px] w-[60px] items-center justify-center rounded-full bg-[#dbcce6] hover:bg-[#a547ed] dark:bg-[rgba(165,71,237,0.2)] dark:hover:bg-[rgba(165,71,237,1)]"
      ref={ref}
      style={[
        Platform.OS !== 'web' && { backgroundColor: 'rgba(165,71,236,0.3)' },
      ]}
    >
      <SolitoImage
        src={play_light}
        alt="play image"
        width={18}
        height={18}
        style={{ tintColor: Colors.purple }}
      />
    </Button>
  );
}
