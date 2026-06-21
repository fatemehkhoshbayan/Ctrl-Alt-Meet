import { ContentPage } from '@/shared';

export default function CodeOfConduct() {
  return (
    <ContentPage
      title="Code of Conduct"
      subtitle="Ctrl Alt Meet is a welcoming space for everyone in the tech community."
    >
      <p>
        We are committed to providing a friendly, safe, and inclusive experience for all attendees,
        speakers, organizers, and volunteers. Harassment or discrimination of any kind will not be
        tolerated.
      </p>
      <h2 className="font-headline-md text-headline-md text-secondary">Expected behavior</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Be respectful and considerate in your words and actions.</li>
        <li>Welcome newcomers and help others feel included.</li>
        <li>Give and accept constructive feedback gracefully.</li>
        <li>Respect personal boundaries and privacy.</li>
      </ul>
      <h2 className="font-headline-md text-headline-md text-secondary">Unacceptable behavior</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Harassment, intimidation, or discriminatory language.</li>
        <li>Unwelcome sexual attention or advances.</li>
        <li>Disrupting talks, sessions, or community spaces.</li>
        <li>Sharing private information without consent.</li>
      </ul>
      <p>
        If you experience or witness unacceptable behavior, please contact our team through the
        Support page. All reports will be reviewed promptly and handled with discretion.
      </p>
    </ContentPage>
  );
}
