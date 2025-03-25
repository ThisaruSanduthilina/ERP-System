import { API_CONFIG, buildUrl, getAuthHeader } from '@/config/api';

export interface Document {
  id?: number; // Make id optional since we don't have it when creating a new document
  customer_id: number;
  file_name: string;
  file_path: string;
  uploaded_at: string;
}

export const getDocuments = async (skip: number = 0, limit: number = 100): Promise<Document[]> => {
  try {
    console.log('Fetching documents');
    
    const response = await fetch(
      buildUrl(`/documents/?skip=${skip}&limit=${limit}`),
      {
        headers: {
          'Authorization': getAuthHeader(),
          ...API_CONFIG.headers,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch documents (Status: ${response.status})`);
    }

    const data = await response.json();
    console.log('Successfully fetched documents:', data);
    return data;
  } catch (error) {
    console.error('Fetch documents error:', error);
    throw error;
  }
};

export const createDocument = async (documentData: Document): Promise<Document> => {
  try {
    console.log('Creating document with data:', documentData);
    
    const response = await fetch(buildUrl('/documents/'), {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        ...API_CONFIG.headers,
      },
      body: JSON.stringify(documentData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create document (Status: ${response.status})`);
    }

    const data = await response.json();
    console.log('Successfully created document:', data);
    return data;
  } catch (error) {
    console.error('Create document error:', error);
    throw error;
  }
};