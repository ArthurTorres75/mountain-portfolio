import type { Metadata } from "next";
import WorldExplorer from "@/components/WorldExplorer";

export const metadata: Metadata = {
  title: "Arthur | Full Stack Engineer",
  description:
    "Full Stack Engineer specialized in scalable systems, frontend excellence and premium user experiences.",
};

export default function Home() {
  return <WorldExplorer />;
}
