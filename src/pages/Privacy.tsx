import { ContentPage } from '@/shared';

export default function Privacy() {
  return (
    <ContentPage
      title="Privacy Policy"
      subtitle="How Ctrl Alt Meet collects, uses, and protects your information."
    >
      <p>
        Your privacy matters to us. This policy explains what data we collect when you use Ctrl Alt
        Meet and how we use it to provide event discovery, bookings, and account features.
      </p>
      <h2 className="font-headline-md text-headline-md text-secondary">Information we collect</h2>
      <ul className="gap-stack-gap flex list-disc flex-col pl-6">
        <li>Account details such as your name and email when you register or sign in.</li>
        <li>Booking and favorites data related to events you interact with.</li>
        <li>Basic usage information to improve the platform experience.</li>
      </ul>
      <h2 className="font-headline-md text-headline-md text-secondary">How we use your data</h2>
      <ul className="gap-stack-gap flex list-disc flex-col pl-6">
        <li>To manage your account, bookings, and saved favorites.</li>
        <li>To communicate important updates about events you have registered for.</li>
        <li>To maintain platform security and prevent misuse.</li>
      </ul>
      <h2 className="font-headline-md text-headline-md text-secondary">Your choices</h2>
      <p>
        You can update your profile information at any time from your account settings. If you have
        questions about your data or would like it removed, reach out through our Support page.
      </p>
    </ContentPage>
  );
}
