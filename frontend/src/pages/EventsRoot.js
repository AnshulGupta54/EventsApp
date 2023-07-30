import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";

const EventsRoot=()=>{
    return (
        <div>
            <EventsNavigation />
            <Outlet />
        </div>
    );
}

export default EventsRoot;