'use client';

import React,
{
  useEffect,
  useState,
} from 'react';
import { Slider } from 'radix-ui';
import { Gift } from 'lucide-react';
import { relationships } from '@/lib/relationships';
import type { Country } from '@/types/country';
import { mapToCountry } from '@/lib/country-name-map';
import Input from '../ui/Input';
import Label from '../ui/Label';
import Button from '../ui/Button';

interface Props {
  handleSubmit: (
    age: string,
    interests: string,
    relationship: string,
    priceRange: number[],
    country: Country
  ) => void;
}

export const GiftForm: React.FC<Props> = ({
  handleSubmit,
}: Props) => {
  const [age, setAge] = useState('');
  const [interests, setInterests] = useState('');
  const [relationship, setRelationship] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([20, 80]);
  const [country, setCountry] = useState<Country>('US');

  const getUserCountry = async (): Promise<Country> => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`,
            );
            const data = await response.json();
            const country = mapToCountry(data.countryName);
            resolve(country);
          } catch {
            resolve('US');
          }
        },
        () => resolve('US'),
        { timeout: 5000 },
      );
    });
  };

  useEffect(() => {
    getUserCountry().then(setCountry);
  }, []);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit(
      age,
      interests,
      relationship,
      priceRange,
      country,
    );
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-4">
        <Gift className="h-8 w-8 text-purple-400 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Find the Perfect Gift</h2>
      </div>

      <div className="space-y-4">
        <Label htmlFor="age">Recipient&apos;s Age</Label>
        <Input
          id="age"
          type="number"
          placeholder="e.g., 25"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      <div className='space-y-4'>
        <Label htmlFor="interests">Their Interests</Label>
        <Input
          id="interests"
          type="text"
          placeholder="Interests (comma separated)"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />
      </div>

      <div className='space-y-4'>
        <Label htmlFor="relationship">Your Relationship</Label>
        <select
          value={relationship}
          className="w-full p-2 text-sm font-medium border rounded my-2 border-purple-300 focus:border-purple-400"
          onChange={(e) => setRelationship(e.target.value)}
        >
          <option value="">Select Relationship</option>
          {
            relationships.map(rel => (
              <option
                value={rel}
                key={rel}
              >
                {rel}
              </option>
            ))
          }
        </select>
      </div>
      <div className='space-y-4'>
        <div className="flex justify-between items-center">
          <Label htmlFor="price-range">Price Range</Label>
          <span className="text-sm font-medium text-gray-700">${priceRange[0]} - ${priceRange[1]}</span>
        </div>
        <Slider.Root
          className="relative flex items-center w-full h-5"
          value={priceRange}
          max={1000}
          step={10}
          onValueChange={setPriceRange}
        >
          <Slider.Track className="bg-purple-200 relative grow h-2 rounded-full">
            <Slider.Range className="absolute bg-purple-500 h-full rounded-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-4 h-4 bg-purple-600 rounded-full" />
          <Slider.Thumb className="block w-4 h-4 bg-purple-600 rounded-full" />
        </Slider.Root>
      </div>
      <Button
        type="submit"
        className="w-full"
      >
        Get Gift Suggestions
      </Button>
    </form>
  );
};
