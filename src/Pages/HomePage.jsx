import React from 'react'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const data = useSelector((store)=> store.products)
  console.log(data)
  return (
    <div>
        Home Page
    </div>
  )
}

export default HomePage
