import type { Metadata } from "next";
import Timeline from "@/components/Timeline/Timeline";

export const metadata: Metadata = {
  title: "MFP - Timeline",
  description: "Advanced order management and tracking system",
};

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Timeline />
    </div>
  );
}
