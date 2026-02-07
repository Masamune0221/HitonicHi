
export interface DairyRequest {
    content: string;
}

export interface DairyResponse {
    content: string;
    ai_response: string;
    created_at: string;
    updated_at: string;
}

export interface TodayResponse {
    isToday: boolean;
}