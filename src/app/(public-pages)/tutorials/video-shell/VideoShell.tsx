import Video from 'next-video';
import type {Asset} from "../../../../../node_modules/next-video/dist/assets.d.ts";

export const VideoShell = (
    {
        pageKey,
        sectionLabel,
        src
    }: {
        pageKey: string;
        sectionLabel: string;
        src: Asset;
    }) => {
    return (
        <div key={`${pageKey}-${sectionLabel}_video-shell`}>
            <Video src={src} />
        </div>
    )};