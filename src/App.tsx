// INFO: components
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Process from './pages/Process';
import ProcessActivity from './pages/ProcessActivity';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AdminRoute from './components/AdminRoute';

function App() {

  return (

    // INFO: App routes.
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/processes/process/:process_id" element={<Process />} />
      <Route path="processes/activities/activity/:activity_id" element={<ProcessActivity />}/>
       <Route
        path="/dashboard"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />
      <Route path="/login" element={<Login />}/>
    </Routes>
    

  )
}

export default App
