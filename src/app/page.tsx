import clsx from "clsx";
import { CustomCursor } from "@/features/CustomCursor";
import { GrainOverlay } from "@/features/GrainOverlay";

const Home = () => {
  return (
    <main
      className={clsx(
        "relative",
        "h-screen",
        "w-full",
        "overflow-hidden",
        "bg-background",
      )}
    >
      <CustomCursor />
      <GrainOverlay />
    </main>
  );
};

export default Home;
