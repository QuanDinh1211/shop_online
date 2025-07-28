import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { bannerSlides } from "../data/banners";

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
      {bannerSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide
              ? "translate-x-0"
              : index < currentSlide
              ? "-translate-x-full"
              : "translate-x-full"
          }`}
        >
          <div className="relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-lg mb-4 md:mb-6 opacity-90">
                  {slide.subtitle}
                </p>
                <Link
                  to={slide.buttonLink}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-semibold transition-colors"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-1 md:p-2 rounded-full transition-all"
      >
        <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-1 md:p-2 rounded-full transition-all"
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
