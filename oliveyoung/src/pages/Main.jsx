import React from 'react';
import ReviewWriteSection from '../review/pages/ReviewWriteSection';
import Reviewtitle from '../review/pages/Reviewtitle';
function Main() {
  return (
    <div>
      <div className="max-w-4xl mx-auto py-10">
        <ReviewWriteSection />
      </div>
      <div className="max-w-4xl mx-auto py-10">
        <Reviewtitle />
      </div>
    </div>
  );
}


export default Main;
