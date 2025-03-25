import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatProvider } from "@/contexts/ChatContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AppSidebar } from "@/components/AppSidebar";
import { ChatBot } from "@/components/ChatBot";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

// Import all page components
import Index from "./pages/Index";
import DashboardPage from "./pages/dashboard";
import ServiceCenterPage from "./pages/service";
import InventoryPage from "./pages/vehicles/inventory";
import MaintenancePage from "./pages/vehicles/maintenance";
import DocumentsPage from "./pages/vehicles/documents";
import SalesOrdersPage from "./pages/sales/orders";
import AnalyticsPage from "./pages/sales/analytics";
import ReportsPage from "./pages/sales/reports";
import CustomerDatabasePage from "./pages/customers/database";
import NewLeadPage from "./pages/customers/new";
import LeadsPage from "./pages/customers/leads";
import FollowUpsPage from "./pages/customers/follow-ups";
import SettingsPage from "./pages/admin/settings";
import AdminReportsPage from "./pages/admin/reports";
import UsersPage from "./pages/admin/users";
import MessagesPage from "./pages/notifications/messages";
import CalendarPage from "./pages/notifications/calendar";
import MailPage from "./pages/notifications/mail";
import DocumentationPage from "./pages/support/docs";
import ContactPage from "./pages/support/contact";
import FAQsPage from "./pages/support/faqs";
import FinancePage from "./pages/finance";
import PayPalIntegrationPage from "./pages/finance/paypal-integration";
import ShippingPage from "./pages/shipping";
import ShippingOrdersPage from "./pages/shipping/orders";
import TrackingPage from "./pages/shipping/tracking";
import WarehousesPage from "./pages/shipping/warehouses";
import FreightForwardersPage from "./pages/shipping/freight-forwarders";
import AddInventoryPage from "./pages/inventory/add";
import InventoryListPage from "./pages/inventory/list";
import { InvoiceManagement } from "@/components/backoffice/InvoiceManagement";
import { CostCalculator } from "@/components/backoffice/CostCalculator";
import { BackofficeReports } from "@/components/backoffice/BackofficeReports";
import DataEntryPage from "./pages/purchasing/data-entry";
import DocumentScannerPage from "./pages/purchasing/document-scanner";
import CustomerCareDashboard from "./pages/customer-care/dashboard";
import VendorManagementPage from "./pages/customer-care/vendors";
import AddVendorPage from "./pages/customer-care/add-vendor";
import PurchaseApprovalsPage from "./pages/customer-care/PurchaseApprovals";
import AutomatedEntriesPage from "./pages/accounting/automated-entries";
import DiscrepancyDetectionPage from "./pages/accounting/discrepancy-detection";
import ChartOfAccountsPage from "./pages/accounting/chart-of-accounts";
import BankAccountsPage from "./pages/accounting/bank-accounts";
import BudgetManagementPage from "./pages/backoffice/budget";
import AddMonthlyBudgetPage from "./pages/backoffice/budget/add";
import AddMoneyOrderPage from "./pages/backoffice/budget/add-money-order";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles = ["admin", "sales"] }: { 
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user && location.pathname !== "/") {
    return <Navigate to="/" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isMobile = useIsMobile();

  if (isLoginPage) {
    return (
      <main className="flex flex-col min-h-screen">
        {children}
        <Footer />
      </main>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex-1 ml-0 md:ml-16 flex flex-col">
        <div className="p-4 md:p-6 overflow-x-hidden">
          {children}
        </div>
        <Footer />
      </div>
      <ChatBot />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <LanguageProvider>
          <ChatProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <SidebarProvider>
                <AppLayout>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/dashboard" element={
                      <ProtectedRoute allowedRoles={["admin", "sales","accounting","user","shipping","purchasing","customer-care"]}>
                        <DashboardPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/inventory/add" element={
                      <ProtectedRoute allowedRoles={["admin", "sales","accounting"]}>
                        <AddInventoryPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/inventory/list" element={
                      <ProtectedRoute allowedRoles={["admin", "sales"]}>
                        <InventoryListPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/service" element={<ServiceCenterPage />} />
                    <Route path="/vehicles/inventory" element={<InventoryPage />} />
                    <Route path="/vehicles/maintenance" element={<MaintenancePage />} />
                    <Route path="/vehicles/documents" element={<DocumentsPage />} />
                    <Route path="/sales/orders" element={<SalesOrdersPage />} />
                    <Route path="/sales/analytics" element={<AnalyticsPage />} />
                    <Route path="/sales/reports" element={<ReportsPage />} />
                    <Route path="/customers/database" element={<CustomerDatabasePage />} />
                    <Route path="/customers/new" element={<NewLeadPage />} />
                    <Route path="/customers/leads" element={
                      <ProtectedRoute allowedRoles={["admin", "sales"]}>
                        <LeadsPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/customers/follow-ups" element={<FollowUpsPage />} />
                    <Route path="/admin/settings" element={<SettingsPage />} />
                    <Route path="/admin/reports" element={<AdminReportsPage />} />
                    <Route path="/admin/users" element={<UsersPage />} />
                    <Route path="/notifications/messages" element={<MessagesPage />} />
                    <Route path="/notifications/calendar" element={<CalendarPage />} />
                    <Route path="/notifications/mail" element={<MailPage />} />
                    <Route path="/support/docs" element={<DocumentationPage />} />
                    <Route path="/support/contact" element={<ContactPage />} />
                    <Route path="/support/faqs" element={<FAQsPage />} />
                    <Route path="/finance" element={<FinancePage />} />
                    <Route path="/finance/paypal-integration" element={<PayPalIntegrationPage />} />
                    <Route path="/shipping" element={<ShippingPage />} />
                    <Route path="/shipping/orders" element={<ShippingOrdersPage />} />
                    <Route path="/shipping/tracking" element={<TrackingPage />} />
                    <Route path="/shipping/warehouses" element={<WarehousesPage />} />
                    <Route path="/shipping/freight-forwarders" element={<FreightForwardersPage />} />
                    <Route path="/backoffice/invoices" element={<InvoiceManagement />} />
                    <Route path="/backoffice/calculator" element={<CostCalculator />} />
                    <Route path="/backoffice/reports" element={<BackofficeReports />} />
                    <Route path="/purchasing/data-entry" element={<DataEntryPage />} />
                    <Route path="/purchasing/document-scanner" element={<DocumentScannerPage />} />
                    <Route path="/customer-care/dashboard" element={<CustomerCareDashboard />} />
                    <Route path="/customer-care/vendors" element={<VendorManagementPage />} />
                    <Route path="/customer-care/add-vendor" element={<AddVendorPage />} />
                    <Route path="/customer-care/approvals" element={<PurchaseApprovalsPage />} />
                    <Route path="/accounting/automated-entries" element={<AutomatedEntriesPage />} />
                    <Route path="/accounting/discrepancy-detection" element={<DiscrepancyDetectionPage />} />
                    <Route path="/accounting/chart-of-accounts" element={<ChartOfAccountsPage />} />
                    <Route path="/accounting/bank-accounts" element={<BankAccountsPage />} />
                    <Route path="/backoffice/budget" element={
                      <ProtectedRoute allowedRoles={["admin", "accounting"]}>
                        <BudgetManagementPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/backoffice/budget/add" element={
                      <ProtectedRoute allowedRoles={["admin", "accounting"]}>
                        <AddMonthlyBudgetPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/backoffice/budget/add-money-order" element={
                      <ProtectedRoute allowedRoles={["admin", "accounting"]}>
                        <AddMoneyOrderPage />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </AppLayout>
              </SidebarProvider>
            </BrowserRouter>
          </ChatProvider>
        </LanguageProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
