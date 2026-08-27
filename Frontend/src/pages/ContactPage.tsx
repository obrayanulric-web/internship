import React from 'react';
import { Mail, Phone, MapPin, UserCheck, MessageSquare } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full relative py-12 md:py-16 bg-gray-900 rounded-none overflow-hidden flex items-center justify-center">
      {/* Fullscreen Background Image */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
        alt="Sanctuary Home Office"
        className="absolute inset-0 w-full h-full object-cover rounded-none"
      />
      
      {/* Dark Overlay with subtle blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] rounded-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 rounded-none my-auto">
        
        {/* Header Section */}
        <div className="mb-10 max-w-xl text-white">
          <span className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase">
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1">
            Let's talk
          </h1>
          <p className="mt-2 text-sm text-gray-200 leading-relaxed">
            We're here to help you find your next property with FindHome. Reach out directly to our sales team or send us a message.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Details & Sales Agent Profile */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-white p-6 sm:p-8 rounded-none border border-slate-200 shadow-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Contact Details</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-none bg-[#f0f4f2] flex items-center justify-center text-[#0f382c] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Email</p>
                    <p className="text-sm font-medium text-gray-900">hello@findhome.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-none bg-[#f0f4f2] flex items-center justify-center text-[#0f382c] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Office Line</p>
                    <p className="text-sm font-medium text-gray-900">+237 671 234 567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-none bg-[#f0f4f2] flex items-center justify-center text-[#0f382c] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Location</p>
                    <p className="text-sm font-medium text-gray-900">Douala, Cameroon</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Sales Agent Card */}
            <div className="bg-white border border-slate-200 shadow-2xl overflow-hidden rounded-none">
              <div className="relative h-64 bg-gray-900 rounded-none">
                <img
                  src="https://prod.cdn-medias.theafricareport.com/cdn-cgi/image/q=auto,f=auto,metadata=none,width=1280,height=720,fit=cover/https://prod.cdn-medias.theafricareport.com/medias/2022/06/enonchong-592x296-1654082465.jpg"
                  alt="Senior Real Estate Sales Agent"
                  className="w-full h-full object-cover object-top rounded-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-none" />
                
                <div className="absolute top-4 left-4 bg-[#0f382c] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 flex items-center gap-1.5 rounded-none">
                  <UserCheck className="w-3.5 h-3.5" />
                  Lead Sales Agent
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white rounded-none">
                  <h4 className="text-lg font-bold">Rebecca Enonchong</h4>
                  <p className="text-xs text-gray-300">Senior Real Estate Specialist at FindHome</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t border-slate-200 flex items-center justify-between rounded-none">
                <div>
                  <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Direct Agent Mobile</p>
                  <p className="text-xs font-bold text-[#0f382c] mt-0.5">+237 699 845 120</p>
                </div>
                <a
                  href="tel:+237699845120"
                  className="px-3 py-2 bg-[#0f382c] hover:bg-[#0b2920] text-white text-xs font-semibold flex items-center gap-1.5 transition rounded-none"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Call Agent
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 border border-slate-200 shadow-2xl rounded-none">
              <ContactForm />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};