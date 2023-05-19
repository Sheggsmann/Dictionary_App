import { useRef, useState } from 'react';
import { Button } from 'app/design/button';
import { SolitoImage } from 'solito/image';
import Colors from 'app/design/colors';
import useHover from 'app/hooks/useHover';

const play_light = require('../../assets/images/play_light.png');
const play = require('../../assets/images/play.png');

type PlayButtonProps = {
  soundUri?: string;
};

export default function PlayButton({ soundUri }: PlayButtonProps) {
  const ref = useRef();
  const [loading, setLoading] = useState<boolean>(false);
  const isHovered = useHover(ref);

  const onPlaySound = async () => {
    if (!soundUri) {
      alert('Sorry! No sound found.');
      return;
    }

    try {
      setLoading(true);
      const audio = new Audio(soundUri);
      audio.play();
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
      style={{
        backgroundColor: isHovered ? Colors.purple : 'rgba(165,71,236,0.3)',
      }}
    >
      <SolitoImage
        src={isHovered ? play_light : play}
        alt="play image"
        width={18}
        height={18}
      />
    </Button>
  );
}
