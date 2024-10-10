export interface Video {
    id: string;
    title: string;
    description: string;
    status: string;
    views?: number;
    timeAgo?: string; 
    video_player: string;
    video_hls: string;
    width: number;
    height: number;
    storage_size: number;
    length: number;
    thumbnail: string;
    playable: boolean;
    [key: string]: any;
  }