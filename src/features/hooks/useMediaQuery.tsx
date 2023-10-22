import { useEffect, useState } from "react";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Initialen Status setzen
    setMatches(mediaQueryList.matches);

    // Event-Listener hinzufügen
    mediaQueryList.addListener(handleMediaQueryChange);

    // Event-Listener entfernen, wenn die Komponente unmontiert wird
    return () => {
      mediaQueryList.removeListener(handleMediaQueryChange);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
