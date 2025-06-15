import Link from 'next/link';
import { Gift } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2">
              <Gift className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-stone-800">Giftly</h3>
            </div>
            <p className="mt-4 text-stone-600">
              Making gift-giving easier and more meaningful with AI-powered suggestions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-stone-800 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/gift-finder" className="text-stone-600 hover:text-purple-500 transition-colors">
                  Find Gifts
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold text-stone-800 uppercase tracking-wider">
              Connect With Us
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://www.linkedin.com/in/hildakhajehamiri/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-600 hover:text-purple-500 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-600 hover:text-purple-500 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-600 hover:text-purple-500 transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-stone-200">
          <p className="text-center text-stone-600">
            © {new Date().getFullYear()} Giftly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}