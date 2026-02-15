
export interface DairyRequest {
    content: string;
}

export interface AiResponse {
    content: string;
    character_name: string;
    character_tone: string;
}

export interface DairyResponse {
    content: string;
    ai_response: AiResponse;
    created_at: string;
    updated_at: string;
}

export interface TodayResponse {
    isToday: boolean;
}