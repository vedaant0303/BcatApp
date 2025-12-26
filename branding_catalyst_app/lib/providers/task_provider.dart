import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/services.dart';
import '../config/api_config.dart';

/// Task Provider for managing tasks
class TaskProvider extends ChangeNotifier {
  final ApiService _apiService = ApiService();
  
  List<Task> _tasks = [];
  Task? _currentTask;
  bool _isLoading = false;
  String? _error;
  String _filter = 'all'; // all, todo, in-progress, review, completed

  List<Task> get tasks => _tasks;
  Task? get currentTask => _currentTask;
  bool get isLoading => _isLoading;
  String? get error => _error;
  String get filter => _filter;

  List<Task> get filteredTasks {
    if (_filter == 'all') return _tasks;
    return _tasks.where((t) => t.status == _filter).toList();
  }

  List<Task> get todoTasks => _tasks.where((t) => t.status == 'todo').toList();
  List<Task> get inProgressTasks => _tasks.where((t) => t.status == 'in-progress').toList();
  List<Task> get reviewTasks => _tasks.where((t) => t.status == 'review').toList();
  List<Task> get completedTasks => _tasks.where((t) => t.status == 'completed').toList();
  
  List<Task> get overdueTasks => _tasks.where((t) => t.isOverdue).toList();
  List<Task> get urgentTasks => _tasks.where((t) => t.isUrgent).toList();

  int get totalCount => _tasks.length;
  int get todoCount => todoTasks.length;
  int get inProgressCount => inProgressTasks.length;
  int get completedCount => completedTasks.length;

  /// Set filter
  void setFilter(String newFilter) {
    _filter = newFilter;
    notifyListeners();
  }

  /// Load all tasks
  Future<void> loadTasks() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.get(ApiConfig.tasks);
      if (response['success'] == true) {
        _tasks = (response['tasks'] as List)
            .map((t) => Task.fromJson(t))
            .toList();
        _tasks.sort((a, b) {
          final priorityOrder = ['urgent', 'high', 'medium', 'low'];
          final aPriority = priorityOrder.indexOf(a.priority);
          final bPriority = priorityOrder.indexOf(b.priority);
          if (aPriority != bPriority) return aPriority.compareTo(bPriority);
          if (a.dueDate != null && b.dueDate != null) return a.dueDate!.compareTo(b.dueDate!);
          return 0;
        });
      }
    } catch (e) {
      _error = e.toString();
      debugPrint('Error loading tasks: $e');
    }

    _isLoading = false;
    notifyListeners();
  }

  /// Load task by ID with full details
  Future<Task?> loadTask(String id) async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await _apiService.get('${ApiConfig.tasks}/$id');
      if (response['success'] == true) {
        _currentTask = Task.fromJson(response['task']);
        _isLoading = false;
        notifyListeners();
        return _currentTask;
      }
    } catch (e) {
      _error = e.toString();
    }

    _isLoading = false;
    notifyListeners();
    return null;
  }

  /// Create new task (Admin only)
  Future<Task?> createTask({
    required String title,
    required String assignedTo,
    String? description,
    String priority = 'medium',
    DateTime? dueDate,
    String? projectId,
  }) async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await _apiService.post(ApiConfig.tasks, {
        'title': title,
        'assignedTo': assignedTo,
        if (description != null) 'description': description,
        'priority': priority,
        if (dueDate != null) 'dueDate': dueDate.toIso8601String(),
        if (projectId != null) 'project': projectId,
      });

      if (response['success'] == true) {
        final task = Task.fromJson(response['task']);
        _tasks.insert(0, task);
        _isLoading = false;
        notifyListeners();
        return task;
      } else {
        _error = response['message'] ?? 'Failed to create task';
      }
    } catch (e) {
      _error = e.toString();
    }

    _isLoading = false;
    notifyListeners();
    return null;
  }

  /// Update task status
  Future<bool> updateTaskStatus(String id, String status) async {
    try {
      final response = await _apiService.put('${ApiConfig.tasks}/$id', {
        'status': status,
      });

      if (response['success'] == true) {
        final updatedTask = Task.fromJson(response['task']);
        final index = _tasks.indexWhere((t) => t.id == id);
        if (index != -1) {
          _tasks[index] = updatedTask;
          notifyListeners();
        }
        if (_currentTask?.id == id) {
          _currentTask = updatedTask;
          notifyListeners();
        }
        return true;
      }
      return false;
    } catch (e) {
      _error = e.toString();
      notifyListeners();
      return false;
    }
  }

  /// Update task (full update)
  Future<bool> updateTask(String id, Map<String, dynamic> data) async {
    try {
      final response = await _apiService.put('${ApiConfig.tasks}/$id', data);
      if (response['success'] == true) {
        final updatedTask = Task.fromJson(response['task']);
        final index = _tasks.indexWhere((t) => t.id == id);
        if (index != -1) {
          _tasks[index] = updatedTask;
        }
        if (_currentTask?.id == id) {
          _currentTask = updatedTask;
        }
        notifyListeners();
        return true;
      }
      return false;
    } catch (e) {
      _error = e.toString();
      return false;
    }
  }

  /// Delete task (Admin only)
  Future<bool> deleteTask(String id) async {
    try {
      final response = await _apiService.delete('${ApiConfig.tasks}/$id');
      if (response['success'] == true) {
        _tasks.removeWhere((t) => t.id == id);
        if (_currentTask?.id == id) {
          _currentTask = null;
        }
        notifyListeners();
        return true;
      }
      return false;
    } catch (e) {
      _error = e.toString();
      return false;
    }
  }

  /// Add comment to task
  Future<bool> addComment(String taskId, String text) async {
    try {
      final response = await _apiService.post('${ApiConfig.tasks}/$taskId/comments', {
        'text': text,
      });

      if (response['success'] == true) {
        final updatedTask = Task.fromJson(response['task']);
        final index = _tasks.indexWhere((t) => t.id == taskId);
        if (index != -1) {
          _tasks[index] = updatedTask;
        }
        if (_currentTask?.id == taskId) {
          _currentTask = updatedTask;
        }
        notifyListeners();
        return true;
      }
      return false;
    } catch (e) {
      _error = e.toString();
      return false;
    }
  }

  /// Get tasks by status
  List<Task> getTasksByStatus(String status) {
    return _tasks.where((t) => t.status == status).toList();
  }

  /// Clear current task
  void clearCurrentTask() {
    _currentTask = null;
    notifyListeners();
  }

  /// Clear error
  void clearError() {
    _error = null;
    notifyListeners();
  }
}
