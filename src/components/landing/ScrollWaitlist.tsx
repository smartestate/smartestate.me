import { useEffect, useState } from "react";
import WaitlistForm from "./WaitlistForm";

interface Props {
  externalOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ScrollWaitlist({ externalOpen, onOpenChange }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      if (window.scrollY > 20) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // in case the page is already scrolled (e.g. refresh)
    if (window.scrollY > 20) setVisible(true);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <WaitlistForm variant="nav" externalOpen={externalOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
