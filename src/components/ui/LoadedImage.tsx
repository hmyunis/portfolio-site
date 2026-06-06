import { useCallback, useState } from 'react';
import { combineClasses } from '../../utils/styling';

interface LoadedImageProps {
    src: string;
    alt: string;
    className?: string;
    loading?: 'eager' | 'lazy';
    decoding?: 'async' | 'auto' | 'sync';
}

export default function LoadedImage({
    src,
    alt,
    className,
    loading = 'lazy',
    decoding = 'async',
}: LoadedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleImageRef = useCallback((image: HTMLImageElement | null) => {
        if (image?.complete && image.naturalWidth > 0) {
            setIsLoaded(true);
        }
    }, []);

    return (
        <>
            <div
                className={combineClasses(
                    'image-load-shimmer absolute inset-0 transition-opacity duration-300',
                    isLoaded && 'opacity-0'
                )}
                aria-hidden="true"
            />
            <img
                ref={handleImageRef}
                src={src}
                alt={alt}
                loading={loading}
                decoding={decoding}
                onLoad={() => setIsLoaded(true)}
                className={combineClasses(
                    className,
                    'transition-[opacity,transform] duration-500',
                    isLoaded ? 'opacity-100' : 'opacity-0'
                )}
            />
        </>
    );
}
