import React, { useState } from 'react';
import Modal from './Modal';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Email field cannot be empty.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/mrbzkqdj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEmail('');
        setIsModalOpen(true);  
        setError(''); // Clear any previous error messages
      } else {
        const errorText = await response.text(); // Get error message as text
        setError(`Submission failed: ${errorText}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred while submitting the form.');
    }
  };

  const handleChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!newEmail.trim()) {
      setError('Email field cannot be empty.');
    } else if (!validateEmail(newEmail)) {
      setError('Please enter a valid email address.');
    } else {
      setError(''); // Clear error if the email is valid
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='rounded-lg bg-white border border-white w-full h-10 flex items-center justify-center overflow-hidden focus:ring-inset focus:ring-2 focus:ring-[#B47B2B]'>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder='Enter email'
          className='w-full bg-transparent text-base text-black placeholder:text-base placeholder:tracking-wide border placeholder:text-[#999] placeholder:font-normal font-open-sans sm:text-sm px-2 py-3 outline-none'
        />
        <button type="submit" className='bg-btn-gold h-full w-[50px] flex justify-center items-center outline-none'>
          <img src="/assets/footer-right-arrow.svg" alt="Submit" />
        </button>
      </form>
      {error && (
        <p className='text-red-500 text-sm mt-1'>{error}</p> // Display error message
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        src='./assets/user-tick.svg'
        heading="Thank you for subscribing!"
        paragraphText="Elevate your look, stay in the know - our newsletter's got you covered."
        buttonLabel="Continue"
      />
    </>
  );
};

export default NewsletterForm;
