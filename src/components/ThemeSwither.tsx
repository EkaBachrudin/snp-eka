import React, { useEffect } from 'react';
import { Switch } from 'antd';
import { useTheme } from '../context/ThemeContext';

interface ChildProps {
  emitToParent: (data: string) => void;
}

const ThemeSwitcher: React.FC<ChildProps> = ({ emitToParent }) => {
  const { theme, toggleTheme } = useTheme();

  const sendDataToParent = () => {
    toggleTheme();
    emitToParent(theme);
  };

  useEffect(() => {
    emitToParent(theme);
  }, [emitToParent, theme]);

  return (
    <Switch
      checkedChildren="Dark"
      unCheckedChildren="Light"
      onChange={sendDataToParent}
      checked={theme === 'dark'}
    />
  );
};

export default ThemeSwitcher;
