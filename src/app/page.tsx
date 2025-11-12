import clsx from "clsx";
import { CustomCursor } from "@/features/cursor";

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
    </main>
  );
};

export default Home;
