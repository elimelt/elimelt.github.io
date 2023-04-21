import ContactForm from '../../components/ContactForm/ContactFrom'
import { useState } from 'react'
import './ContactMe.css'

const ContactMe = () => {
  const [subject, setSubject] = useState('')
  return (
    <div className='page-container'>
      <div>
        <label htmlFor='reason'>Reason for contact:</label>
        <select
          id='reason'
          className='contact-select'
          value={subject}
          onChange={e => setSubject(e.target.value)}
        >
          <option value=''>-- Please select a reason --</option>
          <option value='Employment'>Employment</option>
          <option value='Mentorship'>Mentorship</option>
          <option value='Question'>Question</option>
          <option value='Feedback'>Feedback</option>
          <option value='Collaboration'>Collaboration</option>
          <option value='Other'>Other</option>
        </select>
        <ContactForm subject={subject}/>
      </div>
    </div>
  )
}

export default ContactMe
