import { FileX } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <FileX className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold mb-2">No Coupons Available</h2>
      <p className="text-gray-500">
        There are currently no coupons available for this site. Check back later or add a new coupon if you know one!
      </p>
    </div>
  );
}
