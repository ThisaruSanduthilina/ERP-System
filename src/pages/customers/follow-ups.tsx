import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FollowUpsTable } from "@/components/follow-ups/FollowUpsTable";
import { PhoneCall, Mail, Calendar, Plus } from "lucide-react";
import { useState } from "react";
import { getFollowUps } from "@/services/followUpService";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FollowUpForm } from "@/components/follow-ups/FollowUpForm";

const FollowUpsPage = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isNewFollowUpOpen, setIsNewFollowUpOpen] = useState(false);
  
  const { data: followUps = [] } = useQuery({
    queryKey: ['followUps'],
    queryFn: getFollowUps
  });

  // Calculate counts for each type
  const callsCount = followUps.filter(fu => fu.type === 'Call').length;
  const emailsCount = followUps.filter(fu => fu.type === 'Email').length;
  const meetingsCount = followUps.filter(fu => fu.type === 'Meeting').length;

  // Calculate counts from last week
  const lastWeekDate = new Date();
  lastWeekDate.setDate(lastWeekDate.getDate() - 7);

  const lastWeekCalls = followUps.filter(
    fu => fu.type === 'Call' && new Date(fu.date) < lastWeekDate
  ).length;
  const lastWeekEmails = followUps.filter(
    fu => fu.type === 'Email' && new Date(fu.date) < lastWeekDate
  ).length;
  const lastWeekMeetings = followUps.filter(
    fu => fu.type === 'Meeting' && new Date(fu.date) < lastWeekDate
  ).length;

  const callsDiff = callsCount - lastWeekCalls;
  const emailsDiff = emailsCount - lastWeekEmails;
  const meetingsDiff = meetingsCount - lastWeekMeetings;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-900">Follow-ups</h1>
        <Button onClick={() => setIsNewFollowUpOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Follow-up
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <PhoneCall className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{callsCount}</div>
            <p className="text-xs text-muted-foreground">
              {callsDiff >= 0 ? '+' : ''}{callsDiff} from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emailsCount}</div>
            <p className="text-xs text-muted-foreground">
              {emailsDiff >= 0 ? '+' : ''}{emailsDiff} from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meetingsCount}</div>
            <p className="text-xs text-muted-foreground">
              {meetingsDiff >= 0 ? '+' : ''}{meetingsDiff} from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button 
          variant={selectedType === 'Call' ? 'default' : 'outline'}
          onClick={() => setSelectedType(selectedType === 'Call' ? null : 'Call')}
        >
          <PhoneCall className="mr-2 h-4 w-4" />
          Calls
        </Button>
        <Button 
          variant={selectedType === 'Email' ? 'default' : 'outline'}
          onClick={() => setSelectedType(selectedType === 'Email' ? null : 'Email')}
        >
          <Mail className="mr-2 h-4 w-4" />
          Emails
        </Button>
        <Button 
          variant={selectedType === 'Meeting' ? 'default' : 'outline'}
          onClick={() => setSelectedType(selectedType === 'Meeting' ? null : 'Meeting')}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Meetings
        </Button>
      </div>

      <FollowUpsTable selectedType={selectedType} />

      <Dialog open={isNewFollowUpOpen} onOpenChange={setIsNewFollowUpOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Follow-up</DialogTitle>
          </DialogHeader>
          <FollowUpForm onSuccess={() => setIsNewFollowUpOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FollowUpsPage;