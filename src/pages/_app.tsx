
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.scss'
import { ConfigProvider, Input } from 'antd';
import { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import ThemeSwitcher from '@/components/ThemeSwither';
import Header from '@/components/Header';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [currentTheme, setCurrentTheme] = useState('light');

  const handleDataFromChild = (theme: string) => {
    setCurrentTheme(theme);
  };

  const lightTheme = {
    colorPrimary: '',
    colorTextBase: 'black',
    colorTextLightSolid: 'white'
  }

  const darkTheme = {
    colorPrimary: '#4B6BFB',
    colorTextBase: '',
    colorTextLightSolid: 'white'
  }

  return (
    <QueryClientProvider client={queryClient}>

      <ConfigProvider theme={{
          token: currentTheme === 'light' ? lightTheme : darkTheme,
          components: {
            Input: {colorBgBase: '#242535'}
          }
        }}>
        
        <ThemeProvider>

          <div className='bg-white dark:bg-[#181A2A]'>

            <Header currentTheme={currentTheme} setCurrentTheme={setCurrentTheme}/>
            
            <Component {...pageProps} />

          </div>
          
        </ThemeProvider>

      </ConfigProvider>

    </QueryClientProvider>
  )
}
