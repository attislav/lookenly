import Script from 'next/script';

/**
 * Analytics & Tracking Scripts Component
 * Zentrale Verwaltung aller externen Scripts
 */
export default function Analytics() {
  // Environment Variables (in Vercel setzen)
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;
  const googleAdsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const pinterestTag = process.env.NEXT_PUBLIC_PINTEREST_TAG;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <>
      {/* Google Analytics 4 */}
      {googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Google AdSense */}
      {googleAdsenseId && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAdsenseId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}

      {/* Meta Pixel (Facebook) */}
      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* Pinterest Tag */}
      {pinterestTag && (
        <Script id="pinterest-tag" strategy="afterInteractive">
          {`
            !function(e){if(!window.pintrk){window.pintrk = function () {
            window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
              n=window.pintrk;n.queue=[],n.version="3.0";var
              t=document.createElement("script");t.async=!0,t.src=e;var
              r=document.getElementsByTagName("script")[0];
              r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
            pintrk('load', '${pinterestTag}', {em: '<user_email_address>'});
            pintrk('page');
          `}
        </Script>
      )}

      {/* Plausible Analytics (Self-Hosted at stats.tripleadigital.de) */}
      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://stats.tripleadigital.de/js/script.js"
          strategy="afterInteractive"
        />
      )}

      {/* Add more tracking scripts here */}
    </>
  );
}
