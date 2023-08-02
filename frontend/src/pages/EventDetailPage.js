import { Await, defer, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";
import { authToken } from "../util/Auth";


const EventDetailPage=()=>{
    const {event,events}= useRouteLoaderData('event-detail');

    return <>
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading event</p>}>
    <Await resolve={event}> 
    {(loadedEvent)=><EventItem event={loadedEvent}  />} 
    </Await>
    </Suspense>
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading events</p>}>
    <Await resolve={events}>
    {(loadedEvents)=><EventsList events={loadedEvents}  />} 
    </Await>
    </Suspense>
    </>


}

export default EventDetailPage;

async function eventLoader(id){

    const response= await fetch('http://localhost:8080/events/'+ id );
    if(!response.ok){

    }
    else{
        const resData = await response.json();
        return resData.event;
    }
}

async function eventsLoader() {
    const response = await fetch("http://localhost:8080/events");
  
    if (!response.ok) {
    } else {
      const resData = await response.json();
      return resData.events;
    }
  }

export async function loader({params}){
    const id=params.eventId;

    return defer({
        event: await eventLoader(id),
        events: eventsLoader()
    });

}




export async function action({request,params}){
    const id=params.eventId;
    const token=authToken();
    const response= await fetch('http://localhost:8080/events/' +id,{
        method: request.method,
        headers:{
            'Authorization': 'Bearer '+ token
        }
    });

    if(!response.ok){

    }
    return redirect('/events');

}