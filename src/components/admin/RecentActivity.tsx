import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useActivity } from "@/hooks/useActivity";
import { formatDistanceToNow } from "date-fns";

export default function RecentActivity() {
  const { activities, loading } = useActivity(5);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return "👤";
      case "vehicle":
        return "🚗";
      case "content":
        return "📄";
      case "transaction":
        return "💰";
      default:
        return "ℹ️";
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "user":
        return "bg-blue-100 text-blue-800";
      case "vehicle":
        return "bg-green-100 text-green-800";
      case "content":
        return "bg-purple-100 text-purple-800";
      case "transaction":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-4 text-gray-600">Loading...</div>
        ) : activities.length === 0 ? (
          <div className="text-center py-4 text-gray-600">
            No recent activity
          </div>
        ) : (
          activities.map((activity: any) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                {getActivityIcon(activity.entity_type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    className={getActivityColor(activity.entity_type)}
                    variant="secondary"
                  >
                    {activity.entity_type}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(activity.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="text-sm">
                  <span className="font-medium">
                    {activity.user?.full_name || "Unknown User"}
                  </span>{" "}
                  {activity.action}
                </p>
                {activity.details && (
                  <p className="text-sm text-gray-600 mt-1">
                    {JSON.stringify(activity.details)}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
