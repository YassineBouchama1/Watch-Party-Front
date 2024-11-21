export interface IRoom {
 
  name: string;
  playList: string[];
}

export interface IRoomFetch extends IRoom {
  _id: string;
}