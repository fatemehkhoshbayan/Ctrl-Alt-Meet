import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts';
import { Events, MyBooking, Speakers, EventDetails, Registration } from '@/pages';
import { ErrorState } from '@/shared';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />} errorElement={<ErrorState />}>
        <Route path="/" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/my-booking" element={<MyBooking />} />
        <Route path="/speakers" element={<Speakers />} />
        <Route path="/registration" element={<Registration />} />
      </Route>
    </Routes>
  );
}

export default App;
