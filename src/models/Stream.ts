import Employee from './Employee';

interface Stream {
  id: string;
  name: string;
  headOfDepartmentId: string;
  headOfDepartment?: Employee;
  streamLeaderId: string;
  streamLeader?: Employee;
}

export default Stream;
