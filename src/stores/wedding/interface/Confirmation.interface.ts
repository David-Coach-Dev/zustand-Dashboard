export interface ConfirmationSlice {
  //properties
  isConfirmed: boolean
  //methods
  setIsConfirmed: (confirmation: boolean) => void
  getIsConfirmed: () => boolean
}
