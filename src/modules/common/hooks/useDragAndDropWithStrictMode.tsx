import { useEffect, useState } from 'react';

// Issue: https://medium.com/@wbern/getting-react-18s-strict-mode-to-work-with-react-beautiful-dnd-47bc909348e4
// and: https://github.com/atlassian/react-beautiful-dnd/issues/2399
// because useEffect runs twice in dev mode in React 18 it effects dnd
// this fixes the issue.
export const useDragAndDropWithStrictMode = () => {
  const [isDragAndDropEnabled, setIsDragAndDropEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setIsDragAndDropEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setIsDragAndDropEnabled(false);
    };
  }, []);

  return { isDragAndDropEnabled };
};
