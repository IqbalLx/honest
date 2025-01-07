export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-extrabold mb-6">Privacy Policy</h1>
      <div className="max-w-3xl text-lg text-gray-600">
        <p className="mb-4">
          At Honest, we are committed to protecting your privacy. This browser extension does not collect any personal
          data. The only information we process is the URL link where the extension is activated, solely for the purpose
          of providing you with relevant coupon codes.
        </p>
        <p className="mb-4">
          We do not store, share, or sell your browsing data. Honest operates with full transparency and respects user
          privacy at all times.
        </p>
        <p>For any questions or concerns regarding our privacy policy, please contact us via our GitHub repository.</p>
      </div>
    </div>
  );
}
