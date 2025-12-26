import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/todo_provider.dart';
import '../../models/todo.dart';
import '../../theme/app_theme.dart';
import '../../theme/time_theme.dart';

class TodoScreen extends StatefulWidget {
  const TodoScreen({super.key});

  @override
  State<TodoScreen> createState() => _TodoScreenState();
}

class _TodoScreenState extends State<TodoScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  String _selectedCategory = 'all';

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
    _loadTodos();
  }

  void _loadTodos() {
    context.read<TodoProvider>().loadTodos();
    context.read<TodoProvider>().loadStats();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(gradient: AppTheme.backgroundGradient),
        child: SafeArea(
          child: Column(
            children: [
              _buildHeader(),
              _buildStats(),
              _buildCategoryChips(),
              Expanded(child: _buildTodoList()),
            ],
          ),
        ),
      ),
      floatingActionButton: _buildFAB(),
    );
  }

  Widget _buildHeader() {
    final theme = TimeTheme.current;
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Row(
        children: [
          Container(
            width: 44, height: 44,
            decoration: BoxDecoration(gradient: theme.cardGradient, borderRadius: BorderRadius.circular(12)),
            child: const Icon(Icons.checklist_rounded, color: Colors.white, size: 24),
          ),
          const SizedBox(width: 12),
          const Expanded(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text('To-Do Lists', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
              Text('Manage your tasks', style: TextStyle(fontSize: 13, color: AppTheme.textSecondary)),
            ]),
          ),
          IconButton(
            onPressed: _loadTodos,
            style: IconButton.styleFrom(backgroundColor: AppTheme.surfaceColor, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
            icon: Icon(Icons.refresh, color: theme.primaryColor),
          ),
        ],
      ),
    );
  }

  Widget _buildStats() {
    return Consumer<TodoProvider>(
      builder: (context, provider, _) {
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(children: [
            _buildStatCard('Lists', provider.totalLists.toString(), Icons.list_alt, AppTheme.primaryColor),
            const SizedBox(width: 12),
            _buildStatCard('Pending', provider.pendingItems.toString(), Icons.pending_actions, AppTheme.warning),
            const SizedBox(width: 12),
            _buildStatCard('Done', provider.completedItems.toString(), Icons.check_circle, AppTheme.success),
          ]),
        );
      },
    );
  }

  Widget _buildStatCard(String label, String value, IconData icon, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(color: AppTheme.backgroundCard, borderRadius: BorderRadius.circular(14)),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          Container(
            width: 32, height: 32,
            decoration: BoxDecoration(color: color.withOpacity(0.15), borderRadius: BorderRadius.circular(8)),
            child: Icon(icon, color: color, size: 16),
          ),
          const SizedBox(height: 8),
          Text(value, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
          Text(label, style: TextStyle(fontSize: 10, color: AppTheme.textSecondary.withOpacity(0.7))),
        ]),
      ),
    );
  }

  Widget _buildCategoryChips() {
    final categories = [
      {'id': 'all', 'label': 'All', 'icon': '📋'},
      {'id': 'work', 'label': 'Work', 'icon': '💼'},
      {'id': 'personal', 'label': 'Personal', 'icon': '🏠'},
      {'id': 'daily', 'label': 'Daily', 'icon': '📆'},
    ];

    return Container(
      height: 50, margin: const EdgeInsets.symmetric(vertical: 16),
      child: ListView.separated(
        scrollDirection: Axis.horizontal, padding: const EdgeInsets.symmetric(horizontal: 20),
        itemCount: categories.length, separatorBuilder: (_, __) => const SizedBox(width: 10),
        itemBuilder: (context, index) {
          final cat = categories[index];
          final isSelected = _selectedCategory == cat['id'];
          return GestureDetector(
            onTap: () => setState(() => _selectedCategory = cat['id']!),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              decoration: BoxDecoration(
                color: isSelected ? AppTheme.primaryColor : AppTheme.surfaceColor,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(children: [
                Text(cat['icon']!, style: const TextStyle(fontSize: 16)),
                const SizedBox(width: 8),
                Text(cat['label']!, style: TextStyle(color: isSelected ? Colors.white : AppTheme.textSecondary, fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal)),
              ]),
            ),
          );
        },
      ),
    );
  }

  Widget _buildTodoList() {
    return Consumer<TodoProvider>(
      builder: (context, provider, _) {
        if (provider.isLoading) {
          return const Center(child: CircularProgressIndicator(color: AppTheme.primaryColor));
        }

        List<TodoList> todos = _selectedCategory == 'all' 
            ? provider.activeTodos
            : provider.activeTodos.where((t) => t.category == _selectedCategory).toList();

        // Sort: pinned first
        todos.sort((a, b) {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return 0;
        });

        if (todos.isEmpty) {
          return Center(
            child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              Icon(Icons.checklist, size: 64, color: AppTheme.textMuted.withOpacity(0.3)),
              const SizedBox(height: 16),
              const Text('No to-do lists', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
              const SizedBox(height: 8),
              Text('Tap + to create one', style: TextStyle(fontSize: 14, color: AppTheme.textSecondary.withOpacity(0.7))),
            ]),
          );
        }

        return RefreshIndicator(
          onRefresh: () async => _loadTodos(),
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            itemCount: todos.length,
            itemBuilder: (context, index) => _buildTodoCard(todos[index]),
          ),
        );
      },
    );
  }

  Widget _buildTodoCard(TodoList todo) {
    return GestureDetector(
      onTap: () => _navigateToTodoDetail(todo),
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppTheme.backgroundCard,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Color(int.parse(todo.color.replaceFirst('#', '0xFF'))).withOpacity(0.3)),
        ),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Text(todo.icon, style: const TextStyle(fontSize: 24)),
            const SizedBox(width: 12),
            Expanded(
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [
                  if (todo.isPinned) const Icon(Icons.push_pin, size: 14, color: AppTheme.primaryColor),
                  if (todo.isPinned) const SizedBox(width: 4),
                  Expanded(child: Text(todo.title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: AppTheme.textPrimary))),
                ]),
                if (todo.description != null)
                  Text(todo.description!, style: TextStyle(fontSize: 13, color: AppTheme.textSecondary.withOpacity(0.7)), maxLines: 1, overflow: TextOverflow.ellipsis),
              ]),
            ),
            _buildProgressCircle(todo),
          ]),
          const SizedBox(height: 12),
          // Items preview
          if (todo.items.isNotEmpty)
            ...todo.items.take(3).map((item) => _buildItemPreview(item, todo.id)),
          if (todo.items.length > 3)
            Padding(
              padding: const EdgeInsets.only(top: 8),
              child: Text('+${todo.items.length - 3} more items', style: TextStyle(fontSize: 12, color: AppTheme.textMuted.withOpacity(0.7))),
            ),
          const SizedBox(height: 12),
          Row(children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(6)),
              child: Text(todo.category.toUpperCase(), style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: AppTheme.textMuted)),
            ),
            const Spacer(),
            Text('${todo.completedItems}/${todo.totalItems} done', style: TextStyle(fontSize: 12, color: AppTheme.textMuted.withOpacity(0.7))),
          ]),
        ]),
      ),
    );
  }

  Widget _buildProgressCircle(TodoList todo) {
    final progress = todo.progressPercent;
    return SizedBox(
      width: 44, height: 44,
      child: Stack(alignment: Alignment.center, children: [
        CircularProgressIndicator(
          value: progress / 100, strokeWidth: 3,
          backgroundColor: AppTheme.surfaceLight,
          valueColor: AlwaysStoppedAnimation<Color>(progress == 100 ? AppTheme.success : AppTheme.primaryColor),
        ),
        Text('${progress.toInt()}%', style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
      ]),
    );
  }

  Widget _buildItemPreview(TodoItem item, String todoId) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Row(children: [
        GestureDetector(
          onTap: () => context.read<TodoProvider>().toggleItem(todoId, item.id),
          child: Container(
            width: 20, height: 20,
            decoration: BoxDecoration(
              color: item.isCompleted ? AppTheme.success : Colors.transparent,
              borderRadius: BorderRadius.circular(6),
              border: Border.all(color: item.isCompleted ? AppTheme.success : AppTheme.textMuted, width: 2),
            ),
            child: item.isCompleted ? const Icon(Icons.check, size: 14, color: Colors.white) : null,
          ),
        ),
        const SizedBox(width: 10),
        Expanded(
          child: Text(
            item.title,
            style: TextStyle(
              fontSize: 13, color: item.isCompleted ? AppTheme.textMuted : AppTheme.textPrimary,
              decoration: item.isCompleted ? TextDecoration.lineThrough : null,
            ),
            maxLines: 1, overflow: TextOverflow.ellipsis,
          ),
        ),
        if (item.isOverdue)
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
            decoration: BoxDecoration(color: AppTheme.error.withOpacity(0.15), borderRadius: BorderRadius.circular(4)),
            child: const Text('Overdue', style: TextStyle(fontSize: 9, color: AppTheme.error, fontWeight: FontWeight.w600)),
          ),
      ]),
    );
  }

  Widget _buildFAB() {
    return FloatingActionButton.extended(
      onPressed: _showCreateTodoDialog,
      backgroundColor: AppTheme.primaryColor,
      icon: const Icon(Icons.add),
      label: const Text('New List'),
    );
  }

  void _navigateToTodoDetail(TodoList todo) {
    Navigator.push(context, MaterialPageRoute(builder: (_) => TodoDetailScreen(todoId: todo.id)));
  }

  void _showCreateTodoDialog() {
    final titleController = TextEditingController();
    final descController = TextEditingController();
    String selectedCategory = 'work';
    String selectedIcon = '📋';

    showModalBottomSheet(
      context: context, isScrollControlled: true, backgroundColor: AppTheme.backgroundCard,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) => StatefulBuilder(
        builder: (context, setModalState) => Padding(
          padding: EdgeInsets.only(left: 24, right: 24, top: 24, bottom: MediaQuery.of(context).viewInsets.bottom + 24),
          child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
            Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: AppTheme.surfaceLight, borderRadius: BorderRadius.circular(2)))),
            const SizedBox(height: 24),
            const Text('Create To-Do List', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
            const SizedBox(height: 24),
            // Icon picker
            Row(children: [
              const Text('Icon: ', style: TextStyle(color: AppTheme.textSecondary)),
              const SizedBox(width: 8),
              Expanded(
                child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(children: ['📋', '💼', '🏠', '📆', '🎯', '💡', '📚', '🛒'].map((icon) => GestureDetector(
                    onTap: () => setModalState(() => selectedIcon = icon),
                    child: Container(
                      margin: const EdgeInsets.only(right: 6), padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: selectedIcon == icon ? AppTheme.primaryColor.withOpacity(0.2) : Colors.transparent,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(icon, style: const TextStyle(fontSize: 20)),
                    ),
                  )).toList()),
                ),
              ),
            ]),
            const SizedBox(height: 16),
            TextField(
              controller: titleController, style: const TextStyle(color: AppTheme.textPrimary),
              decoration: InputDecoration(labelText: 'Title', hintText: 'e.g., Weekly Tasks', filled: true, fillColor: AppTheme.surfaceColor,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none)),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: descController, style: const TextStyle(color: AppTheme.textPrimary), maxLines: 2,
              decoration: InputDecoration(labelText: 'Description (optional)', filled: true, fillColor: AppTheme.surfaceColor,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none)),
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: selectedCategory, dropdownColor: AppTheme.surfaceColor,
              decoration: InputDecoration(labelText: 'Category', filled: true, fillColor: AppTheme.surfaceColor,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none)),
              items: ['work', 'personal', 'project', 'daily', 'weekly', 'other'].map((c) => DropdownMenuItem(value: c, child: Text(c.toUpperCase(), style: const TextStyle(color: AppTheme.textPrimary)))).toList(),
              onChanged: (val) => setModalState(() => selectedCategory = val!),
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity, height: 52,
              child: ElevatedButton(
                onPressed: () async {
                  if (titleController.text.trim().isEmpty) return;
                  Navigator.pop(context);
                  await context.read<TodoProvider>().createTodo(
                    title: titleController.text.trim(),
                    description: descController.text.trim().isNotEmpty ? descController.text.trim() : null,
                    category: selectedCategory,
                    icon: selectedIcon,
                  );
                },
                child: const Text('Create List', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
              ),
            ),
          ]),
        ),
      ),
    );
  }
}

