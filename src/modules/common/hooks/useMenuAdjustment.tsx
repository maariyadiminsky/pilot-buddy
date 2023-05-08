import { useState, useRef } from 'react';

export const useMenuAdjustment = () => {
  const menuRef = useRef<any>();
  const [menuAdjustment, setMenuAdjustment] = useState('');

  // elementId can be full id or partial, used in the case
  // third-party library does not allow passing ref, example: ListBox.Options
  const adjustMenuToWindowHeight = (adjustment: string) => {
    if (!menuRef.current) return;

    const elementDimensions = menuRef.current.getBoundingClientRect();
    const { y } = elementDimensions;

    setMenuAdjustment(y > window.outerHeight - 200 ? adjustment : '');
  };

  const adjustMenuToWindowWidth = (adjustment: string) => {
    if (!menuRef.current) return;

    const elementDimensions = menuRef.current.getBoundingClientRect();
    const { x } = elementDimensions;

    setMenuAdjustment(x > window.outerWidth - 200 ? adjustment : '');
  };

  return { menuRef, menuAdjustment, adjustMenuToWindowHeight, adjustMenuToWindowWidth };
};
