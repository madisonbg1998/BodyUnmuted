// Ported verbatim from BU APP's src/lib/tool.ts.
import type { PhaseTypeId } from './types';

export interface ActiveTool {
  mode: 'select' | 'paint';
  typeId: PhaseTypeId;
  label: string;
  color: string;
  border: string;
  text: string;
}

export const SELECT_TOOL: ActiveTool = {
  mode: 'select',
  typeId: 'custom',
  label: '',
  color: '',
  border: '',
  text: '',
};
