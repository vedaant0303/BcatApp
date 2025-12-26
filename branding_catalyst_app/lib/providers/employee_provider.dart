import 'package:flutter/material.dart';
import '../models/user.dart';
import '../services/api_service.dart';
import '../config/api_config.dart';

/// Provider for managing employees (Admin only)
class EmployeeProvider extends ChangeNotifier {
  List<User> _employees = [];
  bool _isLoading = false;
  String? _error;

  // Getters
  List<User> get employees => _employees;
  bool get isLoading => _isLoading;
  String? get error => _error;
  
  int get totalEmployees => _employees.length;
  int get activeEmployees => _employees.where((e) => e.isActive).length;
  int get inactiveEmployees => _employees.where((e) => !e.isActive).length;

  /// Load all employees (Admin only)
  Future<void> loadEmployees() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await ApiService().get('${ApiConfig.users}/employees');
      if (response['success'] == true) {
        _employees = (response['employees'] as List)
            .map((e) => User.fromJson(e))
            .toList();
      } else {
        _error = response['message'] ?? 'Failed to load employees';
      }
    } catch (e) {
      _error = e.toString();
      debugPrint('Error loading employees: $e');
    }

    _isLoading = false;
    notifyListeners();
  }

  /// Load all users including admins (Admin only)
  Future<void> loadAllUsers() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await ApiService().get(ApiConfig.users);
      if (response['success'] == true) {
        _employees = (response['users'] as List)
            .map((e) => User.fromJson(e))
            .toList();
      } else {
        _error = response['message'] ?? 'Failed to load users';
      }
    } catch (e) {
      _error = e.toString();
    }

    _isLoading = false;
    notifyListeners();
  }

  /// Create new employee (Admin only)
  Future<bool> createEmployee({
    required String employeeId,
    required String name,
    required String email,
    required String password,
    String? department,
    String? position,
  }) async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await ApiService().post(ApiConfig.users, {
        'employeeId': employeeId,
        'name': name,
        'email': email,
        'password': password,
        'department': department,
        'position': position,
      });

      if (response['success'] == true) {
        // Add new employee to list
        final newUser = User.fromJson(response['user']);
        _employees.insert(0, newUser);
        _isLoading = false;
        notifyListeners();
        return true;
      } else {
        _error = response['message'] ?? 'Failed to create employee';
      }
    } catch (e) {
      _error = e.toString();
    }

    _isLoading = false;
    notifyListeners();
    return false;
  }

  /// Update employee (Admin only)
  Future<bool> updateEmployee(String id, {
    String? name,
    String? email,
    String? department,
    String? position,
    bool? isActive,
  }) async {
    try {
      final response = await ApiService().put('${ApiConfig.users}/$id', {
        if (name != null) 'name': name,
        if (email != null) 'email': email,
        if (department != null) 'department': department,
        if (position != null) 'position': position,
        if (isActive != null) 'isActive': isActive,
      });

      if (response['success'] == true) {
        final updatedUser = User.fromJson(response['user']);
        final index = _employees.indexWhere((e) => e.id == id);
        if (index != -1) {
          _employees[index] = updatedUser;
          notifyListeners();
        }
        return true;
      } else {
        _error = response['message'] ?? 'Failed to update employee';
      }
    } catch (e) {
      _error = e.toString();
    }
    return false;
  }

  /// Delete employee (Admin only)
  Future<bool> deleteEmployee(String id) async {
    try {
      final response = await ApiService().delete('${ApiConfig.users}/$id');
      if (response['success'] == true) {
        _employees.removeWhere((e) => e.id == id);
        notifyListeners();
        return true;
      } else {
        _error = response['message'] ?? 'Failed to delete employee';
      }
    } catch (e) {
      _error = e.toString();
    }
    return false;
  }

  /// Reset employee password (Admin only)
  Future<bool> resetPassword(String id, String newPassword) async {
    try {
      final response = await ApiService().put('${ApiConfig.users}/$id/password', {
        'password': newPassword,
      });
      if (response['success'] == true) {
        return true;
      } else {
        _error = response['message'] ?? 'Failed to reset password';
      }
    } catch (e) {
      _error = e.toString();
    }
    return false;
  }

  /// Toggle employee active status
  Future<bool> toggleActive(String id) async {
    final employee = _employees.firstWhere((e) => e.id == id);
    return updateEmployee(id, isActive: !employee.isActive);
  }

  /// Search employees locally
  List<User> search(String query) {
    if (query.isEmpty) return _employees;
    final q = query.toLowerCase();
    return _employees.where((e) =>
      e.name.toLowerCase().contains(q) ||
      e.email.toLowerCase().contains(q) ||
      (e.employeeId?.toLowerCase().contains(q) ?? false) ||
      (e.department?.toLowerCase().contains(q) ?? false)
    ).toList();
  }

  /// Filter by department
  List<User> filterByDepartment(String department) {
    return _employees.where((e) => e.department == department).toList();
  }

  /// Get unique departments
  List<String> get departments {
    return _employees
        .where((e) => e.department != null && e.department!.isNotEmpty)
        .map((e) => e.department!)
        .toSet()
        .toList()
      ..sort();
  }

  /// Clear error
  void clearError() {
    _error = null;
    notifyListeners();
  }
}
