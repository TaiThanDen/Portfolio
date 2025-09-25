import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdOutlineEmail } from 'react-icons/md';
import { FaFacebookF } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import { BackgroundBeams } from '@/components/ui/shadcn-io/background-beams';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
const API_BASE = import.meta.env.VITE_API_BASE as string;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<ContactFormData>({
    mode: 'onBlur',
  });

  // Hiển thị toast khi có lỗi validate
  const showValidationErrors = async (data: ContactFormData) => {
    const valid = await trigger();
    if (!valid) {
      if (!data.name?.trim()) toast.error('Name is required');
      if (!data.email?.trim()) toast.error('Email is required');
      if (!data.message?.trim()) toast.error('Message is required');
      return false;
    }
    return true;
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Làm sạch dữ liệu trước khi gửi
    const payload = {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.replace(/\r\n/g, "\n").trim(),
    };

    try {
      const resp = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });

      const json = await resp.json().catch(() => ({}));
      if (!resp.ok || !json?.ok) {
        throw new Error(json?.error || `Request failed: ${resp.status}`);
      }

      toast.success("Message sent successfully ");
      reset();
    } catch (err: any) {
      console.error('Contact form error:', err);
      toast.error(err?.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-40 bg-[#18181b] text-white overflow-hidden">
      {/* Background Beams */}
      <BackgroundBeams className="absolute inset-0 z-0" />
      <div className="flex items-center justify-center grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto gap-10 relative z-10">
        {/* Left Side - Contact Info */}
        <div className="grid col-span-1">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Let's Talk
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            Have some big idea to develop and need help? Then reach out—we'd love to hear about your project and provide help.
          </p>

          <label className="mb-2 block text-lg font-semibold">Email</label>
          <div className="font-semibold mb-6 flex items-center">
            <div className="bg-gray-800 rounded-full p-3 text-gray-100 text-3xl flex items-center justify-center mr-4">
              <MdOutlineEmail />
            </div>
            <p className="text-gray-400">tai25062006z@gmail.com</p>
          </div>

          <label className="mb-2 block text-lg font-semibold">Socials</label>
          <div className="font-semibold mb-6 flex items-center gap-4">
            <a
              href="https://www.facebook.com/tai.pham.731844"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-full p-3 text-gray-100 text-3xl flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <FaFacebookF />
            </a>
            <div className="bg-gray-800 rounded-full p-3 text-gray-100 text-3xl flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
              <SiZalo />
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <form
          className="grid col-span-1 p-10 rounded-2xl shadow-2xl w-full max-w-xl bg-gray-900/50 backdrop-blur-sm border border-purple-500/20"
          onSubmit={handleSubmit(async (data) => {
            const valid = await showValidationErrors(data);
            if (valid) await onSubmit(data);
          })}
        >
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
              className={`mt-1 block w-full border rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.name ? 'border-red-500' : 'border-gray-600'
                }`}
              placeholder="Your Name"
              onBlur={() => {
                if (errors.name) toast.error(errors.name.message as string);
              }}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/i,
                  message: 'Please enter a valid email address'
                },
              })}
              className={`mt-1 block w-full border rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.email ? 'border-red-500' : 'border-gray-600'
                }`}
              placeholder="your.email@example.com"
              onBlur={() => {
                if (errors.email) toast.error(errors.email.message as string);
              }}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              {...register('message', {
                required: 'Message is required',
                minLength: { value: 10, message: 'Message must be at least 10 characters' },
                maxLength: { value: 1000, message: 'Message must be less than 1000 characters' }
              })}
              rows={4}
              className={`mt-1 block w-full border rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none ${errors.message ? 'border-red-500' : 'border-gray-600'
                }`}
              placeholder="Tell me about your project or question..."
              onBlur={() => {
                if (errors.message) toast.error(errors.message.message as string);
              }}
            />
            {errors.message && (
              <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}