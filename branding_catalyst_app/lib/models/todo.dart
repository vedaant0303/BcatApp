import 'user.dart';

/// TodoItem model matching backend schema
class TodoItem {
  final String id;
  final String title;
  final String? description;
  final bool isCompleted;
  final String priority; // low, medium, high, urgent
  final DateTime? dueDate;
  final DateTime? completedAt;
  final String? completedBy;
  final User? completedByDetails;
  final int order;
  final String? notes;
  final DateTime? createdAt;

  TodoItem({
    required this.id,
    required this.title,
    this.description,
    this.isCompleted = false,
    this.priority = 'medium',
    this.dueDate,
    this.completedAt,
    this.completedBy,
    this.completedByDetails,
    this.order = 0,
    this.notes,
    this.createdAt,
  });

  factory TodoItem.fromJson(Map<String, dynamic> json) {
    return TodoItem(
      id: json['_id'] ?? json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'],
      isCompleted: json['isCompleted'] ?? false,
      priority: json['priority'] ?? 'medium',
      dueDate: json['dueDate'] != null ? DateTime.parse(json['dueDate']) : null,
      completedAt: json['completedAt'] != null ? DateTime.parse(json['completedAt']) : null,
      completedBy: json['completedBy'] is Map ? json['completedBy']['_id'] : json['completedBy'],
      completedByDetails: json['completedBy'] is Map ? User.fromJson(json['completedBy']) : null,
      order: json['order'] ?? 0,
      notes: json['notes'],
      createdAt: json['createdAt'] != null ? DateTime.parse(json['createdAt']) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'title': title,
      'description': description,
      'isCompleted': isCompleted,
      'priority': priority,
      'dueDate': dueDate?.toIso8601String(),
      'completedAt': completedAt?.toIso8601String(),
      'completedBy': completedBy,
      'order': order,
      'notes': notes,
      'createdAt': createdAt?.toIso8601String(),
    };
  }

  bool get isOverdue => dueDate != null && dueDate!.isBefore(DateTime.now()) && !isCompleted;
  bool get isUrgent => priority == 'urgent';
  bool get isHighPriority => priority == 'high' || priority == 'urgent';

  TodoItem copyWith({
    String? id,
    String? title,
    String? description,
    bool? isCompleted,
    String? priority,
    DateTime? dueDate,
    DateTime? completedAt,
    String? completedBy,
    int? order,
    String? notes,
  }) {
    return TodoItem(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      isCompleted: isCompleted ?? this.isCompleted,
      priority: priority ?? this.priority,
      dueDate: dueDate ?? this.dueDate,
      completedAt: completedAt ?? this.completedAt,
      completedBy: completedBy ?? this.completedBy,
      order: order ?? this.order,
      notes: notes ?? this.notes,
      createdAt: createdAt,
    );
  }
}

/// TodoList model matching backend schema
class TodoList {
  final String id;
  final String title;
  final String? description;
  final String assignedTo;
  final User? assignedToDetails;
  final String createdBy;
  final User? createdByDetails;
  final String? workspace;
  final String color;
  final String icon;
  final List<TodoItem> items;
  final bool isArchived;
  final bool isPinned;
  final String category; // work, personal, project, daily, weekly, other
  final List<String> sharedWith;
  final DateTime? dueDate;
  final int? progress;
  final int? completedCount;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  TodoList({
    required this.id,
    required this.title,
    this.description,
    required this.assignedTo,
    this.assignedToDetails,
    required this.createdBy,
    this.createdByDetails,
    this.workspace,
    this.color = '#8E609B',
    this.icon = '📋',
    this.items = const [],
    this.isArchived = false,
    this.isPinned = false,
    this.category = 'work',
    this.sharedWith = const [],
    this.dueDate,
    this.progress,
    this.completedCount,
    this.createdAt,
    this.updatedAt,
  });

  factory TodoList.fromJson(Map<String, dynamic> json) {
    return TodoList(
      id: json['_id'] ?? json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'],
      assignedTo: json['assignedTo'] is Map ? json['assignedTo']['_id'] : json['assignedTo'] ?? '',
      assignedToDetails: json['assignedTo'] is Map ? User.fromJson(json['assignedTo']) : null,
      createdBy: json['createdBy'] is Map ? json['createdBy']['_id'] : json['createdBy'] ?? '',
      createdByDetails: json['createdBy'] is Map ? User.fromJson(json['createdBy']) : null,
      workspace: json['workspace'] is Map ? json['workspace']['_id'] : json['workspace'],
      color: json['color'] ?? '#8E609B',
      icon: json['icon'] ?? '📋',
      items: (json['items'] as List<dynamic>?)?.map((i) => TodoItem.fromJson(i)).toList() ?? [],
      isArchived: json['isArchived'] ?? false,
      isPinned: json['isPinned'] ?? false,
      category: json['category'] ?? 'work',
      sharedWith: (json['sharedWith'] as List<dynamic>?)?.map((e) => e is Map ? e['_id'].toString() : e.toString()).toList() ?? [],
      dueDate: json['dueDate'] != null ? DateTime.parse(json['dueDate']) : null,
      progress: json['progress'],
      completedCount: json['completedCount'],
      createdAt: json['createdAt'] != null ? DateTime.parse(json['createdAt']) : null,
      updatedAt: json['updatedAt'] != null ? DateTime.parse(json['updatedAt']) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'title': title,
      'description': description,
      'assignedTo': assignedTo,
      'createdBy': createdBy,
      'workspace': workspace,
      'color': color,
      'icon': icon,
      'items': items.map((i) => i.toJson()).toList(),
      'isArchived': isArchived,
      'isPinned': isPinned,
      'category': category,
      'sharedWith': sharedWith,
      'dueDate': dueDate?.toIso8601String(),
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }

  int get totalItems => items.length;
  int get completedItems => items.where((i) => i.isCompleted).length;
  int get pendingItems => items.where((i) => !i.isCompleted).length;
  double get progressPercent => totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  bool get isComplete => totalItems > 0 && completedItems == totalItems;
}
