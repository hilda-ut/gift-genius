import { ExternalLink } from 'lucide-react';
import { CardContent } from './CardContent';
import { CardDescription } from './CardDescription';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';
import { CardTitle } from './CardTitle';
import { GiftIdea } from '@types/gift-idea';

interface GiftCardProps {
  gift: GiftIdea;
}

const GiftCard = ({ gift }: GiftCardProps) => {
  return (
    <div className="overflow-hidden flex flex-col justify-between animate-pop bg-white border-purple-200 hover:shadow-lg transition-shadow rounded-lg border shadow-sm">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img src={gift.imageUrl} alt={gift.name} className="w-full h-auto hover:scale-110" />
        {gift.category && (
          <span className="absolute top-2 left-2 bg-purple-200 text-purple-700 text-xs px-2 py-1 rounded shadow">
            {gift.category}
          </span>
        )}
      </div>
      <CardHeader>
        <CardTitle>{gift.name}</CardTitle>
        <CardDescription>{gift.priceRange}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700">{gift.description}</p>
      </CardContent>
      <CardFooter>
        <a
          href={gift.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs flex items-center text-purple-700 hover:underline"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          View Product
        </a>
      </CardFooter>
    </div>
  );
};

export default GiftCard;