import React from 'react'
import logo from '/assets/logo.png'

const Footer = () => {
  return (
    <div className='h-[10vh] w-full  flex items-center justify-center'>
      <div className='flex items-center justify-center'>
        <img className='h-[30px] w-[30px]' src={logo} alt="" />
        <h3>&copy; Copyright All Rights Reserved </h3>
         {/* <p className='font-bond underline'>Seedo</p> */}
         </div>
    </div>
  )
}

export default Footer