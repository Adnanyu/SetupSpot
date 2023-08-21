import ViewFooter from './viewFooter';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useState } from 'react';
import ImageSlider from './imageSlider/imageSlider';
const ViewImage = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='view-images-container'>
      <ImageSlider />
      <ViewFooter/>
    </div>
  );
};
export default ViewImage;
