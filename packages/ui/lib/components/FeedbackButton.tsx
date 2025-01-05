import { useState } from 'react';
import { Button } from './ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

import { cn } from '../utils';

interface FeedbackButtonProps {
  couponId: string;
}

export default function FeedbackButton({ couponId }: FeedbackButtonProps) {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);

  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedback(type);
    // In a real app, you would send this feedback to your backend
    console.log(`Feedback for coupon ${couponId}: ${type}`);
  };

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleFeedback('positive')}
        disabled={feedback !== null}
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
        disabled={feedback !== null}
        className={cn(
          'transition-colors',
          feedback === 'negative' && 'bg-red-500 text-white border-red-500 hover:bg-red-500 hover:text-white',
        )}>
        <ThumbsDown className="h-4 w-4" />
      </Button>
    </div>
  );
}
