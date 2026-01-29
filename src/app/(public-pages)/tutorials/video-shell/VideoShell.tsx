import Video from 'next-video';
import lnsPoster from '@/public/videos/lns-poster.mp4.json';
import type {Asset} from "../../../../../node_modules/next-video/dist/assets.d.ts";

export const VideoShell = ({}) => (
    <Video src={lnsPoster as Asset} />
);