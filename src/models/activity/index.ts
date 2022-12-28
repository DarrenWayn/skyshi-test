export type TActivity = {
  id: number;
  title: string;
  email: string;
};

export type TResponseActivity = {
  total: number;
  limit: string;
  skip: number;
  data: TActivity[];
};
