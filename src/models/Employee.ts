import Skill from './Skill';
import VacantionPlan from './VacantionPlan';
import Team from './Team';
import Stream from './Stream';

interface Employee {
  id: string;
  fio: string;
  position: string;
  role: 'HEAD_OF_DEPARTMENT' | 'HEAD_OF_STREAM' | 'HEAD_OF_TEAM' | 'EMPLOYEE';
  type: 'INTERNAL' | 'OUTSTAFF';
  username: string;
  password: string;
  skills?: Skill[];
  vacantionPlan?: VacantionPlan;
  Team?: Team;
  Stream?: Stream;
  streamId: string | null;
  teamId: string | null;
}

export default Employee;
