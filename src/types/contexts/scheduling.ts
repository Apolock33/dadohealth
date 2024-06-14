type SchedulingContextType = {
    createSchedule: (uid:string, form: any) => any;
    readScheduleList: () => any;
    readScheduleById: (id: string) => any;
    updateSchedule: (id: string, form: any) => any;
    removeSchedule: (id: string) => any;
}