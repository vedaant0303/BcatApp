import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/providers.dart';
import '../../theme/app_theme.dart';
import '../../theme/time_theme.dart';
import '../../models/models.dart';
import '../channels/channels_screen.dart';
import '../tasks/tasks_screen.dart';
import '../profile/profile_screen.dart';
import '../todos/todo_screen.dart';



class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;
  late Timer _timeUpdateTimer;
  TimeTheme _currentTheme = TimeTheme.current;

  late List<Widget> _screens;

  @override
  void initState() {
    super.initState();
    _screens = [
      HomeContent(onNavigate: _navigateToTab),
      const ChannelsScreen(),
      const TodoScreen(),
      const TasksScreen(),
      const ProfileScreen(),
    ];
    
    // Initialize data after the widget is built
    WidgetsBinding.instance.addPostFrameCallback((_) => _initData());
    
    // Update theme every minute to check for time changes
    _timeUpdateTimer = Timer.periodic(const Duration(minutes: 1), (_) {
      final newTheme = TimeTheme.current;
      if (newTheme.greeting != _currentTheme.greeting) {
        if (mounted) setState(() => _currentTheme = newTheme);
      }
    });
  }

  @override
  void dispose() {
    _timeUpdateTimer.cancel();
    super.dispose();
  }

  void _navigateToTab(int index) {
    setState(() => _currentIndex = index);
  }

  Future<void> _initData() async {
    context.read<ChannelProvider>().initSocketListeners();
    context.read<TaskProvider>().loadTasks();
    context.read<TodoProvider>().loadTodos();
    context.read<ChannelProvider>().loadWorkspaces();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnimatedContainer(
        duration: const Duration(milliseconds: 800),
        decoration: BoxDecoration(gradient: _currentTheme.gradient),
        child: _screens[_currentIndex],
      ),
      bottomNavigationBar: _buildBottomNav(),
    );
  }

  Widget _buildBottomNav() {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.backgroundCard,
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.3), blurRadius: 20, offset: const Offset(0, -5))],
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildNavItem(0, Icons.home_rounded, 'Home'),
              _buildNavItem(1, Icons.tag_rounded, 'Channels'),
              _buildNavItem(2, Icons.checklist_rounded, 'To-Do'),
              _buildNavItem(3, Icons.task_alt_rounded, 'Tasks'),
              _buildNavItem(4, Icons.person_rounded, 'Profile'),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(int index, IconData icon, String label) {
    final isSelected = _currentIndex == index;
    final color = isSelected ? _currentTheme.primaryColor : AppTheme.textMuted;
    return GestureDetector(
      onTap: () => setState(() => _currentIndex = index),
      behavior: HitTestBehavior.opaque,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected ? _currentTheme.primaryColor.withOpacity(0.15) : Colors.transparent,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          Icon(icon, color: color, size: 22),
          const SizedBox(height: 3),
          Text(label, style: TextStyle(fontSize: 10, fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal, color: color)),
        ]),
      ),
    );
  }
}

/// Home Content with dynamic time-based UI
class HomeContent extends StatelessWidget {
  final Function(int) onNavigate;
  const HomeContent({super.key, required this.onNavigate});

  @override
  Widget build(BuildContext context) {
    final theme = TimeTheme.current;
    return SafeArea(
      child: RefreshIndicator(
        color: theme.primaryColor,
        onRefresh: () async {
          await context.read<ChannelProvider>().loadWorkspaces();
          await context.read<TaskProvider>().loadTasks();
        },
        child: CustomScrollView(
          slivers: [
            SliverToBoxAdapter(child: _buildAppBar(context, theme)),
            SliverToBoxAdapter(child: _buildWelcomeSection(context, theme)),
            SliverToBoxAdapter(child: _buildQuickStats(context, theme)),
            SliverToBoxAdapter(child: _buildSectionHeader(context, 'Recent Channels', Icons.tag_rounded, 1, theme)),
            SliverToBoxAdapter(child: _buildChannelsSection(context, theme)),
            SliverToBoxAdapter(child: _buildSectionHeader(context, 'My Tasks', Icons.task_alt_rounded, 3, theme)),
            SliverToBoxAdapter(child: _buildTasksSection(context, theme)),
            const SliverToBoxAdapter(child: SizedBox(height: 100)),
          ],
        ),
      ),
    );
  }

