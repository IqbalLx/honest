import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface NewCouponFormProps {
  onSubmit: (coupon: { code: string; description: string }) => void;
  onCancel: () => void;
}

export default function NewCouponForm({ onSubmit, onCancel }: NewCouponFormProps) {
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ code, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Coupon Code" value={code} onChange={e => setCode(e.target.value)} required />
      <Textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <div className="flex justify-between">
        <Button type="submit">Submit</Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
