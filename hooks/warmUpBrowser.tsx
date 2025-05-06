import React from 'react';
import * as WebBrowser from 'expo-web-browser';

export const useWarmupBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};
