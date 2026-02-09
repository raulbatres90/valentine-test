import { useState, useEffect } from 'react'
import './App.css'

const translations = {
  es: '¿Quieres ser mi cita de San Valentín mi ojos lindos?',
  en: 'Will you be my Valentine my beautiful eyes?',
  fr: 'Veux-tu être mon rendez-vous de la Saint-Valentin mes beaux yeux?',
  pt: 'Quer ser meu encontro de Dia dos Namorados meus olhos lindos?',
}

const modalTexts = {
  es: 'Te veo el sábado mi amor',
  en: 'See you Saturday my love',
  fr: 'Je te vois samedi mon amour',
  pt: 'Te vejo no sábado meu amor',
}

function App() {
  const [currentLang, setCurrentLang] = useState<keyof typeof translations>('es')
  const [showModal, setShowModal] = useState(false)
  const [noClicks, setNoClicks] = useState(0)

  useEffect(() => {
    const languages: (keyof typeof translations)[] = ['es', 'en', 'fr', 'pt']
    let currentIndex = 0
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % languages.length
      setCurrentLang(languages[currentIndex])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleYes = () => {
    setShowModal(true)
  }

  const handleNo = () => {
    setNoClicks(prev => prev + 1)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div className="app">
      <div className="tree-container">
        {/* Árbol */}
        <div className="tree">
          <div className="trunk"></div>
          <div className="branches">
            {/* Pétalos de corazón */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="heart-petal"
                style={{
                  left: `${10 + (i % 5) * 20}%`,
                  top: `${15 + Math.floor(i / 5) * 15}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${3 + (i % 3)}s`
                }}
              >
                <div className="heart-shape"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="content">
        <h1 className="question-text">{translations[currentLang]}</h1>
        
        <div className="buttons-container">
          <button
            className={`yes-button ${noClicks > 0 ? 'bigger' : ''}`}
            onClick={handleYes}
            style={{
              transform: `scale(${1 + noClicks * 0.2})`,
              transition: 'transform 0.3s ease'
            }}
          >
            SI
          </button>
          <button className="no-button" onClick={handleNo}>
            NO
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>×</button>
            <h2 className="modal-text">
              {modalTexts[currentLang]} 💕 😍 ❤️ 💖
            </h2>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
