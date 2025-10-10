// components/TemplateCard.tsx
"use client";

interface TemplateCardProps {
  name: string;
  thumbnail: string;
  onClick: () => void;
}

export default function TemplateCard({ name, thumbnail, onClick }: TemplateCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl shadow-sm hover:shadow-md border border-gray-200 transition p-4 flex flex-col items-center"
    >
      <img src={thumbnail} alt={name} className="rounded-md mb-3 w-full h-40 object-cover" />
      <h2 className="font-semibold text-black text-lg">{name}</h2>
    </div>
  );
}
