import { useState } from "react";
import { createSubscriber } from "../../api/subscriberApi";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      const res = await createSubscriber({ email });
      setStatus(res.data.message || "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setStatus("Unable to subscribe. Try again.");
    }
  };

  return (
    <section className="newsletter">
      <div className="container newsletter-inner">
        <div>
          <h2>Subscribe to our newsletter</h2>
          <p>Get updates on new projects and tips directly to your inbox.</p>
        </div>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn-secondary">
            Subscribe
          </button>
        </form>
        {status && <p className="form-status">{status}</p>}
      </div>
    </section>
  );
};

export default NewsletterSection;