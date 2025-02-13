import ContactModal from '@stories/molecules/ContactModal';
import { CTA } from '@stories/templates/home';
import React, { useCallback, useState } from 'react';

export const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleHide = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <React.Fragment>
      <ContactModal show={showModal} onHide={handleHide} />
      <CTA onConnectClick={handleShow} />
    </React.Fragment>
  );
};
