export interface Todo {
  id?: string;
  title: string;
  description: string;
  dueDate: string;
  priorityLevel: string;
  status?: string;
  // status?: 'todo'| 'pending'| 'completed'
  //  (low, medium, high).
}

// export enum LocationType {
//   CONDO = 'CONDO',
//   MALL = 'MALL',
//   STATION = 'STATION'
// }