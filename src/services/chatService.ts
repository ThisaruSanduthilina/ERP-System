// // chatService.ts
// import { CHAT_API_CONFIG } from '@/config/chatApi';

// interface ChatRequest {
//   query: string;
//   context_data?: {
//     additionalProp1: unknown[];
//     additionalProp2: unknown[];
//     additionalProp3: unknown[];
//   };
// }





// interface ChatResponse {
//   response: string;
// }

// export const sendChatMessage = async (message: string): Promise<string> => {
//   try {
//     const requestBody: ChatRequest = {
//       query: message,
//       context_data: {
//         additionalProp1: [],
//         additionalProp2: [],
//         additionalProp3: []
//       }
//     };

//     const response = await fetch(`${CHAT_API_CONFIG.baseURL}/chat`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//       body: JSON.stringify(requestBody),
//       mode: 'cors',
//       credentials: 'same-origin'
//     });

//     if (!response.ok) {
//       const errorData = await response.text();
//       throw new Error(`Chat API Error: ${response.status} - ${errorData}`);
//     }

//     const data: ChatResponse = await response.json();
//     return data.response;
//   } catch (error) {
//     console.error('Error in chat service:', error);
//     throw error;
//   }
// };

// export const resetChat = async (): Promise<void> => {
//   try {
//     const response = await fetch(`${CHAT_API_CONFIG.baseURL}/chat/reset`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//       mode: 'cors',
//       credentials: 'same-origin'
//     });

//     if (!response.ok) {
//       const errorData = await response.text();
//       throw new Error(`Reset Chat API Error: ${response.status} - ${errorData}`);
//     }
//   } catch (error) {
//     console.error('Error resetting chat:', error);
//     throw error;
//   }
// };

import { CHAT_API_CONFIG } from '@/config/chatApi';

interface ChatRequest {
  query: string;
  context_data?: {
    additionalProp1: Record<string, unknown>[];
    additionalProp2: Record<string, unknown>[];
    additionalProp3: Record<string, unknown>[];
  };
}

interface ChatResponse {
  response: string;
}

export const sendChatMessage = async (message: string): Promise<string> => {
  try {
    const requestBody: ChatRequest = {
      query: message,
      context_data: {
        additionalProp1: [{}], // Adjust as needed
        additionalProp2: [{}],
        additionalProp3: [{}],
      },
    };

    const response = await fetch(`${CHAT_API_CONFIG.baseURL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
      mode: 'cors',
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Chat API Error: ${response.status} - ${errorData}`);
    }

    const data: ChatResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error in chat service:', error);
    throw error;
  }
};

export const resetChat = async (): Promise<void> => {
  try {
    const response = await fetch(`${CHAT_API_CONFIG.baseURL}/chat/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      mode: 'cors',
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Reset Chat API Error: ${response.status} - ${errorData}`);
    }
  } catch (error) {
    console.error('Error resetting chat:', error);
    throw error;
  }
};
