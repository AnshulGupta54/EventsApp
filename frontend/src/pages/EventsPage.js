import { Await, defer, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense
      fallback={<p style={{ textAlign: "center" }}>Loading Events...</p>}
    >
      <Await resolve={events}>
        {(loadedEvents) =><EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function eventsLoader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: eventsLoader(),
  });
}