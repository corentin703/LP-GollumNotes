export interface Note{
  Id:string;
  Description:string;
}

export function createNote(Id:string,Description:string): Note {
  return {
    Id,
    Description
    }
}
