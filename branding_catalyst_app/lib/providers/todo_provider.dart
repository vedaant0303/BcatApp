import 'package:flutter/foundation.dart';
import '../models/todo.dart';
import '../services/api_service.dart';
import '../config/api_config.dart';

/// Provider for managing Todo Lists state
class TodoProvider extends ChangeNotifier {
  List<TodoList> _todos = [];
  TodoList? _selectedTodo;
  bool _isLoading = false;
  String? _error;
  Map<String, dynamic>? _stats;

  // Getters
  List<TodoList> get todos => _todos;
  TodoList? get selectedTodo => _selectedTodo;
  bool get isLoading => _isLoading;
  String? get error => _error;
  Map<String, dynamic>? get stats => _stats;

  // Filtered lists
  List<TodoList> get pinnedTodos => _todos.where((t) => t.isPinned && !t.isArchived).toList();
  List<TodoList> get activeTodos => _todos.where((t) => !t.isArchived).toList();
  List<TodoList> get archivedTodos => _todos.where((t) => t.isArchived).toList();
  List<TodoList> get workTodos => _todos.where((t) => t.category == 'work' && !t.isArchived).toList();
  List<TodoList> get personalTodos => _todos.where((t) => t.category == 'personal' && !t.isArchived).toList();
  List<TodoList> get dailyTodos => _todos.where((t) => t.category == 'daily' && !t.isArchived).toList();

  // Stats getters
  int get totalLists => activeTodos.length;
  int get totalItems => activeTodos.fold(0, (sum, t) => sum + t.totalItems);
  int get completedItems => activeTodos.fold(0, (sum, t) => sum + t.completedItems);
  int get pendingItems => totalItems - completedItems;

  /// Load all todos
  Future<void> loadTodos({String? category, bool archived = false}) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      String url = ApiConfig.todos;
      List<String> params = [];
      if (category != null) params.add('category=$category');
      if (archived) params.add('archived=true');
      if (params.isNotEmpty) url += '?${params.join('&')}';

