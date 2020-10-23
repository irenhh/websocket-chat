export type User = {
  id: string;
  name: string;
  room: string;
}

export type Message = {
  id: number;
  user: string;
  text: string;
}