/// Todo Detail Screen
class TodoDetailScreen extends StatefulWidget {
  final String todoId;
  const TodoDetailScreen({super.key, required this.todoId});

  @override
  State<TodoDetailScreen> createState() => _TodoDetailScreenState();
}

class _TodoDetailScreenState extends State<TodoDetailScreen> {
  @override
  void initState() {
    super.initState();
    context.read<TodoProvider>().getTodoById(widget.todoId);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(gradient: AppTheme.backgroundGradient),
        child: Consumer<TodoProvider>(
          builder: (context, provider, _) {
            final todo = provider.selectedTodo;
            if (todo == null) {
              return const Center(child: CircularProgressIndicator(color: AppTheme.primaryColor));
            }
            return SafeArea(
              child: Column(children: [
                _buildHeader(todo),
                Expanded(child: _buildItemsList(todo)),
              ]),
            );
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _showAddItemDialog,
        backgroundColor: AppTheme.primaryColor,
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildHeader(TodoList todo) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(color: AppTheme.backgroundCard, border: Border(bottom: BorderSide(color: AppTheme.surfaceLight.withOpacity(0.3)))),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          IconButton(onPressed: () => Navigator.pop(context), icon: const Icon(Icons.arrow_back, color: AppTheme.textPrimary)),
          Text(todo.icon, style: const TextStyle(fontSize: 28)),
          const SizedBox(width: 12),
          Expanded(child: Text(todo.title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppTheme.textPrimary))),
          PopupMenuButton<String>(
            icon: const Icon(Icons.more_vert, color: AppTheme.textMuted),
            color: AppTheme.surfaceColor,
            onSelected: (val) async {
              if (val == 'pin') await context.read<TodoProvider>().togglePin(todo.id);
              if (val == 'archive') await context.read<TodoProvider>().toggleArchive(todo.id);
              if (val == 'delete') {
                await context.read<TodoProvider>().deleteTodo(todo.id);
                if (mounted) Navigator.pop(context);
              }
            },
            itemBuilder: (_) => [
              PopupMenuItem(value: 'pin', child: Text(todo.isPinned ? 'Unpin' : 'Pin', style: const TextStyle(color: AppTheme.textPrimary))),
              const PopupMenuItem(value: 'archive', child: Text('Archive', style: TextStyle(color: AppTheme.textPrimary))),
              const PopupMenuItem(value: 'delete', child: Text('Delete', style: TextStyle(color: AppTheme.error))),
            ],
          ),
        ]),
        if (todo.description != null) Padding(
          padding: const EdgeInsets.only(left: 52, top: 4),
          child: Text(todo.description!, style: TextStyle(fontSize: 14, color: AppTheme.textSecondary.withOpacity(0.7))),
        ),
        const SizedBox(height: 16),
        // Progress bar
        Row(children: [
          Expanded(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(4),
              child: LinearProgressIndicator(value: todo.progressPercent / 100, minHeight: 8, backgroundColor: AppTheme.surfaceLight,
                valueColor: AlwaysStoppedAnimation<Color>(todo.isComplete ? AppTheme.success : AppTheme.primaryColor)),
            ),
          ),
          const SizedBox(width: 12),
          Text('${todo.completedItems}/${todo.totalItems}', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
        ]),
      ]),
    );
  }

  Widget _buildItemsList(TodoList todo) {
    if (todo.items.isEmpty) {
      return Center(
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Icon(Icons.checklist, size: 64, color: AppTheme.textMuted.withOpacity(0.3)),
          const SizedBox(height: 16),
          const Text('No items yet', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
          const SizedBox(height: 8),
          Text('Tap + to add an item', style: TextStyle(fontSize: 14, color: AppTheme.textSecondary.withOpacity(0.7))),
        ]),
      );
    }

    // Sort: incomplete first, then by order
    final items = List<TodoItem>.from(todo.items);
    items.sort((a, b) {
      if (a.isCompleted != b.isCompleted) return a.isCompleted ? 1 : -1;
      return a.order.compareTo(b.order);
    });

    return ListView.builder(
      padding: const EdgeInsets.all(20),
      itemCount: items.length,
      itemBuilder: (context, index) => _buildItemCard(items[index], todo.id),
    );
  }

  Widget _buildItemCard(TodoItem item, String todoId) {
    Color priorityColor = AppTheme.textMuted;
    if (item.priority == 'high') priorityColor = AppTheme.warning;
    if (item.priority == 'urgent') priorityColor = AppTheme.error;

    return Dismissible(
      key: Key(item.id),
      direction: DismissDirection.endToStart,
      background: Container(
        alignment: Alignment.centerRight, padding: const EdgeInsets.only(right: 20),
        decoration: BoxDecoration(color: AppTheme.error.withOpacity(0.2), borderRadius: BorderRadius.circular(12)),
        child: const Icon(Icons.delete, color: AppTheme.error),
      ),
      onDismissed: (_) => context.read<TodoProvider>().deleteItem(todoId, item.id),
      child: Container(
        margin: const EdgeInsets.only(bottom: 10), padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(color: AppTheme.backgroundCard, borderRadius: BorderRadius.circular(12)),
        child: Row(children: [
          GestureDetector(
            onTap: () => context.read<TodoProvider>().toggleItem(todoId, item.id),
            child: Container(
              width: 24, height: 24,
              decoration: BoxDecoration(
                color: item.isCompleted ? AppTheme.success : Colors.transparent,
                borderRadius: BorderRadius.circular(6),
                border: Border.all(color: item.isCompleted ? AppTheme.success : AppTheme.textMuted, width: 2),
              ),
              child: item.isCompleted ? const Icon(Icons.check, size: 16, color: Colors.white) : null,
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(item.title, style: TextStyle(fontSize: 15, fontWeight: FontWeight.w500, color: item.isCompleted ? AppTheme.textMuted : AppTheme.textPrimary,
                decoration: item.isCompleted ? TextDecoration.lineThrough : null)),
              if (item.description != null)
                Text(item.description!, style: TextStyle(fontSize: 12, color: AppTheme.textSecondary.withOpacity(0.7)), maxLines: 1, overflow: TextOverflow.ellipsis),
              if (item.dueDate != null)
                Row(children: [
                  Icon(Icons.schedule, size: 12, color: item.isOverdue ? AppTheme.error : AppTheme.textMuted),
                  const SizedBox(width: 4),
                  Text(_formatDate(item.dueDate!), style: TextStyle(fontSize: 11, color: item.isOverdue ? AppTheme.error : AppTheme.textMuted)),
                ]),
            ]),
          ),
          Container(width: 4, height: 30, decoration: BoxDecoration(color: priorityColor, borderRadius: BorderRadius.circular(2))),
        ]),
      ),
    );
  }

  String _formatDate(DateTime date) {
    final now = DateTime.now();
    final diff = date.difference(now);
    if (diff.isNegative) return 'Overdue';
    if (diff.inDays == 0) return 'Today';
    if (diff.inDays == 1) return 'Tomorrow';
    return '${date.day}/${date.month}';
  }

  void _showAddItemDialog() {
    final titleController = TextEditingController();
    String priority = 'medium';

    showModalBottomSheet(
      context: context, isScrollControlled: true, backgroundColor: AppTheme.backgroundCard,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) => StatefulBuilder(
        builder: (context, setModalState) => Padding(
          padding: EdgeInsets.only(left: 24, right: 24, top: 24, bottom: MediaQuery.of(context).viewInsets.bottom + 24),
          child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
            Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: AppTheme.surfaceLight, borderRadius: BorderRadius.circular(2)))),
            const SizedBox(height: 24),
            const Text('Add Item', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
            const SizedBox(height: 24),
            TextField(
              controller: titleController, style: const TextStyle(color: AppTheme.textPrimary), autofocus: true,
              decoration: InputDecoration(labelText: 'What needs to be done?', filled: true, fillColor: AppTheme.surfaceColor,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none)),
            ),
            const SizedBox(height: 16),
            Row(children: [
              const Text('Priority: ', style: TextStyle(color: AppTheme.textSecondary)),
              const SizedBox(width: 12),
              ...['low', 'medium', 'high', 'urgent'].map((p) {
                Color c = AppTheme.textMuted;
                if (p == 'high') c = AppTheme.warning;
                if (p == 'urgent') c = AppTheme.error;
                final selected = priority == p;
                return GestureDetector(
                  onTap: () => setModalState(() => priority = p),
                  child: Container(
                    margin: const EdgeInsets.only(right: 8), padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(color: selected ? c.withOpacity(0.2) : AppTheme.surfaceColor, borderRadius: BorderRadius.circular(8),
                      border: selected ? Border.all(color: c) : null),
                    child: Text(p[0].toUpperCase() + p.substring(1), style: TextStyle(fontSize: 12, color: selected ? c : AppTheme.textSecondary, fontWeight: selected ? FontWeight.w600 : FontWeight.normal)),
                  ),
                );
              }),
            ]),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity, height: 52,
              child: ElevatedButton(
                onPressed: () async {
                  if (titleController.text.trim().isEmpty) return;
                  Navigator.pop(context);
                  await context.read<TodoProvider>().addItem(widget.todoId, title: titleController.text.trim(), priority: priority);
                },
                child: const Text('Add Item', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
              ),
            ),
          ]),
        ),
      ),
    );
  }
}
