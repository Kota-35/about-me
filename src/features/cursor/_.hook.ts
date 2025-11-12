import { useEffect, useRef } from "react";

export const useCustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const isPointerRef = useRef(false);

  useEffect(() => {
    let animationFrameId: number;

    /**
     * Linear Interpolation (線形補間)
     * 2つの値の間を指定した係数で補間する関数
     *
     * @param start - 開始値
     * @param end - 終了値
     * @param factor - 補間係数（0.0 ～ 1.0）。0に近いほどstartに近く、1に近いほどendに近い値を返す
     * @returns startとendの間をfactorで補間した値
     *
     * @example
     * lerp(0, 100, 0.5) // => 50
     * lerp(0, 100, 0.1) // => 10
     * lerp(0, 100, 0.9) // => 90
     */
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    /**
     * カスタムカーソルの位置とスタイルを更新する関数
     * requestAnimationFrameで毎フレーム呼び出され、滑らかなアニメーションを実現する
     */
    const updateCursor = () => {
      // 現在の位置から目標位置へ線形補間で滑らかに移動（係数0.15で緩やかな追従）
      positionRef.current.x = lerp(
        positionRef.current.x,
        targetPositionRef.current.x,
        0.15,
      );
      positionRef.current.y = lerp(
        positionRef.current.y,
        targetPositionRef.current.y,
        0.15,
      );

      // DOM要素が存在する場合のみスタイルを更新
      if (outerRef.current && innerRef.current) {
        // ポインター要素上にいる場合のスケール設定
        // 外側カーソル: 1.5倍に拡大、内側カーソル: 0.5倍に縮小
        const scale = isPointerRef.current ? 1.5 : 1;
        const innerScale = isPointerRef.current ? 0.5 : 1;

        // 3D transformを使用してGPUアクセラレーションを有効化
        // translate(-50%, -50%)で要素の中心をカーソル位置に合わせる
        outerRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        innerRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${innerScale})`;
      }

      // 次のフレームでもこの関数を実行するようスケジュール
      animationFrameId = requestAnimationFrame(updateCursor);
    };

    /**
     * マウス移動イベントのハンドラー
     * カーソルの目標位置を更新し、ポインター要素上にいるかどうかを判定する
     */
    const handleMouseMove = (e: MouseEvent) => {
      // マウスの現在位置を目標位置として保存（updateCursorで滑らかに追従）
      targetPositionRef.current = { x: e.clientX, y: e.clientY };

      // マウス下の要素を取得
      const target = e.target as HTMLElement;
      // ポインター要素かどうかを判定
      // - CSSのcursorプロパティが"pointer"の場合
      // - ボタン要素（BUTTON）の場合
      // - リンク要素（A）の場合
      isPointerRef.current =
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A";
    };

    // グローバルなマウス移動イベントを監視
    // passive: true でスクロールパフォーマンスを最適化
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    // アニメーションループを開始
    animationFrameId = requestAnimationFrame(updateCursor);

    // クリーンアップ関数: コンポーネントのアンマウント時にイベントリスナーとアニメーションフレームを解除
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return {
    outerRef,
    innerRef,
  };
};
