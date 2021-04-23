import Skill from './Skill';
import VacantionPlan from './VacantionPlan';

interface Employee {
  streamId: string;
  teamId: string;
  fio: string;
  position: string;
  role: string;
  type: string;
  skills: Skill[];
  vacantionPlan: VacantionPlan;
}

export default Employee;
