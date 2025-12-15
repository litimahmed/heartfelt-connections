/**
 * @file ScrollToTop.tsx
 * @description This component ensures that the user is scrolled to the top of the page whenever the route changes.
 * It is a common utility component in single-page applications (SPAs) to mimic the behavior of traditional websites.
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * @component ScrollToTop
 * @description A component that automatically scrolls the window to the top (0, 0)
 * whenever the `pathname` from the URL changes. It uses the `useEffect` hook
 * to listen for changes in the location and trigger the scroll.
 *
 * This component does not render any UI, so it returns `null`.
 */
const ScrollToTop = () => {
  // The `useLocation` hook returns the current location object.
  // We destructure the `pathname` from it, which represents the path of the current URL.
  const { pathname } = useLocation();

  // The `useEffect` hook is used to perform side effects in function components.
  // In this case, the side effect is scrolling the window to the top.
  // The effect is re-run whenever the `pathname` changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // This component does not render anything to the DOM.
  return null;
};

export default ScrollToTop;
