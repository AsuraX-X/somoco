import { Calendar, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
import ContactForm from "@/components/Contact/ContactFrom";
import Locations from "@/components/Contact/Locations";

const ContactUs = () => {
  return (
    <div>
      <div className="w-full max-h-[430px] relative h-full">
        <Image
          src={"/banners/contact-banner.png"}
          alt="about us banner"
          width={430}
          height={0}
          unoptimized
          className="h-full w-full"
        />
        <h1 className="absolute bottom-2 sm:bottom-5 px-4 sm:px-20 text-white font-extrabold text-2xl sm:text-4xl shadow-2xl uppercase text-shadow-2xs text-shadow-accent-foreground/30">
          Contact Us
        </h1>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-12">
        {/* Left: Sticky Info */}
        <aside className="order-2 md:order-1">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl border-2 border-primary">
            <h2 className="font-family-cera-stencil text-2xl mb-3">
              Have Questions?
            </h2>
            <p className="mb-4">
              Our team is available to assist with sales, service and support.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <PhoneCall size={18} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <div className="font-medium flex gap-2">
                    <a
                      href="tel:0501578360"
                      className="hover:text-primary transition-colors"
                    >
                      0501578360
                    </a>
                    <span>/</span>
                    <a
                      href="tel:0247970012"
                      className="hover:text-primary transition-colors"
                    >
                      0247970012
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">
                    North Industrial Area, Dadeban Road, Opposite Duraplast
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hours</p>
                  <p className="font-medium">
                    Mon–Sat · 8:00am–5:00pm (Sat 9:00am–2:00pm)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm text-muted-foreground mb-2">Find us</h3>
              <div className="w-full rounded-md overflow-hidden border focus-visible:outline-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.9076974613263!2d-0.22600122501467668!3d5.5806613944000025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a1e370781dd%3A0xb96cee63db927cb6!2sSomoco%20Ghana%20-%20North%20Industrial%20Area!5e0!3m2!1sen!2sgh!4v1760969046732!5m2!1sen!2sgh"
                  className="h-90 w-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </aside>

        {/* Right: Contact Form */}
        <div className="order-1 md:sticky top-5 h-fit md:order-2">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl border-2 border-primary">
            <h2 className="font-family-cera-stencil text-2xl mb-3">
              Get in Touch
            </h2>
            <p className="mb-6">
              Send us a message and we&apos;ll get back to you as soon as
              possible.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
      <Locations />
    </div>
  );
};

export default ContactUs;
