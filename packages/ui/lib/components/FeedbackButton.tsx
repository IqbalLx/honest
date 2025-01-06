import { useState } from 'react';
import { Button } from './ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

import { cn } from '../utils';

import { getAxiosInstance, voteCoupon } from '@extension/shared';

interface FeedbackButtonProps {
  couponCode: string;
}

export default function FeedbackButton({ couponCode }: FeedbackButtonProps) {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const api = getAxiosInstance(import.meta.env.VITE_API_URL);

  const handleFeedback = async (type: 'positive' | 'negative') => {
    setIsLoading(true);
    setError(null);
    try {
      await voteCoupon(api, couponCode, type === 'positive' ? 'up' : 'down');
      setFeedback(type);
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleFeedback('positive')}
        disabled={feedback !== null || isLoading}
        className={cn(
          'transition-colors',
          feedback === 'positive' && 'bg-green-500 text-white border-green-500 hover:bg-green-500 hover:text-white',
        )}>
        <ThumbsUp className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleFeedback('negative')}
        disabled={feedback !== null || isLoading}
        className={cn(
          'transition-colors',
          feedback === 'negative' && 'bg-red-500 text-white border-red-500 hover:bg-red-500 hover:text-white',
        )}>
        <ThumbsDown className="h-4 w-4" />
      </Button>
    </div>
  );
}
