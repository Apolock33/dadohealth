import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../contexts/global/globalContext";
import '../../assets/css/scheduling.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import FastSchedule from "../../components/moduleComponents/scheduling/fastSchedule";
import GeneralCanva from "../../components/generalCanva";
import { SchedulingContext } from "../../contexts/scheduling/schedulingContext";

const Scheduling = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [events, setEvents] = useState<any>([]);
  const { readScheduleList } = useContext(SchedulingContext)
  const { mobileOpen } = useContext(GlobalContext);
  const calendarRef = useRef<FullCalendar>(null);

  const fetchEvents = async () => {
    try {
      let arrayEvents = []

      const data = await readScheduleList()
        .then((ev: any) => {
          console.log(ev);
          for(let event of ev) {
            arrayEvents.push({
              title: event.expertise,
              start: event.start,
              end: event.end,
              id: event.id
            })
          }
          setEvents(arrayEvents);
        });

        return data;
    } catch (error) {
      console.error('Error fetching professional list:', error);
    }
  };

  const newEventPopup = () => {
    setVisible(true);
  }

  useEffect(() => {
    fetchEvents();
  }, [])

  return (
    <section>
      <div className={`${mobileOpen ? 'text-center' : 'mt-4'}`}>
        <h1 className='text-6xl font-light title-color text-primary'>Agendamentos</h1>
      </div>
      <div className="mt-3">
        <FullCalendar
          locale={'br'}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          events={events}
          headerToolbar={{
            start: "prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          height={"90vh"}
          selectable
          select={newEventPopup}
        />
      </div>
      <GeneralCanva
        header="Novo Evento"
        open={visible}
        position={'right'}
        style={{ width: '50vw' }}
        onHide={() => { if (!visible) return; setVisible(false); }}
        scape>
        <FastSchedule />
      </GeneralCanva>
    </section>
  );
}

export default Scheduling;