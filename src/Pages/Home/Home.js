import React, { useEffect } from 'react'
import './Home.css'
import axios from 'axios'
import io  from 'socket.io-client'
import CategoryBtns from './CategoryComponent/CategoryBtns'
import HomePageExplore from './HomePageExploreComponent/HomePageExplore'


// const socket=io.connect(process.env.REACT_APP_BASEURL)


export default function Home() {
  
  return (
  <>
  <div className='home_main_div'>

        <CategoryBtns/>
        <HomePageExplore/>
      
  </div>
  </>
  )
}
