
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.scss'
import { ConfigProvider, Input } from 'antd';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import ThemeSwitcher from '@/components/ThemeSwither';
import Header from '@/components/Header';
import CredentialDialog from '@/components/CredentialDialog';
import { setToken } from '@/lib/api/gorest';
import { SearchProvider } from '@/context/SearchContext';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [showCredentialDialog, setShowCredentialDialog] = useState(false);

  useEffect(() => {
    if (!isTokenAvailable()) {
      setShowCredentialDialog(true);
    }
  }, []);

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

          <div className='bg-white dark:bg-[#181A2A] min-h-screen'>

            <SearchProvider>

              <Header currentTheme={currentTheme} setCurrentTheme={setCurrentTheme}/>
              
              <Component {...pageProps} />

            </SearchProvider>

            

            {showCredentialDialog && <CredentialDialog />}

          </div>
          
        </ThemeProvider>

      </ConfigProvider>

    </QueryClientProvider>
  )
}

const isTokenAvailable = () => {
  const token = localStorage.getItem('token');

  if(token) {
    setToken(token);
    return true;
  }
  
  return false;
};
