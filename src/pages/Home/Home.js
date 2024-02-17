import { useState } from 'react'
import './Home.css'
import Composer from '../../components/Composer/Composer'
import image from '../../portrait.JPG'
import EtchASketch from '../../components/EtchASketch/EtchASketch'
import Everything from '../../components/Everything/Everything'
import Tools from '../Tools/Tools'

const WelcomeMessage = () => (
  <>
    <h2 className='home-heading'>Welcome to my personal website!</h2>
    <div className='home-content'>
      <div className='home-description'>
        <p className='home-text'>
          I'm a computer engineering student at UW Seattle, where I mainly study
          systems and databases. Outside of my academics, I enjoy using
          technology to enrich various student organizations at UW.
        </p>
        <p className='home-text'>
          This website is a blend of personal, professional, and academic
          pursuits of mine. I also enjoy experimenting with web development, and
          use this website as a hobby project/sandbox. Feel free to explore the
          website and reach out to me if you have any questions!
        </p>
      </div>
      <div className='home-image-container'>
        <img
          src={image}
          alt='Computer Engineering Student'
          className='home-image'
        />
      </div>
    </div>
  </>
)

const Home = () => {
  const [idx, setIdx] = useState(0)
  const numGames = 3

  const prevSlide = () => {
    setIdx((idx - 1 + numGames) % numGames)
  }

  const nextSlide = () => {
    setIdx((idx + 1) % numGames)
  }

  return (
    <div className='home-container'>
      <div className='carousel-container'>
        <div className={'carousel-buttons'}>
          <button className='carousel-button' onClick={prevSlide}>
            Previous
          </button>
          <button className='carousel-button' onClick={nextSlide}>
            Next
          </button>
        </div>
        <div
          className='carousel'
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          <div className='carousel-item'>
            <WelcomeMessage />
          </div>
          <div className='carousel-item'>
            <Everything />
          </div>
          <div className='carousel-item'>
            <Tools />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
