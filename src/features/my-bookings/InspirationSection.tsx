import { useNavigate } from 'react-router-dom';
import { Button } from '@/ui';
import { ArrowRight } from 'lucide-react';

export default function InspirationSection() {
  const navigate = useNavigate();
  return (
    <section className="bg-surface-container-high gap-gutter border-primary/20 group relative my-24 flex w-[80%] flex-col items-center overflow-hidden rounded-xl border p-12 text-center">
      <h2 className="font-display-lg text-tertiary text-display-lg">Want more inspiration?</h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
        Our community is constantly creating new ways to connect. Don't miss out on the next big
        tech hangout or creative workshop.
      </p>
      <Button
        className="font-bold transition-all duration-300 hover:scale-105 active:scale-95"
        BtnText="Explore More Events"
        onClick={() => navigate('/')}
        size="lg"
        iconLeft={<ArrowRight size={25} />}
      />

      <div className="bg-primary/20 group-hover:bg-primary/30 absolute -top-24 -right-24 h-96 w-96 rounded-full blur-[100px] transition-all duration-700"></div>
      <div className="bg-till/20 group-hover:bg-till/30 absolute -bottom-24 -left-24 h-64 w-64 rounded-full blur-[80px] transition-all duration-700"></div>
    </section>
  );
}
