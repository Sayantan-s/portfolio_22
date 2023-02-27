import { CTA } from '@stories/templates/home';
import dynamic from 'next/dynamic';
import React, { useCallback, useState } from 'react';

const ContactModal = dynamic(
  () => import(/* webpackPrefetch: true */ '@stories/molecules/ContactModal'),
  {
    loading: () => {
      return <div>loading...</div>;
    }
  }
);

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
