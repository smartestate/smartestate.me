import React, { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function detectOS() {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';
  if (/windows phone/i.test(ua)) return 'windows';
  if (/win/i.test(ua)) return 'windows';
  if (/android/i.test(ua)) return 'android';
  if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) return 'ios';
  if (/Macintosh|Mac OS X/.test(ua)) return 'mac';
  if (/linux/i.test(ua)) return 'linux';
  return 'unknown';
}

const Downloads: React.FC = () => {
  const os = useMemo(() => detectOS(), []);

  // Placeholder URLs — replace with real assets when available
  const urls = {
    app: {
      ios: 'https://apps.apple.com/',
      android: 'https://play.google.com/store',
      default: '#',
    },
    software: {
      windows: '/downloads/smart-estate-win.exe',
      mac: '/downloads/smart-estate-mac.dmg',
      linux: '/downloads/smart-estate-linux.AppImage',
      default: '/downloads',
    },
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-16 px-6 flex flex-col">
      <div className="max-w-7xl mx-auto text-center my-auto w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Downloads</h1>
        <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm text-accent-foreground font-medium mb-6 mx-auto w-fit">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Now under development
        </div>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Software</h2>
          <p className="text-sm text-muted-foreground mb-4">Desktop installers and packages for your operating system.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href={urls.software.windows}
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
              title="Under development"
              className={`p-4 rounded-lg border border-border bg-card text-center opacity-60 pointer-events-none ${os === 'windows' ? 'ring-2 ring-primary' : ''}`}>
              <img src="/icons/microsoft-svgrepo-com.svg" alt="Windows" className="mx-auto w-8 h-8 mb-2" />
              <div className="font-semibold">Windows</div>
              <div className="text-sm text-muted-foreground mt-1">Installer (.exe)</div>
            </a>

            <a
              href={urls.software.mac}
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
              title="Under development"
              className={`p-4 rounded-lg border border-border bg-card text-center opacity-60 pointer-events-none ${os === 'mac' ? 'ring-2 ring-primary' : ''}`}>
              <img src="/icons/apple-svgrepo-com.svg" alt="macOS" className="mx-auto w-8 h-8 mb-2" />
              <div className="font-semibold">macOS</div>
              <div className="text-sm text-muted-foreground mt-1">DMG</div>
            </a>

            <a
              href={urls.software.linux}
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
              title="Under development"
              className={`p-4 rounded-lg border border-border bg-card text-center opacity-60 pointer-events-none ${os === 'linux' ? 'ring-2 ring-primary' : ''}`}>
              <img src="/icons/linux-svgrepo-com.svg" alt="Linux" className="mx-auto w-8 h-8 mb-2" />
              <div className="font-semibold">Linux</div>
              <div className="text-sm text-muted-foreground mt-1">AppImage</div>
            </a>
          </div>

        </section>

        <section className="mb-12 hidden sm:block mt-4">
          <h2 className="text-xl font-semibold text-foreground mb-3">App</h2>
          <p className="text-sm text-muted-foreground mb-4">Get the mobile app for your device.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href={urls.app.ios}
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
              title="Under development"
              className={`p-4 rounded-lg border border-border bg-card text-center opacity-60 pointer-events-none ${os === 'ios' ? 'ring-2 ring-primary' : ''}`}>
              <img src="/icons/apple-svgrepo-com.svg" alt="App Store" className="mx-auto w-8 h-8 mb-2" />
              <div className="font-semibold">iOS (App Store)</div>
              <div className="text-sm text-muted-foreground mt-1">App Store</div>
            </a>

            <a
              href={urls.app.android}
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
              title="Under development"
              className={`p-4 rounded-lg border border-border bg-card text-center opacity-60 pointer-events-none ${os === 'android' ? 'ring-2 ring-primary' : ''}`}>
              <img src="/icons/google-play-svgrepo-com.svg" alt="Google Play" className="mx-auto w-8 h-8 mb-2" />
              <div className="font-semibold">Android (Google Play)</div>
              <div className="text-sm text-muted-foreground mt-1">Google Play</div>
            </a>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Downloads;
