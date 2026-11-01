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
    return (
        <img
            src={src}
            alt={alt}
            loading={loading}
            decoding={decoding}
            className={combineClasses(className, 'transition-transform duration-300')}
        />
    );
}
