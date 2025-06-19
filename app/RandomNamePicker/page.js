'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';
import gsap from 'gsap'; // Import GSAP
import Confetti from 'react-confetti'; // Import Confetti
import { useWindowSize } from 'react-use'; // For responsive confetti

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; // Import the enhanced styles
import { FaCog, FaExpand, FaTrophy, FaTrash, FaVolumeUp } from 'react-icons/fa';

const RandomNamePicker = () => {
  const [names, setNames] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [removeWinner, setRemoveWinner] = useState(false);
  const [enableSound, setEnableSound] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [winners, setWinners] = useState([]);
  const [currentWinner, setCurrentWinner] = useState('');
  const [isDrawButtonLocked, setIsDrawButtonLocked] = useState(false);
  const scrollRef = useRef(null);
  const audioRef = useRef(null); // Reference for audio
  const [isFullscreen, setIsFullscreen] = useState(false); // Track fullscreen state
  const winnerRef = useRef(null); // Ref for the winner animation
  const scrollingTextRef = useRef(null); // Ref for the scrolling text
  const [isAnimating, setIsAnimating] = useState(false); // Track animation state
  const [scrollContent, setScrollContent] = useState([]); // New state for scroll content
  const [showConfetti, setShowConfetti] = useState(false); // State for confetti
  const { width, height } = useWindowSize(); // Get window dimensions for confetti
  const [tempNames, setTempNames] = useState([]); // Temporary state for unsaved changes

// Secure shuffle function using crypto.getRandomValues
const secureShuffleArray = (array, times = 5) => {
  let shuffledArray = [...array]; // Create a copy to avoid mutating the original array

  // Perform the shuffle operation multiple times
  for (let t = 0; t < times; t++) {
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(
        crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * (i + 1)
      );
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
  }

  return shuffledArray;
};


  const handleTempNameChange = (e) => {
    setTempNames(
      e.target.value
        .split('\n')
        .map((name) => name.trim())
        .filter(Boolean)
    );
  };

  const handleSaveAndClose = () => {
    const shuffledNames = secureShuffleArray(tempNames, 5); // Shuffle 5 times
    setNames(shuffledNames);
    setIsDrawerOpen(false);
  };
  

  const startScrolling = () => {
    if (names.length > 0) {
      setIsScrolling(true);
      setIsDrawButtonLocked(true); // Lock the button during the draw
  
      if (enableSound) {
        audioRef.current = new Audio('/assets/mu0.mp3');
        audioRef.current.loop = true;
  
        audioRef.current.oncanplaythrough = () => {
          // Start playing when ready
          audioRef.current.play().catch((error) => console.error('Audio failed:', error));
        };
      }
  
      setScrollContent(names);
  
      let currentIndex = 0;
      const listSize = names.length;
      const scrollSpeed = Math.max(20, 200 - listSize);
      const scrollDuration = Math.min(3000 + listSize * 10, 7000); // Max 7 seconds
  
      scrollRef.current = setInterval(() => {
        currentIndex = (currentIndex + 1) % names.length;
        scrollingTextRef.current.style.transform = `translateY(-${currentIndex * 100}px)`;
      }, scrollSpeed);
  
      // Use GSAP to control timing with animations
      gsap.timeline()
        .to({}, { duration: scrollDuration / 1000 })
        .call(() => quickStopScrolling(currentIndex));
    }
  };
  
  const stopScrolling = (currentIndex) => {
    if (audioRef.current) {
      // Fade out the audio before stopping
      gsap.to(audioRef.current, {
        volume: 0,
        duration: 0.5,
        onComplete: () => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        },
      });
    }
  
    const winner = names[currentIndex];
    if (winner) {
      const winSound = new Audio('/assets/mu1.mp3');
      winSound.play().catch((error) => console.error('Audio failed:', error));
  
      flushSync(() => setCurrentWinner(winner));
      flushSync(() => setWinners((prev) => [...prev, winner]));
  
      animateWinner(currentIndex);
  
      if (removeWinner) {
        flushSync(() => {
          setNames((prev) => prev.filter((name) => name !== winner));
          setTempNames((prev) => prev.filter((name) => name !== winner));
        });
      }
      setShowConfetti(true);
  
      setTimeout(() => setShowConfetti(false), 3000);
    }
  
    setScrollContent([]);
    setIsScrolling(false);
  };
  
  const quickStopScrolling = (currentIndex) => {
    gsap.to(scrollingTextRef.current, {
      y: -currentIndex * 100,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => stopScrolling(currentIndex),
    });
  };
  
  
  
  

    
  

  const animateWinner = (index) => {
    const winnerElement = winnerRef.current;
  
    if (!winnerElement) {
      console.error('Winner element not found!');
      return;
    }
  
    const { width, height } = winnerElement.getBoundingClientRect();
  
    setIsAnimating(true); // Start animation
  
    gsap.fromTo(
      winnerElement,
      {
        opacity: 0,
        scale: 0.5,
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
      },
      {
        opacity: 1,
        scale: 4,
        duration: 1.5,
        ease: 'power4.out',
        onComplete: () => {
          setTimeout(() => {
            gsap.to(winnerElement, { opacity: 0, duration: 1 });
            setIsAnimating(false); // Animation ends
  
            // Keep the button locked for a brief period after animation completes
            setTimeout(() => {
              setIsDrawButtonLocked(false); // Unlock the button
            }, 2500); // Adjust delay as needed
          }, 10000); // Delay before starting the fade-out effect
        },
      }
    );
  };
  


  const handleNameChange = (e) => {
    setNames(
      e.target.value
        .split('\n')
        .map((name) => name.trim())
        .filter(Boolean)
    );
  };

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      setIsFullscreen(true);
      document.querySelector('.container-fluid').classList.add('fullscreen');
    });
  } else {
    document.exitFullscreen().then(() => {
      setIsFullscreen(false);
      document.querySelector('.container-fluid').classList.remove('fullscreen');
    });
  }
};


  const bottomRef = useRef(null); // Ref to the bottom of the table

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [winners]);

  useEffect(() => {
    return () => clearInterval(scrollRef.current);
  }, []);

  return (
    <div className="container-fluid vh-100 d-flex flex-column align-items-center justify-content-center p-0">
      {isAnimating && <div className="overlay" />}
      {showConfetti && <Confetti width={width} height={height} />} {/* Confetti component */}

      <div ref={winnerRef} className="winner-animation">
        {currentWinner}
      </div>


      {/* Winners Table */}
      <div className="winners-table-container position-absolute top-0 start-0 m-3 rounded shadow-lg">
        <h2>
          <FaTrophy /> Winners Table
        </h2>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Winner Number</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{winner}</td>
                </tr>
              ))}
              <tr ref={bottomRef} /> {/* Invisible element to trigger auto-scroll */}
            </tbody>
          </table>
        </div>
      </div>

      <img
        src="assets/1.png"
        className="logo mt-4"
        alt="Logo"
        style={{ width: '200px', height: '200px' }}
      />
      <div className="top-right-icons position-absolute top-0 end-0 p-3">
        <FaCog className="icon me-4" onClick={() => setIsDrawerOpen((prev) => !prev)} />
        <FaExpand
          className="icon"
          onClick={toggleFullScreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        />
      </div>
<br></br> <br></br>

      <h1 className="text-center mb-4 big-title" style={{ color: '#FFFFFF' }}>
        Lucky Draw
      </h1>
      <div className={`drawer ${isDrawerOpen ? 'open' : ''} position-fixed shadow-lg`}>
        <button className="btn-close btn-close-white ms-auto mt-2 me-3" onClick={() => setIsDrawerOpen(false)}></button>
        <h2 className="text-center mb-4 modern-title">Settings</h2>

          <textarea
            className="form-control modern-textarea"
            value={tempNames.join('\n')}
            onChange={handleTempNameChange}
            rows="9"
            placeholder="Enter names, each on a new line..."
          />

<br></br>
        <div className="form-check modern-checkbox d-flex align-items-center gap-3 mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={removeWinner}
            onChange={() => setRemoveWinner((prev) => !prev)}
            id="removeWinnerCheckbox"
          />
          <label className="form-check-label d-flex align-items-center gap-2" htmlFor="removeWinnerCheckbox">
            <FaTrash /> Remove winner from list
          </label>
        </div>

        <div className="form-check modern-checkbox d-flex align-items-center gap-3 mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            checked={enableSound}
            onChange={() => setEnableSound((prev) => !prev)}
            id="enableSoundCheckbox"
          />
          <label className="form-check-label d-flex align-items-center gap-2" htmlFor="enableSoundCheckbox">
            <FaVolumeUp /> Enable sound effect
          </label>
        </div>

        <div className="d-flex justify-content-center mt-4">
        
        <button className="btn btn-success px-4 py-2 mt-4" onClick={handleSaveAndClose}>
          Save & Close
        </button>
        </div>
      </div>

      <div className="result-box my-4 bigger-box">
        <div className="scrolling-text-container">
          <div ref={scrollingTextRef} className="scrolling-text">
            {scrollContent.map((name, index) => (
              <div key={index} className="name-item">{name}</div>
            ))}
          </div>
        </div>
      </div>

      <button
  onClick={startScrolling}
  className="btn btn-lg my-3 custom-draw-button"
  disabled={isScrolling || isDrawButtonLocked || names.length === 0}
  style={{
    cursor: isDrawButtonLocked
      ? 'wait'
      : isScrolling
      ? 'not-allowed'
      : 'pointer',
  }}
>
  {isScrolling ? 'Drawing...' : 'Draw'}
</button>





      <div className="bottom-images d-flex justify-content-center gap-4 mt-auto mb-5">
        <img src="assets/5.png" className="img-thumbnail no-bg" alt="Image 3" />

            </div>
    </div>
  );
};

export default RandomNamePicker;






