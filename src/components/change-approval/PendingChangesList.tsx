
import React from 'react';
import { useChangeApproval } from '@/context/ChangeApprovalContext';
import { useAuth } from '@/context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ChangeStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'approved':
      return <Badge variant="outline" className="bg-green-100 text-green-800">Approved</Badge>;
    case 'rejected':
      return <Badge variant="outline" className="bg-red-100 text-red-800">Rejected</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export const PendingChangesList = () => {
  const { pendingChanges, userChanges, loadingChanges, approveChange, rejectChange, refreshChanges } = useChangeApproval();
  const { isAdmin } = useAuth();
  
  const handleApprove = async (changeId: string) => {
    await approveChange(changeId);
  };
  
  const handleReject = async (changeId: string) => {
    const reason = prompt('Please provide a reason for rejection (optional):');
    await rejectChange(changeId, reason || undefined);
  };
  
  const formatTime = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (e) {
      return 'Unknown time';
    }
  };

  const changes = isAdmin ? pendingChanges : userChanges;
  
  if (loadingChanges) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-1/4" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  
  if (changes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Pending Changes</CardTitle>
          <CardDescription>
            {isAdmin 
              ? "There are no changes waiting for approval." 
              : "You haven't submitted any changes yet."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6 text-gray-500">
            <Clock className="mr-2 h-6 w-6" />
            <span>No pending changes found</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => refreshChanges()}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {isAdmin ? "Changes Awaiting Approval" : "Your Submitted Changes"}
        </h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => refreshChanges()}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="border rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Table</TableHead>
              <TableHead>Record ID</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              {isAdmin && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {changes.map((change) => (
              <TableRow key={change.id}>
                <TableCell className="font-medium">{change.table_name}</TableCell>
                <TableCell className="font-mono text-xs">{change.record_id}</TableCell>
                <TableCell>{formatTime(change.submitted_at)}</TableCell>
                <TableCell>
                  <ChangeStatusBadge status={change.status} />
                </TableCell>
                {isAdmin && change.status === 'pending' && (
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600"
                        onClick={() => handleApprove(change.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600"
                        onClick={() => handleReject(change.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                )}
                {(!isAdmin || change.status !== 'pending') && (
                  <TableCell>
                    {change.status === 'rejected' && change.comments && (
                      <div className="flex items-center text-red-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {change.comments}
                      </div>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
