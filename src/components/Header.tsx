
import Image from 'next/image';
import styles from '../styles/components/_header.module.scss';
import ThemeSwitcher from './ThemeSwither';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useData } from '@/context/SearchContext';
import type { ChangeEvent } from 'react';

interface ChildComponentProps {
    currentTheme: string;
    setCurrentTheme: (theme: string) => void;
}


const Header: React.FC<ChildComponentProps> = ({ currentTheme, setCurrentTheme }) => {

    const { setData } = useData();
    
    const handleDataFromChild = (theme: string) => {
        setCurrentTheme(theme);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setData(event.target.value);
    };

    return (
        <>
            <div className={styles.header_wrapper}>

                <div className={styles.header_content}>
                    <Image
                        src={currentTheme === 'dark' ? '/images/logo-dark.svg' : '/images/logo-light.svg'}
                        alt="logo"
                        width={158}
                        height={36}
                        layout="responsive"
                    />

                    <ThemeSwitcher emitToParent={handleDataFromChild} />
                </div>
                

               <div className='mt-4'>
                    <Input
                        className={styles.custom_input}
                        placeholder="Search"
                        onChange={handleInputChange}
                        suffix={
                            <SearchOutlined className={styles.custom_icon} />
                        }
                    />
               </div>

            </div>
        </>
    )
}

export default Header;

