import { useNavigate } from 'react-router-dom';
import { CreateEventForm, CreateEventHeroSection } from '@/features';

export default function CreateEvent() {
  const navigate = useNavigate();

  return (
    <>
      <CreateEventHeroSection />
      <section className="px-margin-mobile mx-auto min-h-[35vh] py-12">
        <CreateEventForm onCancel={() => navigate('/')} />
      </section>
    </>
  );
}
