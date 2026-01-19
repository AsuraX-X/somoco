import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t mt-12 border-white/10 text-white bg-primary">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/w-logo.png"
                alt="Somoco Ghana Limited"
                width={140}
                height={48}
                priority={false}
                className="object-contain"
              />
            </div>
            <p className="text-sm text-white/80 max-w-sm">
              Somoco Ghana Limited is partner to the World’s No.1 and largest 3
              wheeler manufacturer Bajaj Auto, trading in Boxer Motorbikes and
              RE auto rickshaws in West Africa.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3 text-white/90">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/80 hover:underline hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm text-white/80 hover:underline hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-white/80 hover:underline hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-sm text-white/80 hover:underline hover:text-white transition-colors"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/80 hover:underline hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3 text-white/90">
              Get in touch
            </h3>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <Mail size={20} />
                <a
                  href="mailto:b2b1@somotex.com"
                  className="block text-white/80 hover:underline"
                >
                  b2b1@somotex.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={20} />
                <a
                  href="tel:+233531033489"
                  className="block text-white/80 hover:underline"
                >
                  +233 531 033 489
                </a>
              </div>

              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2 text-white/90">
                  Follow us
                </h4>
                <div className="flex items-center space-x-3">
                  <a
                    target="_blank"
                    href="https://www.facebook.com/somocoghltd/"
                    aria-label="Facebook"
                    title="Facebook"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>

                  <a
                    target="_blank"
                    href="https://www.instagram.com/somocogh/"
                    aria-label="Instagram"
                    title="Instagram"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    target="_blank"
                    href="https://x.com/somocoGhana"
                    aria-label="X"
                    title="X"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Image
                      src={"/x.svg"}
                      width={16}
                      height={16}
                      alt="x logo"
                      className="w-4 h-4"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 border-white/10 text-sm text-white/70 flex flex-col md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Somoco Ghana Limited. All rights
            reserved.
          </p>
          <p className="mt-3 md:mt-0">Made with care.</p>
        </div>
      </div>
    </footer>
  );
}
