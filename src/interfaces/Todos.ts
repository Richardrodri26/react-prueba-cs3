export interface IToDo {
    id: string
    title: string;
    description: string;
    isCompleted: boolean
  }
  
export type TFilters = 'completed' | 'incompleted' | 'all' | 'search'