import React from 'react';
import { Modal, Box, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const version = '1.2'; // You can make this dynamic if needed

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          bgcolor: '#4B0029',
          color: 'white',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          p: 2,
          outline: 'none',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 1.5,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 4,
              bgcolor: 'rgba(255, 255, 255, 0.4)',
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Logo */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              height: 100,
              objectFit: 'contain',
            }}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="body2"
          sx={{
            fontWeight: 'bold',
            fontSize: '10px',
            mb: 0.75,
          }}
        >
          {t('aboutTitle')}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            fontSize: '8px',
            lineHeight: 1.5,
            whiteSpace: 'pre-line',
          }}
        >
          {t('aboutDescriptionZh')}
          {'\n\n'}
          {t('aboutDescriptionJa')}
          {'\n\n'}
          {t('appName')}
          {'\n'}
          {t('versionLabel')} {version}
          {'\n'}
          {t('developerInfo')}
          {'\n'}
          <Link
            href="https://x.com/KooyuooK"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#FF45AB',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
          >
            {t('xLabel')}
          </Link>
          ｜
          <Link
            href="https://space.bilibili.com/294080110"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#FF45AB',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
          >
            {t('bilibiliLabel')}
          </Link>
        </Typography>
      </Box>
    </Modal>
  );
};

export default AboutModal;
