export interface Note{
  id: string;
  description: string;
}

export const createNote = (id: string,description: string): Note => ({
    id,
    description
    });
