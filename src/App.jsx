import { useState } from 'react'
import './sass/App.scss'
import world from './assets/hero-image-wr.jpg'
import logo from './assets/Logo.svg'
import { Card } from './componentes/Card'
import { DetailCountries } from './componentes/DetailCountries'

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const openDetailModal = (country) => {
    setSelectedCountry(country);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setSelectedCountry(null);
    setShowDetailModal(false);
  };
  return (
    <>
    <header>
      <img className='img-world' src={world}/>
      <img className='img-logo' src={logo}/>
    </header>
    <main>
    {!showDetailModal && (
        <Card
          onCountryClick={openDetailModal} // Pasar la función para abrir el modal
        />
      )}
      {showDetailModal && (
        <DetailCountries
          isOpen={showDetailModal}
          onClose={closeDetailModal} // Pasar la función para cerrar el modal
          country={selectedCountry}
        />
      )}
      </main>
   
    </>
  )
}

export default App
