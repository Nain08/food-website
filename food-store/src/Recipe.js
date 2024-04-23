import React, { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';
import Modal from './RestaurantList'; 
import './recipe.css';

function Recipe() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchDataFromMongoDB = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getRecipes');
        const data = response.data;
        setCarouselItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchDataFromMongoDB();
  }, []);

  const options = {
    items: 5,
    margin: 10,
    loop: true,
    nav: true,
    dots: false,
    slideBy: 1,
    autoPlay: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 5,
      },
    },
  };

  const openModal = (item) => {
    setSelectedItem(item.name);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalIsOpen(false);
  };

  return (
    
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {!modalIsOpen && (
            <OwlCarousel className="owl-theme" {...options}>
              {carouselItems.map((item, index) => (
                <div key={index} className="item" onClick={() => openModal(item)}>
                  <div className="d-flex flex-column align-items-center">
                    <img
                      className="recipe-img"
                      src={item.image}
                      alt={item.name}
                      style={{ width: '50%', height: '130px', width: '130px' }}
                    />
                    <div className="carousel-caption">
                      <h4>{item.name}</h4>
                      <p>Price: ${item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
          <Modal
            isOpen={modalIsOpen}
            closeModal={closeModal}
            selectedItem={selectedItem}
          />
        </>
      )}
    </div>

  );
}

export default Recipe;
