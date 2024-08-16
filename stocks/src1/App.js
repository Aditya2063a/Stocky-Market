import logo from './logo.svg';
import './App.css';
import Dashboard from './dashboard/components/Dashboard';
import { useState } from 'react';
import StockContext from './dashboard/context/StockContext';
import UserContext from './dashboard/context/UserContext';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import LoginPage from './Auth/Login';
import Signup from './Auth/Signup';
import Navbar from './components/NavBar';
import Navbar2 from './components/NavBar2';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
        <Navbar></Navbar>
        {/* <div className='bg-gray-300 text-center w-full'>
          <Link to="/predict">Predict</Link>
          </div>
          <br></br> */}
          <Dashboard/>          
        </>
        
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar2></Navbar2>
          <LoginPage></LoginPage>  
        </>
        
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar2></Navbar2>
          <br></br>   
          <Signup></Signup> 
        </>
        
      ),
    },
  ]);

  const [stockSymbol, setStockSymbol] = useState("AAPL");
  const [user, setUser] = useState({
    name: "",
    savedData: [],
  });
  
  
  return (
    <UserContext.Provider value={{user,setUser}}>
      <StockContext.Provider value={{stockSymbol,setStockSymbol}}>      
        <RouterProvider router={router}/>
      </StockContext.Provider>
    </UserContext.Provider>    
  );
}

export default App;
