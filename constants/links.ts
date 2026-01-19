export const SITE_BASE_URL = 'https://shankarmaharaj-dhankawadi.com';
export const ROOMS_BASE_URL = `${SITE_BASE_URL}/rooms`;
export const ROOMS_NEW_PATH = '/rooms/new';
export const ROOMS_LIST_PATH = '/rooms';

export const roomUrl = (roomId: string | number) => `${ROOMS_BASE_URL}/${roomId}`;
export const roomsPathUrl = (path: string) => `${SITE_BASE_URL}${path}`;
