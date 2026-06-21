import { CalendarHeart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/ui';
import { cn } from '@/lib';

export default function CreateEventHelper({
  description,
  className,
  buttonText = 'Get Started',
  noTitle = false,
}: {
  description?: string;
  className?: string;
  buttonText?: string;
  noTitle?: boolean;
}) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={cn(
          'gap-stack-gutter my-5 flex w-full flex-col flex-wrap items-center justify-center p-6 sm:flex-row',
          className,
        )}
      >
        {!noTitle && (
          <div className="flex items-center gap-2">
            <CalendarHeart size={25} className="text-till" />
            <h2 className="font-headline-md text-headline-md text-primary">Host an Event</h2>
          </div>
        )}
        {description ?? <p>{description}</p>}
        <Button
          size="sm"
          BtnText={buttonText}
          color="till"
          variant="outlined"
          onClick={() => navigate('/create-event')}
        />
      </div>
    </>
  );
}
