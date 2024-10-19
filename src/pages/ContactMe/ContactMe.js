import React, { useState } from 'react';
import styled from 'styled-components';
import ContactForm from '../../components/.archived/ContactForm/ContactFrom';

// Simplified Styled Components
const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 20px;
`;

const SelectWrapper = styled.div`
  margin-bottom: 1rem;
`;

const InfoSection = styled.div`
  min-width: 250px;
`;

const ContactMe = () => {
  const [subject, setSubject] = useState('');

  return (
    <PageContainer>
      <div>
        <SelectWrapper>
          <label htmlFor='reason'>Reason for contact:</label>
          <select
            id='reason'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value=''>-- Please select a reason --</option>
            <option value='Employment'>Employment</option>
            <option value='Mentorship'>Mentorship</option>
            <option value='Question'>Question</option>
            <option value='Feedback'>Feedback</option>
            <option value='Collaboration'>Collaboration</option>
            <option value='Other'>Other</option>
          </select>
        </SelectWrapper>
        <ContactForm subject={subject} />
      </div>
      <InfoSection>
        <p>Feel free to email me directly at elimelt@uw.edu</p>
        <p>Or send me an email through the form to the left!</p>
        <p>Be sure to connect with me on LinkedIn by visiting the link above.</p>
      </InfoSection>
    </PageContainer>
  );
};

export default ContactMe;
