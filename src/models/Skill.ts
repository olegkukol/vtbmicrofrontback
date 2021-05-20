import Employee from './Employee';

interface Skill {
  id: string;
  name: string;
  level: number;
  Employee?: Employee;
  employeeId: string | null;
}

export default Skill;
