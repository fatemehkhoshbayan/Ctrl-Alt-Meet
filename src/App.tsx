import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts';
import { Events, MyBooking, Speakers, EventDetails } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/my-booking" element={<MyBooking />} />
        <Route path="/speakers" element={<Speakers />} />
      </Route>
    </Routes>
  );
}

export default App;
