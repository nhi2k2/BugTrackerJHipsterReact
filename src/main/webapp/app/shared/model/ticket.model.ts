import dayjs from 'dayjs';
import { IProject } from 'app/shared/model/project.model';
import { IUser } from 'app/shared/model/user.model';
import { ILabel } from 'app/shared/model/label.model';

export interface ITicket {
  id?: number;
  title?: string;
  description?: string | null;
  dueDate?: string | null;
  done?: boolean | null;
  project?: IProject | null;
  assignedTo?: IUser | null;
  labels?: ILabel[] | null;
}

export const defaultValue: Readonly<ITicket> = {
  done: false,
};
