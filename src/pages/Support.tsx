import { ContentPage } from '@/shared';

export default function Support() {
  return (
    <ContentPage
      title="Support"
      subtitle="Need help with bookings, your account, or an event? We are here for you."
    >
      <p>
        Whether you have a question about a ticket, need help updating your profile, or want to
        report a concern, our team is ready to assist.
      </p>
      <h2 className="font-headline-md text-headline-md text-secondary">Contact us</h2>
      <p>
        Email us at{' '}
        <a href="mailto:f.khoshbayan@gmail.com" className="text-till hover:underline">
          f.khoshbayan@gmail.com
        </a>{' '}
        and include your account email plus a brief description of your issue. We typically respond
        within one business day.
      </p>
      <h2 className="font-headline-md text-headline-md text-secondary">Common topics</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Booking confirmations and ticket details</li>
        <li>Account access and profile updates</li>
        <li>Event information and schedule changes</li>
        <li>Code of Conduct reports</li>
      </ul>
      <p>
        For urgent on-site issues during an event, please speak with a staff member at the
        registration desk.
      </p>
    </ContentPage>
  );
}
