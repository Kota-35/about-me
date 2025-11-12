import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollContainer = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const scrollThrottleRef = useRef<number>(undefined);

  const scrollToSection = useCallback((index: number) => {
    if (scrollContainerRef.current) {
      const sectionWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: "smooth",
      });
      setCurrentSection(index);
    }
  }, []);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY.current - touchEndY;
      const deltaX = touchStartX.current - touchEndX;

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < 4) {
          scrollToSection(currentSection + 1);
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [currentSection, scrollToSection]);

  useEffect(() => {
    let scrollTimeout: number | undefined;
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();

        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const sectionWidth = container.offsetWidth;
        const currentScrollLeft = container.scrollLeft;
        const currentSectionIndex = Math.round(
          currentScrollLeft / sectionWidth,
        );

        // スクロール量に応じて次のセクションを決定
        const scrollThreshold = sectionWidth * 0.3; // 30%スクロールしたら次のセクションへ
        const scrollProgress = currentScrollLeft % sectionWidth;

        let targetSection = currentSectionIndex;

        if (e.deltaY > 0) {
          // 下にスクロール（右へ）
          if (scrollProgress > scrollThreshold) {
            targetSection = Math.min(currentSectionIndex + 1, 4);
          } else {
            targetSection = currentSectionIndex;
          }
        } else {
          // 上にスクロール（左へ）
          if (scrollProgress < sectionWidth - scrollThreshold) {
            targetSection = Math.max(currentSectionIndex - 1, 0);
          } else {
            targetSection = currentSectionIndex;
          }
        }

        // スムーススクロールでターゲットセクションへ移動
        if (targetSection !== currentSectionIndex && !isScrolling) {
          isScrolling = true;
          container.scrollTo({
            left: targetSection * sectionWidth,
            behavior: "smooth",
          });

          // スクロール完了後に状態を更新
          if (scrollTimeout) {
            clearTimeout(scrollTimeout);
          }
          scrollTimeout = window.setTimeout(() => {
            setCurrentSection(targetSection);
            isScrolling = false;
          }, 500);
        } else {
          // 小さなスクロールの場合は通常のスクロール
          container.scrollBy({
            left: e.deltaY * 0.5, // スクロール速度を調整
            behavior: "smooth",
          });
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return;

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = undefined;
          return;
        }

        const sectionWidth = scrollContainerRef.current.offsetWidth;
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const newSection = Math.round(scrollLeft / sectionWidth);

        if (
          newSection !== currentSection &&
          newSection >= 0 &&
          newSection <= 4
        ) {
          setCurrentSection(newSection);
        }

        scrollThrottleRef.current = undefined;
      });
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current);
      }
    };
  }, [currentSection]);

  return { scrollContainerRef, currentSection, scrollToSection };
};
