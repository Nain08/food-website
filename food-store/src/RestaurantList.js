import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RestaurantList.css';

const RestaurantList = ({ isOpen, closeModal, selectedItem }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getRecipes`);
        const recipes = response.data;

        const selectedRecipe = recipes.find((recipe) => recipe.name === selectedItem);
        const restaurantList = selectedRecipe ? selectedRecipe.Restaurants || [] : [];
        setRestaurants(restaurantList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
        setLoading(false);
      }
    };

    if (isOpen && selectedItem) {
      setOrderPlaced(false); 
      fetchRestaurants();
    }
  }, [isOpen, selectedItem]);

  const handleOrderClick = (restaurant) => {
    
    setOrderPlaced(true);
    setTimeout(() => {
      closeModal();
      setOrderPlaced(false); 
    }, 2000); 
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Restaurant Modal"
      className="restaurantList-modal"
    >
      <h2 className='restaurantList-heading'>Order {selectedItem} from your favorite restaurants</h2>
      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(restaurants) && restaurants.length > 0 ? (
        <ul className='restaurantList-list'>
          {restaurants.map((restaurant, index) => (
            <li key={index} className='restaurantList-list-item'>
              {restaurant} - <button onClick={() => handleOrderClick(restaurant)} className='restaurantList-order-btn'>Order Now</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className='restaurantList-notFound'>No restaurants found for {selectedItem}</p>
      )}
      {orderPlaced && (
        <div className="alert alert-success" role="alert">
          Order placed successfully!
        </div>
      )}

      <button onClick={closeModal} className='restaurantList-close-btn'>Close</button>
    </Modal>
  );
};

export default RestaurantList;
