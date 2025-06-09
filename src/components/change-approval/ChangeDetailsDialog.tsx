
import React, { useState } from 'react';
import { PendingChange } from '@/types/changeApproval';
import { useChangeApproval } from '@/context/ChangeApprovalContext';
import { formatDistanceToNow } from 'date-fns';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  X
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

interface ChangeDetailsDialogProps {
  change: PendingChange;
  trigger: React.ReactNode;
  onActionComplete?: () => void;
}

export const ChangeDetailsDialog: React.FC<ChangeDetailsDialogProps> = ({
  change,
  trigger,
  onActionComplete
}) => {
  const [open, setOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const { approveChange, rejectChange } = useChangeApproval();

  const formatTime = (timestamp: string | null) => {
    if (!timestamp) return 'N/A';
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (e) {
      return 'Unknown time';
    }
  };

  const handleApprove = async () => {
    const result = await approveChange(change.id);
    if (result) {
      setOpen(false);
      if (onActionComplete) onActionComplete();
    }
  };

  const handleReject = async () => {
    const result = await rejectChange(change.id, rejectReason);
    if (result) {
      setOpen(false);
      setRejectReason('');
      setShowRejectForm(false);
      if (onActionComplete) onActionComplete();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Details</DialogTitle>
          <DialogDescription>
            Submitted {formatTime(change.submitted_at)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Table</h4>
              <p className="text-sm">{change.table_name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Status</h4>
              <div className="mt-1">
                {change.status === 'pending' && (
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                )}
                {change.status === 'approved' && (
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Approved
                  </Badge>
                )}
                {change.status === 'rejected' && (
                  <Badge variant="outline" className="bg-red-100 text-red-800">
                    <XCircle className="h-3 w-3 mr-1" />
                    Rejected
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Record ID</h4>
            <p className="text-sm font-mono">{change.record_id}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Changes</h4>
            <pre className="text-xs p-2 bg-gray-100 rounded overflow-auto max-h-40 mt-1">
              {JSON.stringify(change.changes_json, null, 2)}
            </pre>
          </div>

          {change.reviewed_at && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Reviewed</h4>
              <p className="text-sm">{formatTime(change.reviewed_at)}</p>
            </div>
          )}

          {change.comments && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Comments</h4>
              <p className="text-sm">{change.comments}</p>
            </div>
          )}

          {showRejectForm && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Rejection Reason</h4>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Please provide a reason for rejection (optional)"
                className="mt-1"
              />
            </div>
          )}
        </div>

        <DialogFooter className="flex sm:justify-between">
          {change.status === 'pending' && !showRejectForm && (
            <>
              <Button
                type="button"
                variant="outline"
                className="text-red-600"
                onClick={() => setShowRejectForm(true)}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
              <Button
                type="button"
                className="text-green-600"
                variant="outline"
                onClick={handleApprove}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve
              </Button>
            </>
          )}
          {showRejectForm && (
            <>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowRejectForm(false)}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleReject}
              >
                Confirm Rejection
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
