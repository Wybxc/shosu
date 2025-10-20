import { useState, useEffect, useMemo } from 'react';
import { Box, IconButton, Snackbar, Alert } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ExecutionButton from './components/ExecutionButton';
import AboutModal from './components/AboutModal';
import SoundUtils from './utils/SoundUtils';

function App() {
  const { t } = useTranslation();
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const aboutAlphaControls = useAnimation();
  const soundUtils = useMemo(() => new SoundUtils(), []);

  useEffect(() => {
    // Show tip on first visit
    const tipShown = localStorage.getItem('tip_shown');
    if (!tipShown) {
      setTimeout(() => {
        setShowTip(true);
        localStorage.setItem('tip_shown', 'true');
      }, 500);
    }

    // Cleanup
    return () => {
      soundUtils.release();
    };
  }, [soundUtils]);

  const handlePressStart = () => {
    aboutAlphaControls.start({ opacity: 0, transition: { duration: 0.1 } });
  };

  const handlePressEnd = () => {
    aboutAlphaControls.start({ opacity: 1, transition: { duration: 0.2 } });
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Background image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
        }}
      />

      {/* Info button */}
      <motion.div
        animate={aboutAlphaControls}
        style={{
          position: 'absolute',
          top: 48,
          left: 20,
        }}
      >
        <IconButton
          onClick={() => setShowAboutModal(true)}
          sx={{
            color: 'rgba(37, 37, 37, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <InfoIcon />
        </IconButton>
      </motion.div>

      {/* Execution button */}
      <ExecutionButton
        size={240}
        soundUtils={soundUtils}
        onPressStart={handlePressStart}
        onPressEnd={handlePressEnd}
      />

      {/* About modal */}
      <AboutModal
        open={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />

      {/* Tip Snackbar */}
      <Snackbar
        open={showTip}
        autoHideDuration={6000}
        onClose={() => setShowTip(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowTip(false)}
          severity="info"
          sx={{
            width: '100%',
            backgroundColor: '#4B0029',
            color: 'white',
          }}
        >
          {t('tipFromEma')}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
