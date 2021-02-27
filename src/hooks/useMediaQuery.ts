import { useEffect, useState } from 'react';

export default function (mediaQuery: string): boolean {
  const [satisfiesQuery, setSatisfiesQuery] = useState(() => window.matchMedia(mediaQuery).matches);

  useEffect(() => {
    const handleMediaQuery = (e: MediaQueryListEvent) => {
      setSatisfiesQuery(e.matches);
    };
    window.matchMedia(mediaQuery).addListener(handleMediaQuery);

    return () => {
      window.matchMedia(mediaQuery).removeListener(handleMediaQuery);
    };
  }, [mediaQuery]);

  return satisfiesQuery;
}
