export interface PersonSlice {
  //properties
  firstName: string;
  lastName: string;
  //methods
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}
