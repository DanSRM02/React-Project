import React from 'react'
import { Helmet } from "react-helmet";
import Footer from './Footer';
import Header from './Header';
const PlantillaUno = ({title, children}) => {
  return (
    <div>
        <Helmet>
            <title>{title}</title>
            </Helmet>
            <Header/>
            <main>
                {children}
            </main>
        <Footer/>
    </div>
  )
}
export default PlantillaUno;
