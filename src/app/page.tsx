import Carousel from "~/components/carousel/Carousel";
import ActionMoviesSection from "~/components/genre/ActionMoviesSection";
import ComedyMoviesSection from "~/components/genre/ComedyMovieSection";
import DramaMoviesSection from "~/components/genre/DramaMoviesSection";
import HorrorMoviesSection from "~/components/genre/HorrorMovieSection";
import SciFiMoviesSection from "~/components/genre/SciFiMoviesSection";

export default function Home() {
  return (
    <main className="pt-20 px-4 sm:px-8  bg-gray-950">
      <Carousel />
      <ActionMoviesSection />
      <ComedyMoviesSection />
      <DramaMoviesSection />
      <HorrorMoviesSection />
      <SciFiMoviesSection />
    </main>
  );
}
