import ThemeSwitcher from '@/components/ThemeSwither';
import styles from '../styles/pages/_index.module.scss';
import { Button, Select, Radio, Checkbox, Input, Table, ConfigProvider, Space, Switch, theme } from 'antd';

export default function Home() {
  return (
    <main className='p-7'>
      <div className={styles.title}>The Impact of Technology on the Workplace: How Technology is Changing</div>
      <Space direction='vertical' size={12}>
       
        <Button type='primary'>Theme Button</Button>

        <ConfigProvider theme={{
          inherit: false
        }}>
          <Radio>Radio Without theme</Radio>
        </ConfigProvider>
        <Switch checkedChildren='On' unCheckedChildren='Off'></Switch>
        <Radio>Radio with child theme</Radio>
        <Checkbox>Checkbox</Checkbox>
        <Checkbox>Checkbox2</Checkbox>
        <Input placeholder='Type...' />
        <Select placeholder='Select...' options={[
          { label: 'option 1', value: 'option1' }
        ]} />

        <Table
          columns={[
            { title: 'Column', dataIndex: 'col' },
          ]}
          dataSource={[{ col: 'value 1' }]}
        ></Table>
      </Space>

      

      <Para/>
    </main>
  )
}

function Para() {
  const {token} = theme.useToken();
  return(
    <h3 style={{color: token.colorPrimary}}>H3 Using token theme</h3>
  )
}
