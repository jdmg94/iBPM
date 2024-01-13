import { humanId } from 'human-id';

export const getReadableId = () => humanId({
  separator: '-',
  capitalize: false,  
});