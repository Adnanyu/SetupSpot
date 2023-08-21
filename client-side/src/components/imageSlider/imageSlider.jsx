import { useState } from "react";
import { useSelector } from "react-redux";
import './imageSlider.css'
const ImageSlider = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const { post } = useSelector(state => state.post)

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % post.images.length);
      };
    
      const handlePrev = () => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex - 1 + post.images.length) % post.images.length
        );
    }; 
    
    return (
        <div className='images-slide'>
        <div className='image-slider'>
         { post.images.length > 1 ? <button className='prev-button' onClick={handlePrev}>
          &#10094;
          </button> : ''}
          <img
            src={post.images[currentImageIndex].url}
            alt={`Slide ${currentImageIndex}`}
          />
         { post.images.length > 1 ? <button className='next-button' onClick={handleNext}>
          &#10095;
          </button> : ''}
        </div>
      </div>
    )
}

export default ImageSlider