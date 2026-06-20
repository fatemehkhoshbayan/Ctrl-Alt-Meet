import { useFormContext } from 'react-hook-form';
import { useSpeakers } from '@/services';
import type { TCreateEventFormValues } from '@/schemas';

function formatDate(date: string) {
  if (!date) return '—';
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function ReviewStep() {
  const { getValues } = useFormContext<TCreateEventFormValues>();
  const values = getValues();
  const { data: speakers = [] } = useSpeakers();

  const selectedSpeakerNames = speakers
    .filter(speaker => values.speakers.includes(speaker.id))
    .map(speaker => speaker.name);

  return (
    <section className="bg-surface-container text-on-surface-variant gap-stack-gap flex flex-col rounded-lg p-10">
      <h4 className="text-label-md font-semibold text-on-surface">Review your event</h4>

      <dl className="flex flex-col gap-4 text-sm">
        <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
          <dt>Title</dt>
          <dd className="text-on-surface max-w-xs text-right font-medium">{values.title || '—'}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Category</dt>
          <dd className="text-on-surface font-medium">{values.category || '—'}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Tags</dt>
          <dd className="text-on-surface max-w-xs text-right font-medium">{values.tags || '—'}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Date</dt>
          <dd className="text-on-surface font-medium">
            {formatDate(values.date)} – {formatDate(values.endDate)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Time</dt>
          <dd className="text-on-surface font-medium">
            {values.time} – {values.endTime} ({values.timezone})
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Location</dt>
          <dd className="text-on-surface max-w-xs text-right font-medium">
            {[values.venue, values.city, values.country].filter(Boolean).join(', ') || '—'}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Capacity</dt>
          <dd className="text-on-surface font-medium">{values.maxAttendees.toLocaleString()}</dd>
        </div>
      </dl>

      <div className="mt-2 border-t border-white/10 pt-4">
        <p className="text-label-md text-on-surface mb-3 font-semibold">Speakers</p>
        {selectedSpeakerNames.length > 0 ? (
          <ul className="gap-stack-gap flex flex-wrap">
            {selectedSpeakerNames.map(name => (
              <li
                key={name}
                className="bg-surface-container-high text-on-surface rounded-full px-4 py-2 text-sm font-medium"
              >
                {name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-label-sm">No speakers selected</p>
        )}
      </div>

      <div className="mt-2 border-t border-white/10 pt-4">
        <p className="text-label-md text-on-surface mb-3 font-semibold">Highlights</p>
        {values.highlights.length > 0 ? (
          <ul className="gap-stack-gap flex flex-col">
            {values.highlights.map((highlight, index) => (
              <li
                key={index}
                className="bg-surface-container-high rounded-lg px-4 py-3"
              >
                <p className="text-on-surface font-medium">{highlight.title || `Highlight ${index + 1}`}</p>
                <p className="text-label-sm">{highlight.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-label-sm">No highlights added</p>
        )}
      </div>

      <div className="mt-2 border-t border-white/10 pt-4">
        <p className="text-label-md text-on-surface mb-3 font-semibold">Ticket Tiers</p>
        <ul className="gap-stack-gap flex flex-col">
          {values.ticketTiers.map((tier, index) => (
            <li
              key={index}
              className="bg-surface-container-high flex items-center justify-between rounded-lg px-4 py-3"
            >
              <div>
                <p className="text-on-surface font-medium">{tier.name || `Tier ${index + 1}`}</p>
                <p className="text-label-sm">{tier.total} seats</p>
              </div>
              <span className="text-till text-lg font-bold">${tier.price}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-outline text-label-sm pt-2">
        Publishing makes your event visible to everyone on Ctrl Alt Meet.
      </p>
    </section>
  );
}
