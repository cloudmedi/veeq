'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Footer from '@/components/ui/footer'
import isAuth from '@/helper/isAuth'

function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  })

  return (
    <>
      <main className="grow">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default isAuth(DefaultLayout);