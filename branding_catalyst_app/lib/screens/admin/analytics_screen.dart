import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/providers.dart';
import '../../services/api_service.dart';
import '../../config/api_config.dart';
import '../../theme/app_theme.dart';

class AnalyticsScreen extends StatefulWidget {
  const AnalyticsScreen({super.key});

  @override
  State<AnalyticsScreen> createState() => _AnalyticsScreenState();
}

class _AnalyticsScreenState extends State<AnalyticsScreen> {
  bool _isLoading = true;
  Map<String, dynamic> _stats = {};
  List<dynamic> _activities = [];

  @override
  void initState() {
    super.initState();
    _loadAnalytics();
  }

  Future<void> _loadAnalytics() async {
    setState(() => _isLoading = true);

    try {
      // Load activity feed
      final activityResponse = await ApiService().get(ApiConfig.activity);
      if (activityResponse['success'] == true) {
        _activities = activityResponse['activities'] ?? [];
      }

      // Get counts from providers
      final taskProvider = context.read<TaskProvider>();
      final employeeProvider = context.read<EmployeeProvider>();
      final channelProvider = context.read<ChannelProvider>();
      
      // Ensure data is loaded
      if (taskProvider.tasks.isEmpty) await taskProvider.loadTasks();
      if (employeeProvider.employees.isEmpty) await employeeProvider.loadEmployees();
      
      _stats = {
        'totalTasks': taskProvider.tasks.length,
        'completedTasks': taskProvider.completedCount,
        'pendingTasks': taskProvider.todoCount,
        'inProgressTasks': taskProvider.inProgressCount,
        'totalEmployees': employeeProvider.totalEmployees,
        'activeEmployees': employeeProvider.activeEmployees,
        'totalChannels': channelProvider.channels.length,
        'totalWorkspaces': channelProvider.workspaces.length,
      };
    } catch (e) {
      debugPrint('Error loading analytics: $e');
    }

    setState(() => _isLoading = false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(gradient: AppTheme.backgroundGradient),
        child: SafeArea(
          child: _isLoading
              ? const Center(child: CircularProgressIndicator(color: AppTheme.primaryColor))
              : RefreshIndicator(
                  onRefresh: _loadAnalytics,
                  child: CustomScrollView(slivers: [
                    SliverToBoxAdapter(child: _buildHeader()),
                    SliverToBoxAdapter(child: _buildOverviewSection()),
                    SliverToBoxAdapter(child: _buildTasksSection()),
                    SliverToBoxAdapter(child: _buildTeamSection()),
                    SliverToBoxAdapter(child: _buildActivitySection()),
                    const SliverToBoxAdapter(child: SizedBox(height: 40)),
                  ]),
                ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Row(children: [
        IconButton(
          onPressed: () => Navigator.pop(context),
          style: IconButton.styleFrom(backgroundColor: AppTheme.surfaceColor, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
          icon: const Icon(Icons.arrow_back, color: AppTheme.textPrimary),
        ),
        const SizedBox(width: 12),
        Container(
          width: 44, height: 44,
          decoration: BoxDecoration(gradient: AppTheme.primaryGradient, borderRadius: BorderRadius.circular(12)),
          child: const Icon(Icons.analytics_rounded, color: Colors.white, size: 24),
        ),
        const SizedBox(width: 12),
        const Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text('Analytics', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
            Text('Reports & Statistics', style: TextStyle(fontSize: 13, color: AppTheme.textSecondary)),
          ]),
        ),
        IconButton(
          onPressed: _loadAnalytics,
          style: IconButton.styleFrom(backgroundColor: AppTheme.surfaceColor, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
          icon: const Icon(Icons.refresh, color: AppTheme.primaryColor),
        ),
      ]),
    );
  }

  Widget _buildOverviewSection() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          gradient: AppTheme.primaryGradient, borderRadius: BorderRadius.circular(20),
          boxShadow: [BoxShadow(color: AppTheme.primaryColor.withOpacity(0.3), blurRadius: 20, offset: const Offset(0, 10))],
        ),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const Row(children: [
            Icon(Icons.dashboard_rounded, color: Colors.white, size: 28),
            SizedBox(width: 12),
            Text('Overview', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
          ]),
          const SizedBox(height: 20),
          Row(children: [
            _buildOverviewStat('Tasks', '${_stats['totalTasks'] ?? 0}', Icons.task_alt),
            _buildOverviewStat('Team', '${_stats['totalEmployees'] ?? 0}', Icons.people),
            _buildOverviewStat('Channels', '${_stats['totalChannels'] ?? 0}', Icons.tag),
            _buildOverviewStat('Spaces', '${_stats['totalWorkspaces'] ?? 0}', Icons.workspaces),
          ]),
        ]),
      ),
    );
  }

  Widget _buildOverviewStat(String label, String value, IconData icon) {
    return Expanded(
      child: Column(children: [
        Container(
          width: 48, height: 48,
          decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(12)),
          child: Icon(icon, color: Colors.white, size: 24),
        ),
        const SizedBox(height: 10),
        Text(value, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
        Text(label, style: TextStyle(fontSize: 12, color: Colors.white.withOpacity(0.8))),
      ]),
    );
  }

  Widget _buildTasksSection() {
    final completed = _stats['completedTasks'] ?? 0;
    final pending = _stats['pendingTasks'] ?? 0;
    final inProgress = _stats['inProgressTasks'] ?? 0;
    final total = _stats['totalTasks'] ?? 1;
    final completionRate = total > 0 ? (completed / total * 100).toInt() : 0;

    return Padding(
      padding: const EdgeInsets.all(20),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(color: AppTheme.backgroundCard, borderRadius: BorderRadius.circular(20)),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Container(
              width: 40, height: 40,
              decoration: BoxDecoration(color: AppTheme.info.withOpacity(0.15), borderRadius: BorderRadius.circular(10)),
              child: const Icon(Icons.assignment, color: AppTheme.info, size: 20),
            ),
            const SizedBox(width: 12),
            const Text('Task Analytics', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
          ]),
          const SizedBox(height: 20),
          // Completion Rate
          Row(children: [
            Expanded(
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                const Text('Completion Rate', style: TextStyle(fontSize: 13, color: AppTheme.textSecondary)),
                const SizedBox(height: 8),
                Row(children: [
                  Text('$completionRate%', style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: AppTheme.success)),
                  const SizedBox(width: 8),
                  const Icon(Icons.trending_up, color: AppTheme.success, size: 20),
                ]),
              ]),
            ),
            SizedBox(
              width: 80, height: 80,
              child: Stack(alignment: Alignment.center, children: [
                CircularProgressIndicator(
                  value: completionRate / 100, strokeWidth: 8, backgroundColor: AppTheme.surfaceLight,
                  valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.success),
                ),
                Text('$completed', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
              ]),
            ),
          ]),
          const SizedBox(height: 20),
          // Status Breakdown
          Row(children: [
            _buildTaskStatusCard('Pending', pending, AppTheme.warning, Icons.pending_actions),
            const SizedBox(width: 12),
            _buildTaskStatusCard('In Progress', inProgress, AppTheme.info, Icons.trending_up),
            const SizedBox(width: 12),
            _buildTaskStatusCard('Completed', completed, AppTheme.success, Icons.check_circle),
          ]),
        ]),
      ),
    );
  }

  Widget _buildTaskStatusCard(String label, int count, Color color, IconData icon) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(14)),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Icon(icon, color: color, size: 20),
          const SizedBox(height: 8),
          Text('$count', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: color)),
          Text(label, style: TextStyle(fontSize: 11, color: AppTheme.textSecondary.withOpacity(0.7))),
        ]),
      ),
    );
  }

  Widget _buildTeamSection() {
    final active = _stats['activeEmployees'] ?? 0;
    final total = _stats['totalEmployees'] ?? 0;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(color: AppTheme.backgroundCard, borderRadius: BorderRadius.circular(20)),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Container(
              width: 40, height: 40,
              decoration: BoxDecoration(color: AppTheme.success.withOpacity(0.15), borderRadius: BorderRadius.circular(10)),
              child: const Icon(Icons.people_alt, color: AppTheme.success, size: 20),
            ),
            const SizedBox(width: 12),
            const Text('Team Status', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
          ]),
          const SizedBox(height: 20),
          Row(children: [
            _buildTeamStat('Total Employees', '$total', Icons.groups, AppTheme.primaryColor),
            const SizedBox(width: 16),
            _buildTeamStat('Active', '$active', Icons.check_circle, AppTheme.success),
            const SizedBox(width: 16),
            _buildTeamStat('Inactive', '${total - active}', Icons.cancel, AppTheme.error),
          ]),
        ]),
      ),
    );
  }

  Widget _buildTeamStat(String label, String value, IconData icon, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(14)),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Icon(icon, color: color, size: 18),
            const SizedBox(width: 6),
            Text(value, style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: color)),
          ]),
          const SizedBox(height: 4),
          Text(label, style: TextStyle(fontSize: 10, color: AppTheme.textSecondary.withOpacity(0.7))),
        ]),
      ),
    );
  }

  Widget _buildActivitySection() {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Container(
            width: 40, height: 40,
            decoration: BoxDecoration(color: AppTheme.warning.withOpacity(0.15), borderRadius: BorderRadius.circular(10)),
            child: const Icon(Icons.history, color: AppTheme.warning, size: 20),
          ),
          const SizedBox(width: 12),
          const Text('Recent Activity', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
          const Spacer(),
          Text('${_activities.length} activities', style: TextStyle(fontSize: 13, color: AppTheme.textSecondary.withOpacity(0.7))),
        ]),
        const SizedBox(height: 16),
        if (_activities.isEmpty)
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(color: AppTheme.backgroundCard, borderRadius: BorderRadius.circular(16)),
            child: Center(child: Text('No recent activity', style: TextStyle(color: AppTheme.textSecondary.withOpacity(0.7)))),
          )
        else
          Container(
            decoration: BoxDecoration(color: AppTheme.backgroundCard, borderRadius: BorderRadius.circular(16)),
            child: ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: _activities.take(10).length,
              separatorBuilder: (_, __) => const Divider(height: 1, color: AppTheme.surfaceLight),
              itemBuilder: (context, index) {
                final activity = _activities[index];
                return _buildActivityItem(activity);
              },
            ),
          ),
      ]),
    );
  }

  Widget _buildActivityItem(Map<String, dynamic> activity) {
    IconData icon = Icons.info;
    Color color = AppTheme.textMuted;
    
    final action = activity['action'] ?? '';
    if (action.contains('created')) {
      icon = Icons.add_circle;
      color = AppTheme.success;
    } else if (action.contains('updated')) {
      icon = Icons.edit;
      color = AppTheme.info;
    } else if (action.contains('deleted')) {
      icon = Icons.delete;
      color = AppTheme.error;
    } else if (action.contains('commented')) {
      icon = Icons.comment;
      color = AppTheme.warning;
    }

    final user = activity['user'] ?? {};
    final description = activity['description'] ?? 'Activity';

    return ListTile(
      leading: Container(
        width: 36, height: 36,
        decoration: BoxDecoration(color: color.withOpacity(0.15), borderRadius: BorderRadius.circular(10)),
        child: Icon(icon, color: color, size: 18),
      ),
      title: Text(description, style: const TextStyle(fontSize: 13, color: AppTheme.textPrimary), maxLines: 2, overflow: TextOverflow.ellipsis),
      subtitle: Text('By ${user['name'] ?? 'Unknown'}', style: TextStyle(fontSize: 11, color: AppTheme.textSecondary.withOpacity(0.7))),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
    );
  }
}
