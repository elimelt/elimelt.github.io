import React, { useState } from "react";
import "./ContactForm.css";
import axios from "axios";
function ContactForm({ subject }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const lastPostTimestamp = localStorage.getItem("lastEmailTimestamp");
    const now = Date.now();

    // Check if a post has been made within the last 24 hours
    if (
      lastPostTimestamp &&
      now - Number(lastPostTimestamp) < 24 * 60 * 60 * 1000
    ) {
      alert("You can only use contact me once per day!");
      return;
    }
    localStorage.setItem("lastEmailTimestamp", String(now));
    console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    axios
      .post("https://feedback-server.herokuapp.com/feedback/send", {
        name: name,
        email: email,
        feedback: message,
        secret: 69, //process.env.SECRET
      })
      .then(() => alert("Thank you for contacting me!"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button type="submit">Send</button>
    </form>
  );
}

export default ContactForm;
