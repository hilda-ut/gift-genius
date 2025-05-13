"use client"

import { useState } from "react";
import { Toaster } from "sonner";
import {
  CircleCheckBig,
  Gift,
  Info,
  LoaderCircle,
  RefreshCw,
  TriangleAlert,
} from "lucide-react";
import { GiftForm } from "@components/GiftForm";
import { GiftIdea } from "./_types/giftIdea";
import GiftCard from "./_components/gift-card/GiftCard";
import { getAIGiftSuggestions } from "./_utils/aiGiftService";

const Index = () => {
  const [giftSuggestions, setGiftSuggestions] = useState<GiftIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [criteria, setCriteria] = useState<{
    age: string;
    interests: string;
    relationship: string;
    priceRange: number[];
  } | null>(null);

  const handleSubmit = async(
    age: string,
    interests: string,
    relationship: string,
    priceRange: number[]
  ): Promise<void> => {
    setIsLoading(true);

    try {
      const suggestions = await getAIGiftSuggestions(
        age,
        interests,
        relationship,
        priceRange,
      );

      setGiftSuggestions(suggestions);
      setCriteria({
        age,
        interests,
        relationship,
        priceRange
      });
    } catch (error) {
      console.error("Error getting gift suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = (): void => {
    if (!criteria) return;

    handleSubmit(
      criteria.age,
      criteria.interests,
      criteria.relationship,
      criteria.priceRange
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-100 to-purple-50 px-4 py-12">
      <Toaster
        icons={{
          success: <CircleCheckBig color="#0eaf46" />,
          info: <TriangleAlert color="orange" />,
          warning: <Info color="red" />,
          error: <Info color="red" />,
          loading: <LoaderCircle color="blue" />,
        }}
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Gift className="h-12 w-12 text-purple-400 animate-float" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Gift Genuis
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover AI-powered gift suggestions for everyone in your life based on their age, interests, and your relationship.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <GiftForm handleSubmit={handleSubmit} />
          </div>

          <div className="lg:col-span-2">
            {giftSuggestions?.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">AI Gift Suggestions</h2>
                  <button
                    onClick={handleRefresh}
                    className="inline-flex items-center group bg-white rounded py-2 px-4 border border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white"
                    disabled={isLoading}
                  >
                    <RefreshCw className="h-4 w-4 mr-2 text-purple-700 group-hover:text-white" />
                    New Ideas
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {giftSuggestions?.map((gift) => (
                    <GiftCard
                      key={gift.name}
                      gift={gift}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center p-10 rounded-xl bg-purple-100 border border-purple-200">
                {
                  isLoading ? (
                    <p>Loading</p>
                  ) :
                <div className="text-center">
                  <Gift className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Looking for AI gift ideas?</h3>
                  <p className="text-gray-500">
                    Fill out the form with details about the recipient to get personalized AI gift suggestions.
                  </p>
                </div>
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
