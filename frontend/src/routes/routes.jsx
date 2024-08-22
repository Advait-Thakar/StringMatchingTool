import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LandingPage } from '../components/LandingPage'
import { UploadFile } from '../components/UploadFile'
import { PdfViewer } from '../components/PdfViewer'


const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/landingpage' element={<LandingPage />}/>
        <Route path='/uploadfile' element={<UploadFile />}/>
        <Route path='/pdfreader' element={<PdfViewer />} />
    </Routes>
  )
}

export default AppRoutes;
