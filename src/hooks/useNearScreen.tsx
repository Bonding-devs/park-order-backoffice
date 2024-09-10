import { useEffect, useRef, useState } from 'react';

export const useNearScreen = ({
  distance,
  externalRef,
  once = true,
}: {
  distance?: string;
  externalRef?: React.MutableRefObject<undefined>;
  once?: boolean;
}) => {
  const [isNearScreen, setShow] = useState(false);
  const fromRef = useRef();

  useEffect(() => {
    const element = externalRef ? externalRef.current : fromRef.current;
    const onChange = (entries, observer) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setShow(true);
        once && observer.disconnect();
      } else {
        !once && setShow(false)
      }
    };

    const observer = new IntersectionObserver(onChange, {
      threshold: 1.0,
      rootMargin: distance,
    });

    if (element) observer.observe(element);

    return () => observer && observer.disconnect();
  });

  return {
    isNearScreen,
    fromRef,
  };
};
