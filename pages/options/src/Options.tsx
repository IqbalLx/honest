import '@src/Options.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';

const Options = () => {
  return (
    <main className="flex-1 flex items-center justify-center text-center px-4">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold leading-tight">
          Find the Best Deals, <span className="text-yellow-600">Honestly</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Honest is a community-driven coupon-finder extension that helps you save money without stealing your affiliate
          referral cookies. We believe in transparency and user-first experience.
        </p>
      </div>
    </main>
  );
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
