import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate, } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import './App.css'
import { Navbar, Footer, Sidebar, ThemeSettings } from './components'
import {
  Dashboard, Appointments, Calendar, Employee, Stacked, Pyramid,
  Kanban, Area, Bar, Pie, Financial, ColorMapping, Editor, Properties, ColorPicker, Line, Users, Notification_ads, SavedProperties
} from './pages'
import { useStateContext } from './contexts/ContextProvider'
import AddProperty from './components/properties/AddProperty'
import Information from './pages/Information'
import AddInformation from './components/information/AddInformation'
import Auth from './pages/Auth'
import PrivateRoute from './components/PrivateRoute'
import { useAuth } from './contexts/AuthContext'
const App = () => {
  const { activeMenu } = useStateContext()
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  // // Check authentication status when component mounts
  // useEffect(() => {
  //   checkAuth().then(authenticated => {
  //     if (authenticated) {
  //       // Navigate to the dashboard or any other page
  //       navigate('/dashboard');
  //     }
  //   });
  // }, [checkAuth]);
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>

      <div className={`${isAuthenticated ? 'flex' : 'hidden'} relative dark:bg-main-dark-bg`}>
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          <TooltipComponent content="Settings" position="Top">
            <button type="button" className="text-3xl  p-3 hover:drop-shadow-xl text-white hover:bg-light-gray" style={{ background: 'blue', borderRadius: '50%' }}>
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
            <Sidebar />
          </div>) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>)
        }
        <div
          className={
            `dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>

          <div>
            <Routes>

              {/* Protected admin routes */}


              {/* dashboard  */}
              <Route path="/" element={<PrivateRoute Component={Dashboard} />} />

              <Route path="/dashboard" element={<PrivateRoute Component={Dashboard} />} />


              {/* pages  */}
              <Route path="/appointments" element={<PrivateRoute Component={Appointments} />} />

              <Route path="/informations" element={<PrivateRoute Component={Information} />} />
              <Route path="/users" element={<PrivateRoute Component={Users} />} />
              <Route path="/properties" element={<PrivateRoute Component={Properties} />} />

              {/* apps  */}
              <Route path="/notifications-Ads" element={<PrivateRoute Component={Notification_ads} />} />
              <Route path="/saved-properties" element={<PrivateRoute Component={SavedProperties} />} />
              <Route path="/notifications-Ads" element={<PrivateRoute Component={Notification_ads} />} />
              <Route path="/calendar" element={<PrivateRoute Component={Calendar} />} />
              <Route path="/color-picker" element={<PrivateRoute Component={ColorPicker} />} />

              {/* charts  */}
              {/* <Route path="/line" element={<Line />} />
              <Route path="/area" element={<Area />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/financial" element={<Financial />} />
              <Route path="/color-mapping" element={<ColorMapping />} />
              <Route path="/pyramid" element={<Pyramid />} />
              <Route path="/stacked" element={<Stacked />} /> */}

              {/* properties */}
              <Route path="//add-property" element={<PrivateRoute Component={AddProperty} />} />

              {/* information */}
              <Route path="/add-information" element={<PrivateRoute Component={AddInformation} />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App