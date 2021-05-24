import Employee from './Employee';

interface StageOfApproving {
  id: string;
  approved: boolean;
  order: number;
  vacantionAppliationId: string;
  approverId: string;
  Approver: Employee;
}

export default StageOfApproving;
