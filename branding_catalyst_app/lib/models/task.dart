import 'user.dart';

/// Task model matching backend schema
class Task {
  final String id;
  final String title;
  final String? description;
  final String status; // todo, in-progress, review, completed
  final String priority; // low, medium, high, urgent
  final String assignedTo;
  final User? assignedToDetails;
  final String assignedBy;
  final User? assignedByDetails;
  final String? project;
  final DateTime? dueDate;
  final List<String> tags;
  final List<TaskAttachment> attachments;
  final List<TaskComment> comments;
  final DateTime? completedAt;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  Task({
    required this.id,
    required this.title,
    this.description,
    this.status = 'todo',
    this.priority = 'medium',
    required this.assignedTo,
    this.assignedToDetails,
    required this.assignedBy,
    this.assignedByDetails,
    this.project,
    this.dueDate,
    this.tags = const [],
    this.attachments = const [],
    this.comments = const [],
    this.completedAt,
    this.createdAt,
    this.updatedAt,
  });

  factory Task.fromJson(Map<String, dynamic> json) {
    return Task(
      id: json['_id'] ?? json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'],
      status: json['status'] ?? 'todo',
      priority: json['priority'] ?? 'medium',
      assignedTo: json['assignedTo'] is Map 
          ? json['assignedTo']['_id'] 
          : json['assignedTo'] ?? '',
      assignedToDetails: json['assignedTo'] is Map 
          ? User.fromJson(json['assignedTo']) 
          : null,
      assignedBy: json['assignedBy'] is Map 
          ? json['assignedBy']['_id'] 
          : json['assignedBy'] ?? '',
      assignedByDetails: json['assignedBy'] is Map 
          ? User.fromJson(json['assignedBy']) 
          : null,
      project: json['project'] is Map ? json['project']['_id'] : json['project'],
      dueDate: json['dueDate'] != null 
          ? DateTime.parse(json['dueDate']) 
          : null,
      tags: (json['tags'] as List<dynamic>?)
          ?.map((e) => e.toString())
          .toList() ?? [],
      attachments: (json['attachments'] as List<dynamic>?)
          ?.map((a) => TaskAttachment.fromJson(a))
          .toList() ?? [],
      comments: (json['comments'] as List<dynamic>?)
          ?.map((c) => TaskComment.fromJson(c))
          .toList() ?? [],
      completedAt: json['completedAt'] != null 
          ? DateTime.parse(json['completedAt']) 
          : null,
      createdAt: json['createdAt'] != null 
          ? DateTime.parse(json['createdAt']) 
          : null,
      updatedAt: json['updatedAt'] != null 
          ? DateTime.parse(json['updatedAt']) 
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'title': title,
      'description': description,
      'status': status,
      'priority': priority,
      'assignedTo': assignedTo,
      'assignedBy': assignedBy,
      'project': project,
      'dueDate': dueDate?.toIso8601String(),
      'tags': tags,
      'attachments': attachments.map((a) => a.toJson()).toList(),
      'comments': comments.map((c) => c.toJson()).toList(),
      'completedAt': completedAt?.toIso8601String(),
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }

  bool get isCompleted => status == 'completed';
  bool get isOverdue => dueDate != null && dueDate!.isBefore(DateTime.now()) && !isCompleted;
  bool get isUrgent => priority == 'urgent';
  bool get isHighPriority => priority == 'high' || priority == 'urgent';
}

class TaskAttachment {
  final String name;
  final String url;
  final DateTime? uploadedAt;

  TaskAttachment({
    required this.name,
    required this.url,
    this.uploadedAt,
  });

  factory TaskAttachment.fromJson(Map<String, dynamic> json) {
    return TaskAttachment(
      name: json['name'] ?? '',
      url: json['url'] ?? '',
      uploadedAt: json['uploadedAt'] != null 
          ? DateTime.parse(json['uploadedAt']) 
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'url': url,
      'uploadedAt': uploadedAt?.toIso8601String(),
    };
  }
}

class TaskComment {
  final String user;
  final User? userDetails;
  final String text;
  final DateTime? createdAt;

  TaskComment({
    required this.user,
    this.userDetails,
    required this.text,
    this.createdAt,
  });

  factory TaskComment.fromJson(Map<String, dynamic> json) {
    return TaskComment(
      user: json['user'] is Map ? json['user']['_id'] : json['user'] ?? '',
      userDetails: json['user'] is Map ? User.fromJson(json['user']) : null,
      text: json['text'] ?? '',
      createdAt: json['createdAt'] != null 
          ? DateTime.parse(json['createdAt']) 
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'user': user,
      'text': text,
      'createdAt': createdAt?.toIso8601String(),
    };
  }
}
