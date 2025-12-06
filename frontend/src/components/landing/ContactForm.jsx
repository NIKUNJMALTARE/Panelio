import { useState } from "react";
import { createContact } from "../../api/contactApi";

const ContactForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      await createContact(form);
      setStatus("Thank you! We will contact you soon.");
      setForm({ fullName: "", email: "", mobile: "", city: "" });
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container contact-wrapper">
        <div className="contact-card">
          <h2>Get a Free Consultation</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              required
            />
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
            />
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Area, City"
              required
            />
            <button type="submit" className="btn-primary">
              Get Quick Quote
            </button>
          </form>
          {status && <p className="form-status">{status}</p>}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;