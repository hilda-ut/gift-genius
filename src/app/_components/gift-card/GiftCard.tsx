
import Image from 'next/image';
import { ExternalLink } from "lucide-react";
import { GiftIdea } from '@/_types/giftIdea';
import { CardContent } from './CardContent';
import { CardDescription } from './CardDescription';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';
import { CardTitle } from './CardTitle';

interface GiftCardProps {
  gift: GiftIdea;
}

const GiftCard = ({ gift }: GiftCardProps) => {
  return (
    <div className="overflow-hidden animate-pop bg-white border border-purple-200 hover:shadow-md transition-shadow rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="aspect-video overflow-hidden relative">
        <Image
          fill
          src={gift.imageUrl}
          alt={gift.name}
          className="w-full h-full object-cover transition-transform hover:scale-110"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{gift.name}</CardTitle>
        </div>
        <CardDescription>{gift.priceRange}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700">{gift.description}</p>
      </CardContent>
      <CardFooter>
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(gift.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs flex items-center text-purple-700 hover:underline"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          Find Online
        </a>
      </CardFooter>
    </div>
  );
};

export default GiftCard;