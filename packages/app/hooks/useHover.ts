import { Platform } from 'react-native';
import { useState, useEffect, MutableRefObject } from 'react';

function getNativeNode(ref) {
  try {
    let node = ref && (ref.current || ref);
    if (node && node.getNode && node.getNode()) node = node.getNode();
    if (node && node._touchableNode) node = node._touchableNode;
    if (node && node._node) node = node._node;
    return node;
  } catch (error) {
    console.error('Failed to find node', error, { ref });
    return null;
  }
}

function getNode(ref: MutableRefObject<any>) {
  try {
    let node = getNativeNode(ref);
    return node;
  } catch (err) {
    console.error('Failed to find node', err, { ref });
    return null;
  }
}

function createPseudoHook<T>({ events }: { events: string[] }) {
  return function (ref: MutableRefObject<T>): any {
    if (
      // Pseudo classes only work in the browser
      Platform.OS !== 'web'
    )
      return false;

    const [isActive, setActive] = useState<boolean>(false);

    useEffect(() => {
      const [eventIn, eventOut] = events;
      const node = getNode(ref);

      if (!node) return;

      const resolve = (value) => setActive(value);

      // @ts-ignore
      const onStart = resolve.bind(this, true);
      // @ts-ignore
      const onEnd = resolve.bind(this, false);

      node.addEventListener(eventIn, onStart);
      node.addEventListener(eventOut, onEnd);

      if (eventOut === 'mouseup') {
        document.addEventListener(eventOut, onEnd, false);
      }

      return () => {
        document.removeEventListener(eventOut as string, onEnd, false);
        node.removeEventListener(eventIn, onStart);
        node.removeEventListener(eventOut, onEnd);
      };
    }, [ref]);

    return isActive;
  };
}

const useHover = createPseudoHook({ events: ['mouseenter', 'mouseleave'] });
export default useHover;
