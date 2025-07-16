import {BASE_IMAGE_URL} from "@/app/constants/imageBase";

/** 전체 이미지 URL을 반환 */
export const getImageUrl = (path: string) => `${BASE_IMAGE_URL}${path}`;
