import Employee from './Employee';
import Stream from './Stream';

interface Team {
  name: string;
  id: string;
  streamId: string;
  stream?: Stream;
  teamLeaderId: string;
  teamLeader?: Employee;
}

export default Team;
