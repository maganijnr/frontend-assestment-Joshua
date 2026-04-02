import MaxWidthWrapper from "./max-width-wrapper";

export default function ProductDetailSkeleton() {
  return (
    <MaxWidthWrapper className="py-10 animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded-md mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-square relative w-full bg-gray-100 rounded-3xl overflow-hidden border border-gray-200" />

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="relative w-20 h-20 shrink-0 rounded-xl bg-gray-200"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <div className="h-4 w-24 bg-gray-200 rounded" />

            <div className="h-10 w-full bg-gray-200 rounded" />
            <div className="h-10 w-3/4 bg-gray-200 rounded" />

            <div className="flex items-center gap-4">
              <div className="h-8 w-16 bg-gray-200 rounded-full" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="pb-6 border-b border-gray-100 space-y-2">
            <div className="h-10 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
          </div>

          <div className="space-y-4">
            <div className="h-6 w-24 bg-gray-200 rounded" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-50 rounded-2xl w-12 h-12" />
              <div className="space-y-1">
                <div className="h-3 w-12 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>
            </div>
          </div>

          <div className="h-14 w-full bg-gray-300 rounded-xl shadow-lg" />

          <div className="flex flex-wrap gap-2 mt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 w-16 bg-gray-200 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="h-8 w-48 bg-gray-200 rounded mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-gray-100 rounded-2xl space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-3 w-20 bg-gray-200 rounded" />
                </div>
                <div className="h-6 w-10 bg-gray-200 rounded-full" />
              </div>
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
