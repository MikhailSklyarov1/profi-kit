import headerStyle from "./Header.module.css";
import { StarOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Segmented, ConfigProvider } from 'antd';
import { useLocation } from 'react-router-dom';


const routeMappings: { [key: string]: string } = {
  'KIT CRM': '/crm',
  'KIT Master': '/master',
  'KIT Tracker': '/tracker',
  'KIT Warehouse': '/',
  'KIT ARM': '/arm',
  'KIT Dashboard': '/dashboard',
  'KIT Admin': '/admin',
};

const customAntComponent = {
  token: {
    borderRadius: 12,
  },
  components: {
    Segmented: {
      itemSelectedColor: '#FFF',
      itemSelectedBg: "#A85757",
    },
  }
}


function getKeyByValue(object: { [key: string]: string }, value: string): string | undefined {
  return Object.keys(object).find(key => object[key] === value);
}

function Header() {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ConfigProvider theme={customAntComponent}>
      <header className={headerStyle.header}>
        <div className={headerStyle.logo}>
          {/* <img src="/logo.png" alt="Logo" /> */}
          <StarOutlined />
          <span>PROFI KIT</span>
        </div>
        <nav className={headerStyle.nav}>
          <Segmented<string>
            options={Object.keys(routeMappings)}
            defaultValue={getKeyByValue(routeMappings, location.pathname)}
            onChange={(tab) => {
              if (routeMappings.hasOwnProperty(tab)) {
                navigate(routeMappings[tab]);
              }
            }}
          />
        </nav>
      </header>
    </ConfigProvider>
  );
}

export default Header;