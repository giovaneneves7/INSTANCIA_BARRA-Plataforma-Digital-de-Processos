import { ProcessRepository } from '../repositories/ProcessRepository';
import type { ActivityInput } from '../models/ActivityInput';
import type { ProcessInput } from '../models/ProcessInput';
import type { ProcessPayload } from '../models/ProcessPayload';
import { supabase } from '../../../../api/SupabaseClient';

/*
* @author Giovane Neves
*/
export const ProcessService = {

	async createActivity(activity: ActivityInput){
		return await ProcessRepository.createActivity(activity);
	},

	async createProcess(input: ProcessInput) {
	  let image_url = "";
	  let sheet_image_url = "";

	  if (input.image) {
	    const fileName = `${crypto.randomUUID()}-${input.image.name}`;
	    const { error } = await supabase.storage
	      .from("processes")
	      .upload(fileName, input.image);

	    if (error) throw error;

	    const { data } = supabase.storage.from("processes").getPublicUrl(fileName);
	    image_url = data.publicUrl;
	  }

	  if(input.sheetImage){

		const sheetFileName = `${crypto.randomUUID()}-${input.sheetImage.name}`;
		const { error } = await supabase.storage
			.from("processes")
			.upload(sheetFileName, input.sheetImage);

		if(error) throw error;
		const { data } = supabase.storage.from("processes").getPublicUrl(sheetFileName);
	    sheet_image_url = data.publicUrl;

	  }

	  const payload: ProcessPayload = {
	  	  sector_id: input.sector_id,
		  name: input.name,
		  resume: input.resume,
		  file_name: input.file_name,
		  file_url: input.file_url,
		  responsible_person: input.responsible_person,
		  laws: input.laws,
		  image_url: image_url,
		  sheet_image_url: sheet_image_url,
	  };

	  return await ProcessRepository.createProcess(payload);
	},

	async createSector(name: string, secretariatId: number) {
	  return await ProcessRepository.createSector(name, secretariatId);
	},
	
	async createSecretariat(name: string){

		return await ProcessRepository.createSecretariat(name);
	
	},

	async deleteActivityById(id: number){
		
		return await ProcessRepository.deleteActivityById(id);
	
	},

	async deleteProcessById(id: number){

		return await ProcessRepository.deleteProcessById(id);

	},

	async deleteSecretariatById(id: number){
	
		return await ProcessRepository.deleteSecretariatById(id);
	
	},

	async deleteSectorById(id: number){

		return await ProcessRepository.deleteSectorById(id);

	},

	async listAllActivities(){

		return await ProcessRepository.getAllActivities(); 

	},

	async listAllSectors(){

		return await ProcessRepository.getAllSectors();

	},

	async listAllProcesses(){
		return await ProcessRepository.getAllProcesses();
	},

	async listAllSecretariats(){

		return await ProcessRepository.getAll();

	},

	async listSectorsBySecretariatId(secretariatId: number){

		return await ProcessRepository.getSectorsBySecretariatId(secretariatId);

	},

	async listProcessesBySectorId(sectorId: number){

		return await ProcessRepository.getProcessesBySectorId(sectorId);

	},

	async getActivityById(id: number){

		return await ProcessRepository.getActivityById(id);

	},

	async getProcessById(id: number){

		return await ProcessRepository.getProcessById(id);

	},

	async getActivitiesByProcessId(processId: number){
		
		return await ProcessRepository.getActivitiesByProcessId(processId);
	
	},

	async updateSecretariat(id: number, data: Partial<{ name: string }>) {

		return await ProcessRepository.updateSecretariat(id, data);

	},

	async updateSector(id: number, data: Partial<{ name: string; secretariat_id: number }>) {

		return await ProcessRepository.updateSector(id, data);

	},

	async updateProcess(id: number, data: Partial<{ id: number, name: string; sector_id: number }>) {

		return await ProcessRepository.updateProcess(id, data);

	},

	async updateActivity(
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
	) {

		return await ProcessRepository.updateActivity(id, data);
		
	},

};