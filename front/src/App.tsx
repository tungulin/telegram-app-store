import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, Layout, message } from "antd";
import { AppDispatch } from "store";
import { loginnerViaWebApp } from "store/slice/userSlice";

import { Navbar } from "components/Navbar/Navbar";
import { config } from "helpers/themeConfig";

import { Main } from "containers/Main/Main";
import { Search } from "containers/Search/Search";
import { ItemPage } from "containers/ItemPage/ItemPage";
import { Filters } from "containers/Filters/Filters";
import { FQAPage } from "containers/FQAPage/FQAPage";
import { Settings } from "containers/Settings/Settings";
import { Profile } from "containers/Profile/Profile";
import { PageNotFound } from "containers/PageNotFound/PageNotFound";
import { ProcessingPaymentPage } from "containers/ItemPage/ProcessingPaymentPage";
import { PaymentPage } from "containers/ItemPage/PaymentPage";

import i18 from './libs/localization'


import './style.css'
import { gettingBrand, gettingCategories } from "store/slice/defaultSlice";
import { ISlice } from "store/slice/ISlice";


const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const themeConfig = config('light')
  const user = useSelector((state: ISlice) => state.user.info);
  const [messageApi, contextHolder] = message.useMessage({ top: 100 });

  const authToken = () => {

    if (process.env.NODE_ENV === 'development') {
      dispatch(loginnerViaWebApp({
        "avatar": "https://sun10-1.userapi.com/s/v1/ig2/YkDkJKtQtAofDckP488PblFIUXXfIMXW9FZMuMgC2kTvkEOXCmTeKciPzIhRXiMIpvmWv3qRNDPqELnWC5R9JfMV.jpg?size=200x200&quality=95&crop=193,554,1955,1955&ava=1",
        "brandId": "1",
        "country": "Россия",
        "firstName": "Андрей",
        "lastName": "Тунгулин",
        "webAppID": 264244557
      }))
    }


    if (process.env.NODE_ENV !== 'development') {
      const userData = window.Telegram.WebApp?.initDataUnsafe?.user
      dispatch(loginnerViaWebApp({
        webAppID: userData?.id,
        firstName: userData?.first_name,
        lastName: userData?.last_name,
        brandId: process.env.REACT_APP_BRAND_ID,
        avatar: ''
      }))
        .catch((err) => {
          console.log('err', err)
          messageApi.error('Ошибка авторизации');
        })
    }

    dispatch(gettingCategories({ brandId: process.env.REACT_APP_BRAND_ID }))
    dispatch(gettingBrand({ id: process.env.REACT_APP_BRAND_ID }))
  }

  useEffect(() => {
    console.log('window.Telegram.WebApp',window.Telegram.WebApp.themeParams);
    
    const lang = localStorage.getItem('language')
    lang ? i18.changeLanguage(lang) : i18.changeLanguage('en')
    authToken()
  }, [])


  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!user) {
      messageApi.info('Вы не авторизованы! :(');
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout style={{ minHeight: '100%' }}>
        {contextHolder}
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/filters" element={<Filters />} />
          <Route path="/fqa/:id" element={<FQAPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/paymentItem/:id" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
          <Route path="/processingPayment/:id" element={<ProtectedRoute><ProcessingPaymentPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </ConfigProvider >
  );
}

export default App;
