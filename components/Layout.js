import Head from 'next/head'
import React from 'react'
import Header from './Header'

//Es el componente padre.
const Layout = ({children}) => {
  return (
    <>
      <Head>
        <title>React Node Send</title>
      </Head>

      
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto">
            <Header/>
            <main className="mt-20">
                {children}
            </main>
        </div>
      </div>
    </>
  )
}

export default Layout
