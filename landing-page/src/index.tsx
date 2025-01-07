import { createRoot } from 'react-dom/client';
import '@src/index.css';
import '@extension/ui/dist/global.css';
import LandingPage from '@src/LandingPage';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { PrivacyPolicy } from './PrivacyPolicy';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }

  const root = createRoot(appContainer);
  root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>,
  );
}

init();
