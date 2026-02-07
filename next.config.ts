import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        BASE_URL: "http://localhost:3000",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "thetroveofgems.tech",
                port: "",
                pathname: "/images/**"
            },
            {
                protocol: "https",
                hostname: "img.clerk.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "images.rezfusion.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "pixabay.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "linknsync.app",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "i.ibb.co",
                port: "",
                pathname: "/**"
            }
        ]
    }
};

export default withNextVideo(nextConfig);