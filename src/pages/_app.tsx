
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.scss'
import { ConfigProvider } from 'antd';
import { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import ThemeSwitcher from '@/components/ThemeSwither';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [currentTheme, setCurrentTheme] = useState('light');

  const handleDataFromChild = (theme: string) => {
    setCurrentTheme(theme);
  };

  const lightTheme = {
    colorPrimary: 'green',
    colorTextBase: 'green',
    colorTextLightSolid: 'white'
  }

  const darkTheme = {
    colorPrimary: 'black',
    colorTextBase: 'black',
    colorTextLightSolid: 'white'
  }

  return (
    <QueryClientProvider client={queryClient}>

      <ConfigProvider theme={{token: currentTheme === 'light' ? lightTheme : darkTheme}}>
        
        <ThemeProvider>

          <div className='bg-white dark:bg-black'>

            <ThemeSwitcher emitToParent={handleDataFromChild} />
            
            <Component {...pageProps} />

          </div>
          
        </ThemeProvider>

      </ConfigProvider>

    </QueryClientProvider>
  )
}
