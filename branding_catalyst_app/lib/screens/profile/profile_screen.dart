import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../providers/auth_provider.dart';
import '../../theme/app_theme.dart';
import '../../theme/time_theme.dart';
import '../auth/login_screen.dart';
import '../admin/manage_employees_screen.dart';
import '../admin/analytics_screen.dart';
import '../admin/workspaces_screen.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  // Payroll URL
  static const String payrollUrl = 'https://portal-selector.vercel.app';

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Consumer<AuthProvider>(
        builder: (context, authProvider, _) {
          final user = authProvider.user;
          final isAdmin = user?.role == 'admin';
          
          return SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Column(children: [
              _buildHeader(context, user),
              const SizedBox(height: 24),
              _buildInfoCard(user),
              const SizedBox(height: 20),
              // Payroll Section (for everyone)
              _buildPayrollSection(context),
              const SizedBox(height: 20),
              // Admin Section
              if (isAdmin) ...[
                _buildAdminSection(context),
                const SizedBox(height: 20),
              ],
              _buildMenuSection(context),
              const SizedBox(height: 20),
              _buildLogoutButton(context, authProvider),
              const SizedBox(height: 40),
            ]),
          );
        },
      ),
    );
  }

  Widget _buildHeader(BuildContext context, user) {
    final theme = TimeTheme.current;
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(gradient: theme.cardGradient, borderRadius: BorderRadius.circular(24),
        boxShadow: [BoxShadow(color: theme.primaryColor.withOpacity(0.3), blurRadius: 20, offset: const Offset(0, 10))]),
      child: Column(children: [
        Container(width: 80, height: 80, decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(20)),
          child: Center(child: Text(user?.initials ?? '?', style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.white)))),
        const SizedBox(height: 16),
        Text(user?.name ?? 'User', style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
        const SizedBox(height: 4),
        Text(user?.email ?? '', style: TextStyle(fontSize: 14, color: Colors.white.withOpacity(0.8))),
        const SizedBox(height: 8),
        Container(padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6), decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(20)),
          child: Row(mainAxisSize: MainAxisSize.min, children: [
            if (user?.role == 'admin') const Icon(Icons.admin_panel_settings, color: Colors.white, size: 16),
            if (user?.role == 'admin') const SizedBox(width: 4),
            Text(user?.role?.toUpperCase() ?? 'EMPLOYEE', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Colors.white)),
          ])),
      ]),
    );
  }

  Widget _buildInfoCard(user) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(color: AppTheme.backgroundCard, borderRadius: BorderRadius.circular(20)),
      child: Column(children: [
        _buildInfoRow(Icons.badge_outlined, 'Employee ID', user?.employeeId ?? 'N/A'),
        const Divider(height: 24, color: AppTheme.surfaceLight),
        _buildInfoRow(Icons.business_outlined, 'Department', user?.department ?? 'N/A'),
        const Divider(height: 24, color: AppTheme.surfaceLight),
        _buildInfoRow(Icons.work_outline, 'Position', user?.position ?? 'N/A'),
      ]),
    );
  }

  Widget _buildInfoRow(IconData icon, String label, String value) {
    return Row(children: [
      Container(width: 40, height: 40, decoration: BoxDecoration(color: AppTheme.primaryColor.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
        child: Icon(icon, color: AppTheme.primaryColor, size: 20)),
      const SizedBox(width: 16),
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(label, style: TextStyle(fontSize: 12, color: AppTheme.textSecondary.withOpacity(0.7))),
        const SizedBox(height: 2),
        Text(value, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
      ]),
    ]);
  }

  /// Payroll Section - Opens external payroll portal
  Widget _buildPayrollSection(BuildContext context) {
    return GestureDetector(
      onTap: () => _openPayrollPortal(context),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [const Color(0xFF2E7D32), const Color(0xFF4CAF50)],
            begin: Alignment.topLeft, end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(20),
          boxShadow: [BoxShadow(color: const Color(0xFF4CAF50).withOpacity(0.3), blurRadius: 15, offset: const Offset(0, 8))],
        ),
        child: Row(children: [
          Container(
            width: 56, height: 56,
            decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(14)),
            child: const Icon(Icons.account_balance_wallet_rounded, color: Colors.white, size: 28),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const Text('Payroll Portal', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
              const SizedBox(height: 4),
              Text('View salary, payslips & more', style: TextStyle(fontSize: 13, color: Colors.white.withOpacity(0.85))),
            ]),
          ),
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(12)),
            child: const Icon(Icons.open_in_new_rounded, color: Colors.white, size: 20),
          ),
        ]),
      ),
    );
  }

  Future<void> _openPayrollPortal(BuildContext context) async {
    final uri = Uri.parse(payrollUrl);
    try {
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      } else {
        if (context.mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Could not open Payroll Portal'), backgroundColor: AppTheme.error),
          );
        }
      }
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e'), backgroundColor: AppTheme.error),
        );
      }
    }
  }

  /// Admin-only section with management options
  Widget _buildAdminSection(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.backgroundCard,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppTheme.warning.withOpacity(0.3)),
      ),
      child: Column(children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          decoration: BoxDecoration(
            color: AppTheme.warning.withOpacity(0.1),
            borderRadius: const BorderRadius.only(topLeft: Radius.circular(20), topRight: Radius.circular(20)),
          ),
          child: Row(children: [
            Container(
              width: 32, height: 32,
              decoration: BoxDecoration(color: AppTheme.warning.withOpacity(0.2), borderRadius: BorderRadius.circular(8)),
              child: const Icon(Icons.admin_panel_settings, color: AppTheme.warning, size: 18),
            ),
            const SizedBox(width: 12),
            const Text('Admin Panel', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppTheme.warning)),
          ]),
        ),
        ListTile(
          leading: Container(
            width: 40, height: 40,
            decoration: BoxDecoration(color: AppTheme.primaryColor.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
            child: const Icon(Icons.people_alt_rounded, color: AppTheme.primaryColor, size: 20),
          ),
          title: const Text('Manage Employees', style: TextStyle(color: AppTheme.textPrimary, fontWeight: FontWeight.w500)),
          subtitle: Text('Add, edit, or remove employees', style: TextStyle(fontSize: 12, color: AppTheme.textSecondary.withOpacity(0.7))),
          trailing: const Icon(Icons.chevron_right, color: AppTheme.textMuted),
          onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const ManageEmployeesScreen())),
        ),
        ListTile(
          leading: Container(
            width: 40, height: 40,
            decoration: BoxDecoration(color: AppTheme.success.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
            child: const Icon(Icons.analytics_rounded, color: AppTheme.success, size: 20),
          ),
          title: const Text('Analytics', style: TextStyle(color: AppTheme.textPrimary, fontWeight: FontWeight.w500)),
          subtitle: Text('View reports and statistics', style: TextStyle(fontSize: 12, color: AppTheme.textSecondary.withOpacity(0.7))),
          trailing: const Icon(Icons.chevron_right, color: AppTheme.textMuted),
          onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const AnalyticsScreen())),
        ),
        ListTile(
          leading: Container(
            width: 40, height: 40,
            decoration: BoxDecoration(color: AppTheme.info.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
            child: const Icon(Icons.workspace_premium, color: AppTheme.info, size: 20),
          ),
          title: const Text('Workspaces', style: TextStyle(color: AppTheme.textPrimary, fontWeight: FontWeight.w500)),
          subtitle: Text('Manage workspaces and channels', style: TextStyle(fontSize: 12, color: AppTheme.textSecondary.withOpacity(0.7))),
          trailing: const Icon(Icons.chevron_right, color: AppTheme.textMuted),
          onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const WorkspacesScreen())),
        ),
      ]),
    );
  }

  Widget _buildMenuSection(BuildContext context) {
    final menuItems = [
      {'icon': Icons.settings_outlined, 'title': 'Settings', 'color': AppTheme.primaryColor},
      {'icon': Icons.notifications_outlined, 'title': 'Notifications', 'color': AppTheme.warning},
      {'icon': Icons.help_outline, 'title': 'Help & Support', 'color': AppTheme.info},
      {'icon': Icons.info_outline, 'title': 'About', 'color': AppTheme.success},
    ];

    return Container(
      decoration: BoxDecoration(color: AppTheme.backgroundCard, borderRadius: BorderRadius.circular(20)),
      child: Column(
        children: menuItems.map((item) => ListTile(
          leading: Container(width: 40, height: 40, decoration: BoxDecoration(color: (item['color'] as Color).withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
            child: Icon(item['icon'] as IconData, color: item['color'] as Color, size: 20)),
          title: Text(item['title'] as String, style: const TextStyle(color: AppTheme.textPrimary, fontWeight: FontWeight.w500)),
          trailing: const Icon(Icons.chevron_right, color: AppTheme.textMuted),
          onTap: () {},
        )).toList(),
      ),
    );
  }

  Widget _buildLogoutButton(BuildContext context, AuthProvider authProvider) {
    return SizedBox(
      width: double.infinity, height: 52,
      child: ElevatedButton.icon(
        onPressed: () async {
          await authProvider.logout();
          if (context.mounted) Navigator.of(context).pushAndRemoveUntil(MaterialPageRoute(builder: (_) => const LoginScreen()), (route) => false);
        },
        icon: const Icon(Icons.logout),
        label: const Text('Logout', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
        style: ElevatedButton.styleFrom(backgroundColor: AppTheme.error, foregroundColor: Colors.white, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14))),
      ),
    );
  }
}
