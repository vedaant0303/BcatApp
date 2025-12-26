import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/task_provider.dart';
import '../../providers/auth_provider.dart';
import '../../providers/employee_provider.dart';
import '../../theme/app_theme.dart';
import '../../theme/time_theme.dart';
import '../../models/task.dart';
import '../../models/user.dart';

class TasksScreen extends StatefulWidget {
  const TasksScreen({super.key});

  @override
  State<TasksScreen> createState() => _TasksScreenState();
}

class _TasksScreenState extends State<TasksScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
    _tabController.addListener(() => setState(() {}));
    context.read<TaskProvider>().loadTasks();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isAdmin = context.watch<AuthProvider>().user?.role == 'admin';
    final theme = TimeTheme.current;
    
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(gradient: AppTheme.backgroundGradient),
        child: SafeArea(
          child: Column(children: [
            _buildHeader(),
            _buildTabs(),
            Expanded(child: _buildTasksList()),
          ]),
        ),
      ),
      floatingActionButton: isAdmin ? FloatingActionButton.extended(
        onPressed: _showCreateTaskDialog,
        backgroundColor: theme.primaryColor,
        icon: const Icon(Icons.add),
        label: const Text('New Task'),
      ) : null,
    );
  }

  Widget _buildHeader() {
    final theme = TimeTheme.current;
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Row(children: [
        Container(
          width: 44, height: 44,
          decoration: BoxDecoration(gradient: theme.cardGradient, borderRadius: BorderRadius.circular(12)),
          child: const Icon(Icons.task_alt_rounded, color: Colors.white, size: 24),
        ),
        const SizedBox(width: 12),
        const Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text('My Tasks', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
            Text('Track your assignments', style: TextStyle(fontSize: 13, color: AppTheme.textSecondary)),
          ]),
        ),
        IconButton(
          onPressed: () => context.read<TaskProvider>().loadTasks(),
          style: IconButton.styleFrom(backgroundColor: AppTheme.surfaceColor, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
          icon: Icon(Icons.refresh, color: theme.primaryColor),
        ),
      ]),
    );
  }

  Widget _buildTabs() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(12)),
      child: TabBar(
        controller: _tabController,
        indicator: BoxDecoration(color: AppTheme.primaryColor, borderRadius: BorderRadius.circular(10)),
        labelColor: Colors.white, unselectedLabelColor: AppTheme.textMuted,
        labelStyle: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600),
        dividerColor: Colors.transparent, indicatorSize: TabBarIndicatorSize.tab,
        padding: const EdgeInsets.all(4),
        tabs: const [Tab(text: 'All'), Tab(text: 'To Do'), Tab(text: 'Progress'), Tab(text: 'Done')],
      ),
    );
  }

  Widget _buildTasksList() {
    return Consumer<TaskProvider>(
      builder: (context, taskProvider, _) {
        if (taskProvider.isLoading) {
          return const Center(child: CircularProgressIndicator(color: AppTheme.primaryColor));
        }

        List<Task> tasks = taskProvider.tasks;
        switch (_tabController.index) {
          case 1: tasks = taskProvider.todoTasks; break;
          case 2: tasks = taskProvider.inProgressTasks; break;
          case 3: tasks = taskProvider.completedTasks; break;
        }

        if (tasks.isEmpty) {
          return Center(
            child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              Icon(Icons.task_alt_rounded, size: 64, color: AppTheme.textMuted.withOpacity(0.3)),
              const SizedBox(height: 16),
              const Text('No tasks', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
              const SizedBox(height: 8),
              Text('Tasks will appear here', style: TextStyle(fontSize: 14, color: AppTheme.textSecondary.withOpacity(0.7))),
            ]),
          );
        }

        return RefreshIndicator(
          onRefresh: () async => taskProvider.loadTasks(),
          child: ListView.builder(
            padding: const EdgeInsets.all(20), itemCount: tasks.length,
            itemBuilder: (context, index) => _buildTaskCard(tasks[index]),
          ),
        );
      },
    );
  }

  Widget _buildTaskCard(Task task) {
    Color statusColor = AppTheme.textMuted;
    if (task.status == 'in-progress') statusColor = AppTheme.info;
    if (task.status == 'review') statusColor = AppTheme.warning;
    if (task.status == 'completed') statusColor = AppTheme.success;

    return GestureDetector(
      onTap: () => _showTaskDetails(task),
      child: Container(
        margin: const EdgeInsets.only(bottom: 12), padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(color: AppTheme.backgroundCard, borderRadius: BorderRadius.circular(16)),
        child: Row(children: [
          Container(width: 4, height: 60, decoration: BoxDecoration(color: statusColor, borderRadius: BorderRadius.circular(2))),
          const SizedBox(width: 16),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(task.title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
            if (task.description != null) Padding(
              padding: const EdgeInsets.only(top: 4),
              child: Text(task.description!, style: TextStyle(fontSize: 13, color: AppTheme.textSecondary.withOpacity(0.7)), maxLines: 1, overflow: TextOverflow.ellipsis),
            ),
            const SizedBox(height: 8),
            Row(children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(color: statusColor.withOpacity(0.15), borderRadius: BorderRadius.circular(6)),
                child: Text(task.status.replaceAll('-', ' ').toUpperCase(), style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: statusColor)),
              ),
              if (task.isHighPriority) Container(
                margin: const EdgeInsets.only(left: 8),
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(color: AppTheme.error.withOpacity(0.15), borderRadius: BorderRadius.circular(6)),
                child: Text(task.priority.toUpperCase(), style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: AppTheme.error)),
              ),
              if (task.dueDate != null) ...[
                const SizedBox(width: 8),
                Icon(Icons.schedule, size: 12, color: task.isOverdue ? AppTheme.error : AppTheme.textMuted),
                const SizedBox(width: 4),
                Text(_formatDate(task.dueDate!), style: TextStyle(fontSize: 10, color: task.isOverdue ? AppTheme.error : AppTheme.textMuted)),
              ],
            ]),
          ])),
          const Icon(Icons.chevron_right, color: AppTheme.textMuted),
        ]),
      ),
    );
  }

  void _showTaskDetails(Task task) {
    // Load full task details
    context.read<TaskProvider>().loadTask(task.id);
    
    showModalBottomSheet(
      context: context, isScrollControlled: true, backgroundColor: AppTheme.backgroundCard,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) => TaskDetailSheet(taskId: task.id),
    );
  }

  void _showCreateTaskDialog() {
    // First load employees for the dropdown
    context.read<EmployeeProvider>().loadEmployees();
    
    showModalBottomSheet(
      context: context, isScrollControlled: true, backgroundColor: AppTheme.backgroundCard,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) => const CreateTaskSheet(),
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

/// Task Detail Bottom Sheet with comments
class TaskDetailSheet extends StatefulWidget {
  final String taskId;
  const TaskDetailSheet({super.key, required this.taskId});

  @override
  State<TaskDetailSheet> createState() => _TaskDetailSheetState();
}

class _TaskDetailSheetState extends State<TaskDetailSheet> {
  final TextEditingController _commentController = TextEditingController();
  String? _selectedStatus;

  @override
  void dispose() {
    _commentController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return DraggableScrollableSheet(
      initialChildSize: 0.85, minChildSize: 0.5, maxChildSize: 0.95,
      expand: false,
      builder: (context, scrollController) => Consumer<TaskProvider>(
        builder: (context, provider, _) {
          final task = provider.currentTask;
          if (task == null || provider.isLoading) {
            return const Center(child: CircularProgressIndicator(color: AppTheme.primaryColor));
          }

          _selectedStatus ??= task.status;

          Color statusColor = AppTheme.textMuted;
          if (task.status == 'in-progress') statusColor = AppTheme.info;
          if (task.status == 'review') statusColor = AppTheme.warning;
          if (task.status == 'completed') statusColor = AppTheme.success;

          return SingleChildScrollView(
            controller: scrollController,
            padding: const EdgeInsets.all(24),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: AppTheme.surfaceLight, borderRadius: BorderRadius.circular(2)))),
              const SizedBox(height: 24),
              // Header
              Row(children: [
                Container(
                  width: 56, height: 56,
                  decoration: BoxDecoration(color: statusColor.withOpacity(0.15), borderRadius: BorderRadius.circular(14)),
                  child: Icon(Icons.task_alt, color: statusColor, size: 28),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(task.title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
                    const SizedBox(height: 4),
                    Row(children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(color: statusColor.withOpacity(0.15), borderRadius: BorderRadius.circular(6)),
                        child: Text(task.status.replaceAll('-', ' ').toUpperCase(), style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: statusColor)),
                      ),
                      if (task.isHighPriority) Container(
                        margin: const EdgeInsets.only(left: 8),
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(color: AppTheme.error.withOpacity(0.15), borderRadius: BorderRadius.circular(6)),
                        child: Text(task.priority.toUpperCase(), style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: AppTheme.error)),
                      ),
                    ]),
                  ]),
                ),
              ]),
              // Description
              if (task.description != null && task.description!.isNotEmpty) ...[
                const SizedBox(height: 20),
                const Text('Description', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(12)),
                  child: Text(task.description!, style: const TextStyle(fontSize: 14, color: AppTheme.textSecondary)),
                ),
              ],
              // Info
              const SizedBox(height: 20),
              _buildInfoRow(Icons.person, 'Assigned to', task.assignedToDetails?.name ?? 'Unknown'),
              if (task.assignedByDetails != null) _buildInfoRow(Icons.person_outline, 'Assigned by', task.assignedByDetails!.name),
              if (task.dueDate != null) _buildInfoRow(Icons.schedule, 'Due date', _formatFullDate(task.dueDate!)),
              // Status Update Section
              const SizedBox(height: 20),
              const Text('Update Status', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
              const SizedBox(height: 12),
              Row(children: [
                _buildStatusButton('todo', 'To Do', AppTheme.textMuted),
                const SizedBox(width: 8),
                _buildStatusButton('in-progress', 'Progress', AppTheme.info),
                const SizedBox(width: 8),
                _buildStatusButton('review', 'Review', AppTheme.warning),
                const SizedBox(width: 8),
                _buildStatusButton('completed', 'Done', AppTheme.success),
              ]),
              // Comments Section
              const SizedBox(height: 24),
              Row(children: [
                const Text('Comments', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
                const Spacer(),
                Text('${task.comments.length}', style: TextStyle(fontSize: 12, color: AppTheme.textSecondary.withOpacity(0.7))),
              ]),
              const SizedBox(height: 12),
              // Comment Input
              Row(children: [
                Expanded(
                  child: Container(
                    decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(12)),
                    child: TextField(
                      controller: _commentController,
                      style: const TextStyle(color: AppTheme.textPrimary, fontSize: 14),
                      decoration: const InputDecoration(
                        hintText: 'Add a comment...', hintStyle: TextStyle(color: AppTheme.textMuted),
                        border: InputBorder.none, contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Container(
                  decoration: BoxDecoration(gradient: AppTheme.primaryGradient, borderRadius: BorderRadius.circular(12)),
                  child: IconButton(
                    onPressed: _addComment,
                    icon: const Icon(Icons.send, color: Colors.white, size: 20),
                  ),
                ),
              ]),
              const SizedBox(height: 16),
              // Comments List
              if (task.comments.isNotEmpty)
                ...task.comments.map((comment) => _buildCommentItem(comment)).toList()
              else
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(12)),
                  child: Center(child: Text('No comments yet', style: TextStyle(color: AppTheme.textMuted.withOpacity(0.7)))),
                ),
              const SizedBox(height: 40),
            ]),
          );
        },
      ),
    );
  }

  Widget _buildInfoRow(IconData icon, String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(children: [
        Container(
          width: 36, height: 36,
          decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(10)),
          child: Icon(icon, color: AppTheme.primaryColor, size: 18),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(label, style: TextStyle(fontSize: 11, color: AppTheme.textMuted.withOpacity(0.7))),
            Text(value, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: AppTheme.textPrimary)),
          ]),
        ),
      ]),
    );
  }

  Widget _buildStatusButton(String status, String label, Color color) {
    final isSelected = _selectedStatus == status;
    return Expanded(
      child: GestureDetector(
        onTap: () => _updateStatus(status),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 10),
          decoration: BoxDecoration(
            color: isSelected ? color : color.withOpacity(0.1),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Center(
            child: Text(label, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: isSelected ? Colors.white : color)),
          ),
        ),
      ),
    );
  }

  Widget _buildCommentItem(TaskComment comment) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(12)),
      child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Container(
          width: 32, height: 32,
          decoration: BoxDecoration(gradient: AppTheme.primaryGradient, borderRadius: BorderRadius.circular(8)),
          child: Center(child: Text(comment.userDetails?.name.isNotEmpty == true ? comment.userDetails!.name[0].toUpperCase() : '?', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12))),
        ),
        const SizedBox(width: 10),
        Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Text(comment.userDetails?.name ?? 'Unknown', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
              const Spacer(),
              Text(_formatTimeAgo(comment.createdAt), style: TextStyle(fontSize: 10, color: AppTheme.textMuted.withOpacity(0.7))),
            ]),
            const SizedBox(height: 4),
            Text(comment.text, style: const TextStyle(fontSize: 13, color: AppTheme.textSecondary)),
          ]),
        ),
      ]),
    );
  }

  void _updateStatus(String status) async {
    setState(() => _selectedStatus = status);
    final success = await context.read<TaskProvider>().updateTaskStatus(widget.taskId, status);
    if (success && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Status updated to ${status.replaceAll('-', ' ')}'), backgroundColor: AppTheme.success));
    }
  }

  void _addComment() async {
    final text = _commentController.text.trim();
    if (text.isEmpty) return;
    
    _commentController.clear();
    final success = await context.read<TaskProvider>().addComment(widget.taskId, text);
    if (!success && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Failed to add comment'), backgroundColor: AppTheme.error));
    }
  }

  String _formatFullDate(DateTime date) {
    return '${date.day}/${date.month}/${date.year}';
  }

  String _formatTimeAgo(DateTime? time) {
    if (time == null) return '';
    final diff = DateTime.now().difference(time);
    if (diff.inMinutes < 1) return 'Just now';
    if (diff.inHours < 1) return '${diff.inMinutes}m ago';
    if (diff.inDays < 1) return '${diff.inHours}h ago';
    if (diff.inDays < 7) return '${diff.inDays}d ago';
    return '${time.day}/${time.month}';
  }
}

