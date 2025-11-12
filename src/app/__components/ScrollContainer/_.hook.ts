import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollContainer = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // sessionStorageから保存された位置を読み込む
  const [currentSection, setCurrentSection] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("scrollSection");
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });
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
      // セクション位置をsessionStorageに保存
      if (typeof window !== "undefined") {
        sessionStorage.setItem("scrollSection", String(index));
      }
    }
  }, []);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // セクション内のスクロール可能な要素をチェック
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const sectionWidth = container.offsetWidth;
      const currentScrollLeft = container.scrollLeft;
      const currentSectionIndex = Math.round(currentScrollLeft / sectionWidth);
      const sections = container.children;
      const currentSectionElement = sections[
        currentSectionIndex
      ] as HTMLElement;

      if (currentSectionElement) {
        const scrollableElement = currentSectionElement.querySelector(
          "[data-scrollable='true'], .overflow-y-auto",
        ) as HTMLElement;

        if (scrollableElement) {
          const { scrollTop, scrollHeight, clientHeight } = scrollableElement;
          const isAtTop = scrollTop === 0;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
          const deltaY = e.touches[0].clientY - touchStartY.current;

          // セクション内でスクロール可能な場合、タッチイベントを許可
          if ((deltaY < 0 && !isAtBottom) || (deltaY > 0 && !isAtTop)) {
            return; // セクション内スクロールを許可
          }
        }
      }

      // セクション間の移動の場合のみ、縦スクロールを防止
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY.current - touchEndY;
      const deltaX = touchStartX.current - touchEndX;

      // セクション内のスクロール可能な要素をチェック
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const sectionWidth = container.offsetWidth;
      const currentScrollLeft = container.scrollLeft;
      const currentSectionIndex = Math.round(currentScrollLeft / sectionWidth);
      const sections = container.children;
      const currentSectionElement = sections[
        currentSectionIndex
      ] as HTMLElement;

      if (currentSectionElement) {
        const scrollableElement = currentSectionElement.querySelector(
          "[data-scrollable='true'], .overflow-y-auto",
        ) as HTMLElement;

        if (scrollableElement) {
          const { scrollTop, scrollHeight, clientHeight } = scrollableElement;
          const isAtTop = scrollTop === 0;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

          // セクション内でスクロール可能な場合、セクション移動はしない
          if ((deltaY > 0 && !isAtTop) || (deltaY < 0 && !isAtBottom)) {
            return; // セクション内スクロールが可能な場合は、セクション移動をしない
          }
        }
      }

      // セクション間の移動
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
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const sectionWidth = container.offsetWidth;
        const currentScrollLeft = container.scrollLeft;
        const currentSectionIndex = Math.round(
          currentScrollLeft / sectionWidth,
        );

        // 現在のセクション要素を取得
        const sections = container.children;
        const currentSectionElement = sections[
          currentSectionIndex
        ] as HTMLElement;

        if (!currentSectionElement) return;

        // セクション内のスクロール可能な要素を探す
        const scrollableElement = currentSectionElement.querySelector(
          "[data-scrollable='true']",
        ) as HTMLElement;

        // セクション内にスクロール可能な要素がある場合
        if (scrollableElement) {
          const { scrollTop, scrollHeight, clientHeight } = scrollableElement;
          const canScroll = scrollHeight > clientHeight; // スクロール可能かチェック
          const isAtTop = scrollTop <= 1; // 1pxの誤差を許容
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1; // 1pxの誤差を許容

          // スクロール可能な場合のみ処理
          if (canScroll) {
            // 下にスクロール
            if (e.deltaY > 0) {
              // セクション内が最下部に達していない場合、セクション内をスクロール
              if (!isAtBottom) {
                e.preventDefault();
                e.stopPropagation();
                scrollableElement.scrollBy({
                  top: e.deltaY,
                  behavior: "auto",
                });
                return; // セクション内スクロールを実行したので、横スクロールはしない
              }
              // 最下部に達している場合、次のセクションへ移動
            } else {
              // 上にスクロール
              // セクション内が最上部に達していない場合、セクション内をスクロール
              if (!isAtTop) {
                e.preventDefault();
                e.stopPropagation();
                scrollableElement.scrollBy({
                  top: e.deltaY,
                  behavior: "auto",
                });
                return; // セクション内スクロールを実行したので、横スクロールはしない
              }
              // 最上部に達している場合、前のセクションへ移動
            }
          }
        }

        // セクション内にスクロール可能な要素がない、または端に達している場合
        // 横スクロール（セクション移動）を実行
        e.preventDefault();

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
          // セクション位置をsessionStorageに保存
          if (typeof window !== "undefined") {
            sessionStorage.setItem("scrollSection", String(newSection));
          }
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

  // マウント時に保存された位置を復元
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedSection = sessionStorage.getItem("scrollSection");
    if (savedSection && scrollContainerRef.current) {
      const sectionIndex = parseInt(savedSection, 10);
      if (sectionIndex >= 0 && sectionIndex <= 4) {
        // 少し遅延を入れて、レンダリング完了後にスクロール
        const timer = setTimeout(() => {
          if (scrollContainerRef.current) {
            const sectionWidth = scrollContainerRef.current.offsetWidth;
            scrollContainerRef.current.scrollTo({
              left: sectionWidth * sectionIndex,
              behavior: "auto", // 即座に移動（smoothだと遅延が発生する）
            });
            setCurrentSection(sectionIndex);
          }
        }, 100);

        return () => clearTimeout(timer);
      }
    }
  }, []);

  return { scrollContainerRef, currentSection, scrollToSection };
};
