import { AppLayout } from '@stories/molecules';
import { Blogs, CTA } from '@stories/templates/home';
import React from 'react';

export const LandingPage = () => {
  return (
    <AppLayout>
      <CTA />
      <Blogs />
    </AppLayout>
  );
};
