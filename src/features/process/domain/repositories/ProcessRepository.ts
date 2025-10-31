import { SupabaseApiClient } from '../../../../api/SupabaseApiClient';
import { supabase } from '../../../../api/SupabaseClient';
import type { ActivityInput } from '../models/ActivityInput';
import type { ProcessPayload } from '../models/ProcessPayload';

const api = new SupabaseApiClient(supabase);

/*
* @author Giovane Neves
*/
export const ProcessRepository = {
  createActivity: async (activity: ActivityInput) => {
    return await api.postData('activities', activity);
  },
  createProcess: async (process: ProcessPayload) => {
    return await api.postData('processes', process);
  },
  createSecretariat: async (name: string) => {
    return await api.postData('secretariats', { name })
  },
  createSector: async (name: string, secretariatId: number) => {
    return await api.postData('sectors', { name, secretariat_id: secretariatId });
  },
  deleteSecretariatById: async (id: number) => {
    return await api.deleteData('secretariats', { id });
  },

  deleteSectorById: async (id: number) => {
    return await api.deleteData('sectors', { id });
  },

  deleteProcessById: async (id: number) => {
    return await api.deleteData('processes', { id });
  },

  deleteActivityById: async (id: number) => {
    return await api.deleteData('activities', { id });
  },
  getAll: async () => {
    return await api.getData('secretariats');
  },
  getAllActivities: async () => {
    return await api.getData('activities');
  },
  getAllProcesses: async () => {
    return await api.getData('processes');
  },
  getAllSectors: async () => {
    return await api.getData('sectors');
  },
  getByNome: async (name: string) => {
    const result = await api.getData('secretariats', { name });
    return result[0];
  },
  getSectorsBySecretariatId: async (id: number) => {
    return await api.getData('sectors', { secretariat_id: id });
  },
  getProcessesBySectorId: async (id: number) => {
    return await api.getData('processes', {sector_id: id});
  },
  getActivityById: async (id: number) => {
    return await api.getData('activities', {id: id});
  },
  getProcessById: async (id: number) => {
    return await api.getData('processes', {id: id});
  },
  getActivitiesByProcessId: async (id: number) => {
    return await api.getData('activities', {process_id: id})
  },
  updateActivity: async (
    id: number,
    data: Partial<{
      name: string;
      description: string;
      laws: string;
      process_id: number;
      order: number;
      responsible_person: string;
      comments: string;
      regulations: string;
      svg_element_id: string;
      documents_folder_url: string;
    }>
  ) => {
    return await api.putData('activities', data, { id });
  },
  updateProcess: async (id: number, data: Partial<{ name: string; sector_id: number }>) => {
    return await api.putData('processes', data, { id });
  },
  updateSecretariat: async (id: number, data: Partial<{ name: string }>) => {
    return await api.putData('secretariats', data, { id });
  },
  updateSector: async (id: number, data: Partial<{ name: string; secretariat_id: number }>) => {
    return await api.putData('sectors', data, { id });
  }, 
};

export default ProcessRepository;