/*
    When we've got hydration error in pages, you can wrap this component to that page to fix the issue!
*/

import { useEffect, useState } from "react";

export default function ClientSide({ children }) {
  const [mounted, setMounted] = useState();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return children;
}
