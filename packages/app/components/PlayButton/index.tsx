import { useRef, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Button } from 'app/design/button';
import { SolitoImage } from 'solito/image';
import { Audio } from 'expo-av';
import Colors from 'app/design/colors';

const play_light = require('../../assets/images/play_light.png');

type PlayButtonProps = {
  soundUri?: string;
};

export default function PlayButton({ soundUri }: PlayButtonProps) {
  const ref = useRef();
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const onPlaySound = async () => {
    if (!soundUri) {
      alert('Sorry! No sound found.');
      return;
    }

    try {
      setLoading(true);

      const { sound } = await Audio.Sound.createAsync({
        uri: soundUri,
      });
      setSound(sound);
      await sound.playAsync();

      setLoading(false);
    } catch (err) {
      alert('Error playing sound');
    }
  };

  return (
    <Button
      disabled={loading}
      onPress={onPlaySound}
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