  Widget _buildAppBar(BuildContext context, TimeTheme theme) {
    final user = context.watch<AuthProvider>().user;
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Row(children: [
        Container(
          width: 48, height: 48,
          decoration: BoxDecoration(
            gradient: theme.cardGradient, borderRadius: BorderRadius.circular(14),
            boxShadow: [BoxShadow(color: theme.primaryColor.withOpacity(0.3), blurRadius: 10, offset: const Offset(0, 4))],
          ),
          child: Center(child: Text(user?.initials ?? '?', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18))),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Text('${theme.greeting} ', style: TextStyle(fontSize: 13, color: AppTheme.textSecondary.withOpacity(0.8))),
              Text(theme.emoji, style: const TextStyle(fontSize: 16)),
            ]),
            Text(user?.name ?? 'User', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
          ]),
        ),
        Container(
          decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(12)),
          child: IconButton(
            icon: Stack(children: [
              Icon(Icons.notifications_outlined, color: theme.primaryColor),
              Positioned(right: 0, top: 0, child: Container(width: 8, height: 8, decoration: BoxDecoration(color: theme.primaryColor, shape: BoxShape.circle))),
            ]),
            onPressed: () {},
          ),
        ),
      ]),
    );
  }

  Widget _buildWelcomeSection(BuildContext context, TimeTheme theme) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 500),
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          gradient: theme.cardGradient, borderRadius: BorderRadius.circular(20),
          boxShadow: [BoxShadow(color: theme.primaryColor.withOpacity(0.3), blurRadius: 20, offset: const Offset(0, 10))],
        ),
        child: Row(children: [
          Expanded(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text('${theme.greeting}!', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
              const SizedBox(height: 8),
              Text(theme.subtitle, style: TextStyle(fontSize: 14, color: Colors.white.withOpacity(0.9))),
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(20)),
                child: Text(_getCurrentTime(), style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Colors.white)),
              ),
            ]),
          ),
          Container(
            width: 70, height: 70,
            decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(16)),
            child: Center(child: Icon(theme.icon, color: Colors.white, size: 36)),
          ),
        ]),
      ),
    );
  }

  String _getCurrentTime() {
    final now = DateTime.now();
    final hour = now.hour > 12 ? now.hour - 12 : (now.hour == 0 ? 12 : now.hour);
    final period = now.hour >= 12 ? 'PM' : 'AM';
    return '${hour.toString().padLeft(2, '0')}:${now.minute.toString().padLeft(2, '0')} $period';
  }

  Widget _buildQuickStats(BuildContext context, TimeTheme theme) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Consumer<TaskProvider>(
        builder: (context, taskProvider, _) {
          return Row(children: [
            _buildStatCard('To Do', taskProvider.todoCount.toString(), Icons.pending_actions_rounded, AppTheme.warning),
            const SizedBox(width: 12),
            _buildStatCard('In Progress', taskProvider.inProgressCount.toString(), Icons.trending_up_rounded, theme.primaryColor),
            const SizedBox(width: 12),
            _buildStatCard('Completed', taskProvider.completedCount.toString(), Icons.check_circle_rounded, AppTheme.success),
          ]);
        },
      ),
    );
  }

  Widget _buildStatCard(String title, String count, IconData icon, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(color: AppTheme.backgroundCard, borderRadius: BorderRadius.circular(16)),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Container(
            width: 32, height: 32,
            decoration: BoxDecoration(color: color.withOpacity(0.15), borderRadius: BorderRadius.circular(8)),
            child: Icon(icon, color: color, size: 18),
          ),
          const SizedBox(height: 10),
          Text(count, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
          Text(title, style: TextStyle(fontSize: 11, color: AppTheme.textSecondary.withOpacity(0.7))),
        ]),
      ),
    );
  }

  Widget _buildSectionHeader(BuildContext context, String title, IconData icon, int tabIndex, TimeTheme theme) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 8, 20, 12),
      child: Row(children: [
        Icon(icon, color: theme.primaryColor, size: 20),
        const SizedBox(width: 8),
        Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
        const Spacer(),
        TextButton(
          onPressed: () => onNavigate(tabIndex),
          child: Text('See All', style: TextStyle(fontSize: 13, color: theme.primaryColor)),
        ),
      ]),
    );
  }

  Widget _buildChannelsSection(BuildContext context, TimeTheme theme) {
    return Consumer<ChannelProvider>(
      builder: (context, provider, _) {
        if (provider.isLoading && provider.channels.isEmpty) {
          return SizedBox(height: 110, child: Center(child: CircularProgressIndicator(color: theme.primaryColor, strokeWidth: 2)));
        }

        final channels = provider.channels.take(5).toList();
        
        if (channels.isEmpty) {
          return _buildEmptyChannels(theme);
        }

        return SizedBox(
          height: 110,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 20),
            itemCount: channels.length,
            itemBuilder: (context, index) => _buildChannelCard(context, channels[index], theme),
          ),
        );
      },
    );
  }

  Widget _buildEmptyChannels(TimeTheme theme) {
    return Container(
      height: 110,
      margin: const EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(color: AppTheme.backgroundCard, borderRadius: BorderRadius.circular(16)),
      child: Center(
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Icon(Icons.tag_rounded, size: 32, color: AppTheme.textMuted.withOpacity(0.3)),
          const SizedBox(height: 8),
          Text('No channels yet', style: TextStyle(fontSize: 13, color: AppTheme.textSecondary.withOpacity(0.7))),
        ]),
      ),
    );
  }

  Widget _buildChannelCard(BuildContext context, Channel channel, TimeTheme theme) {
    final icons = {'general': '💬', 'design': '🎨', 'development': '💻', 'marketing': '📢', 'random': '🎲', 'support': '🎧'};
    final icon = icons[channel.name] ?? '#';
    
    return GestureDetector(
      onTap: () {
        context.read<ChannelProvider>().selectChannel(channel);
        Navigator.push(context, MaterialPageRoute(builder: (_) => ChannelChatScreen(channel: channel)));
      },
      child: Container(
        width: 130,
        margin: const EdgeInsets.only(right: 12),
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: AppTheme.backgroundCard, borderRadius: BorderRadius.circular(16),
          border: channel.unreadCount > 0 ? Border.all(color: theme.primaryColor.withOpacity(0.5)) : null,
        ),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
          Row(children: [
            Text(icon, style: const TextStyle(fontSize: 20)),
            const Spacer(),
            if (channel.unreadCount > 0)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(color: theme.primaryColor, borderRadius: BorderRadius.circular(8)),
                child: Text('${channel.unreadCount}', style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
              ),
          ]),
          const Spacer(),
          Text('#${channel.displayName ?? channel.name}', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppTheme.textPrimary), maxLines: 1, overflow: TextOverflow.ellipsis),
          const SizedBox(height: 4),
          Row(children: [
            Container(width: 6, height: 6, decoration: BoxDecoration(color: theme.primaryColor, shape: BoxShape.circle)),
            const SizedBox(width: 4),
            Expanded(child: Text('${channel.members.length} members', style: TextStyle(fontSize: 10, color: AppTheme.textMuted.withOpacity(0.7)), maxLines: 1, overflow: TextOverflow.ellipsis)),
          ]),
        ]),
      ),
    );
  }

  Widget _buildTasksSection(BuildContext context, TimeTheme theme) {
    return Consumer<TaskProvider>(
      builder: (context, taskProvider, _) {
        if (taskProvider.isLoading) {
          return Center(child: Padding(padding: const EdgeInsets.all(40), child: CircularProgressIndicator(color: theme.primaryColor)));
        }

        final tasks = taskProvider.tasks.take(3).toList();

        if (tasks.isEmpty) {
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
            child: Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(color: AppTheme.backgroundCard, borderRadius: BorderRadius.circular(16)),
              child: Column(children: [
                Icon(Icons.task_alt_rounded, color: theme.primaryColor.withOpacity(0.5), size: 48),
                const SizedBox(height: 16),
                const Text('No tasks assigned', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
                const SizedBox(height: 8),
                Text('Your tasks will appear here', style: TextStyle(fontSize: 13, color: AppTheme.textSecondary.withOpacity(0.7))),
              ]),
            ),
          );
        }

        return ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          padding: const EdgeInsets.symmetric(horizontal: 20),
          itemCount: tasks.length,
          itemBuilder: (context, index) => _buildTaskCard(tasks[index], theme),
        );
      },
    );
  }

  Widget _buildTaskCard(Task task, TimeTheme theme) {
    Color statusColor = AppTheme.textMuted;
    if (task.status == 'in-progress') statusColor = theme.primaryColor;
    if (task.status == 'review') statusColor = AppTheme.warning;
    if (task.status == 'completed') statusColor = AppTheme.success;

    Color priorityColor = AppTheme.textMuted;
    if (task.priority == 'urgent') priorityColor = AppTheme.error;
    if (task.priority == 'high') priorityColor = AppTheme.warning;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: AppTheme.backgroundCard, borderRadius: BorderRadius.circular(16)),
      child: Row(children: [
        Container(width: 4, height: 50, decoration: BoxDecoration(color: statusColor, borderRadius: BorderRadius.circular(2))),
        const SizedBox(width: 16),
        Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Expanded(child: Text(task.title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: AppTheme.textPrimary), maxLines: 1, overflow: TextOverflow.ellipsis)),
              if (task.isHighPriority)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(color: priorityColor.withOpacity(0.15), borderRadius: BorderRadius.circular(6)),
                  child: Text(task.priority.toUpperCase(), style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: priorityColor)),
                ),
            ]),
            if (task.description != null) ...[
              const SizedBox(height: 6),
              Text(task.description!, style: TextStyle(fontSize: 13, color: AppTheme.textSecondary.withOpacity(0.7)), maxLines: 1, overflow: TextOverflow.ellipsis),
            ],
            const SizedBox(height: 8),
            Row(children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(color: statusColor.withOpacity(0.15), borderRadius: BorderRadius.circular(6)),
                child: Text(task.status.replaceAll('-', ' ').toUpperCase(), style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: statusColor)),
              ),
              if (task.dueDate != null) ...[
                const SizedBox(width: 12),
                Icon(Icons.schedule, size: 14, color: task.isOverdue ? AppTheme.error : AppTheme.textMuted),
                const SizedBox(width: 4),
                Text(_formatDate(task.dueDate!), style: TextStyle(fontSize: 12, color: task.isOverdue ? AppTheme.error : AppTheme.textMuted)),
              ],
            ]),
          ]),
        ),
        const Icon(Icons.chevron_right, color: AppTheme.textMuted),
      ]),
    );
  }

  String _formatDate(DateTime date) {
    final now = DateTime.now();
    final diff = date.difference(now);
    if (diff.isNegative) return 'Overdue';
    if (diff.inDays == 0) return 'Today';
    if (diff.inDays == 1) return 'Tomorrow';
    if (diff.inDays < 7) return 'In ${diff.inDays} days';
    return '${date.day}/${date.month}';
  }
}
