/*
* @author Giovane Neves
*/ 
export type ProcessInput = {
  sector_id: number;
  name: string;
  resume: string;
  file_name: string;
  file_url: string;
  responsible_person: string;
  laws: string;
  image: File | null;
  sheetImage: File | null;
};
