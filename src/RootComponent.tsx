import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageApp from './pages/PageApp/PageApp';
import Warehouse from './pages/Warehouse/Warehouse';
import Header from './components/Header/Header';



function RootComponent() {
    return (
        <div>
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
        </div>
    )
}

export default RootComponent;