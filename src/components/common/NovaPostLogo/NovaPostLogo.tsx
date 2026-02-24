import Image from 'next/image';
import novaPostImage from '@/assets/images/nova-post.png';

interface NovaPostLogoProps {
  width?: number;
  height?: number;
}

export const NovaPostLogo = ({ width = 30, height }: NovaPostLogoProps) => {
  return (
    <Image
      src={novaPostImage}
      alt="Nova Post"
      width={width}
      height={height}
    />
  );
};
