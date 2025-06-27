import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { currentUsage } from "@/lib/constant";

export default function CurrentUsageSection({
  usagePercentage,
}: {
  usagePercentage: number;
}) {
  return (
    <>
      {" "}
      <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Current Usage
            </h3>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
            >
              {currentUsage.plan}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Token Usage */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tokens used this month
              </span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {currentUsage.tokensUsed.toLocaleString()} /{" "}
                {currentUsage.tokensLimit.toLocaleString()}
              </span>
            </div>
            <Progress
              value={usagePercentage}
              className="h-2 bg-gray-200 dark:bg-gray-700"
            />
          </div>

          {/* Usage Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Tokens reset on
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentUsage.resetDate}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Messages sent
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentUsage.messagesSent}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
