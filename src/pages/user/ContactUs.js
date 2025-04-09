// src/pages/user/ContactUs.js
import React from 'react';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Have questions or need assistance? Reach out to our team and we'll get back to you as soon as possible.
          </p>
          <div className="contact-details">
            <p><strong>Email:</strong> contact@mephub.lk</p>
            <p><strong>Phone:</strong> +94 76 123 4567</p>
            <p><strong>Address:</strong> 123 Business Street, Colombo, Sri Lanka</p>
          </div>
        </div>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="Your message"></textarea>
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;