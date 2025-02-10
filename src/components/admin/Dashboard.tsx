import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityLogsTable from "./ActivityLogsTable";
import AnalyticsChart from "./AnalyticsChart";
import ReportedContentTable from "./ReportedContentTable";
import SystemSettingsForm from "./SystemSettingsForm";
import EmailTemplateEditor from "./EmailTemplateEditor";
import InviteForm from "./InviteForm";

export default function Dashboard() {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsChart />
          <ActivityLogsTable />
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card className="p-6">
            <InviteForm />
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <ReportedContentTable />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <SystemSettingsForm />
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <EmailTemplateEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}
