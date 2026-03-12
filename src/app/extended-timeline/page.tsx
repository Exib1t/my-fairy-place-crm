import type { Metadata } from "next";
import ExtendedTimeline from "@/components/ExtendedTimeline/ExtendedTimeline";

export const metadata: Metadata = {
  title: "MFP - Extended Timeline",
  description: "Advanced order management and tracking system",
};

export default function ExtendedTimelinePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ExtendedTimeline />
    </div>
  );
}
