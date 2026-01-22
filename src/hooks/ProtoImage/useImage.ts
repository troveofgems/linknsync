"use client";
import { useState, useCallback } from 'react';
import JiufenImgPlaceholder from "@/public/images/pexels-marek-piwnicki-3907296-27852891.jpg";
import {StaticImageData} from "next/image";

interface UserInputImage {
    imageData?: StaticImageData | File | string | null;
    base64?: string | null;
    showPlaceholder: boolean;
}

interface UseFileToBase64Return {
    base64String: string | null;
    isLoading: boolean;
    convertFileToBase64: (file: File) => void;
    error?: { name?: string[]; fileOverLimit?: boolean; limitSizeInMB?: number } | null;
}

interface ProtoImageProps {
    defaults: {
        imageData?: StaticImageData | File | string | null;
        base64String?: string | null;
        showPlaceholder: boolean;
    },
    userInputs: {
        imageData?: StaticImageData | File | string | null;
        base64String?: string | null;
        showPlaceholder: boolean;
    }
}

const MAX_IMAGE_SIZE_IN_MB: number = 5;

export const useFileToBase64 = (): UseFileToBase64Return => {
    const
        [base64String, setBase64String] = useState<string | null>(null),
        [isLoading, setIsLoading] = useState(false),
        [error, setError] = useState<{ name?: string[]; fileOverLimit?: boolean; limitSizeInMB?: number } | null>(null);

    const convertFileToBase64 = useCallback((file: File) => {
        setIsLoading(true);
        setError(null);

        const fileSizeInMB = (file?.size * 0.000001) || 0;

        if(fileSizeInMB > MAX_IMAGE_SIZE_IN_MB) {
            setError(({
                    name: [`Image Size Must Be Less Than ${MAX_IMAGE_SIZE_IN_MB} MB`],
                    fileOverLimit: true,
                    limitSizeInMB: MAX_IMAGE_SIZE_IN_MB
            }));
            setIsLoading(false);
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener("load", async () => {
            setIsLoading(false);
            setBase64String(reader.result as string);
        });
    }, []);

    return {
        base64String,
        isLoading,
        error,
        convertFileToBase64
    }
}

export const useImageUploader = (
    initialImage?: Partial<UserInputImage>
) => {
    const
        [image, setImage] = useState<ProtoImageProps>({
            defaults: {
                imageData: JiufenImgPlaceholder.src,
                base64String: null,
                showPlaceholder: true
            },
            userInputs: {
                imageData: null,
                base64String: null,
                showPlaceholder: true,
                ...initialImage
            }
        });

    const handleImagePrefillWithData = (
        image: UserInputImage
    ) => {
        setImage(prev => ({
            ...prev,
            ["userInputs"]: {
                ...prev.userInputs,
                imageData: image.imageData,
                base64: null,
                showPlaceholder: false
            }
        }));
    }

    return {
        image,
        handleImagePrefillWithData
    }
}