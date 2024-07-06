import { Loader } from '@react-three/drei'
import React, { Suspense } from 'react'

function About() {
  return (
    <Suspense fallback = { <Loader />}>
    <section className="relative flex lg:flex-row flex-col
    max-container">
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">
          My CV
        </h1>
        <embed src="Resume-2024.pdf" className='h-screen' type="application/pdf"/>
      </div>
    </section>
    </Suspense>
  )
}

export default About