/// Create Task Bottom Sheet (Admin only)
class CreateTaskSheet extends StatefulWidget {
  const CreateTaskSheet({super.key});

  @override
  State<CreateTaskSheet> createState() => _CreateTaskSheetState();
}

class _CreateTaskSheetState extends State<CreateTaskSheet> {
  final _titleController = TextEditingController();
  final _descController = TextEditingController();
  String? _selectedEmployee;
  String _priority = 'medium';
  DateTime? _dueDate;

  @override
  void dispose() {
    _titleController.dispose();
    _descController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(left: 24, right: 24, top: 24, bottom: MediaQuery.of(context).viewInsets.bottom + 24),
      child: SingleChildScrollView(
        child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
          Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: AppTheme.surfaceLight, borderRadius: BorderRadius.circular(2)))),
          const SizedBox(height: 24),
          const Text('Create New Task', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
          const SizedBox(height: 24),
          // Title
          TextField(
            controller: _titleController,
            style: const TextStyle(color: AppTheme.textPrimary),
            decoration: InputDecoration(
              labelText: 'Task Title *', prefixIcon: const Icon(Icons.title, size: 20),
              filled: true, fillColor: AppTheme.surfaceColor,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
            ),
          ),
          const SizedBox(height: 12),
          // Description
          TextField(
            controller: _descController,
            style: const TextStyle(color: AppTheme.textPrimary),
            maxLines: 2,
            decoration: InputDecoration(
              labelText: 'Description', prefixIcon: const Icon(Icons.description, size: 20),
              filled: true, fillColor: AppTheme.surfaceColor,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
            ),
          ),
          const SizedBox(height: 12),
          // Assign To Dropdown
          Consumer<EmployeeProvider>(
            builder: (context, provider, _) {
              if (provider.isLoading) {
                return const Center(child: Padding(padding: EdgeInsets.all(16), child: CircularProgressIndicator(color: AppTheme.primaryColor, strokeWidth: 2)));
              }
              return Container(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(12)),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: _selectedEmployee,
                    hint: const Text('Assign to *', style: TextStyle(color: AppTheme.textMuted)),
                    isExpanded: true,
                    dropdownColor: AppTheme.backgroundCard,
                    icon: const Icon(Icons.arrow_drop_down, color: AppTheme.textMuted),
                    items: provider.employees.map((emp) => DropdownMenuItem(value: emp.id, child: Text(emp.name, style: const TextStyle(color: AppTheme.textPrimary)))).toList(),
                    onChanged: (value) => setState(() => _selectedEmployee = value),
                  ),
                ),
              );
            },
          ),
          const SizedBox(height: 12),
          // Priority Selection
          const Text('Priority', style: TextStyle(fontSize: 12, color: AppTheme.textSecondary)),
          const SizedBox(height: 8),
          Row(children: [
            _buildPriorityChip('low', 'Low', AppTheme.textMuted),
            const SizedBox(width: 8),
            _buildPriorityChip('medium', 'Medium', AppTheme.info),
            const SizedBox(width: 8),
            _buildPriorityChip('high', 'High', AppTheme.warning),
            const SizedBox(width: 8),
            _buildPriorityChip('urgent', 'Urgent', AppTheme.error),
          ]),
          const SizedBox(height: 16),
          // Due Date
          GestureDetector(
            onTap: _selectDueDate,
            child: Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(12)),
              child: Row(children: [
                const Icon(Icons.calendar_today, color: AppTheme.primaryColor, size: 20),
                const SizedBox(width: 12),
                Text(_dueDate != null ? 'Due: ${_dueDate!.day}/${_dueDate!.month}/${_dueDate!.year}' : 'Set Due Date', style: TextStyle(color: _dueDate != null ? AppTheme.textPrimary : AppTheme.textMuted)),
              ]),
            ),
          ),
          const SizedBox(height: 24),
          // Create Button
          SizedBox(
            width: double.infinity, height: 52,
            child: ElevatedButton(
              onPressed: _createTask,
              child: const Text('Create Task', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
            ),
          ),
        ]),
      ),
    );
  }

  Widget _buildPriorityChip(String value, String label, Color color) {
    final isSelected = _priority == value;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _priority = value),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 10),
          decoration: BoxDecoration(
            color: isSelected ? color : color.withOpacity(0.1),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Center(child: Text(label, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: isSelected ? Colors.white : color))),
        ),
      ),
    );
  }

  void _selectDueDate() async {
    final date = await showDatePicker(
      context: context,
      initialDate: DateTime.now().add(const Duration(days: 1)),
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 365)),
      builder: (context, child) => Theme(
        data: ThemeData.dark().copyWith(colorScheme: const ColorScheme.dark(primary: AppTheme.primaryColor, surface: AppTheme.backgroundCard)),
        child: child!,
      ),
    );
    if (date != null) setState(() => _dueDate = date);
  }

  void _createTask() async {
    if (_titleController.text.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Title is required'), backgroundColor: AppTheme.error));
      return;
    }
    if (_selectedEmployee == null) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Please assign the task to someone'), backgroundColor: AppTheme.error));
      return;
    }

    Navigator.pop(context);
    
    final task = await context.read<TaskProvider>().createTask(
      title: _titleController.text.trim(),
      assignedTo: _selectedEmployee!,
      description: _descController.text.trim().isNotEmpty ? _descController.text.trim() : null,
      priority: _priority,
      dueDate: _dueDate,
    );

    if (task != null && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Task created successfully!'), backgroundColor: AppTheme.success));
    }
  }
}