      final response = await ApiService().get(url);
      if (response['success'] == true) {
        _todos = (response['todos'] as List).map((t) => TodoList.fromJson(t)).toList();
      } else {
        _error = response['message'] ?? 'Failed to load todos';
      }
    } catch (e) {
      _error = e.toString();
    }

    _isLoading = false;
    notifyListeners();
  }

  /// Load todo stats
  Future<void> loadStats() async {
    try {
      final response = await ApiService().get('${ApiConfig.todos}/stats');
      if (response['success'] == true) {
        _stats = response['stats'];
        notifyListeners();
      }
    } catch (e) {
      debugPrint('Error loading stats: $e');
    }
  }

  /// Get single todo by ID
  Future<TodoList?> getTodoById(String id) async {
    try {
      final response = await ApiService().get('${ApiConfig.todos}/$id');
      if (response['success'] == true) {
        final todo = TodoList.fromJson(response['todo']);
        _selectedTodo = todo;
        notifyListeners();
        return todo;
      }
    } catch (e) {
      _error = e.toString();
    }
    return null;
  }

  /// Create new todo list
  Future<TodoList?> createTodo({
    required String title,
    String? description,
    String? category,
    String? color,
    String? icon,
    DateTime? dueDate,
    List<Map<String, dynamic>>? items,
  }) async {
    _isLoading = true;
    notifyListeners();

    try {
      final data = {
        'title': title,
        if (description != null) 'description': description,
        if (category != null) 'category': category,
        if (color != null) 'color': color,
        if (icon != null) 'icon': icon,
        if (dueDate != null) 'dueDate': dueDate.toIso8601String(),
        if (items != null) 'items': items,
      };

      final response = await ApiService().post(ApiConfig.todos, data);
      if (response['success'] == true) {
        final todo = TodoList.fromJson(response['todo']);
        _todos.insert(0, todo);
        _isLoading = false;
        notifyListeners();
        return todo;
      }
    } catch (e) {
      _error = e.toString();
    }

    _isLoading = false;
    notifyListeners();
    return null;
  }

  /// Update todo list
  Future<bool> updateTodo(String id, Map<String, dynamic> updates) async {
    try {
      final response = await ApiService().put('${ApiConfig.todos}/$id', updates);
      if (response['success'] == true) {
        final updatedTodo = TodoList.fromJson(response['todo']);
        final index = _todos.indexWhere((t) => t.id == id);
        if (index != -1) {
          _todos[index] = updatedTodo;
          if (_selectedTodo?.id == id) _selectedTodo = updatedTodo;
          notifyListeners();
        }
        return true;
      }
    } catch (e) {
      _error = e.toString();
    }
    return false;
  }

  /// Delete todo list
  Future<bool> deleteTodo(String id) async {
    try {
      final response = await ApiService().delete('${ApiConfig.todos}/$id');
      if (response['success'] == true) {
        _todos.removeWhere((t) => t.id == id);
        if (_selectedTodo?.id == id) _selectedTodo = null;
        notifyListeners();
        return true;
      }
    } catch (e) {
      _error = e.toString();
    }
    return false;
  }

  /// Add item to todo list
  Future<bool> addItem(String todoId, {
    required String title,
    String? description,
    String? priority,
    DateTime? dueDate,
    String? notes,
  }) async {
    try {
      final data = {
        'title': title,
        if (description != null) 'description': description,
        if (priority != null) 'priority': priority,
        if (dueDate != null) 'dueDate': dueDate.toIso8601String(),
        if (notes != null) 'notes': notes,
      };

      final response = await ApiService().post('${ApiConfig.todos}/$todoId/items', data);
      if (response['success'] == true) {
        final updatedTodo = TodoList.fromJson(response['todo']);
        final index = _todos.indexWhere((t) => t.id == todoId);
        if (index != -1) {
          _todos[index] = updatedTodo;
          if (_selectedTodo?.id == todoId) _selectedTodo = updatedTodo;
          notifyListeners();
        }
        return true;
      }
    } catch (e) {
      _error = e.toString();
    }
    return false;
  }

  /// Update item in todo list
  Future<bool> updateItem(String todoId, String itemId, Map<String, dynamic> updates) async {
    try {
      final response = await ApiService().put('${ApiConfig.todos}/$todoId/items/$itemId', updates);
      if (response['success'] == true) {
        final updatedTodo = TodoList.fromJson(response['todo']);
        final index = _todos.indexWhere((t) => t.id == todoId);
        if (index != -1) {
          _todos[index] = updatedTodo;
          if (_selectedTodo?.id == todoId) _selectedTodo = updatedTodo;
          notifyListeners();
        }
        return true;
      }
    } catch (e) {
      _error = e.toString();
    }
    return false;
  }

  /// Toggle item completion
  Future<bool> toggleItem(String todoId, String itemId) async {
    try {
      final response = await ApiService().put('${ApiConfig.todos}/$todoId/items/$itemId/toggle', {});
      if (response['success'] == true) {
        final updatedTodo = TodoList.fromJson(response['todo']);
        final index = _todos.indexWhere((t) => t.id == todoId);
        if (index != -1) {
          _todos[index] = updatedTodo;
          if (_selectedTodo?.id == todoId) _selectedTodo = updatedTodo;
          notifyListeners();
        }
        return true;
      }
    } catch (e) {
      _error = e.toString();
    }
    return false;
  }

  /// Delete item from todo list
  Future<bool> deleteItem(String todoId, String itemId) async {
    try {
      final response = await ApiService().delete('${ApiConfig.todos}/$todoId/items/$itemId');
      if (response['success'] == true) {
        final updatedTodo = TodoList.fromJson(response['todo']);
        final index = _todos.indexWhere((t) => t.id == todoId);
        if (index != -1) {
          _todos[index] = updatedTodo;
          if (_selectedTodo?.id == todoId) _selectedTodo = updatedTodo;
          notifyListeners();
        }
        return true;
      }
    } catch (e) {
      _error = e.toString();
    }
    return false;
  }

  /// Archive/Unarchive todo
  Future<bool> toggleArchive(String id) async {
    try {
      final response = await ApiService().put('${ApiConfig.todos}/$id/archive', {});
      if (response['success'] == true) {
        final updatedTodo = TodoList.fromJson(response['todo']);
        final index = _todos.indexWhere((t) => t.id == id);
        if (index != -1) {
          _todos[index] = updatedTodo;
          notifyListeners();
        }
        return true;
      }
    } catch (e) {
      _error = e.toString();
    }
    return false;
  }

  /// Toggle pin
  Future<bool> togglePin(String id) async {
    final todo = _todos.firstWhere((t) => t.id == id);
    return updateTodo(id, {'isPinned': !todo.isPinned});
  }

  /// Clear error
  void clearError() {
    _error = null;
    notifyListeners();
  }

  /// Set selected todo
  void setSelectedTodo(TodoList? todo) {
    _selectedTodo = todo;
    notifyListeners();
  }
}
