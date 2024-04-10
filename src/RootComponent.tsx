import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageApp from './pages/PageApp/PageApp';
import Warehouse from './pages/Warehouse/Warehouse';
import Header from './components/Header/Header';
import { ConfigProvider } from 'antd';
import ru_RU from 'antd/locale/ru_RU';


function RootComponent() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#A85757',
                },
            }}
            locale={ru_RU}
        >
            <BrowserRouter>
                <Header></Header>
                <div>
                    <Routes>
                        <Route path="crm" element={<PageApp />} />
                        <Route path="master" element={<PageApp />} />
                        <Route path="tracker" element={<PageApp />} />
                        <Route path="/" element={<Warehouse />} />
                        <Route path="arm" element={<PageApp />} />
                        <Route path="dashboard" element={<PageApp />} />
                        <Route path="admin" element={<PageApp />} />
                    </Routes>
                </div>
                {/* {<Footer></Footer>} */}

            </BrowserRouter>
        </ConfigProvider>
    )
}

export default RootComponent;