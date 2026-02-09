import { useCallback, useRef } from "react";

/**
 * @param {Object} [params]
 * @param {boolean} [params.isLoading]
 * @param {boolean} [params.hasNextPage]
 * @param {Function} [cb]
 */
export default function useInfiniteScroll({ hasNextPage, isLoading }, cb) {
  const observer = useRef();

  const ref = useCallback(
    (node) => {
      if (isLoading || !hasNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          cb();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage]
  );

  return ref;
}
