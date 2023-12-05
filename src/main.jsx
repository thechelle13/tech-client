import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {Tech} from "./Tech"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter> 
    <Tech />
   </BrowserRouter>
  </React.StrictMode>,
)
