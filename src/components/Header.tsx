
import Image from 'next/image';
import styles from '../styles/components/_header.module.scss';
import ThemeSwitcher from './ThemeSwither';
import { Input } from 'antd';
import { InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';

interface ChildComponentProps {
    currentTheme: string;
    setCurrentTheme: (theme: string) => void;
}


const Header: React.FC<ChildComponentProps> = ({ currentTheme, setCurrentTheme }) => {

    const handleDataFromChild = (theme: string) => {
        setCurrentTheme(theme);
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

