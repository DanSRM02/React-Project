import React from 'react'
import { Helmet } from "react-helmet";
import Footer from '../Footer';
import Header from '../Header';
import UserContent from './UserContent';
const PlantillaUser = ({title, children}) => {
  return (
    <div>
        <Helmet>
            <title>{title}</title>
            </Helmet>
            <Header/>
            <UserContent/>
            <main>
                {children}
            </main>
        <Footer/>
    </div>
  )
}
export default PlantillaUser;