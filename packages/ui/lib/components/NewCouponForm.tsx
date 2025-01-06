import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface NewCouponFormProps {
  onSubmit: (coupon: { code: string; description: string }) => Promise<void>;
  onCancel: () => void;
}

export default function NewCouponForm({ onSubmit, onCancel }: NewCouponFormProps) {
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit({ code, description });
    } catch (err) {
      setError('Failed to submit coupon. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Coupon Code"
        value={code}
        onChange={e => setCode(e.target.value)}
        required
        disabled={isLoading}
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        disabled={isLoading}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-between">
        <Button type="submit" className="flex-1 mr-2" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
        <Button variant="outline" onClick={onCancel} className="flex-1 ml-2" disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
