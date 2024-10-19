import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components for Consistent Layout
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 400px;
  margin: 0 auto;
`;

const InputField = styled.input`
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const TextAreaField = styled.textarea`
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
`;

const Button = styled.button`
  // background-color: #007bff;
  // color: white;
  // border: none;
  // cursor: pointer;
  // transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

function ContactForm({ subject }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const lastPostTimestamp = localStorage.getItem('lastEmailTimestamp');
    const now = Date.now();

    if (lastPostTimestamp && now - Number(lastPostTimestamp) < 24 * 60 * 60 * 1000) {
      alert('You can only contact me once per day!');
      return;
    }

    localStorage.setItem('lastEmailTimestamp', String(now));

    axios
      .post('https://feedback-server.herokuapp.com/feedback/send', {
        name: name,
        email: email,
        feedback: message,
        secret: 69,
      })
      .then(() => alert('Thank you for contacting me!'));
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputField
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <InputField
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextAreaField
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        required
      />
      <Button type="submit">Send</Button>
    </FormContainer>
  );
}

export default ContactForm;
