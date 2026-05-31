import { useState } from 'react';
import { SearchBar } from '@/ui';
import { useAppDispatch } from '@/store/hooks';
import { setFilters } from '@/store/events';

export default function HeroSection() {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearch() {
    dispatch(setFilters({ searchQuery }));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSearch();
  }

  return (
    <section className="relative w-full overflow-hidden py-32">
      <div aria-hidden className="hero-glow" />
      <div className="relative z-10">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-stack-gutter">
            <span className="hero-badge font-body text-label-md inline-block rounded-full px-4 py-1 tracking-wider uppercase">
              Happy Hour for Builders
            </span>
            <h1 className="hero-title font-display text-display-lg mx-auto max-w-3xl leading-tight">
              Where <span className="scribble-accent">Innovation</span> Meets High-Fives.
            </h1>
            <p className="font-body text-body-xl text-on-surface-variant mx-auto max-w-2xl">
              Join thousands of creators, engineers, and dreamers. Discover tech conferences that
              feel like home.
            </p>
          </div>
          <SearchBar
            icon="search"
            placeholder="Find your next obsession..."
            value={searchQuery}
            onChange={setSearchQuery}
            onKeyDown={handleKeyDown}
            buttonOnClick={handleSearch}
          />
        </div>
      </div>
      <div className="hero-blur-primary absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl" />
      <div className="hero-blur-secondary absolute top-1/2 -left-24 h-64 w-64 rounded-full blur-3xl" />
    </section>
  );
}
