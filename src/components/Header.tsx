
import Image from 'next/image';
import styles from '../styles/components/_header.module.scss';
import ThemeSwitcher from './ThemeSwither';
import { Button, Input } from 'antd';
import { PlusCircleTwoTone, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useData } from '@/context/SearchContext';
import type { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';


interface ChildComponentProps {
    currentTheme: string;
    setCurrentTheme: (theme: string) => void;
}


const Header: React.FC<ChildComponentProps> = ({ currentTheme, setCurrentTheme }) => {
    const router = useRouter();

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

                {router.pathname === '/'  && (
                     <div className='mt-6 search-header flex items-center gap-3'>
                        <Link href={`/create`}>
                            <Button type="primary" icon={<PlusOutlined />}>
                                Create
                            </Button>
                        </Link> 
                        
                        <Input
                            className={styles.custom_input}
                            placeholder="Search"
                            onChange={handleInputChange}
                            suffix={
                                <SearchOutlined className={styles.custom_icon} />
                            }
                        />
                    </div>
                )}
                
            </div>
        </>
    )
}

export default Header;

