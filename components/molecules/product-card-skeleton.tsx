export default function ProductCardSkeleton() {
  return (
    <div className="w-full bg-gray-50 rounded-md p-2 flex flex-col gap-3 relative animate-pulse">
      <div className="top-2 absolute z-10 bg-gray-200 right-2 w-12 h-8 rounded-l-lg" />

      <div className="w-full h-[150px] bg-gray-200 rounded-lg" />

      <div className="w-full space-y-3">
        <div className="h-4 w-3/4 bg-gray-200 rounded" />

        <div className="flex justify-between items-center">
          <div className="h-7 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-12 bg-gray-200 rounded-md" />
          <div className="h-6 w-16 bg-gray-200 rounded-md" />
          <div className="h-6 w-14 bg-gray-200 rounded-md" />
        </div>
      </div>

      <div className="h-11 w-full bg-gray-300 rounded-md" />
    </div>
  );
}
