import { Button } from '@extension/ui/lib/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@extension/ui/lib/components/ui/card';
import { GithubIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const githubUrl = 'https://github.com/IqbalLx/honest';

  const [browser, setBrowser] = useState('chrome');

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('firefox')) {
      setBrowser('firefox');
    } else {
      setBrowser('chrome');
    }
  }, []);

  const storeLink =
    browser === 'firefox'
      ? 'https://addons.mozilla.org/en-US/firefox/addon/honest/'
      : 'https://chrome.google.com/webstore/detail/honest/';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between">
      {/* Header */}
      <header className="w-full py-4 bg-white shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/icon-128.png" alt="Honest" className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Honest</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-black">
              Privacy Policy
            </Link>
            <a
              href="https://github.com/IqbalLx/honest"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black">
              <GithubIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold leading-tight">
            Find the Best Deals, <span className="text-yellow-600">Honestly</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Honest is a community-driven coupon-finder extension that helps you save money without stealing your
            affiliate referral cookies. We believe in transparency and user-first experience.
          </p>
          <a href={storeLink} target="_blank" rel="noopener noreferrer">
            <Button className="mt-6 bg-yellow-600 hover:bg-yellow-500">
              {browser === 'firefox' ? 'Add to Firefox' : 'Add to Chrome'} — It's free!
            </Button>
          </a>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-12 w-full">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Community-Driven</CardTitle>
            </CardHeader>
            <CardContent>Anyone can upload and vote for coupons. Honest is powered by its users.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>No Affiliate Stealing</CardTitle>
            </CardHeader>
            <CardContent>Your privacy is respected. We don't steal or overwrite your affiliate cookies.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Open Source</CardTitle>
            </CardHeader>
            <CardContent>Honest is open-source. Check out our code and contribute on GitHub.</CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-4 bg-gray-900 text-white text-center">
        <p>
          Made with ❤️ by the Honest team. Check out our code on
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 hover:underline ml-1">
            GitHub
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
