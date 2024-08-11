// components/ChatWidget.tsx
import Script from 'next/script';

const ChatWidget = () => (
  <Script strategy="lazyOnload">
    {`
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/664f8f4e981b6c564773b30b/1hujcfj8n';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
      })();
    `}
  </Script>
);

export default ChatWidget;
