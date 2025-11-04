import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { format } from 'date-fns';
import { Search, Filter, X, ArrowUpDown, Download, FileSpreadsheet, CheckSquare, XSquare } from 'lucide-react';
import * as XLSX from 'xlsx';

interface RoleRequest {
  id: string;
  user_id: string;
  requested_role: 'admin' | 'reviewer' | 'company';
  status: 'pending' | 'approved' | 'rejected';
  justification: string;
  company_id?: string;
  created_at: string;
  profiles: {
    email: string;
    first_name: string;
    last_name: string;
  };
}

export const RoleRequestManager = () => {
  const [requests, setRequests] = useState<RoleRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<RoleRequest | null>(null);
  const [adminNote, setAdminNote] = useState('');
  const [processing, setProcessing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;
  
  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'role' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  
  // Bulk actions state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkProcessing, setBulkProcessing] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    setSelectedIds(new Set()); // Clear selections when filters change
    fetchRoleRequests();
  }, [currentPage, searchQuery, roleFilter, dateFrom, dateTo, companyFilter, sortBy, sortOrder]);

  const fetchRoleRequests = async () => {
    try {
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      // Build query
      let query = supabase
        .from('role_requests')
        .select(`
          id,
          user_id,
          requested_role,
          status,
          justification,
          company_id,
          created_at,
          profiles:user_id (
            email,
            first_name,
            last_name
          )
        `, { count: 'exact' })
        .eq('status', 'pending');

      // Apply role filter
      if (roleFilter !== 'all') {
        query = query.eq('requested_role', roleFilter as 'admin' | 'reviewer' | 'company');
      }

      // Apply date range filter
      if (dateFrom) {
        query = query.gte('created_at', new Date(dateFrom).toISOString());
      }
      if (dateTo) {
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999);
        query = query.lte('created_at', endDate.toISOString());
      }

      // Apply company filter
      if (companyFilter.trim()) {
        query = query.ilike('company_id', `%${companyFilter.trim()}%`);
      }

      // Apply sorting
      if (sortBy === 'date') {
        query = query.order('created_at', { ascending: sortOrder === 'asc' });
      } else if (sortBy === 'role') {
        query = query.order('requested_role', { ascending: sortOrder === 'asc' });
      }
      // Note: name sorting will be done client-side since it's in profiles table

      const { data: requestsData, error, count } = await query.range(from, to);

      if (error) {
        // Silently handle permission denied errors (happens during initial load)
        if (error.code === '42501' || error.message.includes('permission denied')) {
          console.warn('Permission denied for role_requests - auth may still be loading');
          setRequests([]);
          setTotalCount(0);
          setLoading(false);
          return;
        }
        throw error;
      }

      // Transform nested profiles data
      let transformedRequests = (requestsData || []).map(req => ({
        ...req,
        profiles: Array.isArray(req.profiles) ? req.profiles[0] : req.profiles
      })) as RoleRequest[];

      // Apply search filter (client-side since it involves profiles table)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        transformedRequests = transformedRequests.filter(req => 
          req.profiles?.email?.toLowerCase().includes(query) ||
          req.profiles?.first_name?.toLowerCase().includes(query) ||
          req.profiles?.last_name?.toLowerCase().includes(query) ||
          `${req.profiles?.first_name} ${req.profiles?.last_name}`.toLowerCase().includes(query)
        );
      }

      // Apply name sorting (client-side)
      if (sortBy === 'name') {
        transformedRequests.sort((a, b) => {
          const nameA = `${a.profiles?.first_name || ''} ${a.profiles?.last_name || ''}`.toLowerCase();
          const nameB = `${b.profiles?.first_name || ''} ${b.profiles?.last_name || ''}`.toLowerCase();
          return sortOrder === 'asc' 
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        });
      }

      setRequests(transformedRequests);
      setTotalCount(count || 0);
    } catch (error: any) {
      console.error('Error fetching role requests:', error);
      toast({
        title: 'Error loading role requests',
        description: 'Unable to load pending role requests. Please refresh the page.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRequest = async (request: RoleRequest) => {
    setProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Grant the role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: request.user_id,
          role: request.requested_role,
          granted_by: user.id,
        });

      if (roleError) throw roleError;

      // If company role, update company_representatives
      if (request.requested_role === 'company' && request.company_id) {
        const { error: companyError } = await supabase
          .from('company_representatives')
          .update({
            verified: true,
            verified_by: user.id,
            verified_at: new Date().toISOString(),
          })
          .eq('user_id', request.user_id)
          .eq('company_id', request.company_id);

        if (companyError) throw companyError;
      }

      // Update request status
      const { error: updateError } = await supabase
        .from('role_requests')
        .update({
          status: 'approved',
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', request.id);

      if (updateError) throw updateError;

      toast({
        title: 'Role Approved',
        description: `Successfully granted ${request.requested_role} role to ${request.profiles.email}`,
      });

      setSelectedRequest(null);
      setSelectedIds(new Set()); // Clear selections
      setCurrentPage(1); // Reset to first page
      fetchRoleRequests();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleRejectRequest = async (request: RoleRequest) => {
    setProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('role_requests')
        .update({
          status: 'rejected',
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', request.id);

      if (error) throw error;

      toast({
        title: 'Role Request Rejected',
        description: `Rejected ${request.requested_role} role request from ${request.profiles.email}`,
      });

      setSelectedRequest(null);
      setSelectedIds(new Set()); // Clear selections
      setCurrentPage(1); // Reset to first page
      fetchRoleRequests();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'default';
      case 'reviewer': return 'secondary';
      case 'company': return 'outline';
      default: return 'outline';
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setRoleFilter('all');
    setDateFrom('');
    setDateTo('');
    setCompanyFilter('');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || roleFilter !== 'all' || dateFrom || dateTo || companyFilter;

  const toggleSelectAll = () => {
    if (selectedIds.size === requests.length && requests.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(requests.map(r => r.id)));
    }
  };

  const toggleSelectRequest = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkApprove = async () => {
    if (selectedIds.size === 0) return;

    const confirmMessage = `Are you sure you want to approve ${selectedIds.size} role request(s)?`;
    if (!confirm(confirmMessage)) return;

    setBulkProcessing(true);
    const selectedRequests = requests.filter(r => selectedIds.has(r.id));
    let successCount = 0;
    let failCount = 0;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      for (const request of selectedRequests) {
        try {
          // Grant the role
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert({
              user_id: request.user_id,
              role: request.requested_role,
              granted_by: user.id,
            });

          if (roleError) throw roleError;

          // If company role, update company_representatives
          if (request.requested_role === 'company' && request.company_id) {
            const { error: companyError } = await supabase
              .from('company_representatives')
              .update({
                verified: true,
                verified_by: user.id,
                verified_at: new Date().toISOString(),
              })
              .eq('user_id', request.user_id)
              .eq('company_id', request.company_id);

            if (companyError) throw companyError;
          }

          // Update request status
          const { error: updateError } = await supabase
            .from('role_requests')
            .update({
              status: 'approved',
              reviewed_by: user.id,
              reviewed_at: new Date().toISOString(),
            })
            .eq('id', request.id);

          if (updateError) throw updateError;

          successCount++;
        } catch (error: any) {
          console.error(`Error approving request ${request.id}:`, error);
          failCount++;
        }
      }

      toast({
        title: 'Bulk Approval Complete',
        description: `Successfully approved ${successCount} request(s).${failCount > 0 ? ` ${failCount} failed.` : ''}`,
        variant: failCount > 0 ? 'destructive' : 'default',
      });

      setSelectedIds(new Set());
      setCurrentPage(1);
      fetchRoleRequests();
    } catch (error: any) {
      toast({
        title: 'Bulk Approval Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setBulkProcessing(false);
    }
  };

  const handleBulkReject = async () => {
    if (selectedIds.size === 0) return;

    const confirmMessage = `Are you sure you want to reject ${selectedIds.size} role request(s)?`;
    if (!confirm(confirmMessage)) return;

    setBulkProcessing(true);
    const selectedRequests = requests.filter(r => selectedIds.has(r.id));
    let successCount = 0;
    let failCount = 0;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      for (const request of selectedRequests) {
        try {
          const { error } = await supabase
            .from('role_requests')
            .update({
              status: 'rejected',
              reviewed_by: user.id,
              reviewed_at: new Date().toISOString(),
            })
            .eq('id', request.id);

          if (error) throw error;
          successCount++;
        } catch (error: any) {
          console.error(`Error rejecting request ${request.id}:`, error);
          failCount++;
        }
      }

      toast({
        title: 'Bulk Rejection Complete',
        description: `Successfully rejected ${successCount} request(s).${failCount > 0 ? ` ${failCount} failed.` : ''}`,
        variant: failCount > 0 ? 'destructive' : 'default',
      });

      setSelectedIds(new Set());
      setCurrentPage(1);
      fetchRoleRequests();
    } catch (error: any) {
      toast({
        title: 'Bulk Rejection Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setBulkProcessing(false);
    }
  };

  const exportToCSV = () => {
    if (requests.length === 0) {
      toast({
        title: 'No data to export',
        description: 'There are no role requests to export.',
        variant: 'destructive',
      });
      return;
    }

    // Prepare CSV data
    const csvData = requests.map(req => ({
      'Request ID': req.id,
      'User Email': req.profiles?.email || 'N/A',
      'First Name': req.profiles?.first_name || 'N/A',
      'Last Name': req.profiles?.last_name || 'N/A',
      'Requested Role': req.requested_role,
      'Status': req.status,
      'Company ID': req.company_id || 'N/A',
      'Justification': req.justification,
      'Created At': format(new Date(req.created_at), 'yyyy-MM-dd HH:mm:ss'),
    }));

    // Convert to CSV string
    const headers = Object.keys(csvData[0]).join(',');
    const rows = csvData.map(row => 
      Object.values(row).map(value => 
        `"${String(value).replace(/"/g, '""')}"`
      ).join(',')
    );
    const csv = [headers, ...rows].join('\n');

    // Download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `role-requests-${format(new Date(), 'yyyy-MM-dd-HHmmss')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Export successful',
      description: `Exported ${requests.length} role request(s) to CSV`,
    });
  };

  const exportToExcel = () => {
    if (requests.length === 0) {
      toast({
        title: 'No data to export',
        description: 'There are no role requests to export.',
        variant: 'destructive',
      });
      return;
    }

    // Prepare Excel data
    const excelData = requests.map(req => ({
      'Request ID': req.id,
      'User Email': req.profiles?.email || 'N/A',
      'First Name': req.profiles?.first_name || 'N/A',
      'Last Name': req.profiles?.last_name || 'N/A',
      'Requested Role': req.requested_role,
      'Status': req.status,
      'Company ID': req.company_id || 'N/A',
      'Justification': req.justification,
      'Created At': format(new Date(req.created_at), 'yyyy-MM-dd HH:mm:ss'),
    }));

    // Create workbook and worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Role Requests');

    // Set column widths
    const columnWidths = [
      { wch: 36 }, // Request ID
      { wch: 30 }, // User Email
      { wch: 15 }, // First Name
      { wch: 15 }, // Last Name
      { wch: 12 }, // Requested Role
      { wch: 10 }, // Status
      { wch: 30 }, // Company ID
      { wch: 50 }, // Justification
      { wch: 20 }, // Created At
    ];
    ws['!cols'] = columnWidths;

    // Download
    XLSX.writeFile(wb, `role-requests-${format(new Date(), 'yyyy-MM-dd-HHmmss')}.xlsx`);

    toast({
      title: 'Export successful',
      description: `Exported ${requests.length} role request(s) to Excel`,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Pending Role Requests</CardTitle>
              <CardDescription>
                Review and approve role requests from users
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportToCSV}
                disabled={loading || requests.length === 0}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportToExcel}
                disabled={loading || requests.length === 0}
                className="gap-2"
              >
                <FileSpreadsheet className="h-4 w-4" />
                Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Sort Controls */}
          <div className="space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-1 h-5 px-1">
                      {[roleFilter !== 'all', dateFrom, dateTo, companyFilter].filter(Boolean).length}
                    </Badge>
                  )}
                </Button>

                <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                  const [newSortBy, newSortOrder] = value.split('-') as [typeof sortBy, typeof sortOrder];
                  setSortBy(newSortBy);
                  setSortOrder(newSortOrder);
                  setCurrentPage(1);
                }}>
                  <SelectTrigger className="w-[180px] gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">Newest First</SelectItem>
                    <SelectItem value="date-asc">Oldest First</SelectItem>
                    <SelectItem value="role-asc">Role (A-Z)</SelectItem>
                    <SelectItem value="role-desc">Role (Z-A)</SelectItem>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">Filters</h3>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="h-8 gap-2"
                    >
                      <X className="h-3 w-3" />
                      Clear All
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role-filter">Role Type</Label>
                    <Select value={roleFilter} onValueChange={(value) => {
                      setRoleFilter(value);
                      setCurrentPage(1);
                    }}>
                      <SelectTrigger id="role-filter">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="reviewer">Reviewer</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-from">From Date</Label>
                    <Input
                      id="date-from"
                      type="date"
                      value={dateFrom}
                      onChange={(e) => {
                        setDateFrom(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-to">To Date</Label>
                    <Input
                      id="date-to"
                      type="date"
                      value={dateTo}
                      onChange={(e) => {
                        setDateTo(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company-filter">Company ID</Label>
                    <Input
                      id="company-filter"
                      placeholder="Filter by company..."
                      value={companyFilter}
                      onChange={(e) => {
                        setCompanyFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {totalCount === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              {hasActiveFilters ? 'No role requests match your filters' : 'No pending role requests'}
            </p>
          ) : (
            <>
              {/* Bulk Actions Bar */}
              {selectedIds.size > 0 && (
                <div className="mb-4 p-4 bg-muted border rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">
                      {selectedIds.size} selected
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedIds(new Set())}
                    >
                      Clear Selection
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBulkReject}
                      disabled={bulkProcessing}
                      className="gap-2"
                    >
                      <XSquare className="h-4 w-4" />
                      Reject Selected
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleBulkApprove}
                      disabled={bulkProcessing}
                      className="gap-2"
                    >
                      <CheckSquare className="h-4 w-4" />
                      Approve Selected
                    </Button>
                  </div>
                </div>
              )}

              {/* Select All Checkbox */}
              {requests.length > 0 && (
                <div className="mb-4 flex items-center gap-2 py-2 px-1">
                  <Checkbox
                    checked={selectedIds.size === requests.length && requests.length > 0}
                    onCheckedChange={toggleSelectAll}
                    id="select-all"
                  />
                  <Label htmlFor="select-all" className="text-sm cursor-pointer">
                    Select all on this page
                  </Label>
                </div>
              )}

              <div className="space-y-4">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedIds.has(request.id)}
                        onCheckedChange={() => toggleSelectRequest(request.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">
                              {request.profiles.first_name} {request.profiles.last_name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {request.profiles.email}
                            </p>
                          </div>
                          <Badge variant={getRoleBadgeVariant(request.requested_role)}>
                            {request.requested_role}
                          </Badge>
                        </div>
                        
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-1">Justification:</p>
                          <p className="text-sm text-muted-foreground">
                            {request.justification}
                          </p>
                        </div>

                        {request.company_id && (
                          <div className="mt-2">
                            <p className="text-sm font-medium mb-1">Company ID:</p>
                            <p className="text-sm text-muted-foreground">
                              {request.company_id}
                            </p>
                          </div>
                        )}

                        <div className="text-xs text-muted-foreground mt-2">
                          Requested on {format(new Date(request.created_at), 'PPP')}
                        </div>

                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            onClick={() => setSelectedRequest(request)}
                            disabled={processing || bulkProcessing}
                          >
                            Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalCount > itemsPerPage && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} requests
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1 || loading}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: Math.ceil(totalCount / itemsPerPage) }, (_, i) => i + 1)
                        .filter(page => {
                          // Show first page, last page, current page, and pages around current
                          const totalPages = Math.ceil(totalCount / itemsPerPage);
                          return page === 1 || 
                                 page === totalPages || 
                                 (page >= currentPage - 1 && page <= currentPage + 1);
                        })
                        .map((page, index, array) => (
                          <div key={page} className="flex items-center gap-2">
                            {index > 0 && array[index - 1] !== page - 1 && (
                              <span className="text-muted-foreground">...</span>
                            )}
                            <Button
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                              disabled={loading}
                              className="min-w-[2.5rem]"
                            >
                              {page}
                            </Button>
                          </div>
                        ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(Math.ceil(totalCount / itemsPerPage), prev + 1))}
                      disabled={currentPage >= Math.ceil(totalCount / itemsPerPage) || loading}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Role Request</DialogTitle>
            <DialogDescription>
              Approve or reject this role request
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <p className="font-semibold">User:</p>
                <p className="text-sm">{selectedRequest.profiles.email}</p>
              </div>
              <div>
                <p className="font-semibold">Requested Role:</p>
                <Badge variant={getRoleBadgeVariant(selectedRequest.requested_role)}>
                  {selectedRequest.requested_role}
                </Badge>
              </div>
              <div>
                <p className="font-semibold mb-2">Justification:</p>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                  {selectedRequest.justification}
                </p>
              </div>
              {selectedRequest.company_id && (
                <div>
                  <p className="font-semibold">Company:</p>
                  <p className="text-sm">{selectedRequest.company_id}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setSelectedRequest(null)}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedRequest && handleRejectRequest(selectedRequest)}
              disabled={processing}
            >
              Reject
            </Button>
            <Button
              onClick={() => selectedRequest && handleApproveRequest(selectedRequest)}
              disabled={processing}
            >
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
