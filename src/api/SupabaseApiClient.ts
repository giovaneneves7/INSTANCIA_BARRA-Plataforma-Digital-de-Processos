import { SupabaseClient } from '@supabase/supabase-js';

/*
* @author Giovane Neves
*/
export class SupabaseApiClient {
  private client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.client = client;
  }

  async getData(table: string, filters?: Record<string, any>) {
    let query = this.client.from(table).select('*');

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
      }
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }

  async postData(table: string, body: Record<string, any>) {
    const { data, error } = await this.client.from(table).insert(body).select();

    if (error) throw error;
    if (!data || data.length === 0) {
      throw new Error('Erro ao inserir dados. Resposta vazia.');
    }

    return data;
  }

  async putData(table: string, body: Record<string, any>, filters: Record<string, any>) {
    let query = this.client.from(table).update(body);

    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }

  async deleteData(table: string, filters: Record<string, any>) {
    let query = this.client.from(table).delete();

    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }
}
