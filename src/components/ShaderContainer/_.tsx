"use client";

import { ChromaFlow, Shader, Swirl } from "shaders/react";
import { useShaderContainer } from "./_.hook.ts";

export const ShaderContainer = () => {
  const { shaderContainerRef, isLoaded } = useShaderContainer();

  return (
    <div
      ref={shaderContainerRef}
      className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      style={{ contain: "strict" }}
    >
      <Shader className="h-full w-full">
        <Swirl
          colorA="#6366f1"
          colorB="#8b5cf6"
          speed={0.8}
          detail={0.8}
          blend={50}
          coarseX={40}
          coarseY={40}
          mediumX={40}
          mediumY={40}
          fineX={40}
          fineY={40}
        />
        <ChromaFlow
          baseColor="#6366f1"
          upColor="#818cf8"
          downColor="#a78bfa"
          leftColor="#8b5cf6"
          rightColor="#7c3aed"
          intensity={0.9}
          radius={1.8}
          momentum={25}
          maskType="alpha"
          opacity={0.97}
        />
      </Shader>
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};
