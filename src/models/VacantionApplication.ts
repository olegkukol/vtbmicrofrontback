import StageOfApproving from './StageOfApproving';
import Stream from './Stream';
import Team from './Team';
import Employee from './Employee';

interface VacantionApplication {
  employee?: Employee;
  employeeId: string;
  startDate: Date;
  endDate: Date;
  substituteEmployeeId?: string;
  headOfDepartmentId?: string;
  teamId: string;
  team?: Team;
  stream?: Stream;
  streamId: string;
  status: 'APPROVED' | 'ACTIVE';
  stages?: StageOfApproving[];
  approver?: Employee;
  approverId: string;
}

export default VacantionApplication;
