import { useState, FormEvent } from 'react';
import { Icon } from '@/design-system/icons';
import { toast } from 'sonner';
import './ContactSupport.css';

export default function ContactSupport() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    messageBody: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.emailAddress || !formData.messageBody) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ fullName: '', emailAddress: '', messageBody: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="contact-support-page">
      <main className="contact-support-main">
        {/* Header Text */}
        <div className="contact-support-intro">
          <h2 className="contact-support-title">Contact Support</h2>
          <p className="contact-support-subtitle">
            We're here to help with inquiries about park access, conservation programs, or planning your visit.
          </p>
        </div>

        {/* Quick Contact Bento Grid */}
        <div className="contact-support-grid">
          <a className="contact-card group" href="tel:+15551234567">
            <div className="contact-card-icon contact-card-icon--phone">
              <Icon name="call" size={24} fill />
            </div>
            <h3 className="contact-card-title">Phone Assistance</h3>
            <p className="contact-card-value">+1 (555) 123-4567</p>
          </a>
          <a className="contact-card group" href="mailto:support@wildlifepark.org">
            <div className="contact-card-icon contact-card-icon--email">
              <Icon name="mail" size={24} fill />
            </div>
            <h3 className="contact-card-title">Email Inquiry</h3>
            <p className="contact-card-value">support@wildlifepark.org</p>
          </a>
        </div>

        {/* Minimalist Form Card */}
        <div className="contact-form-card">
          {/* Subtle Form Accent */}
          <div className="contact-form-accent" />
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-row">
              {/* Name Field */}
              <div className="contact-field">
                <label className="contact-label" htmlFor="fullName">Full Name</label>
                <div className="contact-input-wrap">
                  <Icon name="person" size={20} className="contact-input-icon" />
                  <input
                    className="contact-input"
                    id="fullName"
                    type="text"
                    placeholder="Jane Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              {/* Email Field */}
              <div className="contact-field">
                <label className="contact-label" htmlFor="emailAddress">Email Address</label>
                <div className="contact-input-wrap">
                  <Icon name="alternate_email" size={20} className="contact-input-icon" />
                  <input
                    className="contact-input"
                    id="emailAddress"
                    type="email"
                    placeholder="jane@example.com"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Message Field */}
            <div className="contact-field">
              <label className="contact-label" htmlFor="messageBody">Message</label>
              <textarea
                className="contact-textarea"
                id="messageBody"
                placeholder="How can we assist you today?"
                rows={5}
                value={formData.messageBody}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            {/* Action Area */}
            <div className="contact-form-footer">
              <div className="contact-security">
                <Icon name="lock" size={16} className="contact-security-icon" />
                <span>Secure & encrypted communication</span>
              </div>
              <button 
                className="contact-submit-btn" 
                type="submit"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                {!isSubmitting && <Icon name="send" size={20} />}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
