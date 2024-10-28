export interface DataSlice {
  //properties
  eventDate: Date;
  //methods
  getEventDate: () => string;
  getEventTime: () => string;
  setEventDate: (parcialDate: string) => void;
  setEventTime: (time: string) => void;
}
