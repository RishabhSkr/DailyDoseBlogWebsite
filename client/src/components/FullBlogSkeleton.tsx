import { Circle } from "./BlogCards"

export const FullBlogSkeleton = () => {
    return <div role="status" className="animate-pulse">
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    {/* Title skeleton */}
                    <div className="h-14 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
                    
                    {/* Date skeleton */}
                    <div className="h-4 bg-gray-200 rounded-full w-48 mb-8"></div>
                    
                    {/* Content skeleton - multiple lines */}
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
                    </div>
                </div>
                
                <div className="col-span-4">
                    {/* Author section skeleton */}
                    <div className="h-6 bg-gray-200 rounded-full w-20 mb-4"></div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Circle />
                        </div>
                        <div className="flex-1">
                            <div className="h-6 bg-gray-200 rounded-full w-32 mb-3"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                                <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <span className="sr-only">Loading...</span>
    </div>
}